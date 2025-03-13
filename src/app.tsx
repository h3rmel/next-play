import { useState, useEffect } from "react";
import { useGameStore } from "@/store/game-store";
import { PlayerInputView } from "@/views/player-input-view";
import { GameView } from "@/views/game-view";
import { HistoryView } from "@/views/history-view";
import { ThemeToggle } from "@/components/theme-toggle";
import { OfflineFallback } from "@/components/offline-fallback";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { History, X } from "lucide-react";
import { Button } from "./components/ui/button";
import { cn } from "./lib/utils";

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
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isInstallPromptShown, setIsInstallPromptShown] = useState(false);
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const { stage, setStage } = useGameStore();

  // #region Handlers

  function handleInstallClick() {
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
  }

  function renderStage() {
    switch (stage) {
      case "playerInput":
        return <PlayerInputView />;
      case "game":
        return <GameView />;
      case "history":
        return <HistoryView />;
      default:
        return null;
    }
  }

  // #region Effects | PWA

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

  // #endregion

  if (!isOnline) {
    return <OfflineFallback />;
  }

  return (
    <div className={cn("flex flex-col gap-4", "min-h-screen")}>
      {/* Header */}
      <header
        className={cn(
          "sticky top-0 left-0 z-50",
          "w-full",
          "border-b border-border",
          "bg-background/30 backdrop-blur-sm"
        )}
      >
        <nav
          className={cn(
            "max-w-4xl mx-auto",
            "flex justify-between items-center",
            "py-4 px-4 sm:px-0"
          )}
        >
          <h1 className={cn("text-2xl font-bold")}>Próxima Jogada</h1>
          <section className={cn("flex gap-2 items-center")}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setStage("history")}
              title="Ver histórico de sorteios"
            >
              <History className="size-4" />
            </Button>
            <ThemeToggle />
          </section>
        </nav>
      </header>
      {/* Content */}
      <main className={cn("max-w-4xl w-full mx-auto", "sm:px-0 px-4")}>
        {isInstallPromptShown && (
          <Alert
            className={cn(
              "flex items-center justify-between",
              "max-w-lg w-full",
              "mx-auto mb-4"
            )}
          >
            <AlertTitle>Instale o aplicativo para usar offline.</AlertTitle>
            <AlertDescription className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsInstallPromptShown(false);
                }}
              >
                <X className="size-4" />
              </Button>
              <Button onClick={handleInstallClick} variant="outline">
                Instalar
              </Button>
            </AlertDescription>
          </Alert>
        )}
        {renderStage()}
      </main>
    </div>
  );
}
