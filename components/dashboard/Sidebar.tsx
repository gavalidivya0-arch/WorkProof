"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, User, FolderKanban, ShieldCheck, Star, Settings } from "lucide-react";

const routes = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Profile",
    icon: User,
    href: "/dashboard/profile",
  },
  {
    label: "Projects",
    icon: FolderKanban,
    href: "/dashboard/projects",
  },
  {
    label: "Verification",
    icon: ShieldCheck,
    href: "/dashboard/verification",
  },
  {
    label: "Reviews",
    icon: Star,
    href: "/dashboard/reviews",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-background border-r border-border/40 text-foreground w-64 shadow-sm hidden md:flex">
      <div className="px-6 py-2">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl tracking-tight text-gradient-primary">WORKPROOF</span>
        </Link>
      </div>
      <div className="px-3 py-2 flex-1">
        <div className="space-y-1 mt-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-primary/10 hover:text-primary rounded-lg transition-colors",
                pathname === route.href ? "bg-primary/10 text-primary" : "text-muted-foreground"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", pathname === route.href ? "text-primary" : "text-muted-foreground")} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
