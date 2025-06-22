import { NavBar } from '../components/NavBar';
import { HistoryCard } from '../components/HistoryCard';
import { motion } from 'framer-motion';
import { ShareButton } from '../components/ShareButton';

// Mock history data
const mockHistory = [
  {
    id: '1',
    date: 'June 19, 2025 - 10:30 AM',
    doctor: 'Dr. Smith (Pulmonologist)',
    diagnosis: 'Mild Bronchitis',
    claims: [
      {
        id: 'c1',
        text: 'Antibiotics help with viruses',
        status: 'false' as const,
        explanation: 'Antibiotics only treat bacterial infections, not viruses.'
      },
      {
        id: 'c2',
        text: 'You need an immediate scan',
        status: 'unsure' as const,
        explanation: 'Not routinely recommended for uncomplicated bronchitis.'
      },
      {
        id: 'c3',
        text: 'Mild bronchitis needs rest',
        status: 'true' as const,
        explanation: 'Rest helps recovery from bronchitis.'
      }
    ]
  },
  {
    id: '2',
    date: 'May 3, 2025 - 2:15 PM',
    doctor: 'Dr. Johnson (Family Medicine)',
    diagnosis: 'Seasonal Allergies',
    claims: [
      {
        id: 'c4',
        text: 'Antihistamines can make you drowsy',
        status: 'true' as const,
        explanation: 'First-generation antihistamines often cause drowsiness.'
      },
      {
        id: 'c5',
        text: 'You should take antibiotics for allergies',
        status: 'false' as const,
        explanation: 'Antibiotics do not treat allergic reactions.'
      }
    ]
  },
  {
    id: '3',
    date: 'March 15, 2025 - 9:00 AM',
    doctor: 'Dr. Williams (Dermatologist)',
    diagnosis: 'Eczema',
    claims: [
      {
        id: 'c6',
        text: 'Steroids can thin your skin over time',
        status: 'true' as const,
        explanation: 'Long-term use of topical steroids can cause skin thinning.'
      },
      {
        id: 'c7',
        text: 'You need to avoid all soaps',
        status: 'unsure' as const,
        explanation: 'Gentle, fragrance-free soaps may be suitable for some people.'
      }
    ]
  }
];

export const HistoryPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="flex items-center justify-between p-4 bg-white border-b border-slate-200">
        <NavBar title="Session History" showBack={true} />
        <ShareButton title="My Medical History" />
      </div>
      
      <div className="flex-grow p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {mockHistory.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <HistoryCard
                date={session.date}
                doctor={session.doctor}
                diagnosis={session.diagnosis}
                claims={session.claims}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {mockHistory.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500 text-center">
            <p>No previous sessions found.</p>
          </div>
        )}
      </div>
    </div>
  );
};
