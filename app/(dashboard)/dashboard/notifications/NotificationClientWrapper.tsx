"use client";

import { useState } from "react";
import { markNotificationAsRead } from "@/app/actions/notifications";

export function NotificationClientWrapper({ 
  notification, 
  children 
}: { 
  notification: { id: string; read: boolean }; 
  children: React.ReactNode;
}) {
  const [isRead, setIsRead] = useState(notification.read);

  const handleMouseEnter = async () => {
    if (!isRead) {
      setIsRead(true);
      await markNotificationAsRead(notification.id);
    }
  };

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onClick={handleMouseEnter}
      className="cursor-default"
    >
      {children}
    </div>
  );
}
