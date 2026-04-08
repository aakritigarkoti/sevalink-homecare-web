# Developer Onboarding Guide

> Last updated: April 2026

This guide helps new developers get up to speed with the **SevaLink Home Care** frontend codebase.

---

## 1. Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | 18.x or 20.x |
| npm | 9.x+ |
| Git | 2.x+ |
| Editor | VS Code (recommended) |

### Recommended VS Code Extensions

- ESLint
- Tailwind CSS IntelliSense
- Prettier (optional — no config file yet, use defaults)

---

## 2. Getting Started

```bash
# Clone the repo
git clone <repo-url>
cd sevalink-homecare-web

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env if needed (defaults work for local dev)

# Start dev server
npm run dev
# → http://localhost:3000
```

---

## 3. Project Structure

```
sevalink-homecare-web/
├── public/
│   └── assets/brand/           # Logo files (shared with landing page)
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── globals.css         # Design tokens + utility classes
│   │   ├── layout.tsx          # Root layout (fonts, metadata, JSON-LD)
│   │   └── page.tsx            # Home page (Header + HeroSearch + Footer)
│   ├── components/
│   │   ├── home/               # Page-specific components
│   │   │   └── HeroSearch.tsx  # Hero section with service dropdown + search
│   │   ├── layout/             # Shared layout components
│   │   │   ├── Header.tsx      # Fixed navbar, mobile sheet menu
│   │   │   └── Footer.tsx      # Emerald gradient footer
│   │   └── ui/                 # Reusable UI primitives
│   │       ├── sheet.tsx       # Radix Dialog-based sheet (used by Header)
│   │       └── medical-background.tsx  # Floating cross icons (used by Footer)
│   └── lib/
│       └── utils.ts            # cn() — Tailwind class merge utility
├── docs/                       # Documentation
├── .env.example                # Environment variable template
├── next.config.mjs             # Next.js configuration
├── postcss.config.js           # PostCSS (Tailwind v4)
├── tsconfig.json               # TypeScript config
└── components.json             # shadcn/ui configuration
```

### Folder conventions

| Folder | Purpose | Naming |
|--------|---------|--------|
| `src/app/` | Routes and layouts | `page.tsx`, `layout.tsx` per Next.js convention |
| `src/components/home/` | Components only used on the home page | PascalCase: `HeroSearch.tsx` |
| `src/components/layout/` | Shared layout (Header, Footer) | PascalCase: `Header.tsx` |
| `src/components/ui/` | Generic UI primitives | lowercase: `sheet.tsx` |
| `src/lib/` | Shared utilities | lowercase: `utils.ts` |

When adding a new page (e.g. `/nurse-at-home`):
1. Create `src/app/nurse-at-home/page.tsx`
2. Page-specific components go in `src/components/nurse-at-home/`
3. Import `Header` and `Footer` in the page — the root layout does **not** wrap them

---

## 4. Architecture Decisions

### Header & Footer are NOT in the root layout

The root `layout.tsx` only provides:
- Font variables (`--font-inter`, `--font-geist-mono`)
- SEO metadata
- JSON-LD structured data

Each page imports `<Header />` and `<Footer />` individually. This allows pages to opt out of the standard layout if needed (e.g. a full-screen booking flow).

### No global state management

There is no Redux, Zustand, or Context provider in the layout. Add state management only when a feature requires it.

### CSS approach

- **Tailwind CSS v4** with `@theme inline` for design tokens
- **oklch color values** from the landing page (see `globals.css`)
- Emerald accent (`emerald-600`) replaces the landing page's red accent
- Utility classes defined in `globals.css`: `section-spacing`, `section-container`, `section-heading`, `section-label`

### Cross-domain navigation

- Internal links: use Next.js `<Link href="/path">`
- Links to main site (`www.sevalinkcare.com`): use plain `<a href={MAIN_SITE_URL + "/path"}>` — never `<Link>`
- Legal pages (Privacy, Terms, Refund) link externally to the main site

---

## 5. Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_SITE_URL` | `https://homecare.sevalinkcare.com` | Used in SEO metadata, JSON-LD |
| `NEXT_PUBLIC_MAIN_SITE_URL` | `https://www.sevalinkcare.com` | "Back to SevaLink" links, legal page URLs |

Both have fallback defaults in code, so the app works without `.env` for local development.

---

## 6. Key Components Reference

### `Header.tsx`
- Fixed position (`fixed top-0`)
- Desktop: logo + nav links + "← SevaLink" cross-link + "Book Home Care" CTA
- Mobile: hamburger → Radix Sheet sliding panel
- Active route highlighted with `text-emerald-600`

### `Footer.tsx`
- Emerald gradient background (`from-emerald-50/65`)
- 3-column grid: Brand, Home Care Services, Company
- `FloatingMedicalIcons` background animation
- External `<a>` tags for legal/company links to main site
- Framer Motion animations

### `HeroSearch.tsx`
- Emerald hero banner below header
- Service dropdown (Nurse at Home, Elder Care, Doctor Visit, Post-Surgery)
- Search input with link to selected service page
- Popular searches row
- Bottom service bar with icons

### `sheet.tsx`
- Wraps Radix UI Dialog as a sliding sheet
- Used by Header for mobile navigation
- Supports `side` prop: `"left" | "right" | "top" | "bottom"`

---

## 7. Adding New Pages

Example: adding `/nurse-at-home`

```tsx
// src/app/nurse-at-home/page.tsx
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NurseAtHomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Page content */}
      </main>
      <Footer />
    </div>
  );
}
```

Use `pt-20` (or similar) on `<main>` to clear the fixed header.

---

## 8. Build & Deploy

```bash
# Lint check
npm run lint

# Production build
npm run build

# Start production server
npm start
```

The build output is in `.next/`. All pages are statically generated where possible.

---

## 9. Brand Rules

- Use the **same SevaLink logo** as the main site — no separate "SevaLink Homecare" logo
- Replace `red` → `emerald` only for interactive/brand elements (CTAs, labels, hover states)
- Keep all neutral grays and white backgrounds identical to the landing page
- Logo files are in `public/assets/brand/`

---

## 10. Common Tasks

| Task | How |
|------|-----|
| Add a UI component | `npx shadcn@latest add <component>` — it uses `components.json` config |
| Change accent color | Update emerald classes in components + `color` in `.float-icon` in `globals.css` |
| Add a new nav link | Add to `navLinks` array in `Header.tsx` + `footerLinks` in `Footer.tsx` |
| Add a new service to hero | Add to `services` and `popularSearches` arrays in `HeroSearch.tsx` |
| Update SEO metadata | Edit `metadata` export in `src/app/layout.tsx` |
