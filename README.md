# Kotlin Homepage — React Router 7 Migration

A migration of the [kotlinlang.org](https://kotlinlang.org) homepage from a Flask + client-side React setup to **React Router 7 Framework Mode** with **Server-Side Rendering**.

Based on the source project: [kotlin-web-site-jetsites-internship-2026](https://github.com/JetBrains/kotlin-web-site-jetsites-internship-2026)

## Stack

- **React Router 7** (Framework Mode, SSR enabled)
- **React 18**
- **@rescui** design system components (buttons, cards, tabs, typography)
- **@jetbrains/kotlin-web-site-ui** for header & footer (client-only, loaded dynamically)
- **SCSS** for styling
- **Vite** for bundling

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`.

## Production Build

```bash
npm run build
npm run start
```

## Project Structure

```
app/
├── components/
│   ├── index/              # Homepage sections
│   │   ├── header-section/
│   │   ├── latest-from-kotlin-section/
│   │   ├── why-kotlin-section/
│   │   ├── usage-section/
│   │   └── start-section/
│   ├── layout/             # Section & Container layout components
│   ├── KTLHeader.tsx       # Header wrapper (client-only with skeleton)
│   └── KTLFooter.tsx       # Footer wrapper (client-only with skeleton)
├── css/                    # Global SCSS (grid, reset, fonts)
├── routes/
│   └── home.tsx            # Homepage route
├── root.tsx                # Root layout
└── routes.ts               # Route configuration
public/
└── assets/                 # Images, fonts, static files
```

## Notes

See [REPORT.md](./REPORT.md) for details on SSR compatibility issues encountered during migration and how they were resolved.
