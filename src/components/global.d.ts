declare global {
  interface Window {
    /** server-side React saves page data to global variable */
    __INITIAL_HTML__: FrontMatterObject;
    /** Google Analytics */
    dataLayer?: any[];
    gtag?(...args: any[]): void;
  }
}

// we must force tsc to interpret this file as a module
// see: https://stackoverflow.com/questions/47736473/how-to-define-global-function-in-typescript
export {};
