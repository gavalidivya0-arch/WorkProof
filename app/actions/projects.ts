"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validations/project";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export async function createProject(data: z.infer<typeof projectSchema>) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  // Double check role
  if (session.user.role !== "FREELANCER") {
    return { error: "Only freelancers can create projects." };
  }

  const parsed = projectSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid data provided.", details: parsed.error.format() };
  }

  // Enforce monetization limits
  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { plan: true }
  });

  if (dbUser?.plan === "FREE") {
    const projectCount = await prisma.project.count({
      where: { freelancerId: session.user.id }
    });
    
    if (projectCount >= 3) {
      return { error: "FREE plan limit reached. Upgrade to PRO to add more projects." };
    }
  }

  const { name, role, description, projectUrl, startDate, endDate, clientEmail, skills, deliverables } = parsed.data;

  // Process skills (comma separated string -> array of trimmed strings)
  const skillNames = skills.split(',').map(s => s.trim()).filter(Boolean);

  try {
    let clientId: string | null = null;
    
    // If a client email is provided, check if that client already exists in our system
    if (clientEmail) {
      const existingClient = await prisma.user.findUnique({
        where: { email: clientEmail }
      });
      if (existingClient && existingClient.role === "CLIENT") {
        clientId = existingClient.id;
      }
    }

    const project = await prisma.$transaction(async (tx: any) => {
      // 1. Create the project
      const newProject = await tx.project.create({
        data: {
          name,
          role,
          description,
          projectUrl: projectUrl || null,
          startDate,
          endDate: endDate || null,
          freelancerId: session.user.id,
          clientId,
          clientEmail: clientEmail || null,
          verificationStatus: "UNVERIFIED",
        }
      });

      // 2. Handle skills
      for (const skillName of skillNames) {
        // Upsert the skill globally
        const skill = await tx.skill.upsert({
          where: { name: skillName.toLowerCase() },
          update: {},
          create: { name: skillName.toLowerCase() }
        });

        // Link skill to project
        await tx.projectSkill.create({
          data: {
            projectId: newProject.id,
            skillId: skill.id
          }
        });
        
        // Link skill to user (to build their overall profile)
        await tx.userSkill.upsert({
          where: {
            userId_skillId: {
              userId: session.user.id!,
              skillId: skill.id
            }
          },
          update: {},
          create: {
            userId: session.user.id!,
            skillId: skill.id
          }
        });
      }

      // 3. Handle deliverables
      if (deliverables && deliverables.length > 0) {
        await tx.projectDeliverable.createMany({
          data: deliverables.map(d => ({
            projectId: newProject.id,
            title: d.title,
            description: d.description || null,
            url: d.url || null
          }))
        });
      }

      return newProject;
    });

    revalidatePath("/dashboard/projects");
    revalidatePath("/dashboard");
    return { success: true, projectId: project.id };
  } catch (error) {
    console.error("Failed to create project:", error);
    return { error: "Failed to save project. Please try again." };
  }
}

export async function deleteProject(projectId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    // Verify ownership
    const project = await prisma.project.findUnique({
      where: { id: projectId }
    });

    if (!project || project.freelancerId !== session.user.id) {
      return { error: "Not found or unauthorized." };
    }

    await prisma.project.delete({
      where: { id: projectId }
    });

    revalidatePath("/dashboard/projects");
    revalidatePath("/dashboard");
    if ((session.user as any).username) revalidatePath(`/${(session.user as any).username}`);
    
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete project." };
  }
}
