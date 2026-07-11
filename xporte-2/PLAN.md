# Plan: UI Redesign - Real B2B Business Feel

Phase 1 (buyer flow: directory -> showroom -> RFQ form) is built and working. Problem: it reads like a component demo, not a real trade platform. This phase redesigns everything around a "Trust & Authority" B2B direction and adds a proper landing page.

## Design direction

**Style: Trust & Authority (corporate marketplace).** Navy/slate corporate palette, one reserved accent color for CTAs only, certifications and metrics displayed prominently, conservative motion. Avoid: playful gradients, AI purple/pink, oversized rounded corners, emoji.

### Tokens (globals.css)

| Role | Value | Notes |
|------|-------|-------|
| Primary | `#0F172A` navy | buttons, headings |
| Accent / CTA | `#0369A1` trust blue | primary CTA, links, active states |
| Background | `#F8FAFC` | page bg; cards stay white |
| Foreground | `#020617` | |
| Border | `#E2E8F0` | prefer 1px borders over shadows |
| Destructive | `#DC2626` | |

- Radius: tighten to ~0.5rem (corporate, not bubbly)
- Font: Plus Jakarta Sans (headings 600-800, body 400) via next/font, replaces Geist
- Numbers (prices, MOQ, stats): `tabular-nums`
- Spacing on an 8px rhythm; section padding py-16/py-24 on landing

## What makes it feel "real business" (applies everywhere)

1. **Shared chrome**: sticky top nav (logo, Vendors, How it works, "Become a vendor" ghost, "Browse vendors" primary) + full footer (4 columns: product, company, legal, contact + certifications strip). Right now pages float in a void; this is the single biggest fix.
2. **Trust signals as first-class UI**: "Verified" badge with shield icon on vendors, response rate, on-time shipment stat, member-since, certification badges everywhere they matter.
3. **Real-world microcopy**: "Get quotes within 24h", "No commission on first order", "128 RFQs sent this month". Numbers build credibility.
4. **Density and hierarchy**: B2B users scan; tighter cards, uppercase kicker labels (text-xs tracking-wide text-muted), clear h1/h2 scale, breadcrumbs on deep pages.
5. **Restraint**: white cards on `#F8FAFC`, 1px borders, hover = border darkens + subtle translate, transitions 150-200ms, no decorative animation.

## Pages

### 1. `/` - New landing page (Enterprise Gateway pattern)

Section order (trust-first conversion flow):

1. **Nav** (sticky, white, border-b)
2. **Hero**: kicker ("B2B sourcing platform"), h1 value prop ("Source directly from verified manufacturers"), subcopy, primary CTA "Browse vendor showrooms" + secondary "How it works", right side: stylized showroom preview card (not a stock illustration). Below: stat row (vendors, countries served, avg response time)
3. **Logo/category strip**: "Sourcing categories" chips (Home Textiles, Kitchenware, Spices & Food...)
4. **How it works**: 3 numbered steps with icons (Browse showroom -> Review specs & MOQ -> Send RFQ, quote within 24h)
5. **Featured showrooms**: 3 vendor cards (reuse redesigned VendorCard)
6. **Trust & safety**: verification process, certifications checked, secure communication; 3 cards with shield/file-check/message icons
7. **Testimonial**: one buyer quote with name, role, company
8. **CTA band**: navy bg, "Ready to source? Send your first RFQ today" + button
9. **Footer**

### 2. `/vendors` - Vendor directory (moves from `/`)

- Page header with breadcrumb, title, vendor count
- Search input + category filter chips (client-side filter over mock data)
- Redesigned vendor cards: verified badge, response rate, key certifications, "View showroom" affordance

### 3. `/showroom/[vendorId]` - Showroom

- Breadcrumb (Vendors / {name})
- **Header band**: subtle navy gradient or muted cover strip, vendor logo block overlapping it, name + verified badge, location, category
- **Stats row**: years in business, response time, export markets, certifications (4 bordered stat cells, not badges soup)
- **About** paragraph + certification badges with check icons

- Product Sheet stays but restyled to tokens
- **Sticky RFQ CTA**: on scroll, slim bottom bar (mobile) / persistent header button (desktop)

### 4. `/showroom/[vendorId]/rfq` - RFQ form

- Two-column desktop layout: form left, **summary sidebar** right (vendor card: name, verified, response time; selected products list updates live; "What happens next" 3 bullets)
- Same field sections, but: uppercase section kickers, helper text under complex fields, inline error styling per field
- Confirmation becomes a proper "RFQ submitted" page state: reference number (mock, e.g. RFQ-2026-0483), summary table, next-steps timeline
- Mobile: sidebar collapses to a compact vendor strip above the form

## Component work

```
components/
  site-header.tsx      # new: sticky nav, mobile menu (Sheet)
  site-footer.tsx      # new
  verified-badge.tsx   # new: shield icon + "Verified"
  stat.tsx             # new: label/value stat cell
  vendor-card.tsx      # redesign
  product-card.tsx     # redesign
  product-sheet.tsx    # restyle
  rfq-form.tsx         # restyle + summary sidebar
```

shadcn additions needed: none required; optionally `navigation-menu` for the header.

## Build order

1. Tokens + font in `globals.css` / `layout.tsx`, add site-header + site-footer to layout
2. Landing page at `/`, move directory to `/vendors` (update all links)
3. Directory redesign with search + category filters
4. Showroom redesign (header band, stats row, sticky CTA)
5. RFQ redesign (two-column + confirmation state)
6. Pass: responsive at 375/768/1024/1440, focus states, contrast check, reduced motion

## Out of scope

- Backend, auth, vendor onboarding flow (landing links to placeholders)
- Real images (keep neutral placeholder blocks, styled to tokens)
