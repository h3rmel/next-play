import { useGameStore } from '@/store/game-store';

export function useGameViewModel() {
  const { 
    teams, 
    incrementScore, 
    decrementScore, 
    resetMatch, 
    resetGame 
  } = useGameStore();

  return {
    teams,
    
    incrementTeamScore: (teamId: string) => {
      incrementScore(teamId);
    },
    
    decrementTeamScore: (teamId: string) => {
      decrementScore(teamId);
    },
    
    resetCurrentMatch: () => {
      resetMatch();
    },
    
    resetEntireGame: () => {
      resetGame();
    }
  };
} 