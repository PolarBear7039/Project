import React, { useState } from 'react';
import { Users, Clock, CheckCircle2, MessageSquare, Briefcase, Star } from 'lucide-react';

// بيانات وهمية للطلبات
const MOCK_REQUESTS = [
  { id: 1, student: 'أحمد محمد', track: 'Frontend Development', topic: 'مراجعة مشروع React', status: 'pending', date: 'منذ ساعتين', avatar: 'bg-blue-100' },
  { id: 2, student: 'سارة علي', track: 'Data Analysis', topic: 'استشارة في مسار SQL', status: 'pending', date: 'منذ 5 ساعات', avatar: 'bg-purple-100' },
  { id: 3, student: 'كريم محمود', track: 'UI/UX Design', topic: 'تقييم Portfolio', status: 'active', date: 'جاري الآن', avatar: 'bg-emerald-100' },
];

export default function MentorDashboard({ mentorName, specialization }: { mentorName: string, specialization: string }) {
  const [activeTab, setActiveTab] = useState<'pending' | 'active'>('pending');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8" dir="rtl">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">أهلاً، كابتن {mentorName} 👋</h1>
          <div className="flex items-center gap-2 text-slate-500">
            <Briefcase size={18} />
            <span>تخصص: {specialization}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-full border border-yellow-200">
          <Star size={18} className="fill-current" />
          <span className="font-bold">4.9/5.0</span>
          <span className="text-sm opacity-75">(24 تقييم)</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm">إجمالي الطلبات</p>
            <p className="text-2xl font-bold text-slate-800">142</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm">طلبات معلقة</p>
            <p className="text-2xl font-bold text-slate-800">5</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm">ساعات توجيه</p>
            <p className="text-2xl font-bold text-slate-800">36h</p>
          </div>
        </div>
      </div>

      {/* Requests Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => setActiveTab('pending')}
            className={`flex-1 py-4 text-center font-bold transition-colors ${activeTab === 'pending' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-400 hover:text-slate-600'}`}
          >
            الطلبات الجديدة (2)
          </button>
          <button 
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-4 text-center font-bold transition-colors ${activeTab === 'active' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50' : 'text-slate-400 hover:text-slate-600'}`}
          >
            جلسات جارية (1)
          </button>
        </div>

        {/* List */}
        <div className="p-6 space-y-4">
          {MOCK_REQUESTS.filter(r => r.status === activeTab).map((req) => (
            <div key={req.id} className="flex flex-col md:flex-row items-center justify-between p-4 border border-slate-100 rounded-xl hover:border-blue-200 transition-all bg-slate-50/50">
              <div className="flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0">
                <div className={`w-12 h-12 ${req.avatar} rounded-full flex items-center justify-center text-slate-600 font-bold`}>
                  {req.student.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{req.student}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">{req.track}</span>
                    <span>• {req.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto pl-4 border-r border-slate-200 mr-4">
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-700">الموضوع:</p>
                  <p className="text-sm text-slate-500">{req.topic}</p>
                </div>
              </div>

              <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
                {activeTab === 'pending' ? (
                  <>
                    <button className="flex-1 md:flex-none px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors text-sm">
                      قبول
                    </button>
                    <button className="flex-1 md:flex-none px-4 py-2 border border-slate-300 text-slate-600 rounded-lg font-bold hover:bg-slate-50 transition-colors text-sm">
                      تأجيل
                    </button>
                  </>
                ) : (
                  <button className="flex-1 md:flex-none px-6 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2 text-sm">
                    <MessageSquare size={16} /> دخول المحادثة
                  </button>
                )}
              </div>
            </div>
          ))}

          {MOCK_REQUESTS.filter(r => r.status === activeTab).length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <p>لا توجد طلبات في هذه القائمة حالياً.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}