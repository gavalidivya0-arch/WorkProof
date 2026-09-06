import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="w-full py-24 md:py-32 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-primary/5 -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[60%] rounded-full bg-primary/20 blur-[120px] -z-10 pointer-events-none" />

      <div className="container px-4 md:px-6 max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
          Stop claiming. <br className="md:hidden" />
          <span className="text-gradient-primary">Start proving.</span>
        </h2>
        
        <p className="text-xl text-muted-foreground">
          Join thousands of professionals who let their verified work speak for itself.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-8 justify-center">
          <Link href="/signup" className={buttonVariants({ size: "lg", className: "rounded-full px-8 h-14 text-base shadow-lg hover:shadow-xl transition-shadow" })}>
            Create Your Profile
          </Link>
          <Link href="/verify" className={buttonVariants({ size: "lg", variant: "outline", className: "rounded-full px-8 h-14 text-base glass hover:bg-background" })}>
            Verify a Project
          </Link>
        </div>
      </div>
    </section>
  );
}
