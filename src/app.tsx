import { useState, useEffect } from "react";
import { useGameStore } from "@/store/game-store";
import { PlayerInputView } from "@/views/player-input-view";
import { GameView } from "@/views/game-view";
import { HistoryView } from "@/views/history-view";
import { ThemeToggle } from "@/components/theme-toggle";
import { OfflineFallback } from "@/components/offline-fallback";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { History } from "lucide-react";
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
  const setStage = useGameStore((state) => state.setStage);
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

  const goToHistoryView = () => {
    setStage("history");
  };

  if (!isOnline) {
    return <OfflineFallback />;
  }

  return (
    <div className="flex flex-col min-h-screen gap-4 p-2 sm:p-0">
      <header>
        <div className="flex gap-4 justify-between items-center px-4 fixed top-4 right-4 z-10">
          <ThemeToggle />
          {(stage === "playerInput" || stage === "game") && (
            <Button
              variant="ghost"
              size="icon"
              onClick={goToHistoryView}
              title="Ver histórico de sorteios"
            >
              <History className="size-5" />
            </Button>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center py-6 sm:py-8 text-primary">
          Próxima Jogada
        </h1>
      </header>
      <main className="flex-1 container mx-auto">
        {isInstallPromptShown && (
          <Alert className="flex items-center justify-between max-w-md mx-auto mb-4">
            <AlertTitle>Instale o aplicativo para usar offline.</AlertTitle>
            <AlertDescription>
              <Button onClick={handleInstallClick} variant="outline">
                Instalar
              </Button>
            </AlertDescription>
          </Alert>
        )}
        {stage === "playerInput" ? (
          <PlayerInputView />
        ) : stage === "game" ? (
          <GameView />
        ) : (
          <HistoryView />
        )}
      </main>
    </div>
  );
}
