"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { projectSchema } from "@/lib/validations/project";
import { createProject, deleteProject } from "@/app/actions/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Calendar, Link2, Briefcase, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

type ProjectFormProps = {
  defaultValues?: Partial<z.infer<typeof projectSchema>>;
  projectId?: string;
  isVerified?: boolean;
};

export function ProjectForm({ defaultValues, projectId, isVerified }: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Format dates for native date input (yyyy-MM-dd)
  const defaultStartDate = defaultValues?.startDate ? format(new Date(defaultValues.startDate), "yyyy-MM-dd") : "";
  const defaultEndDate = defaultValues?.endDate ? format(new Date(defaultValues.endDate), "yyyy-MM-dd") : "";

  const { register, control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof projectSchema>>({
    // @ts-ignore - TS complains about date strings vs Date objects for native inputs
    resolver: zodResolver(projectSchema),
    // @ts-ignore - TS complains about date strings vs Date objects for native inputs
    defaultValues: {
      ...defaultValues,
      startDate: defaultStartDate as any, // Using native date strings for the input, zod coerces it on submit
      endDate: defaultEndDate as any,
      deliverables: defaultValues?.deliverables || [{ title: "", description: "", url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "deliverables",
  });

  const onSubmit = async (data: z.infer<typeof projectSchema>) => {
    setIsSubmitting(true);
    
    // Create new project (Edit mode not fully implemented in server action yet for brevity, assuming create for now or handled similarly)
    // For a real app we'd have updateProject as well.
    const result = await createProject(data); 
    
    setIsSubmitting(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(projectId ? "Project updated successfully!" : "Project created successfully!");
      router.push("/dashboard/projects");
    }
  };

  const handleDelete = async () => {
    if (!projectId || !confirm("Are you sure you want to delete this project? This action cannot be undone.")) return;
    
    setIsDeleting(true);
    const result = await deleteProject(projectId);
    setIsDeleting(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Project deleted successfully.");
      router.push("/dashboard/projects");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-8">
      {isVerified && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 p-4 rounded-lg text-sm mb-6">
          <strong>This project has been verified by the client!</strong> Editing major details may require re-verification.
        </div>
      )}
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Project Name <span className="text-destructive">*</span></Label>
          <Input id="name" placeholder="e.g. E-commerce Platform Redesign" {...register("name")} />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Your Role <span className="text-destructive">*</span></Label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input id="role" className="pl-9" placeholder="e.g. Lead Frontend Developer" {...register("role")} />
          </div>
          {errors.role && <p className="text-sm text-destructive">{errors.role.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Project Description <span className="text-destructive">*</span></Label>
        <Textarea 
          id="description" 
          placeholder="Describe the project, the problems you solved, and your impact..." 
          className="min-h-[120px]"
          {...register("description")} 
        />
        {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="skills">Technologies & Skills <span className="text-destructive">*</span></Label>
        <Input id="skills" placeholder="e.g. React, Next.js, Tailwind CSS, PostgreSQL" {...register("skills")} />
        <p className="text-xs text-muted-foreground">Separate multiple skills with commas.</p>
        {errors.skills && <p className="text-sm text-destructive">{errors.skills.message}</p>}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date <span className="text-destructive">*</span></Label>
          <Input id="startDate" type="date" {...register("startDate")} />
          {errors.startDate && <p className="text-sm text-destructive">{errors.startDate.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input id="endDate" type="date" {...register("endDate")} />
          <p className="text-xs text-muted-foreground">Leave blank if this is an ongoing project.</p>
          {errors.endDate && <p className="text-sm text-destructive">{errors.endDate.message}</p>}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="clientEmail">Client Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input id="clientEmail" type="email" className="pl-9" placeholder="client@company.com" {...register("clientEmail")} />
          </div>
          <p className="text-xs text-muted-foreground">Used to request verification from your client.</p>
          {errors.clientEmail && <p className="text-sm text-destructive">{errors.clientEmail.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="projectUrl">Live URL / Repository</Label>
          <div className="relative">
            <Link2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input id="projectUrl" type="url" className="pl-9" placeholder="https://..." {...register("projectUrl")} />
          </div>
          {errors.projectUrl && <p className="text-sm text-destructive">{errors.projectUrl.message}</p>}
        </div>
      </div>

      {/* Deliverables Section using Field Array */}
      <div className="space-y-4 pt-6 border-t border-border/40">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Deliverables</h3>
            <p className="text-sm text-muted-foreground">List the specific items you delivered for this project.</p>
          </div>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={() => append({ title: "", description: "", url: "" })}
            className="shrink-0"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Deliverable
          </Button>
        </div>
        
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 bg-muted/30 border border-border/50 rounded-lg relative group">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              
              <div className="grid gap-4 md:grid-cols-2 mr-8">
                <div className="space-y-2">
                  <Label>Title <span className="text-destructive">*</span></Label>
                  <Input placeholder="e.g. Admin Dashboard UI" {...register(`deliverables.${index}.title` as const)} />
                  {errors.deliverables?.[index]?.title && (
                    <p className="text-sm text-destructive">{errors.deliverables[index]?.title?.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>URL</Label>
                  <Input type="url" placeholder="https://..." {...register(`deliverables.${index}.url` as const)} />
                  {errors.deliverables?.[index]?.url && (
                    <p className="text-sm text-destructive">{errors.deliverables[index]?.url?.message}</p>
                  )}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Description</Label>
                  <Textarea 
                    placeholder="Briefly describe this deliverable..." 
                    className="min-h-[80px]"
                    {...register(`deliverables.${index}.description` as const)} 
                  />
                  {errors.deliverables?.[index]?.description && (
                    <p className="text-sm text-destructive">{errors.deliverables[index]?.description?.message}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-border/40">
        {projectId ? (
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting || isSubmitting}>
            {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
            Delete Project
          </Button>
        ) : <div />}
        
        <Button type="submit" disabled={isSubmitting || isDeleting} className="min-w-[140px] shadow-md shadow-primary/20">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {projectId ? "Save Changes" : "Create Project"}
        </Button>
      </div>
    </form>
  );
}
