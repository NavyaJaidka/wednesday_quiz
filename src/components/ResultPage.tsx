import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Character } from "@/data/quizData";
import { Share2, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import wednesdayImg from "@/assets/wednesday.jpg";
import morticiaImg from "@/assets/morticia.jpg";
import gomezImg from "@/assets/gomez.jpg";
import festerImg from "@/assets/fester.jpg";
import pugsleyImg from "@/assets/pugsley.jpg";
import thingImg from "@/assets/thing.jpg";
import lurchImg from "@/assets/lurch.jpg";
import grandmamaImg from "@/assets/grandmama.jpg";

interface ResultPageProps {
  character: Character;
  onRestart: () => void;
}

const imageMap: Record<string, string> = {
  wednesday: wednesdayImg,
  morticia: morticiaImg,
  gomez: gomezImg,
  fester: festerImg,
  pugsley: pugsleyImg,
  thing: thingImg,
  lurch: lurchImg,
  grandmama: grandmamaImg,
};

const confettiEmojis = ["🦇", "🕷️", "🕸️", "💀", "👻"];

export default function ResultPage({ character, onRestart }: ResultPageProps) {
  const { toast } = useToast();
  const [confetti, setConfetti] = useState<{ id: number; emoji: string; x: number; delay: number }[]>([]);

  useEffect(() => {
    const newConfetti = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      emoji: confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)],
      x: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setConfetti(newConfetti);
  }, []);

  const handleShare = async () => {
    const text = `I got ${character.name} on the Wednesday Character Quiz! 🕸️`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Wednesday Character Quiz",
          text: text,
          url: window.location.href,
        });
      } catch (err) {
        copyToClipboard(text);
      }
    } else {
      copyToClipboard(text);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text + " " + window.location.href);
    toast({
      title: "Copied to clipboard!",
      description: "Share your result with friends",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Spooky confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {confetti.map((item) => (
          <motion.div
            key={item.id}
            className="absolute text-2xl"
            initial={{ y: -100, x: `${item.x}%`, opacity: 1, rotate: 0 }}
            animate={{
              y: window.innerHeight + 100,
              rotate: 360,
              opacity: 0,
            }}
            transition={{
              duration: 3,
              delay: item.delay,
              ease: "easeIn",
            }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="bg-card border-2 border-border rounded-lg overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.3)]">
          <div className="relative aspect-video overflow-hidden">
            <motion.img
              src={imageMap[character.image]}
              alt={character.name}
              initial={{ scale: 1.2, rotate: -5, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          </div>

          <div className="p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
                You are...
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {character.name}
              </h2>
              
              <p className="text-center text-lg mb-6 text-muted-foreground">
                {character.description}
              </p>

              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {character.traits.map((trait, index) => (
                  <motion.span
                    key={trait}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="px-4 py-2 rounded-full bg-primary/20 text-primary border border-primary/30 text-sm font-medium"
                  >
                    {trait}
                  </motion.span>
                ))}
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  onClick={handleShare}
                  className="gap-2 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                >
                  <Share2 className="h-5 w-5" />
                  Share Result
                </Button>
                <Button
                  onClick={onRestart}
                  variant="outline"
                  className="gap-2 hover:scale-105 transition-transform"
                >
                  <RotateCcw className="h-5 w-5" />
                  Take Again
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
