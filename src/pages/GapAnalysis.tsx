import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import { skills } from '../data/dummyData';

interface GapAnalysisProps {
  skillRatings: Record<string, number>;
  quizScore: number;
  onComplete: () => void;
  userName: string;
}

export default function GapAnalysis({ skillRatings, quizScore, onComplete, userName }: GapAnalysisProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (quizScore >= 70) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, []);

  const gapAnalysis = skills.map(skill => ({
    ...skill,
    current: skillRatings[skill.id] || 0,
    gap: Math.max(0, skill.required - (skillRatings[skill.id] || 0))
  }));

  const overallReadiness = Math.round(
    (gapAnalysis.reduce((acc, skill) => acc + skill.current, 0) /
    gapAnalysis.reduce((acc, skill) => acc + skill.required, 0)) * 100
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8 relative overflow-hidden">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, x: Math.random() * window.innerWidth, opacity: 1 }}
              animate={{ y: window.innerHeight + 100, rotate: Math.random() * 360 }}
              transition={{ duration: 2 + Math.random() * 2, ease: 'linear' }}
              className="absolute text-3xl"
            >
              {['🎉', '⭐', '🚀', '💪', '🏆'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <h1 className="text-4xl font-bold text-slate-800 mb-2">تحليل الفجوات 📈</h1>
            <p className="text-xl text-slate-600">نتائجك ومسارك التعليمي المقترح</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card hover={false}>
            <div className="text-center">
              <TrendingUp className="mx-auto mb-3 text-[#FF4B4B]" size={40} />
              <h3 className="text-3xl font-bold text-slate-800 mb-1">{overallReadiness}%</h3>
              <p className="text-slate-600">الجاهزية الإجمالية</p>
            </div>
          </Card>

          <Card hover={false}>
            <div className="text-center">
              <CheckCircle2 className="mx-auto mb-3 text-green-500" size={40} />
              <h3 className="text-3xl font-bold text-slate-800 mb-1">{quizScore}%</h3>
              <p className="text-slate-600">نتيجة الاختبار</p>
            </div>
          </Card>

          <Card hover={false}>
            <div className="text-center">
              <AlertCircle className="mx-auto mb-3 text-orange-500" size={40} />
              <h3 className="text-3xl font-bold text-slate-800 mb-1">
                {gapAnalysis.filter(s => s.gap > 3).length}
              </h3>
              <p className="text-slate-600">مهارات تحتاج تطوير</p>
            </div>
          </Card>
        </div>

        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span>📊</span>
            تحليل المهارات التفصيلي
          </h2>

          <div className="space-y-6">
            {gapAnalysis.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-700">{skill.name}</h4>
                    <p className="text-sm text-slate-500">
                      المطلوب: {skill.required}/10 | مستواك: {skill.current}/10
                    </p>
                  </div>
                  {skill.gap === 0 ? (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      ✓ ممتاز
                    </span>
                  ) : skill.gap <= 3 ? (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                      جيد
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                      يحتاج تطوير
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-600 mb-1">مستواك الحالي</p>
                    <ProgressBar progress={(skill.current / 10) * 100} showLabel={false} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">المستوى المطلوب</p>
                    <ProgressBar progress={(skill.required / 10) * 100} color="#10B981" showLabel={false} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card className="mb-8 bg-gradient-to-br from-[#FF4B4B] to-[#E63946] text-white">
          <h2 className="text-2xl font-bold mb-4">🎯 توصياتنا لك</h2>
          <ul className="space-y-3 text-lg">
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>ابدأ بتطوير المهارات ذات الفجوة الأكبر أولاً</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>خصص ساعة يوميًا للتعلم والممارسة</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>انضم إلى مجتمعنا للحصول على الدعم والإرشاد</span>
            </li>
          </ul>
        </Card>

        <div className="flex justify-center">
          <Button
            onClick={onComplete}
            variant="primary"
            size="lg"
            icon={ArrowLeft}
          >
            ابدأ رحلة التعلم
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
