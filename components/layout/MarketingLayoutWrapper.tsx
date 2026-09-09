"use client";

import { usePathname } from "next/navigation";
import React from "react";

export function MarketingLayoutWrapper({
  navbar,
  footer,
  children,
}: {
  navbar: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/client") ||
    pathname.startsWith("/admin");

  if (isDashboardRoute) {
    return <>{children}</>;
  }

  return (
    <>
      {navbar}
      <main className="flex-1 flex flex-col">{children}</main>
      {footer}
    </>
  );
}
