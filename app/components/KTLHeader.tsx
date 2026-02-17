import { useState, useEffect, type ComponentType } from "react";

interface HeaderProps {
    productWebUrl?: string;
    hasSearch?: boolean;
    [key: string]: any;
}

function HeaderSkeleton() {
    return (
        <header
            style={{
                height: 64,
                background: "rgba(39, 40, 44, 1)",
                display: "flex",
                alignItems: "center",
                padding: "0 32px",
                boxSizing: "border-box",
                boxShadow: "inset 0 -1px rgba(255, 255, 255, 0.3)",
            }}
        >
            <svg width="100" height="24" viewBox="0 0 100 24" fill="none">
                <rect width="24" height="24" rx="4" fill="rgba(255,255,255,0.15)" />
                <rect x="32" y="6" width="60" height="12" rx="3" fill="rgba(255,255,255,0.1)" />
            </svg>

            <div style={{ display: "flex", gap: 24, marginLeft: "auto" }}>
                {[56, 40, 72, 64, 48].map((w, i) => (
                    <div
                        key={i}
                        style={{
                            width: w,
                            height: 12,
                            borderRadius: 3,
                            background: "rgba(255,255,255,0.1)",
                        }}
                    />
                ))}
            </div>
        </header>
    );
}

export function KtlHeader(props: HeaderProps) {
    const [Header, setHeader] = useState<ComponentType<any> | null>(null);

    useEffect(() => {
        Promise.all([
            // @ts-ignore
            import("@jetbrains/kotlin-web-site-ui/dist/header.js"),
            import("@jetbrains/kotlin-web-site-ui/dist/header.css"),
        ]).then(([mod]) => setHeader(() => mod.default));
    }, []);

    if (!Header) return <HeaderSkeleton />;
    return <Header {...props} />;
}