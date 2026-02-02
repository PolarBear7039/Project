import { BarChart3, Palette, Code2, Database, Zap, Flame, Rocket } from 'lucide-react';

// =========================================
// 1. Career Tracks (مسارات التعلم)
// =========================================
export const careerTracks = [
  {
    id: 'frontend',
    title: 'تطوير الواجهات',
    subtitle: 'Frontend Development',
    description: 'بناء واجهات المستخدم التفاعلية باستخدام أحدث التقنيات.',
    icon: 'Palette',
    color: '#FF4B4B'
  },
  {
    id: 'data-analysis',
    title: 'تحليل البيانات',
    subtitle: 'Data Analysis',
    description: 'تحويل البيانات الخام إلى رؤى استراتيجية لاتخاذ القرارات.',
    icon: 'BarChart3',
    color: '#10B981'
  }
];

// =========================================
// 2. Skills Assessment (المهارات المحددة لكل تراك - جديد)
// =========================================
export const TRACK_SPECIFIC_SKILLS: Record<string, any[]> = {
  'frontend': [
    { id: 'html', name: 'HTML5 & Semantic Web', category: 'core', required: 9 },
    { id: 'css', name: 'CSS3 & Flexbox/Grid', category: 'core', required: 8 },
    { id: 'js', name: 'JavaScript (ES6+)', category: 'logic', required: 9 },
    { id: 'react', name: 'React.js & Hooks', category: 'framework', required: 8 },
    { id: 'tailwind', name: 'Tailwind CSS', category: 'styling', required: 7 },
    { id: 'git', name: 'Git & GitHub', category: 'tools', required: 7 },
    { id: 'api', name: 'REST APIs Integration', category: 'logic', required: 7 },
    { id: 'perf', name: 'Web Performance', category: 'advanced', required: 6 }
  ],
  'data-analysis': [
    { id: 'excel', name: 'Excel (Advanced)', category: 'core', required: 9 },
    { id: 'sql', name: 'SQL & Database Design', category: 'database', required: 8 },
    { id: 'powerbi', name: 'Power BI / Tableau', category: 'viz', required: 8 },
    { id: 'python', name: 'Python (Pandas/NumPy)', category: 'programming', required: 7 },
    { id: 'stats', name: 'Statistics & Probability', category: 'math', required: 7 },
    { id: 'cleaning', name: 'Data Cleaning', category: 'process', required: 8 },
    { id: 'storytelling', name: 'Data Storytelling', category: 'soft', required: 7 },
    { id: 'business', name: 'Business Acumen', category: 'soft', required: 6 }
  ]
};

// (Legacy Skills array - احتفظنا به لمنع الأخطاء في الملفات القديمة إن وجدت)
export const skills = [
  { id: 'sql', name: 'SQL', category: 'database', required: 7 },
  { id: 'react', name: 'React', category: 'frontend', required: 8 },
  { id: 'python', name: 'Python', category: 'backend', required: 6 },
  { id: 'html', name: 'HTML/CSS', category: 'frontend', required: 7 },
  { id: 'git', name: 'Git', category: 'tools', required: 6 },
  { id: 'algorithms', name: 'الخوارزميات', category: 'cs', required: 8 }
];

// =========================================
// 3. Quiz & Roadmap Data (بيانات الاختبار والرود ماب - جديد)
// =========================================
export const quizQuestions = [
  {
    id: 1,
    type: 'theory',
    question: 'ما هو الفرق بين var و let في JavaScript؟',
    options: ['لا يوجد فرق', 'var له نطاق دالة، let له نطاق كتلة', 'let أسرع', 'var أحدث'],
    correct: 1,
    time: 60
  },
  {
    id: 2,
    type: 'theory',
    question: 'في SQL، ماذا تفعل جملة SELECT DISTINCT؟',
    options: ['تحذف الجدول', 'تختار القيم المكررة', 'تختار القيم الفريدة فقط', 'ترتب النتائج'],
    correct: 2,
    time: 60
  }
];

export const ROADMAP_DATA = {
  'frontend': {
    free: [
      { title: 'أساسيات الويب (MDN)', type: 'article', duration: '2 Weeks' },
      { title: 'CS50 Introduction (Harvard)', type: 'video', duration: '4 Weeks' },
      { title: 'React Beta Docs', type: 'doc', duration: '3 Weeks' },
      { title: 'مشروع عملي: Portfolio', type: 'project', duration: '2 Weeks' }
    ],
    paid: [
      { title: 'Frontend Masters Bootcamp', type: 'course', duration: '3 Weeks' },
      { title: 'React - The Complete Guide (Udemy)', type: 'course', duration: '5 Weeks' },
      { title: 'Advanced CSS (Coursera)', type: 'course', duration: '2 Weeks' },
      { title: 'Mentorship Session', type: 'live', duration: '1 Week' }
    ]
  },
  'data-analysis': {
    free: [
      { title: 'Google Data Analytics (Audit)', type: 'course', duration: '4 Weeks' },
      { title: 'SQL Zoo Exercises', type: 'practice', duration: '2 Weeks' },
      { title: 'Kaggle Titanic Project', type: 'project', duration: '3 Weeks' }
    ],
    paid: [
      { title: 'DataCamp Career Track', type: 'subscription', duration: '8 Weeks' },
      { title: 'Udacity Data Analyst Nanodegree', type: 'degree', duration: '12 Weeks' },
      { title: 'Tableau Certified Associate', type: 'cert', duration: '4 Weeks' }
    ]
  }
};

// =========================================
// 4. Legacy Data (هام جداً لعمل الـ Sidebar)
// =========================================

export const badges = [
  { id: 'sql-hero', name: 'بطل SQL', icon: 'Database', color: '#3B82F6' },
  { id: 'react-ninja', name: 'نينجا React', icon: 'Zap', color: '#FF4B4B' },
  { id: 'week-warrior', name: 'محارب الأسبوع', icon: 'Flame', color: '#F59E0B' },
  { id: 'fast-learner', name: 'متعلم سريع', icon: 'Rocket', color: '#8B5CF6' }
];

export const userLevels = [
  { level: 1, title: 'مبتدئ', subtitle: 'Beginner', minXP: 0 },
  { level: 2, title: 'متدرب', subtitle: 'Apprentice', minXP: 100 },
  { level: 3, title: 'ممارس', subtitle: 'Practitioner', minXP: 300 },
  { level: 4, title: 'خبير بيانات', subtitle: 'Data Wrangler', minXP: 600 },
  { level: 5, title: 'محترف', subtitle: 'Professional', minXP: 1000 }
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