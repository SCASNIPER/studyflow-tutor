import { Settings, Bell, Moon, HelpCircle, LogOut, ChevronRight, Award, BookOpen, Clock, Flame, Edit3 } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Bell, label: "Notificações", hasToggle: true, enabled: true },
  { icon: Moon, label: "Modo escuro", hasToggle: true, enabled: false },
  { icon: Settings, label: "Configurações", hasArrow: true },
  { icon: HelpCircle, label: "Ajuda e suporte", hasArrow: true },
  { icon: LogOut, label: "Sair da conta", hasArrow: true, danger: true },
];

const stats = [
  { icon: Flame, value: "7", label: "Dias seguidos", color: "accent" },
  { icon: BookOpen, value: "127", label: "Lições", color: "primary" },
  { icon: Clock, value: "48h", label: "Estudado", color: "success" },
  { icon: Award, value: "3", label: "Conquistas", color: "warning" },
];

const colorClasses = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
};

const Profile = () => {
  return (
    <div className="min-h-screen pb-28">
      <main className="container max-w-lg mx-auto px-4 py-6">
        {/* Profile Header */}
        <section className="text-center mb-8 animate-fade-in">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
              <span className="text-4xl font-bold text-primary-foreground">L</span>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-card rounded-full shadow-card flex items-center justify-center border-2 border-background">
              <Edit3 className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          
          <h1 className="text-2xl font-bold text-foreground">Lucas Silva</h1>
          <p className="text-muted-foreground">lucas.silva@email.com</p>
          
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
              Nível 12
            </span>
            <span className="px-3 py-1 bg-warning/10 text-warning text-sm font-medium rounded-full">
              1,250 XP
            </span>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-4 gap-3 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="bg-card rounded-xl p-3 text-center shadow-sm animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn(
                "w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center",
                colorClasses[stat.color as keyof typeof colorClasses]
              )}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Subscription Card */}
        <section className="bg-gradient-accent rounded-2xl p-5 mb-8 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-accent-foreground/80 text-sm">Plano atual</p>
              <h3 className="text-xl font-bold text-accent-foreground">Gratuito</h3>
            </div>
            <Button variant="secondary" className="bg-accent-foreground/20 text-accent-foreground border-0 hover:bg-accent-foreground/30">
              Upgrade Pro
            </Button>
          </div>
        </section>

        {/* Menu Items */}
        <section className="bg-card rounded-2xl shadow-card overflow-hidden animate-slide-up" style={{ animationDelay: '500ms' }}>
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors",
                index !== menuItems.length - 1 && "border-b border-border",
                item.danger && "text-destructive"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("w-5 h-5", item.danger ? "text-destructive" : "text-muted-foreground")} />
                <span className={cn("font-medium", item.danger ? "text-destructive" : "text-foreground")}>
                  {item.label}
                </span>
              </div>
              
              {item.hasToggle && (
                <Switch checked={item.enabled} />
              )}
              {item.hasArrow && (
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
          ))}
        </section>

        <p className="text-center text-sm text-muted-foreground mt-8 animate-fade-in">
          StudyFlow v1.0.0
        </p>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Profile;
