import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaInfoCircle } from 'react-icons/fa';
import { NavBar } from '../components/NavBar';
import { ClaimCard } from '../components/ClaimCard';
import { ShareButton } from '../components/ShareButton';
import { LanguageIndicator } from '../components/LanguageIndicator';
import { LanguageToggle } from '../components/LanguageToggle';
import { SecondOpinion } from '../components/SecondOpinion';

export const SummaryPage = () => {
  const navigate = useNavigate();
  const [showSources, setShowSources] = useState<{[key: string]: boolean}>({});
  const [language, setLanguage] = useState<'english' | 'spanish' | 'telugu'>('english');
  
  const toggleSource = (claimId: string) => {
    setShowSources(prev => ({
      ...prev,
      [claimId]: !prev[claimId]
    }));
  };

  // Translations for content
  const translations = {
    english: {
      overview: "Overview",
      diagnosis: "You were diagnosed with mild bronchitis.",
      prescription: "The doctor prescribed amoxicillin.",
      rest: "You were advised to rest for 7 days.",
      claimAnalysis: "Claim Analysis",
      detailedClaimAnalysis: "Detailed Claim Analysis",
      viewSources: "View sources",
      hideSources: "Hide sources",
      sources: "Sources:",
      claim1: "Antibiotics help with viruses",
      claim1Explanation: "Antibiotics only work against bacterial infections, not viruses. Bronchitis is often viral.",
      claim1Question: "What treatments are actually effective for viral bronchitis?",
      claim2: "You need an immediate scan",
      claim2Explanation: "For uncomplicated bronchitis, scans aren't routinely recommended. However, they may be appropriate in specific cases.",
      claim2Question: "When would a scan be necessary for respiratory symptoms?",
      claim3: "Mild bronchitis needs rest",
      claim3Explanation: "Rest is recommended for recovery from bronchitis.",
      source1Title: "CDC Antibiotics Guidelines",
      source1Desc: "Official CDC guidance stating antibiotics do not treat viral infections.",
      source2Title: "WHO Antimicrobial Resistance Report",
      source2Desc: "Information on the dangers of inappropriate antibiotic use.",
      source3Title: "American Thoracic Society Guidelines",
      source3Desc: "Clinical guidelines for imaging in respiratory conditions.",
      source4Title: "Mayo Clinic: Bronchitis Recovery",
      source4Desc: "Clinical guidance on proper rest and recovery for bronchitis patients.",
      source5Title: "CDC Respiratory Illness Guidelines",
      source5Desc: "Official recommendations for recovery from bronchitis."
    },
    spanish: {
      overview: "Resumen",
      diagnosis: "Se le diagnosticó bronquitis leve.",
      prescription: "El médico le recetó amoxicilina.",
      rest: "Se le recomendó descansar durante 7 días.",
      claimAnalysis: "Análisis de Afirmaciones",
      detailedClaimAnalysis: "Análisis Detallado de Afirmaciones",
      viewSources: "Ver fuentes",
      hideSources: "Ocultar fuentes",
      sources: "Fuentes:",
      claim1: "Los antibióticos ayudan con los virus",
      claim1Explanation: "Los antibióticos solo funcionan contra infecciones bacterianas, no contra virus. La bronquitis suele ser viral.",
      claim1Question: "¿Qué tratamientos son realmente efectivos para la bronquitis viral?",
      claim2: "Necesita un escaneo inmediato",
      claim2Explanation: "Para la bronquitis no complicada, no se recomiendan rutinariamente escaneos. Sin embargo, pueden ser apropiados en casos específicos.",
      claim2Question: "¿Cuándo sería necesario un escaneo para síntomas respiratorios?",
      claim3: "La bronquitis leve necesita reposo",
      claim3Explanation: "Se recomienda reposo para la recuperación de la bronquitis.",
      source1Title: "Guías de Antibióticos del CDC",
      source1Desc: "Guía oficial del CDC que indica que los antibióticos no tratan infecciones virales.",
      source2Title: "Informe de Resistencia Antimicrobiana de la OMS",
      source2Desc: "Información sobre los peligros del uso inapropiado de antibióticos.",
      source3Title: "Guías de la Sociedad Torácica Americana",
      source3Desc: "Guías clínicas para imágenes en condiciones respiratorias.",
      source4Title: "Clínica Mayo: Recuperación de Bronquitis",
      source4Desc: "Guía clínica sobre descanso y recuperación adecuados para pacientes con bronquitis.",
      source5Title: "Guías de Enfermedades Respiratorias del CDC",
      source5Desc: "Recomendaciones oficiales para la recuperación de la bronquitis."
    },
    telugu: {
      overview: "సంక్షిప్త సమాచారం",
      diagnosis: "మీకు సాధారణ బ్రాంకైటిస్ నిర్ధారించబడింది.",
      prescription: "వైద్యుడు అమోక్సిసిలిన్ సూచించారు.",
      rest: "మీకు 7 రోజులు విశ్రాంతి తీసుకోవాలని సలహా ఇవ్వబడింది.",
      claimAnalysis: "వాదన విశ్లేషణ",
      detailedClaimAnalysis: "విస్తృత వాదన విశ్లేషణ",
      viewSources: "మూలాలను చూడండి",
      hideSources: "మూలాలను దాచండి",
      sources: "మూలాలు:",
      claim1: "యాంటీబయాటిక్స్ వైరస్‌లతో సహాయపడతాయి",
      claim1Explanation: "యాంటీబయాటిక్స్ వైరస్‌లకు కాకుండా బాక్టీరియల్ ఇన్ఫెక్షన్‌లకు మాత్రమే పని చేస్తాయి. బ్రాంకైటిస్ తరచుగా వైరల్.",
      claim1Question: "వైరల్ బ్రాంకైటిస్‌కు నిజంగా ఏ చికిత్సలు ప్రభావవంతంగా ఉంటాయి?",
      claim2: "మీకు వెంటనే స్కాన్ అవసరం",
      claim2Explanation: "సాధారణ బ్రాంకైటిస్‌కి స్కాన్‌లు సాధారణంగా సిఫార్సు చేయబడవు. అయితే, నిర్దిష్ట సందర్భాల్లో అవి సముచితం కావచ్చు.",
      claim2Question: "శ్వాస సంబంధిత లక్షణాలకు స్కాన్ ఎప్పుడు అవసరం?",
      claim3: "సాధారణ బ్రాంకైటిస్‌కి విశ్రాంతి అవసరం",
      claim3Explanation: "బ్రాంకైటిస్ నుండి కోలుకోవడానికి విశ్రాంతి సిఫార్సు చేయబడింది.",
      source1Title: "CDC యాంటీబయాటిక్స్ మార్గదర్శకాలు",
      source1Desc: "యాంటీబయాటిక్స్ వైరల్ ఇన్ఫెక్షన్లను చికిత్స చేయవని పేర్కొన్న CDC అధికారిక మార్గదర్శకం.",
      source2Title: "WHO యాంటీమైక్రోబియల్ రెసిస్టెన్స్ నివేదిక",
      source2Desc: "అనుచిత యాంటీబయాటిక్ వాడకం వల్ల కలిగే ప్రమాదాల గురించి సమాచారం.",
      source3Title: "అమెరికన్ థొరాసిక్ సొసైటీ మార్గదర్శకాలు",
      source3Desc: "శ్వాస సంబంధిత పరిస్థితుల్లో ఇమేజింగ్ కోసం క్లినికల్ మార్గదర్శకాలు.",
      source4Title: "మాయో క్లినిక్: బ్రాంకైటిస్ రికవరీ",
      source4Desc: "బ్రాంకైటిస్ రోగులకు సరైన విశ్రాంతి మరియు కోలుకోవడం గురించి క్లినికల్ మార్గదర్శకం.",
      source5Title: "CDC శ్వాస సంబంధిత వ్యాధి మార్గదర్శకాలు",
      source5Desc: "బ్రాంకైటిస్ నుండి కోలుకోవడానికి అధికారిక సిఫార్సులు."
    }
  };
  
  const t = translations[language];
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="flex items-center justify-between p-4 bg-white border-b border-slate-200">
        <NavBar title="Session Summary" showBack={true} />
        <div className="flex items-center gap-2">
          <LanguageToggle 
            onLanguageChange={setLanguage}
            currentLanguage={language}
          />
          <ShareButton title="Bronchitis Consultation" />
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto pb-6">
        <div className="p-4">
          <div className="mb-4">
            <LanguageIndicator 
              sourceLanguage="English" 
              targetLanguage="Spanish" 
              isTranslating={true} 
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-4"
          >
            <h2 className="font-semibold text-lg mb-3">{t.overview}</h2>
            
            <div className="space-y-2 mb-4">
              <p className="text-slate-700">{t.diagnosis}</p>
              <p className="text-slate-700">{t.prescription}</p>
              <p className="text-slate-700">{t.rest}</p>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-3">
              <h3 className="font-medium text-sm mb-2">{t.claimAnalysis}</h3>
              
              <table className="w-full text-sm">
                <thead className="text-slate-500">
                  <tr>
                    <th className="text-left pb-2 font-medium">Claim</th>
                    <th className="text-left pb-2 font-medium">Status</th>
                    <th className="text-left pb-2 font-medium">Explanation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-200">
                    <td className="py-2 pr-2">{t.claim1}</td>
                    <td className="py-2 pr-2 text-red-500">❌ {language === 'english' ? 'Unverified' : language === 'spanish' ? 'No verificado' : 'ధృవీకరించబడలేదు'}</td>
                    <td className="py-2 text-slate-600 text-xs">{t.claim1Explanation}</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="py-2 pr-2">{t.claim2}</td>
                    <td className="py-2 pr-2 text-amber-500">⚠️ {language === 'english' ? 'Vague' : language === 'spanish' ? 'Ambiguo' : 'అస్పష్టంగా ఉంది'}</td>
                    <td className="py-2 text-slate-600 text-xs">{t.claim2Explanation}</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="py-2 pr-2">{t.claim3}</td>
                    <td className="py-2 pr-2 text-green-500">✅ {language === 'english' ? 'Verified' : language === 'spanish' ? 'Verificado' : 'ధృవీకరించబడింది'}</td>
                    <td className="py-2 text-slate-600 text-xs">{t.claim3Explanation}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center text-sm text-slate-500">
                <span>Scroll down for more details</span>
                <FaChevronDown className="ml-1 animate-bounce" />
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h2 className="font-semibold text-lg mb-3">{t.detailedClaimAnalysis}</h2>
            
            <div className="mb-4">
              <ClaimCard
                claim={t.claim1}
                status="unverified"
                explanation={t.claim1Explanation}
                followUpQuestion={t.claim1Question}
                language={language}
              />
              
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: showSources['claim1'] ? 'auto' : 0 }}
                className="overflow-hidden"
              >
                <div className="bg-slate-50 rounded-lg p-3 mb-3 ml-6">
                  <h4 className="text-xs font-medium text-slate-700 mb-2">{t.sources}</h4>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <a href="#" className="text-indigo-600 font-medium">{t.source1Title}</a>
                      <p className="text-slate-600 mt-0.5">{t.source1Desc}</p>
                    </li>
                    <li>
                      <a href="#" className="text-indigo-600 font-medium">{t.source2Title}</a>
                      <p className="text-slate-600 mt-0.5">{t.source2Desc}</p>
                    </li>
                  </ul>
                </div>
              </motion.div>
              
              <div className="flex justify-center mb-3">
                <button 
                  onClick={() => toggleSource('claim1')} 
                  className="flex items-center gap-1 text-xs text-indigo-600"
                >
                  <FaInfoCircle size={10} />
                  <span>{showSources['claim1'] ? t.hideSources : t.viewSources}</span>
                </button>
              </div>
              
              <ClaimCard
                claim={t.claim2}
                status="vague"
                explanation={t.claim2Explanation}
                followUpQuestion={t.claim2Question}
                language={language}
              />
              
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: showSources['claim2'] ? 'auto' : 0 }}
                className="overflow-hidden"
              >
                <div className="bg-slate-50 rounded-lg p-3 mb-3 ml-6">
                  <h4 className="text-xs font-medium text-slate-700 mb-2">{t.sources}</h4>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <a href="#" className="text-indigo-600 font-medium">{t.source3Title}</a>
                      <p className="text-slate-600 mt-0.5">{t.source3Desc}</p>
                    </li>
                  </ul>
                </div>
              </motion.div>
              
              <div className="flex justify-center mb-3">
                <button 
                  onClick={() => toggleSource('claim2')} 
                  className="flex items-center gap-1 text-xs text-indigo-600"
                >
                  <FaInfoCircle size={10} />
                  <span>{showSources['claim2'] ? t.hideSources : t.viewSources}</span>
                </button>
              </div>
              
              <ClaimCard
                claim={t.claim3}
                status="true"
                explanation={t.claim3Explanation}
                language={language}
              />
              
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: showSources['claim3'] ? 'auto' : 0 }}
                className="overflow-hidden"
              >
                <div className="bg-slate-50 rounded-lg p-3 mb-3 ml-6">
                  <h4 className="text-xs font-medium text-slate-700 mb-2">{t.sources}</h4>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <a href="#" className="text-indigo-600 font-medium">{t.source4Title}</a>
                      <p className="text-slate-600 mt-0.5">{t.source4Desc}</p>
                    </li>
                    <li>
                      <a href="#" className="text-indigo-600 font-medium">{t.source5Title}</a>
                      <p className="text-slate-600 mt-0.5">{t.source5Desc}</p>
                    </li>
                  </ul>
                </div>
              </motion.div>
              
              <div className="flex justify-center mb-3">
                <button 
                  onClick={() => toggleSource('claim3')} 
                  className="flex items-center gap-1 text-xs text-indigo-600"
                >
                  <FaInfoCircle size={10} />
                  <span>{showSources['claim3'] ? t.hideSources : t.viewSources}</span>
                </button>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mt-6"
          >
            <SecondOpinion language={language} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
