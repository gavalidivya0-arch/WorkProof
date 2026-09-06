import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
      <div className="container flex h-16 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl tracking-tight text-gradient-primary">WORKPROOF</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium hidden md:flex">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">Home</Link>
            <Link href="#how-it-works" className="transition-colors hover:text-foreground/80 text-foreground/60">How It Works</Link>
            <Link href="#find-talent" className="transition-colors hover:text-foreground/80 text-foreground/60">Find Talent</Link>
            <Link href="#pricing" className="transition-colors hover:text-foreground/80 text-foreground/60">Pricing</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2 hidden md:flex">
            <Link href="/login" className={buttonVariants({ variant: "ghost", className: "rounded-full" })}>
              Log In
            </Link>
            <Link href="/signup" className={buttonVariants({ className: "rounded-full shadow-sm hover:shadow-md transition-shadow" })}>
              Get Started
            </Link>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
