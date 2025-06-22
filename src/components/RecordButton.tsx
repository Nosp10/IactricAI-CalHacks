import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaStop } from 'react-icons/fa';

interface RecordButtonProps {
  onStart: () => void;
  onStop: () => void;
}

export const RecordButton = ({ onStart, onStop }: RecordButtonProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let interval: number | undefined;
    
    if (isRecording) {
      interval = window.setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setDuration(0);
    onStart();
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    onStop();
  };

  // Format seconds as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Multiple animated pulse rings when recording for enhanced effect */}
      <AnimatePresence>
        {isRecording && (
          <>
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ 
                scale: [1, 1.8, 1], 
                opacity: [0.2, 0.4, 0.2],
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="absolute rounded-full bg-red-500/20 w-20 h-20"
            />
            
            <motion.div
              initial={{ scale: 1, opacity: 0.3 }}
              animate={{ 
                scale: [1, 1.4, 1], 
                opacity: [0.15, 0.3, 0.15],
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                duration: 2,
                delay: 0.4,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="absolute rounded-full bg-red-500/15 w-16 h-16"
            />
            
            <motion.div
              initial={{ scale: 1, opacity: 0.2 }}
              animate={{ 
                scale: [1, 1.2, 1], 
                opacity: [0.1, 0.2, 0.1],
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                duration: 1.5,
                delay: 0.8,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="absolute rounded-full bg-red-500/10 w-14 h-14"
            />
          </>
        )}
      </AnimatePresence>
      
      {/* Main button with enhanced animations */}
      <motion.button
        className={`w-16 h-16 rounded-full flex items-center justify-center ${
          isRecording 
            ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30' 
            : 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30'
        }`}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05, boxShadow: isRecording ? '0 10px 25px -5px rgba(239, 68, 68, 0.4)' : '0 10px 25px -5px rgba(79, 70, 229, 0.4)' }}
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        initial={false}
        animate={isRecording ? {
          boxShadow: [
            '0 4px 6px -1px rgba(239, 68, 68, 0.1), 0 2px 4px -1px rgba(239, 68, 68, 0.06)', 
            '0 12px 18px -6px rgba(239, 68, 68, 0.3), 0 6px 10px -4px rgba(239, 68, 68, 0.2)',
            '0 4px 6px -1px rgba(239, 68, 68, 0.1), 0 2px 4px -1px rgba(239, 68, 68, 0.06)'
          ],
        } : {}}
        transition={{ 
          duration: 2,
          repeat: isRecording ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        {isRecording ? (
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          >
            <FaStop size={20} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              transition: { 
                type: "spring", 
                stiffness: 500, 
                damping: 25 
              } 
            }}
            exit={{ scale: 0 }}
          >
            <FaMicrophone size={24} />
          </motion.div>
        )}
      </motion.button>
      
      {/* Enhanced timer display */}
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 30 }}
            className="mt-3 text-sm font-medium text-slate-700 bg-white/90 px-4 py-1.5 rounded-full shadow-sm border border-slate-200/50 backdrop-blur-sm"
          >
            <motion.span
              animate={{ color: ['#ef4444', '#1f2937', '#ef4444'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mr-1.5"
            >
              ●
            </motion.span>
            {formatTime(duration)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
