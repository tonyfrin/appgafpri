export {};

declare global {
  interface Window {
    Square: any; // Declaración del tipo de Square
    fbq?: (...args: any[]) => void;
    ReactNativeWebView?: {
        postMessage: (message: string) => void;
    };
  }
}
