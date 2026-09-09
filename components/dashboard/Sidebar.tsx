"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Compass,
  ShieldCheck,
  Users,
  Info,
  Mail,
  Search,
  ArrowRight,
  FolderKanban,
  Star,
  FileText,
  Settings,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  role?: string;
  onNavigate?: () => void;
  className?: string;
}

export function Sidebar({ role = "FREELANCER", onNavigate, className }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/talent?q=${encodeURIComponent(searchQuery.trim())}`);
      onNavigate?.();
    }
  };

  const primaryNavItems = [
    {
      label: "Discover",
      href: role === "CLIENT" ? "/client" : role === "ADMIN" ? "/admin" : "/dashboard",
      icon: Compass,
      active: pathname === "/dashboard" || pathname === "/client",
    },
    {
      label: "Verified Work",
      href: role === "CLIENT" ? "/client/verification-requests" : "/dashboard/projects",
      icon: ShieldCheck,
      active:
        pathname.startsWith("/dashboard/projects") ||
        pathname.startsWith("/dashboard/verification") ||
        pathname.startsWith("/client/verification-requests"),
    },
    {
      label: "Talent",
      href: "/talent",
      icon: Users,
      active: pathname.startsWith("/talent"),
    },
  ];

  // Secondary items based on role so all existing platform features remain fully reachable
  const freelancerSecondaryItems = [
    {
      label: "Verification",
      href: "/dashboard/verification",
      icon: ShieldCheck,
      active: pathname === "/dashboard/verification",
    },
    {
      label: "Reviews",
      href: "/dashboard/reviews",
      icon: Star,
      active: pathname === "/dashboard/reviews",
    },
    {
      label: "About",
      href: "/#how-it-works",
      icon: Info,
      active: false,
    },
    {
      label: "Contact",
      href: "mailto:support@workproof.com",
      icon: Mail,
      active: false,
    },
  ];

  const clientSecondaryItems = [
    {
      label: "Verifications",
      href: "/client/verification-requests",
      icon: ShieldCheck,
      active: pathname.startsWith("/client/verification-requests"),
    },
    {
      label: "Settings",
      href: "/client/settings",
      icon: Settings,
      active: pathname === "/client/settings",
    },
    {
      label: "About",
      href: "/#how-it-works",
      icon: Info,
      active: false,
    },
    {
      label: "Contact",
      href: "mailto:support@workproof.com",
      icon: Mail,
      active: false,
    },
  ];

  const adminSecondaryItems = [
    {
      label: "Admin Panel",
      href: "/admin",
      icon: Shield,
      active: pathname === "/admin",
    },
    {
      label: "About",
      href: "/#how-it-works",
      icon: Info,
      active: false,
    },
    {
      label: "Contact",
      href: "mailto:support@workproof.com",
      icon: Mail,
      active: false,
    },
  ];

  const secondaryNavItems =
    role === "CLIENT"
      ? clientSecondaryItems
      : role === "ADMIN"
      ? adminSecondaryItems
      : freelancerSecondaryItems;

  return (
    <aside
      className={cn(
        "w-[218px] min-w-[218px] bg-[#075E63] text-white flex flex-col justify-between select-none overflow-y-auto",
        className
      )}
    >
      {/* Top section: Logo, Search, Navigation */}
      <div className="flex flex-col">
        {/* WP Logo */}
        <div className="pt-[34px] px-[32px] pb-6">
          <Link
            href="/"
            onClick={onNavigate}
            className="group block transition-opacity hover:opacity-90 cursor-pointer"
          >
            <div className="font-serif text-[54px] font-bold leading-none tracking-normal text-white">
              WP
            </div>
            <div className="text-[12px] font-medium tracking-[1.8px] text-white/85 mt-1.5 uppercase">
              WORKPROOF
            </div>
          </Link>
        </div>

        {/* Search */}
        <div className="px-[24px] mb-6">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="flex items-center pb-2 border-b border-white/20 focus-within:border-white/60 transition-colors">
              <button
                type="submit"
                aria-label="Submit Search"
                className="text-white/70 hover:text-white transition-colors cursor-pointer mr-2.5 shrink-0 focus:outline-none"
              >
                <Search className="w-[18px] h-[18px] stroke-[1.8]" />
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full bg-transparent text-[14px] text-white placeholder-white/60 focus:outline-none font-normal"
              />
            </div>
          </form>
        </div>

        {/* Primary Navigation */}
        <nav className="px-[16px] space-y-1">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "group flex items-center justify-between h-[48px] px-3.5 rounded-[6px] text-[14px] font-medium transition-all duration-180 cursor-pointer",
                  item.active
                    ? "bg-white/15 text-white shadow-sm"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-[19px] h-[19px] stroke-[1.8] text-white/90 group-hover:text-white transition-colors" />
                  <span>{item.label}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-180 shrink-0" />
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="my-5 mx-[24px] border-t border-white/15" />

        {/* Secondary Navigation */}
        <nav className="px-[16px] space-y-1">
          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "group flex items-center h-[42px] px-3.5 rounded-[6px] text-[13.5px] font-medium transition-all duration-180 cursor-pointer",
                  item.active
                    ? "bg-white/15 text-white shadow-sm"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                <Icon className="w-[18px] h-[18px] stroke-[1.7] text-white/70 group-hover:text-white transition-colors mr-3" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer: Social links and Copyright */}
      <div className="px-[24px] pb-7 pt-4">
        {/* Social Icons */}
        <div className="flex items-center gap-4 mb-4 text-white/75">
          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-white transition-colors hover:scale-110 transform duration-150 cursor-pointer"
          >
            <svg
              className="w-[17px] h-[17px] fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-white transition-colors hover:scale-110 transform duration-150 cursor-pointer"
          >
            <svg
              className="w-[17px] h-[17px] fill-current"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
          </a>

          {/* X / Twitter */}
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="hover:text-white transition-colors hover:scale-110 transform duration-150 cursor-pointer"
          >
            <svg
              className="w-[15px] h-[15px] fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-[11.5px] leading-relaxed text-white/60">
          <div>© 2026 WorkProof</div>
          <div>All rights reserved</div>
        </div>
      </div>
    </aside>
  );
}
