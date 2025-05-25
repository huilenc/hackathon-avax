import { createSupabaseServerComponentClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { PlusCircle, Briefcase, Code, Award, DollarSign } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
import { AnimatedCard } from "@/components/dollar";

export default async function PortfolioPage() {
  const supabase = await createSupabaseServerComponentClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: portfolio } = await supabase
  .from("portfolio")
  .select("*")
  .eq("user_id", user?.id)
  .single();


  console.log("here portfolio data", portfolio);

  return (
    <>
      {/* Edit Profile form */}
    
            
        
    </>
  );
}
