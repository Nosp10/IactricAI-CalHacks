import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaCalendarAlt } from 'react-icons/fa';

interface DoctorCardProps {
  name: string;
  specialty: string;
  distance: string;
  address?: string;
  isOpen?: boolean;
  onView: () => void;
  onCall: () => void;
  onSchedule: () => void;
}

export const DoctorCard = ({
  name,
  specialty,
  distance,
  address,
  isOpen,
  onView,
  onCall,
  onSchedule
}: DoctorCardProps) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md p-4 mb-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileTap={{ scale: 0.98 }}
    >
      <h3 className="font-semibold text-lg">{name}</h3>
      <div className="flex justify-between items-center">
        <p className="text-slate-600">{specialty}</p>
        <p className="text-sm text-slate-500">{distance} away</p>
      </div>
      
      {address && (
        <p className="text-sm text-slate-500 mt-1">{address}</p>
      )}
      
      {isOpen !== undefined && (
        <p className={`text-sm mt-1 ${isOpen ? 'text-green-600' : 'text-slate-500'}`}>
          {isOpen ? 'Open now' : 'Closed'}
        </p>
      )}
      
      <div className="flex gap-2 mt-4">
        <button 
          onClick={onView}
          className="flex-1 py-2 text-center text-sm rounded-md bg-slate-100 text-slate-700 flex items-center justify-center gap-1"
        >
          <FaMapMarkerAlt size={12} />
          <span>View</span>
        </button>
        <button 
          onClick={onCall}
          className="flex-1 py-2 text-center text-sm rounded-md bg-slate-100 text-slate-700 flex items-center justify-center gap-1"
        >
          <FaPhone size={12} />
          <span>Call</span>
        </button>
        <button 
          onClick={onSchedule}
          className="flex-1 py-2 text-center text-sm rounded-md bg-indigo-600 text-white flex items-center justify-center gap-1"
        >
          <FaCalendarAlt size={12} />
          <span>Schedule</span>
        </button>
      </div>
    </motion.div>
  );
};
