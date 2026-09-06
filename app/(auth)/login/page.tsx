"use client";

import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "@/lib/validations/auth";
import { loginUser } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setError(null);
    const result = await loginUser(data);
    
    if (result?.error) {
      setError(result.error);
    } else {
      // The router.refresh() will re-evaluate the middleware, 
      // which will redirect the user to their respective dashboard based on their role.
      router.refresh();
      router.push("/dashboard"); // Fallback trigger
    }
  };

  return (
    <Card className="glass border-primary/20 shadow-2xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>
          Enter your email to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {registered && (
            <div className="p-3 bg-primary/10 text-primary text-sm rounded-md border border-primary/20 text-center font-medium">
              Account created successfully! Please sign in.
            </div>
          )}
          {error && (
            <div className="p-3 bg-destructive/15 text-destructive text-sm rounded-md border border-destructive/20 text-center">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" {...register("email")} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-sm text-primary hover:underline underline-offset-4">
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>

          <Button type="submit" className="w-full h-11 shadow-md shadow-primary/20" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm text-muted-foreground w-full text-center">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center pt-16 md:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center space-x-2">
        <span className="font-bold text-xl tracking-tight text-gradient-primary">WORKPROOF</span>
      </Link>
      
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
