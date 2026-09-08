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
      verifiedExperience: 0,
      clientReviews: 0,
      accountReputation: 10,
      maxProfile: 10,
      maxProjects: 40,
      maxExperience: 20,
      maxReviews: 20,
      maxReputation: 10
    }
  };

  let score = 0;
  
  // 1. Profile Completeness (max 10)
  let profileScore = 0;
  if (user.profile?.bio) profileScore += 3;
  if (user.profile?.title) profileScore += 3;
  if (user.profile?.location) profileScore += 2;
  if (user.profile?.website || user.profile?.github || user.profile?.linkedin) profileScore += 2;
  score += profileScore;

  // 2. Verified Projects (max 40)
  const verifiedProjects = user.projectsAsFreelancer.filter((p: any) => p.verificationStatus === 'VERIFIED');
  const projectScore = Math.min(verifiedProjects.length * 10, 40);
  score += projectScore;

  // 3. Verified Experience (max 20)
  let totalMonths = 0;
  verifiedProjects.forEach((p: any) => {
    const end = p.endDate ? new Date(p.endDate).getTime() : Date.now();
    const start = new Date(p.startDate).getTime();
    const months = Math.ceil((end - start) / (1000 * 60 * 60 * 24 * 30));
    totalMonths += (months > 0 ? months : 1);
  });
  const experienceScore = Math.min(totalMonths, 20); // 1 point per month
  score += experienceScore;

  // 4. Client Reviews (max 20)
  const projectsWithReviews = verifiedProjects.filter((p: any) => p.review);
  let reviewScore = 0;
  if (projectsWithReviews.length > 0) {
    const totalRating = projectsWithReviews.reduce((sum: number, p: any) => sum + (p.review?.rating || 0), 0);
    const avgRating = totalRating / projectsWithReviews.length;
    reviewScore = Math.round((avgRating / 5) * 20);
  }
  score += reviewScore;

  // 5. Account Reputation (max 10)
  // Assuming default good standing
  const reputationScore = 10;
  score += reputationScore;

  return {
    score,
    breakdown: {
      profileCompleteness: profileScore,
      verifiedProjects: projectScore,
      verifiedExperience: experienceScore,
      clientReviews: reviewScore,
      accountReputation: reputationScore,
      maxProfile: 10,
      maxProjects: 40,
      maxExperience: 20,
      maxReviews: 20,
      maxReputation: 10
    }
  };
}
