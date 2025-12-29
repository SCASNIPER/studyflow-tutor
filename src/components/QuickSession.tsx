import { Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickSessionProps {
  title: string;
  subject: string;
  duration: string;
  type: "quiz" | "flashcard" | "review";
  delay?: number;
}

const typeStyles = {
  quiz: "bg-primary/10 text-primary",
  flashcard: "bg-accent/10 text-accent",
  review: "bg-success/10 text-success",
};

const typeLabels = {
  quiz: "Quiz",
  flashcard: "Flashcards",
  review: "Revisão",
};

export function QuickSession({ title, subject, duration, type, delay = 0 }: QuickSessionProps) {
  return (
    <div 
      className="flex items-center gap-4 p-4 bg-card rounded-xl shadow-sm hover:shadow-card transition-all duration-200 cursor-pointer group animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={cn("px-3 py-1.5 rounded-lg text-xs font-medium", typeStyles[type])}>
        {typeLabels[type]}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground truncate">{title}</h4>
        <p className="text-sm text-muted-foreground">{subject}</p>
      </div>
      
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span>{duration}</span>
      </div>
      
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
    </div>
  );
}
