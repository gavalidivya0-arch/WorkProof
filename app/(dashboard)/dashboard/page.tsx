import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, FileCheck, UserCircle } from "lucide-react";
import Link from "next/link";

export default async function FreelancerDashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // RBAC: Only FREELANCER role can access
  if (session.user.role !== "FREELANCER") {
    // Redirect to the correct dashboard based on role
    if (session.user.role === "CLIENT") redirect("/client");
    if (session.user.role === "ADMIN") redirect("/admin");
    redirect("/login");
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <Button variant="outline">Sign Out</Button>
          </form>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Verified Projects
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Projects verified by clients
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Verification
            </CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Awaiting client approval
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 pt-4">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Welcome back, {session.user.name}</CardTitle>
            <CardDescription>
              Your freelancer profile is ready. Start adding projects to get them verified.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[200px] border-2 border-dashed border-border rounded-lg m-6 bg-muted/20">
            <UserCircle className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No projects yet</h3>
            <p className="text-sm text-muted-foreground text-center max-w-sm mt-1 mb-4">
              Add your past freelance work and request verification from your clients.
            </p>
            <Button disabled>Add Project</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
