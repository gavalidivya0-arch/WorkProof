"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Shield, Bell, LogOut, Trash2, User, Lock, AlertTriangle } from "lucide-react";

interface SettingsClientProps {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    role: string;
    plan: string;
    username: string | null;
    createdAt: Date;
  };
}

export function SettingsClient({ user }: SettingsClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await signOut({ callbackUrl: "/" });
    });
  };

  const planColor =
    user.plan === "PRO"
      ? "bg-indigo-100 text-indigo-700 border-indigo-200"
      : user.plan === "BUSINESS"
      ? "bg-amber-100 text-amber-700 border-amber-200"
      : "bg-neutral-100 text-neutral-600 border-neutral-200";

  return (
    <div className="space-y-8">
      {/* Account Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-muted-foreground" />
            <CardTitle>Account Information</CardTitle>
          </div>
          <CardDescription>Your account details and current plan.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={user.name || ""} disabled className="bg-muted/40" />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input value={user.email || ""} disabled className="bg-muted/40" />
            </div>
            <div className="space-y-2">
              <Label>Username</Label>
              <Input value={user.username || "Not set"} disabled className="bg-muted/40" />
            </div>
            <div className="space-y-2">
              <Label>Account Role</Label>
              <Input value={user.role} disabled className="bg-muted/40 capitalize" />
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Label>Current Plan</Label>
            <Badge className={`${planColor} border font-semibold`}>{user.plan}</Badge>
            {user.plan === "FREE" && (
              <Button
                variant="outline"
                size="sm"
                className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                onClick={() => router.push("/pricing")}
              >
                Upgrade to PRO
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-muted-foreground" />
            <CardTitle>Security</CardTitle>
          </div>
          <CardDescription>Manage your account security settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div>
              <p className="font-medium text-sm">Password</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Change your account password. Use a strong, unique password.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info("Password change via email will be available soon.")}
            >
              Change Password
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-emerald-500" />
              <div>
                <p className="font-medium text-sm">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground mt-0.5">Add an extra layer of security to your account.</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info("2FA setup will be available soon.")}
            >
              Enable 2FA
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>Control what emails you receive from WorkProof.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { label: "Verification requests", desc: "When a client approves or rejects your project" },
              { label: "Client reviews", desc: "When a client leaves a review on your project" },
              { label: "Platform updates", desc: "New features and product announcements" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
                <div>
                  <p className="font-medium text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
                <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">On</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/30">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
          </div>
          <CardDescription>Irreversible account actions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-sm">Sign Out</p>
                <p className="text-xs text-muted-foreground mt-0.5">Sign out of your current session.</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut} disabled={isPending}>
              Sign Out
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/5 border border-destructive/20">
            <div className="flex items-center gap-3">
              <Trash2 className="w-5 h-5 text-destructive" />
              <div>
                <p className="font-medium text-sm text-destructive">Delete Account</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Permanently delete your account and all data. This cannot be undone.
                </p>
              </div>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => toast.error("Please contact support to delete your account.")}
            >
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
