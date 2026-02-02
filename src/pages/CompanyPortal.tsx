import React, { useState } from 'react';
import { 
  Building2, 
  User, 
  Plus, 
  LogIn, 
  ChevronLeft, 
  Briefcase, 
  Phone, 
  Loader2, 
  CheckCircle2, 
  Code2, 
  BarChart3, 
  ExternalLink, 
  ArrowRight,
  UserCheck
} from 'lucide-react';

// ==========================================
// 1. DUMMY DATA (بيانات مكثفة وواقعية)
// ==========================================
const MOCK_STUDENTS: any = {
  'frontend': {
    10: [ // Ready to Hire
      { id: 1, name: 'أحمد كمال', status: 'Ready', portfolio: '#', phone: '010xxxx', email: 'ahmed@ex.com' },
      { id: 2, name: 'سارة علي', status: 'Ready', portfolio: '#', phone: '011xxxx', email: 'sara@ex.com' },
      { id: 3, name: 'محمود حسن', status: 'Ready', portfolio: '#', phone: '012xxxx', email: 'mah@ex.com' },
    ],
    8: [ // Advanced
      { id: 4, name: 'كريم محمود', status: 'Learning', portfolio: '#', phone: '012xxxx', email: 'karim@ex.com' },
      { id: 5, name: 'هالة سعيد', status: 'Learning', portfolio: '#', phone: '015xxxx', email: 'hala@ex.com' },
    ],
    5: [ // Intermediate
       { id: 6, name: 'عمر خالد', status: 'Learning', portfolio: '#', phone: '010xxxx', email: 'omar@ex.com' },
       { id: 7, name: 'نادية يوسف', status: 'Learning', portfolio: '#', phone: '010xxxx', email: 'nadia@ex.com' }
    ],
    3: [ // Beginners
       { id: 8, name: 'طارق زياد', status: 'Learning', portfolio: '#', phone: '010xxxx', email: 'tarek@ex.com' }
    ]
  },
  'data-analysis': {
    10: [ // Ready to Hire
      { id: 9, name: 'منى السيد', status: 'Ready', portfolio: '#', phone: '015xxxx', email: 'mona@ex.com' },
      { id: 10, name: 'ياسر جلال', status: 'Ready', portfolio: '#', phone: '011xxxx', email: 'yasser@ex.com' },
      { id: 11, name: 'ليلى أحمد', status: 'Ready', portfolio: '#', phone: '010xxxx', email: 'laila@ex.com' },
    ],
    8: [ // Advanced
       { id: 12, name: 'يوسف حسن', status: 'Learning', portfolio: '#', phone: '010xxxx', email: 'joe@ex.com' },
       { id: 13, name: 'ماجدة كامل', status: 'Learning', portfolio: '#', phone: '012xxxx', email: 'magda@ex.com' }
    ],
    5: [ // Intermediate
       { id: 14, name: 'سيف الدين', status: 'Learning', portfolio: '#', phone: '011xxxx', email: 'saif@ex.com' }
    ],
    3: [ // Beginners
       { id: 15, name: 'رامي عادل', status: 'Learning', portfolio: '#', phone: '015xxxx', email: 'ramy@ex.com' }
    ]
  }
};

// Helper to ensure data exists
const getStudentsForLevel = (track: string, level: number) => {
  const students = MOCK_STUDENTS[track]?.[level];
  return students || []; // Return empty array if no specific mock data
};

// ==========================================
// 2. TYPES
// ==========================================
type RecruiterType = 'company' | 'freelance' | null;
type AuthMode = 'new' | 'current' | null;
type ViewState = 'role-select' | 'auth-select' | 'form' | 'pending' | 'dashboard';
type DashboardStep = 'tracks' | 'levels' | 'students';

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
export default function CompanyPortal() {
  // Navigation State
  const [view, setView] = useState<ViewState>('role-select');
  
  // Data State
  const [recruiterType, setRecruiterType] = useState<RecruiterType>(null);
  const [authMode, setAuthMode] = useState<AuthMode>(null);
  
  // Dashboard State
  const [dashStep, setDashStep] = useState<DashboardStep>('tracks');
  const [selectedTrack, setSelectedTrack] = useState<'frontend' | 'data-analysis' | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  // Form State
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', field: '', phone: '', username: '' });

  // --- Handlers & Navigation Logic ---

  const handleBack = () => {
    if (view === 'dashboard') {
      if (dashStep === 'students') {
        setDashStep('levels');
      } else if (dashStep === 'levels') {
        setDashStep('tracks');
      } else {
        if (window.confirm('هل تريد تسجيل الخروج؟')) {
          setView('auth-select');
        }
      }
    } else if (view === 'pending') {
      setView('role-select');
    } else if (view === 'form') {
      setView('auth-select');
    } else if (view === 'auth-select') {
      setView('role-select');
    } else if (view === 'role-select') {
      // Refresh to go back to App Role Selection (Main Home)
      window.location.reload(); 
    }
  };

  const handleRecruiterTypeSelect = (type: RecruiterType) => {
    setRecruiterType(type);
    setView('auth-select');
  };

  const handleAuthSelect = (mode: AuthMode) => {
    setAuthMode(mode);
    setView('form');
  };

  const handleSubmitNew = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setView('pending');
    }, 1500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setView('dashboard');
      setDashStep('tracks');
    }, 1000);
  };

  // --- Shared Components ---
  
  const BackButton = () => (
    <button 
      onClick={handleBack}
      className="absolute top-6 right-6 flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold transition-colors z-20 text-sm md:text-base"
    >
      <ArrowRight size={20} /> عودة
    </button>
  );

  // --- RENDERERS ---

  // 1. Role Selection
  const renderRoleSelect = () => (
    <div className="max-w-4xl mx-auto w-full relative pt-10">
      <BackButton />
      <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">بوابة التوظيف</h1>
      <p className="text-center text-slate-500 mb-10">اختر نوع الحساب للمتابعة</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button 
          onClick={() => handleRecruiterTypeSelect('company')}
          className="group bg-white p-8 rounded-2xl border-2 border-slate-100 hover:border-blue-500 hover:shadow-xl transition-all text-right flex flex-col gap-4"
        >
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
            <Building2 size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">مسؤول توظيف من شركة</h3>
            <p className="text-slate-500 text-sm">أمثل شركة برمجيات أو مؤسسة تبحث عن مواهب.</p>
          </div>
        </button>

        <button 
          onClick={() => handleRecruiterTypeSelect('freelance')}
          className="group bg-white p-8 rounded-2xl border-2 border-slate-100 hover:border-purple-500 hover:shadow-xl transition-all text-right flex flex-col gap-4"
        >
          <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
            <User size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">مسؤول توظيف حر</h3>
            <p className="text-slate-500 text-sm">أعمل بشكل مستقل لتوظيف الكفاءات.</p>
          </div>
        </button>
      </div>
    </div>
  );

  // 2. Auth Select
  const renderAuthSelect = () => (
    <div className="max-w-md mx-auto w-full space-y-6 pt-10 relative">
      <BackButton />
      <h2 className="text-2xl font-bold text-center text-slate-800 mb-8 mt-6">
        {recruiterType === 'company' ? 'بيانات المؤسسة' : 'حساب التوظيف المستقل'}
      </h2>
      
      <button 
        onClick={() => handleAuthSelect('new')}
        className="w-full p-5 rounded-xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-between group"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-lg border border-slate-100 text-blue-600">
            <Plus size={24} />
          </div>
          <div className="text-right">
            <span className="block font-bold text-slate-800">تسجيل جديد</span>
            <span className="text-xs text-slate-500">إنشاء حساب واعتماد جديد</span>
          </div>
        </div>
        <ChevronLeft className="text-slate-300 group-hover:text-blue-500" />
      </button>

      <button 
        onClick={() => handleAuthSelect('current')}
        className="w-full p-5 rounded-xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all flex items-center justify-between group"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-lg border border-slate-100 text-emerald-600">
            <LogIn size={24} />
          </div>
          <div className="text-right">
            <span className="block font-bold text-slate-800">حساب حالي</span>
            <span className="text-xs text-slate-500">تسجيل الدخول للوحة التحكم</span>
          </div>
        </div>
        <ChevronLeft className="text-slate-300 group-hover:text-emerald-500" />
      </button>
    </div>
  );

  // 3. Form
  const renderForm = () => (
    <div className="max-w-md mx-auto w-full bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative mt-10">
      <BackButton />
      
      {authMode === 'new' ? (
        <form onSubmit={handleSubmitNew} className="space-y-4 pt-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">طلب اعتماد شريك</h2>
          <p className="text-sm text-slate-500 mb-6">يرجى ملء البيانات بدقة للمراجعة.</p>
          
          {recruiterType === 'company' ? (
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">اسم الشركة</label>
              <input required type="text" className="w-full p-3 border rounded-xl" placeholder="مثال: Tech Solutions" 
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
          ) : (
             <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">الاسم الكامل</label>
              <input required type="text" className="w-full p-3 border rounded-xl" placeholder="مثال: محمد علي" 
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">المجال / التخصص</label>
            <input required type="text" className="w-full p-3 border rounded-xl" placeholder="مثال: Software House" 
               value={formData.field} onChange={e => setFormData({...formData, field: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">رقم الهاتف</label>
            <input required type="tel" className="w-full p-3 border rounded-xl" placeholder="01xxxxxxxxx" 
               value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>

          <button disabled={isLoading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold mt-4">
            {isLoading ? <Loader2 className="animate-spin mx-auto" /> : 'إرسال الطلب'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleLogin} className="space-y-4 pt-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">تسجيل الدخول</h2>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">اسم المستخدم</label>
            <input required type="text" className="w-full p-3 border rounded-xl" placeholder="Username" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">كلمة المرور</label>
            <input required type="password" className="w-full p-3 border rounded-xl" placeholder="••••••••" />
          </div>
          <button disabled={isLoading} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold mt-4">
             {isLoading ? <Loader2 className="animate-spin mx-auto" /> : 'دخول'}
          </button>
        </form>
      )}
    </div>
  );

  // 4. Pending
  const renderPending = () => (
    <div className="max-w-md mx-auto w-full text-center py-8 bg-white rounded-3xl shadow-sm p-8 border border-slate-100 relative mt-10">
      <BackButton />
      <div className="w-20 h-20 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 mt-6">
        <Loader2 size={40} className="animate-spin" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">جاري المراجعة</h2>
      <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm mb-6">
        سيتم التواصل معك على الرقم <strong>{formData.phone}</strong> خلال 24 ساعة.
      </div>
    </div>
  );

  // 5. Dashboard
  const renderDashboard = () => {
    // A. Tracks
    if (dashStep === 'tracks') return (
      <div className="max-w-5xl mx-auto w-full relative pt-12">
        <button onClick={() => setView('auth-select')} className="absolute top-0 right-0 flex items-center gap-2 text-red-500 hover:text-red-700 font-bold z-20">
           تسجيل خروج <LogIn className="rotate-180" size={16}/>
        </button>

        <h1 className="text-3xl font-bold text-slate-800 mb-2">قاعدة بيانات المواهب</h1>
        <p className="text-slate-500 mb-8">اختر المسار الوظيفي</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button onClick={() => { setSelectedTrack('data-analysis'); setDashStep('levels'); }}
            className="group bg-white p-8 rounded-2xl border hover:border-blue-500 hover:shadow-lg transition-all text-right">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <BarChart3 size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">تحليل البيانات</h3>
            <p className="text-slate-500 text-sm mt-2">SQL, Python, PowerBI</p>
          </button>

          <button onClick={() => { setSelectedTrack('frontend'); setDashStep('levels'); }}
            className="group bg-white p-8 rounded-2xl border hover:border-purple-500 hover:shadow-lg transition-all text-right">
            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
              <Code2 size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">تطوير الواجهات</h3>
            <p className="text-slate-500 text-sm mt-2">React, Tailwind, JS</p>
          </button>
        </div>
      </div>
    );

    // B. Levels
    if (dashStep === 'levels') return (
      <div className="max-w-4xl mx-auto w-full relative pt-10">
        <BackButton />
        <h2 className="text-2xl font-bold text-slate-800 mb-6 mt-6">
          اختر المستوى ({selectedTrack === 'frontend' ? 'Frontend' : 'Data Analysis'})
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => {
            const level = i + 1;
            // Check if level has content (just for visual hint, though all clickable)
            const hasStudents = MOCK_STUDENTS[selectedTrack || 'frontend'][level]?.length > 0;
            
            return (
              <button 
                key={level}
                onClick={() => { setSelectedLevel(level); setDashStep('students'); }}
                className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-2 
                  ${level === 10 
                    ? 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100 hover:scale-105' 
                    : 'bg-white border-slate-100 hover:border-blue-500 hover:scale-105'
                  }`}
              >
                <span className={`text-2xl font-bold ${level === 10 ? 'text-emerald-600' : 'text-slate-700'}`}>
                  {level}
                </span>
                
                {/* 1. استرجاع كلمة Ready to Hire */}
                {level === 10 ? (
                  <span className="text-[10px] bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">
                    Ready to Hire
                  </span>
                ) : (
                  <span className="text-xs text-slate-400">Level</span>
                )}
                
                {hasStudents && level !== 10 && (
                   <span className="w-2 h-2 bg-blue-500 rounded-full absolute top-3 right-3"></span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    );

    // C. Students
    if (dashStep === 'students') {
      const students = getStudentsForLevel(selectedTrack || 'frontend', selectedLevel || 1);

      return (
        <div className="max-w-4xl mx-auto w-full relative pt-10">
          <BackButton />
          
          <div className="flex items-center justify-between mb-6 mt-6">
            <h2 className="text-2xl font-bold text-slate-800">
              طلاب المستوى {selectedLevel}
            </h2>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
              {students.length} متاح
            </span>
          </div>

          <div className="space-y-4">
            {students.length > 0 ? (
              students.map((student: any) => (
                <div key={student.id} className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600 text-xl">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                        {student.name}
                        {student.status === 'Ready' && (
                          <span className="flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                            <CheckCircle2 size={12} /> جاهز للعمل
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-slate-500">{selectedTrack} • Level {selectedLevel}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 text-sm font-bold flex items-center gap-2 justify-center">
                      <ExternalLink size={16} /> Portfolio
                    </button>
                    <button className="flex-1 md:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-bold flex items-center gap-2 justify-center">
                      <Phone size={16} /> تواصل
                    </button>
                  </div>
                </div>
              ))
            ) : (
               <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                 <UserCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                 <p className="text-slate-500 font-bold">لا يوجد طلاب في هذا المستوى حالياً</p>
                 <p className="text-slate-400 text-sm">يرجى التحقق من مستويات أخرى (جرب 3, 5, 8, 10)</p>
               </div>
            )}
          </div>
        </div>
      );
    }
  };

  // --- Main Render Switch ---
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6" dir="rtl">
      {view === 'role-select' && renderRoleSelect()}
      {view === 'auth-select' && renderAuthSelect()}
      {view === 'form' && renderForm()}
      {view === 'pending' && renderPending()}
      {view === 'dashboard' && renderDashboard()}
    </div>
  );
}