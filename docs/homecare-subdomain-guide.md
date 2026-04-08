# SevaLink Homecare Subdomain — Developer Guide

> **Subdomain:** `homecare.sevalinkcare.com`
> **Parent site:** `www.sevalinkcare.com` (landing page)
> **Goal:** The homecare site must look like a natural extension of the main site — same brand, colors, typography, header/footer layout — so users never feel they've left SevaLink.

---

## Table of Contents

1. [Tech Stack (match the landing page)](#1-tech-stack)
2. [Design System — Colors, Typography, Spacing](#2-design-system)
3. [Brand Assets](#3-brand-assets)
4. [Header — Full Code](#4-header)
5. [Footer — Full Code](#5-footer)
6. [Shared Dependencies](#6-shared-dependencies)
7. [Root Layout — Full Code](#7-root-layout)
8. [Global CSS — Minimal Required](#8-global-css)
9. [Page Structure & Conventions](#9-page-structure)
10. [Cross-Domain Navigation Rules](#10-cross-domain-navigation)
11. [Environment Variables](#11-environment-variables)
12. [Checklist Before Development](#12-checklist)

---

## 1. Tech Stack

Use the same stack as the landing page so shared components render identically:

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 16.x (App Router) | Framework |
| React | 19.x | UI |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| `tailwind-merge` | 3.x | Class merging |
| `clsx` | 2.x | Conditional classes |
| `framer-motion` | 12.x | Animations (footer uses it) |
| `lucide-react` | 0.577+ | Icons |
| `radix-ui` | 1.4+ | Sheet/dialog primitives (header mobile menu) |
| `class-variance-authority` | 0.7+ | Variant utility |
| `tw-animate-css` | 1.x | Tailwind animation plugin |
| `shadcn` | 3.x (dev) | Component generator |

### package.json dependencies (minimum required for layout)

```json
{
  "dependencies": {
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.35.1",
    "lucide-react": "^0.577.0",
    "next": "16.1.6",
    "radix-ui": "^1.4.3",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "tailwind-merge": "^3.4.1"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.6",
    "postcss": "^8",
    "shadcn": "^3.8.5",
    "tailwindcss": "^4",
    "tw-animate-css": "^1.4.0",
    "typescript": "^5"
  }
}
```

---

## 2. Design System

### 2.1 Colors (exact oklch values from landing page)

The homecare site uses **emerald as the primary accent** instead of red, but the underlying token system is identical.

#### Homecare color mapping:

| Role | Landing Page | Homecare Subdomain | Tailwind Class |
|------|-------------|-------------------|----------------|
| **Primary CTA** | Red `bg-red-600` | **Emerald** `bg-emerald-600` | Primary buttons, active states |
| **Primary hover** | `hover:bg-red-700` | `hover:bg-emerald-700` | Button hover |
| **Section labels** | `bg-red-100 text-red-600` | `bg-emerald-100 text-emerald-700` | Eyebrow badges |
| **Accent text** | `text-red-600` | `text-emerald-600` | Highlights in headings |
| **Link hover** | `hover:text-red-600` | `hover:text-emerald-600` | Nav links, footer |
| **Active nav** | `text-red-600 bg-red-50` | `text-emerald-600 bg-emerald-50` | Active route indicator |
| **Text body** | `text-gray-900` / `text-gray-700` | Same | No change |
| **Text muted** | `text-gray-500` / `text-gray-600` | Same | No change |
| **Backgrounds** | `bg-white`, `bg-gray-50` | Same | No change |
| **Header bg** | `bg-white` | Same | No change |
| **Footer bg** | `from-red-50/65 via-white to-red-50/40` | `from-emerald-50/65 via-white to-emerald-50/40` | Footer gradient |

> **Key rule:** Replace `red` → `emerald` only for interactive/brand elements (CTAs, labels, hover). Keep all neutral grays and white backgrounds identical.

#### CSS Variables (copy from landing page, no changes needed)

```css
:root {
  --radius: 0.625rem;
  --background: oklch(0.985 0.002 247);
  --foreground: oklch(0.208 0.042 265.755);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.208 0.042 265.755);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.208 0.042 265.755);
  --primary: oklch(0.577 0.245 27.325);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.968 0.007 247.858);
  --secondary-foreground: oklch(0.279 0.041 260.031);
  --muted: oklch(0.968 0.007 247.858);
  --muted-foreground: oklch(0.554 0.046 257.417);
  --accent: oklch(0.968 0.007 247.858);
  --accent-foreground: oklch(0.279 0.041 260.031);
  --destructive: oklch(0.505 0.213 27.518);
  --success: oklch(0.596 0.145 163.225);
  --success-foreground: oklch(1 0 0);
  --warning: oklch(0.769 0.188 70.08);
  --warning-foreground: oklch(0.208 0.042 265.755);
  --info: oklch(0.546 0.245 262.881);
  --info-foreground: oklch(1 0 0);
  --border: oklch(0.929 0.013 255.508);
  --input: oklch(0.929 0.013 255.508);
  --ring: oklch(0.577 0.245 27.325);
}
```

### 2.2 Typography

| Element | Font | Tailwind |
|---------|------|----------|
| Body text | Inter | `font-sans` (via `--font-inter`) |
| Headings | Inter | `font-sans` with `font-black` |
| Code/data | Geist Mono | `font-mono` (via `--font-geist-mono`) |

#### Heading Scale (standardized across all sections)

```
H2: text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight
H3: text-xl sm:text-2xl lg:text-3xl font-bold
H4: text-lg font-bold
```

### 2.3 Spacing

#### Section padding (identical to landing page)

```css
.landing-section-spacing {
  @apply py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8;
}
```

#### Container width

```
max-w-7xl mx-auto w-full
```

> **Rule:** One layer of padding only. Either the `<section>` has `px-*` (via `landing-section-spacing`) OR the inner container has `px-*` — never both.

### 2.4 Border Radius Scale

```
--radius: 0.625rem (10px)
Cards:     rounded-2xl (16px)
Buttons:   rounded-lg (8px) or rounded-xl (12px)
Badges:    rounded-full
Inputs:    rounded-lg
```

---

## 3. Brand Assets

Copy these files from the landing page `public/assets/brand/` into the homecare project:

```
public/
  assets/
    brand/
      SevaLink-logo-r.png      ← Full logo (used in header + footer)
      SevaLink-icon.png         ← Square icon (favicon, manifest)
      sevalink-icon-only.png    ← Icon only
      SevaLink-icon-f.png       ← Alternate icon
```

> Use the **same SevaLink logo** — do NOT create a separate "SevaLink Homecare" logo. The brand stays unified. The header itself communicates "this is homecare" via the nav content and emerald accent.

---

## 4. Header — Full Code

### `components/layout/header.tsx`

This is a simplified version of the landing page header, adapted for homecare:
- Emerald accent instead of red
- Nav links point to homecare pages
- "Back to SevaLink" link to the main site
- No emergency/homecare toggle (we're already on homecare)

```tsx
'use client';

import { useState, useEffect } from "react";
import { HousePlus, Menu, Stethoscope, HeartHandshake, Activity } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MAIN_SITE_URL = process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? "https://www.sevalinkcare.com";

const navLinks = [
  { label: "Nurse at Home", href: "/nurse-at-home" },
  { label: "Elder Care", href: "/elder-care" },
  { label: "Doctor Visit", href: "/doctor-visit" },
  { label: "Post-Surgery", href: "/post-surgery-care" },
];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActivePath = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-0 shadow-none [transform:translateZ(0)]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between md:h-16">
          <div className="flex items-center justify-between h-12 sm:h-16 md:h-auto md:shrink-0">
            {/* Logo — links to homecare home */}
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <Image
                src="/assets/brand/SevaLink-logo-r.png"
                alt="SevaLink Home Care"
                width={440}
                height={110}
                className="h-16 sm:h-20 md:h-24 w-auto object-contain transition-all duration-300"
                priority
              />
            </Link>

            {/* Mobile Toggle */}
            {mounted && (
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <button
                    className="md:hidden p-2 text-gray-900 focus:outline-none"
                    aria-label="Toggle Menu"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[70%] p-0 border-none bg-white">
                  <SheetHeader className="sr-only">
                    <SheetTitle>Navigation Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col h-full">
                    <div className="p-6 border-b border-gray-100 flex items-center">
                      <Link href="/" className="flex items-center gap-2 group cursor-pointer" onClick={() => setMobileOpen(false)}>
                        <Image
                          src="/assets/brand/SevaLink-logo-r.png"
                          alt="SevaLink Home Care"
                          width={400}
                          height={100}
                          className="h-[5.5rem] sm:h-20 md:h-20 w-auto object-contain transition-all duration-300"
                        />
                      </Link>
                    </div>

                    <nav className="p-6 flex flex-col gap-2">
                      {navLinks.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className={`px-4 py-3 text-base font-semibold rounded-lg transition-all ${
                            isActivePath(link.href)
                              ? "text-emerald-600 bg-emerald-50"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}

                      {/* Back to main site */}
                      <a
                        href={MAIN_SITE_URL}
                        className="px-4 py-3 text-sm text-gray-500 hover:text-emerald-600 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        ← Back to SevaLink
                      </a>

                      <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col gap-3">
                        <Link
                          href="/book"
                          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-emerald-600 !text-white visited:!text-white hover:!text-white active:!text-white text-base font-semibold hover:bg-emerald-700 hover:shadow-lg transition-all text-center cursor-pointer border-none"
                          onClick={() => setMobileOpen(false)}
                        >
                          <HousePlus className="w-5 h-5" />
                          Book Home Care
                        </Link>
                      </div>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center justify-center flex-1 gap-1 px-2 mx-auto ml-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`px-4 py-2 text-sm font-semibold transition-colors relative group ${
                  isActivePath(link.href) ? "text-emerald-600" : "text-gray-700 hover:text-emerald-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Back to main site link */}
            <a
              href={MAIN_SITE_URL}
              className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-emerald-600 transition-colors"
            >
              ← SevaLink
            </a>
          </nav>

          {/* CTA - Desktop */}
          <div className="hidden md:flex items-center gap-2 md:shrink-0 pr-2">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 !text-white visited:!text-white hover:!text-white active:!text-white text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl cursor-pointer border-none"
            >
              <HousePlus className="w-4 h-4" />
              Book Home Care
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
```

### Key differences from landing page header:

| Aspect | Landing Page | Homecare |
|--------|-------------|----------|
| Accent color | `red-600` | `emerald-600` |
| Active nav | `text-red-600 bg-red-50` | `text-emerald-600 bg-emerald-50` |
| CTA buttons | 2 (Book Ambulance + Book Home Care) | 1 (Book Home Care only) |
| Emergency/Homecare toggle | Yes | No |
| Nav links | Services, Provider | Nurse at Home, Elder Care, Doctor Visit, Post-Surgery |
| Cross-site link | — | "← Back to SevaLink" → main site |
| Logo alt text | "SevaLink" | "SevaLink Home Care" |

---

## 5. Footer — Full Code

### `components/layout/footer.tsx`

Adapted from landing page footer with homecare-specific links and emerald gradient.

```tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, ArrowUp } from 'lucide-react';
import { FloatingMedicalIcons } from '../ui/medical-background';

const MAIN_SITE_URL = process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? "https://www.sevalinkcare.com";

const footerLinks = {
  "Home Care Services": [
    { name: "Nurse at Home", href: "/nurse-at-home" },
    { name: "Elder Care", href: "/elder-care" },
    { name: "Doctor Home Visit", href: "/doctor-visit" },
    { name: "Post-Surgery Care", href: "/post-surgery-care" },
  ],
  "Company": [
    { name: "About SevaLink", href: `${MAIN_SITE_URL}/about`, external: true },
    { name: "Contact Us", href: `${MAIN_SITE_URL}/contact`, external: true },
    { name: "Help Center", href: `${MAIN_SITE_URL}/help`, external: true },
    { name: "Emergency Services", href: MAIN_SITE_URL, external: true },
  ],
};

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-emerald-50/65 via-white to-emerald-50/40 text-black">
      <FloatingMedicalIcons />
      <div className="absolute inset-0 z-0 bg-white/45" />
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="relative z-10">
        <div className="pt-4 md:pt-6 pb-8 border-b border-black/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 mb-4">

              {/* Column 1: Brand + About */}
              <div>
                <Link href="/" className="inline-flex items-center gap-2 mb-4">
                  <Image src="/assets/brand/SevaLink-logo-r.png" alt="SevaLink" width={520} height={140} className="h-20 sm:h-24 md:h-32 w-auto object-contain" />
                </Link>
                <p className="text-sm text-black mb-5 leading-relaxed line-clamp-4 transition-colors duration-300 hover:text-emerald-600">
                  Professional home care services — nursing, elder care, doctor visits & post-surgery support by verified professionals.
                </p>
                <div className="flex items-center gap-2 text-sm text-black transition-colors duration-300 hover:text-emerald-600">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Rajkot, Gujarat, India</span>
                </div>
              </div>

              {/* Column 2: Home Care Services */}
              <div>
                <h4 className="text-sm font-bold text-emerald-600 mb-4 uppercase tracking-wider">Home Care Services</h4>
                <ul className="space-y-3">
                  {footerLinks["Home Care Services"].map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm text-black inline-block cursor-pointer transition-colors duration-300 hover:text-emerald-600 hover:translate-x-1 transition-all">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Company */}
              <div>
                <h4 className="text-sm font-bold text-emerald-600 mb-4 uppercase tracking-wider">Company</h4>
                <ul className="space-y-3">
                  {footerLinks.Company.map((link) => (
                    <li key={link.name}>
                      {link.external ? (
                        <a href={link.href} className="text-sm text-black hover:translate-x-1 transition-all duration-300 inline-block underline-offset-2 hover:text-emerald-600">
                          {link.name}
                        </a>
                      ) : (
                        <Link href={link.href} className="text-sm text-black hover:translate-x-1 transition-all duration-300 inline-block underline-offset-2 hover:text-emerald-600">
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="py-10 border-t border-black/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
              <motion.div className="text-center md:text-left" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                <p className="text-xs text-black font-medium hover:text-emerald-600 transition-colors">
                  {`© ${new Date().getFullYear()} SevaLink. All rights reserved.`}
                </p>
                <p className="text-xs text-black/80 mt-1 hover:text-emerald-600 transition-colors">
                  Professional home care services in Rajkot, Gujarat
                </p>
              </motion.div>
              <div className="mt-2 md:mt-0 w-full md:w-auto flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-3 sm:gap-4 text-xs text-black text-center">
                <a href={`${MAIN_SITE_URL}/privacy-policy`} className="whitespace-nowrap hover:translate-x-0.5 hover:text-emerald-600 transition-all">Privacy Policy</a>
                <span className="hidden sm:block w-1 h-1 bg-black/30 rounded-full" />
                <a href={`${MAIN_SITE_URL}/terms-and-conditions`} className="whitespace-nowrap hover:translate-x-0.5 hover:text-emerald-600 transition-all">Terms & Conditions</a>
                <span className="hidden sm:block w-1 h-1 bg-black/30 rounded-full" />
                <a href={`${MAIN_SITE_URL}/refund-policy`} className="whitespace-nowrap hover:translate-x-0.5 hover:text-emerald-600 transition-all">Refund Policy</a>
                <span className="hidden sm:block w-1 h-1 bg-black/30 rounded-full" />
                <motion.button onClick={scrollToTop} className="text-black flex items-center gap-2 group font-semibold hover:gap-3 hover:text-emerald-600 transition-all" whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                  Back to top
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                    <ArrowUp className="w-4 h-4" />
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

### Key differences from landing page footer:

| Aspect | Landing Page | Homecare |
|--------|-------------|----------|
| Gradient | `from-red-50/65` | `from-emerald-50/65` |
| MapPin color | `text-red-600` | `text-emerald-600` |
| Section headings | `text-red-600` | `text-emerald-600` |
| Hover color | `hover:text-red-600` | `hover:text-emerald-600` |
| Columns | 4 (Services, Providers, Company, Brand) | 3 (Brand, Home Care Services, Company) |
| Legal links | Internal (`/privacy-policy`) | External → main site |
| Tagline | "Made for faster emergency response in India" | "Professional home care services in Rajkot, Gujarat" |
| Company links | Internal routes | External `<a>` links to main site |

---

## 6. Shared Dependencies

These files must be copied identically from the landing page. **Do not modify them.**

### `lib/utils.ts`

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### `components/ui/sheet.tsx`

```tsx
"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import { Dialog as SheetPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
```

### `components/ui/medical-background.tsx`

```tsx
"use client";

const ICONS = [
  { left: "3%",  top: "10%", size: 32, dur: "14s", delay: "0s" },
  { left: "10%", top: "55%", size: 20, dur: "18s", delay: "1.5s" },
  { left: "18%", top: "30%", size: 38, dur: "12s", delay: "3s" },
  { left: "25%", top: "65%", size: 24, dur: "16s", delay: "0.8s" },
  { left: "33%", top: "15%", size: 28, dur: "20s", delay: "2s" },
  { left: "42%", top: "48%", size: 16, dur: "13s", delay: "4s" },
  { left: "50%", top: "8%",  size: 30, dur: "17s", delay: "1s" },
  { left: "58%", top: "60%", size: 22, dur: "11s", delay: "2.5s" },
  { left: "65%", top: "35%", size: 36, dur: "19s", delay: "0.3s" },
  { left: "73%", top: "20%", size: 18, dur: "15s", delay: "3.5s" },
  { left: "80%", top: "55%", size: 26, dur: "22s", delay: "1.2s" },
  { left: "88%", top: "12%", size: 32, dur: "10s", delay: "4.5s" },
  { left: "93%", top: "45%", size: 20, dur: "16s", delay: "2.8s" },
  { left: "47%", top: "70%", size: 28, dur: "14s", delay: "0.5s" },
];

export function FloatingMedicalIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      <div style={{
        position: "absolute", top: "25%", left: "25%",
        width: "384px", height: "384px",
        background: "radial-gradient(circle, rgba(167,243,208,0.4) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(60px)"
      }} />
      <div style={{
        position: "absolute", bottom: "25%", right: "25%",
        width: "384px", height: "384px",
        background: "radial-gradient(circle, rgba(167,243,208,0.3) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(60px)"
      }} />
      {ICONS.map((icon, i) => (
        <div
          key={i}
          className="float-icon"
          style={{
            left: icon.left,
            top: icon.top,
            animationDuration: icon.dur,
            animationDelay: icon.delay,
          }}
        >
          <svg
            width={icon.size}
            height={icon.size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      ))}
    </div>
  );
}
```

> **Note for homecare:** The `FloatingMedicalIcons` glow colors above are changed from red/orange to emerald (`rgba(167,243,208,…)`) to match the homecare accent. The landing page uses `rgba(254,202,202,…)` (red) and `rgba(254,215,170,…)` (orange). The float-icon color is set in CSS (see Section 8).

---

## 7. Root Layout — Full Code

### `app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://homecare.sevalinkcare.com";
const mainSiteUrl = process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? "https://www.sevalinkcare.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "SevaLink Home Care — Professional Nursing & Elder Care in Rajkot",
    template: "%s — SevaLink Home Care",
  },

  description:
    "Book verified home care services in Rajkot. Nurse at home, elder care, doctor home visits & post-surgery care by SevaLink's trusted professionals.",

  keywords: [
    "home care Rajkot",
    "nurse at home Rajkot",
    "elder care Gujarat",
    "doctor home visit Rajkot",
    "post surgery care at home",
    "homecare services",
    "SevaLink",
    "home nursing Rajkot",
  ],

  authors: [{ name: "SevaLink" }],

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "SevaLink Home Care",
    title: "SevaLink Home Care — Nursing & Elder Care in Rajkot",
    description:
      "Book verified home care professionals in Rajkot. Nursing, elder care, doctor visits & post-surgery support.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SevaLink Home Care — Professional Care at Your Door",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SevaLink Home Care — Nursing & Elder Care in Rajkot",
    description: "Book trusted home care services in Rajkot, Gujarat.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/assets/brand/SevaLink-icon.png", type: "image/png" },
    ],
    apple: [{ url: "/assets/brand/SevaLink-icon.png" }],
  },

  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": `${mainSiteUrl}/#organization`,
        name: "SevaLink",
        url: mainSiteUrl,
        logo: `${mainSiteUrl}/assets/brand/SevaLink-logo-r.png`,
        description: "Home care, emergency ambulance, and hospital appointment platform in Rajkot, Gujarat, India.",
        areaServed: {
          "@type": "City",
          name: "Rajkot",
          containedInPlace: {
            "@type": "State",
            name: "Gujarat",
            containedInPlace: { "@type": "Country", name: "India" },
          },
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "SevaLink Home Care",
        publisher: { "@id": `${mainSiteUrl}/#organization` },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
```

---

## 8. Global CSS — Minimal Required

### `app/globals.css`

Only include what the layout needs. Feature pages can add their own keyframes.

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

html, body {
  max-width: 100vw;
  overflow-x: hidden;
}

html {
  scroll-behavior: smooth;
}

a {
  text-decoration: none;
  color: inherit;
}

/* Hide scrollbar */
*::-webkit-scrollbar { display: none; }
* {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* ================================================================
   Design Tokens — copy ALL :root and .dark blocks from landing page
   (Section 2.1 above). They are identical.
   ================================================================ */

@theme inline {
  --font-sans: var(--font-inter);
  --font-heading: var(--font-inter);
  --font-mono: var(--font-geist-mono);

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-4xl: calc(var(--radius) + 16px);
}

/* Copy the FULL :root { ... } and .dark { ... } blocks from
   the landing page globals.css — they define all oklch color values.
   See Section 2.1 above for the complete :root block. */

:root {
  --radius: 0.625rem;
  --background: oklch(0.985 0.002 247);
  --foreground: oklch(0.208 0.042 265.755);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.208 0.042 265.755);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.208 0.042 265.755);
  --primary: oklch(0.577 0.245 27.325);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.968 0.007 247.858);
  --secondary-foreground: oklch(0.279 0.041 260.031);
  --muted: oklch(0.968 0.007 247.858);
  --muted-foreground: oklch(0.554 0.046 257.417);
  --accent: oklch(0.968 0.007 247.858);
  --accent-foreground: oklch(0.279 0.041 260.031);
  --destructive: oklch(0.505 0.213 27.518);
  --success: oklch(0.596 0.145 163.225);
  --success-foreground: oklch(1 0 0);
  --warning: oklch(0.769 0.188 70.08);
  --warning-foreground: oklch(0.208 0.042 265.755);
  --info: oklch(0.546 0.245 262.881);
  --info-foreground: oklch(1 0 0);
  --border: oklch(0.929 0.013 255.508);
  --input: oklch(0.929 0.013 255.508);
  --ring: oklch(0.577 0.245 27.325);
  --chart-1: oklch(0.577 0.245 27.325);
  --chart-2: oklch(0.546 0.245 262.881);
  --chart-3: oklch(0.596 0.145 163.225);
  --chart-4: oklch(0.769 0.188 70.08);
  --chart-5: oklch(0.627 0.265 303.9);
  --sidebar: oklch(0.984 0.003 247.858);
  --sidebar-foreground: oklch(0.208 0.042 265.755);
  --sidebar-primary: oklch(0.577 0.245 27.325);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.968 0.007 247.858);
  --sidebar-accent-foreground: oklch(0.279 0.041 260.031);
  --sidebar-border: oklch(0.929 0.013 255.508);
  --sidebar-ring: oklch(0.577 0.245 27.325);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

@layer utilities {
  .section-spacing {
    @apply py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8;
  }

  .section-container {
    @apply max-w-7xl mx-auto w-full;
  }

  .section-heading {
    @apply text-center mb-12 sm:mb-16;
  }

  .section-h2 {
    @apply text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight;
  }

  .section-label {
    @apply inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-black tracking-widest uppercase mb-4;
  }
}

/* Float animation for medical background icons */
@keyframes floatUp {
  0%   { transform: translateY(0px) translateX(0px) rotate(0deg) scale(1); opacity: 0.15; }
  25%  { transform: translateY(-30px) translateX(10px) rotate(22deg) scale(1.1); opacity: 0.35; }
  50%  { transform: translateY(-60px) translateX(20px) rotate(45deg) scale(1.2); opacity: 0.4; }
  75%  { transform: translateY(-30px) translateX(10px) rotate(67deg) scale(1.1); opacity: 0.25; }
  100% { transform: translateY(0px) translateX(0px) rotate(90deg) scale(1); opacity: 0.15; }
}

.float-icon {
  position: absolute;
  animation: floatUp linear infinite;
  color: #059669; /* emerald-600 — landing page uses #DC2626 (red) */
  opacity: 0.15;
}
```

---

## 9. Page Structure & Conventions

### 9.1 File structure

```
homecare-subdomain/
├── app/
│   ├── globals.css          ← from Section 8
│   ├── layout.tsx           ← from Section 7
│   ├── page.tsx             ← Homecare landing/home
│   ├── book/
│   │   └── page.tsx         ← Booking flow
│   ├── nurse-at-home/
│   │   └── page.tsx         ← Feature page
│   ├── elder-care/
│   │   └── page.tsx         ← Feature page
│   ├── doctor-visit/
│   │   └── page.tsx         ← Feature page
│   ├── post-surgery-care/
│   │   └── page.tsx         ← Feature page
│   └── sitemap.ts
├── components/
│   ├── layout/
│   │   ├── header.tsx       ← from Section 4
│   │   └── footer.tsx       ← from Section 5
│   └── ui/
│       ├── sheet.tsx         ← from Section 6
│       └── medical-background.tsx ← from Section 6
├── lib/
│   └── utils.ts             ← from Section 6
└── public/
    └── assets/
        └── brand/
            ├── SevaLink-logo-r.png
            └── SevaLink-icon.png
```

### 9.2 Every page template

Every page wraps content with Header and Footer:

```tsx
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function NurseAtHomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-[3.5rem] sm:pt-[4.5rem] md:pt-16">
        {/* Your feature page content here */}
      </main>
      <Footer />
    </div>
  );
}
```

> **`pt-[3.5rem] sm:pt-[4.5rem] md:pt-16`** — This top padding offsets the fixed header. Use this exact value on every page's `<main>`.

### 9.3 Section pattern

```tsx
<section className="section-spacing bg-white">
  <div className="section-container">
    <div className="section-heading">
      <span className="section-label">Service Name</span>
      <h2 className="section-h2">
        Heading Text <span className="text-emerald-600">Accent</span>
      </h2>
      <p className="text-gray-500 mt-4 text-sm sm:text-base max-w-2xl mx-auto">
        Subtext here
      </p>
    </div>
    {/* Section content */}
  </div>
</section>
```

### 9.4 Background rhythm

Alternate section backgrounds for visual separation:

```
Section 1: bg-white
Section 2: bg-gray-50
Section 3: bg-white
Section 4: bg-emerald-50/40  (accent section)
Section 5: bg-white
```

---

## 10. Cross-Domain Navigation Rules

| Link target | Use | Example |
|-------------|-----|---------|
| Homecare internal page | `<Link href="/...">` (Next.js) | `/nurse-at-home`, `/book` |
| Main site page | `<a href="https://www.sevalinkcare.com/...">` | `/about`, `/contact`, `/services` |
| Legal pages | `<a href="https://www.sevalinkcare.com/privacy-policy">` | Privacy, Terms, Refund |

> **Never use `target="_blank"` for cross-domain SevaLink links.** Same-tab navigation keeps the user in the SevaLink ecosystem.

---

## 11. Environment Variables

### `.env.example`

```env
# Site URL — this subdomain
NEXT_PUBLIC_SITE_URL=https://homecare.sevalinkcare.com

# Main SevaLink site — used for cross-links (About, Contact, Legal, etc.)
NEXT_PUBLIC_MAIN_SITE_URL=https://www.sevalinkcare.com

# Support phone
NEXT_PUBLIC_SUPPORT_PHONE=+919876543210
NEXT_PUBLIC_SUPPORT_PHONE_DISPLAY=+91 98765 43210
```

---

## 12. Checklist Before Development

- [ ] Clone the folder structure from Section 9.1
- [ ] Copy brand assets from landing page `public/assets/brand/`
- [ ] Copy `lib/utils.ts`, `components/ui/sheet.tsx`, `components/ui/medical-background.tsx` (homecare version from Section 6)
- [ ] Use the header code from Section 4 exactly
- [ ] Use the footer code from Section 5 exactly
- [ ] Use the layout code from Section 7 exactly
- [ ] Use the globals.css from Section 8 exactly
- [ ] Create `.env` from Section 11
- [ ] Verify header renders at same height as landing page
- [ ] Verify footer renders with same spacing as landing page
- [ ] Verify nav links point to correct homecare routes
- [ ] Verify "← Back to SevaLink" links to main site in same tab
- [ ] Verify legal links (Privacy, Terms, Refund) point to main site
- [ ] Create OG image (`public/og-image.jpg` — 1200×630) with emerald theme
- [ ] Create `public/favicon.ico` and `public/site.webmanifest` (same SevaLink icon)
- [ ] **Focus only on feature pages** — Header, Footer, Layout, CSS are done

---

## Quick Visual Comparison

```
┌──────────────────────────────────────────────────────────────┐
│  LANDING PAGE (www.sevalinkcare.com)                         │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ [Logo]  Services  Provider  [🔴 Book Ambulance] [🟢 HC]│  │ ← Red + Green CTAs
│  └────────────────────────────────────────────────────────┘  │
│  ... page content ...                                        │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Footer: red-50 gradient, red accents                    │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  HOMECARE (homecare.sevalinkcare.com)                         │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ [Logo]  Nurse  Elder  Doctor  Post-Op  ← SL  [🟢 Book]│  │ ← Single emerald CTA
│  └────────────────────────────────────────────────────────┘  │
│  ... feature page content ...                                │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Footer: emerald-50 gradient, emerald accents            │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

Same logo. Same font. Same layout. Same spacing. Only the accent shifts from **red → emerald** and the nav content changes to homecare services.
