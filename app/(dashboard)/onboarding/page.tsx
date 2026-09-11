"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { assignRole } from "@/app/actions/onboarding";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectRole = async (role: "FREELANCER" | "CLIENT") => {
    setIsSubmitting(true);
    setError(null);
    
    const result = await assignRole(role);
    
    if (result.error) {
      setError(result.error);
      setIsSubmitting(false);
    } else {
      // Force NextAuth to refresh the session JWT so it picks up the new role
      await update({ role: role });
      
      // Redirect to correct dashboard
      if (role === "FREELANCER") {
        router.push("/dashboard");
      } else {
        router.push("/client");
      }
      router.refresh();
    }
  };

  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center">
      <Card className="w-full max-w-md glass border-primary/20 shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome to WorkProof</CardTitle>
          <CardDescription>
            How are you planning to use the platform?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 bg-destructive/15 text-destructive text-sm rounded-md border border-destructive/20 text-center">
              {error}
            </div>
          )}
          
          <Button 
            onClick={() => handleSelectRole("FREELANCER")} 
            disabled={isSubmitting}
            className="w-full h-14 text-lg justify-start px-6 font-semibold"
            variant="outline"
          >
            I am a Freelancer
          </Button>
          
          <Button 
            onClick={() => handleSelectRole("CLIENT")} 
            disabled={isSubmitting}
            className="w-full h-14 text-lg justify-start px-6 font-semibold"
            variant="outline"
          >
            I am a Client
          </Button>

          {isSubmitting && (
            <div className="flex justify-center pt-4">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
