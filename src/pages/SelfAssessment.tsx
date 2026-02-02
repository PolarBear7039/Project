import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import SkillSlider from '../components/SkillSlider'; // تأكد أن السلايدر يدعم max={10}
import { TRACK_SPECIFIC_SKILLS } from '../data/dummyData';

interface SelfAssessmentProps {
  onNext: (skillRatings: Record<string, number>) => void;
  userName: string;
  selectedTrack: string; // استلام التراك المختار
  onBack: () => void;
}

export default function SelfAssessment({ onNext, userName, selectedTrack, onBack }: SelfAssessmentProps) {
  const [skillRatings, setSkillRatings] = useState<Record<string, number>>({});
  
  // جلب المهارات الخاصة بالتراك، أو مهارات افتراضية
  const skillsToRate = TRACK_SPECIFIC_SKILLS[selectedTrack] || TRACK_SPECIFIC_SKILLS['frontend'];

  const handleSkillChange = (skillId: string, value: number) => {
    setSkillRatings(prev => ({ ...prev, [skillId]: value }));
  };

  const handleNext = () => {
    onNext(skillRatings);
  };

  const allSkillsRated = skillsToRate.length === Object.keys(skillRatings).length;

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center">
      
      <div className="w-full max-w-3xl flex justify-between items-center mb-8">
         <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-600">
           <ArrowRight size={20} /> عودة
         </button>
         <h2 className="text-xl font-bold text-blue-600">{selectedTrack === 'frontend' ? 'تطوير الواجهات' : 'تحليل البيانات'}</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">تقييم المهارات التقنية 📊</h1>
          <p className="text-slate-600">قيم مستواك الحالي (من 1 إلى 10) في الأدوات التالية بصدق.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-8">
          {skillsToRate.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex justify-between mb-2">
                <label className="font-bold text-slate-700">{skill.name}</label>
                <span className={`font-mono font-bold ${skillRatings[skill.id] > 7 ? 'text-emerald-600' : 'text-slate-500'}`}>
                   {skillRatings[skill.id] || 0}/10
                </span>
              </div>
              <input 
                 type="range" min="1" max="10" step="1"
                 className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                 value={skillRatings[skill.id] || 0}
                 onChange={(e) => handleSkillChange(skill.id, parseInt(e.target.value))}
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                 <span>مبتدئ جداً</span>
                 <span>خبير</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
           <button 
             onClick={handleNext}
             disabled={!allSkillsRated}
             className="bg-blue-600 text-white px-12 py-4 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
           >
             بدء اختبار المستوى <ArrowLeft />
           </button>
        </div>
      </motion.div>
    </div>
  );
}