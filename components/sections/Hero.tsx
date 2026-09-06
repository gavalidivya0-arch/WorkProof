import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="w-full py-24 md:py-32 lg:py-40 relative overflow-hidden flex flex-col items-center">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none -z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <Badge variant="outline" className="px-4 py-1.5 text-sm rounded-full glass border-primary/20 bg-background/50 animate-in-up">
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span className="font-medium">Introducing WorkProof Verification</span>
            </span>
          </Badge>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-in-up" style={{ animationDelay: "100ms" }}>
            Your Work. <br className="hidden md:block" />
            <span className="text-gradient-primary">Verified</span> by the People Who Hired You.
          </h1>
          
          <p className="text-xl text-muted-foreground md:text-2xl leading-relaxed max-w-3xl animate-in-up" style={{ animationDelay: "200ms" }}>
            WorkProof turns freelance experience into trusted, verifiable professional proof. Stop claiming. Start proving.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-6 w-full max-w-md mx-auto sm:max-w-none justify-center animate-in-up" style={{ animationDelay: "300ms" }}>
            <Link href="/signup" className={buttonVariants({ size: "lg", className: "rounded-full px-8 h-14 text-base shadow-lg shadow-primary/25 hover:shadow-xl transition-shadow" })}>
              Get Started
            </Link>
            <Link href="#how-it-works" className={buttonVariants({ size: "lg", variant: "outline", className: "rounded-full px-8 h-14 text-base glass hover:bg-muted/50 transition-colors" })}>
              See How It Works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
