import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const phrases = [
  { text: "Tap. Speak. Understand.", lang: "English" },
  { text: "Toca. Habla. Entiende.", lang: "Spanish" },
  { text: "Appuyez. Parlez. Comprenez.", lang: "French" },
  { text: "Tıkla. Konuş. Anla.", lang: "Turkish" },
  { text: "タップして、話して、理解する。", lang: "Japanese" },
];

// Animation variants for text transitions
const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { 
    opacity: 0,
    transition: { 
      staggerChildren: 0.05, 
      staggerDirection: -1,
      when: "afterChildren" 
    } 
  }
};

// Letter animation variants
const letterVariants = {
  initial: { 
    opacity: 0, 
    y: 20,
    rotateX: 90
  },
  animate: { 
    opacity: 1, 
    y: 0,
    rotateX: 0,
    transition: { 
      type: "spring", 
      stiffness: 200, 
      damping: 20
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    rotateX: -90,
    transition: { 
      duration: 0.2
    }
  }
};

export const TranslatingHeader = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Cycle through phrases
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
        setIsAnimating(false);
      }, 500); // Allow exit animation to play before changing text
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  // Get current phrase and split into characters for animation
  const currentPhrase = phrases[currentIndex].text;
  const letters = Array.from(currentPhrase);

  return (
    <div className="h-16 relative overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="text-center"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={containerVariants}
        >
          <div className="overflow-hidden">
            <motion.div className="flex justify-center">
              {letters.map((letter, i) => (
                <motion.span
                  key={`${currentIndex}-${i}`}
                  variants={letterVariants}
                  className="inline-block text-xl font-medium text-slate-700 mx-[0.5px]"
                  style={{ 
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.div>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xs text-slate-500 mt-1"
          >
            {phrases[currentIndex].lang}
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
