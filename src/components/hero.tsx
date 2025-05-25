import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CheckCircle, FileText, FileSearch, Lock } from "lucide-react";
import { DM_Sans, Vina_Sans } from "next/font/google";
import Marketplace from "./marketplace";

const vinaSans = Vina_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center w-full px-5">
      {/* Hero Section */}
      <section className="w-full max-w-6xl space-y-16 py-8">
        <div className="flex flex-col items-center gap-8 vinaSans.className">
          {/* Main headline */}
          <div className="relative">
            {/* <div className="flex items-center justify-center gap-4 mb-4">
              <Shield className="w-8 h-8 text-[#540102]" />
              <Zap className="w-8 h-8 text-[#EFC2B3]" />
              <Image
                src="/20250524_1542_Cute Animated Cup_remix_01jw1btvxtffmb1pe0ydt88ac4.png"
                alt="Logo"
                width={32}
                height={32}
              />
            </div> */}
            <p className="text-4xl md:text-5xl lg:text-6xl flex flex-row items-center justify-center font-bold text-center bg-clip-text text-transparent bg-gradient-to-l from-[#CD0105] to-[#540102] dark:from-[#EFC2B3] dark:to-[#F69583] leading-tight">
              <span className={vinaSans.className}>Free</span>
              <span className="flex flex-col items-center justify-center gap-2 group relative">
                <Image
                  src="/avax-coin.png"
                  alt="Logo"
                  width={80}
                  height={80}
                  className="transform rotate-12 scale-50 md:scale-60 lg:scale-90 mt-2 transition-all duration-700 group-hover:translate-y-20 group-hover:scale-[0.3] relative group-hover:-z-10"
                />
                <Image
                  src="/20250524_1542_Cute Animated Cup_remix_01jw1btvxtffmb1pe0ydt88ac4.png"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="transform rotate-12 scale-50 md:scale-60 lg:scale-90 mt-4 transition-all duration-500 group-hover:-translate-y-10"
                />
              </span>
              <span className={vinaSans.className}>Cup</span>
            </p>
            <p className="mt-4 text-xl md:text-2xl text-center text-[#CD0105] dark:text-[#F69583]">
              <span className={dmSans.className}>
                Decentralized Behance powered by AI Escrow Service for Instant
                Payments and Task Validation
              </span>
            </p>
          </div>

          {/* Marketplace */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-[#CD0105] dark:text-[#EFC2B3]">
            <Marketplace />
          </div>
        </div>
      </section>
      {/* How It Works Section - Full width background */}
      <section className="w-full bg-transparent py-16">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start px-5">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 dark:bg-blue-900/50 rounded-full p-4 mb-4">
                <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Upload Your Agreement
              </h3>
              <p className="text-sm text-muted-foreground">
                Provide a paper contract or agreement document.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 dark:bg-green-900/50 rounded-full p-4 mb-4">
                <FileSearch className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Extraction</h3>
              <p className="text-sm text-muted-foreground">
                Our AI extracts task details and payment terms.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-yellow-100 dark:bg-yellow-900/50 rounded-full p-4 mb-4">
                <Lock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Escrow Creation</h3>
              <p className="text-sm text-muted-foreground">
                A smart contract is deployed, holding funds securely.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 dark:bg-purple-900/50 rounded-full p-4 mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Validation</h3>
              <p className="text-sm text-muted-foreground">
                AI reviews submitted work and triggers payment release.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full max-w-5xl py-16 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Simplify Your Transactions?
          </h2>
          <p className="text-lg text-muted-foreground">
            Join the future of secure and automated escrow services today.
          </p>
        </div>
        <div className="flex justify-center">
          <Link href="/sign-up">
            <Button size="lg">Get Started Now</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-border py-8">
        <div className="max-w-5xl mx-auto px-5 text-center text-sm text-muted-foreground">
          © 2024 Dark Horse Labs. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-card p-4 rounded-2xl border-4 border-border shadow-[8px_8px_0px_0px_#540102] dark:shadow-[4px_4px_0px_0px_#EFC2B3]">
      <div className="flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
      <p className="text-muted-foreground text-center">{description}</p>
    </div>
  );
};

export default LandingPage;
