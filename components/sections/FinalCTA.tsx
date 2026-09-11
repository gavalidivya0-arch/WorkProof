import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="w-full py-20 md:py-28 bg-[#073F48] text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[300px] bg-[#075E63]/30 blur-[100px] pointer-events-none rounded-full" />

      <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6 relative z-10">
        <span className="inline-block text-[12px] font-semibold tracking-[1.5px] text-[#16A085] uppercase">
          START BUILDING AUTHENTIC PROOF
        </span>

        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight">
          Stop claiming. <br />
          <span>Start proving.</span>
        </h2>

        <p className="text-[17px] text-white/80 max-w-2xl mx-auto font-normal leading-relaxed">
          Join freelancers, designers, and developers turning verified projects into trust that opens higher-paying doors.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center items-center">
          <Link
            href="/register"
            className="group bg-white hover:bg-white/90 active:scale-[0.98] text-[#073F48] text-[14px] font-semibold h-[48px] px-7 rounded-[6px] transition-all flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <span>Create Your Profile</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/talent"
            className="border border-white/30 hover:border-white/60 hover:bg-white/10 active:scale-[0.98] text-white text-[14px] font-medium h-[48px] px-7 rounded-[6px] transition-all cursor-pointer"
          >
            Explore Talent Directory
          </Link>
        </div>
      </div>
    </section>
  );
}
