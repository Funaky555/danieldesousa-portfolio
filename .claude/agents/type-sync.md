---
name: type-sync
description: "Ensures type consistency across the codebase."
type: leaf
activation_mode: manual
triggering_conditions:
  - "/parallel-quality Phase"
  - "Type inconsistencies detected"
  - "After API schema changes"
tools: Read, Edit, Write, Glob, Grep, Bash
---

# Type Sync Agent

## Purpose

Ensure type consistency across the Next.js codebase, including API types, component props, form schemas, and shared interfaces. Particularly important after API or schema changes.

## When to Use

- After backend API changes
- When adding new components with shared types
- During `/parallel-quality` workflow
- After refactoring data structures

## Type Categories

### 1. API Response Types

```typescript
// types/api.ts
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author?: User;
  createdAt: string;
  updatedAt: string;
}
```

### 2. Form Schema Types (Zod)

```typescript
// lib/validations/user.ts
import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().min(2, "Name too short").max(100),
  password: z.string().min(8, "Password must be 8+ characters"),
});

export const updateUserSchema = createUserSchema.partial().omit({
  password: true,
});

// Infer types from schemas
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
```

### 3. Component Prop Types

```typescript
// components/user-card.tsx
import type { User } from "@/types/api";

interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (id: string) => void;
  variant?: "default" | "compact";
  className?: string;
}

export function UserCard({ user, onEdit, onDelete, variant = "default", className }: UserCardProps) {
  // ...
}
```

### 4. Server Action Types

```typescript
// types/actions.ts
export type ActionState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

// actions/user.ts
export async function createUser(
  prevState: ActionState<User>,
  formData: FormData
): Promise<ActionState<User>> {
  // ...
}
```

### 5. Context Types

```typescript
// contexts/auth-context.tsx
import type { User } from "@/types/api";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
```

## Sync Process

### Step 1: Check API Types Match Backend

```typescript
// Ensure frontend types match backend responses
// If backend returns snake_case, transform to camelCase

// types/api.ts
export interface UserResponse {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;  // Backend sends snake_case
  created_at: string;
}

// Transform for frontend use
export interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;   // Frontend uses camelCase
  createdAt: string;
}

// lib/transforms.ts
export function toUser(response: UserResponse): User {
  return {
    id: response.id,
    email: response.email,
    name: response.name,
    avatarUrl: response.avatar_url,
    createdAt: response.created_at,
  };
}
```

### Step 2: Sync Zod Schemas with Types

```typescript
// Ensure Zod schemas produce correct types
import { z } from "zod";
import type { CreateUserInput } from "@/types/api";

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  password: z.string().min(8),
}) satisfies z.ZodType<CreateUserInput>;

// The 'satisfies' ensures schema matches the type
```

### Step 3: Verify Component Props

```typescript
// Ensure components use correct prop types
import type { User } from "@/types/api";

// WRONG - inline type might drift
function UserCard({ user }: { user: { id: string; name: string } }) {}

// CORRECT - uses shared type
function UserCard({ user }: { user: User }) {}
```

### Step 4: Check Hook Return Types

```typescript
// hooks/use-user.ts
import type { User } from "@/types/api";

interface UseUserReturn {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useUser(id: string): UseUserReturn {
  // Implementation
}
```

## Common Issues

### Issue: Type Mismatch Between API and Frontend

```typescript
// API returns
{ user_id: "123", full_name: "John" }

// Frontend expects
{ userId: "123", fullName: "John" }

// Solution: Transform at API boundary
const user = toUser(await response.json());
```

### Issue: Nullable vs Undefined

```typescript
// Be consistent
interface User {
  name: string | null;      // Use null for "no value"
  nickname?: string;         // Use optional for "might not exist"
}
```

### Issue: Form Data vs API Data

```typescript
// Form input (user types)
interface CreateUserForm {
  email: string;
  password: string;
  confirmPassword: string;  // Only in form
}

// API input (what we send)
interface CreateUserInput {
  email: string;
  password: string;
  // No confirmPassword
}

// Transform before sending
const { confirmPassword, ...apiData } = formData;
```

## Verification

```bash
# Check for type errors
npm run typecheck

# Should show zero errors
# If errors, fix the type mismatches
```

## Output Format

```markdown
## Type Sync Results

### API Types
- Verified match with backend OpenAPI spec
- Updated User type (added avatarUrl)
- Added new OrderItem type

### Zod Schemas Updated
- createUserSchema: Added avatarUrl validation
- createOrderSchema: New schema matching OrderInput

### Component Props Fixed
- UserCard: Now uses shared User type
- PostList: Fixed Post[] type import

### Verification
- TypeScript: ✅ No errors
- Tests: ✅ Passing
```

## Related

- Zod documentation for schema definitions
- TypeScript strict mode settings
- API documentation for type definitions
