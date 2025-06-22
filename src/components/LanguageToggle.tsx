import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGlobe } from 'react-icons/fa';

interface LanguageToggleProps {
  onLanguageChange: (language: 'english' | 'spanish' | 'telugu') => void;
  currentLanguage: 'english' | 'spanish' | 'telugu';
}

export const LanguageToggle = ({ onLanguageChange, currentLanguage }: LanguageToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const languages = [
    { id: 'english', name: 'English' },
    { id: 'spanish', name: 'Español' },
    { id: 'telugu', name: 'తెలుగు' }
  ];
  
  const handleLanguageSelect = (language: 'english' | 'spanish' | 'telugu') => {
    onLanguageChange(language);
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
      >
        <FaGlobe className="text-indigo-500" />
        <span>
          {currentLanguage === 'english' ? 'English' : 
           currentLanguage === 'spanish' ? 'Español' : 'తెలుగు'}
        </span>
      </button>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-10 mt-1 w-36 rounded-md bg-white shadow-lg border border-slate-200"
        >
          <ul className="py-1">
            {languages.map(language => (
              <li key={language.id}>
                <button
                  onClick={() => handleLanguageSelect(language.id as 'english' | 'spanish' | 'telugu')}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    currentLanguage === language.id 
                      ? 'bg-indigo-50 text-indigo-600' 
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {language.name}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};
