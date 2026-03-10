import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type TransitionType = "bats" | "hand" | "lightning" | null;

interface SpookyTransitionsProps {
  trigger: number;
}

export default function SpookyTransitions({ trigger }: SpookyTransitionsProps) {
  const [transition, setTransition] = useState<TransitionType>(null);

  useEffect(() => {
    if (trigger === 0) return;

    const transitions: TransitionType[] = ["bats", "hand", "lightning"];
    const randomTransition = transitions[Math.floor(Math.random() * transitions.length)];
    
    setTransition(randomTransition);
    
    const timer = setTimeout(() => {
      setTransition(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [trigger]);

  if (!transition) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {transition === "bats" && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: -100, y: Math.random() * window.innerHeight }}
              animate={{ x: window.innerWidth + 100, y: Math.random() * window.innerHeight - 50 }}
              transition={{ duration: 2, delay: i * 0.2 }}
              className="absolute text-4xl"
            >
              🦇
            </motion.div>
          ))}
        </>
      )}

      {transition === "hand" && (
        <motion.div
          initial={{ x: -100, y: window.innerHeight / 2 }}
          animate={{ x: window.innerWidth + 100 }}
          transition={{ duration: 2 }}
          className="absolute text-6xl"
          style={{ top: "50%" }}
        >
          🖐️
        </motion.div>
      )}

      {transition === "lightning" && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1, 0] }}
            transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.6, 1] }}
            className="absolute inset-0 bg-accent/30"
          />
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 0.5 }}
            className="absolute left-1/2 top-0 w-2 h-full bg-accent origin-top"
            style={{ 
              transform: "translateX(-50%) rotate(10deg)",
              boxShadow: "0 0 20px hsl(var(--accent))"
            }}
          />
        </>
      )}
    </div>
  );
}
