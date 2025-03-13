import { useGameViewModel } from "@/viewmodels/game-view-model";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, History } from "lucide-react";

export function GameView() {
  const { teams, resetEntireGame, reshuffleTeams, goToHistoryView } = useGameViewModel();

  if (teams.length < 2) {
    return <div className="text-center p-4">Carregando times...</div>;
  }

  return (
    <div className="container mx-auto py-4 sm:py-6 md:py-8 px-2 sm:px-4">
      <div className="w-full max-w-full sm:max-w-4xl mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6">
          {teams.map((team) => (
            <Card key={team.id}>
              <CardHeader>
                <CardTitle>{team.name}</CardTitle>
              </CardHeader>
              <CardContent className="border-y p-6">
                <ul className="list-disc pl-4 flex flex-col gap-1">
                  {team.players.map((player) => (
                    <li key={player.id}>{player.name}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={reshuffleTeams}
            className="w-full sm:w-auto text-sm sm:text-base"
          >
            <RefreshCw className="mr-2 size-4" />
            Novo Sorteio
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={goToHistoryView}
            className="w-full sm:w-auto text-sm sm:text-base"
          >
            <History className="mr-2 size-4" />
            Ver Histórico
          </Button>
          <Button
            variant="default"
            size="lg"
            onClick={resetEntireGame}
            className="w-full sm:w-auto text-sm sm:text-base"
          >
            Novo Jogo
          </Button>
        </div>
      </div>
    </div>
  );
} 