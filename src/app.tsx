import { useGameStore } from "@/store/game-store";
import { PlayerInputView } from "@/views/player-input-view";
import { GameView } from "@/views/game-view";
import { ThemeToggle } from "@/components/theme-toggle";

export function App() {
  const stage = useGameStore((state) => state.stage);

  return (
    <div className="flex flex-col min-h-screen p-2 sm:p-0">
      <ThemeToggle  />
      <header className="mx-auto mb-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center py-2 sm:py-4">
          Sorteador de Voleibol
        </h1>
      </header>

      <main className="flex-1 container mx-auto">
        {stage === "playerInput" ? <PlayerInputView /> : <GameView />}
      </main>
    </div>
  );
}
