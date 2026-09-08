import { notFound } from "next/navigation";
import { format } from "date-fns";
import { CheckCircle2, ShieldCheck, Calendar, Briefcase, User as UserIcon } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { VerificationClient } from "./VerificationClient";

interface VerificationPageProps {
  params: {
    id: string;
  };
}

export default async function VerificationPage({ params }: VerificationPageProps) {
  const verification = await prisma.verification.findUnique({
    where: {
      verificationId: params.id,
    },
    include: {
      project: {
        include: {
          skills: {
            include: {
              skill: true,
            },
          },
          freelancer: {
            include: {
              profile: true,
            },
          },
        },
      },
      verifiedBy: {
        include: {
          organization: true,
        },
      },
    },
  });

  if (!verification || verification.project.verificationStatus !== "VERIFIED") {
    notFound();
  }

  const { project, verifiedBy } = verification;
  const { freelancer } = project;
  const verifiedByName = verifiedBy.organization?.name || verifiedBy.name || "Client";
  const freelancerName = freelancer.name || freelancer.username || "Freelancer";
  
  const techStack = project.skills.map((ps: { skill: { name: string } }) => ps.skill.name).join(" · ");

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center font-sans print:bg-white print:py-0">
      <div className="max-w-3xl w-full">
        {/* Certificate Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden print:shadow-none print:border-none">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-8 py-10 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
            <div className="relative z-10 flex flex-col items-center">
              <ShieldCheck className="w-16 h-16 mb-4 text-emerald-100" />
              <h1 className="text-3xl font-bold tracking-wider mb-2 flex items-center justify-center gap-2">
                VERIFIED PROJECT
                <CheckCircle2 className="w-6 h-6 text-emerald-200" />
              </h1>
              <p className="text-emerald-100 font-medium tracking-widest text-sm uppercase">
                WorkProof Certificate of Authenticity
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 sm:p-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-2">
                {project.name}
              </h2>
              <p className="text-neutral-500 max-w-xl mx-auto">
                {project.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-neutral-100 rounded-lg text-neutral-600">
                  <UserIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 font-semibold uppercase tracking-wider mb-1">Freelancer</p>
                  <p className="font-medium text-lg text-neutral-900">{freelancerName}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-neutral-100 rounded-lg text-neutral-600">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 font-semibold uppercase tracking-wider mb-1">Role</p>
                  <p className="font-medium text-lg text-neutral-900">{project.role}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-neutral-100 rounded-lg text-neutral-600">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 font-semibold uppercase tracking-wider mb-1">Duration</p>
                  <p className="font-medium text-lg text-neutral-900">
                    {format(project.startDate, "MMMM yyyy")} – {project.endDate ? format(project.endDate, "MMMM yyyy") : "Present"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-neutral-100 rounded-lg text-emerald-600 bg-emerald-50">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 font-semibold uppercase tracking-wider mb-1">Verified By</p>
                  <p className="font-medium text-lg text-neutral-900">{verifiedByName}</p>
                </div>
              </div>
            </div>

            {techStack && (
              <div className="mb-10 text-center">
                <p className="text-sm text-neutral-500 font-semibold uppercase tracking-wider mb-3">Technologies</p>
                <p className="text-neutral-700 font-medium">{techStack}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-center border-t border-neutral-100 pt-8 mt-8">
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <p className="text-xs text-neutral-400 uppercase tracking-widest font-semibold mb-1">Verification Date</p>
                <p className="text-neutral-900 font-medium">{format(verification.verifiedAt, "MMMM d, yyyy")}</p>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-xs text-neutral-400 uppercase tracking-widest font-semibold mb-1">Verification ID</p>
                <p className="text-neutral-900 font-mono bg-neutral-100 px-3 py-1 rounded-md tracking-wider">
                  {verification.verificationId}
                </p>
              </div>
            </div>

            <VerificationClient verificationId={verification.verificationId} />
          </div>
        </div>
      </div>
    </div>
  );
}
