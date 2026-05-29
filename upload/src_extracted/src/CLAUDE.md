# NEVGO Coaching Console — Project Plan

## Overview
Personal coaching management SaaS untuk membantu coach/mentor mengelola klien, sesi, progress, dan integrasi AI.

**Tech Stack:**
- Frontend: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion
- UI: Custom Fluent-inspired design system, Radix UI primitives
- Backend (Phase 2): PostgreSQL, NextAuth, Prisma, Stripe, Resend
- Current: SQLite, localStorage

---

## Phase 1: UI/UX Finalization

**Goal:** Finalize prototype menjadi polished, production-ready frontend sebelum backend development.

### 1.1 Critical UI Fixes

#### Empty States dengan CTA
**Files:** Semua page
**Changes:**
- [ ] `/klien` — empty state: "Belum ada klien" → + "Tambah Klien Pertama"
- [ ] `/jadwal` — empty calendar day → + "Jadwalkan Sesi"
- [ ] `/klien/[id]/sessions` — empty → + "Catat Sesi Pertama"
- [ ] `/klien/[id]/notes` — empty → + "Buat Catatan"
- [ ] `/klien/[id]/goals` — empty → + "Tambah Tujuan"

#### Icon Consistency (No Emojis)
**Files:** `src/app/jadwal/page.tsx`
**Changes:**
- [ ] Line 215: `'📅 Kalender'` → Lucide `Calendar` icon
- [ ] Line 215: `'📋 Daftar'` → Lucide `List` icon
- [ ] Review all emoji usage across codebase → replace with Lucide

#### Input Focus States
**Files:** All form components
**Changes:**
- [ ] Add red border on validation error (not just shadow)
- [ ] Error states should show inline message below input
- [ ] Success states: green border flash (300ms)

#### Button Labels
**Files:** All pages with buttons
**Changes:**
- [ ] "Simpan" → "Simpan Perubahan"
- [ ] "Hapus" → destructive → "Yakin Hapus?" confirmation
- [ ] "Batal" → "Batalkan"
- [ ] Add loading spinner inside buttons during API calls

### 1.2 Client Detail Redesign

#### Split into Sidebar Navigation
**File:** `src/app/klien/[id]/page.tsx`
**New Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ [← Back]  [Avatar] Nama Klien         [Edit] [AI] [Chat]  │
├──────────┬────────────────────────────────────────────────┤
│ Overview │                                                │
│ Sessions │           Content Area                         │
│ Notes    │                                                │
│ Goals    │                                                │
│ Files    │                                                │
└──────────┴────────────────────────────────────────────────┘
```
**Changes:**
- [ ] Convert tabs to vertical sidebar nav
- [ ] Active tab highlighted with accent color
- [ ] Content area scrolls independently
- [ ] Sticky header with client info

#### Reduce Cognitive Load
**Changes:**
- [ ] Move "Add Session/Note/Goal/File" to sticky "+" buttons in each section
- [ ] Remove inline forms → use modal dialogs instead
- [ ] AI tools: floating FAB button (bottom-right) → opens slide-over panel
- [ ] Add section collapse/expand for files/notes

### 1.3 Dashboard Improvements

#### Stats Grid Redesign
**File:** `src/components/stats-grid.tsx`
**Changes:**
- [ ] Zero values: show "—" or "Belum ada" instead of "0"
- [ ] Cards needing attention should pulse subtly (orange border)
- [ ] Consider mini bar chart variant for stats like "Avg Progress"
- [ ] Click on stat card → navigates to relevant page (filter applied)

#### Moments Section Polish
**File:** `src/components/moments-section.tsx`
**Changes:**
- [ ] Add "Lihat Semua" link
- [ ] Empty state: show helpful tip about coaching workflow

### 1.4 Quick Actions (Context Menu)

**File:** `src/app/klien/page.tsx`
**Changes:**
- [ ] Add ⋮ (more) button on each client card
- [ ] Context menu options:
  - Edit Klien
  - Ubah Fase →
  - Ubah Status →
  - Kirim WhatsApp
  - Arsipkan
  - Hapus

### 1.5 Responsive Design Polish

**Files:** All pages with `<style jsx global>`
**Changes:**
- [ ] Mobile: sidebar becomes bottom sheet
- [ ] Mobile: stats grid → 2-column
- [ ] Mobile: client list → single column cards
- [ ] Mobile: jadwal page → full-width calendar, stacked panels
- [ ] Test on iPhone SE, iPad, Desktop breakpoints

### 1.6 Accessibility

**Changes:**
- [ ] All interactive elements have `:focus-visible` styles
- [ ] Add `aria-label` to icon-only buttons
- [ ] Color contrast check (WCAG AA minimum)
- [ ] Keyboard navigation: Tab through cards, Enter to open

### 1.7 Performance

**Changes:**
- [ ] Add skeleton loading states (not just spinner)
- [ ] Lazy load client detail tabs (Sessions/Notes/Goals only load on tab click)
- [ ] Optimize images: next/image for avatars
- [ ] Code split: extract AI Tools Modal → dynamic import

---

## Phase 2: Backend & Multi-tenant SaaS

**Goal:** Scale dari prototype ke production-ready SaaS dengan multi-user, billing, dan cloud deployment.

### 2.1 Database & Schema

**Stack:** PostgreSQL + Prisma

#### New Data Models
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String
  avatar        String?
  role          Role      @default(COACH)
  subscription  Subscription?
  organization  Organization?
  clients       Client[]
  createdAt     DateTime  @default(now())
}

enum Role {
  ADMIN
  COACH
}

model Organization {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  plan      Plan     @default(FREE)
  users     User[]
  clients   Client[]
  createdAt DateTime @default(now())
}

enum Plan {
  FREE      // 5 clients
  STARTER   // 25 clients, $29/mo
  PRO       // unlimited, $79/mo
}

model Subscription {
  id             String   @id @default(cuid())
  userId         String   @unique
  plan           Plan
  stripeCustomerId String?
  stripeSubId     String?
  currentPeriodEnd DateTime
  status         SubStatus @default(ACTIVE)

  user           User     @relation(fields: [userId], references: [id])
}

enum SubStatus {
  ACTIVE
  PAST_DUE
  CANCELED
}

model Client {
  id          String   @id @default(cuid())
  orgId      String
  org         Organization @relation(fields: [orgId], references: [id])
  coachId     String
  coach       User     @relation(fields: [coachId], references: [id])
  // ... existing fields
}

model ApiKey {
  id        String   @id @default(cuid())
  userId    String
  provider  String   // openrouter, ollama
  keyHash   String   // hashed, not plain
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
}
```

#### Migration Plan
- [ ] Add Prisma with PostgreSQL connection
- [ ] Run `prisma migrate dev` for new schema
- [ ] Write migration script: SQLite → PostgreSQL
- [ ] Add database indexes on: `client.orgId`, `client.coachId`, `user.email`

### 2.2 Authentication

**Stack:** NextAuth.js v5

#### Providers
- [ ] Email/Password (credentials)
- [ ] Google OAuth
- [ ] Magic Link (passwordless)

#### Auth Flow
- [ ] `/auth/signin` — sign in page
- [ ] `/auth/signup` — registration with first client limit check
- [ ] `/auth/forgot-password` — password reset
- [ ] Session stored in database (Prisma Adapter)
- [ ] Middleware: protect all routes except `/auth/*`

#### API Routes
- `POST /api/auth/signin`
- `POST /api/auth/signup`
- `POST /api/auth/signout`
- `GET /api/auth/session`

### 2.3 Multi-tenancy

**Approach:** Organization-based isolation

#### Row-Level Security (RLS)
- [ ] All client queries filtered by `orgId` from session
- [ ] Middleware injects `orgId` into request context
- [ ] API routes validate `orgId` matches authenticated user's org

#### Data Isolation Tests
- [ ] User A cannot access User B's clients
- [ ] Organization A cannot see Organization B's data
- [ ] Test with direct API calls (not through UI)

### 2.4 API Rate Limiting

**Stack:** Upstash Redis + @upstash/ratelimit

#### Limits
| Endpoint | Free | Starter | Pro |
|----------|------|---------|-----|
| `/api/*` | 100/min | 500/min | 2000/min |
| AI `/api/ai/*` | 10/min | 50/min | 200/min |
| Auth | 5/min | 20/min | 100/min |

**Changes:**
- [ ] Set up Upstash Redis
- [ ] Add ratelimit middleware
- [ ] Return `429 Too Many Requests` with retry-after header

### 2.5 File Storage

**Stack:** AWS S3 or Cloudflare R2

#### Changes
- [ ] Configure S3 bucket with presigned URLs
- [ ] Upload flow: client → server (signed) → S3 direct
- [ ] Delete: server → S3
- [ ] File URLs expire after 1 hour
- [ ] Max file size: 10MB (Free), 50MB (others)

### 2.6 Stripe Integration

**Changes:**
- [ ] Create Stripe products/plans in dashboard
- [ ] Add Stripe webhook handler:
  - `checkout.session.completed` → activate subscription
  - `customer.subscription.updated` → update plan
  - `customer.subscription.deleted` → downgrade to free
- [ ] Billing portal: customer self-service plan management
- [ ] Usage-based billing tracking (client count)

#### Pages
- [ ] `/pricing` — plan comparison
- [ ] `/dashboard/billing` — current plan, usage, payment method

### 2.7 Email Service

**Stack:** Resend

#### Emails
- [ ] Welcome email (on signup)
- [ ] Password reset
- [ ] Session reminder (24h before scheduled session)
- [ ] Invoice/receipt (on payment)
- [ ] Cancellation confirmation

### 2.8 Environment Configuration

**Changes:**
```bash
# .env.example
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=
NEXTAUTH_URL=https://nevgo.example.com

# OAuth (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_STARTER_PRICE_ID=
STRIPE_PRO_PRICE_ID=

# Storage
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
AWS_REGION=

# Email
RESEND_API_KEY=

# Rate Limiting
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# AI (user-provided, stored encrypted)
ENCRYPTION_KEY=
```

### 2.9 Deployment

**Stack:** Vercel + Vercel Postgres + Vercel Blob

#### Changes
- [ ] Configure `vercel.json` for Edge functions
- [ ] Set up preview deployments per PR
- [ ] Environment variables in Vercel dashboard
- [ ] Custom domain: `nevgo.co` or similar

#### Monitoring
- [ ] Sentry for error tracking
- [ ] Vercel Analytics for performance
- [ ] Health check endpoint: `/api/health`

### 2.10 Testing

**Changes:**
- [ ] Unit tests: API route handlers (Vitest)
- [ ] Integration tests: full auth flow
- [ ] E2E tests: Playwright
  - Sign up → Add client → Create session
  - Upgrade plan → Verify limits

---

## Timeline Estimate

| Phase | Tasks | Est. Time |
|-------|-------|-----------|
| **Phase 1** | Empty States | 2-4 hrs |
| | Empty States | 2-4 hrs |
| | Icon Consistency | 1 hr |
| | Input Focus States | 2 hrs |
| | Button Labels | 1 hr |
| | Client Detail Redesign | 8-12 hrs |
| | Dashboard Stats | 4 hrs |
| | Quick Actions | 4 hrs |
| | Responsive Polish | 4-6 hrs |
| | Accessibility | 2 hrs |
| | Performance | 4 hrs |
| **Phase 1 Total** | | **32-44 hrs** |
| **Phase 2** | PostgreSQL Setup | 4 hrs |
| | Auth System | 8-12 hrs |
| | Multi-tenancy | 8 hrs |
| | Rate Limiting | 4 hrs |
| | File Storage | 6 hrs |
| | Stripe Billing | 8-12 hrs |
| | Email Service | 4 hrs |
| | Deployment + Monitor | 4 hrs |
| | Testing | 8 hrs |
| **Phase 2 Total** | | **54-62 hrs** |

---

## Current Issues to Fix

### Phase 1 Blockers
1. ~~Dev server pointing to wrong directory~~
2. Client detail page too complex — needs redesign
3. Empty states don't guide user to action
4. Emoji icons mixed with Lucide — inconsistent

### Phase 2 Blockers
1. Current `.env` has hardcoded API keys (security issue)
2. SQLite not suitable for production
3. No authentication layer
4. Single-tenant only

---

## Success Metrics

### Phase 1
- [ ] All pages have helpful empty states
- [ ] Client detail navigation is intuitive (user test)
- [ ] No emojis in UI (Lucide-only)
- [ ] Lighthouse accessibility score > 90
- [ ] First Contentful Paint < 1.5s

### Phase 2
- [ ] Multiple users can register and manage their own clients
- [ ] Billing works end-to-end (test card)
- [ ] No data leakage between organizations
- [ ] API responds < 200ms (excluding AI)
- [ ] Uptime > 99.9%