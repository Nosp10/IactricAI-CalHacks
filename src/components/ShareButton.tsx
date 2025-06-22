import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShare, FaLink, FaEnvelope, FaWhatsapp, FaRegCopy, FaCheck } from 'react-icons/fa';

interface ShareButtonProps {
  sessionId?: string;
  title?: string;
}

export const ShareButton = ({ sessionId = '123', title = 'Medical Session' }: ShareButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const shareUrl = `https://iatricai.com/shared/${sessionId}`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };
  
  const handleShare = (platform: string) => {
    let shareLink = '';
    
    switch (platform) {
      case 'email':
        shareLink = `mailto:?subject=Medical Session Report: ${title}&body=Check out my medical session report: ${shareUrl}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodeURIComponent(`Check out my medical session report: ${shareUrl}`)}`;
        break;
      default:
        // Use Web Share API if available
        if (navigator.share) {
          navigator.share({
            title: `Medical Session: ${title}`,
            text: 'Check out my medical session report',
            url: shareUrl,
          });
          setIsOpen(false);
          return;
        }
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank');
    }
    
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full"
      >
        <FaShare size={14} />
        <span>Share Session</span>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 p-4 bg-white rounded-xl shadow-lg border border-slate-200 w-64 z-10"
          >
            <h3 className="font-medium text-slate-800 mb-3">Share session</h3>
            
            <div className="flex flex-col gap-2 mb-3">
              <button
                onClick={() => handleShare('email')}
                className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded-md transition-colors"
              >
                <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                  <FaEnvelope size={14} />
                </div>
                <span className="text-sm">Email</span>
              </button>
              
              <button
                onClick={() => handleShare('whatsapp')}
                className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded-md transition-colors"
              >
                <div className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
                  <FaWhatsapp size={14} />
                </div>
                <span className="text-sm">WhatsApp</span>
              </button>
              
              <button
                onClick={() => handleShare('other')}
                className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded-md transition-colors"
              >
                <div className="w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full">
                  <FaLink size={14} />
                </div>
                <span className="text-sm">More options</span>
              </button>
            </div>
            
            <div className="mt-2 pt-2 border-t border-slate-200">
              <div className="flex items-center justify-between gap-2 bg-slate-50 p-2 rounded-md">
                <div className="text-xs text-slate-600 truncate flex-1">
                  {shareUrl}
                </div>
                <button
                  onClick={handleCopyLink}
                  className="p-1.5 bg-white rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100"
                >
                  {isCopied ? <FaCheck size={12} className="text-green-500" /> : <FaRegCopy size={12} />}
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Includes audio, analysis, and sources
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
