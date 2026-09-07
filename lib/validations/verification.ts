import * as z from "zod";

export const verificationRequestSchema = z.object({
  clientEmail: z.string().email("Please enter a valid client email address."),
  message: z.string().optional(),
});

export const verificationReviewSchema = z.object({
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5."),
  text: z.string().optional(),
  isPublic: z.boolean().default(true),
});

export const processVerificationSchema = z.object({
  status: z.enum(["VERIFIED", "REJECTED"]),
  
  // Explicit confirmations required by the client to verify
  confirmWorked: z.boolean().refine((val) => val === true, {
    message: "You must confirm the freelancer worked on this project.",
  }),
  confirmRole: z.boolean().refine((val) => val === true, {
    message: "You must confirm the role was correct.",
  }),
  confirmDates: z.boolean().refine((val) => val === true, {
    message: "You must confirm the project dates are correct.",
  }),
  confirmDeliverables: z.boolean().refine((val) => val === true, {
    message: "You must confirm the deliverables are accurate.",
  }),
  
  auditMessage: z.string().optional(),
});
