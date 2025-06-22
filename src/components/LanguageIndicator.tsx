import { motion } from 'framer-motion';
import { FaLanguage, FaExchangeAlt } from 'react-icons/fa';

interface LanguageIndicatorProps {
  sourceLanguage: string;
  targetLanguage: string;
  isDetecting?: boolean;
  isTranslating?: boolean;
}

export const LanguageIndicator = ({
  sourceLanguage,
  targetLanguage,
  isDetecting = false,
  isTranslating = false
}: LanguageIndicatorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between py-2 px-3 bg-white rounded-lg shadow-sm border border-slate-200 text-sm"
    >
      <div className="flex items-center gap-2">
        <FaLanguage className="text-indigo-500" size={16} />
        <div>
          {isDetecting ? (
            <div className="flex items-center gap-2">
              <span>Detecting language</span>
              <motion.div
                className="w-2 h-2 bg-amber-500 rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="font-medium">{sourceLanguage}</span>
              <FaExchangeAlt size={10} className="text-slate-400" />
              <span className="font-medium">{targetLanguage}</span>
            </div>
          )}
        </div>
      </div>
      
      {isTranslating && !isDetecting && (
        <div className="flex items-center gap-1.5 text-xs text-indigo-600">
          <motion.div
            className="w-1.5 h-1.5 bg-indigo-500 rounded-full"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span>Auto-translating</span>
        </div>
      )}
    </motion.div>
  );
};
