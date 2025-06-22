import { motion } from 'framer-motion';
import { useState } from 'react';

interface ClaimCardProps {
  claim: string;
  status: 'true' | 'unverified' | 'vague';
  explanation: string;
  followUpQuestion?: string;
  language?: 'english' | 'spanish' | 'telugu';
}

export const ClaimCard = ({ 
  claim, 
  status, 
  explanation, 
  followUpQuestion,
  language = 'english'
}: ClaimCardProps) => {
  const [showFollowUp, setShowFollowUp] = useState(false);
  
  const statusIcons = {
    'true': '✅',
    'unverified': '❌',
    'vague': '⚠️'
  };
  
  const statusColors = {
    'true': 'bg-green-50 border-green-200',
    'unverified': 'bg-red-50 border-red-200',
    'vague': 'bg-amber-50 border-amber-200'
  };

  const statusLabels = {
    english: {
      'true': 'Verified',
      'unverified': 'Unverified',
      'vague': 'Vague'
    },
    spanish: {
      'true': 'Verificado',
      'unverified': 'No verificado',
      'vague': 'Ambiguo'
    },
    telugu: {
      'true': 'ధృవీకరించబడింది',
      'unverified': 'ధృవీకరించబడలేదు',
      'vague': 'అస్పష్టంగా ఉంది'
    }
  };
  
  const hasFollowUp = status !== 'true' && followUpQuestion;
  
  return (
    <motion.div 
      className={`p-4 rounded-lg border mb-3 ${statusColors[status]}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex gap-3">
        <div className="text-xl">{statusIcons[status]}</div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <p className="font-medium text-slate-800">{claim}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              status === 'true' ? 'bg-green-100 text-green-700' : 
              status === 'unverified' ? 'bg-red-100 text-red-700' : 
              'bg-amber-100 text-amber-700'
            }`}>
              {statusLabels[language][status]}
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-2">{explanation}</p>
          
          {hasFollowUp && (
            <div className="mt-3">
              <button 
                onClick={() => setShowFollowUp(!showFollowUp)}
                className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>{showFollowUp ? '−' : '+'}</span>
                <span>{language === 'english' ? 'Follow-up question' : 
                       language === 'spanish' ? 'Pregunta de seguimiento' : 
                       'అనుసరణ ప్రశ్న'}</span>
              </button>
              
              {showFollowUp && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 p-3 bg-white rounded border border-slate-200 text-sm"
                >
                  {followUpQuestion}
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
