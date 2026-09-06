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
    <section className="w-full py-16 md:py-24 border-y border-border/40 bg-muted/30">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            Trusted by freelancers and companies worldwide
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
