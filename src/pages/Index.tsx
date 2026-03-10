import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CharacterCard from "@/components/CharacterCard";
import QuizPage from "@/components/QuizPage";
import ResultPage from "@/components/ResultPage";
import ThemeToggle from "@/components/ThemeToggle";
import { characters, Character } from "@/data/quizData";

type PageState = "home" | "quiz" | "result";

export default function Index() {
  const [page, setPage] = useState<PageState>("home");
  const [result, setResult] = useState<Character | null>(null);

  const handleStartQuiz = () => {
    setPage("quiz");
  };

  const handleQuizComplete = (character: Character) => {
    setResult(character);
    setPage("result");
  };

  const handleRestart = () => {
    setResult(null);
    setPage("home");
  };

  if (page === "quiz") {
    return <QuizPage onComplete={handleQuizComplete} />;
  }

  if (page === "result" && result) {
    return <ResultPage character={result} onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ThemeToggle />
      
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-6xl opacity-10"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🕸️
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-6xl opacity-10"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          🦇
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-1/4 text-6xl opacity-10"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          💀
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse-glow">
            Which Wednesday Character Are You?
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover your dark side in this mysteriously delightful Halloween quiz 🕸️
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleStartQuiz}
              size="lg"
              className="text-lg px-8 py-6 shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:shadow-[0_0_60px_rgba(168,85,247,0.7)] transition-all duration-300"
            >
              Start Quiz 💀
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Meet the Characters
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {characters.map((character, index) => (
              <CharacterCard key={character.id} character={character} index={index} />
            ))}
          </div>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-16 text-muted-foreground"
        >
          <p className="text-sm">
            A spooky Halloween experience 🎃 Share your results with friends!
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
