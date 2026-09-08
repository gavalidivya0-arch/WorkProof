import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Globe, Link2, ShieldCheck, ShieldAlert, CheckCircle2, Star, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";
import { calculateTrustScore } from "@/lib/db/users";
import { format } from "date-fns";
import { ShareProfileButton } from "./ShareProfileButton";
import { TrustScoreBadge } from "./TrustScoreBadge";
import { isProjectModified } from "@/lib/project-utils";
import { ReportButton } from "@/components/ReportButton";

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      profile: true,
      userSkills: {
        include: { skill: true }
      },
      projectsAsFreelancer: {
        include: {
          skills: { include: { skill: true } },
          client: true,
          review: true,
          verification: true
        },
        orderBy: {
          startDate: 'desc'
        }
      }
    }
  });

  if (!user) {
    notFound();
  }

  const { score, breakdown } = await calculateTrustScore(user.id);
  const allProjects = user.projectsAsFreelancer;
  const verifiedProjects = allProjects.filter((p: any) => p.verificationStatus === "VERIFIED");
  const otherProjects = allProjects.filter((p: any) => p.verificationStatus !== "VERIFIED");
  const clientReviewsCount = allProjects.filter((p: any) => p.review).length;

  return (
    <div className="min-h-screen bg-neutral-50/50 text-foreground pb-24 font-sans">
      {/* Header / Nav */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
          <Link href="/" className="font-bold text-xl tracking-tight text-gradient-primary">
            WORKPROOF
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Log in
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-4xl pt-12 space-y-12">
        
        {/* Profile Hero Section */}
        <section className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-neutral-200">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 justify-between">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-primary/5 border border-border shadow-sm flex-shrink-0 relative group">
                {user.image ? (
                  <img src={user.image} alt={user.name || username} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl text-primary font-bold">
                    {(user.name || username).charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-4xl font-bold tracking-tight text-neutral-900">{user.name || username}</h1>
                    <TrustScoreBadge score={score} breakdown={breakdown as any} />
                  </div>
                  <p className="text-xl text-neutral-500 mt-2">{user.profile?.title}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                  {user.profile?.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {user.profile.location}
                    </div>
                  )}
                  {user.profile?.website && (
                    <a href={user.profile.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                      <Globe className="w-4 h-4" />
                      Website
                    </a>
                  )}
                  {user.profile?.github && (
                    <a href={user.profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                      <Link2 className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                  {user.profile?.linkedin && (
                    <a href={user.profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                      <Link2 className="w-4 h-4" />
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 min-w-[140px]">
              <ShareProfileButton username={user.name || username} />
              <div className="text-right mt-2">
                <ReportButton targetType="PROFILE" targetId={user.id} />
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-6 pt-8 border-t border-neutral-100">
            <div className="text-center">
              <p className="text-3xl font-bold text-neutral-900">{verifiedProjects.length}</p>
              <p className="text-sm font-medium text-neutral-500">Verified Projects</p>
            </div>
            <div className="w-px bg-neutral-200" />
            <div className="text-center">
              <p className="text-3xl font-bold text-neutral-900">{clientReviewsCount}</p>
              <p className="text-sm font-medium text-neutral-500">Client Reviews</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-8 md:col-span-1">
            {user.profile?.bio && (
              <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <h3 className="font-semibold text-neutral-900 mb-4">About</h3>
                <p className="text-neutral-600 text-sm whitespace-pre-wrap leading-relaxed">{user.profile.bio}</p>
              </section>
            )}

            {user.userSkills && user.userSkills.length > 0 && (
              <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <h3 className="font-semibold text-neutral-900 mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {user.userSkills.map((us: any) => (
                    <Badge key={us.id} variant="secondary" className="bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
                      {us.skill.name}
                    </Badge>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Projects */}
          <div className="md:col-span-2 space-y-10">
            {/* Verified Portfolio */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-neutral-900">Verified Projects</h2>
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
              </div>

              {verifiedProjects.length === 0 ? (
                <div className="bg-white rounded-xl border border-dashed border-neutral-300 p-8 text-center">
                  <ShieldCheck className="w-8 h-8 text-neutral-300 mx-auto mb-3" />
                  <p className="text-neutral-500 text-sm">No verified projects yet.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {verifiedProjects.map((project: any) => {
                    const isModified = project.verification?.projectVersion ? isProjectModified(project, project.verification.projectVersion) : false;
                    return (
                    <Card key={project.id} className="border-emerald-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                      <div className="h-1 w-full bg-gradient-to-r from-emerald-400 to-teal-500" />
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <CardTitle className="text-lg text-neutral-900 group-hover:text-emerald-700 transition-colors">
                                {project.name}
                              </CardTitle>
                              {isModified ? (
                                <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200 font-medium">
                                  <ShieldAlert className="w-3 h-3 mr-1" />
                                  Modified since verification
                                </Badge>
                              ) : (
                                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-medium">
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <CardDescription className="flex items-center gap-2 text-neutral-600 font-medium">
                              {project.role}
                            </CardDescription>
                          </div>
                          
                          {project.verification && (
                            <Link href={`/verify/${project.verification.verificationId}`}>
                              <Button variant="outline" size="sm" className="text-emerald-700 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 shrink-0">
                                View Verification <ExternalLink className="w-3 h-3 ml-2" />
                              </Button>
                            </Link>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          {format(project.startDate, "MMMM yyyy")} – {project.endDate ? format(project.endDate, "MMMM yyyy") : "Present"}
                        </div>

                        <p className="text-sm text-neutral-600 leading-relaxed">
                          {project.description}
                        </p>
                        
                        {project.skills.length > 0 && (
                          <div className="text-xs font-medium text-neutral-500 pt-2">
                            {project.skills.map((ps: any) => ps.skill.name).join(" · ")}
                          </div>
                        )}

                        {project.review && (
                          <div className="bg-neutral-50 rounded-lg p-5 mt-4 border border-neutral-100 space-y-4">
                            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                              <span className="text-sm font-semibold text-neutral-700">Client Review</span>
                              <div className="flex items-center gap-1">
                                <span className="text-xs font-bold mr-1">{project.review.rating}.0</span>
                                {[1,2,3,4,5].map(star => (
                                  <Star 
                                    key={star} 
                                    className={`w-3.5 h-3.5 ${star <= project.review!.rating ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-200'}`} 
                                  />
                                ))}
                              </div>
                            </div>
                            
                            {(project.review.communication || project.review.quality || project.review.reliability) && (
                              <div className="grid grid-cols-3 gap-2 text-xs">
                                {project.review.communication && (
                                  <div>
                                    <p className="text-neutral-500 mb-1">Communication</p>
                                    <p className="font-semibold text-neutral-800">{project.review.communication}/5</p>
                                  </div>
                                )}
                                {project.review.quality && (
                                  <div>
                                    <p className="text-neutral-500 mb-1">Quality</p>
                                    <p className="font-semibold text-neutral-800">{project.review.quality}/5</p>
                                  </div>
                                )}
                                {project.review.reliability && (
                                  <div>
                                    <p className="text-neutral-500 mb-1">Reliability</p>
                                    <p className="font-semibold text-neutral-800">{project.review.reliability}/5</p>
                                  </div>
                                )}
                              </div>
                            )}

                            {project.review.text && (
                              <p className="text-sm italic text-neutral-600 bg-white p-3 rounded-md border border-neutral-100">"{project.review.text}"</p>
                            )}
                          </div>
                        )}
                        <div className="flex justify-end pt-2">
                          <ReportButton targetType="PROJECT" targetId={project.id} />
                        </div>
                      </CardContent>
                    </Card>
                  )})}
                </div>
              )}
            </section>

            {/* Other Projects */}
            {otherProjects.length > 0 && (
              <section className="space-y-4 pt-4">
                <h2 className="text-xl font-bold text-neutral-900">Other Projects</h2>
                <div className="grid gap-4">
                  {otherProjects.map((project: any) => (
                    <Card key={project.id} className="border-neutral-200 shadow-sm">
                      <CardHeader className="pb-3">
                        <div>
                          <CardTitle className="text-lg text-neutral-900 mb-1">
                            {project.name}
                          </CardTitle>
                          <CardDescription className="text-neutral-600 font-medium">
                            {project.role}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          {format(project.startDate, "MMMM yyyy")} – {project.endDate ? format(project.endDate, "MMMM yyyy") : "Present"}
                        </div>

                        <p className="text-sm text-neutral-600 leading-relaxed">
                          {project.description}
                        </p>
                        
                        {project.skills.length > 0 && (
                          <div className="text-xs font-medium text-neutral-500 pt-2">
                            {project.skills.map((ps: any) => ps.skill.name).join(" · ")}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
