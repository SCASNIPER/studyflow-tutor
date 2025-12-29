import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

interface SubjectCardProps {
  title: string;
  icon: LucideIcon;
  progress: number;
  lessons: number;
  color: "primary" | "accent" | "success" | "warning";
  delay?: number;
}

const colorClasses = {
  primary: "from-primary to-primary-glow",
  accent: "from-accent to-orange-400",
  success: "from-success to-emerald-400",
  warning: "from-warning to-amber-400",
};

const bgClasses = {
  primary: "bg-primary/10",
  accent: "bg-accent/10",
  success: "bg-success/10",
  warning: "bg-warning/10",
};

export function SubjectCard({ title, icon: Icon, progress, lessons, color, delay = 0 }: SubjectCardProps) {
  return (
    <div 
      className="group relative bg-card rounded-2xl p-5 shadow-card hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          "p-3 rounded-xl bg-gradient-to-br",
          colorClasses[color]
        )}>
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{title}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">{lessons} lições</p>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progresso</span>
          <span className="font-medium text-foreground">{progress}%</span>
        </div>
        <Progress 
          value={progress} 
          className={cn("h-2", bgClasses[color])}
        />
      </div>
      
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-colors" />
    </div>
  );
}
