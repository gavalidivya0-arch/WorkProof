import { XCircle, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function WhyWorkProof() {
  return (
    <section className="w-full py-24 md:py-32">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">The Problem with Portfolios</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Anyone can claim they built something. WorkProof turns claims into facts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Self-Reported */}
          <Card className="border-destructive/20 bg-destructive/5 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-destructive/40" />
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center space-x-3 text-destructive">
                <XCircle className="w-8 h-8" />
                <h3 className="text-2xl font-bold">Self-Reported Claims</h3>
              </div>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start space-x-3 text-muted-foreground">
                  <span className="text-destructive font-bold mt-1">✕</span>
                  <span>"I built a scalable backend for a major client."</span>
                </li>
                <li className="flex items-start space-x-3 text-muted-foreground">
                  <span className="text-destructive font-bold mt-1">✕</span>
                  <span>"I was the lead designer on this project."</span>
                </li>
                <li className="flex items-start space-x-3 text-muted-foreground">
                  <span className="text-destructive font-bold mt-1">✕</span>
                  <span>"I increased conversion rates by 50%."</span>
                </li>
              </ul>
              <div className="pt-4 mt-4 border-t border-destructive/20 text-sm font-medium text-destructive/80">
                Hard to verify. Often exaggerated. Lacks context.
              </div>
            </CardContent>
          </Card>

          {/* Verified Proof */}
          <Card className="border-primary/20 bg-primary/5 relative overflow-hidden shadow-lg shadow-primary/5">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center space-x-3 text-primary">
                <CheckCircle2 className="w-8 h-8 fill-primary text-background" />
                <h3 className="text-2xl font-bold">Verified Proof</h3>
              </div>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start space-x-3 text-foreground">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>Client verified backend architecture role.</span>
                </li>
                <li className="flex items-start space-x-3 text-foreground">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>CTO endorsed leadership and design contribution.</span>
                </li>
                <li className="flex items-start space-x-3 text-foreground">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>Project metrics confirmed by the hiring manager.</span>
                </li>
              </ul>
              <div className="pt-4 mt-4 border-t border-primary/20 text-sm font-medium text-primary">
                Instantly verifiable. Cryptographically secure. Unquestionable.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
