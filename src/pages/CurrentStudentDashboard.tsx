import { motion } from 'framer-motion';
import { Award, Flame, TrendingUp, Play, Lock, CheckCircle } from 'lucide-react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import { badges, modules, userLevels } from '../data/dummyData';

interface CurrentStudentDashboardProps {
  userName: string;
}

export default function CurrentStudentDashboard({ userName }: CurrentStudentDashboardProps) {
  const currentXP = 750;
  const currentLevel = userLevels.find(level => currentXP >= level.minXP && currentXP < (userLevels.find(l => l.level === level.level + 1)?.minXP || Infinity));
  const nextLevel = userLevels.find(l => l.level === (currentLevel?.level || 1) + 1);
  const progressToNext = nextLevel ? ((currentXP - (currentLevel?.minXP || 0)) / ((nextLevel.minXP - (currentLevel?.minXP || 0)))) * 100 : 100;

  const overallProgress = Math.round(
    modules.reduce((acc, mod) => acc + mod.progress, 0) / modules.length
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <h1 className="text-5xl font-bold text-slate-800 mb-2">
              مرحباً عودة، {userName}! 👋
            </h1>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg">
                <p className="text-white font-bold">المستوى {currentLevel?.level}: {currentLevel?.title}</p>
                <p className="text-white text-sm opacity-90">{currentLevel?.subtitle}</p>
              </div>
              <div className="px-4 py-2 bg-white rounded-lg shadow-md">
                <p className="text-slate-600 text-sm">XP: {currentXP} / {nextLevel?.minXP}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card hover={false}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <TrendingUp className="text-white" size={32} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-800">{overallProgress}%</h3>
                <p className="text-slate-600">التقدم الإجمالي</p>
              </div>
            </div>
          </Card>

          <Card hover={false}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Flame className="text-white" size={32} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-800">7 أيام</h3>
                <p className="text-slate-600">السلسلة الحالية</p>
              </div>
            </div>
          </Card>

          <Card hover={false}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Award className="text-white" size={32} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-800">{badges.length} شارات</h3>
                <p className="text-slate-600">تم الحصول عليها</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-8">
          <Card hover={false}>
            <h3 className="text-xl font-bold text-slate-800 mb-4">التقدم إلى المستوى التالي</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">
                  {currentLevel?.title} → {nextLevel?.title}
                </span>
                <span className="font-semibold text-[#FF4B4B]">
                  {progressToNext.toFixed(0)}%
                </span>
              </div>
              <ProgressBar progress={progressToNext} showLabel={false} />
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">🗓️ المسار التعليمي</h2>

            <div className="space-y-4">
              {modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card hover={module.status === 'active'} className={module.status === 'locked' ? 'opacity-60' : ''}>
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        module.status === 'completed' ? 'bg-green-100' :
                        module.status === 'active' ? 'bg-[#FF4B4B] bg-opacity-10' :
                        'bg-slate-200'
                      }`}>
                        {module.status === 'completed' ? (
                          <CheckCircle className="text-green-500" size={32} />
                        ) : module.status === 'active' ? (
                          <Play className="text-[#FF4B4B]" size={32} />
                        ) : (
                          <Lock className="text-slate-400" size={32} />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-slate-800">{module.title}</h3>
                          {module.status === 'active' && (
                            <span className="px-2 py-1 bg-[#FF4B4B] text-white text-xs rounded-full font-semibold">
                              جاري
                            </span>
                          )}
                        </div>
                        <p className="text-slate-500 text-sm mb-2">{module.subtitle} • {module.lessons} درس</p>
                        {module.status !== 'locked' && (
                          <ProgressBar progress={module.progress} height="h-2" showLabel={false} />
                        )}
                      </div>

                      {module.status === 'active' && (
                        <Button variant="primary" size="sm" icon={Play}>
                          متابعة التعلم
                        </Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">🏆 الشارات المكتسبة</h2>
            <Card hover={false}>
              <div className="grid grid-cols-2 gap-4">
                {badges.map((badge) => (
                  <Badge
                    key={badge.id}
                    name={badge.name}
                    icon={badge.icon}
                    color={badge.color}
                    earned={true}
                  />
                ))}
              </div>
            </Card>

            <Card hover={false} className="mt-4 bg-gradient-to-br from-amber-50 to-orange-50">
              <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span>💡</span>
                نصيحة اليوم
              </h3>
              <p className="text-slate-700 leading-relaxed">
                الممارسة اليومية أهم من الممارسة المكثفة! خصص 30 دقيقة كل يوم للتعلم.
              </p>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
