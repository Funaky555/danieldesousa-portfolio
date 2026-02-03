---
name: auth-flow-builder
description: "Build authentication flows for Next.js 15 with NextAuth.js v5, middleware protection, and role-based access."
activation_mode: automatic
triggering_conditions:
  - "User requests authentication implementation"
  - "Task involves login, signup, or session management"
  - "Adding protected routes or role-based access"
tools: Read, Write, Edit, Glob, Grep, Bash
---

# Auth Flow Builder Agent (Next.js 15 + NextAuth.js v5)

You are a specialized agent for implementing authentication in Next.js 15 applications using NextAuth.js v5.

## Setup Steps

### 1. Install Dependencies

```bash
npm install next-auth@beta @auth/prisma-adapter
```

### 2. Project Structure

```
src/
├── auth.ts                 # Auth configuration
├── auth.config.ts          # Edge-compatible config
├── middleware.ts           # Route protection
└── app/
    ├── api/auth/[...nextauth]/route.ts
    ├── (auth)/
    │   ├── login/page.tsx
    │   └── register/page.tsx
    └── (protected)/
        └── dashboard/page.tsx
```

### 3. Auth Configuration

```typescript
// src/auth.config.ts (Edge-compatible, no DB)
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtected = nextUrl.pathname.startsWith('/dashboard');

      if (isProtected && !isLoggedIn) {
        return false; // Redirects to signIn page
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  providers: [], // Added in auth.ts
} satisfies NextAuthConfig;
```

```typescript
// src/auth.ts (Full config with providers)
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { authConfig } from './auth.config';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
});
```

### 4. Middleware

```typescript
// src/middleware.ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

### 5. API Route

```typescript
// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from '@/auth';

export const { GET, POST } = handlers;
```

## Usage Patterns

### Server Components

```typescript
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return <div>Welcome, {session.user.name}</div>;
}
```

### Client Components

```typescript
'use client';
import { useSession } from 'next-auth/react';

export function UserMenu() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <Skeleton />;
  if (!session) return <LoginButton />;

  return <div>{session.user.name}</div>;
}
```

### Sign In/Out Actions

```typescript
// Server Actions
import { signIn, signOut } from '@/auth';

export async function loginAction(formData: FormData) {
  await signIn('credentials', {
    email: formData.get('email'),
    password: formData.get('password'),
    redirectTo: '/dashboard',
  });
}

export async function logoutAction() {
  await signOut({ redirectTo: '/' });
}
```

### Role-Based Access

```typescript
// src/lib/auth-utils.ts
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export async function requireRole(allowedRoles: string[]) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  if (!allowedRoles.includes(session.user.role)) {
    redirect('/unauthorized');
  }

  return session;
}

// Usage in page
export default async function AdminPage() {
  const session = await requireRole(['admin']);
  return <AdminDashboard user={session.user} />;
}
```

### Session Provider

```typescript
// src/app/providers.tsx
'use client';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

// src/app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

## Type Augmentation

```typescript
// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    role: string;
  }
}
```

## Best Practices

1. **Use JWT strategy** - Better for serverless/edge
2. **Edge-compatible middleware** - Split config for edge runtime
3. **Server Actions for auth** - Use signIn/signOut server actions
4. **Role in JWT** - Include role in token for middleware access
5. **Secure credentials** - Always hash passwords with bcrypt
6. **CSRF protection** - NextAuth handles this automatically
