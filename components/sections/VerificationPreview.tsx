import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, Building2, Calendar, Code2, Check } from "lucide-react";

export function VerificationPreview() {
  return (
    <section className="w-full py-20 md:py-28 bg-[#FAFAF8] border-t border-[#E7E4DF]">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Copy */}
          <div className="space-y-6">
            <span className="text-[12px] font-semibold tracking-[1.5px] text-[#075E63] uppercase">
              TAMPER-PROOF VERIFICATION
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-semibold text-[#073F48] tracking-tight leading-tight">
              A single source of truth for your experience.
            </h2>
            <p className="text-[16px] text-[#4E5B60] leading-relaxed">
              Share a verified cryptographic proof of your work. Clients and recruiters can instantly verify who you worked for, what you built, and your exact role.
            </p>
            <ul className="space-y-3.5 pt-2">
              {[
                "Tamper-proof verification links backed by verified clients",
                "Detailed role, timeline, and endorsed skill breakdown",
                "Direct client endorsement with authentic rating",
              ].map((feature, i) => (
                <li key={i} className="flex items-center space-x-3 text-[15px] text-[#17324D] font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#E8F8F5] text-[#16A085] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Card Preview */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="bg-white border border-[#E7E4DF] shadow-[0_15px_40px_rgba(20,40,50,0.06)] rounded-[12px] overflow-hidden">
              {/* Card Top Pill Header */}
              <div className="bg-[#FAFAF8] border-b border-[#E7E4DF] px-6 py-3.5 flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#16A085] bg-[#E8F8F5] px-2.5 py-0.5 rounded-full">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                  <span>VERIFIED PROJECT</span>
                </div>
                <span className="text-xs font-mono text-[#6B7375]">ID: #WP-8472</span>
              </div>

              <div className="px-6 pt-5 pb-2">
                <h3 className="font-serif text-2xl font-bold text-[#073F48]">
                  E-Commerce Redesign
                </h3>
                <div className="flex items-center space-x-2 mt-1.5 text-[#6B7375]">
                  <Building2 className="w-4 h-4 text-[#075E63]" />
                  <span className="text-sm font-medium">Acme Technologies</span>
                </div>
              </div>

              <div className="px-6 pb-6 space-y-5">
                <div className="flex items-center justify-between border-y border-[#E7E4DF] py-3.5">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10 border border-[#E7E4DF]">
                      <AvatarImage src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80" alt="Divya Gavali" />
                      <AvatarFallback className="bg-[#F1F8F7] text-[#075E63] font-bold">DG</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm text-[#17324D]">Divya Gavali</p>
                      <p className="text-xs text-[#6B7375]">Product Designer</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#075E63] bg-[#F1F8F7] px-2.5 py-1 rounded">
                    Freelance
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1 text-[#6B7375]">
                      <Code2 className="w-4 h-4 text-[#075E63]" />
                      <span>Role</span>
                    </div>
                    <p className="font-semibold text-[#17324D]">Lead UI/UX</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1 text-[#6B7375]">
                      <Calendar className="w-4 h-4 text-[#075E63]" />
                      <span>Duration</span>
                    </div>
                    <p className="font-semibold text-[#17324D]">3 Months</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7375]">Technologies & Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Figma", "Design Systems", "User Research", "Next.js"].map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-[#F1F8F7] text-[#075E63] font-medium px-2.5 py-1 rounded border border-[#075E63]/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Client Endorsement Footer */}
                <div className="mt-4 pt-3.5 border-t border-[#E7E4DF] flex items-center justify-between bg-[#F1F8F7]/60 -mx-6 px-6 -mb-6 pb-4">
                  <div className="flex items-center space-x-2.5 text-sm">
                    <div className="w-7 h-7 rounded-full bg-[#073F48] text-white flex items-center justify-center font-bold text-xs">
                      MR
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-[#073F48]">Verified by Michael R.</p>
                      <p className="text-[11px] text-[#6B7375]">VP Product at Acme</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-[#16A085]">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Confirmed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
