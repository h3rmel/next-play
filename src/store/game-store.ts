import { create } from 'zustand';
import { Player } from '@/models/player';
import { Team } from '@/models/team';

export type GameStage = 'playerInput' | 'game';

interface GameState {
  players: Player[];
  teams: Team[];
  stage: GameStage;
  
  // Actions for players
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  clearPlayers: () => void;
  
  // Actions for teams
  createTeams: () => void;
  
  // Actions for game
  incrementScore: (teamId: string) => void;
  decrementScore: (teamId: string) => void;
  resetMatch: () => void;
  resetGame: () => void;
  
  // Navigation
  goToNextStage: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  players: [],
  teams: [],
  stage: 'playerInput',
  
  // Player actions
  addPlayer: (name: string) => set((state) => ({
    players: [...state.players, { id: crypto.randomUUID(), name }]
  })),
  
  removePlayer: (id: string) => set((state) => ({
    players: state.players.filter(player => player.id !== id)
  })),
  
  clearPlayers: () => set({ players: [] }),
  
  // Team actions
  createTeams: () => set((state) => {
    if (state.players.length < 2) return state;
    
    // Shuffle players
    const shuffledPlayers = [...state.players].sort(() => Math.random() - 0.5);
    
    // Split players into two teams
    const halfLength = Math.ceil(shuffledPlayers.length / 2);
    const team1Players = shuffledPlayers.slice(0, halfLength);
    const team2Players = shuffledPlayers.slice(halfLength);
    
    const teams = [
      {
        id: crypto.randomUUID(),
        name: 'Time A',
        players: team1Players,
        score: 0
      },
      {
        id: crypto.randomUUID(),
        name: 'Time B',
        players: team2Players,
        score: 0
      }
    ];
    
    return { teams };
  }),
  
  // Game actions
  incrementScore: (teamId: string) => set((state) => ({
    teams: state.teams.map(team => 
      team.id === teamId ? { ...team, score: team.score + 1 } : team
    )
  })),
  
  decrementScore: (teamId: string) => set((state) => ({
    teams: state.teams.map(team => 
      team.id === teamId && team.score > 0 ? { ...team, score: team.score - 1 } : team
    )
  })),
  
  resetMatch: () => set((state) => ({
    teams: state.teams.map(team => ({ ...team, score: 0 }))
  })),
  
  resetGame: () => set({
    players: [],
    teams: [],
    stage: 'playerInput'
  }),
  
  // Navigation
  goToNextStage: () => set((state) => {
    if (state.stage === 'playerInput' && state.players.length >= 2) {
      // Create teams when moving to game stage
      const shuffledPlayers = [...state.players].sort(() => Math.random() - 0.5);
      
      const halfLength = Math.ceil(shuffledPlayers.length / 2);
      const team1Players = shuffledPlayers.slice(0, halfLength);
      const team2Players = shuffledPlayers.slice(halfLength);
      
      const teams = [
        {
          id: crypto.randomUUID(),
          name: 'Time A',
          players: team1Players,
          score: 0
        },
        {
          id: crypto.randomUUID(),
          name: 'Time B',
          players: team2Players,
          score: 0
        }
      ];
      
      return { teams, stage: 'game' };
    }
    
    return state;
  })
})); 