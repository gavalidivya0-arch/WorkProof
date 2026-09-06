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
