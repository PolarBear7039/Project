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

  // --- Handlers ---

  // Role Selection
  const handleRoleSelect = (role: UserRole) => setUserRole(role);
  const handleMentorComplete = (name: string, spec: string) => setMentorData({ name, spec });

  // Student Flow Handlers
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
    setSelectedTrack(track); // نحفظ التراك المختار عشان نستخدمه في التقييم
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

  // Back Handlers (Global Logic)
  const handleBack = () => {
    if (onboardingStep === 'gap-analysis') setOnboardingStep('quiz');
    else if (onboardingStep === 'quiz') setOnboardingStep('assessment');
    else if (onboardingStep === 'assessment') setOnboardingStep('discovery');
    else if (onboardingStep === 'discovery') {
       // لو رجع من أول خطوة، يرجع لاختيار الدور الرئيسي
       setUserRole(null);
       setMode('welcome'); 
    }
  };

  // --- Render Logic ---

  if (!userRole) return <RoleSelection onSelectRole={handleRoleSelect} />;

  if (userRole === 'mentor') {
    if (!mentorData) return <MentorOnboarding onComplete={handleMentorComplete} />;
    return <MentorDashboard mentorName={mentorData.name} specialization={mentorData.spec} />;
  }

  if (userRole === 'company') return <CompanyPortal />;

  // Student Flow
  return (
    <div className="flex min-h-screen bg-slate-50" dir="rtl">
      <AnimatePresence mode="wait">
        {mode === 'welcome' && (
           // Placeholder for Welcome if needed, currently RoleSelection handles initial view
           <div className="hidden"></div> 
        )}

        {mode === 'new-student' && (
          <div className="flex-1 overflow-auto"> 
            {onboardingStep === 'discovery' && (
              <CareerDiscovery onNext={handleCareerDiscoveryNext} userName={userName} onBack={handleBack} />
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
              <AIQuiz onComplete={handleQuizComplete} userName={userName} /> // (يمكنك إضافة زر عودة داخل الـ AIQuiz بنفس الطريقة)
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

      <Sidebar onModeChange={handleModeChange} streak={streak} />
    </div>
  );
}

export default App;