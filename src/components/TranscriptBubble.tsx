import { motion } from 'framer-motion';

interface TranscriptBubbleProps {
  speaker: 'Doctor' | 'Patient';
  text: string;
  hasClaim?: boolean;
  claimStatus?: 'verifying' | 'true' | 'false' | 'unsure';
}

export const TranscriptBubble = ({ 
  speaker, 
  text, 
  hasClaim = false,
  claimStatus
}: TranscriptBubbleProps) => {
  const isDoctor = speaker === 'Doctor';
  
  return (
    <motion.div
      className={`flex mb-3 ${isDoctor ? 'justify-start' : 'justify-end'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col max-w-[80%]">
        <span className={`text-xs ${isDoctor ? 'text-left' : 'text-right'} text-slate-500 mb-1`}>
          {speaker}
        </span>
        <div 
          className={`p-3 rounded-lg ${
            isDoctor 
              ? 'bg-white border border-slate-200 rounded-tl-none' 
              : 'bg-indigo-600 text-white rounded-tr-none'
          }`}
        >
          <p className="text-sm">{text}</p>
          
          {hasClaim && (
            <div className={`mt-2 text-xs rounded-md p-1.5 flex items-center gap-1.5 ${
              claimStatus === 'verifying' 
                ? 'bg-amber-100 text-amber-700' 
                : claimStatus === 'true'
                ? 'bg-green-100 text-green-700'
                : claimStatus === 'false'
                ? 'bg-red-100 text-red-700'
                : 'bg-slate-100 text-slate-700'
            }`}>
              {claimStatus === 'verifying' && (
                <>
                  <span className="inline-block w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                  <span>Analyzing claim...</span>
                </>
              )}
              {claimStatus === 'true' && (
                <>
                  <span className="text-green-500">✓</span>
                  <span>Verified</span>
                </>
              )}
              {claimStatus === 'false' && (
                <>
                  <span className="text-red-500">✗</span>
                  <span>Incorrect</span>
                </>
              )}
              {claimStatus === 'unsure' && (
                <>
                  <span className="text-slate-500">?</span>
                  <span>Uncertain</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
