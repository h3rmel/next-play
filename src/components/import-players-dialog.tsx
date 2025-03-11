import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ImportPlayersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (players: string[]) => void;
}

export function ImportPlayersDialog({
  open,
  onOpenChange,
  onImport,
}: ImportPlayersDialogProps) {
  const [playersList, setPlayersList] = useState("");
  const [error, setError] = useState("");

  const handleImport = () => {
    if (!playersList.trim()) {
      setError("Por favor, insira a lista de jogadores.");
      return;
    }

    // Parse the players list
    // Format expected: "number - name" or just "name"
    const lines = playersList
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (lines.length === 0) {
      setError("Nenhum jogador encontrado na lista.");
      return;
    }

    // Extract player names
    const playerNames = lines.map((line) => {
      // Remove numbers and dashes from the beginning of the line
      return line.replace(/^\d+\s*-\s*/, "").trim();
    }).filter(name => name.length > 0);

    if (playerNames.length === 0) {
      setError("Nenhum nome válido encontrado na lista.");
      return;
    }

    // Import the players
    onImport(playerNames);
    setPlayersList("");
    setError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Importar Jogadores</DialogTitle>
          <DialogDescription>
            Cole uma lista de jogadores para adicionar todos de uma vez.
            Formato: "número - nome" ou apenas o nome de cada jogador.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="1 - João&#10;2 - Maria&#10;3 - Pedro"
            value={playersList}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setPlayersList(e.target.value)}
            rows={8}
            className="w-full"
          />
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={() => {
              setPlayersList("");
              setError("");
              onOpenChange(false);
            }}
            className="sm:order-1"
          >
            Cancelar
          </Button>
          <Button onClick={handleImport} className="sm:order-2">
            Importar Jogadores
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 