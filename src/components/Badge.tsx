import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

interface BadgeProps {
  name: string;
  icon: string;
  color: string;
  earned?: boolean;
}

export default function Badge({ name, icon, color, earned = true }: BadgeProps) {
  const IconComponent = Icons[icon as keyof typeof Icons] as React.ElementType;

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className={`flex flex-col items-center gap-2 p-4 rounded-lg ${earned ? 'opacity-100' : 'opacity-30 grayscale'}`}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
        style={{ backgroundColor: color }}
      >
        {IconComponent && <IconComponent className="text-white" size={32} />}
      </div>
      <p className="text-sm font-semibold text-slate-700 text-center">{name}</p>
    </motion.div>
  );
}
