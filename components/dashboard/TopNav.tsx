"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Bell, LogOut, User, Settings, Shield, PlusCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logoutUser } from "@/app/actions/auth";
import { Sidebar } from "./Sidebar";

interface TopNavProps {
  user?: any;
  unreadCount?: number;
}

export function TopNav({ user, unreadCount = 0 }: TopNavProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [sheetOpen, setSheetOpen] = React.useState(false);

  return (
    <header className="h-[80px] px-4 sm:px-6 md:px-8 flex items-center justify-between bg-[#FAFAF8] border-b border-[#E7E4DF]/60 sticky top-0 z-30 transition-colors">
      {/* Mobile Drawer & Logo */}
      <div className="flex items-center gap-3 md:hidden">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          {/* @ts-ignore - Base UI / Radix typing */}
          <SheetTrigger className="p-2 text-[#073F48] hover:bg-black/5 rounded-md transition-colors cursor-pointer">
            <Menu className="w-6 h-6 stroke-[1.8]" />
            <span className="sr-only">Toggle navigation menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[218px] bg-[#075E63] border-r-0">
            <Sidebar role={user?.role} onNavigate={() => setSheetOpen(false)} className="h-full" />
          </SheetContent>
        </Sheet>

        <Link href="/" className="font-serif text-2xl font-bold text-[#075E63]">
          WP
        </Link>
      </div>

      {/* Spacer for desktop left alignment */}
      <div className="hidden md:block" />

      {/* Right Side Navigation */}
      <div className="flex items-center gap-3 sm:gap-5 lg:gap-7">
        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[13.5px] font-medium text-[#17324D]/80">
          <Link
            href="/#how-it-works"
            className="hover:text-[#075E63] transition-colors py-1 cursor-pointer"
          >
            How It Works
          </Link>
          <Link
            href="/talent"
            className="hover:text-[#075E63] transition-colors py-1 cursor-pointer"
          >
            Find Talent
          </Link>
          <Link
            href="/pricing"
            className="hover:text-[#075E63] transition-colors py-1 cursor-pointer"
          >
            Pricing
          </Link>
        </nav>

        {/* Action Button: Get Started / Get Verified / Continue */}
        <Link
          href={user?.role === "UNASSIGNED" ? "/onboarding" : user ? "/dashboard/projects/new" : "/register"}
          className="bg-[#075E63] hover:bg-[#064e52] active:scale-[0.98] text-white text-[13.5px] font-medium px-5 py-2.5 rounded-[6px] transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
        >
          {user?.role === "UNASSIGNED" ? (
            <span>Continue</span>
          ) : user ? (
            <>
              <PlusCircle className="w-4 h-4" />
              <span>Get Verified</span>
            </>
          ) : (
            <span>Get Started</span>
          )}
        </Link>

        {/* Notification Bell */}
        <Link
          href="/dashboard/notifications"
          aria-label="Notifications"
          className="relative p-2 text-[#17324D]/70 hover:text-[#075E63] transition-colors rounded-md hover:bg-black/5 cursor-pointer"
        >
          <Bell className="w-5 h-5 stroke-[1.75]" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E76F51] rounded-full ring-2 ring-[#FAFAF8]" />
          )}
        </Link>

        {/* User Account Dropdown */}
        {user ? (
          <DropdownMenu>
            {/* @ts-ignore - Base UI typing */}
            <DropdownMenuTrigger className="relative h-9 w-9 rounded-full focus:outline-none focus:ring-2 focus:ring-[#075E63]/30 cursor-pointer">
              <Avatar className="h-9 w-9 border border-[#E7E4DF] shadow-xs">
                <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
                <AvatarFallback className="bg-[#075E63]/10 text-[#075E63] font-semibold text-xs">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white border border-[#E7E4DF] shadow-lg rounded-lg p-1.5 z-50" align="end">
              <div className="px-3 py-2 border-b border-[#E7E4DF]/60 mb-1">
                <p className="text-sm font-semibold text-[#073F48] leading-none truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-[#6B7375] truncate mt-1">
                  {user?.email}
                </p>
                {user?.role && (
                  <span className="inline-block mt-1.5 text-[10px] font-semibold uppercase tracking-wider bg-[#F1F8F7] text-[#075E63] px-2 py-0.5 rounded">
                    {user.role}
                  </span>
                )}
              </div>

              {user?.role === "ADMIN" && (
                <DropdownMenuItem className="p-0">
                  <Link
                    href="/admin"
                    className="flex items-center w-full px-2.5 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-50 rounded cursor-pointer"
                  >
                    <Shield className="w-3.5 h-3.5 mr-2" />
                    <span>Admin Panel</span>
                  </Link>
                </DropdownMenuItem>
              )}

              <DropdownMenuItem className="p-0">
                <Link
                  href="/dashboard/profile"
                  className="flex items-center w-full px-2.5 py-1.5 text-xs font-medium text-[#17324D] hover:bg-[#F1F8F7] hover:text-[#075E63] rounded cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 mr-2 text-[#6B7375]" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="p-0">
                <Link
                  href="/dashboard/projects"
                  className="flex items-center w-full px-2.5 py-1.5 text-xs font-medium text-[#17324D] hover:bg-[#F1F8F7] hover:text-[#075E63] rounded cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5 mr-2 text-[#6B7375]" />
                  <span>My Projects</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="p-0">
                <Link
                  href="/dashboard/settings"
                  className="flex items-center w-full px-2.5 py-1.5 text-xs font-medium text-[#17324D] hover:bg-[#F1F8F7] hover:text-[#075E63] rounded cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5 mr-2 text-[#6B7375]" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1 bg-[#E7E4DF]/60" />

              <DropdownMenuItem className="p-0">
                <button
                  type="button"
                  disabled={isPending}
                  className="flex items-center w-full px-2.5 py-1.5 text-xs font-medium text-[#E76F51] hover:bg-[#FFF5F1] rounded cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    startTransition(async () => {
                      await logoutUser();
                    });
                  }}
                >
                  <LogOut className="w-3.5 h-3.5 mr-2" />
                  <span>{isPending ? "Logging out..." : "Log out"}</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href="/login"
            className="text-[13.5px] font-medium text-[#075E63] hover:underline cursor-pointer"
          >
            Log In
          </Link>
        )}
      </div>
    </header>
  );
}
