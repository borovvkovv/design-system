/// <reference types="vite/client" />
/// <reference types="string-hash" />

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends ImportMetaEnv {}
  }
}

interface ImportMetaEnv {
  readonly VITE_LAYOUT_PAGE_EXAMPLE: string;
}
