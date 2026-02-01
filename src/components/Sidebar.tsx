import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, User, UserPlus, Sparkles } from 'lucide-react';
import Button from './Button';

interface SidebarProps {
  onModeChange: (mode: 'new' | 'current', name: string) => void;
  streak?: number;
}

export default function Sidebar({ onModeChange, streak = 0 }: SidebarProps) {
  const [mode, setMode] = useState<'new' | 'current'>('new');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onModeChange(mode, name);
    }
  };

  return (
    <motion.div
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      className="w-80 bg-white shadow-2xl h-screen flex flex-col p-6"
    >
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="text-[#FF4B4B]" size={32} />
          <h1 className="text-2xl font-bold text-slate-800">محرك المسار المهني</h1>
        </div>
        <p className="text-sm text-slate-500">Verified Career Engine</p>
      </div>

      <div className="flex-1 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">نوع المستخدم</label>
          <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setMode('new')}
              className={`py-2 px-3 rounded-md text-sm font-semibold transition-all ${
                mode === 'new'
                  ? 'bg-white text-[#FF4B4B] shadow-md'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                <UserPlus size={16} />
                <span>طالب جديد 🆕</span>
              </div>
            </button>
            <button
              onClick={() => setMode('current')}
              className={`py-2 px-3 rounded-md text-sm font-semibold transition-all ${
                mode === 'current'
                  ? 'bg-white text-[#FF4B4B] shadow-md'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                <User size={16} />
                <span>طالب حالي 👤</span>
              </div>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">الاسم</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="أدخل اسمك هنا"
            className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-[#FF4B4B] focus:outline-none transition-colors text-right"
          />
        </div>

        <Button
          onClick={handleSubmit}
          variant="primary"
          size="lg"
          className="w-full"
        >
          {mode === 'new' ? 'ابدأ الرحلة' : 'تسجيل الدخول للوحة القيادة'}
        </Button>
      </div>

      <div className="mt-auto pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg">
          <div>
            <p className="text-sm text-slate-600">سلسلة يومية</p>
            <p className="text-2xl font-bold text-[#FF4B4B]">{streak} يوم</p>
          </div>
          <Flame className="text-orange-500" size={40} />
        </div>
      </div>
    </motion.div>
  );
}
