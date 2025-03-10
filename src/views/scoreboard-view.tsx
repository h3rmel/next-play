import { useGameViewModel } from "@/viewmodels/game-view-model";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";

export function ScoreboardView() {
  const {
    teams,
    incrementTeamScore,
    decrementTeamScore,
    resetCurrentMatch,
    resetEntireGame,
  } = useGameViewModel();

  if (teams.length < 2) {
    return <div className="text-center p-4">Carregando times...</div>;
  }

  return (
    <div className="w-full max-w-full sm:max-w-4xl mx-auto">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6">
        {teams.map((team) => (
          <Card key={team.id}>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>{team.name}</CardTitle>
              <CardDescription className="text-foreground">
                Pontuação: {team.score}
              </CardDescription>
            </CardHeader>
            <CardContent className="border-y p-6">
              <ul className="list-disc pl-4 flex flex-col gap-1">
                {team.players.map((player) => (
                  <li key={player.id}>{player.name}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="gap-4">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => decrementTeamScore(team.id)}
                disabled={team.score <= 0}
              >
                <Minus className="size-4" />
              </Button>
              <Button size="icon" onClick={() => incrementTeamScore(team.id)}>
                <Plus className="size-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:space-x-4 mt-6 sm:mt-8">
        <Button
          variant="outline"
          size="lg"
          onClick={resetCurrentMatch}
          className="w-full sm:w-auto text-sm sm:text-base"
        >
          Reiniciar Partida
        </Button>
        <Button
          variant="destructive"
          size="lg"
          onClick={resetEntireGame}
          className="w-full sm:w-auto text-sm sm:text-base"
        >
          Novo Jogo
        </Button>
      </div>
    </div>
  );
}
