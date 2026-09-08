"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitReport(data: {
  targetType: "PROJECT" | "PROFILE" | "REVIEW" | "VERIFICATION";
  targetId: string;
  reason: string;
  details?: string;
}) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { error: "You must be logged in to submit a report." };
    }

    await prisma.report.create({
      data: {
        targetType: data.targetType,
        targetId: data.targetId,
        reason: data.reason,
        details: data.details,
        reportedById: session.user.id,
        status: "PENDING",
      }
    });

    // Alert admins via notifications
    const admins = await prisma.user.findMany({ where: { role: "ADMIN" } });
    if (admins.length > 0) {
      const { createNotification } = await import("@/lib/notifications");
      for (const admin of admins) {
        await createNotification({
          userId: admin.id,
          type: "SYSTEM_ALERT",
          title: "New Report Submitted",
          message: `A ${data.targetType.toLowerCase()} was reported for ${data.reason}.`,
          link: "/admin/reports"
        });
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Error submitting report:", error);
    return { error: "Failed to submit report. Please try again." };
  }
}
