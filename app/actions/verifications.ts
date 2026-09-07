"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { verificationRequestSchema, processVerificationSchema } from "@/lib/validations/verification";
import { randomBytes } from "crypto";

export async function requestVerification(projectId: string, data: z.infer<typeof verificationRequestSchema>) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    if (session.user.role !== "FREELANCER") {
      return { error: "Only freelancers can request verifications." };
    }

    const validatedData = verificationRequestSchema.parse(data);

    // Ensure the project belongs to the user and is UNVERIFIED
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
        freelancerId: session.user.id,
      },
      include: {
        verificationRequest: true,
      }
    });

    if (!project) {
      return { error: "Project not found or unauthorized." };
    }

    if (project.verificationStatus === "VERIFIED") {
      return { error: "Project is already verified." };
    }

    // Generate a unique token for the request
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 14); // Expires in 14 days

    // We use a transaction to create the request and update the project status to PENDING
    await prisma.$transaction(async (tx: any) => {
      // Upsert the verification request
      await tx.verificationRequest.upsert({
        where: {
          projectId: projectId,
        },
        update: {
          clientEmail: validatedData.clientEmail,
          message: validatedData.message,
          token,
          expiresAt,
          status: "PENDING",
        },
        create: {
          projectId: projectId,
          clientEmail: validatedData.clientEmail,
          message: validatedData.message,
          token,
          expiresAt,
        }
      });

      // Update project status and email
      await tx.project.update({
        where: { id: projectId },
        data: {
          verificationStatus: "PENDING",
          clientEmail: validatedData.clientEmail,
        }
      });
    });

    revalidatePath("/dashboard/projects");
    revalidatePath("/dashboard/verification");

    return { success: true };
  } catch (error) {
    console.error("Error requesting verification:", error);
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message };
    }
    return { error: "Something went wrong. Please try again." };
  }
}

export async function processVerification(requestId: string, data: z.infer<typeof processVerificationSchema>) {
  try {
    const session = await auth();

    if (!session?.user?.id || !session.user.email) {
      return { error: "Unauthorized" };
    }

    if (session.user.role !== "CLIENT") {
      return { error: "Only authenticated clients can process verifications." };
    }

    const validatedData = processVerificationSchema.parse(data);

    const verificationRequest = await prisma.verificationRequest.findUnique({
      where: {
        id: requestId,
      },
      include: {
        project: {
          include: {
            deliverables: true,
            skills: {
              include: {
                skill: true
              }
            }
          }
        },
      }
    });

    if (!verificationRequest) {
      return { error: "Verification request not found." };
    }

    // Security Check: The current user's email MUST match the clientEmail on the request
    if (verificationRequest.clientEmail !== session.user.email) {
      return { error: "You are not authorized to process this verification." };
    }

    if (verificationRequest.status !== "PENDING") {
      return { error: `This request has already been ${verificationRequest.status.toLowerCase()}.` };
    }

    if (new Date() > verificationRequest.expiresAt) {
      return { error: "This verification request has expired." };
    }

    await prisma.$transaction(async (tx: any) => {
      if (validatedData.status === "VERIFIED") {
        // Generate a snapshot of the project at this exact moment
        const projectSnapshot = {
          name: verificationRequest.project.name,
          role: verificationRequest.project.role,
          description: verificationRequest.project.description,
          startDate: verificationRequest.project.startDate,
          endDate: verificationRequest.project.endDate,
          deliverables: verificationRequest.project.deliverables.map((d: any) => d.title),
          skills: verificationRequest.project.skills.map((s: any) => s.skill.name)
        };

        // 1. Create the permanent Verification record
        await tx.verification.create({
          data: {
            projectId: verificationRequest.projectId,
            verifiedById: session.user.id, // we verified they have id above
            projectVersion: JSON.stringify(projectSnapshot),
            auditLog: JSON.stringify({
              confirmedWorked: validatedData.confirmWorked,
              confirmedRole: validatedData.confirmRole,
              confirmedDates: validatedData.confirmDates,
              confirmedDeliverables: validatedData.confirmDeliverables,
              auditMessage: validatedData.auditMessage || null,
              verifiedAt: new Date().toISOString(),
              clientEmail: session.user.email
            })
          }
        });

        // 2. Update project status to VERIFIED and link clientId
        await tx.project.update({
          where: { id: verificationRequest.projectId },
          data: {
            verificationStatus: "VERIFIED",
            clientId: session.user.id,
          }
        });
        
        // 3. Mark request as APPROVED
        await tx.verificationRequest.update({
          where: { id: requestId },
          data: { status: "APPROVED" }
        });
        
      } else {
        // Handle REJECTION
        await tx.project.update({
          where: { id: verificationRequest.projectId },
          data: {
            verificationStatus: "REJECTED",
          }
        });
        
        await tx.verificationRequest.update({
          where: { id: requestId },
          data: { 
            status: "REJECTED",
            message: validatedData.auditMessage || null
          }
        });
      }
    });

    revalidatePath("/client/verification-requests");
    revalidatePath("/client/verification-requests/[id]", "page");
    // Also invalidate the freelancer's public profile so the Trust Score updates instantly!
    // Since we don't know their exact username here easily, we can revalidate layout or specific paths if needed.
    revalidatePath("/", "layout"); 

    return { success: true };
  } catch (error) {
    console.error("Error processing verification:", error);
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message };
    }
    return { error: "Something went wrong. Please try again." };
  }
}
