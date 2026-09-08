"use client";

import { useState } from "react";
import { Flag, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { submitReport } from "@/app/actions/reports";
import { toast } from "sonner";

interface ReportButtonProps {
  targetType: "PROJECT" | "PROFILE" | "REVIEW" | "VERIFICATION";
  targetId: string;
  variant?: "ghost" | "outline" | "default";
}

const REASONS = [
  "Fake or fabricated information",
  "Impersonation or stolen identity",
  "Inappropriate or abusive content",
  "Spam or misleading",
  "Other"
];

export function ReportButton({ targetType, targetId, variant = "ghost" }: ReportButtonProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(REASONS[0]);
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReport = async () => {
    setIsSubmitting(true);
    try {
      const res = await submitReport({ targetType, targetId, reason, details });
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Report submitted successfully. Our team will review it shortly.");
        setOpen(false);
        setDetails("");
      }
    } catch (e) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size="sm" className="text-neutral-500 hover:text-red-600 transition-colors">
          <Flag className="w-4 h-4 mr-2" />
          Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Report {targetType.charAt(0) + targetType.slice(1).toLowerCase()}
          </DialogTitle>
          <DialogDescription>
            Flag this content for administrative review. We take all reports seriously to maintain platform integrity.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Reason</label>
            <select 
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              {REASONS.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Additional Details</label>
            <Textarea 
              placeholder="Please provide any extra context that will help us investigate..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>Cancel</Button>
          <Button variant="destructive" onClick={handleReport} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
