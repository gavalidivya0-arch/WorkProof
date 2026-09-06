import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MailCheck } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

export default function VerifyEmailPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center pt-16 md:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center space-x-2">
        <span className="font-bold text-xl tracking-tight text-gradient-primary">WORKPROOF</span>
      </Link>
      
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <Card className="glass border-primary/20 shadow-2xl text-center">
          <CardHeader className="space-y-2">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
              <MailCheck className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
            <CardDescription className="text-base">
              We&apos;ve sent a verification link to your email address.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pb-8">
            <p className="text-sm text-muted-foreground">
              Please check your inbox and click the link to verify your account and gain full access to the platform.
            </p>
            <div className="pt-4">
              <Link href="/login" className={buttonVariants({ className: "w-full shadow-md shadow-primary/20" })}>
                Return to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
