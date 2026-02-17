import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";

import "./css/grid.scss";
import "./css/styles-v2.scss";

import { KtlHeader } from "./components/KTLHeader";
import { KtlFooter } from "./components/KTLFooter";

import "@rescui/typography/lib/font-jb-sans-auto.css";

import type { Route } from "./+types/root";

export const links: Route.LinksFunction = () => [
    { rel: "dns-prefetch", href: "//fonts.googleapis.com" },
    { rel: "dns-prefetch", href: "//fonts.gstatic.com" },

    {
        rel: "preload",
        href: "/assets/fonts/JetBrainsMono/JetBrainsMono-Regular.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
    },
    {
        rel: "preload",
        href: "/assets/fonts/JetBrainsMono/JetBrainsMono-Bold.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
    },
    {
        rel: "preload",
        href: "/assets/fonts/JetBrainsMono/JetBrainsMono-Italic.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
    },

    { rel: "icon", type: "image/svg+xml", href: "/assets/images/favicon.svg" },
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="page__index-new page_restyled_v2">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Kotlin Programming Language</title>

            <meta property="og:title" content="Kotlin Programming Language" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://kotlinlang.org/" />
            <meta property="og:site_name" content="Kotlin" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@kotlin" />
            <meta name="twitter:title" content="Kotlin Programming Language" />

            <Meta />
            <Links />
        </head>
        <body>
        <div className="global-layout">
            <KtlHeader
                productWebUrl="https://github.com/JetBrains/kotlin/releases/tag/v1.6.20"
                hasSearch={false}
            />
            {children}
            <KtlFooter />
        </div>
        <ScrollRestoration />
        <Scripts />
        </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "uh-oh!\n" +
                "You surely know what this means.\n" +
                "We can't find the page you're looking for. "
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main style={{ padding: "1rem", height: "100vh", display: "flex" , alignItems: "center" , justifyContent: "center", flexDirection: "column", fontWeight: 700}}>
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre style={{ overflow: "auto" }}>
          <code>{stack}</code>
        </pre>
            )}
        </main>
    );
}