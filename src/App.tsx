import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// --- Components ---
import Sidebar from './components/Sidebar';

// --- Pages ---
import CareerDiscovery from './pages/CareerDiscovery';
import SelfAssessment from './pages/SelfAssessment';
import AIQuiz from './pages/AIQuiz';
import GapAnalysis from './pages/GapAnalysis';
import CurrentStudentDashboard from './pages/CurrentStudentDashboard';
import RoleSelection from './pages/RoleSelection';
import MentorOnboarding from './pages/MentorOnboarding';
import MentorDashboard from './pages/MentorDashboard';
import CompanyPortal from './pages/CompanyPortal';

// Types
type AppMode = 'welcome' | 'new-student' | 'current-student';
type OnboardingStep = 'discovery' | 'assessment' | 'quiz' | 'gap-analysis';
type UserRole = 'student' | 'company' | 'mentor' | null;

function App() {
  // ==============================
  // 1. Global State
  // ==============================
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [mentorData, setMentorData] = useState<{name: string, spec: string} | null>(null);

  // Student State
  const [mode, setMode] = useState<AppMode>('welcome');
  const [userName, setUserName] = useState('');
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('discovery');
  const [selectedTrack, setSelectedTrack] = useState('');
  const [skillRatings, setSkillRatings] = useState<Record<string, number>>({});
  const [quizScore, setQuizScore] = useState(0);
  const [streak] = useState(7);

  // ==============================
  // 2. Handlers
  // ==============================

  // --- General Logout / Reset Handler ---
  // دالة مهمة لتصفير كل البيانات عند الخروج أو العودة للشاشة الرئيسية
  const handleLogout = () => {
    setUserRole(null);
    setMentorData(null);
    setMode('welcome');
    setUserName('');
    setOnboardingStep('discovery');
    setSelectedTrack('');
    setSkillRatings({});
    setQuizScore(0);
  };

  // --- Role Selection ---
  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
  };

  // --- Mentor Flow ---
  const handleMentorComplete = (name: string, spec: string) => {
    setMentorData({ name, spec });
  };

  // --- Student Flow ---
  const handleModeChange = (userMode: 'new' | 'current', name: string) => {
    setUserName(name);
    if (userMode === 'new') {
      setMode('new-student');
      setOnboardingStep('discovery');
    } else {
      setMode('current-student');
    }
  };

  const handleCareerDiscoveryNext = (track: string) => {
    setSelectedTrack(track); // حفظ التراك المختار (مهم جداً للخطوة التالية)
    setOnboardingStep('assessment');
  };

  const handleAssessmentNext = (ratings: Record<string, number>) => {
    setSkillRatings(ratings);
    setOnboardingStep('quiz');
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    setOnboardingStep('gap-analysis');
  };

  const handleGapAnalysisComplete = () => {
    setMode('current-student');
  };

  // --- Back Navigation Logic ---
  const handleBack = () => {
    if (onboardingStep === 'gap-analysis') setOnboardingStep('quiz');
    else if (onboardingStep === 'quiz') setOnboardingStep('assessment');
    else if (onboardingStep === 'assessment') setOnboardingStep('discovery');
    else if (onboardingStep === 'discovery') {
       // لو رجع من أول خطوة في الطالب، نخرجه للقائمة الرئيسية
       handleLogout();
    }
  };

  // ==============================
  // 3. Render Logic
  // ==============================

  // Case A: No Role Selected Yet
  if (!userRole) {
    return <RoleSelection onSelectRole={handleRoleSelect} />;
  }

  // Case B: Mentor Flow
  if (userRole === 'mentor') {
    if (!mentorData) {
      return <MentorOnboarding onComplete={handleMentorComplete} />;
    }
    // [تعديل هام]: تمرير onLogout للداشبورد عشان زر الخروج يشتغل
    return (
      <MentorDashboard 
        mentorName={mentorData.name} 
        specialization={mentorData.spec} 
        onLogout={handleLogout} 
      />
    );
  }

  // Case C: Company Flow
  if (userRole === 'company') {
    return <CompanyPortal />;
  }

  // Case D: Student Flow
  return (
    <div className="flex min-h-screen bg-slate-50" dir="rtl">
      
      <AnimatePresence mode="wait">
        {mode === 'welcome' && (
           <div className="hidden"></div> 
        )}

        {mode === 'new-student' && (
          <div className="flex-1 overflow-auto"> 
            {onboardingStep === 'discovery' && (
              <CareerDiscovery 
                onNext={handleCareerDiscoveryNext} 
                userName={userName} 
                onBack={handleBack} 
              />
            )}
            {onboardingStep === 'assessment' && (
              <SelfAssessment 
                onNext={handleAssessmentNext} 
                userName={userName} 
                selectedTrack={selectedTrack} // تمرير التراك للتقييم
                onBack={handleBack}
              />
            )}
            {onboardingStep === 'quiz' && (
              <AIQuiz 
                onComplete={handleQuizComplete} 
                userName={userName} 
              />
            )}
            {onboardingStep === 'gap-analysis' && (
              <GapAnalysis
                skillRatings={skillRatings}
                quizScore={quizScore}
                onComplete={handleGapAnalysisComplete}
                userName={userName}
                selectedTrack={selectedTrack} // تمرير التراك للرود ماب
                onBack={handleBack}
              />
            )}
          </div>
        )}

        {mode === 'current-student' && (
           <div className="flex-1 overflow-auto">
             <CurrentStudentDashboard userName={userName} />
           </div>
        )}
      </AnimatePresence>

      {/* Sidebar يظهر فقط في حالة الطالب */}
      <Sidebar onModeChange={handleModeChange} streak={streak} />
    </div>
  );
}

export default App;