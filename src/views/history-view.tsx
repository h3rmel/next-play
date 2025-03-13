import { useHistoryViewModel } from "@/viewmodels/history-view-model";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function HistoryView() {
  const { histories, formatDate, goToPlayerInput } = useHistoryViewModel();

  if (histories.length === 0) {
    return (
      <div className="container mx-auto py-4 sm:py-6 md:py-8 px-2 sm:px-4">
        <div className="flex flex-col items-center justify-center">
          <Card className="w-full max-w-md ">
            <CardHeader>
              <CardTitle className="text-center">
                Histórico de Sorteios
              </CardTitle>
              <CardDescription className="text-center">
                Nenhum histórico encontrado
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center pt-4">
              <Button onClick={goToPlayerInput} variant="default">
                <ArrowLeft className="mr-2 size-4" />
                Voltar
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <section className={cn("max-w-4xl", "flex flex-col gap-4 items-center")}>
      {/* Header */}
      <div
        className={cn("flex justify-between items-center", "w-full", "mx-auto")}
      >
        <h2 className="text-2xl font-bold text-primary">
          Histórico de Sorteios
        </h2>
        <Button onClick={goToPlayerInput} variant="outline">
          <ArrowLeft className="mr-2 size-4" />
          Voltar
        </Button>
      </div>
      {/* History List */}
      <div className={cn("w-full", "grid grid-cols-1 gap-6 sm:grid-cols-2", "mb-4")}>
        {histories.map((history) => (
          <Card key={history.id} className="max-w-md w-full mx-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Sorteio</CardTitle>
                <CardDescription className="flex items-center text-muted-foreground">
                  <Clock className="mr-1 size-4" />
                  {formatDate(history.timestamp)}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {history.teams.map((team) => (
                  <div
                    key={team.id}
                    className={cn("p-3 rounded-md border border-border")}
                  >
                    <h4 className="text-base font-semibold pb-2">{team.name}</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      {team.players.map((player) => (
                        <li key={player.id}>{player.name}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
