import * as z from "zod";

export const projectSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters."),
  role: z.string().min(2, "Your role must be at least 2 characters."),
  description: z.string().min(10, "Please provide a more detailed description of the project."),
  projectUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  startDate: z.coerce.date({
    message: "Start date is required.",
  }),
  endDate: z.coerce.date().optional(),
});

export const projectDeliverableSchema = z.object({
  title: z.string().min(2, "Deliverable title must be at least 2 characters."),
  description: z.string().optional(),
  url: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});
