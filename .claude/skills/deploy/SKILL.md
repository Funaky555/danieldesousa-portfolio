---
name: deploy
description: "Deploy Next.js application to Vercel or other platforms. Handles environment setup and health checks."
invocable_by: user
disable-model-invocation: true
tools:
  - Bash
  - Read
  - Write
---

# /deploy - Deployment Skill

## Overview

Deploy the Next.js application to production. Supports Vercel (primary), Netlify, and other platforms.

## Usage

```
/deploy [platform] [environment]
```

## Arguments
- `platform` (optional): vercel (default), netlify, docker
- `environment` (optional): production (default), preview, staging

## Deployment Platforms

### Vercel (Recommended)

#### Prerequisites
1. Vercel CLI installed: `npm i -g vercel`
2. Logged in: `vercel login`
3. Project linked: `vercel link`

#### Deployment Steps

**Preview Deployment:**
```bash
vercel
```

**Production Deployment:**
```bash
vercel --prod
```

#### Environment Variables
```bash
# Set env variables
vercel env add NEXT_PUBLIC_API_URL production

# Pull env to local
vercel env pull .env.local
```

### Netlify

#### Prerequisites
1. Netlify CLI: `npm i -g netlify-cli`
2. Logged in: `netlify login`

#### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

#### Deployment
```bash
netlify deploy --prod
```

### Docker

#### Dockerfile
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

#### next.config.js for Docker
```javascript
module.exports = {
  output: 'standalone',
};
```

## Pre-Deployment Checklist

### 1. Code Quality
```bash
npm run typecheck
npm run lint
npm run build
npm run test
```

### 2. Environment Variables
- [ ] All required env vars set in platform
- [ ] No secrets in code
- [ ] NEXT_PUBLIC_ prefix for client-side vars

### 3. Performance
- [ ] Images optimized
- [ ] Bundle size acceptable
- [ ] No console.logs in production

### 4. SEO
- [ ] Meta tags configured
- [ ] robots.txt present
- [ ] sitemap.xml generated

## Execution Flow

### Phase 1: Validation
1. Run quality gates
2. Check environment variables
3. Verify build succeeds locally

### Phase 2: Build
```bash
npm run build
```

Check for:
- Build errors
- Warning count
- Bundle size

### Phase 3: Deploy
Platform-specific deployment command.

### Phase 4: Verify
1. Check deployment URL
2. Run smoke tests
3. Verify critical paths

### Phase 5: Report
```markdown
## Deployment Complete

**Platform:** Vercel
**Environment:** Production
**URL:** https://your-app.vercel.app

### Build Stats
- Build time: 45s
- Bundle size: 245 KB

### Verification
- [ ] Homepage loads
- [ ] API routes work
- [ ] Auth flow works

### Rollback
If issues occur:
\`\`\`bash
vercel rollback
\`\`\`
```

## Rollback Procedures

### Vercel
```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback
```

### Netlify
```bash
# List deploys
netlify deploys

# Rollback
netlify deploy --prod --alias <deploy-id>
```

## CI/CD Integration

### GitHub Actions
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check TypeScript errors, missing deps |
| 500 errors | Check server logs, env vars |
| Slow loading | Analyze bundle, check images |
| API errors | Verify env vars, check CORS |

## Notes

- Always test in preview before production
- Monitor error rates after deployment
- Keep deployment logs for debugging
