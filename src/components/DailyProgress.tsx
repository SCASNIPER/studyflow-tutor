import { Flame, Target, Trophy } from "lucide-react";

interface StatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

function Stat({ icon, value, label }: StatProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="p-2 rounded-xl bg-card shadow-sm">
        {icon}
      </div>
      <span className="text-lg font-bold text-foreground">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

export function DailyProgress() {
  return (
    <div className="bg-gradient-primary rounded-2xl p-6 shadow-glow animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-primary-foreground">Progresso de Hoje</h2>
          <p className="text-primary-foreground/80 text-sm">Continue assim! 🎯</p>
        </div>
        <div className="text-4xl font-bold text-primary-foreground">75%</div>
      </div>
      
      <div className="h-3 bg-primary-foreground/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary-foreground rounded-full transition-all duration-1000 ease-out"
          style={{ width: '75%' }}
        />
      </div>
      
      <div className="flex justify-around mt-6">
        <Stat 
          icon={<Flame className="w-5 h-5 text-accent" />}
          value="7"
          label="Dias seguidos"
        />
        <Stat 
          icon={<Target className="w-5 h-5 text-primary" />}
          value="12"
          label="Lições hoje"
        />
        <Stat 
          icon={<Trophy className="w-5 h-5 text-warning" />}
          value="1.2k"
          label="XP total"
        />
      </div>
    </div>
  );
}
