import { prisma } from "@/lib/prisma";
import { TalentFilters } from "./TalentFilters";
import { TalentCard, TalentUser } from "./TalentCard";
import { SearchX, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    skills?: string;
    exp?: string;
    verified?: string;
    page?: string;
  }>;
}

export default async function TalentPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const q = params.q || "";
  const skillsFilter = params.skills?.split(",").filter(Boolean) || [];
  const expFilter = params.exp || "";
  const verifiedFilter = parseInt(params.verified || "0", 10);
  const page = parseInt(params.page || "1", 10);
  const limit = 10;

  // 1. Initial Database Query
  const users = await prisma.user.findMany({
    where: {
      role: "FREELANCER",
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { username: { contains: q, mode: "insensitive" } },
              { profile: { title: { contains: q, mode: "insensitive" } } },
            ],
          }
        : {}),
      ...(skillsFilter.length > 0
        ? {
            userSkills: {
              some: {
                skill: {
                  name: { in: skillsFilter },
                },
              },
            },
          }
        : {}),
    },
    include: {
      profile: true,
      userSkills: {
        include: { skill: true },
      },
      projectsAsFreelancer: {
        include: { review: true },
      },
    },
  });

  // 2. Post-Query Aggregations & Filtering
  let mappedUsers: TalentUser[] = users.map((user) => {
    const verifiedProjects = user.projectsAsFreelancer.filter(
      (p: any) => p.verificationStatus === "VERIFIED"
    );

    // Calc Average Rating
    const projectsWithReviews = verifiedProjects.filter((p: any) => p.review);
    let avgRating = 0;
    if (projectsWithReviews.length > 0) {
      const total = projectsWithReviews.reduce((sum: number, p: any) => sum + p.review.rating, 0);
      avgRating = total / projectsWithReviews.length;
    }

    // Calc Experience (Months)
    let totalMonths = 0;
    verifiedProjects.forEach((p: any) => {
      const end = p.endDate ? new Date(p.endDate).getTime() : Date.now();
      const start = new Date(p.startDate).getTime();
      const months = Math.ceil((end - start) / (1000 * 60 * 60 * 24 * 30));
      totalMonths += months > 0 ? months : 1;
    });
    const expYears = totalMonths / 12;

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      image: user.image,
      title: user.profile?.title || null,
      verifiedCount: verifiedProjects.length,
      avgRating,
      skills: user.userSkills.map((us: any) => us.skill.name),
      _expYears: expYears, // Internal for filtering
    };
  });

  // Apply aggregate filters
  if (verifiedFilter > 0) {
    mappedUsers = mappedUsers.filter((u) => u.verifiedCount >= verifiedFilter);
  }

  if (expFilter) {
    mappedUsers = mappedUsers.filter((u) => {
      if (expFilter === "0-1") return u._expYears <= 1;
      if (expFilter === "1-3") return u._expYears > 1 && u._expYears <= 3;
      if (expFilter === "3-5") return u._expYears > 3 && u._expYears <= 5;
      if (expFilter === "5+") return u._expYears > 5;
      return true;
    });
  }

  // Sort by verified count then rating
  mappedUsers.sort((a, b) => {
    if (b.verifiedCount !== a.verifiedCount) return b.verifiedCount - a.verifiedCount;
    return b.avgRating - a.avgRating;
  });

  const totalResults = mappedUsers.length;
  const totalPages = Math.ceil(totalResults / limit) || 1;
  const paginatedUsers = mappedUsers.slice((page - 1) * limit, page * limit);

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <div className="bg-emerald-900 pt-16 pb-20 text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 mb-4 text-emerald-300">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold tracking-wider text-sm uppercase">WorkProof Talent</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Find Verified Talent
          </h1>
          <p className="text-emerald-100 mt-4 text-lg max-w-2xl">
            Discover pre-verified freelancers and hire with absolute confidence. 
            Every project, skill, and review is cryptographically verified by past clients.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 -mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          <aside className="w-full md:w-72 shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg">Filters</h2>
                <Link href="/talent" className="text-sm text-emerald-600 hover:underline">
                  Reset
                </Link>
              </div>
              <TalentFilters />
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-neutral-500 font-medium">
                Showing {totalResults === 0 ? 0 : (page - 1) * limit + 1} - {Math.min(page * limit, totalResults)} of {totalResults} freelancers
              </p>
            </div>

            {paginatedUsers.length === 0 ? (
              <div className="bg-white rounded-xl border border-neutral-200 p-16 flex flex-col items-center text-center shadow-sm">
                <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mb-4">
                  <SearchX className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">No freelancers found</h3>
                <p className="text-neutral-500 max-w-sm mb-6">
                  We couldn't find any verified talent matching your current filters. Try broadening your search.
                </p>
                <Link href="/talent">
                  <Button variant="outline">Clear all filters</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedUsers.map((user) => (
                  <TalentCard key={user.id} user={user} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const p = i + 1;
                  const newParams = new URLSearchParams(params as any);
                  newParams.set("page", p.toString());
                  return (
                    <Link key={p} href={`/talent?${newParams.toString()}`}>
                      <Button
                        variant={page === p ? "default" : "outline"}
                        className={page === p ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                        size="sm"
                      >
                        {p}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
