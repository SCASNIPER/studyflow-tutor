import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Play, CheckCircle2, Lock, Clock, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BottomNav } from "@/components/BottomNav";
import { cn } from "@/lib/utils";
import { Calculator, BookOpen, FlaskConical, History, Globe, Palette } from "lucide-react";

const subjectsData: Record<string, {
  title: string;
  icon: React.ElementType;
  color: string;
  progress: number;
  description: string;
  lessons: Array<{
    id: number;
    title: string;
    duration: string;
    completed: boolean;
    locked: boolean;
    type: "video" | "quiz" | "exercise";
  }>;
}> = {
  matematica: {
    title: "Matemática",
    icon: Calculator,
    color: "primary",
    progress: 68,
    description: "Aprenda desde operações básicas até equações complexas",
    lessons: [
      { id: 1, title: "Introdução aos Números", duration: "15 min", completed: true, locked: false, type: "video" },
      { id: 2, title: "Operações Básicas", duration: "20 min", completed: true, locked: false, type: "video" },
      { id: 3, title: "Quiz: Operações", duration: "10 min", completed: true, locked: false, type: "quiz" },
      { id: 4, title: "Frações e Decimais", duration: "25 min", completed: true, locked: false, type: "video" },
      { id: 5, title: "Exercícios Práticos", duration: "15 min", completed: false, locked: false, type: "exercise" },
      { id: 6, title: "Equações do 1º Grau", duration: "30 min", completed: false, locked: false, type: "video" },
      { id: 7, title: "Quiz: Equações", duration: "10 min", completed: false, locked: true, type: "quiz" },
      { id: 8, title: "Equações do 2º Grau", duration: "35 min", completed: false, locked: true, type: "video" },
    ],
  },
  portugues: {
    title: "Português",
    icon: BookOpen,
    color: "accent",
    progress: 45,
    description: "Domine a gramática e a arte da redação",
    lessons: [
      { id: 1, title: "Classes Gramaticais", duration: "20 min", completed: true, locked: false, type: "video" },
      { id: 2, title: "Substantivos e Adjetivos", duration: "18 min", completed: true, locked: false, type: "video" },
      { id: 3, title: "Verbos Regulares", duration: "25 min", completed: false, locked: false, type: "video" },
      { id: 4, title: "Quiz: Gramática Básica", duration: "10 min", completed: false, locked: false, type: "quiz" },
      { id: 5, title: "Verbos Irregulares", duration: "30 min", completed: false, locked: true, type: "video" },
      { id: 6, title: "Estrutura da Redação", duration: "25 min", completed: false, locked: true, type: "video" },
    ],
  },
  ciencias: {
    title: "Ciências",
    icon: FlaskConical,
    color: "success",
    progress: 82,
    description: "Explore os mistérios do universo e da natureza",
    lessons: [
      { id: 1, title: "O Método Científico", duration: "15 min", completed: true, locked: false, type: "video" },
      { id: 2, title: "Células e Organismos", duration: "25 min", completed: true, locked: false, type: "video" },
      { id: 3, title: "Sistema Solar", duration: "30 min", completed: true, locked: false, type: "video" },
      { id: 4, title: "Quiz: Astronomia", duration: "10 min", completed: true, locked: false, type: "quiz" },
      { id: 5, title: "Química Básica", duration: "28 min", completed: true, locked: false, type: "video" },
      { id: 6, title: "Física: Movimento", duration: "32 min", completed: false, locked: false, type: "video" },
    ],
  },
  historia: {
    title: "História",
    icon: History,
    color: "warning",
    progress: 30,
    description: "Viaje pelo tempo e conheça nossa história",
    lessons: [
      { id: 1, title: "Pré-História", duration: "20 min", completed: true, locked: false, type: "video" },
      { id: 2, title: "Civilizações Antigas", duration: "25 min", completed: true, locked: false, type: "video" },
      { id: 3, title: "Quiz: Antiguidade", duration: "10 min", completed: false, locked: false, type: "quiz" },
      { id: 4, title: "Brasil Colonial", duration: "30 min", completed: false, locked: false, type: "video" },
      { id: 5, title: "Independência do Brasil", duration: "25 min", completed: false, locked: true, type: "video" },
    ],
  },
  geografia: {
    title: "Geografia",
    icon: Globe,
    color: "primary",
    progress: 55,
    description: "Entenda o mundo em que vivemos",
    lessons: [
      { id: 1, title: "Cartografia Básica", duration: "18 min", completed: true, locked: false, type: "video" },
      { id: 2, title: "Relevo Brasileiro", duration: "22 min", completed: true, locked: false, type: "video" },
      { id: 3, title: "Climas do Brasil", duration: "20 min", completed: true, locked: false, type: "video" },
      { id: 4, title: "Quiz: Brasil Físico", duration: "10 min", completed: false, locked: false, type: "quiz" },
      { id: 5, title: "Biomas Brasileiros", duration: "25 min", completed: false, locked: false, type: "video" },
    ],
  },
  artes: {
    title: "Artes",
    icon: Palette,
    color: "accent",
    progress: 90,
    description: "Desenvolva sua criatividade e expressão artística",
    lessons: [
      { id: 1, title: "História da Arte", duration: "20 min", completed: true, locked: false, type: "video" },
      { id: 2, title: "Cores e Composição", duration: "18 min", completed: true, locked: false, type: "video" },
      { id: 3, title: "Arte Brasileira", duration: "22 min", completed: true, locked: false, type: "video" },
      { id: 4, title: "Quiz: Movimentos Artísticos", duration: "10 min", completed: true, locked: false, type: "quiz" },
      { id: 5, title: "Arte Contemporânea", duration: "25 min", completed: false, locked: false, type: "video" },
    ],
  },
};

const colorClasses = {
  primary: "from-primary to-primary-glow",
  accent: "from-accent to-orange-400",
  success: "from-success to-emerald-400",
  warning: "from-warning to-amber-400",
};

const Subject = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const subject = id ? subjectsData[id] : null;
  
  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Matéria não encontrada</p>
      </div>
    );
  }

  const Icon = subject.icon;
  const completedLessons = subject.lessons.filter(l => l.completed).length;

  const handleLessonClick = (lesson: typeof subject.lessons[0]) => {
    if (lesson.locked) return;
    
    if (lesson.type === "quiz") {
      navigate(`/quiz/${id}/${lesson.id}`);
    } else if (lesson.type === "exercise") {
      navigate(`/flashcard/${id}`);
    } else {
      navigate(`/lesson/${id}/${lesson.id}`);
    }
  };

  return (
    <div className="min-h-screen pb-28">
      <main className="container max-w-lg mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6 animate-fade-in">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Detalhes da Matéria</h1>
        </header>

        {/* Subject Card */}
        <section className={cn(
          "bg-gradient-to-br rounded-2xl p-6 mb-6 animate-slide-up",
          colorClasses[subject.color as keyof typeof colorClasses]
        )}>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-primary-foreground/20 rounded-xl">
              <Icon className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary-foreground">{subject.title}</h2>
              <p className="text-primary-foreground/80 text-sm">{subject.description}</p>
            </div>
          </div>
          
          <div className="bg-primary-foreground/20 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-primary-foreground/80 text-sm">Progresso</span>
              <span className="text-primary-foreground font-bold">{subject.progress}%</span>
            </div>
            <div className="h-2 bg-primary-foreground/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-foreground rounded-full transition-all duration-500"
                style={{ width: `${subject.progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-3 text-sm text-primary-foreground/80">
              <span>{completedLessons} de {subject.lessons.length} lições</span>
              <span className="flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                +250 XP
              </span>
            </div>
          </div>
        </section>

        {/* Lessons List */}
        <section>
          <h3 className="text-lg font-semibold text-foreground mb-4">Lições</h3>
          <div className="space-y-3">
            {subject.lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                onClick={() => handleLessonClick(lesson)}
                disabled={lesson.locked}
                className={cn(
                  "w-full flex items-center gap-4 p-4 bg-card rounded-xl shadow-sm transition-all duration-200 animate-slide-up",
                  lesson.locked 
                    ? "opacity-50 cursor-not-allowed" 
                    : "hover:shadow-card hover:-translate-y-0.5 cursor-pointer",
                  lesson.completed && "border-l-4 border-success"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold",
                  lesson.completed 
                    ? "bg-success/10 text-success" 
                    : lesson.locked 
                    ? "bg-muted text-muted-foreground"
                    : "bg-primary/10 text-primary"
                )}>
                  {lesson.completed ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : lesson.locked ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                
                <div className="flex-1 text-left">
                  <h4 className="font-medium text-foreground">{lesson.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{lesson.duration}</span>
                    <span className="capitalize px-2 py-0.5 bg-secondary rounded text-xs">
                      {lesson.type === "video" ? "Vídeo" : lesson.type === "quiz" ? "Quiz" : "Exercício"}
                    </span>
                  </div>
                </div>
                
                {!lesson.locked && !lesson.completed && (
                  <Play className="w-5 h-5 text-primary" />
                )}
              </button>
            ))}
          </div>
        </section>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Subject;
