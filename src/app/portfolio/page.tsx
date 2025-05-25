import { createSupabaseServerComponentClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Briefcase, Code, Award, DollarSign } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PortfolioDialog } from "@/components/portfolio-dialog";
import { ProjectUploadDialog } from "@/components/project-upload-dialog";
import { AnimatedCard } from "@/components/dollar";

export default async function PortfolioPage() {
  const supabase = await createSupabaseServerComponentClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, name, company_name, email, full_name")
    .eq("auth_user_id", user.id)
    .single();

  // Placeholder for portfolio projects - this would be replaced with actual data
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("profile_id", profile?.id)
    .order("created_at", { ascending: false });

// task: retrieve portfolio data correctly
const { data: portfolio } = await supabase
    .from("portfolio")
    .select("*")
    .eq("user_id", user?.id)
    .single();

    console.log("here is my portfolio data", portfolio);

  return (
    <>
      {/* Hero Section with Profile */}
      <AnimatedCard>
        <div className="relative w-full h-64 bg-gradient-primary rounded-lg mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
          <div className="flex flex-col md:flex-row items-center justify-between h-full px-8 py-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="h-24 w-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-3xl font-bold border-2 border-gold">
                {profile?.full_name?.charAt(0) || profile?.name?.charAt(0) || "F"}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {profile?.full_name || profile?.name || "Freelancer"}
                </h1>
                <p className="text-white/80 mt-2 max-w-md">
                  {portfolio?.description || "Add your professional bio here"}
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              {profile?.id && (
                <PortfolioDialog 
                  profileId={profile.id}

                  trigger={
                    <Button variant="default" className="shadow-lg bg-gradient-primary hover:opacity-90 border border-gold">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Edit Portfolio
                    </Button>
                  }
                />
              )}
              <Button variant="secondary" className="shadow-lg border border-gold hover:bg-gold/10">
                <Link href="/portfolio/edit-profile">Edit Profile</Link>
              </Button>
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Rate and Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <AnimatedCard delay={0.1}>
          <Card className="bg-gradient-to-br from-ruby-lighter to-white dark:from-ruby-dark/40 dark:to-ruby/30 border-ruby-light dark:border-ruby-dark">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-ruby-lighter dark:bg-ruby-dark/50 border border-gold">
                  <DollarSign className="h-6 w-6 text-ruby dark:text-ruby-light" />
                </div>
                <div>
                  <p className="text-sm text-ruby dark:text-ruby-light font-medium">My Rate</p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">
                      {portfolio?.rate || "0"} USDC
                    </h3>
                    <span className="ml-2 text-sm text-muted-foreground">/hour</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedCard>
        
        <AnimatedCard delay={0.2}>
          <Card className="bg-gradient-to-br from-ruby-light to-ruby-lighter dark:from-ruby/40 dark:to-ruby-light/30 border-ruby-light dark:border-ruby">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-ruby-lighter dark:bg-ruby/50 border border-gold">
                  <Briefcase className="h-6 w-6 text-ruby dark:text-ruby-lighter" />
                </div>
                <div>
                  <p className="text-sm text-ruby dark:text-ruby-lighter font-medium">Projects</p>
                  <h3 className="text-2xl font-bold">{projects?.length || 0}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedCard>
        
        <AnimatedCard delay={0.3}>
          <Card className="bg-gradient-to-br from-ruby-dark to-ruby dark:from-ruby-dark/60 dark:to-ruby-dark/30 border-ruby dark:border-ruby-dark">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-ruby dark:bg-ruby-dark/70 border border-gold">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white font-medium">Experience</p>
                  <h3 className="text-2xl font-bold text-white">3+ Years</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedCard>
      </div>

      {/* Skills Section */}
      <AnimatedCard delay={0.4}>
        <Card className="mb-8 border-ruby-lighter dark:border-ruby-dark">
          <CardHeader className="flex-row items-center justify-between bg-gradient-to-r from-ruby-lighter/50 to-white dark:from-ruby-dark/30 dark:to-transparent border-b border-ruby-lighter">
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-ruby dark:text-ruby-light" />
              <CardTitle>Skills & Expertise</CardTitle>
            </div>
            <Button variant="outline" size="sm" className="border-ruby hover:bg-ruby-lighter/10">
              <Link href="/portfolio/edit-skills">Edit Skills</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-2">
              {/* Placeholder for skills - would be replaced with actual data */}
              <div className="bg-ruby-lighter text-ruby-dark px-3 py-1 rounded-full text-sm border border-gold/30">
                Smart Contract Development
              </div>
              <div className="bg-ruby-lighter text-ruby-dark px-3 py-1 rounded-full text-sm border border-gold/30">
                Web3 Integration
              </div>
              <div className="bg-ruby-lighter text-ruby-dark px-3 py-1 rounded-full text-sm border border-gold/30">
                DeFi Applications
              </div>
              <div className="bg-ruby-lighter text-ruby-dark px-3 py-1 rounded-full text-sm border border-gold/30">
                Cross-chain Solutions
              </div>
              <div className="bg-ruby-lighter text-ruby-dark px-3 py-1 rounded-full text-sm border border-gold/30">
                Solidity
              </div>
              <div className="bg-ruby-lighter text-ruby-dark px-3 py-1 rounded-full text-sm border border-gold/30">
                React
              </div>
              <div className="bg-ruby-lighter text-ruby-dark px-3 py-1 rounded-full text-sm border border-gold/30">
                NextJS
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedCard>

      {/* Projects Section */}
      <AnimatedCard delay={0.5}>
        <Card className="mb-8 border-ruby-lighter dark:border-ruby-dark">
          <CardHeader className="flex-row items-center justify-between bg-gradient-to-r from-ruby-lighter/50 to-white dark:from-ruby-dark/30 dark:to-transparent border-b border-ruby-lighter">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-ruby dark:text-ruby-light" />
              <CardTitle>Portfolio Projects</CardTitle>
            </div>
            {profile?.id && (
              <ProjectUploadDialog 
                profileId={profile.id} 
          
                trigger={
                  <Button className="bg-gradient-primary hover:opacity-90 border border-ruby-light">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Project
                  </Button>
                }
              />
            )}
          </CardHeader>
          <CardContent className="p-6">
            {projects && projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <AnimatedCard key={project.id} delay={0.1}>
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-ruby-lighter hover:border-gold">
                      <div className="h-48 bg-gradient-to-br from-ruby-lighter to-white dark:from-ruby-dark/40 dark:to-ruby/30 relative">
                        {project.image_url && (
                          <Image
                            src={project.image_url}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <CardContent className="p-5">
                        <h3 className="font-semibold text-lg mb-2 text-ruby-dark">{project.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {project.tags?.split(',').map((tag: string, i: number) => (
                            <span key={i} className="text-xs px-2 py-1 bg-ruby-lighter text-ruby-dark rounded-full border border-gold/20">
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedCard>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ruby-lighter flex items-center justify-center border-2 border-gold">
                  <Briefcase className="h-8 w-8 text-ruby-dark" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-ruby-dark">No projects yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Showcase your best work by adding projects to your portfolio.
                </p>
                {profile?.id && (
                  <ProjectUploadDialog 
                    profileId={profile.id}
                    trigger={
                      <Button className="bg-gradient-primary hover:opacity-90 border border-gold">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Your First Project
                      </Button>
                    }
                  />
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </AnimatedCard>
    </>
  );
}
