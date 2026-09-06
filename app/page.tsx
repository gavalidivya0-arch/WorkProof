import { Hero } from "@/components/sections/Hero";
import { Trust } from "@/components/sections/Trust";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { VerificationPreview } from "@/components/sections/VerificationPreview";
import { WhyWorkProof } from "@/components/sections/WhyWorkProof";
import { FindTalent } from "@/components/sections/FindTalent";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Hero />
      <Trust />
      <HowItWorks />
      <VerificationPreview />
      <WhyWorkProof />
      <FindTalent />
      <FinalCTA />
    </div>
  );
}
