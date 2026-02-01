export const careerTracks = [
  {
    id: 'frontend',
    title: 'تطوير الواجهات',
    subtitle: 'Frontend Development',
    description: 'للمبدعين والمهتمين بالتصميم البصري',
    type: 'visual',
    icon: 'Palette',
    color: '#FF4B4B'
  },
  {
    id: 'data',
    title: 'تحليل البيانات',
    subtitle: 'Data Analysis',
    description: 'للمنطقيين والمهتمين بالأرقام والتحليل',
    type: 'logic',
    icon: 'BarChart3',
    color: '#10B981'
  }
];

export const skills = [
  { id: 'sql', name: 'SQL', category: 'database', required: 7 },
  { id: 'react', name: 'React', category: 'frontend', required: 8 },
  { id: 'python', name: 'Python', category: 'backend', required: 6 },
  { id: 'html', name: 'HTML/CSS', category: 'frontend', required: 7 },
  { id: 'git', name: 'Git', category: 'tools', required: 6 },
  { id: 'algorithms', name: 'الخوارزميات', category: 'cs', required: 8 }
];

export const quizQuestions = [
  {
    id: 1,
    type: 'theory',
    question: 'ما هو الفرق بين var و let في JavaScript؟',
    options: [
      'لا يوجد فرق',
      'var له نطاق دالة، let له نطاق كتلة',
      'let أسرع من var',
      'var أحدث من let'
    ],
    correct: 1,
    time: 60
  },
  {
    id: 2,
    type: 'practical',
    question: 'اكتب دالة JavaScript تعيد مصفوفة مرتبة تصاعديًا',
    placeholder: 'function sortArray(arr) {\n  // اكتب الكود هنا\n}',
    time: 120
  }
];

export const badges = [
  { id: 'sql-hero', name: 'بطل SQL', icon: 'Database', color: '#3B82F6' },
  { id: 'react-ninja', name: 'نينجا React', icon: 'Zap', color: '#FF4B4B' },
  { id: 'week-warrior', name: 'محارب الأسبوع', icon: 'Flame', color: '#F59E0B' },
  { id: 'fast-learner', name: 'متعلم سريع', icon: 'Rocket', color: '#8B5CF6' }
];

export const modules = [
  {
    id: 1,
    title: 'أساسيات البرمجة',
    subtitle: 'Programming Basics',
    status: 'completed',
    progress: 100,
    lessons: 12
  },
  {
    id: 2,
    title: 'قواعد البيانات',
    subtitle: 'Database Fundamentals',
    status: 'completed',
    progress: 100,
    lessons: 8
  },
  {
    id: 3,
    title: 'تطوير الويب',
    subtitle: 'Web Development',
    status: 'active',
    progress: 65,
    lessons: 15
  },
  {
    id: 4,
    title: 'الذكاء الاصطناعي',
    subtitle: 'Artificial Intelligence',
    status: 'locked',
    progress: 0,
    lessons: 20
  }
];

export const userLevels = [
  { level: 1, title: 'مبتدئ', subtitle: 'Beginner', minXP: 0 },
  { level: 2, title: 'متدرب', subtitle: 'Apprentice', minXP: 100 },
  { level: 3, title: 'ممارس', subtitle: 'Practitioner', minXP: 300 },
  { level: 4, title: 'خبير بيانات', subtitle: 'Data Wrangler', minXP: 600 },
  { level: 5, title: 'محترف', subtitle: 'Professional', minXP: 1000 }
];
