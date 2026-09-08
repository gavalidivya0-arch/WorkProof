import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Shield, LayoutDashboard, Users, FolderKanban, Activity, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Verifications", href: "/admin/verifications", icon: Activity },
  { name: "Reports", href: "/admin/reports", icon: Flag },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  
  // Verify Admin Role globally for all admin routes
  const dbUser = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (dbUser?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row bg-neutral-50/50">
      {/* Admin Sidebar */}
      <aside className="w-full lg:w-64 border-r border-neutral-200 bg-white">
        <div className="p-6">
          <div className="flex items-center gap-2 text-indigo-700 font-bold mb-8">
            <Shield className="w-6 h-6" />
            <span>Admin Center</span>
          </div>
          
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button variant="ghost" className="w-full justify-start text-neutral-600 hover:text-indigo-600 hover:bg-indigo-50">
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
