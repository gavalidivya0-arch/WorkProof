import { prisma } from "@/lib/prisma";
// @ts-ignore
import { Prisma } from "@prisma/client";

export async function createProject(freelancerId: string, data: Omit<Prisma.ProjectCreateInput, 'freelancer' | 'client'>, clientId?: string) {
  return prisma.project.create({
    data: {
      ...data,
      freelancer: { connect: { id: freelancerId } },
      ...(clientId ? { client: { connect: { id: clientId } } } : {}),
    },
  });
}

export async function getProjectById(projectId: string) {
  return prisma.project.findUnique({
    where: { id: projectId },
    include: {
      freelancer: true,
      client: true,
      skills: {
        include: { skill: true }
      },
      deliverables: true,
      verification: true,
      verificationRequest: true,
      review: true,
    },
  });
}

export async function getFreelancerProjects(freelancerId: string) {
  return prisma.project.findMany({
    where: { freelancerId },
    include: {
      client: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getClientProjects(clientId: string) {
  return prisma.project.findMany({
    where: { clientId },
    include: {
      freelancer: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function addProjectDeliverable(projectId: string, data: Omit<Prisma.ProjectDeliverableCreateInput, 'project'>) {
  return prisma.projectDeliverable.create({
    data: {
      ...data,
      project: { connect: { id: projectId } },
    },
  });
}
