"use server";

import { registerSchema } from "@/lib/validations/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

export async function registerUser(data: z.infer<typeof registerSchema>) {
  try {
    const validatedData = registerSchema.parse(data);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedData.email,
      },
    });

    if (existingUser) {
      return { error: "User with this email already exists." };
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: validatedData.role,
      },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message };
    }
    return { error: "Something went wrong. Please try again." };
  }
}

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { loginSchema } from "@/lib/validations/auth";

export async function loginUser(data: z.infer<typeof loginSchema>) {
  try {
    const validatedData = loginSchema.parse(data);
    await signIn("credentials", {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false, // We'll handle redirect client-side so we can show errors
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password." };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error; // Let nextjs handle redirects if redirect: true was used, but we use false
  }
}
