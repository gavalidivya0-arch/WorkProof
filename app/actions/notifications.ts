"use server";

import { auth } from "@/auth";
import { markAsRead, markAllAsRead } from "@/lib/notifications";
import { revalidatePath } from "next/cache";

export async function markNotificationAsRead(notificationId: string) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  await markAsRead(notificationId, session.user.id);
  
  // Revalidate the current layout/page to update the unread count in TopNav
  revalidatePath("/", "layout");
  return { success: true };
}

export async function markAllNotificationsAsRead() {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  await markAllAsRead(session.user.id);
  
  revalidatePath("/", "layout");
  return { success: true };
}
