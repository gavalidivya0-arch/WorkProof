import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { calculateTrustScore } from "@/lib/db/users";
import { getFreelancerProjects } from "@/lib/db/projects";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FolderKanban, ShieldCheck, Clock, Star, Activity } from "lucide-react";

export default async function DashboardOverview() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const [trustData, projects] = await Promise.all([
    calculateTrustScore(session.user.id!),
    getFreelancerProjects(session.user.id!)
  ]);

  const totalProjects = projects.length;
  const verifiedProjects = projects.filter((p: any) => p.verificationStatus === "VERIFIED").length;
  const pendingProjects = projects.filter((p: any) => p.verificationStatus === "PENDING").length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {session.user.name || "Freelancer"}! Here's what's happening with your WorkProof profile.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass border-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trust Score</CardTitle>
            <ShieldCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trustData.score} / 100</div>
            <p className="text-xs text-muted-foreground mt-1">Based on verified experience</p>
          </CardContent>
        </Card>
        <Card className="glass border-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
            <p className="text-xs text-muted-foreground mt-1">Uploaded to portfolio</p>
          </CardContent>
        </Card>
        <Card className="glass border-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{verifiedProjects}</div>
            <p className="text-xs text-muted-foreground mt-1">Client approved</p>
          </CardContent>
        </Card>
        <Card className="glass border-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingProjects}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting client response</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 glass border-primary/10">
          <CardHeader>
            <CardTitle>Trust Score Breakdown</CardTitle>
            <CardDescription>
              A transparent view of how your score is calculated.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Profile Completeness</span>
                <span className="text-muted-foreground">{trustData.breakdown.profileCompleteness} / {trustData.breakdown.maxProfile} pts</span>
              </div>
              <Progress value={(trustData.breakdown.profileCompleteness / trustData.breakdown.maxProfile) * 100} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Verified Experience</span>
                <span className="text-muted-foreground">{trustData.breakdown.verifiedProjects} / {trustData.breakdown.maxProjects} pts</span>
              </div>
              <Progress value={(trustData.breakdown.verifiedProjects / trustData.breakdown.maxProjects) * 100} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Client Reviews</span>
                <span className="text-muted-foreground">{trustData.breakdown.clientReviews} / {trustData.breakdown.maxReviews} pts</span>
              </div>
              <Progress value={(trustData.breakdown.clientReviews / trustData.breakdown.maxReviews) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 glass border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates on your verifications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Dummy data for now until we build notifications */}
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Welcome to WorkProof!</p>
                  <p className="text-sm text-muted-foreground">Complete your profile to boost your trust score.</p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">Just now</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
