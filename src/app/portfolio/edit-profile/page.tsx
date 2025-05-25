'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, User } from "lucide-react";
import Link from "next/link";
import { AnimatedCard } from "@/components/dollar";

export default function EditProfilePage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [profile, setProfile] = useState({
    id: '',
    full_name: '',
    name: '',
    company_name: '',
    email: '',
    bio: ''
  });

  const [portfolioData, setPortfolioData] = useState({
    id: '',
    description: '',
    rate: 0
  });

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      setError(null);
      
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          router.push('/sign-in');
          return;
        }
        
        // Get profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('id, full_name, name, company_name, email, bio')
          .eq('auth_user_id', user.id)
          .single();
          
        if (profileError) throw profileError;
        
        if (profileData) {
          setProfile({
            id: profileData.id || '',
            full_name: profileData.full_name || '',
            name: profileData.name || '',
            company_name: profileData.company_name || '',
            email: profileData.email || '',
            bio: profileData.bio || ''
          });
        }
        
        // Get portfolio data
        const { data: portfolioItems, error: portfolioError } = await supabase
          .from('portfolio')
          .select('*')
          .eq('user_id', user.id);
          
        if (portfolioError) throw portfolioError;
        
        if (portfolioItems && portfolioItems.length > 0) {
          setPortfolioData({
            id: portfolioItems[0].id || '',
            description: portfolioItems[0].description || '',
            rate: portfolioItems[0].rate || 0
          });
        }
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    }
    
    loadProfile();
  }, [supabase, router]);
  
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/sign-in');
        return;
      }
      
      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          name: profile.name,
          company_name: profile.company_name,
          bio: profile.bio,
          email: profile.email
        })
        .eq('id', profile.id);
        
      if (profileError) throw profileError;
      
      // Check if portfolio exists
      if (portfolioData.id) {
        // Update existing portfolio
        const { error: portfolioError } = await supabase
          .from('portfolio')
          .update({
            description: portfolioData.description,
            rate: portfolioData.rate
          })
          .eq('id', portfolioData.id);
          
        if (portfolioError) throw portfolioError;
      } else {
        // Create new portfolio
        const { error: portfolioError } = await supabase
          .from('portfolio')
          .insert({
            user_id: user.id,
            description: portfolioData.description,
            rate: portfolioData.rate,
            name: profile.full_name || profile.name
          });
          
        if (portfolioError) throw portfolioError;
      }
      
      setSuccess(true);
      
      // Refresh the page data
      router.refresh();
      
      // Show success message for 2 seconds, then redirect
      setTimeout(() => {
        router.push('/portfolio');
      }, 2000);
      
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="flex items-center mb-6">
        <Button variant="ghost" asChild className="mr-4">
          <Link href="/portfolio">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Edit Profile</h1>
      </div>
      
      <AnimatedCard>
        <Card className="border-ruby-lighter dark:border-ruby-dark mb-8">
          <CardHeader className="bg-gradient-to-r from-ruby-lighter/50 to-white dark:from-ruby-dark/30 dark:to-transparent border-b border-ruby-lighter">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-ruby dark:text-ruby-light" />
              <CardTitle>Personal Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-6">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm mb-6">
                Profile updated successfully! Redirecting...
              </div>
            )}
            
            {loading ? (
              <div className="text-center py-8">Loading profile data...</div>
            ) : (
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="full_name" className="text-ruby-dark font-medium">Full Name</Label>
                    <Input
                      id="full_name"
                      value={profile.full_name}
                      onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                      placeholder="Your full name"
                      className="border-ruby-lighter focus:border-ruby focus:ring-ruby"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company_name" className="text-ruby-dark font-medium">Company/Organization</Label>
                    <Input
                      id="company_name"
                      value={profile.company_name || ''}
                      onChange={(e) => setProfile({...profile, company_name: e.target.value})}
                      placeholder="Your company or organization (optional)"
                      className="border-ruby-lighter focus:border-ruby focus:ring-ruby"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-ruby-dark font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email || ''}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    placeholder="Your email address"
                    className="border-ruby-lighter focus:border-ruby focus:ring-ruby"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-ruby-dark font-medium">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    value={portfolioData.description || ''}
                    onChange={(e) => setPortfolioData({...portfolioData, description: e.target.value})}
                    placeholder="Tell clients about your professional background"
                    className="min-h-[120px] border-ruby-lighter focus:border-ruby focus:ring-ruby"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rate" className="text-ruby-dark font-medium">Hourly Rate (USDC)</Label>
                  <Input
                    id="rate"
                    type="number"
                    min="0"
                    step="0.01"
                    value={portfolioData.rate || ''}
                    onChange={(e) => setPortfolioData({...portfolioData, rate: parseFloat(e.target.value) || 0})}
                    placeholder="Your hourly rate"
                    className="border-ruby-lighter focus:border-ruby focus:ring-ruby"
                  />
                </div>
                
                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/portfolio')}
                    className="border-ruby-light hover:bg-ruby-lighter/10"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-gradient-primary hover:opacity-90"
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </AnimatedCard>
    </>
  );
}
