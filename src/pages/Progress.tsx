import { TrendingUp, Calendar, Target, Award, Flame, BookOpen, Clock, Trophy } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const weeklyData = [
  { day: "Seg", hours: 2.5, target: 2 },
  { day: "Ter", hours: 1.8, target: 2 },
  { day: "Qua", hours: 3.2, target: 2 },
  { day: "Qui", hours: 2.0, target: 2 },
  { day: "Sex", hours: 2.8, target: 2 },
  { day: "Sáb", hours: 1.5, target: 2 },
  { day: "Dom", hours: 0.5, target: 2 },
];

const achievements = [
  { id: 1, title: "Primeiro Passo", description: "Complete sua primeira lição", icon: "🎯", unlocked: true },
  { id: 2, title: "Focado", description: "Estude por 7 dias seguidos", icon: "🔥", unlocked: true },
  { id: 3, title: "Mestre Quiz", description: "Acerte 100% em um quiz", icon: "🏆", unlocked: true },
  { id: 4, title: "Maratonista", description: "Estude por 5 horas em um dia", icon: "⚡", unlocked: false },
  { id: 5, title: "Perfeccionista", description: "Complete um curso inteiro", icon: "⭐", unlocked: false },
  { id: 6, title: "Lenda", description: "Acumule 10.000 XP", icon: "👑", unlocked: false },
];

const stats = [
  { label: "Horas de estudo", value: "48h", icon: Clock, color: "primary" },
  { label: "Lições completas", value: "127", icon: BookOpen, color: "success" },
  { label: "Dias seguidos", value: "7", icon: Flame, color: "accent" },
  { label: "XP Total", value: "1,250", icon: Trophy, color: "warning" },
];

const colorClasses = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
};

const ProgressPage = () => {
  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  return (
    <div className="min-h-screen pb-28">
      <main className="container max-w-lg mx-auto px-4 py-6">
        <header className="mb-6 animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground mb-2">Meu Progresso</h1>
          <p className="text-muted-foreground">Acompanhe sua evolução</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="bg-card rounded-2xl p-4 shadow-card animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", colorClasses[stat.color as keyof typeof colorClasses])}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Weekly Chart */}
        <section className="bg-card rounded-2xl p-5 shadow-card mb-8 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-foreground">Esta Semana</h2>
            </div>
            <div className="flex items-center gap-1 text-sm text-success">
              <TrendingUp className="w-4 h-4" />
              <span>+12%</span>
            </div>
          </div>

          <div className="flex items-end justify-between gap-2 h-32">
            {weeklyData.map((data, index) => (
              <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="relative w-full flex justify-center">
                  <div 
                    className={cn(
                      "w-8 rounded-t-lg transition-all duration-500",
                      data.hours >= data.target ? "bg-gradient-primary" : "bg-muted"
                    )}
                    style={{ 
                      height: `${(data.hours / maxHours) * 100}px`,
                      animationDelay: `${(index + 5) * 100}ms`
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{data.day}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-primary" />
              <span className="text-sm text-muted-foreground">Meta atingida</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted" />
              <span className="text-sm text-muted-foreground">Abaixo da meta</span>
            </div>
          </div>
        </section>

        {/* Goals */}
        <section className="bg-card rounded-2xl p-5 shadow-card mb-8 animate-slide-up" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">Metas Semanais</h2>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Horas de estudo</span>
                <span className="font-medium text-foreground">14h / 20h</span>
              </div>
              <Progress value={70} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Lições completas</span>
                <span className="font-medium text-foreground">18 / 25</span>
              </div>
              <Progress value={72} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Quizzes perfeitos</span>
                <span className="font-medium text-foreground">3 / 5</span>
              </div>
              <Progress value={60} />
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="animate-slide-up" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-warning" />
            <h2 className="font-semibold text-foreground">Conquistas</h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={cn(
                  "bg-card rounded-xl p-4 text-center shadow-sm transition-all",
                  achievement.unlocked 
                    ? "opacity-100" 
                    : "opacity-50 grayscale"
                )}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <p className="text-xs font-medium text-foreground truncate">{achievement.title}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default ProgressPage;
