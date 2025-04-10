import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { History } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
import { useGameStore } from "@/store/game-store";

export function Navbar() {
  const { setStage } = useGameStore();

  return (
    <header
      className={cn(
        "sticky top-0 left-0 z-50",
        "w-full",
        "border-b border-border",
        "bg-background/30 backdrop-blur-sm"
      )}
    >
      <nav
        className={cn(
          "max-w-lg mx-auto",
          "flex justify-between items-center",
          "py-4 px-4 sm:px-0"
        )}
      >
        <h1 className={cn("text-2xl font-bold")}>Próxima Jogada</h1>
        <section className={cn("flex gap-2 items-center")}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setStage("history")}
            title="Ver histórico de sorteios"
          >
            <History className="size-4" />
          </Button>
          <ThemeToggle />
        </section>
      </nav>
    </header>
  );
}
