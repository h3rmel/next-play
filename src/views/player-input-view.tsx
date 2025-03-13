import { useState } from "react";
import { usePlayerInputViewModel } from "@/viewmodels/player-input-view-model";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ImportPlayersDialog } from "@/components/import-players-dialog";
import { ClearPlayersAlert } from "@/components/clear-players-alert";
import { ListPlus, Trash2, X, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export function PlayerInputView() {
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState("");
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [clearAlertOpen, setClearAlertOpen] = useState(false);

  const {
    players,
    numberOfTeams,
    updateNumberOfTeams,
    addNewPlayer,
    removePlayerById,
    removeAllPlayers,
    canProceed,
    proceedToGame,
  } = usePlayerInputViewModel();

  // #region Handlers

  function handleAddPlayer(e: React.FormEvent) {
    e.preventDefault();

    if (playerName.trim() === "") {
      setError("O nome do jogador não pode estar vazio");
      return;
    }

    if (players.some((player) => player.name === playerName.trim())) {
      toast.error("Jogador já adicionado");
      return;
    }

    const success = addNewPlayer(playerName);

    if (success) {
      setPlayerName("");
      setError("");
      toast.success("Jogador adicionado com sucesso");
    }
  }

  function handleImportPlayers(playerNames: string[]) {
    let successCount = 0;

    for (const name of playerNames) {
      if (name && addNewPlayer(name)) {
        successCount++;
      }
    }

    if (successCount > 0) {
      setError("");
      toast.success("Jogadores importados com sucesso");
    }
  }

  function handleClearPlayers() {
    if (players.length > 0) {
      removeAllPlayers();
      toast.success("Todos os jogadores foram removidos");
    }
  }

  function handleDecreaseTeams() {
    if (numberOfTeams > 2) {
      updateNumberOfTeams(numberOfTeams - 1);
    }
  }

  function handleIncreaseTeams() {
    if (numberOfTeams < 4) {
      updateNumberOfTeams(numberOfTeams + 1);
    }
  }

  // #endregion

  return (
    <>
      <Card className={cn("w-full max-w-lg", "mx-auto mb-4", "shadow-md")}>
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-2xl text-primary">
            Cadastro de Jogadores
          </CardTitle>
        </CardHeader>
        {/* Form */}
        <CardContent>
          <form
            onSubmit={handleAddPlayer}
            className={cn("flex flex-col gap-3")}
          >
            {/* Number of Teams */}
            <div className="flex flex-col gap-2">
              <Label>Número de Times</Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={handleDecreaseTeams}
                  disabled={numberOfTeams <= 2}
                >
                  <Minus className="size-4" />
                </Button>
                <span className="font-bold text-lg">{numberOfTeams}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={handleIncreaseTeams}
                  disabled={numberOfTeams >= 4}
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>
            {/* Player Input */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Nome do jogador"
                className="flex-1 h-10 sm:h-auto"
              />
              <Button type="submit" className="w-full sm:w-auto">
                Adicionar
              </Button>
            </div>
            {/* Actions */}
            <div
              className={cn(
                "w-full",
                "flex flex-col sm:flex-row justify-center gap-2"
              )}
            >
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setImportDialogOpen(true)}
                className="flex-grow text-xs sm:text-sm"
              >
                <ListPlus className="mr-2 size-4" />
                Importar lista
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setClearAlertOpen(true)}
                disabled={players.length === 0}
                className="flex-grow text-xs sm:text-sm text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
              >
                <Trash2 className="mr-2 size-4" />
                Remover todos
              </Button>
            </div>
            {/* Error */}
            {error && (
              <Alert variant="destructive" className="text-sm">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {/* Players List */}
            <section className="mt-3 sm:mt-4">
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-primary">
                Jogadores ({players.length})
              </h3>
              {players.length === 0 ? (
                <p className="text-muted-foreground text-center text-sm sm:text-base">
                  Nenhum jogador adicionado
                </p>
              ) : (
                <ul className="space-y-2">
                  {players.map((player) => (
                    <li
                      key={player.id}
                      className={cn(
                        "flex items-center justify-between",
                        "p-2 border rounded-md",
                        "bg-accent/10 text-sm sm:text-base"
                      )}
                    >
                      <span className="pl-2">{player.name}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removePlayerById(player.id)}
                        // className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
                      >
                        <X className="size-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </form>
        </CardContent>
        {/* Footer */}
        <CardFooter>
          <Button
            onClick={proceedToGame}
            disabled={!canProceed()}
            className={cn("w-full h-10 sm:h-11", "text-sm sm:text-base")}
          >
            Prosseguir para o Jogo
          </Button>
        </CardFooter>
      </Card>
      {/* Dialogs */}
      <ImportPlayersDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
        onImport={handleImportPlayers}
      />
      <ClearPlayersAlert
        open={clearAlertOpen}
        onOpenChange={setClearAlertOpen}
        onConfirm={handleClearPlayers}
      />
    </>
  );
}
