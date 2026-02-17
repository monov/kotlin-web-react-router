import { ThemeProvider } from "@rescui/ui-contexts";
import { HeaderSection } from "~/components/index/header-section";
import { LatestFromKotlinSection } from "~/components/index/latest-from-kotlin-section";
import { WhyKotlinSection } from "~/components/index/why-kotlin-section";
import { UsageSection } from "~/components/index/usage-section";
import { StartSection } from "~/components/index/start-section";
import "../components/index/index.scss";

export function meta() {
    return [
        { title: "Kotlin Programming Language" },
        { name: "description", content: "Kotlin Programming Language" },
    ];
}

export default function Home() {
    return (
        <ThemeProvider theme="dark">
            <div className="overview-page">
                <HeaderSection />
                <LatestFromKotlinSection />
                <WhyKotlinSection />
                <UsageSection />
                <StartSection />
            </div>
        </ThemeProvider>
    );
}