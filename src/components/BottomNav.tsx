import { Home, BookOpen, BarChart3, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function NavItem({ icon, label, active }: NavItemProps) {
  return (
    <button className={cn(
      "flex flex-col items-center gap-1 py-2 px-4 transition-colors",
      active ? "text-primary" : "text-muted-foreground hover:text-foreground"
    )}>
      <div className={cn(
        "p-2 rounded-xl transition-all duration-200",
        active && "bg-primary/10 shadow-sm"
      )}>
        {icon}
      </div>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border safe-area-inset-bottom z-50">
      <div className="flex justify-around items-center py-2 max-w-lg mx-auto">
        <NavItem icon={<Home className="w-5 h-5" />} label="Início" active />
        <NavItem icon={<BookOpen className="w-5 h-5" />} label="Estudar" />
        <NavItem icon={<BarChart3 className="w-5 h-5" />} label="Progresso" />
        <NavItem icon={<User className="w-5 h-5" />} label="Perfil" />
      </div>
    </nav>
  );
}
