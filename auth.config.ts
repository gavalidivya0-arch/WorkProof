import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;
      
      const isAdminRoute = nextUrl.pathname.startsWith('/admin');
      const isClientRoute = nextUrl.pathname.startsWith('/client');
      const isDashboardRoute = nextUrl.pathname.startsWith('/dashboard');
      const isOnProtected = isAdminRoute || isClientRoute || isDashboardRoute;
      
      if (isOnProtected) {
        if (!isLoggedIn) return false; // Redirect unauthenticated users to login page
        
        // Strictly enforce role-based access
        if (isAdminRoute && role !== 'ADMIN') {
          return Response.redirect(new URL(role === 'CLIENT' ? '/client' : '/dashboard', nextUrl));
        }
        if (isClientRoute && role !== 'CLIENT') {
          return Response.redirect(new URL(role === 'ADMIN' ? '/admin' : '/dashboard', nextUrl));
        }
        if (isDashboardRoute && role !== 'FREELANCER' && role !== 'UNASSIGNED') {
          return Response.redirect(new URL(role === 'ADMIN' ? '/admin' : '/client', nextUrl));
        }
        
        return true;
      } else if (isLoggedIn) {
        const isAuthRoute = nextUrl.pathname === '/login' || nextUrl.pathname === '/register';
        if (isAuthRoute) {
           if (role === 'FREELANCER') return Response.redirect(new URL('/dashboard', nextUrl));
           if (role === 'CLIENT') return Response.redirect(new URL('/client', nextUrl));
           if (role === 'ADMIN') return Response.redirect(new URL('/admin', nextUrl));
           return Response.redirect(new URL('/dashboard', nextUrl)); // fallback for UNASSIGNED
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = (user as any).role;
        // Dynamically grant ADMIN role if email matches
        if (user.email && process.env.ADMIN_EMAIL && user.email === process.env.ADMIN_EMAIL) {
          token.role = 'ADMIN';
        }
      }
      if (trigger === 'update' && session?.role) {
        token.role = session.role;
      }
      return token;
    }
  },
  providers: [], 
} satisfies NextAuthConfig;
