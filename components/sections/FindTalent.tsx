import { Search, Sparkles, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export function FindTalent() {
  const previewTalents = [
    {
      name: "Divya Gavali",
      role: "Product Designer",
      score: "92",
      verified: "7 Projects",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    },
    {
      name: "Aarav Sharma",
      role: "Full-Stack Engineer",
      score: "88",
      verified: "5 Projects",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    },
    {
      name: "Ananya Roy",
      role: "Brand & UI Specialist",
      score: "94",
      verified: "11 Projects",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80",
    },
  ];

  return (
    <section id="find-talent" className="w-full py-20 md:py-28 bg-[#FAFAF8] border-t border-[#E7E4DF] relative overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Column: Copy */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#E8F8F5] text-[#16A085] px-3 py-1 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TALENT DIRECTORY</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-semibold text-[#073F48] tracking-tight leading-tight">
              Hire with Absolute Confidence
            </h2>
            <p className="text-[16px] text-[#4E5B60] leading-relaxed">
              Stop guessing if a candidate's portfolio is real. WorkProof Talent Discovery lets you search and vet freelancers based on authenticated project history, verified client reviews, and verified trust scores.
            </p>
            <div className="pt-2">
              <Link
                href="/talent"
                className="inline-flex items-center gap-2 bg-[#075E63] hover:bg-[#064e52] active:scale-[0.98] text-white text-[14px] font-medium h-[48px] px-6 rounded-[6px] transition-all shadow-sm cursor-pointer"
              >
                <span>Browse Verified Talent</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Card */}
          <div className="flex-1 w-full max-w-md">
            <div className="bg-white rounded-[12px] p-6 border border-[#E7E4DF] shadow-[0_15px_40px_rgba(20,40,50,0.06)] space-y-4 relative">
              <div className="flex items-center space-x-3 border-b border-[#E7E4DF] pb-4">
                <div className="bg-[#F1F8F7] p-2.5 rounded-full text-[#075E63]">
                  <Search className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-[#073F48]">Search Verified Talent</div>
                  <div className="text-[11px] text-[#6B7375]">Filter by verified skills & score</div>
                </div>
                <span className="text-[11px] font-semibold text-[#075E63] bg-[#F1F8F7] px-2 py-0.5 rounded">
                  Live
                </span>
              </div>

              <div className="space-y-3 pt-1">
                {previewTalents.map((talent, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-[8px] border border-[#E7E4DF] hover:border-[#075E63]/40 bg-[#FAFAF8] hover:bg-white transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={talent.avatar}
                        alt={talent.name}
                        className="w-10 h-10 rounded-full object-cover border border-white shadow-xs"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#17324D]">{talent.name}</div>
                        <div className="text-[11px] text-[#6B7375]">{talent.role}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-[#16A085] bg-[#E8F8F5] px-2 py-0.5 rounded">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                        <span>Score: {talent.score}</span>
                      </div>
                      <div className="text-[10px] text-[#6B7375] mt-0.5">{talent.verified}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
