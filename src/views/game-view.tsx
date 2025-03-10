import { ScoreboardView } from './scoreboard-view';

export function GameView() {
  return (
    <div className="container mx-auto py-4 sm:py-6 md:py-8 px-2 sm:px-4">
      {/* <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 md:mb-8">Voleibol - Placar</h1> */}
      <ScoreboardView />
    </div>
  );
} 