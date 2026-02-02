import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Building2, Users, ArrowLeft } from 'lucide-react';

interface RoleSelectionProps {
  onSelectRole: (role: 'student' | 'company' | 'mentor') => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-800" dir="rtl">
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-3xl">✨</span>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Verified Career Engine
          </h1>
        </div>
        <p className="text-xl text-slate-500">حدد هويتك للبدء في رحلة مهنية موثقة</p>
      </motion.div>

      {/* Cards Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full"
      >
        {/* 1. Student Card */}
        <motion.button
          variants={itemVariants}
          onClick={() => onSelectRole('student')}
          className="group relative bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-400 transition-all duration-300 text-right flex flex-col gap-4 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
          
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <GraduationCap size={32} />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">طالب / خريج</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              ابنِ مسارك المهني، وثق مهاراتك، واحصل على فرص تدريب ووظائف تناسب مستواك الحقيقي.
            </p>
          </div>
          
          <div className="mt-auto flex justify-end opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
            <ArrowLeft className="text-blue-500" />
          </div>
        </motion.button>

        {/* 2. Company Card */}
        <motion.button
          variants={itemVariants}
          onClick={() => onSelectRole('company')}
          className="group relative bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-purple-400 transition-all duration-300 text-right flex flex-col gap-4 overflow-hidden"
        >
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
          
          <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <Building2 size={32} />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-600 transition-colors">جهة توظيف</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              وصول مباشر لمواهب تم التحقق من مهاراتها فعلياً، بعيداً عن ضجيج الـ CVs التقليدية.
            </p>
          </div>

          <div className="mt-auto flex justify-end opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
            <ArrowLeft className="text-purple-500" />
          </div>
        </motion.button>

        {/* 3. Mentor Card */}
        <motion.button
          variants={itemVariants}
          onClick={() => onSelectRole('mentor')}
          className="group relative bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-emerald-400 transition-all duration-300 text-right flex flex-col gap-4 overflow-hidden"
        >
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
          
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <Users size={32} />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">موجه / Mentor</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              شارك خبرتك، ساعد الطلاب في بناء مساراتهم، وكن جزءاً من مجتمع تعليمي مؤثر.
            </p>
          </div>

          <div className="mt-auto flex justify-end opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
            <ArrowLeft className="text-emerald-500" />
          </div>
        </motion.button>

      </motion.div>
      
      <footer className="mt-12 text-slate-400 text-sm">
        © 2026 Verified Career Engine MVP. All rights reserved.
      </footer>
    </div>
  );
};

export default RoleSelection;