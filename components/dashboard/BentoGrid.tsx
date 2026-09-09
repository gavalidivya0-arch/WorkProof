"use client";

import React from "react";
import Link from "next/link";
import {
  Check,
  Star,
  ArrowRight,
  ShieldCheck,
  FolderCheck,
  FileText,
  UserCheck,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  trustData?: {
    score: number;
    breakdown: {
      profileCompleteness: number;
      verifiedProjects: number;
      verifiedExperience: number;
      clientReviews: number;
      accountReputation: number;
    };
  };
  latestVerifiedProject?: {
    name: string;
    role?: string;
    duration?: string;
    clientName?: string;
  } | null;
  featuredReview?: {
    text: string;
    rating: number;
    clientName?: string;
    projectName?: string;
  } | null;
}

export function BentoGrid({
  trustData = {
    score: 92,
    breakdown: {
      profileCompleteness: 10,
      verifiedProjects: 40,
      verifiedExperience: 20,
      clientReviews: 20,
      accountReputation: 2,
    },
  },
  latestVerifiedProject,
  featuredReview,
}: BentoGridProps) {
  const verifiedProject = latestVerifiedProject || {
    name: "E-commerce Platform",
    role: "Frontend Developer",
    duration: "Mar 2026 — Jun 2026",
    clientName: "ABC Technologies",
  };

  const review = featuredReview || {
    rating: 4.9,
    text: "Excellent communication, reliable delivery and high-quality work.",
    clientName: "Verified Client",
    projectName: "Verified Project",
  };

  return (
    <div className="space-y-3 pb-8">
      {/* ROW 1: Trust Score | Client Confirmed | Verification Process */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* CARD 1: TRUST SCORE */}
        <div className="bg-[#FFFFFF] border border-[#E7E4DF] rounded-[8px] p-6 sm:p-7 shadow-[0_4px_18px_rgba(20,40,50,0.04)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-[1px] text-[#075E63] mb-4">
              TRUST SCORE
            </div>

            <div className="flex items-start justify-between gap-4">
              {/* Score Number */}
              <div className="flex items-baseline">
                <span className="font-serif text-[64px] sm:text-[68px] font-semibold leading-none text-[#073F48]">
                  {trustData.score || 92}
                </span>
                <span className="text-[17px] font-normal text-[#6B7375] ml-1">
                  /100
                </span>
              </div>

              {/* Breakdown List */}
              <div className="space-y-2 text-[12px] flex-1 max-w-[190px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[#17324D] truncate">
                    <FolderCheck className="w-3.5 h-3.5 text-[#075E63] shrink-0" />
                    <span className="truncate">Verified Projects</span>
                  </div>
                  <span className="font-semibold text-[#075E63] ml-2">
                    +{String(trustData.breakdown.verifiedProjects || 40).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[#17324D] truncate">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#075E63] shrink-0" />
                    <span className="truncate">Verified Experience</span>
                  </div>
                  <span className="font-semibold text-[#075E63] ml-2">
                    +{String(trustData.breakdown.verifiedExperience || 20).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[#17324D] truncate">
                    <Star className="w-3.5 h-3.5 text-[#075E63] shrink-0" />
                    <span className="truncate">Client Reviews</span>
                  </div>
                  <span className="font-semibold text-[#075E63] ml-2">
                    +{String(trustData.breakdown.clientReviews || 20).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[#17324D] truncate">
                    <FileText className="w-3.5 h-3.5 text-[#075E63] shrink-0" />
                    <span className="truncate">Profile Completeness</span>
                  </div>
                  <span className="font-semibold text-[#075E63] ml-2">
                    +{String(trustData.breakdown.profileCompleteness || 10).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[#17324D] truncate">
                    <UserCheck className="w-3.5 h-3.5 text-[#075E63] shrink-0" />
                    <span className="truncate">Account Reputation</span>
                  </div>
                  <span className="font-semibold text-[#075E63] ml-2">
                    +{String(trustData.breakdown.accountReputation || 2).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[12px] leading-relaxed text-[#6B7375] mt-5">
              Your trust score reflects the quality and authenticity of your
              verified work.
            </p>
          </div>

          <div className="mt-4">
            <div className="inline-flex items-center gap-1 text-[11px] font-medium text-[#075E63] bg-[#F1F8F7] px-2.5 py-1 rounded-[4px]">
              <TrendingUp className="w-3 h-3" />
              <span>Updated 2 days ago</span>
            </div>
          </div>
        </div>

        {/* CARD 2: CLIENT CONFIRMED */}
        <div className="bg-[#FFFFFF] border border-[#E7E4DF] rounded-[8px] p-6 sm:p-7 shadow-[0_4px_18px_rgba(20,40,50,0.04)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-[1px] text-[#075E63] mb-3">
              CLIENT CONFIRMED
            </div>

            {/* Certificate Box */}
            <div className="bg-gradient-to-br from-white to-[#F9FBFB] border border-[#E7E4DF] rounded-[8px] p-4 sm:p-5 relative overflow-hidden shadow-xs mt-1">
              {/* Subtle Decorative Security Guilloche Lines */}
              <div
                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 100% 100%, #075E63 0, transparent 60%), repeating-radial-gradient(circle at 50% 50%, #075E63 0, #075E63 1px, transparent 1px, transparent 6px)",
                }}
                aria-hidden="true"
              />

              {/* Verified Header Badge */}
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#16A085] bg-[#E8F8F5] px-2 py-0.5 rounded-[4px] mb-3">
                <Check className="w-3 h-3 stroke-[2.5]" />
                <span>VERIFIED</span>
              </div>

              {/* Certificate Fields */}
              <div className="space-y-2.5 relative z-10">
                <div>
                  <div className="text-[9.5px] uppercase tracking-wider text-[#6B7375]">
                    PROJECT
                  </div>
                  <div className="text-[13.5px] font-semibold text-[#17324D] truncate">
                    {verifiedProject.name}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-[9.5px] uppercase tracking-wider text-[#6B7375]">
                      ROLE
                    </div>
                    <div className="text-[12.5px] font-semibold text-[#17324D] truncate">
                      {verifiedProject.role || "Frontend Developer"}
                    </div>
                  </div>

                  <div>
                    <div className="text-[9.5px] uppercase tracking-wider text-[#6B7375]">
                      DURATION
                    </div>
                    <div className="text-[12.5px] font-medium text-[#17324D] truncate">
                      {verifiedProject.duration || "Mar 2026 — Jun 2026"}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-[9.5px] uppercase tracking-wider text-[#6B7375]">
                    VERIFIED BY
                  </div>
                  <div className="text-[12.5px] font-semibold text-[#17324D] truncate">
                    {verifiedProject.clientName || "ABC Technologies"}
                  </div>
                </div>
              </div>

              {/* Official Seal Badge (Bottom Right) */}
              <div className="absolute right-3.5 bottom-3.5 z-10" aria-hidden="true">
                <div className="w-10 h-10 rounded-full border-2 border-dashed border-[#16A085]/60 bg-[#E8F8F5] flex items-center justify-center text-[#16A085] shadow-xs">
                  <ShieldCheck className="w-5 h-5 stroke-[2]" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-[11.5px] text-[#6B7375] mt-3">
            Authenticated via cryptographically secured client confirmation.
          </div>
        </div>

        {/* CARD 3: VERIFICATION PROCESS */}
        <div className="bg-[#FFFFFF] border border-[#E7E4DF] rounded-[8px] p-6 sm:p-7 shadow-[0_4px_18px_rgba(20,40,50,0.04)] hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-[1px] text-[#E76F51] mb-5">
              FROM WORK TO VERIFIED
            </div>

            {/* Vertical Timeline */}
            <div className="relative pl-7 space-y-4">
              {/* Vertical connecting line */}
              <div className="absolute left-[13px] top-3 bottom-3 w-[1px] bg-[#E7E4DF]" />

              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -left-7 top-0 w-6 h-6 rounded-full border border-[#E7E4DF] bg-white flex items-center justify-center text-[10.5px] font-semibold text-[#6B7375]">
                  01
                </div>
                <div>
                  <div className="text-[13px] font-bold text-[#17324D] leading-tight">
                    Create Profile
                  </div>
                  <div className="text-[11.5px] text-[#6B7375]">
                    Build your professional profile
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -left-7 top-0 w-6 h-6 rounded-full border border-[#E7E4DF] bg-white flex items-center justify-center text-[10.5px] font-semibold text-[#6B7375]">
                  02
                </div>
                <div>
                  <div className="text-[13px] font-bold text-[#17324D] leading-tight">
                    Add Project
                  </div>
                  <div className="text-[11.5px] text-[#6B7375]">
                    Add the work you've done
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="absolute -left-7 top-0 w-6 h-6 rounded-full border border-[#E7E4DF] bg-white flex items-center justify-center text-[10.5px] font-semibold text-[#6B7375]">
                  03
                </div>
                <div>
                  <div className="text-[13px] font-bold text-[#17324D] leading-tight">
                    Client Verifies
                  </div>
                  <div className="text-[11.5px] text-[#6B7375]">
                    Client confirms and verifies work
                  </div>
                </div>
              </div>

              {/* Step 4 (Highlighted Coral) */}
              <div className="relative">
                <div className="absolute -left-7 top-0 w-6 h-6 rounded-full bg-[#E76F51] text-white flex items-center justify-center text-[10.5px] font-bold shadow-xs">
                  04
                </div>
                <div>
                  <div className="text-[13px] font-bold text-[#17324D] leading-tight flex items-center gap-1">
                    <span>Build Trust</span>
                    <Check className="w-3.5 h-3.5 text-[#16A085] stroke-[2.5]" />
                  </div>
                  <div className="text-[11.5px] text-[#6B7375]">
                    Get verified. Earn opportunities.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Dot Grid in Bottom Right */}
          <div
            className="absolute right-4 bottom-4 grid grid-cols-4 gap-1 opacity-25 pointer-events-none"
            aria-hidden="true"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="w-1 h-1 rounded-full bg-[#E76F51]" />
            ))}
          </div>
        </div>
      </div>

      {/* ROW 2: Find Verified Talent | Client Reviews | Final CTA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* CARD 4: FIND VERIFIED TALENT */}
        <div className="bg-[#FFFFFF] border border-[#E7E4DF] rounded-[8px] p-6 sm:p-7 shadow-[0_4px_18px_rgba(20,40,50,0.04)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-[1px] text-[#075E63] mb-2">
              FIND VERIFIED TALENT
            </div>

            <h3 className="font-serif text-[22px] sm:text-[24px] font-medium leading-snug text-[#073F48] mt-1.5">
              Discover professionals backed by real proof.
            </h3>

            <p className="text-[12px] leading-relaxed text-[#6B7375] mt-2 font-normal">
              Hire with confidence. Work with verified talent you can trust.
            </p>
          </div>

          <div className="flex items-center justify-between pt-5 mt-4 border-t border-[#E7E4DF]/60">
            {/* 3 Circular Profile Images */}
            <div className="flex items-center -space-x-2 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                alt="Talent portrait"
                className="w-8 h-8 rounded-full ring-2 ring-white object-cover shadow-xs"
              />
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                alt="Talent portrait"
                className="w-8 h-8 rounded-full ring-2 ring-white object-cover shadow-xs"
              />
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                alt="Talent portrait"
                className="w-8 h-8 rounded-full ring-2 ring-white object-cover shadow-xs"
              />
            </div>

            {/* Action Button */}
            <Link
              href="/talent"
              className="group border border-[#075E63] text-[#075E63] hover:bg-[#075E63]/5 text-[12px] font-medium px-3.5 py-1.5 rounded-[6px] transition-colors flex items-center gap-1.5"
            >
              <span>Explore Talent</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* CARD 5: CLIENT REVIEWS */}
        <div className="bg-[#FFFFFF] border border-[#E7E4DF] rounded-[8px] p-6 sm:p-7 shadow-[0_4px_18px_rgba(20,40,50,0.04)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-[1px] text-[#075E63] mb-4">
              CLIENT REVIEWS
            </div>

            <div className="grid grid-cols-12 gap-3 items-start">
              {/* Left Column: Big rating and coral stars */}
              <div className="col-span-5 flex flex-col items-start">
                <span className="font-serif text-[46px] sm:text-[50px] font-bold leading-none text-[#073F48]">
                  {review.rating.toFixed(1)}
                </span>
                <div className="flex text-[#E76F51] mt-2 gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-current stroke-none"
                    />
                  ))}
                </div>
              </div>

              {/* Right Column: Quote & Testimonial */}
              <div className="col-span-7 pl-1">
                <div className="font-serif text-3xl leading-none text-[#075E63]/30 mb-1 select-none">
                  “
                </div>
                <p className="text-[12px] font-medium text-[#17324D] leading-relaxed line-clamp-3">
                  {review.text}
                </p>
                <div className="mt-2.5 space-y-0.5">
                  <div className="text-[11px] font-semibold text-[#075E63] flex items-center gap-1">
                    <span>{review.clientName}</span>
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <div className="text-[10.5px] font-semibold text-[#16A085] flex items-center gap-1">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                    <span>{review.projectName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-[#6B7375] mt-4 pt-3 border-t border-[#E7E4DF]/60">
            Reviews authenticated from verified invoice and contract recipients.
          </div>
        </div>

        {/* CARD 6: FINAL CTA CARD */}
        <div className="bg-[#075E63] text-white rounded-[8px] p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between shadow-sm group">
          {/* Subtle Background Radial Sheen */}
          <div
            className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <h3 className="font-serif text-[24px] sm:text-[28px] font-semibold leading-tight text-white">
              Your Work.
              <br />
              Your Proof.
            </h3>

            <p className="text-[12px] leading-relaxed text-white/80 max-w-[240px] mt-2 font-normal">
              Turn your professional experience into proof that clients and
              recruiters can trust.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-2 mt-5">
              <Link
                href="/dashboard/profile"
                className="bg-white hover:bg-white/90 text-[#075E63] text-[12px] font-semibold px-3.5 py-2 rounded-[6px] transition-colors flex items-center gap-1 group/btn shadow-xs"
              >
                <span>Create Your Profile</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/talent"
                className="bg-transparent border border-white/40 hover:bg-white/10 text-white text-[12px] font-medium px-3.5 py-2 rounded-[6px] transition-colors flex items-center gap-1 group/btn"
              >
                <span>Explore Talent</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* 3D WorkProof Shield Emblem (Right Corner) */}
          <div
            className="absolute -right-2 -bottom-2 sm:right-2 sm:bottom-2 w-28 sm:w-32 h-28 sm:h-32 pointer-events-none select-none z-0"
            aria-hidden="true"
          >
            {/* 3D Embossed Shield Graphic */}
            <svg
              viewBox="0 0 160 180"
              className="w-full h-full drop-shadow-2xl opacity-90 transition-transform group-hover:scale-105 duration-300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="shieldGrad" x1="20" y1="20" x2="140" y2="160" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0B797F" />
                  <stop offset="0.5" stopColor="#075E63" />
                  <stop offset="1" stopColor="#043A3D" />
                </linearGradient>
                <linearGradient id="bevelGrad" x1="10" y1="10" x2="150" y2="170" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2DD4BF" stopOpacity="0.8" />
                  <stop offset="0.5" stopColor="#0D9488" stopOpacity="0.4" />
                  <stop offset="1" stopColor="#042F2E" stopOpacity="0.9" />
                </linearGradient>
                <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feOffset dx="2" dy="3" />
                  <feGaussianBlur stdDeviation="3" result="offset-blur" />
                  <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
                  <feFlood floodColor="black" floodOpacity="0.6" result="color" />
                  <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                  <feComposite operator="over" in="shadow" in2="SourceGraphic" />
                </filter>
              </defs>

              {/* Shield Outer Rim */}
              <path
                d="M80 8L144 36V98C144 136 116 164 80 172C44 164 16 136 16 98V36L80 8Z"
                fill="url(#bevelGrad)"
              />

              {/* Shield Inner Face */}
              <path
                d="M80 16L136 41V96C136 130 112 155 80 163C48 155 24 130 24 96V41L80 16Z"
                fill="url(#shieldGrad)"
                stroke="#2DD4BF"
                strokeWidth="1.5"
                strokeOpacity="0.4"
                filter="url(#innerShadow)"
              />

              {/* Embossed WP Monogram */}
              <text
                x="80"
                y="112"
                textAnchor="middle"
                fontFamily="Playfair Display, Georgia, serif"
                fontSize="50"
                fontWeight="bold"
                fill="#2DD4BF"
                fillOpacity="0.9"
                stroke="#042F2E"
                strokeWidth="1.5"
                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}
              >
                WP
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
