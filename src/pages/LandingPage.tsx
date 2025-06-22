import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMicrophone } from 'react-icons/fa';
import { TranslatingHeader } from '../components/TranslatingHeader';
import { Button } from '../components/Button';

export const LandingPage = () => {
  const navigate = useNavigate();
  
  const handleStartRecording = () => {
    navigate('/record');
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">
          Iatric AI
        </h1>
        <p className="text-slate-600 max-w-xs mx-auto">
          <TranslatingHeader />
        </p>
      </motion.div>
      
      <motion.div 
        className="flex flex-col gap-4 mt-10 w-full max-w-xs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Button 
          variant="primary" 
          size="lg"
          icon={<FaMicrophone />}
          onClick={handleStartRecording}
          className="w-full shadow-md hover:shadow-lg transition-shadow"
        >
          Start Recording
        </Button>
      </motion.div>
      
      <motion.div
        className="mt-10 text-sm text-slate-500 max-w-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p>
          "Of the information patients remember, nearly 50% is remembered incorrectly."
          <br />
          <span className="text-slate-400 text-xs">— JAMA Internal Medicine</span>
        </p>
      </motion.div>
    </div>
  );
};
