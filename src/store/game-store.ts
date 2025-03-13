import { create } from 'zustand';
import { Player } from '@/models/player';
import { Team } from '@/models/team';
import { addTeamHistoryEntry } from '@/models/team-history';

export type GameStage = 'playerInput' | 'game' | 'history';

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
  reshuffleTeams: () => void;
  
  // Actions for game
  resetGame: () => void;
  
  // Navigation
  goToNextStage: () => void;
  setStage: (stage: GameStage) => void;
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
        players: team1Players
      },
      {
        id: crypto.randomUUID(),
        name: 'Time B',
        players: team2Players
      }
    ];
    
    return { teams };
  }),
  
  reshuffleTeams: () => set((state) => {
    // Get all players from all teams
    const allPlayers = state.teams.flatMap(team => team.players);
    
    if (allPlayers.length < 2) return state;
    
    // Shuffle all players
    const shuffledPlayers = [...allPlayers].sort(() => Math.random() - 0.5);
    
    // Split players into same number of teams as before
    const numberOfTeams = state.teams.length;
    const playersPerTeam = Math.ceil(shuffledPlayers.length / numberOfTeams);
    
    // Create new teams with same IDs and names but shuffled players
    const newTeams = state.teams.map((team, index) => {
      const startIdx = index * playersPerTeam;
      const endIdx = Math.min(startIdx + playersPerTeam, shuffledPlayers.length);
      const teamPlayers = shuffledPlayers.slice(startIdx, endIdx);
      
      return {
        ...team,
        players: teamPlayers
      };
    });
    
    return { teams: newTeams };
  }),
  
  // Game actions
  resetGame: () => set((state) => {
    // Salvar o estado atual no histórico se estiver na etapa de jogo
    if (state.stage === 'game' && state.teams.length > 0) {
      addTeamHistoryEntry(state.teams);
    }
    
    return {
      players: [],
      teams: [],
      stage: 'playerInput'
    };
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
          players: team1Players
        },
        {
          id: crypto.randomUUID(),
          name: 'Time B',
          players: team2Players
        }
      ];
      
      return { teams, stage: 'game' };
    }
    
    return state;
  }),
  
  setStage: (stage) => set({ stage })
})); 