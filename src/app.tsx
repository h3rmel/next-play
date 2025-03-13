import { useState, useEffect } from "react";
import { useGameStore } from "@/store/game-store";
import { PlayerInputView } from "@/views/player-input-view";
import { GameView } from "@/views/game-view";
import { ThemeToggle } from "@/components/theme-toggle";
import { OfflineFallback } from "@/components/offline-fallback";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { Button } from "./components/ui/button";

// Define BeforeInstallPromptEvent type
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function App() {
  const stage = useGameStore((state) => state.stage);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isInstallPromptShown, setIsInstallPromptShown] = useState(false);
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  // Track online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Handle PWA installation
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Store the event so it can be triggered later
      setInstallPrompt(e as BeforeInstallPromptEvent);
      // Show install button
      setIsInstallPromptShown(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) return;

    // Show the install prompt
    installPrompt.prompt();

    // Wait for the user to respond to the prompt
    installPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      // Clear the saved prompt since it can't be used again
      setInstallPrompt(null);
      setIsInstallPromptShown(false);
    });
  };

  if (!isOnline) {
    return <OfflineFallback />;
  }

  return (
    <div className="flex flex-col min-h-screen p-2 sm:p-0">
      <ThemeToggle />
      <header className="mx-auto mb-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center py-2 sm:py-4">
          Próxima Jogada
        </h1>
      </header>

      <main className="flex-1 container mx-auto">
        {isInstallPromptShown && (
          <Alert className="flex items-center justify-between max-w-md mx-auto mb-4">
            <AlertTitle>Instale o aplicativo para usar offline.</AlertTitle>
            <AlertDescription>
              <Button onClick={handleInstallClick}>Instalar</Button>
            </AlertDescription>
          </Alert>
        )}
        {stage === "playerInput" ? <PlayerInputView /> : <GameView />}
      </main>
    </div>
  );
}
