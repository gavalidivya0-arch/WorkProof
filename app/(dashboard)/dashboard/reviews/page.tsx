import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Star, MessageSquare, ShieldCheck, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default async function ReviewsDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "FREELANCER") redirect("/dashboard");

  const projects = await prisma.project.findMany({
    where: {
      freelancerId: session.user.id,
      review: { isNot: null },
    },
    include: {
      review: true,
      skills: { include: { skill: true } },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const reviews = projects.map((p) => ({ ...p.review!, projectName: p.name, projectSkills: p.skills }));

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  const avgCommunication =
    reviews.filter((r) => r.communication).length > 0
      ? (
          reviews.filter((r) => r.communication).reduce((sum, r) => sum + (r.communication ?? 0), 0) /
          reviews.filter((r) => r.communication).length
        ).toFixed(1)
      : null;

  const avgQuality =
    reviews.filter((r) => r.quality).length > 0
      ? (
          reviews.filter((r) => r.quality).reduce((sum, r) => sum + (r.quality ?? 0), 0) /
          reviews.filter((r) => r.quality).length
        ).toFixed(1)
      : null;

  const avgReliability =
    reviews.filter((r) => r.reliability).length > 0
      ? (
          reviews.filter((r) => r.reliability).reduce((sum, r) => sum + (r.reliability ?? 0), 0) /
          reviews.filter((r) => r.reliability).length
        ).toFixed(1)
      : null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Client Reviews</h1>
        <p className="text-muted-foreground mt-1">
          Reviews submitted by verified clients for your projects.
        </p>
      </div>

      {/* Summary Cards */}
      {reviews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
              <MessageSquare className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{reviews.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{avgRating ?? "—"}<span className="text-sm font-normal text-muted-foreground">/5</span></p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Communication</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{avgCommunication ?? "—"}<span className="text-sm font-normal text-muted-foreground">/5</span></p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Quality</CardTitle>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{avgQuality ?? "—"}<span className="text-sm font-normal text-muted-foreground">/5</span></p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Review List */}
      {reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-border rounded-2xl text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Star className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">No reviews yet</h3>
            <p className="text-muted-foreground text-sm max-w-sm mt-1">
              Client reviews appear here after a verified project has been reviewed. Get a project verified first, then share the review link with your client.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-neutral-900">{review.projectName}</p>
                    {review.createdAt && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {format(new Date(review.createdAt), "MMMM d, yyyy")}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-sm font-bold">{review.rating}.0</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-neutral-200"}`}
                      />
                    ))}
                  </div>
                </div>

                {(review.communication || review.quality || review.reliability) && (
                  <div className="grid grid-cols-3 gap-4 p-4 bg-muted/40 rounded-lg text-sm">
                    {review.communication && (
                      <div className="text-center">
                        <p className="text-muted-foreground text-xs mb-1">Communication</p>
                        <p className="font-bold text-neutral-800">{review.communication}/5</p>
                      </div>
                    )}
                    {review.quality && (
                      <div className="text-center">
                        <p className="text-muted-foreground text-xs mb-1">Quality</p>
                        <p className="font-bold text-neutral-800">{review.quality}/5</p>
                      </div>
                    )}
                    {review.reliability && (
                      <div className="text-center">
                        <p className="text-muted-foreground text-xs mb-1">Reliability</p>
                        <p className="font-bold text-neutral-800">{review.reliability}/5</p>
                      </div>
                    )}
                  </div>
                )}

                {review.text && (
                  <blockquote className="text-sm italic text-neutral-600 border-l-2 border-primary/30 pl-4">
                    "{review.text}"
                  </blockquote>
                )}

                {review.projectSkills && review.projectSkills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(review.projectSkills as any[]).map((ps: any) => (
                      <Badge key={ps.id} variant="secondary" className="text-xs">
                        {ps.skill.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
