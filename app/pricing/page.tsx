import { Check, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Free",
    id: "tier-free",
    priceMonthly: "₹0",
    description: "Perfect for freelancers just getting started with verified work.",
    features: [
      "1 public profile",
      "Up to 3 projects",
      "Basic client verification",
      "Public profile sharing",
    ],
    cta: "Get Started",
    href: "/signup",
    mostPopular: false,
  },
  {
    name: "Pro",
    id: "tier-pro",
    priceMonthly: "₹299",
    description: "Advanced tools and unlimited verifications for established professionals.",
    features: [
      "Unlimited projects",
      "Advanced profile customization",
      "Custom profile URL",
      "Profile analytics",
      "Resume Analyzer tool",
      "AI profile assistant",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    href: "/dashboard/settings",
    mostPopular: true,
  },
  {
    name: "Business",
    id: "tier-business",
    priceMonthly: "Custom",
    description: "Dedicated hiring solutions for agencies and scaling teams.",
    features: [
      "Talent search access",
      "Verified candidate profiles",
      "Organization account",
      "Unlimited team members",
      "Advanced filtering",
      "Centralized hiring dashboard",
    ],
    cta: "Contact Sales",
    href: "mailto:sales@workproof.com",
    mostPopular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600 flex items-center justify-center gap-2">
            <Shield className="w-5 h-5" />
            Pricing Plans
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
            Pricing that scales with your career
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-neutral-600">
          Whether you're building your first portfolio or hiring an entire engineering team, we have a plan designed specifically for you.
        </p>
        
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 xl:gap-x-12">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-8 xl:p-10 ${
                tier.mostPopular ? "ring-2 ring-indigo-600 bg-white" : "ring-1 ring-neutral-200 bg-neutral-50/50"
              }`}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3
                  id={tier.id}
                  className={`text-lg font-semibold leading-8 ${
                    tier.mostPopular ? "text-indigo-600" : "text-neutral-900"
                  }`}
                >
                  {tier.name}
                </h3>
                {tier.mostPopular ? (
                  <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
                    Most popular
                  </p>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-6 text-neutral-600">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-neutral-900">{tier.priceMonthly}</span>
                {tier.priceMonthly !== "Custom" && <span className="text-sm font-semibold leading-6 text-neutral-600">/month</span>}
              </p>
              
              <Link
                href={tier.href}
                aria-describedby={tier.id}
                className="block mt-6"
              >
                <Button 
                  className="w-full" 
                  variant={tier.mostPopular ? "default" : "outline"}
                >
                  {tier.cta}
                </Button>
              </Link>
              
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-neutral-600">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className={`h-6 w-5 flex-none ${tier.mostPopular ? "text-indigo-600" : "text-neutral-500"}`} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
