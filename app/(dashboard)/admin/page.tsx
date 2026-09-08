import { prisma } from "@/lib/prisma";
import { Shield, Users, FolderKanban, CheckCircle2, Flag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalyticsCharts } from "@/components/admin/AnalyticsCharts";

export default async function AdminOverview() {
  const [
    totalUsers,
    freelancers,
    clients,
    verifiedProjects,
    pendingVerifications,
    totalReviews,
    totalReports
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: "FREELANCER" } }),
    prisma.user.count({ where: { role: "CLIENT" } }),
    prisma.project.count({ where: { verificationStatus: "VERIFIED" } }),
    prisma.project.count({ where: { verificationStatus: "PENDING" } }),
    prisma.review.count(),
    prisma.report.count()
  ]);

  const analyticsData = {
    userStats: [
      { name: "Freelancers", value: freelancers },
      { name: "Clients", value: clients },
      { name: "Admins", value: totalUsers - freelancers - clients }
    ],
    verificationStats: [
      { name: "Verified", value: verifiedProjects },
      { name: "Pending", value: pendingVerifications },
    ],
    // Dummy growth data for visualization
    growthData: [
      { month: "Jan", users: 120, projects: 40 },
      { month: "Feb", users: 210, projects: 80 },
      { month: "Mar", users: 350, projects: 150 },
      { month: "Apr", users: 500, projects: 220 },
      { month: "May", users: totalUsers, projects: verifiedProjects + pendingVerifications },
    ]
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 flex items-center gap-3">
          <Shield className="w-8 h-8 text-indigo-600" />
          Platform Overview
        </h1>
        <p className="text-neutral-500 mt-2">High-level metrics and health of the WorkProof platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Projects</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{verifiedProjects}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
            <FolderKanban className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingVerifications}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <Flag className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReports}</div>
          </CardContent>
        </Card>
      </div>

      <AnalyticsCharts data={analyticsData} />
    </div>
  );
}
