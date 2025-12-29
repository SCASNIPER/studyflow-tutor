import { Home, BookOpen, BarChart3, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}

function NavItem({ icon, label, to, active }: NavItemProps) {
  return (
    <Link 
      to={to}
      className={cn(
        "flex flex-col items-center gap-1 py-2 px-4 transition-colors",
        active ? "text-primary" : "text-muted-foreground hover:text-foreground"
      )}
    >
      <div className={cn(
        "p-2 rounded-xl transition-all duration-200",
        active && "bg-primary/10 shadow-sm"
      )}>
        {icon}
      </div>
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
}

export function BottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border safe-area-inset-bottom z-50">
      <div className="flex justify-around items-center py-2 max-w-lg mx-auto">
        <NavItem 
          icon={<Home className="w-5 h-5" />} 
          label="Início" 
          to="/"
          active={currentPath === "/"} 
        />
        <NavItem 
          icon={<BookOpen className="w-5 h-5" />} 
          label="Estudar" 
          to="/study"
          active={currentPath === "/study"} 
        />
        <NavItem 
          icon={<BarChart3 className="w-5 h-5" />} 
          label="Progresso" 
          to="/progress"
          active={currentPath === "/progress"} 
        />
        <NavItem 
          icon={<User className="w-5 h-5" />} 
          label="Perfil" 
          to="/profile"
          active={currentPath === "/profile"} 
        />
      </div>
    </nav>
  );
}
