import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Shield, Flag, Users, Activity, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  
  // Verify Admin Role
  const dbUser = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (dbUser?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // Fetch pending reports
  const pendingReports = await prisma.report.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "desc" },
    include: {
      reportedBy: true,
    }
  });

  // Fetch recent verifications for audit
  const recentVerifications = await prisma.verification.findMany({
    orderBy: { verifiedAt: "desc" },
    take: 10,
    include: {
      project: { include: { freelancer: true } },
      verifiedBy: true
    }
  });

  return (
    <div className="max-w-6xl mx-auto py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 flex items-center gap-3">
          <Shield className="w-8 h-8 text-indigo-600" />
          Admin Moderation
        </h1>
        <p className="text-neutral-500 mt-2">Manage reports, review verifications, and maintain platform integrity.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reports Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-red-100 shadow-sm">
            <CardHeader className="bg-red-50/50 border-b border-red-100">
              <CardTitle className="text-red-800 flex items-center gap-2">
                <Flag className="w-5 h-5" />
                Pending Reports ({pendingReports.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {pendingReports.length === 0 ? (
                <div className="p-8 text-center text-neutral-500">
                  <CheckCircle2 className="w-12 h-12 text-emerald-300 mx-auto mb-3" />
                  <p>No pending reports. The community is safe!</p>
                </div>
              ) : (
                <div className="divide-y divide-neutral-100">
                  {pendingReports.map((report) => (
                    <div key={report.id} className="p-6 hover:bg-neutral-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 uppercase text-xs font-bold">
                            {report.targetType}
                          </Badge>
                          <span className="text-sm font-medium text-neutral-900">{report.reason}</span>
                        </div>
                        <span className="text-xs text-neutral-400">
                          {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 bg-white border border-neutral-100 p-3 rounded-md mb-3">
                        {report.details || "No additional details provided."}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-500">
                          Reported by: <span className="font-medium text-neutral-700">{report.reportedBy.name || report.reportedBy.email}</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <button className="text-emerald-600 hover:underline font-medium">Dismiss</button>
                          <span className="text-neutral-300">|</span>
                          <button className="text-red-600 hover:underline font-medium">Take Action</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Audit Trail Sidebar */}
        <div className="space-y-6">
          <Card className="border-neutral-200 shadow-sm">
            <CardHeader className="bg-neutral-50/50 border-b border-neutral-200">
              <CardTitle className="text-neutral-800 flex items-center gap-2 text-lg">
                <Activity className="w-5 h-5" />
                Recent Verifications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-neutral-100">
                {recentVerifications.map((v) => (
                  <div key={v.id} className="p-4 hover:bg-neutral-50 transition-colors">
                    <p className="text-sm font-medium text-neutral-900 truncate">
                      {v.project.name}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-neutral-500 mt-1">
                      <Users className="w-3.5 h-3.5" />
                      <span className="truncate max-w-[120px]">{v.verifiedBy.name || v.verifiedBy.email}</span>
                      <span>→</span>
                      <span className="truncate max-w-[120px]">{v.project.freelancer.name || v.project.freelancer.username}</span>
                    </div>
                    <div className="mt-2 text-[10px] uppercase font-semibold tracking-wider text-neutral-400">
                      {formatDistanceToNow(new Date(v.verifiedAt), { addSuffix: true })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
