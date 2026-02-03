# Form Patterns

## Basic Form with react-hook-form + zod

```tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type FormValues = z.infer<typeof formSchema>

export function LoginForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: FormValues) {
    // Handle form submission
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
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
          {form.formState.isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </Form>
  )
}
```

## With Server Actions

```tsx
// actions.ts
'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const schema = z.object({
  email: z.string().email(),
  message: z.string().min(10),
})

export async function submitContact(prevState: any, formData: FormData) {
  const validated = schema.safeParse({
    email: formData.get('email'),
    message: formData.get('message'),
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  // Save to database
  await db.contact.create({ data: validated.data })

  revalidatePath('/contact')
  return { success: true }
}
```

```tsx
// contact-form.tsx
'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { submitContact } from './actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  )
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContact, null)

  if (state?.success) {
    return <p>Thank you for your message!</p>
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
        {state?.errors?.email && (
          <p className="text-sm text-destructive">{state.errors.email}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required />
        {state?.errors?.message && (
          <p className="text-sm text-destructive">{state.errors.message}</p>
        )}
      </div>

      <SubmitButton />
    </form>
  )
}
```

## Multi-Step Form

```tsx
'use client'

import { useState } from 'react'
import { z } from 'zod'

const stepSchemas = {
  personal: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
  }),
  contact: z.object({
    email: z.string().email(),
    phone: z.string().optional(),
  }),
  preferences: z.object({
    newsletter: z.boolean(),
    notifications: z.boolean(),
  }),
}

export function MultiStepForm() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState({})

  const steps = ['Personal', 'Contact', 'Preferences']

  const handleNext = (stepData: any) => {
    setData(prev => ({ ...prev, ...stepData }))
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      handleSubmit({ ...data, ...stepData })
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (finalData: any) => {
    // Submit all data
    console.log(finalData)
  }

  return (
    <div>
      <div className="flex justify-between mb-8">
        {steps.map((s, i) => (
          <div
            key={s}
            className={cn(
              'flex-1 text-center',
              i <= step ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            {s}
          </div>
        ))}
      </div>

      {step === 0 && <PersonalStep onNext={handleNext} data={data} />}
      {step === 1 && <ContactStep onNext={handleNext} onBack={handleBack} data={data} />}
      {step === 2 && <PreferencesStep onNext={handleNext} onBack={handleBack} data={data} />}
    </div>
  )
}
```

## Common Zod Schemas

```tsx
// schemas/user.ts
import { z } from 'zod'

export const userSchema = z.object({
  // Required string
  name: z.string().min(2, 'Name must be at least 2 characters'),

  // Email
  email: z.string().email('Invalid email address'),

  // Password with requirements
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain uppercase letter')
    .regex(/[0-9]/, 'Must contain number'),

  // Optional
  bio: z.string().optional(),

  // With default
  role: z.enum(['user', 'admin']).default('user'),

  // Number
  age: z.coerce.number().min(18, 'Must be 18 or older'),

  // Date
  birthDate: z.coerce.date(),

  // Boolean
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms',
  }),

  // Array
  interests: z.array(z.string()).min(1, 'Select at least one'),

  // Nested object
  address: z.object({
    street: z.string(),
    city: z.string(),
    zip: z.string().regex(/^\d{5}$/, 'Invalid zip code'),
  }),
})

// Password confirmation
export const registerSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
```

## Form Field Components

```tsx
// components/form-fields.tsx
'use client'

import { Control, FieldPath, FieldValues } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface TextFieldProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label: string
  placeholder?: string
  type?: string
}

export function TextField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
}: TextFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export function TextAreaField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: TextFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
```
