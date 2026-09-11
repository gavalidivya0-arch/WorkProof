import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, LogOut, LayoutDashboard } from "lucide-react";
import { auth, signOut } from "@/auth";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E7E4DF] bg-[#FAFAF8]/92 backdrop-blur-md transition-all duration-200">
      <div className="container flex h-[72px] items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Navigation */}
        <div className="flex items-center">
          <Link href="/" className="mr-8 flex items-center gap-2.5 group">
            <span className="font-serif text-[26px] font-bold text-[#075E63] group-hover:opacity-90 transition-opacity leading-none">
              WP
            </span>
            <span className="text-[12px] font-medium tracking-[1.8px] text-[#073F48] uppercase">
              WORKPROOF
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-7 text-[13.5px] font-medium text-[#17324D]/80">
            <Link
              href="/#how-it-works"
              className="hover:text-[#075E63] transition-colors py-1"
            >
              How It Works
            </Link>
            <Link
              href="/talent"
              className="hover:text-[#075E63] transition-colors py-1"
            >
              Find Talent
            </Link>
            <Link
              href="/#pricing"
              className="hover:text-[#075E63] transition-colors py-1"
            >
              Pricing
            </Link>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          <nav className="hidden md:flex items-center space-x-3">
            {session?.user ? (
              <>
                <Link
                  href={
                    session.user.role === "CLIENT"
                      ? "/client"
                      : session.user.role === "ADMIN"
                      ? "/admin"
                      : "/dashboard"
                  }
                  className="flex items-center gap-1.5 text-[13.5px] font-medium text-[#075E63] hover:bg-[#F1F8F7] px-3.5 py-2 rounded-[6px] transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>

                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 text-[13px] font-medium text-[#6B7375] hover:text-[#E76F51] border border-[#E7E4DF] hover:border-[#E76F51]/30 hover:bg-[#FFF5F1] px-3 py-2 rounded-[6px] transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-[13.5px] font-medium text-[#17324D]/80 hover:text-[#075E63] px-3.5 py-2 rounded-[6px] transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="bg-[#075E63] hover:bg-[#064e52] active:scale-[0.98] text-white text-[13.5px] font-medium px-5 py-2.5 rounded-[6px] transition-all shadow-xs"
                >
                  Get Verified
                </Link>
              </>
            )}
          </nav>

          <Link
            href={session?.user ? "/dashboard" : "/register"}
            className="md:hidden bg-[#075E63] text-white text-xs font-medium px-3.5 py-2 rounded-[6px]"
          >
            {session?.user ? "Dashboard" : "Get Verified"}
          </Link>
        </div>
      </div>
    </header>
  );
}
