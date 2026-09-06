import * as z from "zod";

const reservedUsernames = [
  "admin", "login", "register", "dashboard", "api", "client", "settings",
  "auth", "verify-email", "projects", "reviews", "verification"
];

export const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").optional().or(z.literal("")),
  username: z.string()
    .min(3, "Username must be at least 3 characters.")
    .max(20, "Username must be less than 20 characters.")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores.")
    .refine((val) => !reservedUsernames.includes(val.toLowerCase()), {
      message: "This username is reserved and cannot be used.",
    })
    .optional().or(z.literal("")),
  headline: z.string().max(100, "Headline too long.").optional().or(z.literal("")),
  bio: z.string().max(500, "Bio too long.").optional().or(z.literal("")),
  title: z.string().max(100).optional().or(z.literal("")),
  location: z.string().max(100).optional().or(z.literal("")),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  github: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});
