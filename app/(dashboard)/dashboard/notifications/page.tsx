import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Bell, Check, Info, ShieldCheck, ShieldAlert, Star, AlertTriangle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { markAllNotificationsAsRead } from "@/app/actions/notifications";
import { NotificationClientWrapper } from "@/app/(dashboard)/dashboard/notifications/NotificationClientWrapper";
import Link from "next/link";

function getNotificationIcon(type: string) {
  switch (type) {
    case "VERIFICATION_APPROVED":
      return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
    case "VERIFICATION_REJECTED":
      return <ShieldAlert className="w-5 h-5 text-red-500" />;
    case "VERIFICATION_REQUESTED":
    case "REVIEW_REQUESTED":
      return <Bell className="w-5 h-5 text-blue-500" />;
    case "REVIEW_RECEIVED":
      return <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />;
    case "SYSTEM_ALERT":
      return <AlertTriangle className="w-5 h-5 text-orange-500" />;
    default:
      return <Info className="w-5 h-5 text-neutral-500" />;
  }
}

export default async function NotificationsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const notifications = await prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = async () => {
    "use server";
    await markAllNotificationsAsRead();
  };

  return (
    <div className="max-w-4xl mx-auto py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Notifications</h1>
          <p className="text-neutral-500 mt-1">You have {unreadCount} unread messages.</p>
        </div>
        
        {unreadCount > 0 && (
          <form action={handleMarkAllRead}>
            <Button type="submit" variant="outline" className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              Mark all as read
            </Button>
          </form>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-12 text-center text-neutral-500">
            <Bell className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-900">No notifications yet</h3>
            <p>When you get verified or receive reviews, they will show up here.</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {notifications.map((notif: any) => (
              <NotificationClientWrapper key={notif.id} notification={notif}>
                <div className={`p-4 sm:p-6 hover:bg-neutral-50 transition-colors flex gap-4 ${!notif.read ? 'bg-blue-50/30' : ''}`}>
                  <div className="shrink-0 mt-1">
                    {getNotificationIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2 items-start mb-1">
                      <h4 className={`text-base font-semibold ${!notif.read ? 'text-neutral-900' : 'text-neutral-700'}`}>
                        {notif.title}
                      </h4>
                      <span className="text-xs text-neutral-400 whitespace-nowrap">
                        {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <p className={`text-sm ${!notif.read ? 'text-neutral-700 font-medium' : 'text-neutral-500'}`}>
                      {notif.message}
                    </p>
                    {notif.link && (
                      <Link href={notif.link} className="inline-block mt-3 text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:underline">
                        View Details →
                      </Link>
                    )}
                  </div>
                  {!notif.read && (
                    <div className="shrink-0 flex items-center justify-center w-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                    </div>
                  )}
                </div>
              </NotificationClientWrapper>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
