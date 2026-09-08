"use server";

import { registerSchema } from "@/lib/validations/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { headers } from "next/headers";
import { rateLimit } from "@/lib/rate-limit";

export async function registerUser(data: z.infer<typeof registerSchema>) {
  const parsed = registerSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid data provided." };
  }

  const { name, email, password, role } = parsed.data;

  const reqHeaders = await headers();
  const ip = reqHeaders.get("x-forwarded-for") || "unknown";
  const rl = rateLimit(`register_${ip}`, 5, 60000); // 5 attempts per min per IP
  if (!rl.success) return { error: rl.error };

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return { error: "User with this email already exists." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
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

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { loginSchema } from "@/lib/validations/auth";

export async function loginUser(data: z.infer<typeof loginSchema>) {
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid data provided." };
  }

  const { email, password } = parsed.data;

  const reqHeaders = await headers();
  const ip = reqHeaders.get("x-forwarded-for") || "unknown";
  const rl = rateLimit(`login_${email}_${ip}`, 5, 60000); // 5 attempts per min
  if (!rl.success) return { error: rl.error };

  try {
    await signIn("credentials", {
      email: email,
      password: password,
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

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/dashboard" });
}

export async function logoutUser() {
  await signOut({ redirectTo: "/" });
}
