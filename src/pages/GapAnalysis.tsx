import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle, CheckCircle2, ArrowRight, BookOpen, Clock, DollarSign, Globe } from 'lucide-react';
import Card from '../components/Card';
import { ROADMAP_DATA } from '../data/dummyData';

interface GapAnalysisProps {
  skillRatings: Record<string, number>;
  quizScore: number;
  onComplete: () => void;
  userName: string;
  selectedTrack: string;
  onBack: () => void;
}

type View = 'analysis' | 'preferences' | 'roadmap';

export default function GapAnalysis({ skillRatings, quizScore, onComplete, userName, selectedTrack, onBack }: GapAnalysisProps) {
  const [view, setView] = useState<View>('analysis');
  const [preferences, setPreferences] = useState({ type: 'free', lang: 'arabic', mode: 'online' });

  // حساب المستوى
  const averageRating = Object.values(skillRatings).reduce((a, b) => a + b, 0) / Object.values(skillRatings).length;
  const finalScore = (quizScore * 0.6) + (averageRating * 10 * 0.4); // معادلة وهمية للمستوى
  let userLevel = 'مبتدئ';
  if (finalScore > 80) userLevel = 'خبير';
  else if (finalScore > 50) userLevel = 'متوسط';

  // الرود ماب المختار
  // @ts-ignore
  const roadmapItems = ROADMAP_DATA[selectedTrack]?.[preferences.type] || [];

  // --- Handlers ---
  const handleInternalBack = () => {
    if (view === 'analysis') onBack();
    else if (view === 'preferences') setView('analysis');
    else if (view === 'roadmap') setView('preferences');
  };

  // --- Renderers ---

  // 1. Analysis Result
  const renderAnalysis = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">نتائج التحليل 📈</h1>
        <p className="text-slate-600">مستواك الحالي: <span className="text-blue-600 font-bold text-lg">{userLevel}</span> ({Math.round(finalScore)}%)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
           <CheckCircle2 className="mx-auto text-emerald-500 mb-2" size={32} />
           <h3 className="font-bold text-slate-700">نقاط القوة</h3>
           <p className="text-sm text-slate-500 mt-1">أساسيات قوية في {selectedTrack === 'frontend' ? 'HTML/CSS' : 'Excel'}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
           <AlertCircle className="mx-auto text-orange-500 mb-2" size={32} />
           <h3 className="font-bold text-slate-700">نواقص السوق</h3>
           <p className="text-sm text-slate-500 mt-1">تحتاج لزيادة الخبرة في {selectedTrack === 'frontend' ? 'React Hooks' : 'Python Pandas'}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
           <TrendingUp className="mx-auto text-blue-500 mb-2" size={32} />
           <h3 className="font-bold text-slate-700">التطور المتوقع</h3>
           <p className="text-sm text-slate-500 mt-1">يمكنك الوصول لمستوى الاحتراف خلال 3 أشهر</p>
        </div>
      </div>

      <button onClick={() => setView('preferences')} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold mt-4 hover:bg-slate-800">
        بناء خطة التعلم (Roadmap)
      </button>
    </div>
  );

  // 2. Preferences Form
  const renderPreferences = () => (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">تفضيلات التعلم ⚙️</h2>
      
      <div className="space-y-6">
        <div>
          <label className="flex items-center gap-2 font-bold text-slate-700 mb-3"><DollarSign size={18} /> التكلفة</label>
          <div className="flex gap-4">
            <button onClick={() => setPreferences({...preferences, type: 'free'})} className={`flex-1 py-3 rounded-xl border-2 font-bold ${preferences.type === 'free' ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-100'}`}>مجاني</button>
            <button onClick={() => setPreferences({...preferences, type: 'paid'})} className={`flex-1 py-3 rounded-xl border-2 font-bold ${preferences.type === 'paid' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-slate-100'}`}>مدفوع (احترافي)</button>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 font-bold text-slate-700 mb-3"><Globe size={18} /> اللغة</label>
          <div className="flex gap-4">
            <button onClick={() => setPreferences({...preferences, lang: 'arabic'})} className={`flex-1 py-3 rounded-xl border-2 font-bold ${preferences.lang === 'arabic' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100'}`}>عربي</button>
            <button onClick={() => setPreferences({...preferences, lang: 'english'})} className={`flex-1 py-3 rounded-xl border-2 font-bold ${preferences.lang === 'english' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100'}`}>English</button>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 font-bold text-slate-700 mb-3"><Clock size={18} /> طريقة التعلم</label>
          <select className="w-full p-3 border rounded-xl bg-slate-50" onChange={(e) => setPreferences({...preferences, mode: e.target.value})}>
            <option value="online">أونلاين (Self-Paced)</option>
            <option value="offline">أوفلاين (مراكز تدريب)</option>
            <option value="hybrid">هجين (Hybrid)</option>
          </select>
        </div>

        <button onClick={() => setView('roadmap')} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold mt-2">
          عرض الخطة المقترحة
        </button>
      </div>
    </div>
  );

  // 3. Roadmap Display
  const renderRoadmap = () => (
    <div className="space-y-6">
       <div className="text-center mb-6">
         <h2 className="text-2xl font-bold text-slate-800">خارطة الطريق المخصصة 🗺️</h2>
         <p className="text-slate-500">تم تصميم هذا المسار بناءً على مستواك الحالي وتفضيلاتك</p>
       </div>

       <div className="relative border-r-4 border-blue-100 mr-4 space-y-8 pr-8">
         {roadmapItems.map((item: any, idx: number) => (
           <motion.div 
             key={idx}
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: idx * 0.2 }}
             className="relative"
           >
             <span className="absolute -right-[42px] top-0 w-6 h-6 rounded-full bg-blue-500 border-4 border-white shadow-sm"></span>
             <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-400 transition-colors">
               <div className="flex justify-between items-start mb-2">
                 <h3 className="font-bold text-lg text-slate-800">{item.title}</h3>
                 <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold">{item.duration}</span>
               </div>
               <div className="flex items-center gap-2 text-sm text-slate-500">
                  <BookOpen size={14} /> <span>نوع المصدر: {item.type}</span>
               </div>
             </div>
           </motion.div>
         ))}
       </div>

       <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-center gap-3">
          <CheckCircle2 className="text-emerald-600" />
          <div>
            <h4 className="font-bold text-emerald-800">جاهز للانطلاق؟</h4>
            <p className="text-sm text-emerald-700">بإكمالك لهذا المسار، ستكون مؤهلاً للتقدم لـ 150+ وظيفة في قاعدة بياناتنا.</p>
          </div>
       </div>

       <button onClick={onComplete} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold">
         الانتقال للوحة التحكم (Dashboard)
       </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <button onClick={handleInternalBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 mb-6">
           <ArrowRight size={20} /> عودة
        </button>

        <motion.div
           key={view}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
        >
          {view === 'analysis' && renderAnalysis()}
          {view === 'preferences' && renderPreferences()}
          {view === 'roadmap' && renderRoadmap()}
        </motion.div>
      </div>
    </div>
  );
}