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
import { toast } from "sonner";

export function PlayerInputView() {
  const [playerName, setPlayerName] = useState("");
  const { players, addNewPlayer, removePlayerById, canProceed, proceedToGame } =
    usePlayerInputViewModel();

  function handleAddPlayer(e: React.FormEvent) {
    e.preventDefault();

    if (playerName.trim() === "") {
      toast.error("O nome do jogador não pode estar vazio");
      return;
    }

    if (players.some((player) => player.name === playerName.trim())) {
      toast.error("Jogador já adicionado");
      return;
    }

    const success = addNewPlayer(playerName);

    if (success) {
      setPlayerName("");
      toast.success("Jogador adicionado com sucesso");
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-center text-xl sm:text-2xl">
          Cadastro de Jogadores
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddPlayer} className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
            <Input
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Nome do jogador"
              className="flex-1 py-2"
            />
            <Button type="submit" className="w-full sm:w-auto">
              Adicionar
            </Button>
          </div>
          <div className="mt-3 sm:mt-4">
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              Jogadores ({players.length})
            </h3>
            {players.length === 0 ? (
              <p className="text-gray-500 text-center text-sm sm:text-base">
                Nenhum jogador adicionado
              </p>
            ) : (
              <ul className="space-y-2">
                {players.map((player) => (
                  <li
                    key={player.id}
                    className="flex items-center justify-between p-2 border rounded-md text-sm sm:text-base"
                  >
                    <span>{player.name}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removePlayerById(player.id)}
                      className="text-xs sm:text-sm"
                    >
                      Remover
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          onClick={proceedToGame}
          disabled={!canProceed()}
          className="w-full h-10 sm:h-11 text-sm sm:text-base"
        >
          Prosseguir para o Jogo
        </Button>
      </CardFooter>
    </Card>
  );
}
