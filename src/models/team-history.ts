import { Team } from './team';

export interface TeamHistory {
  id: string;
  timestamp: number;
  teams: Team[];
}

export interface TeamHistoryState {
  histories: TeamHistory[];
}

// Função auxiliar para obter o histórico do localStorage
export function getTeamHistoryFromStorage(): TeamHistoryState {
  const stored = localStorage.getItem('teamHistory');
  if (!stored) {
    return { histories: [] };
  }
  
  try {
    return JSON.parse(stored) as TeamHistoryState;
  } catch (e) {
    console.error('Error parsing team history from localStorage', e);
    return { histories: [] };
  }
}

// Função auxiliar para salvar o histórico no localStorage
export function saveTeamHistoryToStorage(state: TeamHistoryState): void {
  localStorage.setItem('teamHistory', JSON.stringify(state));
}

// Função para adicionar um novo histórico e manter apenas os 5 mais recentes
export function addTeamHistoryEntry(teams: Team[]): void {
  if (!teams || teams.length === 0) return;
  
  const history = getTeamHistoryFromStorage();
  
  const newEntry: TeamHistory = {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    teams: teams
  };
  
  // Adiciona o novo histórico e mantém apenas os 5 mais recentes
  history.histories = [newEntry, ...history.histories].slice(0, 5);
  
  saveTeamHistoryToStorage(history);
} 