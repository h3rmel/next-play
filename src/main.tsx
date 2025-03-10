import { createRoot } from "react-dom/client";
import { App } from "@/app";
import "@/assets/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const root = createRoot(document.getElementById("root")!);

root.render(
  <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <Toaster closeButton position="bottom-center" />
    <App />
  </ThemeProvider>
);
