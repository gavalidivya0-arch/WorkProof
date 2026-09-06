import { prisma } from "@/lib/prisma";
// @ts-ignore
import { Prisma } from "@prisma/client";

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      profile: true,
      organization: true,
    },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function updateUserProfile(userId: string, data: Prisma.ProfileUpdateInput) {
  return prisma.profile.upsert({
    where: { userId },
    update: data,
    create: {
      userId,
      ...data as Prisma.ProfileCreateWithoutUserInput,
    },
  });
}

export async function getUserSkills(userId: string) {
  return prisma.userSkill.findMany({
    where: { userId },
    include: {
      skill: true,
    },
  });
}

export async function addUserSkill(userId: string, skillId: string) {
  return prisma.userSkill.create({
    data: {
      userId,
      skillId,
    },
  });
}
