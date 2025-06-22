import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaCalendarAlt, FaSearch } from 'react-icons/fa';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  distance: string;
  address: string;
  isOpen: boolean;
}

interface SecondOpinionProps {
  language?: 'english' | 'spanish' | 'telugu';
}

export const SecondOpinion = ({ language = 'english' }: SecondOpinionProps) => {
  const [zipCode, setZipCode] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  
  // Mock data
  const doctors: Doctor[] = [
    {
      id: 'd1',
      name: 'Dr. Lisa Chan',
      specialty: 'Internal Medicine',
      distance: '1.2 mi',
      address: '123 Healthcare Ave',
      isOpen: true
    },
    {
      id: 'd2',
      name: 'ClinicPlus',
      specialty: 'Walk-in Clinic',
      distance: '0.8 mi',
      address: '456 Medical Blvd',
      isOpen: true
    }
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.trim()) {
      setHasSearched(true);
    }
  };
  
  const texts = {
    english: {
      title: 'Second Opinion',
      enterZip: 'Enter your ZIP code',
      search: 'Search',
      away: 'away',
      open: 'Open now',
      closed: 'Closed',
      view: 'View',
      call: 'Call',
      schedule: 'Schedule'
    },
    spanish: {
      title: 'Segunda Opinión',
      enterZip: 'Ingrese su código postal',
      search: 'Buscar',
      away: 'de distancia',
      open: 'Abierto ahora',
      closed: 'Cerrado',
      view: 'Ver',
      call: 'Llamar',
      schedule: 'Programar'
    },
    telugu: {
      title: 'రెండవ అభిప్రాయం',
      enterZip: 'మీ పిన్ కోడ్ నమోదు చేయండి',
      search: 'శోధించు',
      away: 'దూరంలో',
      open: 'ఇప్పుడు తెరిచి ఉంది',
      closed: 'మూసివేయబడింది',
      view: 'వీక్షించండి',
      call: 'కాల్ చేయండి',
      schedule: 'షెడ్యూల్'
    }
  };
  
  const text = texts[language];
  
  const handleAction = (action: string) => {
    // Placeholder for actions
    alert(`Action: ${action}`);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-4">
      <h2 className="font-semibold text-lg mb-3">{text.title}</h2>
      
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder={text.enterZip}
          className="flex-1 p-2 border border-slate-300 rounded-md"
          pattern="[0-9]*"
          inputMode="numeric"
        />
        <button 
          type="submit"
          className="bg-indigo-600 text-white px-3 py-2 rounded-md flex items-center gap-1.5"
        >
          <FaSearch size={14} />
          <span>{text.search}</span>
        </button>
      </form>
      
      {hasSearched && (
        <div className="space-y-3">
          {doctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-4"
            >
              <h3 className="font-semibold text-lg">{doctor.name}</h3>
              <div className="flex justify-between items-center">
                <p className="text-slate-600">{doctor.specialty}</p>
                <p className="text-sm text-slate-500">{doctor.distance} {text.away}</p>
              </div>
              
              <p className="text-sm text-slate-500 mt-1">{doctor.address}</p>
              
              <p className={`text-sm mt-1 ${doctor.isOpen ? 'text-green-600' : 'text-slate-500'}`}>
                {doctor.isOpen ? text.open : text.closed}
              </p>
              
              <div className="flex gap-2 mt-4">
                <button 
                  onClick={() => handleAction('view')}
                  className="flex-1 py-2 text-center text-sm rounded-md bg-slate-100 text-slate-700 flex items-center justify-center gap-1"
                >
                  <FaMapMarkerAlt size={12} />
                  <span>{text.view}</span>
                </button>
                <button 
                  onClick={() => handleAction('call')}
                  className="flex-1 py-2 text-center text-sm rounded-md bg-slate-100 text-slate-700 flex items-center justify-center gap-1"
                >
                  <FaPhone size={12} />
                  <span>{text.call}</span>
                </button>
                <button 
                  onClick={() => handleAction('schedule')}
                  className="flex-1 py-2 text-center text-sm rounded-md bg-indigo-600 text-white flex items-center justify-center gap-1"
                >
                  <FaCalendarAlt size={12} />
                  <span>{text.schedule}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
