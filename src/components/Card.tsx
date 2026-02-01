import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
  hover?: boolean;
}

export default function Card({ children, className = '', onClick, selected = false, hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' } : {}}
      onClick={onClick}
      className={`
        bg-white rounded-xl shadow-md p-6 transition-all duration-200
        ${selected ? 'ring-4 ring-[#FF4B4B] ring-opacity-50' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
