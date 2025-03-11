import { useGameStore } from '@/store/game-store';

export function usePlayerInputViewModel() {
  const { 
    players, 
    addPlayer, 
    removePlayer, 
    clearPlayers,
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
    
    removeAllPlayers: () => {
      clearPlayers();
    },
    
    canProceed: () => players.length >= 2,
    
    proceedToGame: () => {
      if (players.length >= 2) {
        goToNextStage();
      }
    }
  };
} 