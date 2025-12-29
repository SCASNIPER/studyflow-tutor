import { BookOpen, Calculator, FlaskConical, Globe, History, Palette } from "lucide-react";
import { Header } from "@/components/Header";
import { DailyProgress } from "@/components/DailyProgress";
import { SubjectCard } from "@/components/SubjectCard";
import { QuickSession } from "@/components/QuickSession";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";

const subjects = [
  { title: "Matemática", icon: Calculator, progress: 68, lessons: 24, color: "primary" as const },
  { title: "Português", icon: BookOpen, progress: 45, lessons: 18, color: "accent" as const },
  { title: "Ciências", icon: FlaskConical, progress: 82, lessons: 32, color: "success" as const },
  { title: "História", icon: History, progress: 30, lessons: 20, color: "warning" as const },
  { title: "Geografia", icon: Globe, progress: 55, lessons: 16, color: "primary" as const },
  { title: "Artes", icon: Palette, progress: 90, lessons: 12, color: "accent" as const },
];

const quickSessions = [
  { title: "Equações do 2º grau", subject: "Matemática", duration: "15 min", type: "quiz" as const },
  { title: "Verbos irregulares", subject: "Português", duration: "10 min", type: "flashcard" as const },
  { title: "Sistema Solar", subject: "Ciências", duration: "20 min", type: "review" as const },
];

const Index = () => {
  return (
    <div className="min-h-screen pb-28">
      <main className="container max-w-lg mx-auto px-4">
        <Header />
        
        <section className="mt-6">
          <DailyProgress />
        </section>
        
        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Minhas Matérias</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              Ver todas
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {subjects.slice(0, 4).map((subject, index) => (
              <SubjectCard
                key={subject.title}
                {...subject}
                delay={index * 100}
              />
            ))}
          </div>
        </section>
        
        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Sessões Rápidas</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              Ver mais
            </Button>
          </div>
          
          <div className="space-y-3">
            {quickSessions.map((session, index) => (
              <QuickSession 
                key={session.title}
                {...session}
                delay={index * 100}
              />
            ))}
          </div>
        </section>
        
        <section className="mt-8 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <div className="bg-gradient-accent rounded-2xl p-6 text-center">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="text-lg font-bold text-accent-foreground mb-2">
              Desafio da Semana
            </h3>
            <p className="text-accent-foreground/80 text-sm mb-4">
              Complete 5 quizzes e ganhe 500 XP bônus!
            </p>
            <Button variant="secondary" className="bg-accent-foreground/20 text-accent-foreground border-0 hover:bg-accent-foreground/30">
              Participar agora
            </Button>
          </div>
        </section>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Index;
