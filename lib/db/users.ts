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

export async function calculateTrustScore(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: true,
      projectsAsFreelancer: {
        include: {
          review: true,
        }
      }
    }
  });

  if (!user) return { 
    score: 0, 
    breakdown: {
      profileCompleteness: 0,
      verifiedProjects: 0,
      clientReviews: 0,
      maxProfile: 20,
      maxProjects: 40,
      maxReviews: 40
    }
  };

  let score = 0;
  
  // 1. Profile Completeness (max 20)
  let profileScore = 0;
  if (user.name) profileScore += 5;
  if (user.username) profileScore += 5;
  if (user.profile?.bio) profileScore += 5;
  if (user.profile?.title) profileScore += 5;
  score += profileScore;

  // 2. Verified Projects (max 40)
  const verifiedProjects = user.projectsAsFreelancer.filter((p: any) => p.verificationStatus === 'VERIFIED');
  const projectScore = Math.min(verifiedProjects.length * 10, 40);
  score += projectScore;

  // 3. Client Reviews (max 40)
  const projectsWithReviews = verifiedProjects.filter((p: any) => p.review);
  let reviewScore = 0;
  if (projectsWithReviews.length > 0) {
    const totalRating = projectsWithReviews.reduce((sum: number, p: any) => sum + (p.review?.rating || 0), 0);
    const avgRating = totalRating / projectsWithReviews.length;
    // Map 1-5 rating to 0-40 points
    reviewScore = Math.round((avgRating / 5) * 40);
  }
  score += reviewScore;

  return {
    score,
    breakdown: {
      profileCompleteness: profileScore,
      verifiedProjects: projectScore,
      clientReviews: reviewScore,
      maxProfile: 20,
      maxProjects: 40,
      maxReviews: 40
    }
  };
}
