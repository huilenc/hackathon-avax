import { createSupabaseServerComponentClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WalletBalance } from "@/components/wallet-balance";
import { RequestUsdcButton } from "@/components/request-usdc-button";
import { USDCButton } from "@/components/usdc-button";
import dynamic from "next/dynamic";
import { WalletInformationDialog } from "@/components/wallet-information-dialog";
import { DollarSign, ArrowDownUp } from "lucide-react";
import { AnimatedDollar, AnimatedCard, AnimatedBalance, AnimatedButtons, AnimatedHero } from "@/components/dollar";

const Transactions = dynamic(() => import('@/components/transactions').then(mod => mod.Transactions), { ssr: false });

export default async function TransactionsPage() {
  const supabase = await createSupabaseServerComponentClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  const { data: wallet } = await supabase
    .schema("public")
    .from("wallets")
    .select()
    .eq("profile_id", profile?.id)
    .single();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative w-full h-48 bg-gradient-to-r from-blue-600/90 to-blue-400/90 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
        <div className="flex flex-col md:flex-row items-center justify-between h-full px-8 py-6 relative z-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Your Transactions
            </h1>
            <p className="text-white/80 max-w-md">
              Manage your USDC balance and track your transaction history
            </p>
          </div>
          <AnimatedHero>
            <AnimatedDollar />
          </AnimatedHero>
        </div>
      </div>

      {/* Balance Card */}
      <AnimatedCard>
        <Card className="border-2 border-muted/30 shadow-lg overflow-hidden">
          <CardHeader className="bg-muted/20 border-b border-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-500" />
                <CardTitle>Account Balance</CardTitle>
              </div>
              <WalletInformationDialog wallet={wallet} />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid w-full items-center gap-6">
              <div className="flex flex-col space-y-1.5">
                <AnimatedBalance>
                  <WalletBalance walletId={wallet?.circle_wallet_id} />
                </AnimatedBalance>
              </div>
              <AnimatedButtons>
                <USDCButton className="flex-1" mode="BUY" walletAddress={wallet?.wallet_address} />
                <USDCButton className="flex-1" mode="SELL" walletAddress={wallet?.wallet_address} />
                {process.env.NODE_ENV === "development" && <RequestUsdcButton walletAddress={wallet?.wallet_address} />}
              </AnimatedButtons>
            </div>
          </CardContent>
        </Card>
      </AnimatedCard>

      {/* Transactions Section */}
      <AnimatedCard delay={0.7}>
        <Card className="border-2 border-muted/30 shadow-lg overflow-hidden">
          <CardHeader className="bg-muted/20 border-b border-muted/30">
            <div className="flex items-center gap-2">
              <ArrowDownUp className="h-5 w-5 text-blue-500" />
              <CardTitle>Transaction History</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Transactions wallet={wallet} profile={profile} />
          </CardContent>
        </Card>
      </AnimatedCard>
    </div>
  );
}