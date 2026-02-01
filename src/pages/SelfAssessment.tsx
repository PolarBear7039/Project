import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import SkillSlider from '../components/SkillSlider';
import { skills } from '../data/dummyData';

interface SelfAssessmentProps {
  onNext: (skillRatings: Record<string, number>) => void;
  userName: string;
}

export default function SelfAssessment({ onNext, userName }: SelfAssessmentProps) {
  const [skillRatings, setSkillRatings] = useState<Record<string, number>>({});

  const handleSkillChange = (skillId: string, value: number) => {
    setSkillRatings(prev => ({ ...prev, [skillId]: value }));
  };

  const handleNext = () => {
    onNext(skillRatings);
  };

  const allSkillsRated = skills.length === Object.keys(skillRatings).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">قيّم مهاراتك 📊</h1>
          <p className="text-xl text-slate-600">ساعدنا في فهم مستواك الحالي</p>

          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="flex items-center gap-2 opacity-40">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">✓</div>
              <span className="font-semibold text-slate-600">اكتشاف المسار</span>
            </div>
            <div className="w-16 h-1 bg-green-500"></div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#FF4B4B] text-white flex items-center justify-center font-bold">2</div>
              <span className="font-semibold text-slate-700">التقييم الذاتي</span>
            </div>
            <div className="w-16 h-1 bg-slate-300"></div>
            <div className="flex items-center gap-2 opacity-40">
              <div className="w-10 h-10 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center font-bold">3</div>
              <span className="font-semibold text-slate-600">اختبار الذكاء</span>
            </div>
          </div>
        </div>

        <Card className="mb-8">
          <div className="space-y-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <SkillSlider skill={skill} onChange={handleSkillChange} />
              </motion.div>
            ))}
          </div>
        </Card>

        {allSkillsRated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-green-600 font-semibold mb-4">✓ رائع! أكملت تقييم جميع المهارات</p>
            <Button
              onClick={handleNext}
              variant="primary"
              size="lg"
              icon={ArrowLeft}
            >
              التالي: اختبار الذكاء الاصطناعي
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
