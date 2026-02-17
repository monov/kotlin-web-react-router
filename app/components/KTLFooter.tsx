import { useState, useEffect, type ComponentType } from "react";
import { ThemeProvider } from "@rescui/ui-contexts";

function FooterSkeleton() {
    const pillStyle = (w: number, h = 10) => ({
        width: w,
        height: h,
        borderRadius: 3,
        background: "rgba(255,255,255,0.1)",
    });

    return (
        <footer
            style={{
                background: "rgba(39, 40, 44, 1)",
                padding: "48px 0",
                minWidth: 320,
                boxSizing: "border-box" as const,
            }}
        >
            <div style={{ maxWidth: 1276, margin: "0 auto", padding: "0 32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={pillStyle(96, 12)} />
                    <div style={{ display: "flex", gap: 12 }}>
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                style={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: 12,
                                    background: "rgba(255,255,255,0.1)",
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 32,
                        marginTop: 32,
                    }}
                >
                    {[4, 5, 3, 4].map((rows, col) => (
                        <div key={col} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {Array.from({ length: rows }).map((_, i) => (
                                <div key={i} style={pillStyle(60 + Math.round((col * 17 + i * 23) % 50))} />
                            ))}
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: 48 }}>
                    <div style={pillStyle(80, 16)} />
                    <div style={{ ...pillStyle(320), marginTop: 8 }} />
                </div>
            </div>
        </footer>
    );
}

export function KtlFooter() {
    const [Footer, setFooter] = useState<ComponentType<any> | null>(null);

    useEffect(() => {
        Promise.all([
            // @ts-ignore
            import("@jetbrains/kotlin-web-site-ui/dist/footer.js"),
            import("@jetbrains/kotlin-web-site-ui/dist/footer.css"),
        ]).then(([mod]) => setFooter(() => mod.default));
    }, []);

    if (!Footer) return <FooterSkeleton />;
    return (
        <ThemeProvider theme="dark">
            <Footer />
        </ThemeProvider>
    );
}