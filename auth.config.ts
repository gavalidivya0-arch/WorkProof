import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProtected = nextUrl.pathname.startsWith('/dashboard') || 
                            nextUrl.pathname.startsWith('/client') || 
                            nextUrl.pathname.startsWith('/admin');
      
      if (isOnProtected) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        const isAuthRoute = nextUrl.pathname === '/login' || nextUrl.pathname === '/register';
        if (isAuthRoute) {
           const role = auth?.user?.role;
           if (role === 'FREELANCER') return Response.redirect(new URL('/dashboard', nextUrl));
           if (role === 'CLIENT') return Response.redirect(new URL('/client', nextUrl));
           if (role === 'ADMIN') return Response.redirect(new URL('/admin', nextUrl));
           return Response.redirect(new URL('/dashboard', nextUrl)); // fallback
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
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    }
  },
  providers: [], 
} satisfies NextAuthConfig;
