import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, TrendingUp, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50/50 pt-24 pb-20">
      <div className="container px-4 md:px-6 max-w-5xl mx-auto space-y-24">
        
        {/* Header Section */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <span className="inline-block text-[12px] font-semibold tracking-[1.5px] text-emerald-600 uppercase">
            Our Mission
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-neutral-900 tracking-tight leading-tight">
            Building the verified trust layer for the future of work.
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
            WorkProof exists to solve the biggest problem in freelancing: proving that you actually did the work you claim. We turn your past projects into undeniable proof.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-neutral-900">
              The problem with traditional portfolios.
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              Anyone can copy a website, write a fake case study, or claim they were the "lead developer" on a successful project. Clients know this, which is why they rely on long, exhausting interview processes and take-home assignments to verify skills.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              We realized that the best proof of your skills is the work you've already done for actual clients. But there was no easy way to cryptographically prove it. That's why we built WorkProof.
            </p>
          </div>
          <div className="bg-emerald-50 rounded-3xl p-8 lg:p-12 border border-emerald-100">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-white p-2 rounded-full shadow-sm text-red-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900">Fake claims are rampant</h4>
                  <p className="text-sm text-neutral-600 mt-1">Clients waste weeks filtering through candidates who exaggerate their experience.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-white p-2 rounded-full shadow-sm text-emerald-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900">Verified proof builds instant trust</h4>
                  <p className="text-sm text-neutral-600 mt-1">When a client cryptographically signs off on your work, future employers can trust it 100%.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats / Value Props */}
        <div className="grid sm:grid-cols-3 gap-8 py-12 border-y border-neutral-200">
          <div className="text-center space-y-2">
            <div className="mx-auto bg-emerald-100 w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-600 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">Cryptographic Verification</h3>
            <p className="text-sm text-neutral-500">Every project is signed by the client, making it tamper-proof.</p>
          </div>
          <div className="text-center space-y-2">
            <div className="mx-auto bg-emerald-100 w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-600 mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">Higher Conversions</h3>
            <p className="text-sm text-neutral-500">Freelancers with verified proof close clients 3x faster.</p>
          </div>
          <div className="text-center space-y-2">
            <div className="mx-auto bg-emerald-100 w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-600 mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">A Better Talent Pool</h3>
            <p className="text-sm text-neutral-500">Clients can finally hire with confidence based on real track records.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#073F48] rounded-3xl p-10 md:p-16 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />
          
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white relative z-10">
            Ready to prove your worth?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto relative z-10">
            Join the network of top-tier professionals who let their verified work speak for itself.
          </p>
          <div className="relative z-10">
            <Link 
              href="/register" 
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-[#073F48] font-medium hover:bg-neutral-100 transition-colors group"
            >
              Start building your proof
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
