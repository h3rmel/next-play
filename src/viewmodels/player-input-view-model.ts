import { useGameStore } from '@/store/game-store';

export function usePlayerInputViewModel() {
  const { 
    players, 
    addPlayer, 
    removePlayer, 
    clearPlayers,
    numberOfTeams,
    setNumberOfTeams,
    goToNextStage 
  } = useGameStore();

  return {
    players,
    numberOfTeams,
    
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

    updateNumberOfTeams: (count: number) => {
      setNumberOfTeams(count);
    },
    
    canProceed: () => players.length >= numberOfTeams,
    
    proceedToGame: () => {
      if (players.length >= numberOfTeams) {
        goToNextStage();
      }
    }
  };
} 