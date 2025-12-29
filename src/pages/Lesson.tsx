import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Play, Pause, SkipForward, CheckCircle, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LessonContent {
  title: string;
  duration: string;
  content: string[];
  keyPoints: string[];
}

type LessonDataType = Record<string, Record<string, LessonContent>>;

const lessonData: LessonDataType = {
  matematica: {
    "1": {
      title: "Introdução aos Números",
      duration: "15 min",
      content: [
        "Os números são a base de toda a matemática. Eles nos permitem contar, medir e calcular.",
        "Existem diferentes tipos de números: naturais, inteiros, racionais e irracionais.",
        "Os números naturais (1, 2, 3...) são os primeiros que aprendemos, usados para contar objetos.",
        "Os números inteiros incluem os negativos (-3, -2, -1, 0, 1, 2, 3...).",
        "Dominar os números é essencial para avançar em matemática!"
      ],
      keyPoints: [
        "Números naturais: 1, 2, 3, 4...",
        "Números inteiros: ...-2, -1, 0, 1, 2...",
        "Zero é neutro na adição",
        "Números são a linguagem universal"
      ]
    },
    "6": {
      title: "Equações do 1º Grau",
      duration: "30 min",
      content: [
        "Uma equação do 1º grau é uma igualdade com uma incógnita de expoente 1.",
        "A forma geral é: ax + b = 0, onde 'a' e 'b' são números reais e a ≠ 0.",
        "Para resolver, isolamos a incógnita x de um lado da igualdade.",
        "Exemplo: 2x + 4 = 10 → 2x = 6 → x = 3",
        "Sempre podemos verificar substituindo o valor encontrado na equação original."
      ],
      keyPoints: [
        "Forma: ax + b = 0",
        "Isolar a incógnita",
        "O que faz de um lado, faz do outro",
        "Sempre verificar a resposta"
      ]
    }
  }
};

const Lesson = () => {
  const { subjectId, lessonId } = useParams<{ subjectId: string; lessonId: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);

  const getLesson = (): LessonContent => {
    if (subjectId && lessonId && lessonData[subjectId]?.[lessonId]) {
      return lessonData[subjectId][lessonId];
    }
    return lessonData.matematica["1"];
  };

  const lesson = getLesson();
  const progress = ((currentStep + 1) / lesson.content.length) * 100;

  const handleNext = () => {
    if (currentStep < lesson.content.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (completed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl p-8 shadow-lg max-w-md w-full text-center animate-slide-up">
          <div className="w-20 h-20 rounded-full mx-auto mb-6 bg-success/10 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-2">Lição Completa!</h2>
          <p className="text-muted-foreground mb-6">{lesson.title}</p>
          
          <div className="bg-primary/10 rounded-xl p-4 mb-6">
            <div className="text-2xl font-bold text-primary">+30 XP</div>
            <div className="text-sm text-primary/80">Experiência ganha</div>
          </div>
          
          <div className="bg-secondary rounded-xl p-4 mb-6">
            <h4 className="font-semibold text-foreground mb-3">Pontos-chave:</h4>
            <ul className="text-left space-y-2">
              {lesson.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => navigate(`/subject/${subjectId}`)}>
              Voltar
            </Button>
            <Button className="flex-1" onClick={() => navigate(`/quiz/${subjectId}/1`)}>
              Fazer Quiz
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="container max-w-lg mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{lesson.duration}</span>
          </div>
          <div className="w-10" />
        </div>
        
        <Progress value={progress} className="h-2" />
      </header>

      <main className="flex-1 container max-w-lg mx-auto px-4 py-6">
        <div className="mb-6">
          <span className="text-sm text-primary font-medium">Lição</span>
          <h1 className="text-2xl font-bold text-foreground">{lesson.title}</h1>
        </div>

        <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <Button 
            size="lg" 
            className="z-10"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </Button>
          <BookOpen className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-primary/10" />
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm animate-fade-in">
          <p className="text-foreground leading-relaxed text-lg">
            {lesson.content[currentStep]}
          </p>
          
          <div className="flex justify-center gap-2 mt-6">
            {lesson.content.map((_, index) => (
              <div 
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>
      </main>

      <footer className="container max-w-lg mx-auto px-4 py-6">
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Anterior
          </Button>
          <Button 
            className="flex-1"
            onClick={handleNext}
          >
            {currentStep < lesson.content.length - 1 ? (
              <>
                Próximo
                <SkipForward className="w-4 h-4" />
              </>
            ) : (
              "Concluir"
            )}
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Lesson;
