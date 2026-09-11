"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check, Star, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function Hero() {
  const displayProjects = [
    {
      name: "Mobile Banking App",
      category: "UI/UX Design",
      color: "bg-blue-50 text-blue-600",
    },
    {
      name: "E-commerce Dashboard",
      category: "Product Design",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      name: "SaaS Admin Panel",
      category: "UI Design",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <section className="relative w-full pt-10 pb-16 lg:pt-14 lg:pb-24 overflow-hidden bg-[#FAFAF8]">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT COLUMN: Headline & Call-to-Actions */}
          <div className="lg:col-span-5 flex flex-col justify-center z-10">
            {/* Decorative Dot Grid */}
            <div className="flex gap-1.5 mb-3 opacity-30 select-none" aria-hidden="true">
              <div className="grid grid-cols-5 gap-1.5">
                {Array.from({ length: 15 }).map((_, i) => (
                  <span
                    key={i}
                    className="w-1 h-1 rounded-full bg-[#075E63]"
                  />
                ))}
              </div>
            </div>

            {/* Eyebrow */}
            <div className="text-[13px] font-semibold tracking-[0.5px] text-[#075E63] uppercase mb-3.5">
              VERIFIED PROOF. REAL IMPACT.
            </div>

            {/* Large Serif Headline */}
            <h1 className="font-serif text-[#073F48] font-semibold text-5xl sm:text-6xl xl:text-[72px] leading-[0.98] tracking-tight mb-5">
              Verify Today.
              <br />
              Stand Out
              <br />
              Tomorrow.
            </h1>

            {/* Description */}
            <p className="text-[#4E5B60] text-[15.5px] sm:text-[16.5px] leading-[1.6] max-w-[440px] mb-8 font-normal">
              WorkProof helps freelancers turn their real projects into verified
              proof that builds trust and opens doors.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5">
              <Link
                href="/register"
                className="group bg-[#075E63] hover:bg-[#064e52] active:scale-[0.98] text-white text-[14px] font-medium h-[48px] px-6 rounded-[6px] transition-all duration-180 flex items-center gap-2 shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>Get Verified</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-180" />
              </Link>

              <Link
                href="/talent"
                className="group bg-transparent hover:bg-[#075E63]/5 active:scale-[0.98] text-[#075E63] border border-[#075E63] text-[14px] font-medium h-[48px] px-6 rounded-[6px] transition-all duration-180 flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Talent</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-180" />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Product Mockup & Floating Card */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end min-h-[380px] sm:min-h-[440px] pt-4 lg:pt-0">
            {/* Laptop Mockup Container */}
            <div className="relative w-full max-w-[560px] lg:max-w-[580px] lg:mr-2">
              {/* Laptop Screen Body */}
              <div className="bg-[#2B323B] p-2.5 sm:p-3 rounded-t-[14px] rounded-b-[4px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-[#3E4752]">
                {/* Camera dot */}
                <div className="w-1.5 h-1.5 bg-[#4B5563] rounded-full mx-auto mb-1.5 opacity-80" />

                {/* Screen Inner Display */}
                <div className="bg-[#FFFFFF] rounded-[6px] overflow-hidden border border-[#E5E7EB] text-[#17324D] shadow-inner">
                  {/* Mockup Browser Top Header */}
                  <div className="h-9 px-3.5 bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                    </div>
                    <div className="text-[11px] font-medium text-[#6B7375] flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#075E63]" />
                      <span>workproof.io/dashboard</span>
                    </div>
                    <div className="w-10" />
                  </div>

                  {/* Mockup Content */}
                  <div className="p-4 sm:p-5 bg-white min-h-[210px] sm:min-h-[235px]">
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="text-xs font-bold text-[#073F48] uppercase tracking-wider">
                        Projects
                      </div>
                      <div className="text-[11px] text-[#075E63] font-medium">
                        3 active
                      </div>
                    </div>

                    {/* Projects List */}
                    <div className="space-y-2.5">
                      {displayProjects.map((proj, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-[6px] border border-[#E7E4DF] bg-[#FAFAF8]"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "w-8 h-8 rounded-[6px] flex items-center justify-center font-bold text-xs shrink-0 shadow-xs",
                                proj.color
                              )}
                            >
                              {proj.name.charAt(0)}
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-[#17324D]">
                                {proj.name}
                              </div>
                              <div className="text-[10px] text-[#6B7375]">
                                {proj.category}
                              </div>
                            </div>
                          </div>

                          {/* Verified badge */}
                          <div className="flex items-center gap-1 text-[11px] font-semibold text-[#16A085] bg-[#E8F8F5] px-2 py-0.5 rounded-[4px]">
                            <Check className="w-3 h-3 stroke-[2.5]" />
                            <span>Verified</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Laptop Keyboard Deck & Base */}
              <div className="relative mx-auto w-[106%] -ml-[3%] h-4 sm:h-4.5 bg-gradient-to-b from-[#D1D5DB] to-[#9CA3AF] rounded-b-[10px] shadow-[0_12px_24px_rgba(0,0,0,0.15)] flex justify-center items-start">
                <div className="w-16 h-1 bg-[#4B5563] rounded-b-md opacity-40" />
              </div>
              {/* Laptop reflection shadow */}
              <div className="w-[90%] mx-auto h-3 bg-black/10 blur-md rounded-full mt-1" />

              {/* Potted Plant Decoration */}
              <div
                className="absolute -right-6 sm:-right-10 -bottom-3 sm:-bottom-4 w-24 sm:w-32 h-24 sm:h-32 pointer-events-none z-10"
                aria-hidden="true"
              >
                <img
                  src="/assets/plant.jpg"
                  alt=""
                  className="w-full h-full object-contain drop-shadow-md mix-blend-multiply"
                />
              </div>
            </div>

            {/* FLOATING VERIFIED CARD (Overlapping Laptop) */}
            <div className="absolute left-2 sm:-left-4 md:-left-8 top-6 sm:top-8 z-20 w-[260px] sm:w-[285px] bg-[#FFFFFF] border border-[#E6E3DF] rounded-[12px] shadow-[0_15px_40px_rgba(0,0,0,0.08)] p-4 sm:p-5 transition-transform hover:-translate-y-0.5 duration-200">
              {/* Top Status Badge */}
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#16A085] bg-[#E8F8F5] px-2.5 py-0.5 rounded-full mb-3.5">
                <Check className="w-3 h-3 stroke-[2.5]" />
                <span>VERIFIED PROFESSIONAL</span>
              </div>

              {/* Profile Info: Divya Gavali */}
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-xs bg-[#E7E4DF]">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80"
                    alt="Divya Gavali"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-[#073F48] truncate">
                    Divya Gavali
                  </h4>
                  <p className="text-xs text-[#6B7375] truncate font-normal">
                    Product Designer
                  </p>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="flex text-[#E76F51]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-current stroke-none"
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-[#17324D] ml-0.5">
                      4.9
                    </span>
                    <span className="text-[10px] text-[#6B7375]">
                      (14 reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-[#E7E4DF] my-3.5" />

              {/* Stats Metrics */}
              <div className="grid grid-cols-3 gap-1 text-center">
                <div className="p-1">
                  <div className="text-[17px] font-bold text-[#073F48] leading-tight">
                    10
                  </div>
                  <div className="text-[9.5px] uppercase tracking-wider text-[#6B7375] mt-0.5">
                    Trust
                    <br />
                    Score
                  </div>
                </div>

                <div className="p-1">
                  <div className="text-[17px] font-bold text-[#073F48] leading-tight">
                    7
                  </div>
                  <div className="text-[9.5px] uppercase tracking-wider text-[#6B7375] mt-0.5">
                    Verified
                    <br />
                    Projects
                  </div>
                </div>

                <div className="p-1">
                  <div className="text-[17px] font-bold text-[#073F48] leading-tight">
                    14
                  </div>
                  <div className="text-[9.5px] uppercase tracking-wider text-[#6B7375] mt-0.5">
                    Client
                    <br />
                    Reviews
                  </div>
                </div>
              </div>

              {/* Experience Verified Pill Button */}
              <div className="mt-3.5 flex items-center justify-center gap-1 text-[11px] font-semibold text-[#16A085] bg-[#E8F8F5] py-1.5 px-3 rounded-full text-center shadow-xs">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>EXPERIENCE VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
