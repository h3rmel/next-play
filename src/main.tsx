import { createRoot } from "react-dom/client";
import { App } from "@/app";
import "@/assets/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { registerSW,  } from "virtual:pwa-register";

// Register service worker for PWA functionality
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("Nova versão disponível. Atualizar?")) {
      updateSW?.();
    }
  },
  onOfflineReady() {
    console.log("O aplicativo está pronto para uso offline");
  },
});

const root = createRoot(document.getElementById("root")!);

root.render(
  <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <Toaster closeButton position="bottom-center" />
    <App />
  </ThemeProvider>
);
