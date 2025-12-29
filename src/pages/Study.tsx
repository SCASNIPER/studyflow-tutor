import { useState } from "react";
import { Search, BookOpen, Calculator, FlaskConical, Globe, History, Palette, Play, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/BottomNav";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "Todos" },
  { id: "math", label: "Exatas" },
  { id: "languages", label: "Línguas" },
  { id: "science", label: "Ciências" },
  { id: "humanities", label: "Humanas" },
];

const courses = [
  { 
    id: 1, 
    title: "Matemática Básica", 
    icon: Calculator, 
    category: "math",
    lessons: 24, 
    duration: "8h 30min",
    color: "primary" as const,
    level: "Iniciante"
  },
  { 
    id: 2, 
    title: "Português e Redação", 
    icon: BookOpen, 
    category: "languages",
    lessons: 18, 
    duration: "6h 15min",
    color: "accent" as const,
    level: "Intermediário"
  },
  { 
    id: 3, 
    title: "Física Experimental", 
    icon: FlaskConical, 
    category: "science",
    lessons: 32, 
    duration: "12h 00min",
    color: "success" as const,
    level: "Avançado"
  },
  { 
    id: 4, 
    title: "História do Brasil", 
    icon: History, 
    category: "humanities",
    lessons: 20, 
    duration: "7h 45min",
    color: "warning" as const,
    level: "Iniciante"
  },
  { 
    id: 5, 
    title: "Geografia Mundial", 
    icon: Globe, 
    category: "humanities",
    lessons: 16, 
    duration: "5h 30min",
    color: "primary" as const,
    level: "Intermediário"
  },
  { 
    id: 6, 
    title: "Artes Visuais", 
    icon: Palette, 
    category: "humanities",
    lessons: 12, 
    duration: "4h 00min",
    color: "accent" as const,
    level: "Iniciante"
  },
];

const colorClasses = {
  primary: "from-primary to-primary-glow",
  accent: "from-accent to-orange-400",
  success: "from-success to-emerald-400",
  warning: "from-warning to-amber-400",
};

const Study = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pb-28">
      <main className="container max-w-lg mx-auto px-4 py-6">
        <header className="mb-6 animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground mb-2">Estudar</h1>
          <p className="text-muted-foreground">Escolha um curso para começar</p>
        </header>

        <div className="relative mb-6 animate-slide-up">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar cursos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-xl bg-card border-border"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide animate-slide-up" style={{ animationDelay: '100ms' }}>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "secondary"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex-shrink-0"
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredCourses.map((course, index) => (
            <div 
              key={course.id}
              className="bg-card rounded-2xl p-5 shadow-card hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="flex gap-4">
                <div className={cn(
                  "p-4 rounded-xl bg-gradient-to-br flex-shrink-0",
                  colorClasses[course.color]
                )}>
                  <course.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-foreground">{course.title}</h3>
                    <span className="text-xs font-medium px-2 py-1 rounded-lg bg-secondary text-secondary-foreground flex-shrink-0">
                      {course.level}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {course.lessons} lições
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </span>
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-4" variant="outline">
                <Play className="w-4 h-4" />
                Começar curso
              </Button>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum curso encontrado</p>
          </div>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Study;
