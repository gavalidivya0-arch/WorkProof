import { auth } from "@/auth";

export async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized: You must be logged in.");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Forbidden: You do not have permission to perform this action.");
  }

  return session.user;
}
