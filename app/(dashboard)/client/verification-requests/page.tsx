import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Clock, CheckCircle, ExternalLink, User } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function ClientVerificationsPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  if (session.user.role !== "CLIENT") {
    redirect("/dashboard");
  }

  // Find verification requests matching this client's email OR their user ID (if linked)
  const requests = await prisma.verificationRequest.findMany({
    where: {
      OR: [
        { clientEmail: session.user.email },
        { project: { clientId: session.user.id } }
      ]
    },
    include: {
      project: {
        include: {
          freelancer: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const pendingRequests = requests.filter((r: any) => r.status === "PENDING" && new Date() <= r.expiresAt);
  const pastRequests = requests.filter((r: any) => r.status !== "PENDING" || new Date() > r.expiresAt);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Verification Requests</h1>
        <p className="text-muted-foreground mt-2">
          Review and verify projects that freelancers claim to have worked on with you.
        </p>
      </div>

      <div className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold tracking-tight">Action Required</h2>
        
        {pendingRequests.length === 0 ? (
          <Card className="border-dashed bg-muted/20">
            <CardContent className="flex flex-col items-center justify-center py-10 text-center space-y-2">
              <ShieldCheck className="w-8 h-8 text-muted-foreground mb-2" />
              <p className="font-medium">You're all caught up!</p>
              <p className="text-sm text-muted-foreground">No pending verification requests at the moment.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pendingRequests.map((req: any) => (
              <Card key={req.id} className="border-primary/20 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg line-clamp-1">{req.project.name}</CardTitle>
                    <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 shrink-0">
                      <Clock className="w-3 h-3 mr-1" /> Pending
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center mt-1">
                    <User className="w-3 h-3 mr-1" /> {req.project.freelancer.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><span className="font-medium text-foreground">Role:</span> {req.project.role}</p>
                    <p><span className="font-medium text-foreground">Requested:</span> {format(new Date(req.createdAt), "MMM d, yyyy")}</p>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 pt-4">
                  <Link 
                    href={`/client/verification-requests/${req.id}`}
                    className={cn(buttonVariants({ variant: "default" }), "w-full shadow-md shadow-primary/20 group-hover:bg-primary/90 transition-all")}
                  >
                    Review Request
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4 mt-12">
        <h2 className="text-xl font-semibold tracking-tight">Past Requests</h2>
        
        {pastRequests.length === 0 ? (
          <p className="text-sm text-muted-foreground">No past requests found.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {pastRequests.map((req: any) => (
              <Card key={req.id} className="bg-muted/10 opacity-80">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{req.project.name}</CardTitle>
                      <CardDescription className="text-xs mt-1">From {req.project.freelancer.name}</CardDescription>
                    </div>
                    {req.status === "APPROVED" && (
                      <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 shrink-0">
                        <CheckCircle className="w-3 h-3 mr-1" /> Verified
                      </Badge>
                    )}
                    {req.status === "REJECTED" && (
                      <Badge variant="outline" className="text-destructive border-destructive/20 shrink-0">
                        Rejected
                      </Badge>
                    )}
                    {req.status === "PENDING" && new Date() > req.expiresAt && (
                      <Badge variant="outline" className="text-muted-foreground shrink-0">
                        Expired
                      </Badge>
                    )}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
