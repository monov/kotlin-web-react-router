# Migration Report: SSR Compatibility Issues & Fixes

## 1. SSR-Unsafe Browser API Usage in Components

The original project rendered everything client-side, so components freely used browser APIs (`window`, `document`, `localStorage`) during render. These all crash on the server where those globals don't exist.

### HeaderSection — `window.innerWidth`

**Problem:** The original code called `window.innerWidth < 768` directly in the render body to decide how many cards to show.

**Fix:** Replaced with `useState(false)` + `useEffect` — defaults to desktop (4 cards) during SSR, then checks the real viewport width on the client after mount.

### UsageSection — `localStorage`

**Problem:** `localStorage.getItem('kotlin-testimonials-order')` was called directly during render to read the saved sort preference.

**Fix:** Added a `typeof window !== 'undefined'` guard so it returns `null` on the server. The sort state defaults to "Default" during SSR, then picks up the saved preference on the client.

### ProgrammingLanguage — `Math.random()` at module level

**Problem:** `const initialIndex = Math.floor(Math.random() * tabs.length)` was evaluated at module scope. On the server this produces a random value that won't match the client's random value, causing a React hydration mismatch.

**Fix:** Changed to `useState(0)` (deterministic initial value) + `useEffect` that randomizes the tab after mount. The first tab renders during SSR, then a random tab is picked on the client.

### ProgrammingLanguage — `document.createElement` for syntax highlighting

**Problem:** The original used `document.createElement('code')` + `hljs.highlightBlock(el)` to highlight Kotlin code. `document` doesn't exist on the server.

**Fix:** Replaced with `hljs.highlight('kotlin', code).value` which is a pure string operation that works in any environment — no DOM needed.

## 2. `@jetbrains/kotlin-web-site-ui` Header & Footer — Not SSR-Compatible

**Problem:** The `@jetbrains/kotlin-web-site-ui` package (v3.1.0) ships as a pre-minified webpack CommonJS/IIFE bundle (`dist/header.js`, `dist/footer.js`) with separate CSS files (`dist/header.css`, `dist/footer.css`). This makes it incompatible with Vite's SSR bundling because:

- **CSS files are standalone** — not imported from the JS, so Node.js during SSR can't process them. Vite only handles CSS imports within modules listed in `ssr.noExternal`.
- **Browser-only APIs at runtime** — the header bundle contains `ResizeObserver`, `MutationObserver`, `document.body`, touch event handlers, `window.navigator`, etc.
- **Not ESM** — the bundle uses `module.exports` and an IIFE wrapper, not standard `import`/`export`.



### Attempted upgrade to v4.14.4

The newer version (v4) of `kotlin-web-site-ui` ships an `out/` directory with proper ESM modules (Rollup-built) and `import './index.css'` entries — structurally identical to `@rescui`. However, upgrading introduced additional issues:


1.**`@react-hook/resize-observer` accesses `window.ResizeObserver` during render** — not inside a `useEffect`, but in the body of the `useResizeObserver` hook. This crashes on the server since `window` is undefined.

### Final approach: client-only loading with SSR skeleton

Since the package can't be server-rendered without significant workarounds, the header and footer are loaded dynamically on the client via `useEffect` + dynamic `import()`. An SSR-safe **skeleton placeholder** is rendered on the server that matches the real component's layout, dimensions, and dark color scheme (`rgba(39, 40, 44, 1)` background, `rgba(255,255,255,0.1)` placeholder pills). This:

- Avoids all SSR crashes from browser-only APIs
- Provides correct layout dimensions during SSR (64px header, ~200px footer) to prevent content layout shift
- Transitions smoothly to the real components after hydration
