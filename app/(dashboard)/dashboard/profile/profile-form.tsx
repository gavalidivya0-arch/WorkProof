"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// @ts-ignore
import { profileFormSchema } from "@/lib/validations/profile";
import { updateProfile } from "@/app/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Globe, Link2, MapPin } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

type ProfileFormProps = {
  user: any; // We'll type this properly later
};

export function ProfileForm({ user }: ProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      title: user?.profile?.title || "",
      bio: user?.profile?.bio || "",
      location: user?.profile?.location || "",
      website: user?.profile?.website || "",
      github: user?.profile?.github || "",
      linkedin: user?.profile?.linkedin || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof profileFormSchema>) => {
    setIsSubmitting(true);
    const result = await updateProfile(data);
    setIsSubmitting(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Profile updated successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="John Doe" {...register("name")} />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username (Public URL)</Label>
          <div className="flex relative">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
              workproof.com/
            </span>
            <Input id="username" className="rounded-l-none" placeholder="johndoe" {...register("username")} />
          </div>
          {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Professional Headline</Label>
        <Input id="title" placeholder="e.g. Senior Full-Stack Engineer" {...register("title")} />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea 
          id="bio" 
          placeholder="Tell clients about your experience and what makes you unique..." 
          className="min-h-[120px]"
          {...register("bio")} 
        />
        {errors.bio && <p className="text-sm text-destructive">{errors.bio.message}</p>}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Location</Label>
          <Input id="location" placeholder="e.g. San Francisco, CA" {...register("location")} />
          {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="website" className="flex items-center gap-2"><Globe className="w-4 h-4" /> Personal Website</Label>
          <Input id="website" type="url" placeholder="https://..." {...register("website")} />
          {errors.website && <p className="text-sm text-destructive">{errors.website.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="github" className="flex items-center gap-2"><Link2 className="w-4 h-4" /> GitHub URL</Label>
          <Input id="github" type="url" placeholder="https://github.com/..." {...register("github")} />
          {errors.github && <p className="text-sm text-destructive">{errors.github.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin" className="flex items-center gap-2"><Link2 className="w-4 h-4" /> LinkedIn URL</Label>
          <Input id="linkedin" type="url" placeholder="https://linkedin.com/in/..." {...register("linkedin")} />
          {errors.linkedin && <p className="text-sm text-destructive">{errors.linkedin.message}</p>}
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-border/40">
        <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </form>
  );
}
