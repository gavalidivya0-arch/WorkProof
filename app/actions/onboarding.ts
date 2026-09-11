"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function assignRole(role: "FREELANCER" | "CLIENT") {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "You must be logged in to do this." };
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        role: role,
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update role. Please try again." };
  }
}
