import { Button, buttonVariants } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";
import Link from "next/link";

export function FindTalent() {
  return (
    <section id="find-talent" className="w-full py-24 md:py-32 bg-primary/5 border-y border-primary/10 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Coming Soon</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Hire with Absolute Confidence
            </h2>
            <p className="text-xl text-muted-foreground">
              Stop guessing if a candidate's portfolio is real. WorkProof Talent Discovery lets you search for freelancers based on verified experience, endorsed skills, and proven track records.
            </p>
            <div className="pt-4">
              <Link href="#join-waitlist" className={buttonVariants({ size: "lg", className: "rounded-full px-8" })}>
                Join the Waitlist
              </Link>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-lg">
            <div className="glass rounded-2xl p-6 border border-primary/10 shadow-xl space-y-6 relative">
              <div className="flex items-center space-x-4 border-b border-border/50 pb-4">
                <div className="bg-muted p-3 rounded-full">
                  <Search className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/3"></div>
                </div>
              </div>
              
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-foreground/20 rounded w-24"></div>
                      <div className="h-2 bg-muted-foreground/30 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded">
                    Verified Match
                  </div>
                </div>
              ))}
              
              {/* Fade out overlay */}
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent rounded-b-2xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
