import { ClassNameCollector, ClassNameCollectorOptions } from "./class-name-collector";
export declare function getSingleton(): ClassNameCollector;
export declare function createPlugin(collector: ClassNameCollector): {
    (userOptions: Partial<ClassNameCollectorOptions> | undefined): {
        postcssPlugin: string;
        Once(root: any): void;
    };
    postcss: boolean;
};
declare const _default: {
    (userOptions: Partial<ClassNameCollectorOptions> | undefined): {
        postcssPlugin: string;
        Once(root: any): void;
    };
    postcss: boolean;
};
export default _default;
