import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, CheckCircle, XCircle, Trophy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const quizData: Record<string, {
  title: string;
  questions: Array<{
    id: number;
    question: string;
    options: string[];
    correct: number;
  }>;
}> = {
  matematica: {
    title: "Equações do 2º grau",
    questions: [
      {
        id: 1,
        question: "Qual é a solução de x² - 4 = 0?",
        options: ["x = 2", "x = ±2", "x = 4", "x = -2"],
        correct: 1,
      },
      {
        id: 2,
        question: "Na equação ax² + bx + c = 0, o que é 'a'?",
        options: ["Termo independente", "Coeficiente angular", "Coeficiente quadrático", "Raiz"],
        correct: 2,
      },
      {
        id: 3,
        question: "Quantas raízes reais tem x² + 1 = 0?",
        options: ["Uma", "Duas", "Nenhuma", "Infinitas"],
        correct: 2,
      },
      {
        id: 4,
        question: "Qual fórmula resolve equações do 2º grau?",
        options: ["Pitágoras", "Bhaskara", "Newton", "Euler"],
        correct: 1,
      },
      {
        id: 5,
        question: "Se Δ > 0, a equação tem:",
        options: ["Nenhuma raiz", "Uma raiz", "Duas raízes iguais", "Duas raízes diferentes"],
        correct: 3,
      },
    ],
  },
  portugues: {
    title: "Verbos Irregulares",
    questions: [
      {
        id: 1,
        question: "Qual é o particípio de 'fazer'?",
        options: ["Fazido", "Feito", "Fazendo", "Fez"],
        correct: 1,
      },
      {
        id: 2,
        question: "'Eu ponho' está em qual tempo verbal?",
        options: ["Pretérito", "Futuro", "Presente", "Imperativo"],
        correct: 2,
      },
      {
        id: 3,
        question: "Qual verbo é irregular?",
        options: ["Cantar", "Andar", "Ir", "Falar"],
        correct: 2,
      },
      {
        id: 4,
        question: "O pretérito perfeito de 'ver' é:",
        options: ["Vi", "Verei", "Via", "Vendo"],
        correct: 0,
      },
      {
        id: 5,
        question: "'Trago' é forma de qual verbo?",
        options: ["Tragar", "Trazer", "Tragir", "Trair"],
        correct: 1,
      },
    ],
  },
  ciencias: {
    title: "Sistema Solar",
    questions: [
      {
        id: 1,
        question: "Qual é o maior planeta do Sistema Solar?",
        options: ["Saturno", "Júpiter", "Netuno", "Urano"],
        correct: 1,
      },
      {
        id: 2,
        question: "Quantos planetas há no Sistema Solar?",
        options: ["7", "8", "9", "10"],
        correct: 1,
      },
      {
        id: 3,
        question: "Qual planeta é conhecido como 'planeta vermelho'?",
        options: ["Vênus", "Mercúrio", "Marte", "Júpiter"],
        correct: 2,
      },
      {
        id: 4,
        question: "O Sol é uma:",
        options: ["Planeta", "Estrela", "Lua", "Asteróide"],
        correct: 1,
      },
      {
        id: 5,
        question: "Qual planeta tem anéis visíveis?",
        options: ["Terra", "Marte", "Saturno", "Vênus"],
        correct: 2,
      },
    ],
  },
};

const Quiz = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  
  const quiz = subjectId ? quizData[subjectId] || quizData.matematica : quizData.matematica;
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  const handleSelectAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleConfirm = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    setAnswers([...answers, selectedAnswer]);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers([]);
    setIsFinished(false);
  };

  const correctAnswers = answers.filter((answer, index) => 
    answer === quiz.questions[index].correct
  ).length;
  const score = Math.round((correctAnswers / quiz.questions.length) * 100);
  const xpEarned = correctAnswers * 20;

  if (isFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl p-8 shadow-lg max-w-md w-full text-center animate-slide-up">
          <div className={cn(
            "w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center",
            score >= 80 ? "bg-success/10" : score >= 50 ? "bg-warning/10" : "bg-destructive/10"
          )}>
            <Trophy className={cn(
              "w-10 h-10",
              score >= 80 ? "text-success" : score >= 50 ? "text-warning" : "text-destructive"
            )} />
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {score >= 80 ? "Excelente!" : score >= 50 ? "Bom trabalho!" : "Continue praticando!"}
          </h2>
          
          <p className="text-muted-foreground mb-6">
            Você acertou {correctAnswers} de {quiz.questions.length} perguntas
          </p>
          
          <div className="bg-secondary rounded-xl p-4 mb-6">
            <div className="text-4xl font-bold text-foreground mb-1">{score}%</div>
            <div className="text-sm text-muted-foreground">Pontuação final</div>
          </div>
          
          <div className="bg-primary/10 rounded-xl p-4 mb-6">
            <div className="text-2xl font-bold text-primary">+{xpEarned} XP</div>
            <div className="text-sm text-primary/80">Experiência ganha</div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={handleRestart}>
              <RotateCcw className="w-4 h-4" />
              Refazer
            </Button>
            <Button className="flex-1" onClick={() => navigate(-1)}>
              Continuar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="container max-w-lg mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Quiz</span>
          </div>
          <div className="w-10" />
        </div>
        
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2 text-center">
          Pergunta {currentQuestion + 1} de {quiz.questions.length}
        </p>
      </header>

      {/* Question */}
      <main className="flex-1 container max-w-lg mx-auto px-4 py-6">
        <div className="animate-fade-in">
          <h2 className="text-xl font-bold text-foreground mb-8 text-center">
            {question.question}
          </h2>
          
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correct;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;
              
              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={showResult}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 text-left transition-all duration-200",
                    !showResult && isSelected && "border-primary bg-primary/5",
                    !showResult && !isSelected && "border-border bg-card hover:border-primary/50",
                    showCorrect && "border-success bg-success/10",
                    showWrong && "border-destructive bg-destructive/10"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "font-medium",
                      showCorrect && "text-success",
                      showWrong && "text-destructive"
                    )}>
                      {option}
                    </span>
                    {showCorrect && <CheckCircle className="w-5 h-5 text-success" />}
                    {showWrong && <XCircle className="w-5 h-5 text-destructive" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container max-w-lg mx-auto px-4 py-6">
        {!showResult ? (
          <Button 
            className="w-full" 
            size="lg"
            disabled={selectedAnswer === null}
            onClick={handleConfirm}
          >
            Confirmar Resposta
          </Button>
        ) : (
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleNext}
          >
            {currentQuestion < quiz.questions.length - 1 ? "Próxima Pergunta" : "Ver Resultado"}
          </Button>
        )}
      </footer>
    </div>
  );
};

export default Quiz;
