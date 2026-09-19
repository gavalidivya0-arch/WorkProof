"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations/contact";
import { headers } from "next/headers";
import { rateLimit } from "@/lib/rate-limit";

export async function submitContactForm(data: z.infer<typeof contactSchema>) {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid data provided." };
  }

  const { name, email, subject, message } = parsed.data;

  // Rate limit based on IP
  const reqHeaders = await headers();
  const ip = reqHeaders.get("x-forwarded-for") || "unknown";
  const rl = rateLimit(`contact_${ip}`, 3, 60000); // 3 attempts per min per IP
  if (!rl.success) return { error: rl.error };

  try {
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to submit contact message:", error);
    return { error: "Failed to send message. Please try again later." };
  }
}
