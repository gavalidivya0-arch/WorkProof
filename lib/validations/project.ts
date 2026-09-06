import * as z from "zod";

export const projectDeliverableSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Deliverable title must be at least 2 characters."),
  description: z.string().optional().or(z.literal("")),
  url: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

export const projectSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters."),
  role: z.string().min(2, "Your role must be at least 2 characters."),
  description: z.string().min(10, "Please provide a more detailed description of the project."),
  projectUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  clientEmail: z.string().email("A valid client email is required for verification.").optional().or(z.literal("")),
  startDate: z.coerce.date({
    message: "Start date is required.",
  }),
  endDate: z.coerce.date().optional(),
  
  // Skills will be a comma separated string in the form, and parsed to an array of strings
  skills: z.string().min(1, "At least one skill is required."),
  
  deliverables: z.array(projectDeliverableSchema).optional(),
});
