# BUPEXSA USA — Alumni Management Platform
## Product Requirements Document (PRD) — Version 2.2

| Field | Value |
|---|---|
| **Document Version** | 2.2 |
| **Status** | Final Draft — Ready for Development |
| **Platform URL** | https://bupexsausa.org/ |
| **Target Users** | PCSS Buea Alumni residing in the USA |
| **Prepared By** | Development Team |
| **Date** | April 2026 |
| **Supersedes** | PRD v2.1 (layout-customisable page builder) |

---

## Table of Contents

1. Project Overview
2. What Changed from v1.0
3. Recommended Technology Stack
4. User Roles & Permissions
5. Public Website (Frontend)
6. Authentication System (Supabase Auth)
7. Member Dashboard
8. Membership System
9. Payments Module
10. Chapters Module
11. Events Module
12. Donations Module
13. Custom Admin Panel
14. Visual Builder — Frontend Control System
15. Email Notification System
16. Core Data Models (Supabase Schema)
17. API Structure (Supabase Edge Functions)
18. SEO Requirements
19. Security Requirements
20. Non-Functional Requirements
21. Recommended Project Structure
22. Environment Variables Reference
23. Risks & Mitigations
24. Future Enhancements

---

## 1. Project Overview

BUPEXSA USA (Buea Presbyterian College Secondary School Alumni Association — USA Chapter) requires a full-featured, web-based alumni management platform that connects graduates, manages memberships, processes payments, promotes events, and enables online donations.

Version 2.2 corrects the customisation model for the Visual Builder's Section Library. In v2.1, admins could change a section's layout variant, column count, spacing, and container width — structural decisions that belong to the designer. In v2.2, **each library variant has a fixed design** (layout, structure, spacing, visual arrangement) that is set once by the developer and locked. Admins edit only the **content** inside that fixed design: text, images, and colors. This prevents admins from accidentally breaking the site's design system while still giving them full control over what the site says and shows.

**Change 1 — Serverless Backend via Supabase.** (Unchanged from v2.0.)

**Change 2 — Custom Admin Panel with Visual Frontend Builder.** (Unchanged from v2.0.)

**Change 3 — Section Library with Pre-Designed Variants.** (Carried from v2.1.) The Page Builder works from a curated library of pre-designed section variants stored in Supabase as JSONB. The full initial website is seeded into the database so every element is live and configurable from day one. Admins can also save custom variants into the library.

**Change 4 — Content-Only Customisation Model.** Each library variant has a fixed, developer-defined layout. When an admin places a section and opens the editor, they see only content fields — heading text, body copy, images, button labels, colors within the section's palette. No layout controls (columns, spacing, variant switching) are exposed. The design is always intact; only the words, images, and brand colors inside it can change.

---

## 2. What Changed from v1.0, v2.0, and v2.1

| Area | v1.0 | v2.0 | v2.1 | v2.2 (current) |
|---|---|---|---|---|
| Authentication | NextAuth.js | Supabase Auth | Supabase Auth | Supabase Auth (unchanged) |
| Database | PostgreSQL + Prisma | Supabase + RLS | Supabase + RLS | Supabase + RLS (unchanged) |
| Backend API | NestJS | Edge Functions | Edge Functions | Edge Functions (unchanged) |
| File Storage | Cloudinary | Supabase Storage | Supabase Storage | Supabase Storage (unchanged) |
| Realtime | Polling | Supabase Realtime | Supabase Realtime | Supabase Realtime (unchanged) |
| Admin / CMS | Strapi v4 | Custom Admin Panel | Custom Admin Panel | Custom Admin Panel (unchanged) |
| Section Storage | N/A | N/A | JSONB (layout + content) | **JSONB (content only — layout is fixed per variant)** |
| Section Customisation | N/A | N/A | Layout + content | **Content only (text, images, colors)** |
| Page Builder | None | Basic palette | Library with layout control | **Library with content-only editor** |
| Admin Custom Library | N/A | N/A | Seed + admin-saved | **Seed + admin-saved (unchanged)** |
| Initial Website | Code only | Code only | Seeded to DB | **Seeded to DB (unchanged)** |

---

## 3. Recommended Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| Frontend | Next.js 14 (App Router) | SSR/SSG for SEO, fast load, React ecosystem |
| Styling | Tailwind CSS | Responsive utility-first, supports dynamic CSS variables for theming |
| Auth | Supabase Auth | Email/Password + Google OAuth, built-in session management, RLS integration |
| Database | Supabase (PostgreSQL) | Managed relational DB, Row-Level Security, instant REST & GraphQL APIs |
| Backend Logic | Supabase Edge Functions (Deno) | Serverless TypeScript functions for payments, webhooks, email, custom logic |
| Realtime | Supabase Realtime | WebSocket-based subscriptions for live notifications |
| File Storage | Supabase Storage | S3-compatible, CDN delivery, image transforms, 1GB free tier |
| Payments | Stripe SDK + PayPal JS SDK | Industry-standard, secure, PCI-compliant |
| Email | Resend (or Brevo SMTP) | Transactional email with reliable deliverability; Resend has a Next.js-native SDK |
| State Management | Zustand | Lightweight global state for admin panel UI |
| Admin UI Framework | React + Tailwind (custom-built) | Fully tailored to BUPEXSA requirements; no third-party CMS dependency |
| Drag-and-Drop | dnd-kit | Accessible, performant, framework-agnostic page builder primitives |
| Hosting (Frontend + Admin) | Vercel | Free tier, edge CDN, GitHub integration, preview deployments |
| Hosting (Backend) | Supabase (fully managed) | No server to provision, scales automatically |

### Why Supabase Over NestJS + Separate Services

Supabase eliminates three separate hosting services (Railway for NestJS, Railway for PostgreSQL, Railway for Strapi) and three separate accounts (Cloudinary, separate DB provider, separate auth provider) into a single platform. Row-Level Security enforces data access rules at the database layer rather than in application code, reducing the attack surface. The free tier (500MB DB, 1GB storage, 2GB bandwidth, 500k Edge Function invocations/month) comfortably handles the project's target of 500+ members in year one.

---

## 4. User Roles & Permissions

### 4.1 Role Definitions

| Role | Access Level | Authentication |
|---|---|---|
| Guest | Public pages only | None (unauthenticated) |
| Member | Dashboard + member features | Supabase Auth (Email or Google OAuth) |
| Super Admin | Full system control via Admin Panel | Supabase Auth with `role = admin` claim |

### 4.2 Permissions Matrix

| Feature / Action | Guest | Member | Admin |
|---|---|---|---|
| View public pages | YES | YES | YES |
| Register as member | YES | N/A | YES |
| Make donations | YES | YES | YES |
| Login to dashboard | NO | YES | YES |
| View membership status | NO | YES | YES |
| Pay membership dues | NO | YES | YES |
| RSVP for events | NO | YES | YES |
| View own payment history | NO | YES | YES |
| Edit own profile | NO | YES | YES |
| Manage all members | NO | NO | YES |
| Approve/reject registrations | NO | NO | YES |
| Set membership fee | NO | NO | YES |
| Create/edit/delete events | NO | NO | YES |
| Create/edit/delete chapters | NO | NO | YES |
| View all payments & donations | NO | NO | YES |
| Approve manual payments | NO | NO | YES |
| Edit website theme & colors | NO | NO | YES |
| Reorder / toggle page sections | NO | NO | YES |
| Edit content blocks (text, images, CTAs) | NO | NO | YES |
| Build new page sections (drag-and-drop) | NO | NO | YES |
| Export financial reports | NO | NO | YES |
| Send bulk email notifications | NO | NO | YES |

### 4.3 Role Enforcement

All database queries are wrapped in Supabase Row-Level Security (RLS) policies. The admin role is stored as a custom claim in the Supabase Auth JWT (`app_metadata.role = "admin"`). RLS policies check this claim server-side, meaning no client-side code can escalate privileges. Edge Functions validate the JWT on every request before executing any privileged logic.

---

## 5. Public Website (Frontend)

All public pages are rendered server-side (SSR/SSG via Next.js) for SEO performance. All content — text, images, section order, theme colors — is driven by configuration stored in Supabase and editable through the Admin Panel without touching code.

### 5.1 Dynamic Theme System

The public website reads theme configuration from a `site_settings` table in Supabase on every build (or on-demand via ISR). CSS custom properties are injected into the root layout:

```css
:root {
  --color-primary: /* admin-set hex */;
  --color-accent: /* admin-set hex */;
  --font-heading: /* admin-set font */;
  --font-body: /* admin-set font */;
}
```

This means all components automatically reflect any theme change the admin makes, with no code deployment required.

### 5.2 Dynamic Page Layout System

Each public page is composed of an ordered list of **section blocks** stored in Supabase. The frontend renders sections in the order defined in the database. Admins can reorder, hide, or add sections via the Visual Builder. A page's section list looks like:

```json
[
  { "type": "hero", "visible": true, "order": 1, "data": { ... } },
  { "type": "stats", "visible": true, "order": 2, "data": { ... } },
  { "type": "events_preview", "visible": false, "order": 3, "data": { ... } }
]
```

The Next.js page component maps over this list and renders the corresponding React component for each section type.

### 5.3 Page Specifications

The following pages are included. All were defined in v1.0 and remain unchanged in scope. Their content is now stored in Supabase and edited via the Admin Panel rather than Strapi.

- **Home** — Hero, mission cards, stats, upcoming events, announcements, chapter spotlight, donation CTA, gallery strip
- **About Us** — History, mission/vision/values, PCSS Buea background, leadership preview
- **Membership** — Eligibility, benefits, current fee (live from DB), FAQ accordion, registration CTA
- **Chapters** — Chapter listing cards; dynamic chapter detail pages (`/chapters/[slug]`)
- **Events** — Upcoming list, calendar view, past archive; dynamic event detail pages (`/events/[slug]`)
- **Donations** — Donation form with preset amounts, all four payment methods
- **Contact** — Contact form, social links, map embed
- **Leadership** — National team profiles, board of directors
- **Gallery** — Photo grid with category filter, lightbox viewer
- **Alma Mater** — PCSS Buea history, notable alumni, nostalgia gallery

---

## 6. Authentication System (Supabase Auth)

### 6.1 Supported Methods

- **Email/Password** — with email confirmation and secure password reset
- **Google OAuth** — one-click sign-in via Google

Supabase Auth handles token issuance, refresh, and revocation. Sessions are stored in HTTP-only cookies via the `@supabase/ssr` package for Next.js, ensuring JWT tokens are never accessible to client-side JavaScript.

### 6.2 Registration Flow

1. Guest fills registration form at `/register`
2. Client-side and server-side validation runs
3. `supabase.auth.signUp()` is called — creates user in `auth.users`
4. A database trigger creates a corresponding row in the public `members` table with `status = PENDING`
5. Confirmation email sent by Supabase Auth (or routed through Resend via a custom SMTP hook)
6. Admin reviews and approves/rejects in Admin Panel
7. On approval, `status` updated to `ACTIVE`; member receives approval email with membership ID and login link
8. Member logs in and accesses dashboard

### 6.3 Registration Form Fields

| Field | Type | Validation |
|---|---|---|
| Full Name | Text | Required, min 2 chars |
| Email Address | Email | Required, valid format, unique |
| Phone Number | Tel | Optional, US format preferred |
| Password | Password | Required, min 8 chars, 1 uppercase, 1 number |
| Confirm Password | Password | Must match |
| Graduation Year | Select | Required, 1950–current year |
| Batch / Class | Text | Optional (e.g. "Class of 99") |
| US State / Location | Select | Required, US states dropdown |
| Profession | Text | Optional |
| Profile Picture | File upload | Optional, JPG/PNG, max 5MB — uploaded to Supabase Storage |
| How did you hear? | Select | Optional |
| Terms & Privacy | Checkbox | Required |

### 6.4 Google OAuth Flow

1. User clicks "Continue with Google"
2. Redirected to Google OAuth consent screen via `supabase.auth.signInWithOAuth()`
3. On callback, Supabase creates/updates the `auth.users` record
4. Database trigger fires to create/update the `members` table row
5. If new: system auto-populates profile from Google metadata, status set to PENDING
6. If existing: session started immediately

### 6.5 Password Management

- Forgot Password: `supabase.auth.resetPasswordForEmail()` sends a time-limited link (1-hour expiry, configurable in Supabase dashboard)
- Reset Password: user lands on `/reset-password`, calls `supabase.auth.updateUser()` with new password
- Passwords stored as bcrypt hashes by Supabase — no application code handles raw passwords

### 6.6 Session Management

- JWT tokens managed by `@supabase/ssr` in HTTP-only cookies
- Session expiry: 7 days (configurable in Supabase Auth settings)
- Automatic token refresh handled by Supabase client
- Logout calls `supabase.auth.signOut()` which revokes the session server-side

---

## 7. Member Dashboard

Accessible at `/dashboard` — protected by Supabase Auth middleware in Next.js. All data fetched server-side via Supabase client with RLS enforcing that members only see their own data.

### 7.1 Dashboard Home

- Welcome banner with first name
- Membership status card: ID, status badge (Active / Pending / Expired), expiry date
- Quick actions: Pay Dues, RSVP Event, Edit Profile, View Receipts
- Upcoming events RSVPed for (next 3) — live via Supabase query
- Recent payment activity (last 3 transactions)
- Outstanding balance alert if dues are unpaid
- In-app notification bell — count updated via Supabase Realtime subscription

### 7.2 My Profile

- View and edit all registration fields
- Upload/change profile picture (uploaded to Supabase Storage `avatars/` bucket)
- Change password (via Supabase Auth `updateUser`)
- Chapter affiliation display
- Member since date

### 7.3 Membership & Payments

- Current membership status with visual badge
- Membership fee amount (pulled live from `site_settings` table)
- Pay Now button routing to payment flow
- Payment history table: Date, Amount, Method, Status, Receipt link
- PDF receipt download (generated by Edge Function)

### 7.4 My Events

- RSVPed events list (Upcoming / Past)
- RSVP status per event
- Cancel RSVP option (if event is more than 24 hours away)

### 7.5 Realtime Notifications

Supabase Realtime replaces polling. The dashboard subscribes to the `notifications` table filtered by `member_id`. New rows inserted by Edge Functions (payment confirmation, RSVP confirmation, renewal reminder, admin message) appear instantly in the notification bell without a page refresh.

```typescript
supabase
  .channel('notifications')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'notifications',
    filter: `member_id=eq.${userId}`
  }, (payload) => {
    // Update notification badge count
  })
  .subscribe()
```

---

## 8. Membership System

### 8.1 Membership Status States

| Status | Description |
|---|---|
| PENDING | Registered, awaiting admin approval |
| ACTIVE | Approved and dues paid for current period |
| EXPIRED | Dues not renewed after expiry date |
| SUSPENDED | Admin has manually suspended membership |
| REJECTED | Admin rejected the registration |

### 8.2 Membership Fee Management

- Admin sets global membership fee in Admin Panel → saved to `site_settings` table in Supabase
- Admin sets membership period (annual calendar year or rolling 12 months)
- Fee displayed dynamically on public Membership page and in member dashboard
- Admin can set grace period (e.g. 30 days after expiry before suspension)
- Admin can manually override a member's expiry date or mark as paid

### 8.3 Membership ID Format

Format: `BUPEXSA-[YEAR]-[STATE_CODE]-[SEQUENCE]`

Example: `BUPEXSA-2025-TX-0042`

Assigned automatically by a Supabase database function triggered on admin approval. Admin can override manually via Admin Panel.

### 8.4 Renewal Flow

1. Supabase scheduled Edge Function (cron job) runs daily — sends renewal reminder email 30 days before expiry, and again 7 days before
2. Member logs in → clicks Renew Membership → selects payment method
3. Payment processed → Edge Function updates `status = ACTIVE` and extends `expiry_date`
4. Confirmation email with receipt sent via Resend

---

## 9. Payments Module

### 9.1 Supported Payment Methods

| Method | Type | Processing |
|---|---|---|
| Stripe | Credit / Debit Card | Automatic — instant confirmation |
| PayPal | PayPal account / card | Automatic — instant confirmation |
| Zelle | Bank transfer (US) | Manual — admin reviews & approves |
| CashApp | Mobile payment | Manual — admin reviews & approves |

### 9.2 Automatic Payment Flow (Stripe / PayPal)

1. Member selects payment method and clicks Pay Now
2. Amount pre-filled from `site_settings` (membership) or form input (donation)
3. Frontend calls a Supabase Edge Function to create a Stripe Payment Intent or PayPal Order
4. Member completes payment in Stripe Elements or PayPal redirect
5. Stripe / PayPal sends webhook to Supabase Edge Function endpoint
6. Edge Function verifies webhook signature, updates `payments` table, activates membership
7. Edge Function calls Resend to send email receipt
8. Supabase Realtime pushes notification to member dashboard

### 9.3 Manual Payment Flow (Zelle / CashApp)

1. Member selects Zelle or CashApp — system displays recipient handle and reference code
2. Member submits payment proof form: amount, date, optional screenshot
3. Screenshot uploaded to Supabase Storage `payment-proofs/` bucket (private, admin-only access)
4. Payment record created with `status = PENDING_VERIFICATION`
5. Admin sees pending item in Admin Panel → clicks Approve or Reject
6. On approval: Edge Function updates status, activates membership, sends email to member

### 9.4 Payment Data Model

| Field | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| member_id | UUID FK | References members table |
| type | ENUM | MEMBERSHIP, DONATION |
| amount | Decimal | In USD |
| method | ENUM | STRIPE, PAYPAL, ZELLE, CASHAPP |
| status | ENUM | PENDING, PENDING_VERIFICATION, COMPLETED, FAILED, REFUNDED |
| stripe_intent_id | String | Nullable — Stripe payment intent ID |
| paypal_order_id | String | Nullable — PayPal order ID |
| proof_storage_path | String | Supabase Storage path for manual payment screenshot |
| admin_note | Text | Admin note on approval/rejection |
| receipt_sent | Boolean | Whether receipt email was sent |
| created_at | Timestamp | Auto-set |
| updated_at | Timestamp | Auto-updated |

---

## 10. Chapters Module

Unchanged in scope from v1.0. All chapter data is stored in Supabase tables. Admins create and manage chapters via the Admin Panel. New chapters appear on the public site immediately.

### 10.1 Chapter Data Model

| Field | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| name | String | e.g. "Texas Chapter" |
| slug | String | URL slug, unique |
| state | String | US state(s) covered |
| description | Text | Admin-editable |
| banner_image_path | String | Supabase Storage path |
| is_active | Boolean | Show/hide from public site |
| created_at | Timestamp | Auto-set |

### 10.2 Chapter EXCO

| Field | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| chapter_id | UUID FK | References chapters |
| name | String | Full name |
| title | String | e.g. "Chapter President" |
| photo_path | String | Supabase Storage path |
| bio | Text | Short bio |
| order | Int | Display order |

---

## 11. Events Module

Unchanged in scope from v1.0. Event data stored in Supabase. RSVP confirmations and reminders sent via Supabase Edge Functions calling Resend.

### 11.1 Event Data Model

| Field | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| title | String | Event name |
| slug | String | Unique URL identifier |
| description | Text | Full description (rich text stored as JSON) |
| start_datetime | Timestamp with TZ | US timezone |
| end_datetime | Timestamp with TZ | |
| location_name | String | Venue name |
| location_address | String | For map embed |
| chapter_id | UUID FK | Nullable for national events |
| category | String | Gala, Fundraiser, Meeting, Social |
| thumbnail_path | String | Supabase Storage path |
| max_attendees | Int | Nullable = unlimited |
| is_published | Boolean | Draft/published toggle |
| created_at | Timestamp | Auto-set |

### 11.2 RSVP System

- Member clicks RSVP → Edge Function checks capacity
- If at capacity: waitlist option offered
- RSVP record created; confirmation email sent with `.ics` calendar attachment via Resend
- 24-hour reminder sent by scheduled Edge Function
- Admin views RSVP list and exports CSV from Admin Panel

### 11.3 Event Email Notifications

| Trigger | Recipients |
|---|---|
| New event published | All active members (bulk email) |
| RSVP confirmed | Individual member |
| RSVP reminder | Individual member (24h before) |
| Event cancelled | All RSVPed members |
| Event details updated | All RSVPed members |

---

## 12. Donations Module

Unchanged in scope from v1.0. Donation records stored in Supabase. Anonymous donations are stored with `is_anonymous = true` and the donor name is suppressed on any public display.

### 12.1 Donation Form

- Preset amounts: $10, $25, $50, $100, $250, Custom
- Donor name and email (pre-filled if logged in)
- Dedication / message field (optional)
- Payment method: Stripe, PayPal, Zelle, CashApp
- Anonymous donation checkbox

### 12.2 Donation Data Model

| Field | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| donor_name | String | |
| donor_email | String | |
| member_id | UUID FK | Nullable — guests can donate |
| amount | Decimal | USD |
| message | Text | Optional |
| is_anonymous | Boolean | |
| method | ENUM | STRIPE, PAYPAL, ZELLE, CASHAPP |
| status | ENUM | PENDING, COMPLETED, FAILED, REFUNDED |
| created_at | Timestamp | |

---

## 13. Custom Admin Panel

The Admin Panel is a bespoke web application served at `/admin` as part of the Next.js monorepo. It replaces Strapi entirely. The admin authenticates via Supabase Auth with a verified `role = admin` claim. All data is read from and written to Supabase directly via the admin Supabase client (bypasses RLS using the service role key, server-side only).

### 13.1 Admin Panel Sections

| Section | What the Admin Can Do |
|---|---|
| **Dashboard** | Summary stats: total members, revenue MTD/YTD, upcoming events, pending approvals |
| **Members** | Search, filter, view profiles, approve/reject, change status, assign chapters, export CSV |
| **Payments** | View all transactions, approve/reject manual payments, mark refunds, export CSV |
| **Events** | Full CRUD, publish/unpublish, view RSVP lists, send custom emails to attendees, export CSV |
| **Chapters** | Create/edit/delete/activate/deactivate chapters and EXCO members |
| **Donations** | View all donations, donor details, export financial report |
| **Notifications** | Send bulk email to all members or filter by chapter/state; rich text editor |
| **Gallery** | Upload images, assign categories, reorder, delete |
| **Visual Builder** | Theme editor, layout manager, content block editor, drag-and-drop page builder |
| **Settings** | Membership fee, period, grace period, site name, logo, favicon, SMTP, payment handles |

### 13.2 Member Management

- Filterable table: by status, chapter, US state, graduation year, registration date
- Individual member view with full activity history (payments, RSVPs, notifications)
- Approve or reject pending registrations with optional note (triggers email)
- Manually change status (Active / Suspended / Expired)
- Assign or change membership ID
- Assign member to chapter
- Override expiry date
- Delete / anonymize member account (GDPR-style — replaces PII with anonymized values)
- Export full member list to CSV

### 13.3 Financial Management

- Unified transactions table showing payments and donations
- Filters: type, method, status, date range, amount range
- Approve or reject pending manual payments (Zelle / CashApp) with admin note
- Mark any payment as refunded with reason
- Financial summary: total collected this month, YTD, breakdown by payment method
- Export to CSV

### 13.4 Settings Panel

The Settings panel covers all global configuration:

- **Membership**: fee amount, period type, grace period days, renewal reminder lead time
- **Site Identity**: site name, logo upload, favicon upload, tagline
- **Brand Colors**: primary color, accent color — applied site-wide via CSS variables
- **Typography**: heading font, body font (Google Fonts selection)
- **Contact Info**: email, phone, address, social media links
- **Payment Handles**: Zelle recipient info, CashApp handle displayed to users
- **Email (SMTP)**: host, port, username, password for Resend / Brevo
- **Integrations**: Stripe/PayPal publishable keys display, GA4 Measurement ID, reCAPTCHA site key

All settings are stored in a `site_settings` table as key-value pairs. The Next.js frontend reads this table at build time (or via ISR) and applies values globally.

---

## 14. Visual Builder — Frontend Control System

The Visual Builder gives the super admin complete no-code control over the public website's appearance and content through the Admin Panel. Version 2.2 establishes a clean separation of concerns: **developers own the design, admins own the content.**

Every section's visual structure — its layout, column arrangement, spacing, animations, and visual hierarchy — is fixed in code by the developer. Admins never touch layout. What admins do control is everything the user reads and sees: headings, body copy, images, button labels, and the color choices available within each section's pre-defined palette. This model eliminates an entire class of errors (broken layouts, misaligned columns, spacing that breaks on mobile) while giving admins genuinely meaningful control over how the site looks and what it communicates.

### 14.1 Overview

The Visual Builder has four modules:

1. **Theme Editor** — Global brand tokens (primary color, accent color, fonts)
2. **Layout Manager** — Per-page section ordering and visibility
3. **Section Library** — Browsable catalogue of pre-designed section variants
4. **Content Editor** — Edit text, images, and color choices within a placed section

All changes are saved as JSONB to Supabase tables. The Next.js frontend reads this via ISR (60-second revalidation, or instant on manual publish). Changes appear on the live site within seconds with no code deployment.

---

### 14.2 The Core Design Principle: Fixed Design, Editable Content

Each section variant in the library is a **fully designed, immutable visual unit.** Its layout is a React component written by a developer. The JSONB stored in the database contains only content fields — the things that change from site to site or page to page — not structural decisions.

**What is fixed (developer-owned, in code):**
- Column count and grid structure
- Section height, padding, and spacing
- Typography scale and font weights
- Element positions and responsive breakpoints
- Animation and transition behaviour
- Overall visual hierarchy

**What is editable (admin-owned, in database):**
- Heading and subheading text
- Body copy (rich text where applicable)
- Images and their alt text
- Button/CTA labels and URLs
- Color choice from the section's allowed palette (e.g. "white background" or "primary background" — not a free hex picker)
- Toggling optional elements on/off (e.g. show/hide a second CTA button)
- Data-driven fields (e.g. "show 3 events" or "show 6 events")

This means an admin can never produce a broken layout. The worst outcome is mildly awkward copy — which the admin can immediately fix themselves.

---

### 14.3 Theme Editor

The Theme Editor sets the global brand tokens that feed into every section's color palette. Because each section uses CSS custom properties rather than hardcoded colors, changing the primary color here cascades across the entire site automatically.

**Controls:**

| Setting | Input | Applied As |
|---|---|---|
| Primary color | Color picker (hex) | `--color-primary` CSS variable |
| Accent color | Color picker (hex) | `--color-accent` CSS variable |
| Heading font | Google Fonts dropdown | `--font-heading` CSS variable |
| Body font | Google Fonts dropdown | `--font-body` CSS variable |

A live preview iframe shows the homepage with the current (unsaved) token values. Saving writes to `site_settings` and triggers ISR revalidation.

> Note: Border radius, spacing scale, and other structural tokens are **not** exposed in the Theme Editor — those are design system decisions fixed in code. Only the four brand-identity tokens above are admin-controllable.

```sql
INSERT INTO site_settings (key, value) VALUES
  ('theme_primary_color', '#6B21A8'),
  ('theme_accent_color',  '#0EA5E9'),
  ('theme_font_heading',  'Inter'),
  ('theme_font_body',     'Inter');
```

---

### 14.4 Layout Manager

The Layout Manager shows every page as an ordered list of its placed sections. For each section the admin can:

- **Drag to reorder** (dnd-kit vertical sort)
- **Toggle visibility** — hide a section from the live site without deleting it
- **Click Edit** — opens the Content Editor for that section
- **Click Duplicate** — creates a copy of the section below it, including its content
- **Click Delete** — removes the section (with confirmation prompt)
- **Click + Add Section** — opens the Section Library to pick a new section to place

A page selector at the top lets the admin switch between any page. All changes are saved as drafts and published via the Publish button.

---

### 14.5 Section Library

The Section Library is the catalogue of all available pre-designed section variants. It lives in a `section_library` table in Supabase and is the single source of truth for what sections exist and what their default content looks like.

#### 14.5.1 Library Data Model

```sql
CREATE TABLE section_library (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,        -- e.g. 'Hero — Dark Overlay'
  description     TEXT,                 -- One-line description for the library card
  component       TEXT NOT NULL,        -- React component name, e.g. 'HeroSection'
  variant         TEXT NOT NULL,        -- Variant key within the component, e.g. 'dark-overlay'
  category        TEXT NOT NULL,        -- 'hero' | 'content' | 'data' | 'media' | 'utility'
  tags            TEXT[],               -- e.g. ['cta', 'fullwidth', 'banner']
  thumbnail_path  TEXT NOT NULL,        -- Supabase Storage path to preview screenshot
  default_content JSONB NOT NULL,       -- Default values for all editable content fields
  content_schema  JSONB NOT NULL,       -- Field definitions: type, label, required, options
  is_system       BOOLEAN DEFAULT true, -- true = seeded by dev; false = saved by admin
  created_by      UUID REFERENCES auth.users(id),
  is_active       BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

Two JSONB columns serve distinct roles:

**`default_content`** — the starting values for all editable fields when a variant is first placed on a page. For example, a Hero variant's `default_content` might be:

```jsonc
{
  "heading": "Connect. Give. Grow.",
  "subheading": "Join the BUPEXSA USA alumni community.",
  "backgroundImage": null,
  "backgroundColorScheme": "primary",
  "cta1Label": "Join Now",
  "cta1Url": "/register",
  "showCta2": true,
  "cta2Label": "Learn More",
  "cta2Url": "/about"
}
```

**`content_schema`** — the field definitions that tell the Content Editor what form controls to render. For example:

```jsonc
[
  { "key": "heading",               "type": "text",      "label": "Heading",            "required": true,  "maxLength": 80 },
  { "key": "subheading",            "type": "text",      "label": "Subheading",         "required": false, "maxLength": 160 },
  { "key": "backgroundImage",       "type": "image",     "label": "Background image",   "required": false },
  { "key": "backgroundColorScheme", "type": "select",    "label": "Background color",   "required": true,
    "options": ["white", "light", "primary", "dark"] },
  { "key": "cta1Label",             "type": "text",      "label": "Button 1 label",     "required": true,  "maxLength": 30 },
  { "key": "cta1Url",               "type": "url",       "label": "Button 1 URL",       "required": true },
  { "key": "showCta2",              "type": "boolean",   "label": "Show second button", "required": false },
  { "key": "cta2Label",             "type": "text",      "label": "Button 2 label",     "required": false, "maxLength": 30 },
  { "key": "cta2Url",               "type": "url",       "label": "Button 2 URL",       "required": false }
]
```

The Content Editor reads `content_schema` to render the form — no hardcoded form exists per component. Adding a new field to a component only requires updating the schema; the editor renders it automatically.

#### 14.5.2 Page Layouts Data Model

Each placed section on a page is a row in `page_layouts`:

```sql
CREATE TABLE page_layouts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key     TEXT NOT NULL,      -- 'home', 'about', 'membership', etc.
  section_key  TEXT NOT NULL,      -- unique instance identifier, e.g. 'hero_main'
  library_id   UUID REFERENCES section_library(id),
  component    TEXT NOT NULL,      -- copied from section_library for fast lookup
  variant      TEXT NOT NULL,      -- copied from section_library
  order_index  INT NOT NULL,
  visible      BOOLEAN NOT NULL DEFAULT true,
  content      JSONB NOT NULL,     -- admin-edited content values (content fields only)
  is_draft     BOOLEAN NOT NULL DEFAULT false,
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);
```

`content` holds only the editable field values — the same shape as `default_content` from the library entry. The React component receives both `variant` (to know which fixed layout to render) and `content` (to know what to display inside it).

#### 14.5.3 Content Field Types

The `content_schema` supports the following field types, each rendered as a specific input in the Content Editor:

| Field Type | Editor Control | Description |
|---|---|---|
| `text` | Single-line text input | Short strings: headings, button labels, names |
| `richtext` | Tiptap rich text editor | Body copy with bold, italic, lists, links |
| `image` | Image uploader | Uploads to Supabase Storage; stores path |
| `url` | URL input with validation | Internal (`/about`) or external (`https://...`) |
| `select` | Dropdown | Fixed set of options defined in schema (e.g. color schemes) |
| `boolean` | Toggle switch | Show/hide optional elements |
| `number` | Number input with min/max | e.g. "How many events to show" |
| `repeater` | Dynamic list of grouped fields | e.g. FAQ items, card grid items, team members |

The `repeater` type is the most powerful — it lets admins add, remove, and reorder sub-items within a section without touching code. Each repeater item has its own sub-schema. For example, a `CardGridSection` repeater item schema:

```jsonc
{
  "key": "cards",
  "type": "repeater",
  "label": "Cards",
  "minItems": 1,
  "maxItems": 6,
  "itemSchema": [
    { "key": "icon",  "type": "select", "label": "Icon", "options": ["star", "users", "heart", "globe", "award", "book"] },
    { "key": "title", "type": "text",   "label": "Card title", "maxLength": 50 },
    { "key": "body",  "type": "text",   "label": "Card body",  "maxLength": 150 }
  ]
}
```

#### 14.5.4 Section Library Catalogue

The library ships with the following pre-designed variants, seeded at launch. Each variant has a fixed layout defined in its React component.

**Hero** — large opening sections

| Variant Name | Component + Variant Key | Editable Content Fields |
|---|---|---|
| Hero — Centered, Primary BG | `HeroSection / centered-primary` | Heading, subheading, bg image, 2 CTA buttons (labels + URLs), show/hide CTA 2 |
| Hero — Centered, White BG | `HeroSection / centered-white` | Heading, subheading, bg image, 2 CTA buttons |
| Hero — Dark Overlay | `HeroSection / dark-overlay` | Heading, subheading, bg image (required), 2 CTA buttons |
| Hero — Split, Image Right | `HeroSection / split-image-right` | Heading, subheading, side image, 1 CTA button |
| Hero — Minimal | `HeroSection / minimal` | Heading, subheading, 1 CTA button |

**Content** — text, cards, and mixed layouts

| Variant Name | Component + Variant Key | Editable Content Fields |
|---|---|---|
| Card Grid — 3 Columns | `CardGridSection / three-col` | Section heading, cards repeater (icon, title, body; max 9) |
| Card Grid — 2 Columns | `CardGridSection / two-col` | Section heading, cards repeater (icon, title, body; max 6) |
| Image + Text — Image Left | `ImageTextSection / image-left` | Heading, body (rich text), image, 1 CTA |
| Image + Text — Image Right | `ImageTextSection / image-right` | Heading, body (rich text), image, 1 CTA |
| Rich Text — Centered | `TextBlockSection / centered` | Heading, body (rich text), color scheme (white / light) |
| Mission Cards | `MissionSection / three-col` | Heading, 3 mission items: icon, title, body |
| FAQ Accordion | `FaqSection / standard` | Heading, FAQ repeater (question, answer; max 20) |
| Testimonials | `TestimonialSection / slider` | Heading, testimonials repeater (quote, name, role; max 8) |
| Team Grid — 4 Col | `TeamGridSection / four-col` | Heading, color scheme — members pulled live from DB |
| Team Grid — 3 Col | `TeamGridSection / three-col` | Heading, color scheme — members pulled live from DB |

**Data** — sections driven by live Supabase data

| Variant Name | Component + Variant Key | Editable Content Fields |
|---|---|---|
| Stats Bar — Primary BG | `StatsBarSection / primary` | Up to 4 stats: label + value (text or "auto" source) |
| Stats Bar — White BG | `StatsBarSection / white` | Up to 4 stats: label + value |
| Events Preview — Card Grid | `EventsPreviewSection / cards` | Heading, number of events to show (1–6), CTA label |
| Events Preview — List | `EventsPreviewSection / list` | Heading, number of events (1–10), CTA label |
| Gallery Strip | `GalleryStripSection / strip` | Heading, number of images (4–12), category filter |
| Gallery Grid | `GalleryGridSection / masonry` | Heading, number of images (6–24), category filter |
| Announcements | `AnnouncementsSection / standard` | Heading, number of announcements (3–10) |
| Chapter Spotlight | `ChapterSpotlightSection / split` | Heading — data pulled live from chapters DB |

**Media** — image-heavy and CTA sections

| Variant Name | Component + Variant Key | Editable Content Fields |
|---|---|---|
| Donation CTA — Full Width | `DonationCtaSection / fullwidth` | Heading, body text, button label, color scheme |
| Donation CTA — Card | `DonationCtaSection / card` | Heading, body, button label, preset amounts (up to 5) |
| Full-Width Image | `FullWidthImageSection / standard` | Image (required), optional caption |
| Alma Mater Feature | `AlmaMaterSection / split` | Heading, body (rich text), image, link label |

**Utility** — structural and functional

| Variant Name | Component + Variant Key | Editable Content Fields |
|---|---|---|
| Spacer — Small | `SpacerSection / small` | None — fixed 40px gap |
| Spacer — Large | `SpacerSection / large` | None — fixed 120px gap |
| Divider | `DividerSection / standard` | Style: solid / dashed / dotted |
| Contact Form | `ContactFormSection / standard` | Heading, subheading, success message |
| Custom HTML | `CustomHtmlSection / standard` | Raw HTML string (admin-only field) |

#### 14.5.5 Admin-Saved Library Variants

After editing a section's content on any page, the admin can click **Save to Library** in the Content Editor. This saves the current content values as a new `section_library` row with `is_system = false`, using the same `component` and `variant` as the source (layout is identical; only content differs). The admin gives it a name, assigns a category, and adds optional tags. A thumbnail screenshot is generated server-side by a Puppeteer Edge Function.

Custom variants appear in the library alongside system variants with a "Custom" badge. They can be placed on any page, renamed, or deleted. System variants cannot be deleted.

---

### 14.6 Content Editor

The Content Editor is the form the admin uses to edit the content of any placed section. It is generated at runtime from the section's `content_schema`, so no hardcoded form exists per component.

**How it works:**

1. Admin clicks **Edit** on a section in the Layout Manager or Page Canvas
2. The Content Editor side panel opens, showing the section's name and thumbnail at the top
3. Below that, a form renders — one control per field in `content_schema`, in schema order
4. Admin fills in values. Validation runs inline (required fields, max length, URL format)
5. Image fields open a file picker that uploads directly to Supabase Storage and returns the path
6. For `repeater` fields, the admin sees a list of sub-items with Add, Remove, and drag-to-reorder controls
7. Admin clicks **Save Draft** — content is written to `page_layouts.content` with `is_draft = true`
8. Admin can preview in the iframe before publishing

**What the admin cannot do in the Content Editor:**
- Change the section's layout variant (e.g. switch from "Image Left" to "Image Right") — this requires deleting the section and adding a different library variant
- Adjust spacing, padding, or column count
- Change font weights or sizes
- Edit CSS or HTML directly (except in the explicit `custom_html` section type, which is clearly labelled as a developer tool)

If an admin wants a different layout for the same content, they delete the section, open the Section Library, pick the variant with the layout they want, and paste their content in. This is a deliberate friction — layout decisions should be intentional.

---

### 14.7 Page Builder

The Page Builder is where admins compose pages — adding, removing, and reordering sections from the Section Library.

#### 14.7.1 Adding a Section

1. Admin clicks **+ Add Section** in the Layout Manager (or between two sections)
2. The Section Library opens as a drawer panel
3. Admin browses by category tab (All / Hero / Content / Data / Media / Utility), or searches by name/tag
4. Each library card shows: thumbnail image, variant name, component label, short description, and an "Add to Page" button
5. Admin clicks **Add to Page** — `default_content` from the library entry is deep-copied into a new `page_layouts` row (`is_draft = true`)
6. The Content Editor opens automatically for the new section
7. Admin fills in content, saves draft, previews, and publishes

#### 14.7.2 Building a New Page from Scratch

1. Admin goes to **Visual Builder → Page Builder** and clicks **+ New Page**
2. Admin enters: page title, URL slug (e.g. `/scholarship`), and SEO meta (title, description, og:image)
3. A new `page_key` record group is initialised in Supabase — the page starts empty
4. Admin adds sections from the Section Library until the page is complete
5. Admin publishes — the page goes live at the specified URL with ISR-rendered HTML

#### 14.7.3 Draft, Preview, and Publish Flow

**Draft** — all changes in the Visual Builder are saved with `is_draft = true`. The live public site renders only `is_draft = false` rows.

**Preview** — admin clicks Preview to open the page in an iframe with `?preview=true`. The Next.js page fetches draft rows for that page key and merges them with live rows for an accurate preview.

**Publish** — clicking **Publish Page** calls the `publish-page` Edge Function: sets `is_draft = false` on all draft rows for the page, then calls `revalidate-page` to trigger Next.js ISR. The live site reflects changes within seconds.

**Discard** — admin can click **Discard Drafts** before publishing to delete all draft rows and revert to the last published state.

---

### 14.8 Initial Website Seed

The entire public website is designed as React section components before launch and then seeded into the database. From day one, every section on every page is a `page_layouts` row in Supabase — editable through the Admin Panel. There is no hardcoded content in the Next.js codebase; all text, images, and configuration live in the database.

#### 14.8.1 What Gets Seeded

**`section_library`** — all pre-designed variants with `default_content`, `content_schema`, thumbnails, categories, and tags.

**`page_layouts`** — the complete initial composition of every page, each section populated with real production content (actual headings, body copy, image paths, CTA labels and URLs):

| Page | Seeded Sections (in order) |
|---|---|
| Home | Hero (centered-primary), StatsBar (primary), MissionSection, EventsPreview (cards), Announcements, ChapterSpotlight, DonationCTA (fullwidth), GalleryStrip |
| About | Hero (centered-white), TextBlock, ImageText (image-left), MissionSection, TeamGrid (four-col) |
| Membership | Hero (minimal), ImageText (image-right), CardGrid (three-col), StatsBar (white), FAQ, DonationCTA (card) |
| Chapters | Hero (centered-white), TextBlock, ChapterSpotlight |
| Events | Hero (minimal), EventsPreview (list), GalleryStrip |
| Donations | Hero (dark-overlay), DonationCTA (card), StatsBar (primary), Testimonials |
| Contact | Hero (minimal), ImageText (image-left), ContactForm |
| Leadership | Hero (centered-white), TeamGrid (three-col), TextBlock |
| Gallery | Hero (minimal), GalleryGrid |
| Alma Mater | Hero (dark-overlay), AlmaMaterFeature, GalleryStrip, TextBlock |

**`site_settings`** — theme tokens, membership fee, SEO meta per page, contact info, social links, payment handles.

#### 14.8.2 Seed Architecture

```
supabase/seed-content/
├── index.ts               # Entry point — runs all seeders in order, idempotent
├── section-library.ts     # Inserts all section_library rows (variants + schemas)
├── site-settings.ts       # Inserts site_settings rows
└── pages/
    ├── home.ts            # Inserts page_layouts rows for home with real content
    ├── about.ts
    ├── membership.ts
    ├── chapters.ts
    ├── events.ts
    ├── donations.ts
    ├── contact.ts
    ├── leadership.ts
    ├── gallery.ts
    └── alma-mater.ts
```

The seed runner uses `ON CONFLICT DO UPDATE` throughout — safe to re-run at any time. Section thumbnails are uploaded to the `section-thumbnails` Supabase Storage bucket during seeding.

#### 14.8.3 Adding a New Section Component (Developer Workflow)

1. Build the React component in `frontend/components/public/sections/`
2. Define its TypeScript content type in `frontend/lib/section-config-types.ts`
3. Register it in `frontend/lib/section-registry.ts` (maps `component` + `variant` string → React component)
4. Write one or more library entries (with `default_content` and `content_schema`) in `supabase/seed-content/section-library.ts`
5. Run the seed script — the new variants appear in the Section Library drawer immediately
6. No Admin Panel code changes needed — the Content Editor renders from `content_schema` automatically

---

### 14.9 Visual Builder Database Tables Summary

| Table | Purpose |
|---|---|
| `site_settings` | Brand tokens (colors, fonts), global config, SEO meta per page |
| `section_library` | Pre-designed and admin-saved variants — fixed layout per variant, default content + schema |
| `page_layouts` | Placed section instances per page — ordered, with admin-edited content JSONB |

---

## 15. Email Notification System

Powered by **Resend** (recommended) or Brevo SMTP via Nodemailer. Resend has a Next.js-native SDK (`resend` npm package), React Email for template rendering, and a generous free tier (3,000 emails/month). All transactional emails are sent by Supabase Edge Functions.

### 15.1 Transactional Emails

| Email Type | Trigger | Recipient |
|---|---|---|
| Welcome / Pending Review | Successful registration | New member |
| Account Approved | Admin approves registration | Member |
| Account Rejected | Admin rejects registration | Applicant |
| Payment Receipt | Payment completed | Member / Donor |
| Manual Payment Pending | Manual payment submitted | Admin |
| Manual Payment Approved | Admin approves manual payment | Member / Donor |
| Manual Payment Rejected | Admin rejects manual payment | Member / Donor |
| Membership Renewal Reminder | 30 days before expiry | Member |
| Membership Expiry Warning | 7 days before expiry | Member |
| Membership Expired | Day of expiry | Member |
| RSVP Confirmation | Member RSVPs to event | Member |
| Event Reminder | 24 hours before event | RSVPed member |
| Event Cancelled | Admin cancels event | All RSVPed members |
| Password Reset | User requests reset | User (handled by Supabase Auth) |
| Contact Form Submission | Guest submits contact form | Admin |
| Donation Receipt | Donation completed | Donor |
| New Event Published | Admin publishes event | All active members |

### 15.2 Email Templates

All emails are built as React Email components (`.tsx` files) with BUPEXSA USA branding (logo, primary purple, sky blue). Templates are stored in `frontend/emails/`. Dynamic data is passed as props (e.g. `memberName`, `amount`, `eventTitle`). Resend renders the React component to HTML at send time. A plain-text fallback is generated automatically. Bulk announcement emails include an unsubscribe link (CAN-SPAM compliance).

### 15.3 Scheduled Email Jobs (Edge Function Cron)

Supabase Edge Functions support cron scheduling via Supabase's `pg_cron` extension:

- Daily at 08:00 UTC: query members with `expiry_date = NOW() + 30 days` → send renewal reminder
- Daily at 08:00 UTC: query members with `expiry_date = NOW() + 7 days` → send expiry warning
- Daily at 08:00 UTC: query members with `expiry_date = TODAY` → send expired notice
- Hourly: query events with `start_datetime` between `NOW()` and `NOW() + 25 hours` → send RSVP reminder if not already sent

---

## 16. Core Data Models (Supabase Schema)

### 16.1 Members

```sql
CREATE TABLE members (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  membership_id TEXT UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  graduation_year INT NOT NULL,
  batch TEXT,
  us_state TEXT NOT NULL,
  profession TEXT,
  avatar_path TEXT,                -- Supabase Storage path
  chapter_id UUID REFERENCES chapters(id),
  status TEXT NOT NULL DEFAULT 'PENDING'
    CHECK (status IN ('PENDING','ACTIVE','EXPIRED','SUSPENDED','REJECTED')),
  join_date DATE,
  expiry_date DATE,
  how_did_you_hear TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 16.2 Other Key Tables

| Table | Key Fields |
|---|---|
| chapters | id, name, slug, state, description, banner_image_path, is_active |
| chapter_excos | id, chapter_id, name, title, photo_path, bio, order_index |
| events | id, title, slug, description (JSONB), start_datetime, end_datetime, location_name, location_address, chapter_id, category, thumbnail_path, max_attendees, is_published |
| rsvps | id, member_id, event_id, status (CONFIRMED, CANCELLED, WAITLISTED), created_at |
| payments | id, member_id, type, amount, method, status, stripe_intent_id, paypal_order_id, proof_storage_path, receipt_sent |
| donations | id, donor_name, donor_email, member_id (nullable), amount, message, is_anonymous, method, status |
| notifications | id, member_id, type, title, body, is_read, created_at |
| gallery_images | id, storage_path, alt_text, category, chapter_id (nullable), uploaded_at |
| announcements | id, title, body, is_published, publish_date, expires_at |
| site_settings | id, key (unique), value — theme tokens, global config, SEO meta |
| **section_library** | **id, name, description, component, category, tags, thumbnail_path, default_config (JSONB), is_system, created_by** |
| **page_layouts** | **id, page_key, section_key, component, order_index, visible, config (JSONB), is_draft** |

> Note: The `section_content` and `section_content_drafts` tables from v2.0 are replaced. Section content is now stored directly in `page_layouts.config` (JSONB), eliminating a join and making section operations atomic.

### 16.3 Row-Level Security Policies (Examples)

```sql
-- Members can only read their own row
CREATE POLICY "Members read own profile"
  ON members FOR SELECT
  USING (auth.uid() = id);

-- Members can update their own row
CREATE POLICY "Members update own profile"
  ON members FOR UPDATE
  USING (auth.uid() = id);

-- Admins can read all members
CREATE POLICY "Admins read all members"
  ON members FOR SELECT
  USING (auth.jwt() ->> 'role' = 'admin');

-- Public can read published events
CREATE POLICY "Public reads published events"
  ON events FOR SELECT
  USING (is_published = true);

-- site_settings, page_layouts, section_content: public can read, only admin can write
CREATE POLICY "Public reads site config"
  ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admin writes site config"
  ON site_settings FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');
```

---

## 17. API Structure (Supabase Edge Functions)

Supabase auto-generates REST and GraphQL APIs for all tables (respecting RLS). Custom business logic that cannot be expressed as simple table reads/writes is handled by **Supabase Edge Functions** (TypeScript running on Deno).

### 17.1 Edge Functions List

| Function Name | Trigger | Description |
|---|---|---|
| `stripe-create-intent` | POST `/functions/v1/stripe-create-intent` | Creates a Stripe Payment Intent server-side |
| `paypal-create-order` | POST `/functions/v1/paypal-create-order` | Creates a PayPal Order |
| `stripe-webhook` | POST `/functions/v1/stripe-webhook` | Receives and verifies Stripe webhook events |
| `paypal-webhook` | POST `/functions/v1/paypal-webhook` | Receives and verifies PayPal webhook events |
| `approve-payment` | POST `/functions/v1/approve-payment` | Admin approves a manual payment, activates membership |
| `reject-payment` | POST `/functions/v1/reject-payment` | Admin rejects a manual payment, notifies member |
| `approve-member` | POST `/functions/v1/approve-member` | Admin approves registration, assigns membership ID |
| `send-bulk-email` | POST `/functions/v1/send-bulk-email` | Sends bulk email to filtered member list |
| `generate-receipt-pdf` | POST `/functions/v1/generate-receipt-pdf` | Generates PDF receipt and returns download URL |
| `send-rsvp-reminders` | CRON (hourly) | Queries upcoming events, sends 24h reminders |
| `send-renewal-reminders` | CRON (daily) | Queries expiring members, sends renewal emails |
| `publish-page` | POST `/functions/v1/publish-page` | Moves draft section content to live, triggers ISR revalidation |
| `revalidate-page` | POST `/functions/v1/revalidate-page` | Calls Next.js ISR revalidation endpoint for a given path |

### 17.2 Direct Supabase Client Calls (No Edge Function Needed)

The following are handled directly by the Supabase client SDK in Next.js server components or API routes, since RLS handles access control:

- Fetch all published events (public)
- Fetch event by slug (public)
- Fetch chapters list (public)
- Fetch chapter by slug (public)
- Fetch member profile (member reads own)
- Update member profile (member updates own)
- Create RSVP (member)
- Cancel RSVP (member)
- Fetch own payment history (member)
- Fetch notifications (member)
- Mark notifications as read (member)
- Fetch site_settings / page_layouts / section_content (public read)
- Admin: all table reads/writes via service-role client (server-side only)

---

## 18. SEO Requirements

All SEO requirements from v1.0 are retained. Next.js 14 App Router provides the Metadata API for per-page meta tags.

### 18.1 On-Page SEO

- Unique `<title>` and `<meta name="description">` per page — stored in `site_settings` and editable via Admin Panel Settings
- Structured heading hierarchy (one H1, logical H2/H3)
- SEO-friendly URLs: `/membership`, `/chapters/texas`, `/events/annual-gala-2025`
- Alt text on all images — required field when uploading to Supabase Storage via Admin Panel
- Open Graph tags (`og:title`, `og:image`, `og:description`) on all pages
- Twitter Card meta tags
- Schema.org structured data: Organization, Event, BreadcrumbList

### 18.2 Technical SEO

- Next.js SSR/SSG ensures all public pages are fully crawlable
- `next-sitemap` generates `sitemap.xml` automatically on build
- `robots.txt`: allow all public paths; block `/dashboard`, `/admin`
- Canonical URLs on all pages
- Lazy-loaded images via Next.js `<Image>` component — Supabase Storage image transforms provide automatic WebP conversion and resizing
- Core Web Vitals target: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Google Analytics 4 via gtag — Measurement ID stored in `site_settings` and injected by root layout

---

## 19. Security Requirements

### 19.1 Authentication & Authorization

- JWT tokens stored in HTTP-only, Secure, SameSite=Strict cookies via `@supabase/ssr`
- All protected Next.js routes check auth status in middleware before rendering
- Admin routes additionally verify `app_metadata.role = "admin"` from the JWT
- RLS enforces data isolation at the database layer — application-level auth is a secondary defense
- Google OAuth PKCE flow (Supabase default) prevents authorization code interception

### 19.2 Data Security

- All inputs validated server-side in Edge Functions using Zod
- Supabase Storage private buckets for payment proofs and sensitive uploads — admin-only access policies
- Public buckets (avatars, gallery images) use signed URLs with expiry for sensitive content
- SQL injection impossible — all queries go through Supabase's parameterized PostgREST layer
- XSS prevention via Next.js built-in escaping + Content Security Policy headers
- CORS configured on Edge Functions to allow only `bupexsausa.org` and local dev origins

### 19.3 Payment Security

- Stripe and PayPal secret keys never leave Edge Function environment variables
- Stripe webhook signature verified on every request before processing
- Payment amounts always validated server-side by Edge Function — client-submitted amounts are never trusted
- PCI compliance fully delegated to Stripe / PayPal — no raw card data stored anywhere

### 19.4 Admin Panel Security

- Admin Panel routes protected by middleware checking `role = "admin"` JWT claim
- Service role key (bypasses RLS) is used only in server-side Edge Functions — never exposed to the browser
- All Admin Panel write operations go through Edge Functions, not direct client-side Supabase calls
- Admin session expires after 7 days; shorter expiry can be configured in Supabase Auth settings

### 19.5 Infrastructure Security

- All traffic over HTTPS (TLS 1.3) — enforced by Vercel (frontend) and Supabase (backend)
- All secrets stored in Vercel environment variables and Supabase project secrets — never committed to Git
- Supabase database not publicly accessible — only accessible via Supabase APIs and internal connections
- Automated daily database backups with point-in-time recovery (Supabase Pro tier; configurable on free tier via pg_dump cron)

---

## 20. Non-Functional Requirements

| Requirement | Specification | Implementation |
|---|---|---|
| Page Load Speed | LCP < 3 seconds | Next.js SSG + Vercel Edge CDN + Supabase Storage CDN |
| Mobile Responsive | All breakpoints | Tailwind CSS responsive utilities |
| Availability | 99%+ uptime | Vercel + Supabase managed infrastructure (both have SLA) |
| Scalability | Handles 2,000+ members | Supabase serverless scales automatically; stateless Edge Functions |
| Browser Support | Modern browsers | Chrome, Firefox, Safari, Edge — last 2 major versions |
| Accessibility | WCAG 2.1 AA | Semantic HTML, aria labels, keyboard navigation, dnd-kit accessible drag-and-drop |
| GDPR / Privacy | Basic compliance | Privacy policy page, data deletion on request (anonymize flow in Admin Panel) |
| Email Deliverability | Low spam rate | SPF/DKIM on domain; Resend verified sending domain |
| Image Performance | WebP, lazy load | Next.js Image + Supabase Storage transform API (`?format=webp`) |
| Realtime Updates | < 1 second latency | Supabase Realtime WebSocket subscriptions |

---

## 21. Recommended Project Structure

```
bupexsa-usa/
├── frontend/                    # Next.js 14 App Router
│   ├── app/
│   │   ├── (public)/            # Public website pages
│   │   │   ├── page.tsx         # Home — renders from page_layouts DB rows
│   │   │   ├── about/
│   │   │   ├── membership/
│   │   │   ├── chapters/[slug]/
│   │   │   ├── events/[slug]/
│   │   │   ├── donations/
│   │   │   ├── contact/
│   │   │   ├── gallery/
│   │   │   └── leadership/
│   │   ├── (auth)/              # Auth pages
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── reset-password/
│   │   ├── dashboard/           # Member dashboard (protected)
│   │   │   ├── page.tsx
│   │   │   ├── profile/
│   │   │   ├── payments/
│   │   │   └── events/
│   │   └── admin/               # Admin Panel (protected, role=admin)
│   │       ├── page.tsx         # Admin dashboard overview
│   │       ├── members/
│   │       ├── payments/
│   │       ├── events/
│   │       ├── chapters/
│   │       ├── donations/
│   │       ├── gallery/
│   │       ├── notifications/
│   │       ├── settings/
│   │       └── visual-builder/
│   │           ├── theme/           # Theme editor
│   │           ├── layout/          # Layout manager (reorder/show/hide)
│   │           ├── page-builder/    # Section Library + page composition
│   │           │   ├── page.tsx     # Split: Page Canvas + Library Drawer
│   │           │   └── [page-key]/  # Per-page builder view
│   │           └── content/         # Content Block Editor (per-section form)
│   ├── components/
│   │   ├── public/
│   │   │   └── sections/            # All section React components
│   │   │       ├── HeroSection.tsx
│   │   │       ├── CardGridSection.tsx
│   │   │       ├── StatsBarSection.tsx
│   │   │       ├── EventsPreviewSection.tsx
│   │   │       ├── FaqSection.tsx
│   │   │       ├── ImageTextSection.tsx
│   │   │       ├── TextBlockSection.tsx
│   │   │       ├── DonationCtaSection.tsx
│   │   │       ├── TeamGridSection.tsx
│   │   │       ├── GalleryStripSection.tsx
│   │   │       ├── GalleryGridSection.tsx
│   │   │       ├── AnnouncementsSection.tsx
│   │   │       ├── ChapterSpotlightSection.tsx
│   │   │       ├── ContactFormSection.tsx
│   │   │       ├── AlmaMaterSection.tsx
│   │   │       ├── TestimonialSection.tsx
│   │   │       ├── SpacerSection.tsx
│   │   │       ├── DividerSection.tsx
│   │   │       ├── FullWidthImageSection.tsx
│   │   │       └── CustomHtmlSection.tsx
│   │   ├── dashboard/               # Member dashboard components
│   │   ├── admin/                   # Admin panel UI components
│   │   │   ├── SectionLibraryDrawer.tsx
│   │   │   ├── SectionLibraryCard.tsx
│   │   │   ├── PageCanvas.tsx
│   │   │   ├── ContentBlockEditor.tsx
│   │   │   └── ThemeEditor.tsx
│   │   └── ui/                      # Shared design system components
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   └── middleware.ts
│   │   ├── section-registry.ts      # Maps component name → React component
│   │   ├── section-config-types.ts  # TypeScript types for each section's config
│   │   ├── stripe.ts
│   │   ├── paypal.ts
│   │   └── utils.ts
│   ├── emails/                      # React Email templates
│   └── public/                      # Static assets
│
└── supabase/                        # Supabase project config
    ├── functions/                   # Edge Functions (Deno TypeScript)
    │   ├── stripe-create-intent/
    │   ├── stripe-webhook/
    │   ├── paypal-create-order/
    │   ├── paypal-webhook/
    │   ├── approve-member/
    │   ├── approve-payment/
    │   ├── send-bulk-email/
    │   ├── send-rsvp-reminders/
    │   ├── send-renewal-reminders/
    │   ├── publish-page/
    │   ├── revalidate-page/
    │   ├── generate-receipt-pdf/
    │   └── generate-section-thumbnail/  # Puppeteer screenshot for Save to Library
    ├── migrations/
    │   ├── 001_initial_schema.sql
    │   ├── 002_rls_policies.sql
    │   ├── 003_section_library.sql       # section_library + page_layouts tables
    │   └── 004_triggers.sql
    └── seed-content/                    # Seed scripts
        ├── index.ts                     # Entry point
        ├── section-library.ts           # All library variants with default_config JSONB
        ├── site-settings.ts             # Theme tokens, global config
        └── pages/                       # Per-page page_layouts seed
            ├── home.ts
            ├── about.ts
            ├── membership.ts
            ├── chapters.ts
            ├── events.ts
            ├── donations.ts
            ├── contact.ts
            ├── leadership.ts
            ├── gallery.ts
            └── alma-mater.ts
```

---

## 22. Environment Variables Reference

All secrets stored in Vercel environment variables (frontend) and Supabase project secrets (Edge Functions). Never committed to version control. Use `.env.example` with placeholder values.

### Frontend (Vercel)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (safe for frontend) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (safe for frontend, RLS applies) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key — server-side only, never exposed to browser |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (safe for frontend) |
| `NEXTAUTH_SECRET` | Random secret for cookie signing (used by `@supabase/ssr`) |
| `NEXT_PUBLIC_SITE_URL` | Production URL (https://bupexsausa.org) |
| `REVALIDATION_SECRET` | Secret token for ISR revalidation endpoint |

### Edge Functions (Supabase Secrets)

| Variable | Description |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `PAYPAL_CLIENT_ID` | PayPal app client ID |
| `PAYPAL_CLIENT_SECRET` | PayPal app secret |
| `RESEND_API_KEY` | Resend API key for transactional email |
| `EMAIL_FROM` | Sender address (e.g. `BUPEXSA USA <no-reply@bupexsausa.org>`) |
| `REVALIDATION_SECRET` | Shared secret for calling Vercel ISR revalidation |
| `NEXT_PUBLIC_SITE_URL` | Used by Edge Functions to call the Next.js revalidation endpoint |

---

## 23. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Supabase free tier limits hit | Medium | Monitor usage; upgrade to Pro ($25/month) at ~300 members |
| Manual payment fraud | High | Require screenshot + admin approval before activation |
| Email deliverability | Medium | SPF/DKIM on domain; Resend verified sending domain |
| Member data privacy | High | Supabase RLS; HTTPS everywhere; data anonymization on deletion |
| Spam registrations | Medium | reCAPTCHA v3 on registration; admin approves all registrations |
| Admin building a broken page layout | Low | Sections are pre-built React components — admin configures content only, cannot break rendering; draft/preview before publish |
| Section Library growing too large to browse | Low | Category filter tabs + search box in Library Drawer; max ~100 system variants expected |
| Admin saving too many custom library variants | Low | Custom variants have a soft limit of 50 per admin; old variants can be deleted from the library |
| Thumbnail generation failing (Save to Library) | Low | Puppeteer Edge Function has a fallback to a default placeholder thumbnail; admin can retry |
| Seed script running on production DB | High | Seed script checks for `NODE_ENV !== 'production'` guard; separate `seed:dev` and `seed:initial` npm scripts; seed is idempotent via ON CONFLICT DO UPDATE |
| ISR cache staleness | Low | `revalidate` set to 60 seconds; admin can manually trigger revalidation from Admin Panel |
| Google OAuth token expiry | Low | Supabase Auth handles refresh automatically |
| Payment disputes / refunds | Medium | Refund policy in Terms of Service; admin manages via Stripe and PayPal dashboards |

---

## 24. Future Enhancements (Post-Launch)

| Enhancement | Description |
|---|---|
| Analytics Dashboard | Visual charts in Admin Panel: member growth, revenue trends, event attendance |
| Chapter Leader Role | Limited admin role for chapter reps — manage their chapter's content and EXCO only |
| Member Directory | Opt-in searchable alumni directory |
| Discussion Forum | Chapter-based or national notice board |
| Mobile App | React Native app using Supabase client SDK directly (same auth, same DB) |
| SMS Notifications | Twilio integration via Supabase Edge Function for event reminders |
| Recurring Donations | Stripe subscription-based recurring donation |
| Scholarship Module | Apply for and manage BUPEXSA scholarship applications |
| Job Board | Alumni post and apply for jobs within the community |
| A/B Testing for Page Sections | Test two versions of a section via feature flags; track performance in GA4 |
| Multi-language Support | French language toggle (EN/FR) for bilingual alumni |
| Supabase Storage CDN Custom Domain | Serve storage assets from `media.bupexsausa.org` for branded URLs |

---

## Brand & Design Specifications

### Color Palette

| Color Role | Hex | Usage |
|---|---|---|
| Primary Purple | #6B21A8 | Headings, primary buttons, admin header |
| Sky Blue | #0EA5E9 | Secondary actions, links, highlights |
| Dark Indigo | #1E1B4B | Body text, dark backgrounds |
| Light Purple Bg | #EDE9FE | Card backgrounds, section tints |
| Light Blue Bg | #E0F2FE | Info sections, note boxes |
| White | #FFFFFF | Main page background |
| Gray (light) | #F3F4F6 | Table rows, input backgrounds |
| Gray (mid) | #6B7280 | Subtitles, placeholders, footer text |

### Typography

- Heading font: Inter — Bold 700 (default; admin can change via Theme Editor)
- Body font: Inter — Regular 400, Medium 500
- Base size: 16px (1rem), line height 1.6
- Code/mono: JetBrains Mono

### Design Principles

- White background as primary canvas
- Purple as dominant brand color for primary actions and headings
- Sky blue as accent for secondary elements
- Consistent 8px spacing grid (Tailwind default)
- Border radius: `rounded-lg` (8px) for cards, `rounded-full` for badges
- Subtle shadows on cards (`shadow-md`)
- All values exposed as CSS custom properties and controllable via the Theme Editor

---

*BUPEXSA USA Alumni Management Platform — PRD v2.2*
*bupexsausa.org · © 2026 BUPEXSA USA · Confidential*
