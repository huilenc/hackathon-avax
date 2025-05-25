import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/lib/utils/supabase/check-env-vars";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";
import Image from "next/image";
import { Pacifico, Vina_Sans } from "next/font/google";
import "./globals.css";
import { ThemeSwitcher } from "@/components/theme-switcher";

const vinaSans = Vina_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

const defaultUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? process.env.NEXT_PUBLIC_VERCEL_URL
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Workflow Escrow",
  description: "Automated escrow agent that facilitates secure transactions",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="bg-pattern" />
          <Toaster expand />
          <div className="min-h-screen flex flex-col">
            {/* Fixed Header */}
            <nav className="fixed flex-row top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm border-b-foreground/10 h-16">
              <div className="w-full max-w-7xl mx-auto flex justify-between items-center h-full px-5 text-sm">
                <div className="flex gap-5 items-center flex-nowrap font-semibold">
                  <ThemeSwitcher />
                  <Link
                    href={"/"}
                    className="group bg-clip-text bg-gradient-to-l from-[#CD0105] to-[#540102] dark:from-[#EFC2B3] dark:to-[#F69583] font-bold text-lg hover:opacity-80 transition-opacity flex items-center gap-1"
                  >
<<<<<<< HEAD
                    FreeCup
=======
                    <span className={vinaSans.className}>Free</span>
                    <Image
                      src="/20250524_1542_Cute Animated Cup_remix_01jw1btvxtffmb1pe0ydt88ac4.png"
                      alt="FreeCup"
                      width={20}
                      height={20}
                      className="transform rotate-12 mt-[2px] group-hover:animate-[wiggle_200ms_ease-in-out_infinite]"
                    />
                    <span className={vinaSans.className}>Cup</span>
>>>>>>> development
                  </Link>
                  <div className="flex items-center gap-2"></div>
                </div>
                {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
              </div>
            </nav>

            {/* Main Content with padding-top to prevent header overlap */}
            <main className="flex-1 flex flex-col items-center pt-24">
              <div className="w-full max-w-7xl">{children}</div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
