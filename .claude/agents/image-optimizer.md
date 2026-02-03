---
name: image-optimizer
description: "Optimize images using Next.js Image component and proper formats."
activation_mode: automatic
triggering_conditions:
  - "/build involves images or media"
  - "Task requires image optimization or lazy loading"
tools: Read, Write, Edit, Glob, Grep
---

# Image Optimizer Agent

## Purpose
Optimize images for web performance using Next.js Image component, proper formats, lazy loading, and placeholder strategies.

## When to Use
- Adding images to pages
- Website cloning (handling source images)
- Performance optimization
- Building image-heavy galleries

## Next.js Image Component

### Basic Usage
```tsx
import Image from 'next/image'

// Local image (automatic optimization)
import heroImage from '@/public/hero.jpg'

<Image
  src={heroImage}
  alt="Hero section background"
  placeholder="blur" // Automatic blur placeholder
/>

// Remote image
<Image
  src="https://example.com/image.jpg"
  alt="Description"
  width={800}
  height={600}
/>
```

### Fill Mode (Responsive Container)
```tsx
<div className="relative aspect-video">
  <Image
    src="/hero.jpg"
    alt="Hero image"
    fill
    className="object-cover"
    sizes="100vw"
  />
</div>

// Card with image
<div className="relative h-48 w-full">
  <Image
    src={product.image}
    alt={product.name}
    fill
    className="object-cover rounded-t-lg"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
</div>
```

### Priority Loading (LCP Images)
```tsx
// Hero images, above-the-fold content
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // Disables lazy loading, preloads
/>
```

### Sizes Attribute
```tsx
// Tell browser which size to download
<Image
  src="/image.jpg"
  alt="Responsive image"
  fill
  sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 50vw,
    33vw
  "
/>

// Common patterns:
// Full width: sizes="100vw"
// Half width on tablet+: sizes="(max-width: 768px) 100vw, 50vw"
// Grid of 3: sizes="(max-width: 768px) 100vw, 33vw"
// Sidebar image: sizes="300px"
```

## Remote Images Configuration

```js
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.example.com', // Wildcard subdomain
      },
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
        pathname: '/images/**',
      },
    ],
    // Or for specific domains
    domains: ['images.unsplash.com', 'cdn.example.com'],
  },
}
```

## Placeholder Strategies

### Blur Placeholder (Local Images)
```tsx
import heroImage from '@/public/hero.jpg'

<Image
  src={heroImage}
  alt="Hero"
  placeholder="blur" // Uses imported image's blur data
/>
```

### Blur Placeholder (Remote Images)
```tsx
// Option 1: Generate at build time
import { getPlaiceholder } from 'plaiceholder'

async function getBlurDataURL(src: string) {
  const buffer = await fetch(src).then((res) => res.arrayBuffer())
  const { base64 } = await getPlaiceholder(Buffer.from(buffer))
  return base64
}

// Option 2: Use a static blur
<Image
  src={remoteUrl}
  alt="Remote image"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBD..." // 10x10 base64
/>

// Option 3: Shimmer placeholder
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="0%" />
      <stop stop-color="#edeef1" offset="50%" />
      <stop stop-color="#f6f7f8" offset="100%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect width="${w}" height="${h}" fill="url(#g)">
    <animate attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite" />
  </rect>
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

<Image
  src={src}
  alt={alt}
  width={700}
  height={475}
  placeholder="blur"
  blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
/>
```

### Skeleton Placeholder
```tsx
'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

function ImageWithSkeleton({ src, alt, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="relative">
      {!isLoaded && (
        <Skeleton className="absolute inset-0" />
      )}
      <Image
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={isLoaded ? 'opacity-100' : 'opacity-0'}
        {...props}
      />
    </div>
  )
}
```

## Image Gallery Patterns

### Lazy Loading Gallery
```tsx
function Gallery({ images }: { images: ImageType[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div key={image.id} className="relative aspect-square">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading={index < 4 ? 'eager' : 'lazy'} // First 4 eager
          />
        </div>
      ))}
    </div>
  )
}
```

### Lightbox Gallery
```tsx
'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'

function LightboxGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image.src)}
            className="relative aspect-square overflow-hidden rounded-lg"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover hover:scale-105 transition-transform"
              sizes="33vw"
            />
          </button>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          {selectedImage && (
            <div className="relative aspect-video">
              <Image
                src={selectedImage}
                alt="Full size image"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
```

## Avatar/Profile Images

```tsx
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface AvatarProps {
  src?: string | null
  alt: string
  size?: 'sm' | 'md' | 'lg'
  fallback?: string
}

const sizes = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-16 w-16',
}

const dimensions = {
  sm: 32,
  md: 40,
  lg: 64,
}

export function Avatar({ src, alt, size = 'md', fallback }: AvatarProps) {
  if (!src) {
    return (
      <div className={cn(
        'rounded-full bg-muted flex items-center justify-center',
        sizes[size]
      )}>
        <span className="text-muted-foreground font-medium">
          {fallback || alt.charAt(0).toUpperCase()}
        </span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={dimensions[size]}
      height={dimensions[size]}
      className={cn('rounded-full object-cover', sizes[size])}
    />
  )
}
```

## Background Images

```tsx
// Option 1: CSS background (no optimization)
<div
  className="bg-cover bg-center"
  style={{ backgroundImage: `url(${src})` }}
/>

// Option 2: Next.js Image with fill (optimized)
<div className="relative h-screen">
  <Image
    src="/hero-bg.jpg"
    alt=""
    fill
    className="object-cover -z-10"
    priority
  />
  <div className="relative z-10">
    {/* Content */}
  </div>
</div>

// Option 3: Gradient overlay
<div className="relative h-96">
  <Image
    src="/hero.jpg"
    alt=""
    fill
    className="object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
  <div className="relative z-10 h-full flex items-end p-8">
    <h1 className="text-white text-4xl font-bold">Title</h1>
  </div>
</div>
```

## SVG Handling

```tsx
// Option 1: Import as component (for small, interactive SVGs)
import Logo from '@/public/logo.svg'

<Logo className="h-8 w-auto" />

// Option 2: Next.js Image (for larger SVGs)
<Image
  src="/illustration.svg"
  alt="Illustration"
  width={400}
  height={300}
/>

// Option 3: Inline for icons
function Icon({ className }: { className?: string }) {
  return (
    <svg
      className={cn('h-4 w-4', className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}
```

## Image Formats

| Format | Use Case |
|--------|----------|
| WebP | Default for photos (auto-converted by Next.js) |
| AVIF | Better compression, newer browsers |
| PNG | Transparency needed, simple graphics |
| SVG | Icons, logos, illustrations |
| JPEG | Fallback for older browsers |

```js
// next.config.js - Enable AVIF
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}
```

## Performance Checklist

- [ ] Hero/LCP images have `priority` prop
- [ ] All images have `alt` text
- [ ] `sizes` prop is accurate for responsive images
- [ ] Remote domains configured in next.config.js
- [ ] Placeholders used for better UX
- [ ] Images are appropriately sized (not oversized)
- [ ] Lazy loading enabled for below-fold images
- [ ] AVIF/WebP formats enabled

## Common Mistakes

```tsx
// BAD - Missing sizes (downloads full image)
<Image src={src} alt={alt} fill />

// GOOD - Proper sizes for layout
<Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" />

// BAD - Using regular img
<img src="/hero.jpg" alt="Hero" />

// GOOD - Using Next.js Image
<Image src="/hero.jpg" alt="Hero" width={1200} height={600} />

// BAD - All images eager loaded
images.map(img => <Image {...img} loading="eager" />)

// GOOD - Only first few eager
images.map((img, i) => <Image {...img} loading={i < 4 ? 'eager' : 'lazy'} />)

// BAD - No placeholder for slow connections
<Image src={remoteSrc} alt={alt} width={800} height={600} />

// GOOD - Blur placeholder
<Image src={remoteSrc} alt={alt} width={800} height={600} placeholder="blur" blurDataURL={blurData} />
```
