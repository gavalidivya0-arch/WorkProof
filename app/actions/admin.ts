"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (dbUser?.role !== "ADMIN") {
    throw new Error("Forbidden");
  }

  return session.user;
}

export async function toggleUserSuspension(userId: string) {
  try {
    await requireAdmin();

    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { status: true, role: true },
    });

    if (!targetUser) return { error: "User not found" };
    if (targetUser.role === "ADMIN") return { error: "Cannot suspend other admins" };

    const newStatus = targetUser.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";

    await prisma.user.update({
      where: { id: userId },
      data: { status: newStatus },
    });

    revalidatePath("/admin/users");
    revalidatePath("/admin");

    return { success: true, newStatus };
  } catch (error: any) {
    console.error("Error toggling user suspension:", error);
    return { error: error.message || "Failed to update user status" };
  }
}
