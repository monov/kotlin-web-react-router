declare module "*.jsx" {
    import type { ComponentType } from "react";
    const component: ComponentType<any>;
    export default component;
    export const HeaderSection: ComponentType<any>;
    export const LatestFromKotlinSection: ComponentType<any>;
    export const WhyKotlinSection: ComponentType<any>;
    export const UsageSection: ComponentType<any>;
    export const StartSection: ComponentType<any>;
    export const ProgrammingLanguage: ComponentType<any>;
    export const Section: ComponentType<any>;
    export const Container: ComponentType<any>;
}
