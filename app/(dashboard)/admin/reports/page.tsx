import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Flag, CheckCircle2 } from "lucide-react";

export default async function AdminReportsPage() {
  const pendingReports = await prisma.report.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "desc" },
    include: {
      reportedBy: true,
    }
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Content Reports</h1>
        <p className="text-neutral-500 mt-2">Review and take action on user-submitted reports.</p>
      </div>

      <Card className="border-red-100 shadow-sm">
        <CardHeader className="bg-red-50/50 border-b border-red-100">
          <CardTitle className="text-red-800 flex items-center gap-2">
            <Flag className="w-5 h-5" />
            Pending Reports ({pendingReports.length})
          </CardTitle>
          <CardDescription>Reports awaiting administrative review.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {pendingReports.length === 0 ? (
            <div className="p-12 text-center text-neutral-500">
              <CheckCircle2 className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
              <p className="text-lg font-medium text-neutral-700">No pending reports.</p>
              <p>The community is safe and all flags have been resolved!</p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {pendingReports.map((report) => (
                <div key={report.id} className="p-6 hover:bg-neutral-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 uppercase text-xs font-bold px-2 py-1">
                        {report.targetType}
                      </Badge>
                      <span className="text-base font-semibold text-neutral-900">{report.reason}</span>
                    </div>
                    <span className="text-xs font-medium text-neutral-400 bg-neutral-100 px-2 py-1 rounded-full">
                      {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  
                  <div className="bg-white border border-neutral-200 p-4 rounded-md mb-4 shadow-sm">
                    <p className="text-sm text-neutral-700 whitespace-pre-wrap">
                      {report.details || <span className="text-neutral-400 italic">No additional details provided.</span>}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">
                      Reported by: <span className="font-semibold text-neutral-700">{report.reportedBy.name || report.reportedBy.email}</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <button className="px-4 py-1.5 text-sm font-medium text-neutral-600 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50 transition-colors">
                        Dismiss
                      </button>
                      <button className="px-4 py-1.5 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors">
                        Take Action
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
