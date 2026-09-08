import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const unreadCount = await prisma.notification.count({
    where: {
      userId: session.user.id,
      read: false
    }
  });

  return (
    <div className="h-screen flex overflow-hidden bg-muted/20">
      <Sidebar role={session.user.role} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopNav user={session.user} unreadCount={unreadCount} />
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
