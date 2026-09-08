"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateReviewData {
  projectId: string;
  rating: number;
  communication: number;
  quality: number;
  reliability: number;
  text?: string;
  clientEmail: string; // To ensure the review is from the verifier
}

export async function submitReview(data: CreateReviewData) {
  try {
    const { auth } = await import("@/auth");
    const session = await auth();
    
    if (!session?.user?.id || !session.user.email) {
      return { error: "You must be logged in to submit a review." };
    }
    
    if (session.user.role !== "CLIENT") {
      return { error: "Only clients can submit reviews." };
    }

    const project = await prisma.project.findUnique({
      where: { id: data.projectId },
      include: {
        verificationRequest: true,
      }
    });

    if (!project) {
      return { error: "Project not found." };
    }

    if (project.verificationStatus !== "VERIFIED") {
      return { error: "Only verified projects can receive reviews." };
    }

    // Security Check: The current user's email MUST match the verified client email
    const verifierEmail = project.clientEmail || project.verificationRequest?.clientEmail;
    if (!verifierEmail || verifierEmail.toLowerCase() !== session.user.email.toLowerCase()) {
      return { error: "Unauthorized. You are not the verified client for this project." };
    }

    // Check if review already exists
    const existingReview = await prisma.review.findUnique({
      where: { projectId: data.projectId }
    });

    if (existingReview) {
      return { error: "A review has already been submitted for this project." };
    }

    await prisma.review.create({
      data: {
        projectId: data.projectId,
        rating: data.rating,
        communication: data.communication,
        quality: data.quality,
        reliability: data.reliability,
        text: data.text,
      } as any
    });

    const user = await prisma.user.findUnique({
      where: { id: project.freelancerId }
    });

    if (user) {
      const { createNotification } = await import("@/lib/notifications");
      await createNotification({
        userId: user.id,
        type: "REVIEW_RECEIVED",
        title: "New Client Review! ⭐",
        message: `Your client just left a ${data.rating}-star review for "${project.name}".`,
        link: `/${user.username || user.id}`
      });
    }

    revalidatePath(`/${user?.username || ''}`);
    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/projects/${data.projectId}`);

    return { success: true };
  } catch (error: any) {
    console.error("Failed to submit review:", error);
    return { error: error.message || "Something went wrong." };
  }
}
