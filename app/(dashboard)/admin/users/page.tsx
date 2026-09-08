import { prisma } from "@/lib/prisma";
import { UserSuspendButton } from "@/components/admin/UserSuspendButton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default async function AdminUsersPage({
  searchParams
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || "";

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
        { username: { contains: query, mode: "insensitive" } },
      ]
    },
    orderBy: { createdAt: "desc" },
    take: 50, // simple pagination/limit for now
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">User Management</h1>
        <p className="text-neutral-500 mt-2">Search, view, and moderate all platform users.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users Database</CardTitle>
          <CardDescription>Showing top 50 recent/matching users.</CardDescription>
          <div className="mt-4 relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-neutral-400" />
            </div>
            {/* Note: In a real app we'd use a Client Component for debounced search pushing to the URL */}
            <form action="">
              <Input 
                name="q"
                type="search"
                placeholder="Search by name, email, or username..."
                defaultValue={query}
                className="pl-10"
              />
            </form>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-neutral-200 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-medium">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Joined</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-neutral-500">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-neutral-900">{user.name || "Unknown"}</div>
                        <div className="text-xs text-neutral-500">{user.email}</div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="secondary" className="text-[10px] uppercase">{user.role}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        {user.status === "ACTIVE" ? (
                          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100">Active</Badge>
                        ) : (
                          <Badge variant="destructive">Suspended</Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 text-neutral-500 text-xs">
                        {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                      </td>
                      <td className="px-4 py-3 text-right flex justify-end">
                        {user.role !== "ADMIN" && (
                          <UserSuspendButton userId={user.id} currentStatus={user.status} />
                        )}
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
