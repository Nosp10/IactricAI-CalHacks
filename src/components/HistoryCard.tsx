import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { ClaimCard } from './ClaimCard';

interface Claim {
  id: string;
  text: string;
  status: 'true' | 'false' | 'unsure';
  explanation: string;
}

interface HistoryCardProps {
  date: string;
  doctor: string;
  diagnosis: string;
  claims: Claim[];
}

export const HistoryCard = ({ 
  date, 
  doctor, 
  diagnosis, 
  claims 
}: HistoryCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      className="mb-4 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-center">
          <p className="text-sm text-slate-500">{date}</p>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaChevronDown className="text-slate-400" />
          </motion.div>
        </div>
        <h3 className="font-medium mt-1">{doctor}</h3>
        <p className="text-sm text-slate-700">{diagnosis}</p>
        
        <div className="flex gap-2 mt-2">
          {claims.some(c => c.status === 'true') && (
            <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
              {claims.filter(c => c.status === 'true').length} Verified
            </span>
          )}
          
          {claims.some(c => c.status === 'false') && (
            <span className="px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded-full">
              {claims.filter(c => c.status === 'false').length} Incorrect
            </span>
          )}
          
          {claims.some(c => c.status === 'unsure') && (
            <span className="px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full">
              {claims.filter(c => c.status === 'unsure').length} Uncertain
            </span>
          )}
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-slate-200 px-4 py-3"
          >
            <h4 className="font-medium text-sm mb-2">Claims Analysis</h4>
            {claims.map(claim => (
              <ClaimCard 
                key={claim.id}
                claim={claim.text}
                status={claim.status}
                explanation={claim.explanation}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
