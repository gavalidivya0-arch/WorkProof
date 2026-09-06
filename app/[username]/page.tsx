import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Globe, Link2, ShieldCheck, CheckCircle2, Star } from "lucide-react";
import Link from "next/link";
import { calculateTrustScore } from "@/lib/db/users";
import { Progress } from "@/components/ui/progress";

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  // We are skipping the reserved words check here because they won't exist in the DB anyway,
  // but be careful not to conflict with Next.js dynamic routing precedence.
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      profile: true,
      projectsAsFreelancer: {
        where: { verificationStatus: "VERIFIED" },
        include: {
          skills: { include: { skill: true } },
          client: true,
          review: true
        }
      }
    }
  });

  if (!user) {
    notFound();
  }

  const { score } = await calculateTrustScore(user.id);
  const verifiedProjects = user.projectsAsFreelancer;

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
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

      <main className="container mx-auto px-4 max-w-6xl pt-12 space-y-12">
        
        {/* Profile Hero Section */}
        <section className="flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-primary/10 border-4 border-background shadow-xl flex-shrink-0 relative group">
            {user.image ? (
              <img src={user.image} alt={user.name || username} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl text-primary font-bold">
                {(user.name || username).charAt(0).toUpperCase()}
              </div>
            )}
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-4xl font-bold tracking-tight">{user.name || username}</h1>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs py-1">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  Trust Score: {score}/100
                </Badge>
              </div>
              <p className="text-xl text-muted-foreground mt-2">{user.profile?.title}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
        </section>

        {user.profile?.bio && (
          <section className="prose prose-sm md:prose-base dark:prose-invert max-w-4xl">
            <p className="whitespace-pre-wrap leading-relaxed">{user.profile.bio}</p>
          </section>
        )}

        <div className="w-full h-px bg-border/40" />

        {/* Verified Portfolio */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Verified Portfolio</h2>
            <Badge variant="secondary" className="text-sm">
              {verifiedProjects.length} Verified Projects
            </Badge>
          </div>

          {verifiedProjects.length === 0 ? (
            <Card className="glass border-dashed border-primary/20 bg-background/30">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground max-w-md">
                  No verified projects yet. Check back later once {user.name || username}'s clients approve their verification requests.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {verifiedProjects.map((project: any) => (
                <Card key={project.id} className="glass border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-md">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{project.name}</CardTitle>
                        <CardDescription className="mt-1">
                          Role: {project.role}
                        </CardDescription>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 whitespace-nowrap">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {project.description}
                    </p>
                    
                    {project.review && (
                      <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[1,2,3,4,5].map(star => (
                              <Star 
                                key={star} 
                                className={`w-3 h-3 ${star <= project.review!.rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-xs font-medium">Client Review</span>
                        </div>
                        {project.review.text && (
                          <p className="text-sm italic text-muted-foreground">"{project.review.text}"</p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
