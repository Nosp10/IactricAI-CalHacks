import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

interface NavBarProps {
  title?: string;
  showBack?: boolean;
  transparent?: boolean;
}

export const NavBar = ({ 
  title, 
  showBack = false,
  transparent = false
}: NavBarProps) => {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate(-1);
  };
  
  return (
    <div className={`py-4 px-4 flex items-center justify-between ${
      transparent ? 'bg-transparent' : 'bg-white border-b border-slate-200'
    }`}>
      <div className="flex items-center">
        {showBack && (
          <button 
            onClick={handleBackClick}
            className="w-10 h-10 flex items-center justify-center text-slate-700 rounded-full hover:bg-slate-100"
          >
            <FaArrowLeft size={16} />
          </button>
        )}
        
        {title && (
          <h1 className={`font-semibold ${showBack ? 'ml-2' : ''}`}>{title}</h1>
        )}
      </div>
    </div>
  );
};
