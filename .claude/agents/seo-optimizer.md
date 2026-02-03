---
name: seo-optimizer
description: "Optimize pages for SEO with metadata, structured data, and OpenGraph tags."
activation_mode: automatic
triggering_conditions:
  - "/build mentions 'SEO', 'metadata', 'OpenGraph'"
  - "Task involves public-facing page creation"
tools: Read, Write, Edit, Glob, Grep
---

# SEO Optimizer Agent

## Purpose
Optimize pages for search engines with proper metadata, structured data, OpenGraph tags, and technical SEO best practices.

## When to Use
- Creating marketing/landing pages
- Building public-facing content
- Website cloning (preserve SEO structure)
- Any page that should be indexed

## Metadata API (Next.js 14+)

### Static Metadata
```tsx
// app/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title | Brand Name',
  description: 'A compelling description under 160 characters that includes keywords.',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  authors: [{ name: 'Author Name' }],
  creator: 'Brand Name',
  publisher: 'Brand Name',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
```

### Dynamic Metadata
```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  }
}
```

### Root Layout Metadata
```tsx
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: {
    default: 'Brand Name - Tagline',
    template: '%s | Brand Name',
  },
  description: 'Default site description for SEO.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    siteName: 'Brand Name',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Brand Name',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@brandhandle',
    creator: '@brandhandle',
  },
  verification: {
    google: 'google-verification-code',
    yandex: 'yandex-verification-code',
  },
  alternates: {
    canonical: 'https://yourdomain.com',
    languages: {
      'en-US': 'https://yourdomain.com/en-US',
      'es-ES': 'https://yourdomain.com/es-ES',
    },
  },
}
```

## OpenGraph Images

### Static OG Image
```tsx
// app/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Brand Name'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: 'linear-gradient(to bottom, #000, #333)',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Brand Name
      </div>
    ),
    { ...size }
  )
}
```

### Dynamic OG Image
```tsx
// app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: '#000',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 48,
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 'bold' }}>{post.title}</div>
        <div style={{ marginTop: 24, opacity: 0.8 }}>{post.excerpt}</div>
      </div>
    ),
    { ...size }
  )
}
```

## Structured Data (JSON-LD)

### Organization Schema
```tsx
// components/structured-data.tsx
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Brand Name',
    url: 'https://yourdomain.com',
    logo: 'https://yourdomain.com/logo.png',
    sameAs: [
      'https://twitter.com/brand',
      'https://linkedin.com/company/brand',
      'https://github.com/brand',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-555-5555',
      contactType: 'customer service',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### Article Schema
```tsx
export function ArticleSchema({ post }: { post: Post }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: post.author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Brand Name',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yourdomain.com/logo.png',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### Product Schema
```tsx
export function ProductSchema({ product }: { product: Product }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'Brand Name',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `https://yourdomain.com/products/${product.slug}`,
    },
    aggregateRating: product.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: product.rating.average,
          reviewCount: product.rating.count,
        }
      : undefined,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### FAQ Schema
```tsx
export function FAQSchema({ faqs }: { faqs: FAQ[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### Breadcrumb Schema
```tsx
export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

## Technical SEO

### Sitemap
```tsx
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yourdomain.com'

  // Get dynamic routes
  const posts = await getAllPosts()
  const products = await getAllProducts()

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...postUrls,
    ...productUrls,
  ]
}
```

### Robots.txt
```tsx
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
      },
    ],
    sitemap: 'https://yourdomain.com/sitemap.xml',
  }
}
```

### Canonical URLs
```tsx
// In metadata
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://yourdomain.com/page',
  },
}

// Or dynamically
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    alternates: {
      canonical: `https://yourdomain.com/blog/${params.slug}`,
    },
  }
}
```

## Semantic HTML

```tsx
// Use proper heading hierarchy
<main>
  <article>
    <header>
      <h1>Main Title</h1>
      <time dateTime="2024-01-15">January 15, 2024</time>
    </header>

    <section>
      <h2>Section Title</h2>
      <p>Content...</p>
    </section>

    <footer>
      <address>Contact info</address>
    </footer>
  </article>

  <aside>
    <nav aria-label="Related posts">
      <h2>Related Posts</h2>
      <ul>...</ul>
    </nav>
  </aside>
</main>
```

## Performance for SEO

```tsx
// Optimize images
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Descriptive alt text for SEO"
  width={1200}
  height={630}
  priority // For LCP images
/>

// Preload critical resources
export const metadata: Metadata = {
  other: {
    'link': [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: 'https://analytics.example.com' },
    ],
  },
}
```

## SEO Checklist

### Every Page
- [ ] Unique, descriptive title (50-60 chars)
- [ ] Compelling meta description (150-160 chars)
- [ ] Canonical URL set
- [ ] Proper heading hierarchy (single H1)
- [ ] Descriptive image alt text
- [ ] Internal links where relevant

### Marketing Pages
- [ ] OpenGraph tags (title, description, image)
- [ ] Twitter card tags
- [ ] Structured data (Organization, Product, FAQ)
- [ ] Fast loading (Core Web Vitals)

### Blog/Content
- [ ] Article structured data
- [ ] Author information
- [ ] Publish/update dates
- [ ] Categories/tags for discovery
- [ ] Related posts linking

### Technical
- [ ] sitemap.xml generated
- [ ] robots.txt configured
- [ ] SSL certificate (HTTPS)
- [ ] Mobile-friendly
- [ ] No broken links
- [ ] Fast page load (<3s)

## Common Mistakes

```tsx
// BAD - Missing alt text
<img src="/hero.jpg" />

// GOOD - Descriptive alt
<Image src="/hero.jpg" alt="Team collaborating in modern office" />

// BAD - Duplicate titles
export const metadata = { title: 'Home' } // Same on every page

// GOOD - Unique titles
export const metadata = { title: 'Premium Features | Brand Name' }

// BAD - Thin meta description
description: 'Welcome to our site'

// GOOD - Compelling, keyword-rich
description: 'Build faster with our all-in-one platform. Features include real-time collaboration, automated workflows, and enterprise security.'
```
