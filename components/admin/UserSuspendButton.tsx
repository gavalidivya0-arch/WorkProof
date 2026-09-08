"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toggleUserSuspension } from "@/app/actions/admin";
import { toast } from "sonner";
import { Ban, CheckCircle } from "lucide-react";

export function UserSuspendButton({ userId, currentStatus }: { userId: string, currentStatus: string }) {
  const [isPending, setIsPending] = useState(false);
  const isSuspended = currentStatus === "SUSPENDED";

  const handleToggle = async () => {
    setIsPending(true);
    try {
      const result = await toggleUserSuspension(userId);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`User successfully ${result.newStatus === "SUSPENDED" ? "suspended" : "reactivated"}.`);
      }
    } catch (e) {
      toast.error("Failed to update user status.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button 
      variant={isSuspended ? "outline" : "destructive"} 
      size="sm" 
      onClick={handleToggle}
      disabled={isPending}
      className="w-28 flex items-center justify-center gap-2"
    >
      {isPending ? (
        "Updating..."
      ) : isSuspended ? (
        <>
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span className="text-emerald-700">Reactivate</span>
        </>
      ) : (
        <>
          <Ban className="w-4 h-4" />
          <span>Suspend</span>
        </>
      )}
    </Button>
  );
}
