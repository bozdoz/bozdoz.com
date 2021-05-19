declare global {
  interface Window {
    /** server-side React saves page data to global variable */
    __INITIAL_HTML__: FrontMatterObject;
    __IS_404__?: boolean;
    /** Google Analytics */
    dataLayer?: unknown[];
    gtag?(...args: unknown[]): void;
    Prism?: Prism;
  }
}

/** Prism code highlighter */
interface Prism {
  highlightAll(): void;
}

// we must force tsc to interpret this file as a module
// see: https://stackoverflow.com/questions/47736473/how-to-define-global-function-in-typescript
export {};
