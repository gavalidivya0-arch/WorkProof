"use client";

import { ShieldCheck, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";

interface TrustScoreBadgeProps {
  score: number;
  breakdown: {
    profileCompleteness: number;
    verifiedProjects: number;
    verifiedExperience: number;
    clientReviews: number;
    accountReputation: number;
    maxProfile: number;
    maxProjects: number;
    maxExperience: number;
    maxReviews: number;
    maxReputation: number;
  };
}

export function TrustScoreBadge({ score, breakdown }: TrustScoreBadgeProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 py-1.5 px-3 cursor-pointer hover:bg-emerald-100 transition-colors">
          <ShieldCheck className="w-4 h-4 mr-2" />
          Trust Score: {score}/100
          <Info className="w-3.5 h-3.5 ml-2 text-emerald-500 opacity-70" />
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="bg-emerald-600 px-4 py-3 text-white rounded-t-md">
          <h4 className="font-semibold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-200" />
            Trust Score Breakdown
          </h4>
          <p className="text-xs text-emerald-100/90 mt-1">
            Transparent scoring based on verified activity.
          </p>
        </div>
        <div className="p-4 space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-neutral-700">Verified Projects</span>
              <span className="text-emerald-600 font-semibold">+{breakdown.verifiedProjects}</span>
            </div>
            <Progress value={(breakdown.verifiedProjects / breakdown.maxProjects) * 100} className="h-1.5" />
            <p className="text-[10px] text-neutral-500 text-right">Max {breakdown.maxProjects} pts</p>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-neutral-700">Verified Experience</span>
              <span className="text-emerald-600 font-semibold">+{breakdown.verifiedExperience}</span>
            </div>
            <Progress value={(breakdown.verifiedExperience / breakdown.maxExperience) * 100} className="h-1.5" />
            <p className="text-[10px] text-neutral-500 text-right">Max {breakdown.maxExperience} pts</p>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-neutral-700">Client Reviews</span>
              <span className="text-emerald-600 font-semibold">+{breakdown.clientReviews}</span>
            </div>
            <Progress value={(breakdown.clientReviews / breakdown.maxReviews) * 100} className="h-1.5" />
            <p className="text-[10px] text-neutral-500 text-right">Max {breakdown.maxReviews} pts</p>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-neutral-700">Profile Completeness</span>
              <span className="text-emerald-600 font-semibold">+{breakdown.profileCompleteness}</span>
            </div>
            <Progress value={(breakdown.profileCompleteness / breakdown.maxProfile) * 100} className="h-1.5" />
            <p className="text-[10px] text-neutral-500 text-right">Max {breakdown.maxProfile} pts</p>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-neutral-700">Account Reputation</span>
              <span className="text-emerald-600 font-semibold">+{breakdown.accountReputation}</span>
            </div>
            <Progress value={(breakdown.accountReputation / breakdown.maxReputation) * 100} className="h-1.5" />
            <p className="text-[10px] text-neutral-500 text-right">Max {breakdown.maxReputation} pts</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
