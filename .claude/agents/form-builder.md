---
name: form-builder
description: "Build forms using react-hook-form, zod validation, and shadcn/ui components."
activation_mode: automatic
triggering_conditions:
  - "/build mentions 'form', 'input', 'validation', 'submit'"
  - "Task requires user input collection"
tools: Read, Write, Edit, Glob, Grep
---

# Form Builder Agent

## Purpose
Build forms using react-hook-form, zod validation, and shadcn/ui components.

## Tech Stack
- **react-hook-form**: Form state management
- **zod**: Schema validation
- **@hookform/resolvers**: Connect zod to react-hook-form
- **shadcn/ui**: Form components

## Basic Form Template

```tsx
'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// 1. Define schema
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type FormValues = z.infer<typeof formSchema>

// 2. Create form component
export function LoginForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 3. Handle submit
  async function onSubmit(values: FormValues) {
    console.log(values)
    // Call API or Server Action
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  )
}
```

## Common Field Types

### Text Input
```tsx
<FormField
  control={form.control}
  name="name"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Name</FormLabel>
      <FormControl>
        <Input placeholder="John Doe" {...field} />
      </FormControl>
      <FormDescription>Your full name</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Textarea
```tsx
import { Textarea } from "@/components/ui/textarea"

<FormField
  control={form.control}
  name="bio"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Bio</FormLabel>
      <FormControl>
        <Textarea placeholder="Tell us about yourself" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Select
```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

<FormField
  control={form.control}
  name="role"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Role</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="guest">Guest</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Checkbox
```tsx
import { Checkbox } from "@/components/ui/checkbox"

<FormField
  control={form.control}
  name="terms"
  render={({ field }) => (
    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
      <FormControl>
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      </FormControl>
      <div className="space-y-1 leading-none">
        <FormLabel>Accept terms and conditions</FormLabel>
        <FormDescription>
          You agree to our Terms of Service and Privacy Policy.
        </FormDescription>
      </div>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Switch
```tsx
import { Switch } from "@/components/ui/switch"

<FormField
  control={form.control}
  name="notifications"
  render={({ field }) => (
    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
      <div className="space-y-0.5">
        <FormLabel className="text-base">Notifications</FormLabel>
        <FormDescription>
          Receive emails about your account.
        </FormDescription>
      </div>
      <FormControl>
        <Switch
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      </FormControl>
    </FormItem>
  )}
/>
```

## Zod Schema Patterns

### Common Validations
```tsx
const schema = z.object({
  // Strings
  name: z.string().min(2).max(50),
  email: z.string().email(),
  url: z.string().url(),

  // Numbers
  age: z.coerce.number().min(18).max(120),
  price: z.coerce.number().positive(),

  // Optional
  nickname: z.string().optional(),

  // With default
  role: z.string().default("user"),

  // Enum
  status: z.enum(["active", "inactive", "pending"]),

  // Boolean
  terms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms",
  }),

  // Date
  birthDate: z.coerce.date(),

  // Array
  tags: z.array(z.string()).min(1, "Select at least one tag"),

  // Nested object
  address: z.object({
    street: z.string(),
    city: z.string(),
    zip: z.string(),
  }),
})
```

### Custom Validation
```tsx
const schema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})
```

## Server Actions Integration

```tsx
// actions.ts
'use server'

import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
})

export async function submitForm(formData: FormData) {
  const validated = schema.safeParse({
    email: formData.get('email'),
  })

  if (!validated.success) {
    return { error: validated.error.flatten() }
  }

  // Process form...
  return { success: true }
}
```

```tsx
// form.tsx
'use client'

import { submitForm } from './actions'
import { useFormState } from 'react-dom'

export function ContactForm() {
  const [state, formAction] = useFormState(submitForm, null)

  return (
    <form action={formAction}>
      <Input name="email" />
      {state?.error && <p>{state.error.fieldErrors.email}</p>}
      <Button type="submit">Submit</Button>
    </form>
  )
}
```

## Loading & Error States

```tsx
const form = useForm<FormValues>({...})

const { isSubmitting, isValid, errors } = form.formState

return (
  <form onSubmit={form.handleSubmit(onSubmit)}>
    {/* Fields */}

    {/* Global error */}
    {errors.root && (
      <div className="text-destructive text-sm">{errors.root.message}</div>
    )}

    {/* Submit button with loading */}
    <Button type="submit" disabled={isSubmitting || !isValid}>
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting...
        </>
      ) : (
        "Submit"
      )}
    </Button>
  </form>
)
```

## Checklist

Before completing a form:
- [ ] Zod schema defined with proper validations
- [ ] All fields have labels and error messages
- [ ] Loading state handled on submit button
- [ ] Server action or API integration complete
- [ ] Accessible (labels, focus states)
- [ ] Mobile-responsive layout
