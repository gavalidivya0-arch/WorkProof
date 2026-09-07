"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { processVerificationSchema } from "@/lib/validations/verification";
import { processVerification } from "@/app/actions/verifications";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, ShieldCheck, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function ClientVerificationForm({ requestId }: { requestId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, setValue, watch, formState: { errors, isValid } } = useForm<z.infer<typeof processVerificationSchema>>({
    resolver: zodResolver(processVerificationSchema),
    defaultValues: {
      status: "VERIFIED", // Default action button sets this
      confirmWorked: false,
      confirmRole: false,
      confirmDates: false,
      confirmDeliverables: false,
      auditMessage: "",
    },
    mode: "onChange"
  });

  const confirmWorked = watch("confirmWorked");
  const confirmRole = watch("confirmRole");
  const confirmDates = watch("confirmDates");
  const confirmDeliverables = watch("confirmDeliverables");

  const onSubmit = (data: z.infer<typeof processVerificationSchema>) => {
    startTransition(async () => {
      const result = await processVerification(requestId, data);
      
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(data.status === "VERIFIED" ? "Project verified successfully!" : "Verification rejected.");
        router.push("/client/verification-requests");
      }
    });
  };

  const handleReject = () => {
    // Overwrite the rules for rejection (we don't need checkboxes checked to reject)
    startTransition(async () => {
      const result = await processVerification(requestId, {
        status: "REJECTED",
        confirmWorked: true, // Bypass validation for rejection
        confirmRole: true,
        confirmDates: true,
        confirmDeliverables: true,
        auditMessage: watch("auditMessage"),
      });
      
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Verification request rejected.");
        router.push("/client/verification-requests");
      }
    });
  };

  return (
    <Card className="sticky top-24 shadow-lg border-primary/20 bg-background/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Your Verification</CardTitle>
        <CardDescription>
          Please confirm the accuracy of the freelancer's claims to verify their project.
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit((d) => onSubmit({ ...d, status: "VERIFIED" }))}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm hover:bg-muted/30 transition-colors">
              <Checkbox 
                id="confirmWorked" 
                checked={confirmWorked} 
                onCheckedChange={(c: any) => setValue("confirmWorked", c === true, { shouldValidate: true })} 
              />
              <div className="space-y-1 leading-none">
                <label htmlFor="confirmWorked" className="font-medium cursor-pointer text-sm">Freelancer worked on this project</label>
              </div>
            </div>
            
            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm hover:bg-muted/30 transition-colors">
              <Checkbox 
                id="confirmRole" 
                checked={confirmRole} 
                onCheckedChange={(c: any) => setValue("confirmRole", c === true, { shouldValidate: true })} 
              />
              <div className="space-y-1 leading-none">
                <label htmlFor="confirmRole" className="font-medium cursor-pointer text-sm">The stated Role is correct</label>
              </div>
            </div>

            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm hover:bg-muted/30 transition-colors">
              <Checkbox 
                id="confirmDates" 
                checked={confirmDates} 
                onCheckedChange={(c: any) => setValue("confirmDates", c === true, { shouldValidate: true })} 
              />
              <div className="space-y-1 leading-none">
                <label htmlFor="confirmDates" className="font-medium cursor-pointer text-sm">The project duration is accurate</label>
              </div>
            </div>

            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm hover:bg-muted/30 transition-colors">
              <Checkbox 
                id="confirmDeliverables" 
                checked={confirmDeliverables} 
                onCheckedChange={(c: any) => setValue("confirmDeliverables", c === true, { shouldValidate: true })} 
              />
              <div className="space-y-1 leading-none">
                <label htmlFor="confirmDeliverables" className="font-medium cursor-pointer text-sm">The listed deliverables were actually completed</label>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-6">
            <label htmlFor="auditMessage" className="text-sm font-medium">Feedback / Private Note (Optional)</label>
            <Textarea 
              id="auditMessage" 
              placeholder="Any context you want to add to this verification record..."
              className="resize-none h-24 text-sm"
              {...register("auditMessage")} 
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-3 bg-muted/20 pt-6">
          <Button 
            type="submit" 
            className="w-full text-base font-semibold h-12 shadow-lg shadow-emerald-500/20" 
            disabled={!isValid || isPending}
          >
            {isPending ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <ShieldCheck className="w-5 h-5 mr-2" />}
            Verify Project
          </Button>
          
          <Button 
            type="button" 
            variant="ghost" 
            className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleReject}
            disabled={isPending}
          >
            <XCircle className="w-4 h-4 mr-2" />
            Reject Verification
          </Button>
          
          <p className="text-xs text-center text-muted-foreground mt-2 px-4">
            By verifying this project, you cryptographically sign a permanent record confirming the freelancer's claims.
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
