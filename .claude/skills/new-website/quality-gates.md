# Quality Gates for /new-website

This document defines all quality gates that must pass before a `/new-website` project is considered complete.

---

## Gate Categories

| Category | Priority | Blocking? |
|----------|----------|-----------|
| Code Quality | HIGH | Yes |
| Security | CRITICAL | Yes |
| Accessibility | HIGH | Yes (for critical issues) |
| Build | CRITICAL | Yes |
| Visual | MEDIUM | No (but reported) |
| Performance | MEDIUM | No (but reported) |

---

## 1. Code Quality Gates

### TypeScript Check
```bash
npm run typecheck
```

**Pass criteria:**
- Zero errors
- Zero type-related warnings

**Common fixes:**
- Add missing type annotations
- Fix `any` types with proper interfaces
- Resolve import path issues

### Lint Check
```bash
npm run lint
```

**Pass criteria:**
- Zero errors
- Warnings allowed but should be minimal

**Common fixes:**
- Fix import ordering
- Add missing dependencies to hooks
- Remove unused variables

### Code Review (Automated)

**Agent:** `code-reviewer`

**Checks:**
| Check | Severity | Auto-fix? |
|-------|----------|-----------|
| Unused imports | warning | Yes |
| Missing error boundaries | warning | No |
| Hardcoded strings | info | No |
| Console.log statements | warning | Yes |
| TODO/FIXME comments | info | No |
| Component naming | warning | No |
| Hook rules violations | error | No |

**Pass criteria:**
- Zero errors
- Warnings documented

---

## 2. Security Gates

### Security Audit (Automated)

**Agent:** `security-auditor`

**Checks:**
| Check | Severity | Description |
|-------|----------|-------------|
| XSS vulnerabilities | CRITICAL | Unsafe innerHTML, unsanitized user input |
| CSRF protection | HIGH | Missing CSRF tokens on forms |
| Exposed secrets | CRITICAL | API keys, tokens in code |
| Unsafe eval | CRITICAL | Use of eval() or Function() |
| SQL injection | CRITICAL | Raw SQL queries |
| Path traversal | HIGH | Unsafe file path handling |
| Open redirects | MEDIUM | Unvalidated redirect URLs |
| Prototype pollution | HIGH | Unsafe object merging |

**Pass criteria:**
- Zero CRITICAL issues
- Zero HIGH issues
- MEDIUM issues documented

### Dependency Audit
```bash
npm audit
```

**Pass criteria:**
- Zero high/critical vulnerabilities
- Moderate vulnerabilities documented

---

## 3. Accessibility Gates

### Accessibility Check (Automated)

**Agent:** `accessibility-checker`

**WCAG 2.1 AA Checks:**
| Check | Level | Description |
|-------|-------|-------------|
| Color contrast | AA | 4.5:1 for text, 3:1 for large text |
| Keyboard navigation | A | All interactive elements focusable |
| Focus indicators | AA | Visible focus states |
| Alt text | A | Images have descriptive alt |
| Heading hierarchy | A | Proper h1-h6 sequence |
| ARIA labels | A | Interactive elements labeled |
| Form labels | A | Inputs have associated labels |
| Link purpose | A | Links describe destination |
| Skip links | AA | Skip to main content available |
| Reduced motion | AA | Respects prefers-reduced-motion |

**Pass criteria:**
- Zero A-level violations
- Zero AA-level violations
- AAA recommendations noted

### Manual Accessibility Checks

Before final approval, verify:
- [ ] Screen reader navigation works
- [ ] Tab order is logical
- [ ] Error messages are announced
- [ ] Dynamic content updates are announced

---

## 4. Build Gates

### Production Build
```bash
npm run build
```

**Pass criteria:**
- Exits with code 0
- No build errors
- No critical warnings

### Bundle Size Check

**Thresholds:**
| Metric | Warning | Error |
|--------|---------|-------|
| First Load JS | > 200KB | > 300KB |
| Largest Page | > 300KB | > 500KB |
| Individual chunks | > 100KB | > 200KB |

**Check command:**
```bash
npm run build && cat .next/analyze/client.html
```

### Test Suite
```bash
npm run test
```

**Pass criteria:**
- All tests pass
- No skipped tests (unless documented)
- Coverage > 70% for new code

---

## 5. Visual Gates

### Responsive Testing

**Breakpoints to verify:**
| Breakpoint | Width | Device |
|------------|-------|--------|
| Mobile S | 320px | iPhone SE |
| Mobile M | 375px | iPhone 12 |
| Mobile L | 425px | Large phones |
| Tablet | 768px | iPad |
| Laptop | 1024px | Small laptop |
| Desktop | 1440px | Standard desktop |
| Desktop L | 1920px | Large monitor |

**Verify at each breakpoint:**
- [ ] No horizontal scroll
- [ ] Text is readable
- [ ] Touch targets >= 44px
- [ ] Images don't overflow
- [ ] Navigation is accessible

### Dark Mode Testing

**Verify:**
- [ ] All text is readable
- [ ] No hardcoded colors (`bg-white`, `text-black`)
- [ ] Images/icons work in both modes
- [ ] Borders/dividers are visible
- [ ] Focus states are visible

### Design Token Verification

**Verify tokens are applied:**
```bash
# Check for hardcoded colors (should return minimal results)
grep -r "bg-white\|bg-black\|text-white\|text-black" src/
grep -r "#[0-9a-fA-F]{3,6}" src/

# Check for token usage
grep -r "bg-background\|text-foreground\|bg-card" src/
```

---

## 6. Performance Gates

### Core Web Vitals

**Targets:**
| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP (Largest Contentful Paint) | < 2.5s | 2.5s - 4s | > 4s |
| FID (First Input Delay) | < 100ms | 100ms - 300ms | > 300ms |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.1 - 0.25 | > 0.25 |
| INP (Interaction to Next Paint) | < 200ms | 200ms - 500ms | > 500ms |

### Lighthouse Audit

**Minimum scores:**
| Category | Warning | Error |
|----------|---------|-------|
| Performance | < 90 | < 70 |
| Accessibility | < 95 | < 90 |
| Best Practices | < 90 | < 80 |
| SEO | < 90 | < 80 |

### Image Optimization

**Verify:**
- [ ] All images use `next/image`
- [ ] Appropriate `sizes` attribute
- [ ] WebP/AVIF formats used
- [ ] Lazy loading for below-fold images
- [ ] Proper aspect ratios (no CLS)

---

## 7. Documentation Gates

### Required Documentation

- [ ] `docs/synthesis-brief.md` - Design decisions
- [ ] `docs/research-report.md` - Competitive analysis
- [ ] Updated `CLAUDE.md` - Project context

### Code Documentation

- [ ] Complex components have JSDoc comments
- [ ] Utility functions documented
- [ ] Environment variables documented

---

## Gate Execution Order

```
┌─────────────────────────────────────────────────────────────────┐
│                     QUALITY GATE PIPELINE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  STAGE 1: Build Verification (BLOCKING)                          │
│  ├─ npm run typecheck                                            │
│  ├─ npm run lint                                                 │
│  └─ npm run build                                                │
│                                                                  │
│  STAGE 2: Parallel Code Review                                   │
│  ├─ code-reviewer                                                │
│  ├─ security-auditor (BLOCKING)                                  │
│  └─ accessibility-checker                                        │
│                                                                  │
│  STAGE 3: Visual Verification                                    │
│  ├─ Responsive screenshots                                       │
│  ├─ Dark mode verification                                       │
│  └─ Design token check                                           │
│                                                                  │
│  STAGE 4: Performance Audit (NON-BLOCKING)                       │
│  ├─ Lighthouse audit                                             │
│  └─ Bundle size check                                            │
│                                                                  │
│  STAGE 5: Documentation Check                                    │
│  ├─ Required docs exist                                          │
│  └─ CLAUDE.md updated                                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Failure Handling

### Critical Failure (BLOCKING)

If any critical gate fails:
1. Stop pipeline
2. Report specific failures
3. Fix issues
4. Re-run from failed stage

### Warning Failure (NON-BLOCKING)

If warning-level gates fail:
1. Document issues
2. Continue pipeline
3. Report in final summary
4. Create follow-up tasks

---

## Gate Override

In rare cases, gates can be overridden with user approval:

```markdown
## Gate Override Request

**Gate:** {gate name}
**Issue:** {specific issue}
**Reason for override:** {justification}
**Risk assessment:** {potential impact}
**Follow-up plan:** {when/how it will be fixed}

User approved: {yes/no}
```

**Never override:**
- Security critical issues
- Build failures
- Accessibility A-level violations
