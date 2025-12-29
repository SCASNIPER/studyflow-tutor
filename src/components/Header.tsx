import { Bell, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";

  return (
    <header className="flex items-center justify-between py-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
          <span className="text-xl font-bold text-primary-foreground">L</span>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">{greeting}! 👋</p>
          <h1 className="text-xl font-bold text-foreground">Lucas</h1>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Sparkles className="w-5 h-5 text-warning" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
        </Button>
      </div>
    </header>
  );
}
