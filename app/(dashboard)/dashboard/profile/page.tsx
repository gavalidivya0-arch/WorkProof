import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/db/users";
import { ProfileForm } from "./profile-form";

export default async function ProfileSettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = await getUserById(session.user.id!);
  
  if (!user) {
    return <div>Failed to load profile.</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your public profile and how clients see you.
        </p>
      </div>
      
      <div className="p-6 glass border border-primary/10 rounded-xl">
        <ProfileForm user={user} />
      </div>
    </div>
  );
}
