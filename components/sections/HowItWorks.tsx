import { UserPlus, FilePlus, ShieldCheck, Share2 } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      step: "Step 01",
      title: "Create Profile",
      description: "Sign up and set up your professional freelancer identity.",
      icon: UserPlus,
    },
    {
      step: "Step 02",
      title: "Add Project",
      description: "Add details about the work you completed and your role.",
      icon: FilePlus,
    },
    {
      step: "Step 03",
      title: "Request Verification",
      description: "Send a secure link to your client to verify your work.",
      icon: ShieldCheck,
    },
    {
      step: "Step 04",
      title: "Share Proof",
      description: "Share your verified portfolio with future clients and recruiters.",
      icon: Share2,
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-20 md:py-28 bg-[#FAFAF8]">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <span className="text-[12px] font-semibold tracking-[1.5px] text-[#075E63] uppercase">
            HOW IT WORKS
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-[#073F48] tracking-tight">
            From Real Work to Verified Proof
          </h2>
          <p className="text-[16px] text-[#4E5B60] max-w-2xl font-normal leading-relaxed">
            A simple 4-step process to transform your past deliverables into unquestionable professional credibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-[#E7E4DF] rounded-[10px] p-6 sm:p-7 shadow-[0_4px_18px_rgba(20,40,50,0.03)] hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 rounded-full bg-[#F1F8F7] border border-[#075E63]/15 text-[#075E63] group-hover:bg-[#075E63] group-hover:text-white transition-colors flex items-center justify-center mb-5 shadow-xs">
                <item.icon className="w-6 h-6 stroke-[1.8]" />
              </div>
              <span className="text-[11px] font-bold text-[#075E63] bg-[#E8F8F5] px-2.5 py-0.5 rounded-full mb-3 uppercase tracking-wider">
                {item.step}
              </span>
              <h3 className="font-serif text-xl font-bold text-[#073F48] mb-2">
                {item.title}
              </h3>
              <p className="text-[14px] text-[#6B7375] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
