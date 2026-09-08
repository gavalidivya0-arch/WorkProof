import { prisma } from "@/lib/prisma";
// @ts-ignore
import { NotificationType } from "../prisma/generated/client";

export async function createNotification({
  userId,
  type,
  title,
  message,
  link
}: {
  userId: string;
  type: typeof NotificationType | string;
  title: string;
  message: string;
  link?: string;
}) {
  try {
    return await prisma.notification.create({
      data: {
        userId,
        type: type as any,
        title,
        message,
        link,
      },
    });
  } catch (error) {
    console.error("Failed to create notification:", error);
    return null;
  }
}

export async function markAsRead(notificationId: string, userId: string) {
  try {
    return await prisma.notification.update({
      where: { 
        id: notificationId,
        userId: userId // Security check
      },
      data: {
        read: true,
      }
    });
  } catch (error) {
    console.error("Failed to mark notification as read:", error);
    return null;
  }
}

export async function markAllAsRead(userId: string) {
  try {
    return await prisma.notification.updateMany({
      where: { 
        userId,
        read: false,
      },
      data: {
        read: true,
      }
    });
  } catch (error) {
    console.error("Failed to mark all notifications as read:", error);
    return null;
  }
}
