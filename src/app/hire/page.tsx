import { createSupabaseServerComponentClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";
import { CreateAgreementPage } from "@/components/ui/createAgreementPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EscrowAgreements } from "@/components/escrow-agreements";
import { HandshakeIcon, FileTextIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCard } from "@/components/dollar";

export default async function HirePage() {
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
      <div className="relative w-full h-48 bg-gradient-to-r from-blue-600/90 to-amber-600/90 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
        <div className="flex flex-col items-center justify-center h-full px-8 py-6 relative z-10 text-center">
          <HandshakeIcon className="h-12 w-12 text-white mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Hire Freelancers Securely
          </h1>
          <p className="text-white/80 max-w-2xl">
            Create smart contracts with escrow protection for your projects
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create Agreement Section */}
        <div className="flex flex-col">
          <AnimatedCard>
            <Card className="bg-card border-2 border-muted/30 shadow-lg h-full">
              <CardHeader className="bg-muted/20 border-b border-muted/30">
                <div className="flex items-center gap-2">
                  <FileTextIcon className="h-5 w-5 text-blue-500" />
                  <CardTitle>Create New Contract</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-6">
                  <p className="text-muted-foreground">
                    Create a secure smart contract with a freelancer. The funds will be held in escrow until the work is completed.
                  </p>
                </div>
                <CreateAgreementPage />
              </CardContent>
            </Card>
          </AnimatedCard>
        </div>

        {/* How It Works Section */}
        <div className="flex flex-col">
          <AnimatedCard delay={0.2}>
            <Card className="bg-card border-2 border-muted/30 shadow-lg h-full">
              <CardHeader className="bg-muted/20 border-b border-muted/30">
                <div className="flex items-center gap-2">
                  <ArrowRightIcon className="h-5 w-5 text-amber-500" />
                  <CardTitle>How It Works</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Select a Freelancer</h3>
                      <p className="text-muted-foreground">Choose a freelancer from the list or enter their wallet address directly.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Create a Contract</h3>
                      <p className="text-muted-foreground">Upload a contract or define the terms directly. The system will analyze and create a smart contract.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Fund the Escrow</h3>
                      <p className="text-muted-foreground">Deposit funds into the escrow account. The funds are locked until the work is completed.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Release Payment</h3>
                      <p className="text-muted-foreground">Once the work is completed, all requirements from the smart contract are met, AI releases the payment to the freelancer instantly</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>
        </div>
      </div>

      {/* Agreements Section */}
      <AnimatedCard delay={0.4}>
        <EscrowAgreements
          userId={user.id}
          profileId={profile?.id}
          walletId={wallet?.circle_wallet_id}
        />
      </AnimatedCard>
    </div>
  );
}
