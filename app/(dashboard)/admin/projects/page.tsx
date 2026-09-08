import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      freelancer: true,
      client: true,
    }
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Projects</h1>
        <p className="text-neutral-500 mt-2">Monitor all projects created across the platform.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
          <CardDescription>Latest 50 projects created by freelancers.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-neutral-200 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-medium">
                <tr>
                  <th className="px-4 py-3">Project</th>
                  <th className="px-4 py-3">Freelancer</th>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-neutral-500">
                      No projects found.
                    </td>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <tr key={project.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-neutral-900">
                        {project.name}
                      </td>
                      <td className="px-4 py-3 text-neutral-600">
                        {project.freelancer.name || project.freelancer.email}
                      </td>
                      <td className="px-4 py-3 text-neutral-600">
                        {project.client ? (project.client.name || project.client.email) : project.clientEmail || "Uninvited"}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="text-[10px] uppercase">{project.verificationStatus}</Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link 
                          href={`/dashboard/projects/${project.id}`} 
                          className="inline-flex items-center text-indigo-600 hover:underline"
                        >
                          Details <ExternalLink className="w-3 h-3 ml-1" />
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
