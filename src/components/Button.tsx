import { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon,
  className = '',
  ...props 
}: ButtonProps) => {
  const baseClasses = "font-medium rounded-full flex items-center justify-center transition-all";
  
  const variantClasses = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800",
    secondary: "bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50 active:bg-indigo-100",
    outline: "bg-transparent text-indigo-600 border border-indigo-300 hover:bg-indigo-50 active:bg-indigo-100"
  };
  
  const sizeClasses = {
    sm: "text-sm px-3 py-1.5 gap-1.5",
    md: "text-base px-4 py-2 gap-2",
    lg: "text-lg px-6 py-3 gap-2.5"
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <motion.button
      className={classes}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
};
