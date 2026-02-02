import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, 
  UserCheck, 
  Briefcase, 
  ChevronLeft, 
  Loader2, 
  ShieldCheck, 
  FileCheck,
  Mail,
  Phone
} from 'lucide-react';

interface MentorOnboardingProps {
  onComplete: (name: string, specialization: string) => void;
}

export default function MentorOnboarding({ onComplete }: MentorOnboardingProps) {
  // States
  const [step, setStep] = useState<'selection' | 'register' | 'login' | 'pending'>('selection');
  const [isLoading, setIsLoading] = useState(false);
  
  // Updated Form Data with Contact Info
  const [formData, setFormData] = useState({ 
    name: '', 
    specialization: '', 
    email: '', 
    phone: '' 
  });

  // Handler for New Mentor Registration
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // التحقق من ملء جميع البيانات
    if (formData.name && formData.specialization && formData.email && formData.phone) {
      setIsLoading(true);
      // محاكاة إرسال البيانات للسيرفر
      setTimeout(() => {
        setIsLoading(false);
        setStep('pending'); // الانتقال لشاشة "قيد المراجعة"
      }, 1500);
    }
  };

  // Handler for Login (Existing Mentor)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onComplete('محمد أحمد', 'Senior Software Engineer');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6" dir="rtl">
      
      <div className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        
        {/* Step 1: Selection */}
        {step === 'selection' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="space-y-6"
          >
            <h1 className="text-3xl font-bold text-slate-800 text-center mb-2">بوابة الموجهين</h1>
            <p className="text-center text-slate-500 mb-6">شارك خبرتك وساهم في بناء جيل جديد</p>
            
            <button 
              onClick={() => setStep('register')}
              className="w-full p-4 rounded-2xl border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <UserPlus size={24} />
              </div>
              <div className="text-right flex-1">
                <h3 className="font-bold text-lg text-slate-800">انضم كخبير جديد</h3>
                <p className="text-xs text-slate-500">تقديم طلب اعتماد موجه</p>
              </div>
              <ChevronLeft className="text-slate-300 group-hover:text-blue-500" />
            </button>

            <button 
              onClick={() => setStep('login')}
              className="w-full p-4 rounded-2xl border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <UserCheck size={24} />
              </div>
              <div className="text-right flex-1">
                <h3 className="font-bold text-lg text-slate-800">دخول الموجهين</h3>
                <p className="text-xs text-slate-500">للموجهين المعتمدين فقط</p>
              </div>
              <ChevronLeft className="text-slate-300 group-hover:text-emerald-500" />
            </button>
          </motion.div>
        )}

        {/* Step 2: New Mentor Register Form (Updated) */}
        {step === 'register' && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <button onClick={() => setStep('selection')} className="text-slate-400 mb-6 hover:text-slate-600 flex items-center gap-1 text-sm font-bold">
              <ChevronLeft className="rotate-180" size={16}/> عودة
            </button>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">طلب انضمام</h2>
            <p className="text-slate-500 text-sm mb-6">نحن نبحث عن الأفضل. املأ بياناتك للمراجعة.</p>
            
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">الاسم الكامل</label>
                <input 
                  type="text" 
                  required
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="الاسم كما يظهر في LinkedIn"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              {/* Specialization */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">مجال التخصص الدقيق</label>
                <div className="relative">
                  <Briefcase className="absolute top-3.5 right-3 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    required
                    className="w-full p-3 pr-10 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="مثال: Senior React Developer"
                    value={formData.specialization}
                    onChange={e => setFormData({...formData, specialization: e.target.value})}
                  />
                </div>
              </div>

              {/* Email (New) */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">البريد الإلكتروني المهني</label>
                <div className="relative">
                  <Mail className="absolute top-3.5 right-3 text-slate-400" size={18} />
                  <input 
                    type="email" 
                    required
                    className="w-full p-3 pr-10 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              {/* Phone (New) */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">رقم الهاتف للتواصل</label>
                <div className="relative">
                  <Phone className="absolute top-3.5 right-3 text-slate-400" size={18} />
                  <input 
                    type="tel" 
                    required
                    className="w-full p-3 pr-10 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="01xxxxxxxxx"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-blue-50 p-3 rounded-lg flex items-start gap-2 mt-2">
                <ShieldCheck className="text-blue-600 shrink-0 mt-0.5" size={18} />
                <p className="text-xs text-blue-800 leading-relaxed">
                  بيانات الاتصال تستخدم فقط لأغراض التحقق من الهوية ولن يتم مشاركتها مع أي طرف ثالث.
                </p>
              </div>

              <button 
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors mt-4 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : 'إرسال الطلب للمراجعة'}
              </button>
            </form>
          </motion.div>
        )}

        {/* Step 3: Login Form */}
        {step === 'login' && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <button onClick={() => setStep('selection')} className="text-slate-400 mb-6 hover:text-slate-600 flex items-center gap-1 text-sm font-bold">
              <ChevronLeft className="rotate-180" size={16}/> عودة
            </button>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">أهلاً بعودتك 👋</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">البريد الإلكتروني</label>
                <input 
                  type="email" 
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">كلمة المرور</label>
                <input 
                  type="password" 
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="••••••••"
                />
              </div>
              <button 
                disabled={isLoading}
                className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors mt-4 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                 {isLoading ? <Loader2 className="animate-spin" /> : 'دخول للوحة التحكم'}
              </button>
            </form>
          </motion.div>
        )}

        {/* Step 4: The Tricky Part (Pending Review) */}
        {step === 'pending' && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="text-center py-8"
          >
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileCheck size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">تم استلام طلبك بنجاح!</h2>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8 text-right space-y-3">
              <h3 className="font-bold text-yellow-800 flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" /> حالة الطلب: قيد المراجعة
              </h3>
              <p className="text-sm text-yellow-700 leading-relaxed">
                شكراً يا <strong>{formData.name}</strong>. نظراً لحرصنا على جودة العملية التعليمية، تتم مراجعة حسابات الموجهين يدوياً.
              </p>
              <div className="text-xs bg-yellow-100/50 p-2 rounded text-yellow-800 font-semibold border-r-2 border-yellow-500 pr-3">
                سيقوم فريقنا بالتواصل معك عبر <span className="text-black">الهاتف ({formData.phone})</span> أو البريد الإلكتروني خلال 48 ساعة لاستكمال المقابلة الشخصية.
              </div>
            </div>
            
            <button 
              onClick={() => window.location.reload()} 
              className="text-slate-500 font-bold hover:text-blue-600 text-sm transition-colors"
            >
              العودة للصفحة الرئيسية
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}