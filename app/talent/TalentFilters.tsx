"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const PREDEFINED_SKILLS = ["React", "Next.js", "Python", "Java", "UI/UX"];
const EXP_LEVELS = [
  { label: "Any", value: "" },
  { label: "0-1 years", value: "0-1" },
  { label: "1-3 years", value: "1-3" },
  { label: "3-5 years", value: "3-5" },
  { label: "5+ years", value: "5+" }
];
const VERIFIED_COUNTS = [
  { label: "Any", value: "" },
  { label: "1+", value: "1" },
  { label: "5+", value: "5" },
  { label: "10+", value: "10" }
];

export function TalentFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    searchParams.get("skills")?.split(",").filter(Boolean) || []
  );
  const [exp, setExp] = useState(searchParams.get("exp") || "");
  const [verified, setVerified] = useState(searchParams.get("verified") || "");

  // Debounce text search
  useEffect(() => {
    const handler = setTimeout(() => {
      updateURL("q", query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  const updateURL = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.set("page", "1"); // reset to page 1 on filter change
      router.push(`/talent?${params.toString()}`);
    },
    [searchParams, router]
  );

  const toggleSkill = (skill: string) => {
    let newSkills = [...selectedSkills];
    if (newSkills.includes(skill)) {
      newSkills = newSkills.filter((s) => s !== skill);
    } else {
      newSkills.push(skill);
    }
    setSelectedSkills(newSkills);
    updateURL("skills", newSkills.join(","));
  };

  const handleExpChange = (val: string) => {
    setExp(val);
    updateURL("exp", val);
  };

  const handleVerifiedChange = (val: string) => {
    setVerified(val);
    updateURL("verified", val);
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <Input
          placeholder="Search by name or username..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 h-11 bg-white border-neutral-200 focus-visible:ring-emerald-500"
        />
      </div>

      <div>
        <h3 className="font-semibold text-neutral-900 mb-4">Skills</h3>
        <div className="space-y-3">
          {PREDEFINED_SKILLS.map((skill) => (
            <div key={skill} className="flex items-center space-x-2">
              <Checkbox
                id={`skill-${skill}`}
                checked={selectedSkills.includes(skill)}
                onCheckedChange={() => toggleSkill(skill)}
                className="border-neutral-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
              />
              <Label htmlFor={`skill-${skill}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {skill}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-neutral-900 mb-4">Verified Experience</h3>
        <div className="space-y-2">
          {EXP_LEVELS.map((level) => (
            <label key={level.value} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-neutral-50 p-1.5 -ml-1.5 rounded-md transition-colors">
              <input
                type="radio"
                name="exp"
                value={level.value}
                checked={exp === level.value}
                onChange={() => handleExpChange(level.value)}
                className="text-emerald-600 focus:ring-emerald-500"
              />
              {level.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-neutral-900 mb-4">Verified Projects</h3>
        <div className="space-y-2">
          {VERIFIED_COUNTS.map((count) => (
            <label key={count.value} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-neutral-50 p-1.5 -ml-1.5 rounded-md transition-colors">
              <input
                type="radio"
                name="verified"
                value={count.value}
                checked={verified === count.value}
                onChange={() => handleVerifiedChange(count.value)}
                className="text-emerald-600 focus:ring-emerald-500"
              />
              {count.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
