import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import CareerDiscovery from './pages/CareerDiscovery';
import SelfAssessment from './pages/SelfAssessment';
import AIQuiz from './pages/AIQuiz';
import GapAnalysis from './pages/GapAnalysis';
import CurrentStudentDashboard from './pages/CurrentStudentDashboard';

type AppMode = 'welcome' | 'new-student' | 'current-student';
type OnboardingStep = 'discovery' | 'assessment' | 'quiz' | 'gap-analysis';

function App() {
  const [mode, setMode] = useState<AppMode>('welcome');
  const [userName, setUserName] = useState('');
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('discovery');
  const [selectedTrack, setSelectedTrack] = useState('');
  const [skillRatings, setSkillRatings] = useState<Record<string, number>>({});
  const [quizScore, setQuizScore] = useState(0);
  const [streak] = useState(7);

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
    setSelectedTrack(track);
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

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AnimatePresence mode="wait">
        {mode === 'welcome' && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-slate-800 mb-4">محرك المسار المهني المعتمد</h1>
              <p className="text-xl text-slate-600 mb-2">Verified Career Engine</p>
              <p className="text-slate-500">استخدم الشريط الجانبي للبدء ←</p>
            </div>
          </div>
        )}

        {mode === 'new-student' && (
          <>
            {onboardingStep === 'discovery' && (
              <CareerDiscovery onNext={handleCareerDiscoveryNext} userName={userName} />
            )}
            {onboardingStep === 'assessment' && (
              <SelfAssessment onNext={handleAssessmentNext} userName={userName} />
            )}
            {onboardingStep === 'quiz' && (
              <AIQuiz onComplete={handleQuizComplete} userName={userName} />
            )}
            {onboardingStep === 'gap-analysis' && (
              <GapAnalysis
                skillRatings={skillRatings}
                quizScore={quizScore}
                onComplete={handleGapAnalysisComplete}
                userName={userName}
              />
            )}
          </>
        )}

        {mode === 'current-student' && (
          <CurrentStudentDashboard userName={userName} />
        )}
      </AnimatePresence>

      <Sidebar onModeChange={handleModeChange} streak={streak} />
    </div>
  );
}

export default App;
