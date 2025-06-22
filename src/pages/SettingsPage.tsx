import { useState } from 'react';
import { motion } from 'framer-motion';
import { NavBar } from '../components/NavBar';
import { FaGlobe, FaUniversalAccess, FaEnvelope, FaShieldAlt, FaToggleOn, FaToggleOff } from 'react-icons/fa';

export const SettingsPage = () => {
  const [language, setLanguage] = useState('English');
  const [fontSize, setFontSize] = useState('Medium');
  const [caregiverEmail, setCaregiverEmail] = useState('');
  const [autoDelete, setAutoDelete] = useState(false);
  
  const languages = ['English', 'Spanish', 'French', 'Turkish', 'Japanese'];
  const fontSizes = ['Small', 'Medium', 'Large', 'Extra Large'];
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <NavBar title="Settings" showBack={true} />
      
      <div className="flex-grow p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <FaGlobe className="text-indigo-500" />
            <h2 className="font-semibold">Language</h2>
          </div>
          
          <div className="pl-8">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <FaUniversalAccess className="text-indigo-500" />
            <h2 className="font-semibold">Accessibility</h2>
          </div>
          
          <div className="pl-8">
            <label className="block text-sm text-slate-600 mb-1">Font Size</label>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md"
            >
              {fontSizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <FaEnvelope className="text-indigo-500" />
            <h2 className="font-semibold">Caregiver Notifications</h2>
          </div>
          
          <div className="pl-8">
            <label className="block text-sm text-slate-600 mb-1">Email Address (Optional)</label>
            <input
              type="email"
              value={caregiverEmail}
              onChange={(e) => setCaregiverEmail(e.target.value)}
              placeholder="caregiver@example.com"
              className="w-full p-2 border border-slate-300 rounded-md"
            />
            <p className="text-xs text-slate-500 mt-1">
              Session reports will be sent to this email address
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <FaShieldAlt className="text-indigo-500" />
            <h2 className="font-semibold">Privacy</h2>
          </div>
          
          <div className="pl-8">
            <div className="flex items-center justify-between">
              <div>
                <label className="block font-medium">Auto-Delete Sessions</label>
                <p className="text-xs text-slate-500">
                  Automatically delete sessions after 30 days
                </p>
              </div>
              <button
                onClick={() => setAutoDelete(!autoDelete)}
                className="text-2xl text-indigo-600"
              >
                {autoDelete ? <FaToggleOn /> : <FaToggleOff />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
