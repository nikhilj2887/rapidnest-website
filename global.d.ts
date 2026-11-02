declare global { interface Window { gtag?: (command: "event", name: string, parameters: Record<string, string | number | boolean>) => void; } }
export {};
