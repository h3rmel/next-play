import { useGameStore } from '@/store/game-store';

export function useGameViewModel() {
  const { 
    teams, 
    resetGame,
    reshuffleTeams,
    setStage
  } = useGameStore();

  return {
    teams,
    
    resetEntireGame: () => {
      resetGame();
    },
    
    reshuffleTeams: () => {
      reshuffleTeams();
    },
    
    goToHistoryView: () => {
      setStage('history');
    }
  };
} 