import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { ExternalLink, AlertTriangle } from "lucide-react";

export default async function AdminVerificationsPage() {
  const verifications = await prisma.verification.findMany({
    orderBy: { verifiedAt: "desc" },
    take: 50,
    include: {
      project: {
        include: { freelancer: true }
      },
      verifiedBy: true,
    }
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Verification Audit</h1>
          <p className="text-neutral-500 mt-2">Monitor recent verification activity for suspicious patterns.</p>
        </div>
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 py-1.5">
          <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
          Audit Mode Active
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Verifications</CardTitle>
          <CardDescription>Latest 50 completed project verifications.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-neutral-200 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-medium">
                <tr>
                  <th className="px-4 py-3">Project</th>
                  <th className="px-4 py-3">Freelancer</th>
                  <th className="px-4 py-3">Verified By (Client)</th>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3 text-right">Certificate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {verifications.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-neutral-500">
                      No verifications found.
                    </td>
                  </tr>
                ) : (
                  verifications.map((v) => (
                    <tr key={v.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-neutral-900">
                        {v.project.name}
                      </td>
                      <td className="px-4 py-3 text-neutral-600">
                        {v.project.freelancer.name || v.project.freelancer.email}
                      </td>
                      <td className="px-4 py-3 text-neutral-600">
                        {v.verifiedBy.name || v.verifiedBy.email}
                      </td>
                      <td className="px-4 py-3 text-xs text-neutral-500">
                        {formatDistanceToNow(new Date(v.verifiedAt), { addSuffix: true })}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link 
                          href={`/verify/${v.verificationId}`} 
                          target="_blank"
                          className="inline-flex items-center text-emerald-600 hover:underline font-medium"
                        >
                          View <ExternalLink className="w-3 h-3 ml-1" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
