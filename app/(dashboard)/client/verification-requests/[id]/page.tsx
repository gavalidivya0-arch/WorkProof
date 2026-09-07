import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ClientVerificationForm } from "./verification-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default async function ProcessVerificationPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  if (session.user.role !== "CLIENT") {
    redirect("/dashboard");
  }

  const request = await prisma.verificationRequest.findUnique({
    where: { id: params.id },
    include: {
      project: {
        include: {
          freelancer: true,
          deliverables: true,
          skills: { include: { skill: true } }
        }
      }
    }
  });

  if (!request) notFound();

  // Security: only allow if it matches client email
  if (request.clientEmail !== session.user.email) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-2xl font-bold">Unauthorized</h2>
        <p className="text-muted-foreground mt-2">You do not have permission to view this request.</p>
        <Link href="/client/verification-requests" className="mt-4">
          <Button variant="outline">Go Back</Button>
        </Link>
      </div>
    );
  }

  const isExpired = new Date() > request.expiresAt;
  const isProcessable = request.status === "PENDING" && !isExpired;

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div>
        <Link href="/client/verification-requests" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Requests
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Review Verification Request</h1>
            <p className="text-muted-foreground mt-2">
              <span className="font-semibold text-foreground">{request.project.freelancer.name}</span> has requested that you verify their work on this project.
            </p>
          </div>
          {!isProcessable && (
            <Badge variant="outline" className="text-sm px-3 py-1">
              {isExpired && request.status === "PENDING" ? "Expired" : request.status}
            </Badge>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-8 mt-8">
        <div className="md:col-span-3 space-y-8">
          <div className="glass rounded-xl p-6 md:p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <span className="text-9xl font-black">"</span>
            </div>
            
            <div>
              <h2 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-1">Project Name</h2>
              <p className="text-2xl font-bold">{request.project.name}</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h2 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-1">Role</h2>
                <p className="text-lg font-medium">{request.project.role}</p>
              </div>
              <div>
                <h2 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-1">Duration</h2>
                <div className="flex items-center text-lg font-medium">
                  <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                  {format(new Date(request.project.startDate), "MMM yyyy")} 
                  {request.project.endDate ? ` — ${format(new Date(request.project.endDate), "MMM yyyy")}` : " — Present"}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-2">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {request.project.skills.map((ps: any) => (
                  <Badge key={ps.id} variant="secondary">{ps.skill.name}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-2">Claimed Deliverables</h2>
              <ul className="space-y-3">
                {request.project.deliverables.map((d: any) => (
                  <li key={d.id} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 shrink-0" />
                    <div>
                      <p className="font-medium">{d.title}</p>
                      {d.description && <p className="text-sm text-muted-foreground mt-0.5">{d.description}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            {request.message && (
              <div className="bg-muted/50 p-4 rounded-lg border-l-2 border-primary/40 mt-4">
                <h2 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Message from Freelancer</h2>
                <p className="italic text-sm">"{request.message}"</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="md:col-span-2">
          {isProcessable ? (
            <ClientVerificationForm requestId={request.id} />
          ) : (
            <div className="bg-muted/30 rounded-xl p-6 text-center border border-border/50">
              <h3 className="font-semibold text-lg">Action Unavailable</h3>
              <p className="text-muted-foreground text-sm mt-2 mb-6">
                This verification request is no longer pending or has expired.
              </p>
              <Link href="/client/verification-requests">
                <Button variant="outline" className="w-full">Back to Requests</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
