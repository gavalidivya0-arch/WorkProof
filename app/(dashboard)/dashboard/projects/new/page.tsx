import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ProjectForm } from "../project-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function NewProjectPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/projects" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full")}>
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Project</h1>
          <p className="text-muted-foreground mt-1">
            Upload your work to your portfolio so you can request client verification.
          </p>
        </div>
      </div>
      
      <div className="p-6 md:p-8 glass border border-primary/10 rounded-xl shadow-sm">
        <ProjectForm />
      </div>
    </div>
  );
}
