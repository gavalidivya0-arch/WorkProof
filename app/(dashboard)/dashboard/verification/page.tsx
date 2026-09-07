import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ShieldCheck, XCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";

export default async function FreelancerVerificationPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  if (session.user.role !== "FREELANCER") {
    redirect("/dashboard");
  }

  const requests = await prisma.verificationRequest.findMany({
    where: {
      project: {
        freelancerId: session.user.id
      }
    },
    include: {
      project: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Verification Requests</h1>
        <p className="text-muted-foreground mt-2">
          Track the status of your project verification requests sent to clients.
        </p>
      </div>

      {requests.length === 0 ? (
        <Card className="glass bg-background/30 mt-8">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">No requests yet</h3>
            <p className="text-muted-foreground max-w-sm">
              You haven't requested verification for any of your projects yet. Go to your Projects tab to send one!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 mt-8">
          {requests.map((req: any) => (
            <Card key={req.id} className="glass border-primary/10 hover:border-primary/30 transition-colors shadow-sm overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="p-6 flex-1 flex flex-col justify-center">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-bold">{req.project.name}</h3>
                    {req.status === "APPROVED" && (
                      <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                        <ShieldCheck className="w-3 h-3 mr-1" /> Approved
                      </Badge>
                    )}
                    {req.status === "PENDING" && (
                      <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                        <Clock className="w-3 h-3 mr-1" /> Pending
                      </Badge>
                    )}
                    {req.status === "REJECTED" && (
                      <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                        <XCircle className="w-3 h-3 mr-1" /> Rejected
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mt-1">Sent to: <span className="font-medium text-foreground">{req.clientEmail}</span></p>
                  
                  {req.message && (
                    <div className="mt-4 p-3 bg-muted/50 rounded-md text-sm border-l-2 border-primary/30">
                      <p className="text-muted-foreground italic">"{req.message}"</p>
                    </div>
                  )}
                </div>
                
                <div className="p-6 md:w-64 bg-muted/20 border-t md:border-t-0 md:border-l border-border/40 flex flex-col justify-center space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Requested On</p>
                    <p className="text-sm font-medium">{format(new Date(req.createdAt), "MMM d, yyyy")}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Expires On</p>
                    <p className="text-sm font-medium text-amber-600 dark:text-amber-400">{format(new Date(req.expiresAt), "MMM d, yyyy")}</p>
                  </div>
                  {req.status === "PENDING" && new Date() > req.expiresAt && (
                    <div className="flex items-center text-xs text-destructive mt-2">
                      <AlertCircle className="w-3 h-3 mr-1" /> Expired
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
