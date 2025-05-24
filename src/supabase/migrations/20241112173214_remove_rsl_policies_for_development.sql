-- Disable RLS on all tables
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE wallets DISABLE ROW LEVEL SECURITY;
ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE escrow_agreements DISABLE ROW LEVEL SECURITY;
ALTER TABLE dispute_resolutions DISABLE ROW LEVEL SECURITY;

-- Drop policies for profiles
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Drop policies for wallets
DROP POLICY IF EXISTS "Users can view own wallets" ON wallets;
DROP POLICY IF EXISTS "Users can update own wallets" ON wallets;
DROP POLICY IF EXISTS "Users can insert own wallets" ON wallets;

-- Drop policies for transactions
DROP POLICY IF EXISTS "Users can view own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can insert own transactions" ON transactions;

-- Drop policies for escrow_agreements
DROP POLICY IF EXISTS "Users can view related escrow agreements" ON escrow_agreements;
DROP POLICY IF EXISTS "Users can insert escrow agreements" ON escrow_agreements;

-- Drop policies for dispute_resolutions
DROP POLICY IF EXISTS "Users can view related dispute resolutions" ON dispute_resolutions;

-- Drop storage policies
DROP POLICY IF EXISTS "Give users read access to profile pictures" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to upload their own profile picture" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to update their own profile picture" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to delete their own profile picture" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to view their agreement documents" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to upload agreement documents" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to view dispute evidence" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to upload dispute evidence" ON storage.objects;

-- Add comment to describe migration
COMMENT ON TABLE profiles IS 'RLS disabled and policies dropped in migration.';
COMMENT ON TABLE wallets IS 'RLS disabled and policies dropped in migration.';
COMMENT ON TABLE transactions IS 'RLS disabled and policies dropped in migration.';
COMMENT ON TABLE escrow_agreements IS 'RLS disabled and policies dropped in migration.';
COMMENT ON TABLE dispute_resolutions IS 'RLS disabled and policies dropped in migration.';
COMMENT ON TABLE storage.objects IS 'Storage policies dropped in migration.';