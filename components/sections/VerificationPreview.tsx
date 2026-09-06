import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, Building2, Calendar, Code2 } from "lucide-react";

export function VerificationPreview() {
  return (
    <section className="w-full py-24 md:py-32 bg-muted/20">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              A single source of truth for your experience.
            </h2>
            <p className="text-xl text-muted-foreground">
              Share a verified cryptographic proof of your work. Clients and recruiters can instantly verify who you worked for, what you built, and your exact role.
            </p>
            <ul className="space-y-4 pt-4">
              {["Tamper-proof verification links", "Detailed role & skill breakdown", "Direct client endorsement"].map((feature, i) => (
                <li key={i} className="flex items-center space-x-3 text-lg">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative mx-auto w-full max-w-md">
            {/* Decoration */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-blue-600 opacity-20 blur-xl" />
            
            <Card className="relative glass border-primary/20 shadow-2xl rounded-2xl overflow-hidden">
              <div className="bg-primary/5 border-b border-primary/10 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-primary font-semibold">
                  <CheckCircle2 className="w-5 h-5 fill-primary text-background" />
                  <span>VERIFIED PROJECT</span>
                </div>
                <span className="text-xs font-mono text-muted-foreground">ID: #WP-8472</span>
              </div>
              
              <CardHeader className="px-6 py-6 pb-2">
                <h3 className="text-2xl font-bold">E-Commerce Redesign</h3>
                <div className="flex items-center space-x-2 mt-2">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Acme Corp</span>
                </div>
              </CardHeader>
              
              <CardContent className="px-6 pb-8 space-y-6">
                <div className="flex items-center justify-between border-y border-border/50 py-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" alt="Freelancer" />
                      <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">Jane Doe</p>
                      <p className="text-xs text-muted-foreground">Freelance Developer</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Code2 className="w-4 h-4" />
                      <span>Role</span>
                    </div>
                    <p className="font-medium">Lead Frontend</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Duration</span>
                    </div>
                    <p className="font-medium">3 Months</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js", "TypeScript", "Tailwind CSS"].map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-muted text-foreground/80 font-normal">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between bg-primary/5 -mx-6 px-6 -mb-8 pb-6">
                  <div className="flex items-center space-x-3 text-sm">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-foreground text-background">MR</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">Verified by Michael R.</p>
                      <p className="text-xs text-muted-foreground">CTO at Acme Corp</p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
