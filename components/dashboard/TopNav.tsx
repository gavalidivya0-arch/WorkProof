"use client";

import { Menu, LayoutDashboard, User, FolderKanban, ShieldCheck, Star, Settings, LogOut, Bell, Shield, FileText } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

const freelancerRoutes = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Projects", icon: FolderKanban, href: "/dashboard/projects" },
  { label: "Resume AI", icon: FileText, href: "/dashboard/resume" },
  { label: "Verification", icon: ShieldCheck, href: "/dashboard/verification" },
  { label: "Reviews", icon: Star, href: "/dashboard/reviews" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

const clientRoutes = [
  { label: "Overview", icon: LayoutDashboard, href: "/client" },
  { label: "Verifications", icon: ShieldCheck, href: "/client/verification-requests" },
  { label: "Settings", icon: Settings, href: "/client/settings" },
];

export function TopNav({ user, unreadCount = 0 }: { user?: any; unreadCount?: number }) {
  const pathname = usePathname();
  const router = useRouter();
  const routes = user?.role === "CLIENT" ? clientRoutes : freelancerRoutes;

  return (
    <div className="flex items-center p-4 h-16 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm sticky top-0 z-50">
      <Sheet>
        {/* @ts-ignore - Radix UI typing conflict */}
        <SheetTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "md:hidden")}>
          <Menu className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <div className="px-6 py-6 border-b border-border/40">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl tracking-tight text-gradient-primary">WORKPROOF</span>
            </Link>
          </div>
          <div className="px-3 py-4 flex-1">
            <div className="space-y-1">
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
        </SheetContent>
      </Sheet>

      <div className="flex w-full justify-end items-center gap-3">
        {user?.role === "ADMIN" && (
          <Link href="/admin" className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors">
            <Shield className="w-4 h-4" />
            Admin Panel
          </Link>
        )}
        <Link href="/dashboard/notifications" className="relative group p-2">
          <Bell className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-background"></span>
          )}
        </Link>
        <DropdownMenu>
          {/* @ts-ignore - Radix UI typing conflict */}
          <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost" }), "relative h-8 w-8 rounded-full")}>
            <Avatar className="h-8 w-8 ring-2 ring-primary/20">
              <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <div className="px-2 py-1.5 font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => router.push("/dashboard/profile")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => router.push("/dashboard/settings")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive focus:bg-destructive focus:text-destructive-foreground cursor-pointer"
              onSelect={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
