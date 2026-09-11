import { XCircle, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";

export function WhyWorkProof() {
  return (
    <section className="w-full py-20 md:py-28 bg-[#FAFAF8] border-t border-[#E7E4DF]">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <span className="text-[12px] font-semibold tracking-[1.5px] text-[#075E63] uppercase">
            WHY WORKPROOF
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-[#073F48] tracking-tight">
            The Problem with Traditional Portfolios
          </h2>
          <p className="text-[16px] text-[#4E5B60] max-w-2xl font-normal leading-relaxed">
            Anyone can claim they designed or built a product. WorkProof turns unverifiable claims into incontrovertible facts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {/* Unverified / Self-Reported */}
          <div className="bg-[#FFF5F1] border border-[#F5C7B8] rounded-[12px] p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 text-[#E76F51] mb-6">
                <div className="w-10 h-10 rounded-full bg-[#E76F51]/10 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-[#E76F51]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#17324D]">Self-Reported Claims</h3>
              </div>
              <ul className="space-y-4 text-[15px]">
                <li className="flex items-start space-x-3 text-[#6B7375]">
                  <span className="text-[#E76F51] font-bold mt-0.5">✕</span>
                  <span>"I built a scalable backend for a major client."</span>
                </li>
                <li className="flex items-start space-x-3 text-[#6B7375]">
                  <span className="text-[#E76F51] font-bold mt-0.5">✕</span>
                  <span>"I was the lead designer on this $5M project."</span>
                </li>
                <li className="flex items-start space-x-3 text-[#6B7375]">
                  <span className="text-[#E76F51] font-bold mt-0.5">✕</span>
                  <span>"I increased customer conversion rates by 50%."</span>
                </li>
              </ul>
            </div>
            <div className="pt-5 mt-6 border-t border-[#F5C7B8] text-xs font-semibold uppercase tracking-wider text-[#E76F51]">
              Hard to verify • Frequently exaggerated • Lacks authentic client proof
            </div>
          </div>

          {/* Verified Proof */}
          <div className="bg-white border-2 border-[#075E63] rounded-[12px] p-7 sm:p-8 shadow-[0_15px_40px_rgba(7,94,99,0.08)] flex flex-col justify-between relative">
            <div className="absolute top-4 right-4">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F1F8F7] text-[#075E63] px-2.5 py-1 rounded-full border border-[#075E63]/20">
                Verified Standard
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-3 text-[#075E63] mb-6">
                <div className="w-10 h-10 rounded-full bg-[#E8F8F5] text-[#16A085] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#073F48]">WorkProof Verification</h3>
              </div>
              <ul className="space-y-4 text-[15px]">
                <li className="flex items-start space-x-3 text-[#17324D] font-medium">
                  <span className="text-[#16A085] font-bold mt-0.5">✓</span>
                  <span>Client verified backend architecture and delivery role.</span>
                </li>
                <li className="flex items-start space-x-3 text-[#17324D] font-medium">
                  <span className="text-[#16A085] font-bold mt-0.5">✓</span>
                  <span>VP of Product confirmed design leadership and contributions.</span>
                </li>
                <li className="flex items-start space-x-3 text-[#17324D] font-medium">
                  <span className="text-[#16A085] font-bold mt-0.5">✓</span>
                  <span>Project metrics and satisfaction score directly endorsed.</span>
                </li>
              </ul>
            </div>
            <div className="pt-5 mt-6 border-t border-[#E7E4DF] text-xs font-semibold uppercase tracking-wider text-[#075E63]">
              Instantly verifiable • Cryptographically secure • Trusted by employers
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
