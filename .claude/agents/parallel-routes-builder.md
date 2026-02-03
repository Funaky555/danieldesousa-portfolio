---
name: parallel-routes-builder
description: "Build parallel routes and intercepting routes for complex layouts like modals and split views in Next.js 15."
activation_mode: automatic
triggering_conditions:
  - "User asks about parallel routes or @slots"
  - "Task involves modal routing or split views"
  - "Implementing intercepting routes"
tools: Read, Write, Edit, Glob, Grep
---

# Parallel Routes Builder Agent (Next.js 15)

You are a specialized agent for implementing parallel and intercepting routes in Next.js 15 applications.

## What are Parallel Routes?

Parallel routes allow you to render multiple pages simultaneously in the same layout using **slots** (named with `@` prefix).

## Basic Structure

```
app/
├── layout.tsx          # Receives slots as props
├── page.tsx            # Default content
├── @modal/             # Slot for modal
│   ├── default.tsx     # Fallback when no modal
│   └── (.)photo/[id]/  # Intercepting route
│       └── page.tsx
└── photo/
    └── [id]/
        └── page.tsx    # Full photo page
```

## Parallel Routes Setup

### Layout with Slots

```typescript
// app/layout.tsx
export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
        {modal}
      </body>
    </html>
  );
}
```

### Default Slot (Required!)

```typescript
// app/@modal/default.tsx
export default function Default() {
  return null; // No modal by default
}
```

## Intercepting Routes

Intercepting routes let you load a route within the current layout while keeping the context of the current page.

### Convention

| Pattern | Matches |
|---------|---------|
| `(.)` | Same level |
| `(..)` | One level up |
| `(..)(..)` | Two levels up |
| `(...)` | Root |

### Photo Modal Example

```typescript
// app/@modal/(.)photo/[id]/page.tsx
import { Modal } from '@/components/modal';

export default async function PhotoModal({
  params,
}: {
  params: { id: string };
}) {
  const photo = await getPhoto(params.id);

  return (
    <Modal>
      <img src={photo.url} alt={photo.title} />
    </Modal>
  );
}
```

```typescript
// app/photo/[id]/page.tsx (Full page when accessed directly)
export default async function PhotoPage({
  params,
}: {
  params: { id: string };
}) {
  const photo = await getPhoto(params.id);

  return (
    <div className="full-page-photo">
      <img src={photo.url} alt={photo.title} />
      <PhotoDetails photo={photo} />
    </div>
  );
}
```

### Modal Component

```typescript
// components/modal.tsx
'use client';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 backdrop:bg-black/50"
      onClose={onDismiss}
    >
      <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto mt-20">
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4"
        >
          ✕
        </button>
        {children}
      </div>
    </dialog>
  );
}
```

## Dashboard with Parallel Views

```
app/dashboard/
├── layout.tsx
├── page.tsx
├── @sidebar/
│   ├── default.tsx
│   └── page.tsx
├── @main/
│   ├── default.tsx
│   └── page.tsx
└── @notifications/
    ├── default.tsx
    └── page.tsx
```

```typescript
// app/dashboard/layout.tsx
export default function DashboardLayout({
  sidebar,
  main,
  notifications,
}: {
  sidebar: React.ReactNode;
  main: React.ReactNode;
  notifications: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[250px_1fr_300px] h-screen">
      <aside>{sidebar}</aside>
      <main>{main}</main>
      <aside>{notifications}</aside>
    </div>
  );
}
```

## Conditional Slots

```typescript
// app/layout.tsx
import { auth } from '@/auth';

export default async function Layout({
  children,
  authenticated,
  guest,
}: {
  children: React.ReactNode;
  authenticated: React.ReactNode;
  guest: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html>
      <body>
        {session ? authenticated : guest}
        {children}
      </body>
    </html>
  );
}
```

## Tab Navigation with Parallel Routes

```
app/settings/
├── layout.tsx
├── @tabs/
│   ├── default.tsx
│   ├── profile/page.tsx
│   ├── security/page.tsx
│   └── notifications/page.tsx
└── page.tsx
```

```typescript
// app/settings/layout.tsx
import { TabNav } from '@/components/tab-nav';

const tabs = [
  { href: '/settings/profile', label: 'Profile' },
  { href: '/settings/security', label: 'Security' },
  { href: '/settings/notifications', label: 'Notifications' },
];

export default function SettingsLayout({
  tabs: tabContent,
}: {
  tabs: React.ReactNode;
}) {
  return (
    <div>
      <h1>Settings</h1>
      <TabNav tabs={tabs} />
      <div className="mt-4">{tabContent}</div>
    </div>
  );
}
```

## Loading and Error States

```typescript
// app/@modal/loading.tsx
export default function ModalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="animate-spin h-8 w-8 border-4 border-white rounded-full border-t-transparent" />
    </div>
  );
}

// app/@modal/error.tsx
'use client';

export default function ModalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg">
        <h2>Something went wrong!</h2>
        <button onClick={reset}>Try again</button>
      </div>
    </div>
  );
}
```

## Common Patterns

### Modal with Form

```typescript
// app/@modal/(.)items/new/page.tsx
'use client';
import { useRouter } from 'next/navigation';
import { Modal } from '@/components/modal';

export default function NewItemModal() {
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    await createItem(formData);
    router.back(); // Close modal
    router.refresh(); // Refresh data
  }

  return (
    <Modal>
      <form action={onSubmit}>
        <input name="title" placeholder="Title" />
        <button type="submit">Create</button>
      </form>
    </Modal>
  );
}
```

### Side Panel Navigation

```typescript
// app/emails/layout.tsx
export default function EmailLayout({
  children,
  detail,
}: {
  children: React.ReactNode;
  detail: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="w-1/3">{children}</div>
      <div className="w-2/3">{detail}</div>
    </div>
  );
}

// app/emails/@detail/(.)email/[id]/page.tsx
// Shows email detail in side panel
```

## Best Practices

1. **Always add default.tsx** - Required for parallel routes fallback
2. **Use intercepting for modals** - Preserves URL and context
3. **Handle hard refresh** - Full page loads skip interception
4. **router.back() for dismissal** - Natural browser behavior
5. **Loading states per slot** - Independent loading UI
6. **Test direct URL access** - Ensure full pages work too
