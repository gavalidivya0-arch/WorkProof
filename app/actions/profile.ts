"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
// @ts-ignore
import { profileFormSchema } from "@/lib/validations/profile";
import { revalidatePath } from "next/cache";

export async function updateProfile(data: z.infer<typeof profileFormSchema>) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const parsed = profileFormSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid data provided." };
  }

  const { name, username, bio, title, location, website, github, linkedin } = parsed.data;

  try {
    // Check if username is taken by someone else
    if (username) {
      const existing = await prisma.user.findUnique({ where: { username } });
      if (existing && existing.id !== session.user.id) {
        return { error: "Username is already taken." };
      }
    }

    await prisma.$transaction(async (tx: any) => {
      // Update User model (name, username)
      await tx.user.update({
        where: { id: session.user?.id },
        data: { name, username },
      });

      // Update or create Profile model
      await tx.profile.upsert({
        where: { userId: session.user?.id },
        update: { bio, title, location, website, github, linkedin },
        create: {
          userId: session.user?.id!,
          bio,
          title,
          location,
          website,
          github,
          linkedin,
        },
      });
    });

    revalidatePath("/dashboard/profile");
    revalidatePath("/dashboard");
    if (username) revalidatePath(`/${username}`);

    return { success: true };
  } catch (error) {
    console.error("Profile update error:", error);
    return { error: "Something went wrong saving your profile." };
  }
}
