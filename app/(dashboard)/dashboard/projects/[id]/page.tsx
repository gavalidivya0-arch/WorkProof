import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/app/(dashboard)/dashboard/projects/project-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) redirect("/login");

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      deliverables: true,
      skills: {
        include: { skill: true }
      }
    }
  });

  if (!project || project.freelancerId !== session.user.id) {
    notFound();
  }

  // Format skills back into a comma-separated string for the form
  const skillsString = project.skills.map((ps: any) => ps.skill.name).join(", ");

  const defaultValues = {
    ...project,
    clientEmail: project.clientEmail || "",
    projectUrl: project.projectUrl || "",
    skills: skillsString,
    deliverables: project.deliverables.map((d: any) => ({
      id: d.id,
      title: d.title,
      description: d.description || "",
      url: d.url || ""
    }))
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/projects" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full")}>
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
          <p className="text-muted-foreground mt-1">
            Update your project details or add new deliverables.
          </p>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-2">Technologies Used</h3>
        <div className="flex flex-wrap gap-2">
          {project.skills.map((ps: any) => (
            <Badge key={ps.skillId} variant="secondary">{ps.skill.name}</Badge>
          ))}
        </div>
      </div>
      
      <div className="p-6 md:p-8 glass border border-primary/10 rounded-xl shadow-sm">
        <ProjectForm defaultValues={defaultValues as any} projectId={project.id} isVerified={project.verificationStatus === 'VERIFIED'} />
      </div>
    </div>
  );
}
