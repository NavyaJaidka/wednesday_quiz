import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { questions, shuffleAnswers, calculateResult, Character } from "@/data/quizData";
import SpookyTransitions from "./SpookyTransitions";
import SkullIntro from "./SkullIntro";

interface QuizPageProps {
  onComplete: (character: Character) => void;
}

export default function QuizPage({ onComplete }: QuizPageProps) {
  const [showSkull, setShowSkull] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [shuffledAnswers, setShuffledAnswers] = useState(shuffleAnswers(questions[0].answers));
  const [transitionTrigger, setTransitionTrigger] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    if (!showSkull && currentQuestion < questions.length) {
      setShuffledAnswers(shuffleAnswers(questions[currentQuestion].answers));
      setSelectedAnswer(null);
    }
  }, [currentQuestion, showSkull]);

  const handleAnswer = (character: string, index: number) => {
    setSelectedAnswer(index);
    
    setTimeout(() => {
      const newAnswers = [...answers, character];
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setTransitionTrigger(prev => prev + 1);
        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1);
        }, 600);
      } else {
        const result = calculateResult(newAnswers);
        setTimeout(() => {
          onComplete(result);
        }, 800);
      }
    }, 500);
  };

  if (showSkull) {
    return <SkullIntro onComplete={() => setShowSkull(false)} />;
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <SpookyTransitions trigger={transitionTrigger} />
      
      {/* Optimized animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl will-change-transform"
            style={{
              left: `${20 + i * 25}%`,
              top: `${20 + i * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {["👻", "🦇", "💀", "🕸️"][i]}
          </motion.div>
        ))}
      </div>

      {/* Subtle fog effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-primary/3 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: '30%',
            top: '20%',
          }}
        />
      </div>

      <div className="w-full max-w-3xl relative z-10">
        {/* Enhanced progress bar */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative h-3 bg-secondary/50 rounded-full overflow-hidden backdrop-blur-sm border border-border/50">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%]"
              initial={{ width: 0 }}
              animate={{ 
                width: `${progress}%`,
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ 
                width: { duration: 0.5 },
                backgroundPosition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              style={{ 
                boxShadow: "0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--accent))" 
              }}
            />
          </div>
          <motion.p 
            className="text-sm text-muted-foreground text-center mt-3 font-medium"
            key={currentQuestion}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Question {currentQuestion + 1} of {questions.length}
          </motion.p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative bg-card/95 backdrop-blur-md border border-border/50 rounded-2xl p-8 md:p-12 shadow-2xl">
              {/* Question */}
              <motion.h2 
                className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {questions[currentQuestion].question}
              </motion.h2>

              {/* Answer options in 2-column grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shuffledAnswers.map((answer, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 0.15 + index * 0.05,
                      duration: 0.2,
                    }}
                    className="will-change-transform"
                  >
                    <Button
                      onClick={() => handleAnswer(answer.character, index)}
                      disabled={selectedAnswer !== null}
                      variant="outline"
                      className={`
                        w-full text-left justify-start h-auto py-4 px-4 text-sm md:text-base
                        transition-all duration-200 relative overflow-hidden
                        bg-card/50 backdrop-blur-sm whitespace-normal
                        ${selectedAnswer === index 
                          ? 'border-primary bg-primary/20 shadow-lg shadow-primary/20' 
                          : 'hover:border-primary/50 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10'
                        }
                      `}
                    >
                      {/* Answer number badge */}
                      <span className="inline-flex items-center justify-center min-w-[28px] h-7 rounded-lg bg-background/80 text-foreground text-xs font-bold mr-3 border border-border/50 shrink-0">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      
                      <span className="flex-1 font-medium leading-snug">{answer.text}</span>
                      
                      {/* Selection indicator */}
                      {selectedAnswer === index && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-2 text-primary text-xl"
                        >
                          ✓
                        </motion.span>
                      )}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Simplified decorative elements */}
        <div className="absolute -top-8 -left-8 text-5xl opacity-20">
          🕸️
        </div>
        <div className="absolute -bottom-8 -right-8 text-5xl opacity-20">
          🦇
        </div>
      </div>
    </div>
  );
}
