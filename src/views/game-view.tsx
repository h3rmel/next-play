import { useGameViewModel } from "@/viewmodels/game-view-model";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, History } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function GameView() {
  const { teams, resetEntireGame, reshuffleTeams, goToHistoryView } =
    useGameViewModel();

  if (teams.length < 2) {
    return (
      <div className={cn("max-w-4xl", "flex flex-col gap-4 items-center")}>
        <div className={cn("w-full", "flex gap-6 justify-center", "mx-auto")}>
          <Skeleton className="w-96 h-56" />
          <Skeleton className="w-96 h-56" />
        </div>
        <div
          className={cn(
            "flex flex-col sm:flex-row gap-4 self-stretch sm:self-auto"
          )}
        >
          <Skeleton className="w-56 h-10" />
          <Skeleton className="w-56 h-10" />
          <Skeleton className="w-56 h-10" />
        </div>
      </div>
    );
  }

  return (
    <section className={cn("max-w-4xl", "flex flex-col gap-4 items-center")}>
      {/* Teams */}
      <div
        className={cn(
          "w-full",
          "grid grid-cols-1 gap-6 sm:grid-cols-2"
        )}
      >
        {teams.map((team) => (
          <Card key={team.id}>
            <CardHeader>
              <CardTitle>{team.name}</CardTitle>
            </CardHeader>
            <CardContent className="border-t pt-6">
              <ul className="list-disc pl-4 flex flex-col gap-1">
                {team.players.map((player) => (
                  <li key={player.id}>{player.name}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Controls */}
      <div
        className={cn(
          "flex flex-col sm:flex-row gap-4 self-stretch sm:self-auto"
        )}
      >
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
    </section>
  );
}
