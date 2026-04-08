# SevaLink Home Care — Web Frontend

> **Subdomain:** `homecare.sevalinkcare.com`
> **Parent site:** `www.sevalinkcare.com`

Professional home care booking platform — nursing, elder care, doctor home visits & post-surgery support in Rajkot, Gujarat.

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 14.2 (App Router) | Framework |
| React | 18.3 | UI |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| Framer Motion | 12.x | Animations |
| Lucide React | 1.x | Icons |
| Radix UI | 1.4 | Sheet/dialog primitives |
| Geist | 1.x | Mono font |

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
NEXT_PUBLIC_SITE_URL=https://homecare.sevalinkcare.com
NEXT_PUBLIC_MAIN_SITE_URL=https://www.sevalinkcare.com
```

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Design tokens, utilities, animations
│   ├── layout.tsx           # Root layout (fonts, SEO, JSON-LD)
│   └── page.tsx             # Home page
├── components/
│   ├── home/
│   │   └── HeroSearch.tsx   # Hero section with service search
│   ├── layout/
│   │   ├── Header.tsx       # Fixed header with nav + mobile menu
│   │   └── Footer.tsx       # Footer with emerald gradient
│   └── ui/
│       ├── sheet.tsx         # Radix Sheet primitive
│       └── medical-background.tsx  # Floating medical icons
└── lib/
    └── utils.ts             # cn() utility
```

## Design System

- **Accent color:** Emerald (`bg-emerald-600`) — replaces red from the landing page
- **Fonts:** Inter (body/headings) + Geist Mono (code/data)
- **Color tokens:** oklch values matching the landing page (see `globals.css`)

## Documentation

See [`docs/`](docs/) for:
- [Developer Onboarding Guide](docs/developer-guide.md)
- [Homecare Subdomain Guide](docs/homecare-subdomain-guide.md)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
