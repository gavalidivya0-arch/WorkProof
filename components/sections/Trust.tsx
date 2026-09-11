import { Users, Briefcase, Star, ShieldCheck } from "lucide-react";

export function Trust() {
  const stats = [
    {
      label: "Verified Professionals",
      value: "10,000+",
      icon: Users,
    },
    {
      label: "Verified Projects",
      value: "50,000+",
      icon: Briefcase,
    },
    {
      label: "Client Reviews",
      value: "4.9/5",
      icon: Star,
    },
    {
      label: "Trusted by Companies",
      value: "2,000+",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="w-full py-16 md:py-20 border-y border-[#E7E4DF] bg-[#FAFAF8]">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[12px] font-semibold tracking-[1.5px] text-[#075E63] uppercase">
            TRUSTED BY FREELANCERS & COMPANIES WORLDWIDE
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-6 rounded-[8px] bg-white border border-[#E7E4DF] shadow-[0_2px_12px_rgba(20,40,50,0.03)] hover:-translate-y-0.5 transition-all text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#F1F8F7] text-[#075E63] border border-[#075E63]/15 flex items-center justify-center mb-4 shadow-xs">
                <stat.icon className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-[#073F48]">
                  {stat.value}
                </h3>
                <p className="text-[13px] text-[#6B7375] font-medium mt-1">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
