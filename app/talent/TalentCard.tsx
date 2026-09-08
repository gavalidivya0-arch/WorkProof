import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Star, ShieldCheck, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface TalentUser {
  id: string;
  name: string | null;
  username: string | null;
  image: string | null;
  title: string | null;
  verifiedCount: number;
  avgRating: number;
  skills: string[];
  _expYears?: number;
}

export function TalentCard({ user }: { user: TalentUser }) {
  const displayName = user.name || user.username || "Unknown Freelancer";
  const initials = displayName.substring(0, 2).toUpperCase();

  return (
    <Link href={`/${user.username || user.id}`} className="block group">
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-emerald-200">
        <div className="flex flex-col sm:flex-row gap-5">
          <Avatar className="w-16 h-16 border-2 border-neutral-100">
            <AvatarImage src={user.image || ""} alt={displayName} />
            <AvatarFallback className="bg-emerald-100 text-emerald-800 font-semibold">{initials}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
              <div>
                <h3 className="font-bold text-lg text-neutral-900 group-hover:text-emerald-700 transition-colors truncate">
                  {displayName}
                </h3>
                {user.title && <p className="text-sm text-neutral-500 truncate">{user.title}</p>}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {user.verifiedCount > 0 && (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {user.verifiedCount} Verified
                  </Badge>
                )}
                {user.avgRating > 0 && (
                  <div className="flex items-center gap-1 text-sm font-bold text-neutral-800">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {user.avgRating.toFixed(1)}
                  </div>
                )}
              </div>
            </div>

            {user.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {user.skills.slice(0, 4).map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border-transparent">
                    {skill}
                  </Badge>
                ))}
                {user.skills.length > 4 && (
                  <Badge variant="secondary" className="bg-neutral-50 text-neutral-500 border-transparent">
                    +{user.skills.length - 4} more
                  </Badge>
                )}
              </div>
            )}
          </div>

          <div className="shrink-0 flex items-center justify-center sm:w-10 text-neutral-300 group-hover:text-emerald-500 transition-colors">
            <ArrowRight className="w-5 h-5 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
          </div>
        </div>
      </div>
    </Link>
  );
}
