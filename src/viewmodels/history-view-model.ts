import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/game-store';
import { getTeamHistoryFromStorage, TeamHistory } from '@/models/team-history';

export function useHistoryViewModel() {
  const [histories, setHistories] = useState<TeamHistory[]>([]);
  const setStage = useGameStore(state => state.setStage);
  
  // Carregar o histórico do localStorage
  useEffect(() => {
    const history = getTeamHistoryFromStorage();
    setHistories(history.histories);
  }, []);
  
  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const goToPlayerInput = () => {
    setStage('playerInput');
  };
  
  return {
    histories,
    formatDate,
    goToPlayerInput
  };
} 