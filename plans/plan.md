Daniel de Sousa - Professional Football Coach Portfolio Website
Implementation Plan
Project Summary
Creating a modern, vibrant portfolio website for Daniel de Sousa, an experienced UEFA B football coach with 10+ years of experience coaching youth football in Portugal and China. The website will showcase professional experience, coaching philosophy, and offer consulting services with AI-powered features.

Tech Stack:

Next.js 15+ (from FE-NEXTJS boilerplate)
React 19 with Server Components
Tailwind CSS + shadcn/ui
TypeScript
Vercel (hosting) + GitHub (version control)
AI Features: Chatbot + Interactive Tactical Analysis
Target URL: danieldesousa.com (or similar domain to be purchased)
Temporary URL: danieldesousa.vercel.app

Website Structure & Pages
1. Home Page (Landing)
Route: /

Sections:

Hero Section

Large header with name "Daniel de Sousa"
Tagline: "UEFA B Football Coach | Youth Development Specialist | 10+ Years Experience Portugal & China"
Featured coaching image (the tactical board photo provided)
CTA buttons: "View Services" | "Contact Me"
Vibrant gradient background (football/AI themed - greens, blues, purples)
About Preview

Brief introduction (2-3 sentences)
Key stats in cards:
"10+ Years Experience"
"Portugal & China"
"U4 to U18 Development"
"UEFA B Certified"
Link to full about page
Services Preview

3-4 service cards with icons
Links to services page
Coaching Philosophy Preview

Brief philosophy statement
Visual representation of preferred tactical systems
Link to full philosophy page
Media Gallery

Rotating showcase of coaching photos from China
Team photos, training sessions, tactical board work
Training exercise videos (embedded or linked)
Video player with playlists by category
Contact CTA

Simple form or direct contact buttons
WhatsApp + Email quick links
Credentials Section

Reference letters display
Downloadable PDFs or image gallery
Testimonials from clubs/schools
2. About Page
Route: /about

Sections:

Professional Journey

Timeline/chronological layout
All positions with dates, locations, achievements
Visual map showing Portugal → China journey
Image gallery integrated with timeline
Education & Certifications

UEFA B (working towards UEFA A)
Master's Degree details
Exchange programs (Poland, Germany)
Continuous learning/courses
Languages

Visual representation of language proficiency
Portuguese (Native), English (Proficient), Spanish (Proficient), French (Basic), Chinese (Basic)
Soft Skills

Leadership, Critical Thinking, Collaboration, Decision Making, Flexibility, Active Listening
Visual cards or badges
3. Coaching Philosophy Page
Route: /philosophy

Sections:

Core Philosophy Statement

Full coaching philosophy text (from provided content)
"Intelligence, Intensity, Intention"
Principles: Positional Play, Compactness, Transition Efficiency
Tactical Systems (Interactive)

Visual representations of preferred formations:
1-4-3-3
1-4-4-2
1-4-2-3-1
AI Feature: Interactive tactical board
Users can click formations to see positioning
Animated player movements
Explanation of each system's principles
Player Profiles by Position

Detailed breakdown of ideal player characteristics per position
Could be interactive tabs/accordion
Coaching Approach

Methodology details
Training session philosophy
Player development focus
Game Moments

Offensive Organization
Defensive Organization
Offensive Transition
Defensive Transition
Set Pieces
4. Experience/Career Page
Route: /experience

Sections:

Full Professional Timeline

Detailed view with rich cards
Each position with:
Club name, location, dates
Role and responsibilities
Key achievements
Team photos if available
Timeline Structure:

Middle School no.2, Tongling, China (2022-2024) - Coordinator/Head Coach
Chizhou City Team (2024) - Head Coach U15
Tongling City Team (2022) - Head Coach U15
Tagou Shaolin Wushu School (2021) - Head Coach/Assistant
Dalian Zichun FC (2020) - Head Coach U6-U15
Sport Lisboa e Benfica (2018-2019) - Assistant Coach U13
CD Trofense (2014-2018) - Head Coach/Assistant multiple age groups
UD Lavrense (2010-2011) - Assistant Coach U13
China Experience Highlight

Dedicated section showcasing China coaching journey
Cultural adaptation story
Photos from different cities/clubs
Map of China showing locations
Notable Players/Achievements

Players who reached Portuguese national youth teams
Championship Title: U15 Women's Team, Tongling School - City Championship Winner (2024)
Division Promotion: CD Trofense Juniors promoted to National Division (Assistant Coach)
Tournament successes
Development success stories
Additional achievements (to be added)
5. Services Page
Route: /services

Sections:

Service Offerings (detailed cards)

Game Analysis

Pre-match analysis
Post-match analysis
Opposition scouting
Video analysis breakdowns
Scouting Consultancy

Player evaluation
Talent identification
Scouting database access
Recruitment consultation
Leadership Courses

Team leadership development
Coaching staff training
Captain/leadership programs for players
Personalized Training

Individual player development plans
Position-specific training
Tactical training sessions
Technical skill development
Seminars & Webinars

Coaching methodology seminars
Tactical analysis workshops
Youth development topics
Online webinars
Pricing Information

"Valores podem ser discutidos, dependendo do tempo de viagem, localização e tipo de forum a designar"
Contact form for custom quotes
Booking/Contact CTA

Prominent call-to-action to contact for services
6. Contact Page
Route: /contact

Sections:

Contact Information

Email: danieldesousa05@gmail.com (with copy button)
WhatsApp: +351 913350837 (with click-to-chat button)
Location: Portugal, Porto
Contact Form

Name, Email, Phone (optional)
Service Interest (dropdown)
Message
Preferred contact method
Form validation with Zod
react-hook-form implementation
Availability Statement

Open to partnerships
International opportunities
Speaking engagements
Consulting projects
Social Media Links (to be added later)

LinkedIn (future)
Twitter/X (future)
Instagram (future)
YouTube (future - for training videos)
AI-Powered Features
1. AI Chatbot
Implementation:

Floating chat widget (bottom-right corner)
Available on all pages
Powered by AI (could use Vercel AI SDK + OpenAI/Anthropic)
Capabilities:

Answer questions about services
Provide information about coaching philosophy
Explain tactical systems
Schedule consultation requests
Navigate users to relevant pages
Tone: Formal and professional

Technical:

Use ai package from Vercel
Streaming responses
Context aware (knows page content)
Can reference coaching philosophy, experience, services
2. Interactive Tactical Analysis
Implementation:

Football pitch visualization component
Interactive formation builder
Player positioning animator
Features:

Formation Visualizer

Click to switch between 4-3-3, 4-4-2, 4-2-3-1
Animated transitions between formations
Player roles explained on hover
Game Moment Simulator

Select game moment (offensive org, defensive org, transitions)
Visual animation showing player movements
Tactical principles highlighted
Custom Tactical Board

Users can draw their own tactics
AI provides feedback on formation
Suggests improvements based on Daniel's philosophy
Technical:

Canvas or SVG-based pitch
Framer Motion for animations
Could integrate simple AI to analyze user-drawn tactics
Design System
Color Palette (Vibrant + Futuristic + Football + AI)
Primary Colors:

Football Green: #00D66C (vibrant grass green)
AI Blue: #0066FF (electric blue)
Tech Purple: #8B5CF6 (futuristic purple)
Energy Orange: #FF6B35 (warm accent)
Neutrals:

Background: #0A0E1A (dark navy - dark mode)
Surface: #1A1F2E (card backgrounds)
Text: #F8FAFC (off-white)
Muted: #64748B (gray)
Gradients:

Hero gradient: Green → Blue → Purple
Section accents: Subtle purple/blue gradients
Button hovers: Vibrant color shifts
Typography
Headings: Bold, modern sans-serif (Inter or Poppins)
Body: Clean, readable (Inter)
Accent: Futuristic tech font for AI features
Component Style
Cards: Glass-morphism effect (semi-transparent with blur)
Buttons: Vibrant gradients with hover animations
Borders: Subtle glows (AI theme)
Icons: Lucide React icons with football/tech themes
Animations: Smooth, energetic (scroll reveals, hover effects)
Layout
Hero: Full viewport height with parallax effect
Sections: Alternating backgrounds for visual interest
Grid: Responsive grid for services, skills, timeline
Spacing: Generous whitespace for modern feel
Technical Implementation Details
Project Setup

# From c:\Work
cd claude-code-boilerplates
# Use /mvp skill to create project
# OR manually copy:
cp -r FE-NEXTJS/. ../danieldesousa-portfolio/
cd ../danieldesousa-portfolio
npm install
Required shadcn/ui Components

npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add badge
npx shadcn@latest add tabs
npx shadcn@latest add dialog
npx shadcn@latest add form
npx shadcn@latest add avatar
npx shadcn@latest add separator
npx shadcn@latest add carousel
npx shadcn@latest add accordion
npx shadcn@latest add timeline
Additional Dependencies

npm install ai @ai-sdk/openai  # For AI chatbot
npm install framer-motion      # Already in boilerplate
npm install react-hook-form zod @hookform/resolvers  # Already in boilerplate
npm install date-fns           # For timeline dates
Page Structure

app/
├── (marketing)/
│   ├── page.tsx              # Home page
│   ├── about/page.tsx        # About
│   ├── philosophy/page.tsx   # Coaching philosophy
│   ├── experience/page.tsx   # Career timeline
│   ├── services/page.tsx     # Services
│   ├── contact/page.tsx      # Contact
│   └── layout.tsx            # Marketing layout (header/footer)
├── api/
│   ├── chat/route.ts         # AI chatbot endpoint
│   └── contact/route.ts      # Contact form submission
├── layout.tsx                # Root layout
└── globals.css               # Custom color variables

components/
├── ui/                       # shadcn/ui components
├── layout/
│   ├── header.tsx            # Navigation header
│   ├── footer.tsx            # Footer with contact info
│   └── chat-widget.tsx       # AI chatbot widget
├── home/
│   ├── hero-section.tsx
│   ├── about-preview.tsx
│   ├── services-preview.tsx
│   └── image-carousel.tsx
├── about/
│   ├── timeline.tsx
│   ├── education-section.tsx
│   └── skills-grid.tsx
├── philosophy/
│   ├── formation-visualizer.tsx  # Interactive tactical board
│   ├── game-moments.tsx
│   └── player-profiles.tsx
├── experience/
│   ├── career-timeline.tsx
│   └── china-highlight.tsx
├── services/
│   ├── service-card.tsx
│   └── service-grid.tsx
└── contact/
    └── contact-form.tsx

lib/
├── utils.ts                  # cn() utility
├── coaching-data.ts          # All coaching data (experience, philosophy, etc)
└── ai/
    └── chat-config.ts        # AI chatbot configuration
Key Custom Components
1. Formation Visualizer Component

// components/philosophy/formation-visualizer.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

// Interactive football pitch with clickable formations
// Shows 4-3-3, 4-4-2, 4-2-3-1
// Animated player position transitions
2. AI Chatbot Widget

// components/layout/chat-widget.tsx
'use client'

import { useChat } from 'ai/react'

// Floating chat button
// Expandable chat interface
// Streaming AI responses
// Context-aware of current page
3. Career Timeline

// components/experience/career-timeline.tsx

// Vertical timeline with alternating sides
// Each position as a card with image
// Hover effects showing details
// Scroll animations
4. Contact Form

// components/contact/contact-form.tsx

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// Form validation
// Service selection dropdown
// Email/WhatsApp preference
// Success/error states
Data Structure
Coaching Data File

// lib/coaching-data.ts

export const coachInfo = {
  name: "Daniel de Sousa",
  title: "Professional Football Coach",
  subtitle: "UEFA B | Youth Development Specialist",
  location: "Porto, Portugal",
  contact: {
    email: "danieldesousa05@gmail.com",
    whatsapp: "+351 913350837",
  },
  bio: `Experienced Football Coach and PE Teacher with over 10 years...`,
  stats: [
    { label: "Years Experience", value: "10+" },
    { label: "Countries", value: "Portugal & China" },
    { label: "Age Groups", value: "U4 to U18" },
    { label: "Certification", value: "UEFA B" },
  ],
}

export const experience = [
  {
    id: 1,
    role: "Coordinator Football Department / Head Coach / PE Teacher",
    ageGroup: "U15",
    club: "Middle School no.2",
    location: "Tongling, China",
    startDate: "2022-09",
    endDate: "2024-07",
    description: "",
    achievements: [],
    images: ["china-1.jpg", "china-2.jpg"],
  },
  // ... rest of experience
]

export const formations = [
  {
    name: "1-4-3-3",
    description: "Attacking formation with width and forward pressure",
    positions: [
      { x: 50, y: 10, position: "GK", number: 1 },
      { x: 20, y: 30, position: "LB", number: 3 },
      // ... all positions
    ],
    principles: [
      "Wide wingers provide width",
      "Midfield triangle controls center",
      "High pressing from forwards"
    ]
  },
  // ... other formations
]

export const services = [
  {
    id: "game-analysis",
    title: "Game Analysis",
    description: "Pre-match and post-match analysis, opposition scouting",
    icon: "BarChart3",
    features: [
      "Pre-match tactical analysis",
      "Post-match performance review",
      "Opposition scouting reports",
      "Video analysis breakdowns"
    ],
  },
  // ... other services
]

export const philosophy = {
  core: "Developing players to perform within a clear and common idea...",
  principles: [
    {
      title: "Positional Play in Attack",
      description: "Occupying and creating space...",
      keyPoints: ["Width and depth", "Constant support", "Space creation"]
    },
    // ... other principles
  ],
  approach: "I lead training sessions with clarity, energy...",
}
Deployment & Hosting
GitHub Repository

# Initialize git
git init
git add .
git commit -m "Initial commit: Daniel de Sousa Portfolio"

# Create GitHub repo (via gh CLI or web)
gh repo create danieldesousa-portfolio --public --source=. --remote=origin
git push -u origin main
Vercel Deployment

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to GitHub repo
# - Configure project settings
# - Deploy

# Custom domain (after purchase)
vercel domains add danieldesousa.com
Environment Variables (if needed for AI features)

OPENAI_API_KEY=sk-...
NEXT_PUBLIC_SITE_URL=https://danieldesousa.vercel.app
SEO & Metadata
Homepage Metadata

// app/page.tsx

export const metadata = {
  title: "Daniel de Sousa | Professional Football Coach",
  description: "UEFA B Football Coach with 10+ years experience in Portugal and China. Youth development specialist offering game analysis, scouting, and coaching consultancy.",
  keywords: [
    // Portuguese keywords
    "treino de futebol",
    "exercícios de futebol",
    "exercicios sub 13",
    "sub 15",
    "principios futebol",
    "sistema tatico",
    "analise de jogo",
    // English keywords
    "football coaching drills",
    "scouting",
    "tactical analyst",
    // General
    "football coach",
    "soccer coach",
    "UEFA B",
    "youth development",
    "Portugal",
    "China",
    "coaching consultancy",
  ],
  openGraph: {
    title: "Daniel de Sousa | Professional Football Coach",
    description: "UEFA B Football Coach specializing in youth development",
    images: ["/og-image.jpg"],
  },
}
Structured Data (JSON-LD)

// Person schema for SEO
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Daniel de Sousa",
  "jobTitle": "Football Coach",
  "description": "UEFA B certified football coach",
  "email": "danieldesousa05@gmail.com",
  "telephone": "+351913350837",
  "url": "https://danieldesousa.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Porto",
    "addressCountry": "Portugal"
  }
}
Image Optimization
Photo Processing
Provided images need optimization for web
Convert to WebP format for better performance
Create multiple sizes for responsive images
Use Next.js Image component for automatic optimization
Image Structure

public/
├── images/
│   ├── hero/
│   │   └── tactical-board.jpg  # Main hero image
│   ├── china/
│   │   ├── china-1.jpg         # Team photo
│   │   ├── china-2.jpg         # Tactical session
│   │   ├── china-3.jpg         # Group session
│   │   └── ...
│   ├── portugal/
│   │   └── team-photo.jpg      # Early career
│   └── profile/
│       └── profile.jpg         # Profile photo
└── og-image.jpg                # Social sharing image
Testing & Quality Assurance
Pre-Launch Checklist
 All pages render correctly
 Responsive on mobile, tablet, desktop
 Dark mode works on all components
 Forms validate correctly
 Contact form sends emails
 AI chatbot responds appropriately
 Tactical visualizer animates smoothly
 Images optimized and loading fast
 SEO metadata on all pages
 No TypeScript errors (npm run typecheck)
 No linting errors (npm run lint)
 Build succeeds (npm run build)
 Performance score >90 (Lighthouse)
 Accessibility score >90 (Lighthouse)
Performance Targets
First Contentful Paint < 1.5s
Largest Contentful Paint < 2.5s
Time to Interactive < 3.5s
Cumulative Layout Shift < 0.1
Content Strategy
Written Content Needed
 Hero tagline/subtitle (concise, impactful)
 About page intro (2-3 paragraphs)
 Each service description (detailed)
 Philosophy statement (already provided)
 Experience descriptions for each role
 Testimonials (if available)
 FAQ section (optional but recommended)
Visual Content Checklist
 Professional headshot/profile photo
 Tactical board photo (provided) ✓
 China coaching photos (provided) ✓
 Portugal coaching photos (provided) ✓
 Team photos (provided) ✓
 Training exercise videos (provided) ✓
 Reference letters (provided) ✓
 Training session photos
 Certificates/credentials (optional)
 Infographics for stats/achievements
Future Enhancements (Phase 2)
Additional Features to Consider
Blog/Resources Section

Coaching articles
Tactical analysis posts
Training session ideas
Youth development tips
Video Content

Training session highlights ✓ (videos available)
Training exercise demonstrations ✓ (videos available)
Tactical explanation videos (future)
Player testimonials (future)
Coaching philosophy video (future)
Client Portal (if offering ongoing services)

Login area for clients
Session plans
Progress tracking
Video analysis sharing
Booking System

Calendar integration
Online consultation scheduling
Payment processing
Multilingual Support

Portuguese (primary)
English
Spanish
Chinese (simplified)
Enhanced AI Features

AI-powered player development plans
Automated tactical analysis tool
Custom training session generator
Critical Files to Create/Modify
New Files to Create
app/(marketing)/page.tsx - Home page
app/(marketing)/about/page.tsx - About page
app/(marketing)/philosophy/page.tsx - Philosophy page
app/(marketing)/experience/page.tsx - Experience page
app/(marketing)/services/page.tsx - Services page
app/(marketing)/contact/page.tsx - Contact page
app/(marketing)/layout.tsx - Marketing layout with header/footer
components/layout/header.tsx - Navigation header
components/layout/footer.tsx - Footer
components/layout/chat-widget.tsx - AI chatbot
components/philosophy/formation-visualizer.tsx - Interactive tactics
lib/coaching-data.ts - All content data
app/api/chat/route.ts - AI chatbot endpoint
app/api/contact/route.ts - Contact form endpoint
Files to Modify
app/globals.css - Add custom color variables
tailwind.config.ts - Extend theme with custom colors
app/layout.tsx - Update metadata
CLAUDE.md - Add Vercel + GitHub hosting note
Configuration Updates
Update package.json with project details
Create vercel.json for deployment config
Add environment variables for AI features
Implementation Phases
Phase 1: Foundation (Week 1)
Set up project from boilerplate
Install required dependencies
Configure Tailwind colors/theme
Create data structure (coaching-data.ts)
Build layout components (header, footer)
Create home page with hero section
Phase 2: Core Pages (Week 1-2)
About page with timeline
Philosophy page (without AI features yet)
Services page with service cards
Contact page with form
Phase 3: Interactive Features (Week 2)
Formation visualizer component
Smooth scroll animations
Image carousel/gallery
Form validation and submission
Phase 4: AI Features (Week 3)
AI chatbot integration
Interactive tactical analysis
Chatbot training with coaching content
Phase 5: Polish & Deploy (Week 3)
Image optimization
SEO metadata
Performance optimization
Testing on all devices
Deploy to Vercel
Connect custom domain
Success Metrics
Website Goals
Professional online presence
Showcase expertise and experience
Generate consultation inquiries
Attract coaching opportunities
Demonstrate modern approach (AI features)
Key Performance Indicators
Monthly visitors
Contact form submissions
WhatsApp/email inquiries
Time on site
Pages per session
AI chatbot engagement rate
Maintenance & Updates
Regular Updates Needed
Add new coaching positions/experience
Update certifications (when UEFA A obtained)
Add new photos/achievements
Blog posts (if implemented)
Service offerings adjustments
Testimonials from clients
Technical Maintenance
Update dependencies monthly
Monitor Vercel analytics
Check broken links
Optimize images as needed
Review and respond to chatbot conversations
Budget Considerations
Costs
Domain: €10-15/year (danieldesousa.com or .pt)
Hosting: FREE (Vercel free tier sufficient)
AI Chatbot: ~€20-50/month (OpenAI API - depends on usage)
Email: FREE (can use Gmail)
Cost Optimization
Start with Vercel free tier (plenty for portfolio site)
Use AI chatbot sparingly initially (can limit requests)
Optimize images to reduce bandwidth
Consider free alternatives for chatbot (open-source models)
Verification & Testing Plan
After implementation, verify:

Functionality Tests


npm run typecheck  # No TypeScript errors
npm run lint       # No linting errors
npm run build      # Build succeeds
npm run test       # All tests pass
Manual Testing

Test all navigation links
Submit contact form
Test AI chatbot conversations
Interact with tactical visualizer
Test on mobile device
Test on tablet
Test in different browsers (Chrome, Safari, Firefox)
Performance Testing

Run Lighthouse audit
Check page load speeds
Verify images load correctly
Test with slow 3G connection
Accessibility Testing

Test with screen reader
Test keyboard navigation
Check color contrast
Verify alt text on images
SEO Testing

Verify meta tags
Check structured data
Test social sharing previews
Submit sitemap to Google
Contact & Support Information
Developer Support:

Claude Code Agent SDK
Vercel documentation
Next.js documentation
shadcn/ui component library
For Daniel:

Update content via data files in lib/coaching-data.ts
Add images to public/images/
For major changes, contact developer or use Claude Code
FASE 3 — REDESIGN DO HERO (Pedido Recente)
O Que Muda
Foto de Daniel no hero — usar a foto solo (Daniel + quadro táctico). O fundo/atletas devem estar borrados. Efeito cinematográfico. A foto já tem estádio e campo verde no fundo naturalmente.
Background estádio/campo AI — usar a foto como base. Aplicar overlays AI (glow azul/verde/roxo) e efeitos de luz do estádio.
Texto redesignado — remover a tagline longa. Substituir por badges compactos:
"UEFA B Football Coach" numa barra/badge lateral proeminente
Age groups numa row: U4, U6, U8, U11, U13, U15, U17, U18, Senior, Pro, Walking Football
Layout compacto e visual
Ficheiros a Modificar
public/images/hero/daniel-hero.jpg
Copiar a foto (solo com quadro táctico) para esta pasta
A foto YÁ tem: campo verde, estádio com estrutura metálica, Daniel no centro
components/home/hero-section.tsx — Reescrever
Layout Desktop: Split hero


┌──────────────────────────────────────────────┐
│ [UEFA B]  Daniel de Sousa     [FOTO DANIEL   │
│  badge     (título grande)     com campo +   │
│ vertical                       estádio no    │
│            Football Coach      fundo blurred]│
│            (subtítulo)                       │
│                                              │
│            [U4][U6][U8][U11][U13][U15]...    │
│            [Portugal][China][10+ Years]      │
│            [View Services][Get in Touch]     │
│──────────────── stats strip ─────────────────│
│  10+ Years │ Portugal & China │ U4-U18 │...  │
└──────────────────────────────────────────────┘
Layout Mobile: Stack — foto no topo com overlay dark, texto em baixo

Técnica CSS para a foto
Foto como background (object-fit: cover) num div grande (lado direito)
Aplicar filter: blur(6px) no container da imagem inteira
Sobrepor um div sem blur com clip-path ou máscara circular para manter Daniel em foco no centro
Gradiente radial escuro: mais escuro nas bordas, mais transparente no centro
AI glow orbs (circles com blur e cores vibrantes) sobrepostas
O texto à esquerda usa backdrop-filter: blur() para legibilidade
lib/coaching-data.ts — Adicionar dados badges

export const heroBadges = {
  ageGroups: ["U4", "U6", "U8", "U11", "U13", "U15", "U17", "U18"],
  locations: ["Portugal", "China"],
  experience: "10+ Years",
  certification: "UEFA B Football Coach",
};
Verificação

npm run build  # compilar sem erros
npm run dev    # ver no localhost:3000
Foto de Daniel visível (desktop + mobile)
Badges age groups compactos
"UEFA B Football Coach" em badge proeminente
Background com feel estádio/campo AI
Texto legível sobre a foto
FASE 4 — NOVOS REQUISITOS (Batch 2)
1. Age Groups — Todas as Idades
Remover badges U-específicos. Substituir por range completo:

U4, U6, U8, U11, U13, U15, U17, U18, Senior, Pro, Walking Football
lib/coaching-data.ts → heroBadges.ageGroups actualizar
2. Social Media — Twitter + LinkedIn
Adicionar Twitter e LinkedIn ao socialMedia em coaching-data.ts
Twitter/X: https://x.com/DanieldeSousa05
LinkedIn: https://www.linkedin.com/in/daniel-de-sousa-56984a102/
Adicionar ícones (Twitter, LinkedIn) no footer e contact page
Ficheiros: lib/coaching-data.ts, components/layout/footer.tsx, app/contact/page.tsx
3. Wallpapers com Parallax em Todas as Páginas
Cada página deve ter um background esportivo/futebol com efeito parallax no scroll:

Home: Estádio (já no hero via foto)
About: Campo de futebol aéreo
Philosophy: Plano táctico / campo verde abstracto
Experience: Estádio nocturno com luzes
Services: Atletas em acção
Contact: Campo verde minimalista
Software: Tech/AI visuals
Implementação:

Criar um componente reutilizável PageBackground que recebe uma URL de imagem
Usar CSS background-attachment: fixed para parallax nativo (simples e performante)
Aplicar overlay escuro/transparente para texto legível
Imagens: usar Unsplash URLs públicas (sem copyright) para placeholder até Daniel fornecer fotos reais
4. i18n — Detecção Automática de Idioma
Idiomas: PT, EN, FR, ES, ZH (Chinês)

Implementação com next-intl:


npm install next-intl
Estrutura:


messages/
├── en.json    # English (default)
├── pt.json    # Portuguese
├── fr.json    # French
├── es.json    # Spanish
└── zh.json    # Chinese
Detecção automática via Accept-Language header do browser
Toggle de idioma no header (dropdown com bandeiras)
Todas as strings do website devem usar i18n keys
Ficheiros a criar/modificar:
middleware.ts — detecção de idioma
i18n.ts — configuração
messages/*.json — traduções
app/[locale]/layout.tsx — layout com locale
next.config.ts — configurar i18n
TODOS os componentes — usar useTranslations()
5. Light Mode + Dark Mode Toggle
Adicionar variáveis CSS para light mode em globals.css (:root sem .dark)
Criar componente ThemeToggle (sun/moon icon)
Colocar no header junto à language switcher
Usar next-themes library:

npm install next-themes
Respeitar prefers-color-scheme do sistema
Ficheiros:
components/layout/theme-toggle.tsx
components/layout/header.tsx — adicionar toggle
app/layout.tsx — ThemeProvider
app/globals.css — light mode variables
6. Logo → Placeholder para Assinatura
Manter "DS" por enquanto no logo
Adicionar um comentário no código indicando que deve ser substituído pela assinatura
Quando Daniel fornecer a imagem da assinatura: substituir por <img src="/images/signature.png">
Ficheiro: components/layout/header.tsx
7. Corrigir Formação 1-4-3-3
Problema actual: CDM está à frente dos CMs (y mais alto = mais perto do ataque).
Correcto: CDM atrás (y mais baixo = mais perto da defesa), 2 CMs à frente dele.

Corrigir em lib/coaching-data.ts → formations[0].positions:


// Actual (errado):
{ x: 35, y: 45, position: "CM", number: 8 },   // CM esquerda
{ x: 50, y: 50, position: "CDM", number: 6 },  // CDM (mais para frente!)
{ x: 65, y: 45, position: "CM", number: 10 },  // CM direita

// Correcto:
{ x: 50, y: 40, position: "CDM", number: 6, name: "Defensive Midfielder" },  // CDM ATRÁS
{ x: 35, y: 52, position: "CM", number: 8, name: "Central Midfielder (L)" }, // CM à frente
{ x: 65, y: 52, position: "CM", number: 10, name: "Central Midfielder (R)" }, // CM à frente
8. Remover Labels de Tipo nas Formações
Remover: "Offensive", "Balanced", "Modern/Balanced" dos dados e da visualização.

lib/coaching-data.ts → formations → remover campo type
components/philosophy/formation-preview.tsx → remover o Badge que mostra o tipo
9. Nova Página: Software & Tools
Route: /software

Conteúdo — ferramentas que Daniel usa:

Video Editing: (ferramentas que usa — Daniel confirma depois, usar exemplos comuns: Adobe Premiere, DaVinci Resolve, etc.)
AI Tools: (ferramentas AI que usa — placeholders)
Tactical Analysis Software: (ex: Football Manager, Hudl, etc.)
Scouting Platforms: (ex: Wyscout, FootScout, etc.)
Layout:

Grid de cards por categoria
Cada card: nome da ferramenta, icon, descrição breve, nível de uso
Secção "Como uso AI" — explicação de como usa AI no trabalho
Ficheiros:

app/software/page.tsx
components/software/tool-card.tsx
lib/coaching-data.ts → adicionar softwareTools data
Ficheiros Totais a Modificar/Criar (Fase 4)
Modificar:
lib/coaching-data.ts — age groups, social media, formations fix, remove type, add software data
components/home/hero-section.tsx — badges actualizados
components/layout/header.tsx — theme toggle, language switcher, logo placeholder
components/layout/footer.tsx — social media icons (Twitter, LinkedIn)
components/philosophy/formation-preview.tsx — remover type badges
app/contact/page.tsx — social media links
app/globals.css — light mode variables
app/layout.tsx — ThemeProvider + i18n setup
next.config.ts — i18n config
tailwind.config.ts — light mode colours
Criar:
components/layout/theme-toggle.tsx
components/layout/page-background.tsx — componente reutilizável parallax
components/software/tool-card.tsx
app/software/page.tsx
middleware.ts — i18n language detection
i18n.ts — configuração
messages/en.json, pt.json, fr.json, es.json, zh.json
Instalar:

npm install next-intl next-themes
Verificação Final

npm install
npm run build
npm run dev
Light/dark mode toggle funciona
Idioma detectado automaticamente (testar com Accept-Language)
Formação 1-4-3-3 corrigida (CDM atrás)
Página Software existe e tem conteúdo
Parallax nos backgrounds das páginas
Twitter + LinkedIn no footer
Age groups actualizados
Final Notes
This website will position Daniel as a modern, tech-savvy football coach who embraces innovation (AI features) while maintaining deep expertise in traditional coaching fundamentals. The vibrant design with AI elements will differentiate from typical coach websites while the professional content demonstrates credibility and experience.

The interactive tactical features and AI chatbot will engage visitors and showcase Daniel's forward-thinking approach, while the clear service offerings and easy contact options will generate business opportunities.

Confirmed Information from Daniel
✓ Reference Letters: Available from previous clubs/schools
✓ Video Content: Training exercise videos available
✓ Key Achievements:

U15 Women's Championship Winner (Tongling City, 2024)
CD Trofense Juniors - Division Promotion to National Level (Assistant Coach)
More achievements to be added later
✓ SEO Keywords Confirmed:

Portuguese: treino de futebol, exercícios de futebol, exercicios sub 13, sub 15, principios futebol, sistema tatico, analise de jogo
English: football coaching drills, scouting, tactical analyst
More keywords to be added later
✓ Chatbot Personality: Formal and professional tone

⏳ Pending Information:

Social media platforms (to be created/provided later)
Additional achievements
Additional SEO keywords
Client testimonials (optional)
Total Estimated Development Time: 2-3 weeks for full implementation
Maintenance Effort: 1-2 hours/month for updates
Technical Difficulty: Medium (using boilerplate simplifies significantly)

FASE 5 — HERO IMAGE: FOTO ORIGINAL + EFEITOS CSS
Objectivo
Usar a foto original do Daniel (quadro táctico na China) como imagem central do hero, aplicando efeitos CSS para criar um visual futurista e didáctico.

A Foto Original
Daniel de pé num campo de futebol, segurando um quadro táctico
Fundo: estádio chinês com estrutura metálica + relva verde + atletas/pessoas atrás
Roupa: fato de treino Nike preto, sapatilhas vermelhas
Formato: vertical/portrait
Efeitos CSS a Aplicar
1. Fundo Estádio/Campo AI (Camada Base)
Usar uma imagem de estádio/campo de futebol como background-image fixo
Aplicar filtro blur leve (5-10px) e saturação reduzida
Overlay gradiente: linear-gradient(135deg, rgba(0,102,255,0.2), rgba(0,214,108,0.15), rgba(139,92,246,0.2))
Dar o efeito "AI/futurista"
2. Foto de Daniel (Camada Principal)
A foto colocada como <img> ou background-image central
Aplicar efeito de vinheta/blur nas bordas: mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%)
O fundo da foto (atletas, pessoas) fica naturalmente escurecido/focado menos
Ajustar object-position para centrar Daniel
3. AI Glow Orbs (Camada de Efeitos)
Círculos coloridos com blur-3xl sobrepostos à foto:
Orb azul (ai-blue #0066FF) no canto superior direito
Orb verde (football-green #00D66C) no canto inferior esquerdo
Orb roxo (tech-purple #8B5CF6) subtil atrás
Opacity: 10-20% para não tapar a foto
Position: absolute com z-index abaixo do texto
4. Gradiente de Legibilidade (Texto)
Lado esquerdo (onde está o texto) deve ter overlay escuro
bg-gradient-to-r from-background via-background/80 to-transparent
Garante que o nome "Daniel de Sousa" e badges são legíveis
5. Animações Subtis
Glow orbs com animação lenta de pulse/drift
Foto com ligeiro zoom-in no hover (scale 1.02)
Stats strip com hover effects
Estrutura do Componente

<section className="relative min-h-screen overflow-hidden">
  {/* Camada 1: Background estádio blur + AI overlay */}
  <div className="absolute inset-0">
    <div
      className="absolute inset-0 bg-cover bg-center blur-sm saturate-50"
      style={{ backgroundImage: "url('/images/hero/stadium-bg.jpg')" }}
    />
    <div className="absolute inset-0 bg-gradient-to-br from-ai-blue/20 via-football-green/15 to-tech-purple/20" />
  </div>

  {/* Camada 2: Foto de Daniel com máscara */}
  <div className="absolute inset-0 lg:left-1/3">
    <img
      src="/images/hero/daniel-tactical.jpg"
      className="h-full w-full object-cover object-top"
      style={{
        maskImage: "radial-gradient(ellipse 80% 90% at 60% 40%, black 30%, transparent 70%)"
      }}
    />
  </div>

  {/* Camada 3: AI Glow Orbs */}
  <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-ai-blue/15 blur-3xl" />
  <div className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full bg-football-green/20 blur-3xl" />
  <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-tech-purple/10 blur-3xl" />

  {/* Camada 4: Overlay para texto legível */}
  <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent lg:w-1/2" />

  {/* Camada 5: Texto/Conteúdo */}
  <div className="relative z-10 ...">
    {/* badges, título, CTAs */}
  </div>
</section>
Ficheiros a Modificar
1. Criar pasta e adicionar imagens

public/images/hero/
├── daniel-tactical.jpg    # A foto do Daniel (user fornece)
└── stadium-bg.jpg         # Background estádio (Unsplash placeholder)
2. components/home/hero-section.tsx
Reescrever com a nova estrutura de camadas
Manter os badges e texto actuais
Adicionar a foto como camada central
Adicionar AI glow orbs
Usar CSS mask para efeito vinheta na foto
3. app/globals.css (opcional)
Adicionar classe .hero-photo-mask se necessário
Keyframes para animação dos orbs
Imagens Necessárias
daniel-tactical.jpg — Copiar de C:\Users\danie\Downloads\6.jpg para public/images/hero/daniel-tactical.jpg
stadium-bg.jpg — Placeholder Unsplash: https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1920&q=80
Passos de Implementação

# 1. Criar pasta
mkdir -p public/images/hero

# 2. Copiar foto de Daniel
cp "C:\Users\danie\Downloads\6.jpg" "public/images/hero/daniel-tactical.jpg"

# 3. Editar hero-section.tsx com novo layout

# 4. Build e deploy
npm run build
npx vercel --prod
Verificação

npm run build
npm run dev
Testar:

 Foto de Daniel visível e centrada
 Bordas da foto com efeito blur/vinheta
 Glow orbs visíveis mas não intrusivos
 Texto legível (nome, badges)
 Responsivo em mobile (foto em cima, texto em baixo)
 Performance OK (imagens optimizadas)
Alternativa: Se o User Não Quiser Editar Imagens
Se preferir não ter de guardar a imagem localmente, posso usar um serviço externo:

User faz upload da foto para um serviço (Imgur, Cloudinary, etc.)
Uso o URL directo no código
Mesmos efeitos CSS aplicados
FASE 6 — Aumentar Tamanho do Texto (About Page)
Problema
Os textos nas secções Education & Certifications estão muito pequenos (text-sm = 14px), dificultando a leitura.

Ficheiro a Modificar
components/about/timeline.tsx
Alterações
1. CardDescription (linhas de informação)
Adicionar className="text-base" para sobrepor o default text-sm:

Certifications institution
Academic Background info
Exchange Programs info
2. Parágrafos de Descrição
Alterar text-sm para text-base:

Certifications description
Academic Background description
Exchange Programs description
Resultado
Texto aumenta de 14px (text-sm) para 16px (text-base) — mais legível.

FASE 7 — Actualizar Professional Experience
Alterações
1. Adicionar Gap Year (2024-2026)
Nova entrada no topo da lista de experiências.

2. Actualizar Middle School no.2 Entry
Conteúdo muito mais detalhado com secções:

Football Department Coordination
Head Coach (U15)
Physical Education Teacher
Achievements and Impact
3. Novo componente para experiência detalhada
Criar layout que suporte:

Múltiplas secções com bullet points
Espaço para fotos
Texto legível (text-base mínimo)
Ficheiros a Modificar
lib/coaching-data.ts - nova estrutura de dados
components/experience/career-timeline.tsx - suportar conteúdo detalhado
FASE 8 — Melhorias UX e Visual
Resumo das Alterações
Secções colapsáveis nos cards de experiência (accordion)
Wallpaper da bola em todas as páginas (excepto home)
Youth Development mais visível no box Elite Academies
Championships com layout escalável
1. Accordion para Secções de Experiência
Problema
O card da Middle School no.2 (Tongling) tem 3 secções + achievements que tornam a página muito longa.

Solução
Usar accordion (colapsável) - secções fechadas por defeito, utilizador pode expandir.

Implementação
1.1 Instalar dependência

npm install @radix-ui/react-accordion
1.2 Criar componente accordion
Novo ficheiro: components/ui/accordion.tsx
Baseado no padrão shadcn/ui (similar ao tabs.tsx existente)
1.3 Adicionar animações ao Tailwind
Ficheiro: tailwind.config.ts
Keyframes: accordion-down, accordion-up
1.4 Modificar career-timeline.tsx
Ficheiro: components/experience/career-timeline.tsx
Envolver as secções (Football Dept, Head Coach, PE Teacher) em <Accordion>
Secções fechadas por defeito
Achievements também colapsável
Aplicar a TODOS os cards com achievements para consistência
2. Wallpaper Consistente (green.png)
Estado Actual
Página	Background Actual
Home	Foto AI daniel-ai.png ✓ MANTER
About	green.png local ✓
Experience	Unsplash externo
Services	Unsplash externo
Philosophy	Unsplash externo
Contact	Unsplash externo
Software	Unsplash externo
Solução
Usar /images/backgrounds/green.png + glow orbs em TODAS as páginas excepto Home.

Implementação
2.1 Actualizar PageBackground component
Ficheiro: components/layout/page-background.tsx
Adicionar prop showGlowOrbs
Simplificar overlay para bg-background/70
Adicionar os 3 orbs animados (ai-blue, football-green, tech-purple)
2.2 Actualizar cada página
Mudar de URL Unsplash para /images/backgrounds/green.png:

app/experience/page.tsx
app/services/page.tsx
app/philosophy/page.tsx
app/contact/page.tsx
app/software/page.tsx
app/about/page.tsx (converter para usar PageBackground)
3. Elite Academies + Youth Development
Estado Actual
Box com "Elite Academies" header, 2 clubs, e "Youth Development" como texto pequeno no fundo.

Solução
Tornar "Youth Development" mais visível - box destacado com ícone próprio.

Implementação
Ficheiro: app/experience/page.tsx
Adicionar separador após os clubs
Criar box destacado para "Youth Development" com cor roxa e ícone
4. Championships - Layout Escalável
Estado Actual
Localização "Tongling, China" no fundo do card, separada dos items.

Solução
Incluir localização em CADA item de championship para escalar bem quando adicionar mais.

Implementação
Ficheiro: app/experience/page.tsx
Novo formato:

U15 Female Champion
2023 · Tongling, China

U15 Male Vice-Champion
2023, 2024 · Tongling, China
Container com scroll se necessário (max-h-[200px] overflow-y-auto)
Ficheiros a Modificar
Ficheiro	Alteração
package.json	Adicionar @radix-ui/react-accordion
components/ui/accordion.tsx	NOVO - componente accordion
tailwind.config.ts	Animações accordion
components/layout/page-background.tsx	Prop showGlowOrbs
components/experience/career-timeline.tsx	Accordion nas secções
app/experience/page.tsx	Background + Elite Academies + Championships
app/services/page.tsx	Background green.png
app/philosophy/page.tsx	Background green.png
app/contact/page.tsx	Background green.png
app/software/page.tsx	Background green.png
app/about/page.tsx	Usar PageBackground component
Verificação

npm install
npm run build
npx vercel --prod --yes
Testar:

 Accordions expandem/colapsam na página Experience
 Todas as páginas (excepto home) mostram green.png com glow orbs
 Home mantém foto AI
 Youth Development visível no box Elite Academies
 Championships alinhados correctamente com localização em cada item
FASE 9 — SISTEMA i18n COMPLETO (Sessão Fevereiro 2026)
Contexto
O sistema i18n estava parcialmente implementado - apenas os títulos das secções traduziam, mas o conteúdo detalhado (descrições, certificações, experiências, ferramentas, etc.) permanecia em inglês independentemente do idioma selecionado.

O Que Foi Feito
1. Ficheiros de Tradução Completos (messages/*.json)
Todas as 5 línguas (en, pt, es, fr, zh) agora têm traduções completas para:

Chaves adicionadas/completadas:


home.hero.roles.scouting/analyst/peTeacher
about.certs.uefaB/ipdj/uefaA (title, institution, description)
about.degrees.masters/computer (title, specialization, institution, description)
about.exchanges.erasmus/impas (program, specialization, description)
experience.jobs.tongling/chizhou/tonglingCity/tagou/dalian/benfica/trofense/lavrense (role, description)
experience.sections.achievements/responsibilities/pressCoverage/readArticle
experience.championships.*
philosophy.formationDescriptions.433/442/4231
software.categories.videoAnalysis/aiProductivity/tacticalScouting/officeCommunication
software.levels.advanced/intermediate/regular/dailyUse
software.tools.premiere/davinci/hudl/chatgpt/copilot/wyscout/fm/office/google (name, description)
software.aiUseCases.trainingPlan/reports/tactical/translation (title, description)
common.ageGroup/period/location
2. Componentes Atualizados
Componente	Ficheiro	O Que Mudou
Hero Section	components/home/hero-section.tsx	Roles agora usam t("home.hero.roles.{key}") em vez de hardcoded
Education Timeline	components/about/timeline.tsx	Certificações, graus e intercâmbios usam chaves de tradução via mapas (certKeyMap, degreeKeyMap, exchangeKeyMap)
Career Timeline	components/experience/career-timeline.tsx	Roles, descrições, "Achievements", "Press Coverage", "Read Article", "Age Group" - tudo traduzido via jobKeyMap
Software Content	components/software/software-content.tsx	Categorias traduzidas via categoryKeyMap, "How I Use AI" usa chaves de tradução
Tool Card	components/software/tool-card.tsx	Nomes, descrições e níveis de ferramentas traduzidos via toolKeyMap e levelKeyMap
Formation Preview	components/philosophy/formation-preview.tsx	Descrições de formações traduzidas via formationKeyMap, "Strengths" -> "Princípios"
Game Moments	components/philosophy/game-moments.tsx	Já usava traduções (não precisou de alteração)
3. Padrão de Mapeamento Utilizado
Para manter a compatibilidade com os dados estáticos em coaching-data.ts, foi usado um padrão de "key mapping":


// Mapa que liga dados estáticos a chaves de tradução
const certKeyMap: Record<string, string> = {
  "UEFA B License": "uefaB",
  "IPDJ Football Coach Level 2": "ipdj",
  "UEFA A License": "uefaA",
};

// Uso no componente:
const certKey = certKeyMap[cert.title] || "uefaB";
<CardTitle>{t(`about.certs.${certKey}.title`)}</CardTitle>
Este padrão é usado em: timeline.tsx, career-timeline.tsx, software-content.tsx, tool-card.tsx, formation-preview.tsx.

Estado Atual do Sistema i18n
Arquitetura
Provider: Custom React Context (components/providers/i18n-provider.tsx)
Hooks: useTranslations(), useI18n(), useLocale()
Fallback: Se tradução não existe na língua atual → fallback para inglês → fallback para a key
Persistência: localStorage via lib/i18n.ts
Deteção: Browser Accept-Language header
Switcher: components/layout/language-switcher.tsx (dropdown com bandeiras)
18 Componentes com Traduções
components/layout/header.tsx
components/layout/footer.tsx
components/home/hero-section.tsx
components/about/about-content.tsx
components/about/timeline.tsx
components/about/skills-grid.tsx
components/experience/experience-content.tsx
components/experience/career-timeline.tsx
components/philosophy/philosophy-content.tsx
components/philosophy/game-moments.tsx
components/philosophy/formation-preview.tsx
components/services/services-content.tsx
components/services/service-card.tsx
components/software/software-content.tsx
components/software/tool-card.tsx
components/contact/contact-content.tsx
components/contact/contact-form.tsx
components/providers/i18n-provider.tsx
O Que Ainda Está em Inglês (Hardcoded)
Baixa Prioridade (aria-labels, metadados):

app/layout.tsx - Page title e meta description
Aria-labels ("Toggle theme", "Close", "Twitter / X", "LinkedIn")
alt text em imagens ("Photo enlarged")
Média Prioridade:

components/home/hero-section.tsx - "Portugal", "China", "10+ Years" nos location tags (linhas 102-110)
components/home/hero-section.tsx - "Portugal & China", "U4 to U18", "UEFA B" nos stats (linhas 138-146)
components/contact/contact-form.tsx - Mensagens de validação Zod hardcoded
components/contact/contact-content.tsx - "Social Media" (linha 107)
Conteúdo em coaching-data.ts (NÃO traduzido):

Secções detalhadas dos jobs (section.title e section.items) - bullets das responsabilidades
Achievements individuais de cada job
Princípios das formações e game moments
Features e deliverables dos serviços
Nomes de posições nos campos táticos
Deploy
URL: https://danieldesousa-portfolio.vercel.app
Último deploy: 6 Fevereiro 2026
Build: npm run build (sucesso) → npx vercel --prod --yes
Ficheiros Chave (Quick Reference)
Ficheiro	Propósito
messages/en.json	Traduções inglês (default)
messages/pt.json	Traduções português
messages/es.json	Traduções espanhol
messages/fr.json	Traduções francês
messages/zh.json	Traduções chinês
components/providers/i18n-provider.tsx	Provider + hooks
lib/i18n.ts	Config + deteção de idioma
components/layout/language-switcher.tsx	Dropdown de idiomas
lib/coaching-data.ts	Dados estáticos (inglês, usado como referência)
