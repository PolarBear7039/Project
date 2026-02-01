import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: string;
  showLabel?: boolean;
}

export default function ProgressBar({
  progress,
  color = '#FF4B4B',
  height = 'h-3',
  showLabel = true
}: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className={`w-full bg-slate-200 rounded-full overflow-hidden ${height}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`${height} rounded-full`}
          style={{ backgroundColor: color }}
        />
      </div>
      {showLabel && (
        <p className="text-sm text-slate-600 mt-1 text-left">{progress}%</p>
      )}
    </div>
  );
}
