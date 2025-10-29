/// <reference types="lodash" />
import { Root } from "postcss";
export interface ClassNameCollectorOptions {
    dest?: string;
    isModule?: boolean;
    exportAsDefault?: boolean;
}
export declare class ClassNameCollector {
    classNames: Map<string, undefined | Set<string>>;
    dest?: string;
    isModule?: boolean;
    exportAsDefault?: boolean;
    waiters: VoidFunction[];
    constructor(options: ClassNameCollectorOptions);
    debouncedWrite: import("lodash").DebouncedFunc<() => Promise<void>>;
    waitForWrite(): Promise<unknown>;
    addClassName(file: string, className: string): void;
    getClassNames(): string[];
    getTypeScriptFileContent(): string;
    process(root: Root): void;
}
