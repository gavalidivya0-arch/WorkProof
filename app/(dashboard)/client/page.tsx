import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Clock, Users } from "lucide-react";

export default async function ClientDashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // RBAC: Only CLIENT role can access
  if (session.user.role !== "CLIENT") {
    // Redirect to the correct dashboard based on role
    if (session.user.role === "FREELANCER") redirect("/dashboard");
    if (session.user.role === "ADMIN") redirect("/admin");
    redirect("/login");
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Client Portal</h2>
        <div className="flex items-center space-x-2">
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <Button type="submit" variant="outline">Sign Out</Button>
          </form>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Verifications
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Requests waiting for your review
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Verified Freelancers
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Freelancers you have endorsed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Your Team
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Active team members
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Welcome back, {session.user.name}</CardTitle>
            <CardDescription>
              Review and verify work from freelancers you've hired.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[200px] border-2 border-dashed border-border rounded-lg m-6 bg-muted/20">
            <ShieldCheck className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No pending verifications</h3>
            <p className="text-sm text-muted-foreground text-center max-w-sm mt-1">
              When a freelancer requests verification for a project they did for you, it will appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
