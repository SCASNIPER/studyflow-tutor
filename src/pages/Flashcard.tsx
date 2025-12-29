import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, RotateCcw, ThumbsUp, ThumbsDown, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const flashcardsData: Record<string, {
  title: string;
  cards: Array<{
    id: number;
    front: string;
    back: string;
  }>;
}> = {
  matematica: {
    title: "Matemática - Fórmulas",
    cards: [
      { id: 1, front: "Fórmula de Bhaskara", back: "x = (-b ± √Δ) / 2a\nonde Δ = b² - 4ac" },
      { id: 2, front: "Área do círculo", back: "A = π × r²" },
      { id: 3, front: "Teorema de Pitágoras", back: "a² = b² + c²\n(hipotenusa² = catetos²)" },
      { id: 4, front: "Área do triângulo", back: "A = (base × altura) / 2" },
      { id: 5, front: "Volume da esfera", back: "V = (4/3) × π × r³" },
    ],
  },
  portugues: {
    title: "Português - Verbos",
    cards: [
      { id: 1, front: "O que são verbos irregulares?", back: "São verbos que sofrem alterações no radical ou nas desinências durante a conjugação" },
      { id: 2, front: "Conjugue 'fazer' no pretérito perfeito (eu)", back: "Eu fiz" },
      { id: 3, front: "Qual o particípio de 'ver'?", back: "Visto" },
      { id: 4, front: "Conjugue 'ir' no futuro do presente (nós)", back: "Nós iremos" },
      { id: 5, front: "O que é modo subjuntivo?", back: "Expressa dúvida, desejo, hipótese. Ex: 'Se eu pudesse...'" },
    ],
  },
  ciencias: {
    title: "Ciências - Sistema Solar",
    cards: [
      { id: 1, front: "Planetas rochosos", back: "Mercúrio, Vênus, Terra e Marte" },
      { id: 2, front: "Planetas gasosos", back: "Júpiter, Saturno, Urano e Netuno" },
      { id: 3, front: "Distância Terra-Sol", back: "Aproximadamente 150 milhões de km (1 UA)" },
      { id: 4, front: "Maior lua do Sistema Solar", back: "Ganimedes (lua de Júpiter)" },
      { id: 5, front: "Composição do Sol", back: "Principalmente hidrogênio (74%) e hélio (24%)" },
    ],
  },
};

const Flashcard = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  
  const flashcards = subjectId ? flashcardsData[subjectId] || flashcardsData.matematica : flashcardsData.matematica;
  
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<number[]>([]);
  const [unknownCards, setUnknownCards] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const card = flashcards.cards[currentCard];
  const progress = ((currentCard + 1) / flashcards.cards.length) * 100;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleResponse = (known: boolean) => {
    if (known) {
      setKnownCards([...knownCards, card.id]);
    } else {
      setUnknownCards([...unknownCards, card.id]);
    }
    
    if (currentCard < flashcards.cards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentCard(0);
    setIsFlipped(false);
    setKnownCards([]);
    setUnknownCards([]);
    setIsFinished(false);
  };

  if (isFinished) {
    const score = Math.round((knownCards.length / flashcards.cards.length) * 100);
    const xpEarned = knownCards.length * 15;
    
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl p-8 shadow-lg max-w-md w-full text-center animate-slide-up">
          <div className="w-20 h-20 rounded-full mx-auto mb-6 bg-primary/10 flex items-center justify-center">
            <Check className="w-10 h-10 text-primary" />
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-2">Sessão Completa!</h2>
          
          <p className="text-muted-foreground mb-6">
            Você revisou todos os {flashcards.cards.length} cartões
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-success/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-success">{knownCards.length}</div>
              <div className="text-sm text-success/80">Sabia</div>
            </div>
            <div className="bg-destructive/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-destructive">{unknownCards.length}</div>
              <div className="text-sm text-destructive/80">Revisar</div>
            </div>
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
          <h1 className="text-lg font-semibold text-foreground">Flashcards</h1>
          <div className="w-10" />
        </div>
        
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2 text-center">
          Cartão {currentCard + 1} de {flashcards.cards.length}
        </p>
      </header>

      {/* Card */}
      <main className="flex-1 container max-w-lg mx-auto px-4 py-6 flex items-center justify-center">
        <div 
          className="w-full aspect-[3/4] max-h-[400px] perspective-1000 cursor-pointer"
          onClick={handleFlip}
        >
          <div className={cn(
            "relative w-full h-full transition-transform duration-500 transform-style-3d",
            isFlipped && "rotate-y-180"
          )}
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
          >
            {/* Front */}
            <div 
              className="absolute inset-0 bg-gradient-primary rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-glow backface-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <p className="text-sm text-primary-foreground/80 mb-4">Toque para virar</p>
              <h3 className="text-2xl font-bold text-primary-foreground">{card.front}</h3>
            </div>
            
            {/* Back */}
            <div 
              className="absolute inset-0 bg-card rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-lg border-2 border-primary backface-hidden"
              style={{ 
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)"
              }}
            >
              <p className="text-sm text-muted-foreground mb-4">Resposta</p>
              <h3 className="text-xl font-bold text-foreground whitespace-pre-line">{card.back}</h3>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container max-w-lg mx-auto px-4 py-6">
        {isFlipped ? (
          <div className="flex gap-4">
            <Button 
              variant="outline"
              className="flex-1 h-14 border-destructive text-destructive hover:bg-destructive/10"
              onClick={() => handleResponse(false)}
            >
              <ThumbsDown className="w-5 h-5 mr-2" />
              Não sabia
            </Button>
            <Button 
              className="flex-1 h-14"
              variant="success"
              onClick={() => handleResponse(true)}
            >
              <ThumbsUp className="w-5 h-5 mr-2" />
              Sabia!
            </Button>
          </div>
        ) : (
          <Button 
            className="w-full h-14" 
            variant="outline"
            onClick={handleFlip}
          >
            Toque no cartão para ver a resposta
          </Button>
        )}
      </footer>
    </div>
  );
};

export default Flashcard;
