import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Code } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { quizQuestions } from '../data/dummyData';

interface AIQuizProps {
  onComplete: (score: number) => void;
  userName: string;
}

export default function AIQuiz({ onComplete, userName }: AIQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [practicalAnswer, setPracticalAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(quizQuestions[0].time);
  const [answers, setAnswers] = useState<any[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion]);

  const handleNext = () => {
    const question = quizQuestions[currentQuestion];
    if (question.type === 'theory') {
      setAnswers([...answers, { questionId: question.id, answer: selectedAnswer }]);
    } else {
      setAnswers([...answers, { questionId: question.id, answer: practicalAnswer }]);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setPracticalAnswer('');
      setTimeLeft(quizQuestions[currentQuestion + 1].time);
    } else {
      const score = Math.floor(Math.random() * 30) + 70;
      onComplete(score);
    }
  };

  const question = quizQuestions[currentQuestion];
  const canProceed = question.type === 'theory' ? selectedAnswer !== null : practicalAnswer.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">اختبار الذكاء الاصطناعي 🤖</h1>
          <p className="text-xl text-slate-600">اختبار مصمم بواسطة الذكاء الاصطناعي</p>

          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="flex items-center gap-2 opacity-40">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">✓</div>
              <span className="font-semibold text-slate-600">اكتشاف المسار</span>
            </div>
            <div className="w-16 h-1 bg-green-500"></div>
            <div className="flex items-center gap-2 opacity-40">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">✓</div>
              <span className="font-semibold text-slate-600">التقييم الذاتي</span>
            </div>
            <div className="w-16 h-1 bg-green-500"></div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#FF4B4B] text-white flex items-center justify-center font-bold">3</div>
              <span className="font-semibold text-slate-700">اختبار الذكاء</span>
            </div>
          </div>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="flex gap-2">
            {quizQuestions.map((_, idx) => (
              <div
                key={idx}
                className={`w-12 h-2 rounded-full ${
                  idx < currentQuestion ? 'bg-green-500' : idx === currentQuestion ? 'bg-[#FF4B4B]' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>
          <motion.div
            animate={{ scale: timeLeft < 10 ? [1, 1.1, 1] : 1 }}
            transition={{ repeat: timeLeft < 10 ? Infinity : 0, duration: 0.5 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              timeLeft < 10 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
            }`}
          >
            <Clock size={20} />
            <span className="font-bold">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
          </motion.div>
        </div>

        <Card className="mb-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              {question.type === 'theory' ? (
                <CheckCircle className="text-blue-500" size={24} />
              ) : (
                <Code className="text-green-500" size={24} />
              )}
              <span className="px-3 py-1 bg-slate-100 rounded-full text-sm font-semibold text-slate-700">
                {question.type === 'theory' ? 'سؤال نظري' : 'تحدي عملي'}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">{question.question}</h2>

            {question.type === 'theory' && question.options ? (
              <div className="space-y-3">
                {question.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedAnswer(idx)}
                    className={`w-full text-right p-4 rounded-lg border-2 transition-all ${
                      selectedAnswer === idx
                        ? 'border-[#FF4B4B] bg-red-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-semibold text-slate-700">{option}</span>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div>
                <textarea
                  value={practicalAnswer}
                  onChange={(e) => setPracticalAnswer(e.target.value)}
                  placeholder={question.placeholder}
                  className="w-full h-64 p-4 border-2 border-slate-200 rounded-lg focus:border-[#FF4B4B] focus:outline-none font-mono text-sm text-left"
                  style={{ direction: 'ltr' }}
                />
              </div>
            )}
          </div>
        </Card>

        <div className="flex justify-center">
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            variant="primary"
            size="lg"
          >
            {currentQuestion < quizQuestions.length - 1 ? 'السؤال التالي' : 'إنهاء الاختبار'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
