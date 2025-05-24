import { config } from "dotenv";
import inquirer from "inquirer";
import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";
import fs from 'fs';
import path from 'path';

console.log('Script started with Bun runtime');

// test-env.js
console.log('CIRCLE_API_KEY:', process.env.CIRCLE_API_KEY ? 'Found' : 'Not found');

// Load environment variables - Bun has built-in support for .env files
// But we'll also try explicit loading to be safe
try {
  console.log('Loading environment variables...');
  // Try to load from the root directory first
  config({ path: '.env.local' });
 
  // Log which environment variables we found
  const circleVars = Object.keys(process.env).filter(key => key.startsWith('CIRCLE_'));
  console.log('Found Circle environment variables:', circleVars);
} catch (error) {
  console.error('Error loading environment variables:', error);
}

console.log('Checking required environment variables...');

const requiredEnvVars = ['CIRCLE_API_KEY', 'CIRCLE_ENTITY_SECRET'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    console.error('Current working directory:', process.cwd());
    console.error('Available env files:', fs.existsSync('.env.local') ? '.env.local exists' : '.env.local not found');
    process.exit(1);
  } else {
    console.log(`Found ${envVar} (length: ${process.env[envVar].length})`);
  }
}

console.log('All required environment variables found');

let circleDeveloperSdk;
try {
  console.log('Initializing Circle SDK...');
  circleDeveloperSdk = initiateDeveloperControlledWalletsClient({
    apiKey: process.env.CIRCLE_API_KEY,
    entitySecret: process.env.CIRCLE_ENTITY_SECRET,
  });
  console.log('Circle SDK initialized successfully');
} catch (error) {
  console.error('Failed to initialize Circle SDK:', error);
  if (error.response) {
    console.error('API Error Response:', error.response.data);
  }
  process.exit(1);
}

const choices = [
  "ETH",
  "ETH-SEPOLIA",
  "AVAX",
  "AVAX-FUJI",
  "MATIC",
  "MATIC-AMOY",
  "ARB",
  "ARB-SEPOLIA",
  "NEAR",
  "NEAR-TESTNET",
  "EVM",
  "EVM-TESTNET",
  "UNI-SEPOLIA",
  "SOL-DEVNET"
];

const { selectedOption } = await inquirer.prompt([
  {
    type: "list",
    name: "selectedOption",
    message: "Select a blockchain to create the agent wallet on:",
    choices: choices,
  },
]);

// Helper function to safely log objects without circular references
function safeStringify(obj) {
  const cache = new Set();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (cache.has(value)) {
        return '[Circular Reference]';
      }
      cache.add(value);
    }
    return value;
  }, 2);
}

// Helper function to extract only the data we need from responses
function extractResponseData(response) {
  return {
    data: response?.data,
    status: response?.status,
    statusText: response?.statusText,
    // Exclude headers, config, and other potentially circular properties
  };
}

try {
  console.log('Creating wallet set...');
  const createdWalletSetResponse = await circleDeveloperSdk.createWalletSet({
    name: "Escrow Agent Wallet"
  });

  // Safely log the response data
  console.log('Wallet set response data:', safeStringify(extractResponseData(createdWalletSetResponse)));

  // Check if the response has the expected structure
  if (!createdWalletSetResponse?.data?.walletSet?.id) {
    console.error('Unexpected wallet set response structure:', safeStringify(extractResponseData(createdWalletSetResponse)));
    throw new Error('Failed to get wallet set ID from response');
  }

  const walletSetId = createdWalletSetResponse.data.walletSet.id;
  console.log(`Created wallet set with ID: ${walletSetId}`);

  const walletConfig = {
    accountType: "EOA",
    blockchains: [selectedOption],
    walletSetId
  };

  console.log('Creating wallet with options:', walletConfig);

  const createdWalletResponse = await circleDeveloperSdk.createWallets(walletConfig);

  // Safely log the wallet creation response
  console.log('Wallet creation response data:', safeStringify(extractResponseData(createdWalletResponse)));

  // Check if the response has the expected structure
  if (!createdWalletResponse?.data?.wallets || !Array.isArray(createdWalletResponse.data.wallets)) {
    console.error('Unexpected wallet response structure:', safeStringify(extractResponseData(createdWalletResponse)));
    throw new Error('Failed to get wallets array from response');
  }

  const [createdWallet] = createdWalletResponse.data.wallets;
  if (!createdWallet) {
    throw new Error('No wallet was created - wallets array is empty');
  }

  if (!createdWallet.address || !createdWallet.id) {
    console.error('Wallet missing required fields:', safeStringify(createdWallet));
    throw new Error('Created wallet is missing address or id');
  }

  console.log(`Agent wallet created successfully. Address: ${createdWallet.address}, ID: ${createdWallet.id}`);

  // Update environment file
  const envPath = path.resolve('.env.local');
 
  if (!fs.existsSync(envPath)) {
    throw new Error(`.env.local file not found at ${envPath}`);
  }
 
  let envContent = fs.readFileSync(envPath, 'utf-8');

  // Update or add environment variables
  const updateEnvVar = (content, key, value) => {
    const regex = new RegExp(`^${key}=.*$`, 'm');
    const line = `${key}=${value}`;
   
    if (regex.test(content)) {
      return content.replace(regex, line);
    } else {
      return content + (content.endsWith('\n') ? '' : '\n') + line + '\n';
    }
  };

  envContent = updateEnvVar(envContent, 'NEXT_PUBLIC_AGENT_WALLET_ID', createdWallet.id);
  envContent = updateEnvVar(envContent, 'NEXT_PUBLIC_AGENT_WALLET_ADDRESS', createdWallet.address);
  envContent = updateEnvVar(envContent, 'CIRCLE_BLOCKCHAIN', selectedOption);

  fs.writeFileSync(envPath, envContent);
  console.log('Environment variables updated successfully in .env.local');
 
  console.log('\n--- Summary ---');
  console.log(`Blockchain: ${selectedOption}`);
  console.log(`Wallet ID: ${createdWallet.id}`);
  console.log(`Wallet Address: ${createdWallet.address}`);
  console.log(`Wallet Set ID: ${walletSetId}`);

} catch (error) {
  console.error("Failed to create agent wallet:", error.message);
 
  // Better error logging
  if (error.response) {
    console.error('API Error Status:', error.response.status);
    console.error('API Error Data:', safeStringify(error.response.data));
  }
 
  if (error.stack) {
    console.error('Error Stack:', error.stack);
  }
 
  process.exit(1);
}