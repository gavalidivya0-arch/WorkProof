import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShieldCheck, Clock, ExternalLink, AlertCircle, Plus, Calendar } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default async function ProjectsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const projects = await prisma.project.findMany({
    where: { freelancerId: session.user.id },
    include: {
      skills: { include: { skill: true } },
      client: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Projects</h1>
          <p className="text-muted-foreground mt-2">
            Manage your portfolio and request client verifications.
          </p>
        </div>
        <Link href="/dashboard/projects/new" className={cn(buttonVariants(), "shrink-0 shadow-md shadow-primary/20")}>
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <Card className="glass border-dashed border-primary/20 bg-background/30 mt-8">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Plus className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">No projects yet</h3>
            <p className="text-muted-foreground max-w-sm">
              Upload your past work and request verification from your clients to build your Trust Score.
            </p>
            <Link href="/dashboard/projects/new" className={cn(buttonVariants(), "mt-4")}>
              Create your first project
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mt-8">
          {projects.map((project) => (
            <Card key={project.id} className="glass flex flex-col border-primary/10 hover:border-primary/30 transition-colors shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl line-clamp-1" title={project.name}>{project.name}</CardTitle>
                    <CardDescription className="mt-1 flex items-center">
                      <span className="font-medium text-foreground">{project.role}</span>
                    </CardDescription>
                  </div>
                  {project.verificationStatus === "VERIFIED" && (
                    <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shrink-0">
                      <ShieldCheck className="w-3 h-3 mr-1" /> Verified
                    </Badge>
                  )}
                  {project.verificationStatus === "PENDING" && (
                    <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 shrink-0">
                      <Clock className="w-3 h-3 mr-1" /> Pending
                    </Badge>
                  )}
                  {project.verificationStatus === "UNVERIFIED" && (
                    <Badge variant="outline" className="text-muted-foreground shrink-0">
                      Unverified
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.skills.slice(0, 3).map((ps) => (
                    <Badge key={ps.skillId} variant="secondary" className="text-xs font-normal">
                      {ps.skill.name}
                    </Badge>
                  ))}
                  {project.skills.length > 3 && (
                    <Badge variant="secondary" className="text-xs font-normal">
                      +{project.skills.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t border-border/40 pt-4 flex items-center justify-between bg-muted/20">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3 mr-1.5" />
                  {format(new Date(project.startDate), "MMM yyyy")} 
                  {project.endDate ? ` - ${format(new Date(project.endDate), "MMM yyyy")}` : " - Present"}
                </div>
                <Link href={`/dashboard/projects/${project.id}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                  View Details
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
