import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export function OfflineFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <AlertCircle className="w-16 h-16 mb-4 text-yellow-500" />
      <h1 className="text-2xl font-bold mb-2">Você está offline</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        O aplicativo Sorteador de Voleibol precisa de uma conexão com a internet.
      </p>
      <Button onClick={() => window.location.reload()}>
        Tentar novamente
      </Button>
    </div>
  );
} 