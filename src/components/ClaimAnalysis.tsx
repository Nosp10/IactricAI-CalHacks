import { motion } from 'framer-motion';
import { useState } from 'react';

interface ClaimAnalysisProps {
  claim: string;
  isAnalyzing?: boolean;
  status?: 'true' | 'unverified' | 'vague';
  explanation?: string;
  followUpQuestion?: string;
}

export const ClaimAnalysis = ({ 
  claim, 
  isAnalyzing = false,
  status,
  explanation,
  followUpQuestion
}: ClaimAnalysisProps) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-4 bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden"
    >
      <div className="p-4">
        <p className="font-medium text-slate-800">{claim}</p>
        
        {isAnalyzing && (
          <div className="flex items-center gap-2 mt-2 text-sm text-amber-600">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            <span>Analyzing claim...</span>
          </div>
        )}
        
        {!isAnalyzing && status && (
          <>
            <div className={`mt-2 flex items-center gap-1.5 text-sm ${
              status === 'true' ? 'text-green-600' : 
              status === 'unverified' ? 'text-red-600' : 
              'text-amber-600'
            }`}>
              <span>
                {status === 'true' ? '✅ Verified' : 
                 status === 'unverified' ? '❌ Unverified' : 
                 '⚠️ Vague'}
              </span>
            </div>
            
            {explanation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-2 text-sm text-slate-600"
              >
                {explanation}
              </motion.div>
            )}
            
            {followUpQuestion && status !== 'true' && (
              <div className="mt-3">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-sm text-indigo-600 flex items-center gap-1.5"
                >
                  <span>{expanded ? '−' : '+'}</span>
                  <span>Follow-up question</span>
                </button>
                
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 p-3 bg-indigo-50 rounded text-sm text-slate-700"
                  >
                    {followUpQuestion}
                  </motion.div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};
