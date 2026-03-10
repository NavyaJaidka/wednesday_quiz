import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import skullImage from "@/assets/skull.jpg";

interface SkullIntroProps {
  onComplete: () => void;
}

export default function SkullIntro({ onComplete }: SkullIntroProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      {/* Pulsing background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 2.5, times: [0, 0.5, 1] }}
        className="absolute inset-0 bg-gradient-radial from-accent/30 via-primary/20 to-transparent"
      />
      
      {/* Skull with dramatic zoom */}
      <motion.img
        src={skullImage}
        alt="Skull"
        initial={{ scale: 0.05, opacity: 0, filter: "blur(20px)", rotate: -20 }}
        animate={{
          scale: [0.05, 1.2, 1.6, 2.5],
          opacity: [0, 1, 0.9, 0],
          filter: ["blur(20px)", "blur(0px)", "blur(2px)", "blur(30px)"],
          rotate: [-20, 0, 5, 15]
        }}
        transition={{ duration: 2.5, times: [0, 0.4, 0.7, 1], ease: "easeInOut" }}
        className="w-[600px] h-[600px] object-contain relative z-10"
        style={{ 
          filter: "drop-shadow(0 0 40px rgba(168, 85, 247, 0.8))" 
        }}
      />
      
      {/* Lightning flash effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0, 1, 0] }}
        transition={{ duration: 1, times: [0, 0.2, 0.4, 0.6, 1], delay: 0.5 }}
        className="absolute inset-0 bg-accent/20"
      />
      
      {/* Smoke particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32 rounded-full bg-muted/30 blur-3xl"
          initial={{ 
            x: "50%", 
            y: "50%", 
            scale: 0,
            opacity: 0 
          }}
          animate={{
            x: [
              "50%",
              `${50 + (Math.cos((i / 8) * Math.PI * 2) * 40)}%`,
            ],
            y: [
              "50%",
              `${50 + (Math.sin((i / 8) * Math.PI * 2) * 40)}%`,
            ],
            scale: [0, 1.5, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 2.5,
            times: [0, 0.6, 1],
            delay: 0.3 + i * 0.1,
          }}
        />
      ))}
    </motion.div>
  );
}
