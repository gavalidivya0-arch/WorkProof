"use client";



import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { verificationRequestSchema } from "@/lib/validations/verification";
import { requestVerification } from "@/app/actions/verifications";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Mail, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type Props = {
  projectId: string;
  defaultClientEmail?: string | null;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
};

export function RequestVerificationButton({ projectId, defaultClientEmail, className, variant = "default" }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof verificationRequestSchema>>({
    resolver: zodResolver(verificationRequestSchema),
    defaultValues: {
      clientEmail: defaultClientEmail || "",
      message: "",
    }
  });

  const onSubmit = (data: z.infer<typeof verificationRequestSchema>) => {
    startTransition(async () => {
      const result = await requestVerification(projectId, data);
      
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Verification request sent successfully!");
        setOpen(false);
        reset();
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} className={className} size="sm">
          <Send className="w-4 h-4 mr-2" /> Request Verification
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Verification</DialogTitle>
          <DialogDescription>
            Send a direct request to your client to verify your work on this project. 
            Once verified, your Trust Score will increase!
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="clientEmail">Client Email <span className="text-destructive">*</span></Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                id="clientEmail" 
                type="email" 
                className="pl-9" 
                placeholder="client@company.com" 
                {...register("clientEmail")} 
              />
            </div>
            {errors.clientEmail && <p className="text-sm text-destructive">{errors.clientEmail.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Optional Message</Label>
            <Textarea 
              id="message" 
              placeholder="Hi! Could you please verify my work on this project?" 
              className="resize-none"
              {...register("message")} 
            />
            {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send Request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
