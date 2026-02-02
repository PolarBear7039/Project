import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { ArrowRight, ArrowLeft, GraduationCap, School, BookOpen, Search, User, Briefcase, Github, Linkedin, Mail } from 'lucide-react';
import { careerTracks } from '../data/dummyData';

interface CareerDiscoveryProps {
  onNext: (track: string) => void;
  userName: string;
  onBack: () => void; // زر العودة العام
}

type Step = 'user-type' | 'grad-form' | 'student-mode' | 'ai-help' | 'track-select';

export default function CareerDiscovery({ onNext, userName, onBack }: CareerDiscoveryProps) {
  const [step, setStep] = useState<Step>('user-type');
  const [formData, setFormData] = useState<any>({});
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

  // --- Handlers ---

  const handleUserType = (type: 'student' | 'graduate') => {
    setFormData({ ...formData, type });
    setStep(type === 'graduate' ? 'grad-form' : 'student-mode');
  };

  const submitGradForm = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا يمكن حفظ بيانات الخريج
    setStep('track-select');
  };

  const handleStudentMode = (mode: 'defined' | 'help') => {
    if (mode === 'defined') {
      setStep('track-select');
    } else {
      setStep('ai-help');
    }
  };

  const submitAIHelp = (e: React.FormEvent) => {
    e.preventDefault();
    // منطق بسيط للترشيح (Simulated AI)
    // في الواقع، نرسل البيانات للـ Backend
    const suggested = formData.college?.includes('h') ? 'data-analysis' : 'frontend'; // منطق وهمي
    setSelectedTrack(suggested);
    setStep('track-select');
  };

  const handleInternalBack = () => {
    if (step === 'user-type') onBack();
    else if (step === 'grad-form') setStep('user-type');
    else if (step === 'student-mode') setStep('user-type');
    else if (step === 'ai-help') setStep('student-mode');
    else if (step === 'track-select') {
       // يرجع بناءً على هو كان جاي منين
       if (formData.type === 'graduate') setStep('grad-form');
       else if (formData.aiHelp) setStep('ai-help');
       else setStep('student-mode');
    }
  };

  // --- Renderers ---

  // 1. Student vs Graduate
  const renderUserType = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-slate-800">ما هي حالتك الدراسية الحالية؟</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button onClick={() => handleUserType('student')} className="p-6 bg-white border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-center group">
          <School size={40} className="mx-auto mb-3 text-slate-400 group-hover:text-blue-500" />
          <h3 className="font-bold text-lg">طالب جامعي</h3>
          <p className="text-sm text-slate-500">ما زلت أدرس وأبحث عن مساري</p>
        </button>
        <button onClick={() => handleUserType('graduate')} className="p-6 bg-white border-2 border-slate-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all text-center group">
          <GraduationCap size={40} className="mx-auto mb-3 text-slate-400 group-hover:text-emerald-500" />
          <h3 className="font-bold text-lg">خريج / باحث عن عمل</h3>
          <p className="text-sm text-slate-500">أنهيت دراستي وأستعد لسوق العمل</p>
        </button>
      </div>
    </div>
  );

  // 2. Graduate Form
  const renderGradForm = () => (
    <form onSubmit={submitGradForm} className="max-w-md mx-auto space-y-4 bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-bold text-center mb-4">بيانات الخريج</h2>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">الكلية / التخصص</label>
        <input required type="text" className="w-full p-3 border rounded-xl" placeholder="مثال: حاسبات ومعلومات" 
           onChange={e => setFormData({...formData, college: e.target.value})} />
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">سنة التخرج</label>
        <input required type="number" className="w-full p-3 border rounded-xl" placeholder="2024" 
           onChange={e => setFormData({...formData, year: e.target.value})} />
      </div>
      <div className="relative">
        <Github className="absolute top-3.5 right-3 text-slate-400" size={18} />
        <input type="url" className="w-full p-3 pr-10 border rounded-xl" placeholder="GitHub Profile URL" 
           onChange={e => setFormData({...formData, github: e.target.value})} />
      </div>
      <div className="relative">
        <Linkedin className="absolute top-3.5 right-3 text-slate-400" size={18} />
        <input type="url" className="w-full p-3 pr-10 border rounded-xl" placeholder="LinkedIn Profile URL" 
           onChange={e => setFormData({...formData, linkedin: e.target.value})} />
      </div>
      <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold mt-2">متابعة</button>
    </form>
  );

  // 3. Student Mode (Defined vs Help)
  const renderStudentMode = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-slate-800">كيف يمكننا مساعدتك؟</h2>
      <div className="grid grid-cols-1 gap-4">
        <button onClick={() => handleStudentMode('defined')} className="p-5 bg-white border rounded-xl hover:shadow-md flex items-center justify-between group">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><Briefcase size={24} /></div>
            <div className="text-right">
              <h3 className="font-bold">حددت مساري بالفعل</h3>
              <p className="text-xs text-slate-500">أريد تقييم مهاراتي في تراك معين</p>
            </div>
          </div>
          <ArrowLeft className="text-slate-300 group-hover:text-purple-600" />
        </button>

        <button onClick={() => handleStudentMode('help')} className="p-5 bg-white border rounded-xl hover:shadow-md flex items-center justify-between group">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Search size={24} /></div>
            <div className="text-right">
              <h3 className="font-bold">أحتاج مساعدة في الاختيار</h3>
              <p className="text-xs text-slate-500">رشح لي مجالاً بناءً على اهتماماتي</p>
            </div>
          </div>
          <ArrowLeft className="text-slate-300 group-hover:text-blue-600" />
        </button>
      </div>
    </div>
  );

  // 4. AI Help Form
  const renderAIHelp = () => (
    <form onSubmit={submitAIHelp} className="max-w-md mx-auto space-y-4 bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-bold text-center mb-2">المساعد الذكي 🤖</h2>
      <p className="text-sm text-slate-500 text-center mb-6">أجب على هذه الأسئلة لترشيح أفضل مسار لك</p>
      
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">مجال كليتك الحالي</label>
        <input required type="text" className="w-full p-3 border rounded-xl" placeholder="مثال: تجارة، هندسة، ..." 
           onChange={e => setFormData({...formData, college: e.target.value})} />
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">ما هي طريقة التعلم المفضلة لك؟</label>
        <select className="w-full p-3 border rounded-xl" onChange={e => setFormData({...formData, style: e.target.value})}>
          <option>مشاهدة الفيديوهات والتطبيق</option>
          <option>قراءة المقالات والوثائق</option>
          <option>التعلم من خلال المشاريع العملية</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">هل لديك شغف بالتصميم والألوان؟</label>
         <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="design" value="yes" className="w-5 h-5 accent-blue-600" /> نعم جداً
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="design" value="no" className="w-5 h-5 accent-blue-600" /> لا، أفضل المنطق
            </label>
         </div>
      </div>
      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold mt-4">
        تحليل وترشيح المسار
      </button>
    </form>
  );

  // 5. Track Select
  const renderTrackSelect = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-slate-800">
        {formData.aiHelp ? 'بناءً على إجاباتك، نقترح عليك:' : 'اختر المسار الذي تود تقييمه'}
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {careerTracks.map((track) => {
          // @ts-ignore
          const IconComponent = Icons[track.icon];
          const isSelected = selectedTrack === track.id;
          return (
            <button
              key={track.id}
              onClick={() => setSelectedTrack(track.id)}
              className={`p-6 rounded-2xl border-2 transition-all text-right relative overflow-hidden ${isSelected ? 'border-blue-500 bg-blue-50 shadow-lg' : 'border-slate-100 bg-white hover:border-blue-300'}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl`} style={{ backgroundColor: track.color + '20', color: track.color }}>
                  {IconComponent && <IconComponent size={32} />}
                </div>
                {isSelected && <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">تم الاختيار</div>}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-1">{track.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{track.description}</p>
            </button>
          );
        })}
      </div>
      <div className="flex justify-center pt-6">
        <button 
          onClick={() => selectedTrack && onNext(selectedTrack)}
          disabled={!selectedTrack}
          className="bg-slate-900 text-white px-10 py-3 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          ابدأ التقييم <ArrowLeft size={20} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col">
      <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
           <button onClick={handleInternalBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors">
             <ArrowRight size={20} /> عودة
           </button>
           <span className="text-slate-300 font-bold text-sm tracking-widest">STEP {step === 'user-type' ? 1 : step === 'track-select' ? 3 : 2}/3</span>
        </div>

        <motion.div 
           key={step}
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           className="flex-1 flex flex-col justify-center"
        >
          {step === 'user-type' && renderUserType()}
          {step === 'grad-form' && renderGradForm()}
          {step === 'student-mode' && renderStudentMode()}
          {step === 'ai-help' && renderAIHelp()}
          {step === 'track-select' && renderTrackSelect()}
        </motion.div>
      </div>
    </div>
  );
}