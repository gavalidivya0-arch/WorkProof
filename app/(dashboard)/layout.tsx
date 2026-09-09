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
      read: false,
    },
  });

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#17324D] relative">
      {/* Desktop Fixed Left Sidebar */}
      <Sidebar
        role={session.user.role}
        className="fixed left-0 top-0 bottom-0 z-40 hidden md:flex"
      />

      {/* Main Content Area */}
      <div className="md:ml-[218px] md:w-[calc(100%-218px)] min-h-screen flex flex-col bg-[#FAFAF8]">
        <TopNav user={session.user} unreadCount={unreadCount} />
        <main className="flex-1 px-4 py-6 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
