import { UserPlus, FilePlus, ShieldCheck, Share2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function HowItWorks() {
  const steps = [
    {
      title: "1. Create Profile",
      description: "Sign up and set up your professional freelancer identity.",
      icon: UserPlus,
    },
    {
      title: "2. Add Project",
      description: "Add details about the work you completed and your role.",
      icon: FilePlus,
    },
    {
      title: "3. Request Verification",
      description: "Send a secure link to your client to verify your work.",
      icon: ShieldCheck,
    },
    {
      title: "4. Share Proof",
      description: "Share your verified portfolio with future clients and recruiters.",
      icon: Share2,
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-24 md:py-32">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A simple 4-step process to build your verified professional reputation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-border/60 -z-10" />

          {steps.map((step, i) => (
            <Card key={i} className="glass border-primary/10 relative overflow-hidden group hover:border-primary/30 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="text-center pb-4 pt-8">
                <div className="mx-auto bg-background p-4 rounded-full border border-border shadow-sm mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base text-foreground/70">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
