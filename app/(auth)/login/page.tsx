"use client";

import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "@/lib/validations/auth";
import { loginUser, signInWithGoogle } from "@/app/actions/auth";
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
      // Use window.location.href to guarantee a full reload which ensures
      // middleware and server components correctly pick up the new session.
      window.location.href = "/dashboard";
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

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/40" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background/80 px-2 text-muted-foreground backdrop-blur-sm">
              Or continue with
            </span>
          </div>
        </div>

        <form action={signInWithGoogle} className="mt-6">
          <Button variant="outline" type="submit" className="w-full h-11 bg-background/50 hover:bg-background/80">
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
            Google
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-2 border-t border-border/40 pt-6">
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
