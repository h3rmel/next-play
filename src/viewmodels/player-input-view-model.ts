import { useGameStore } from '@/store/game-store';

export function usePlayerInputViewModel() {
  const { 
    players, 
    addPlayer, 
    removePlayer, 
    goToNextStage 
  } = useGameStore();

  return {
    players,
    
    addNewPlayer: (name: string) => {
      if (name.trim()) {
        addPlayer(name.trim());
        return true;
      }
      return false;
    },
    
    removePlayerById: (id: string) => {
      removePlayer(id);
    },
    
    canProceed: () => players.length >= 2,
    
    proceedToGame: () => {
      if (players.length >= 2) {
        goToNextStage();
      }
    }
  };
} 