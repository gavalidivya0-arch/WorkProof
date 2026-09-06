import { prisma } from "@/lib/prisma";
// @ts-ignore
import { Prisma } from "@prisma/client";
import crypto from "crypto";

export async function createVerificationRequest(projectId: string, clientEmail: string, message?: string) {
  // Generate a secure random token for the email link
  const token = crypto.randomBytes(32).toString('hex');
  
  // Set expiration to 14 days from now
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 14);

  return prisma.$transaction(async (tx: any) => {
    // Update project status
    await tx.project.update({
      where: { id: projectId },
      data: { verificationStatus: "PENDING", clientEmail },
    });

    // Create the request
    return tx.verificationRequest.create({
      data: {
        projectId,
        clientEmail,
        message,
        token,
        expiresAt,
        status: "PENDING"
      },
    });
  });
}

export async function approveVerification(requestId: string, verifiedById: string, review?: { rating: number; text?: string; isPublic?: boolean }) {
  const request = await prisma.verificationRequest.findUnique({
    where: { id: requestId },
    include: { project: true }
  });

  if (!request || request.status !== "PENDING") {
    throw new Error("Invalid or expired verification request");
  }

  // Create a snapshot of the project for audit purposes
  const projectSnapshot = JSON.stringify(request.project);

  return prisma.$transaction(async (tx: any) => {
    // 1. Update request status
    await tx.verificationRequest.update({
      where: { id: requestId },
      data: { status: "APPROVED" },
    });

    // 2. Update project status and connect client
    await tx.project.update({
      where: { id: request.projectId },
      data: { 
        verificationStatus: "VERIFIED",
        client: { connect: { id: verifiedById } }
      },
    });

    // 3. Create Verification record
    const verification = await tx.verification.create({
      data: {
        projectId: request.projectId,
        verifiedById,
        projectVersion: projectSnapshot,
      },
    });

    // 4. Optionally add review
    if (review) {
      await tx.review.create({
        data: {
          projectId: request.projectId,
          ...review
        }
      });
    }

    return verification;
  });
}
