import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, PenTool, BarChart3, Search, X, 
  ChevronRight, Filter, Download 
} from 'lucide-react';
import { assignedSubjects } from '../../data/facultyData';
import { useNavigate } from 'react-router-dom';

const Subjects: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Subjects & Classes</h1>
          <p className="text-sm text-[#6b7280] mt-1">Manage your assigned subjects and class sections</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search subjects..."
              className="pl-10 pr-4 py-2 bg-white border border-[#e5e7eb] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db] transition-all w-64"
            />
          </div>
          <button className="p-2 border border-[#e5e7eb] rounded-lg text-gray-600 hover:bg-gray-50 bg-white">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {assignedSubjects.map((subject, i) => (
          <motion.div
            key={subject.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[16px] border border-[#e5e7eb] shadow-sm hover:shadow-xl transition-all group overflow-hidden"
          >
            {/* Subject Header */}
            <div className="p-6 pb-4 relative">
              <div 
                className="absolute top-0 left-0 w-1.5 h-full" 
                style={{ backgroundColor: subject.color }}
              ></div>
              <div className="flex items-start justify-between">
                <div>
                  <span 
                    className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold text-white mb-2"
                    style={{ backgroundColor: subject.color }}
                  >
                    {subject.code}
                  </span>
                  <h2 className="text-xl font-bold text-[#111827] group-hover:text-[#1a56db] transition-colors">
                    {subject.name}
                  </h2>
                  <p className="text-[12px] text-[#6b7280] mt-1 uppercase font-semibold tracking-wider">
                    Computer Science Department
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400">
                   <BookIcon color={subject.color} />
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-2 mt-6">
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-[10px] font-bold text-[#6b7280] uppercase">Students</p>
                  <p className="text-lg font-bold text-[#111827]">{subject.students}</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-[10px] font-bold text-[#6b7280] uppercase">Tests Done</p>
                  <p className="text-lg font-bold text-[#111827]">{subject.testsDone}</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-[10px] font-bold text-[#6b7280] uppercase">Avg Score</p>
                  <p className="text-lg font-bold" style={{ color: subject.avgScore >= 15 ? '#10b981' : subject.avgScore >= 10 ? '#f59e0b' : '#ef4444' }}>
                    {subject.avgScore}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-1.5">
                   <span className="text-[11px] font-bold text-[#6b7280]">CLASS AVERAGE</span>
                   <span className="text-[11px] font-bold text-[#111827]">{Math.round((subject.avgScore / 20) * 100)}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(subject.avgScore / 20) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: subject.color }}
                  />
                </div>
                <p className="text-[10px] text-[#9ca3af] mt-2 italic text-right">Marks updated 2 hrs ago</p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-[#e5e7eb] flex items-center justify-between">
              <div className="flex gap-1">
                <span className="px-2 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-500">CSE-A</span>
                <span className="px-2 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-500">CSE-B</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedSubject(subject.name)}
                  className="p-2 text-gray-600 hover:text-[#1a56db] hover:bg-white rounded-lg transition-all" 
                  title="View Students"
                >
                  <Users size={18} />
                </button>
                <button 
                  onClick={() => navigate('/faculty/marks')}
                  className="p-2 text-gray-600 hover:text-[#1a56db] hover:bg-white rounded-lg transition-all" 
                  title="Upload Marks"
                >
                  <PenTool size={18} />
                </button>
                <button 
                  onClick={() => navigate('/faculty/analytics')}
                  className="p-2 text-gray-600 hover:text-[#1a56db] hover:bg-white rounded-lg transition-all" 
                  title="View Analytics"
                >
                  <BarChart3 size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Student List Sidebar Panel */}
      <AnimatePresence>
        {selectedSubject && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50 backdrop-blur-sm"
              onClick={() => setSelectedSubject(null)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full sm:w-[450px] h-full bg-white z-[60] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-[#e5e7eb] flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#111827]">{selectedSubject}</h2>
                  <p className="text-sm text-[#6b7280]">Section A • 60 Students</p>
                </div>
                <button 
                  onClick={() => setSelectedSubject(null)}
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search students..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-[#e5e7eb] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db] transition-all"
                  />
                </div>

                <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-250px)] pr-2 custom-scrollbar">
                  {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
                    <div key={i} className="group p-4 rounded-xl border border-[#e5e7eb] hover:border-[#1a56db] hover:bg-[#eff6ff]/50 transition-all cursor-pointer">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                             RK
                           </div>
                           <div>
                              <p className="text-sm font-bold text-[#111827]">Rajesh Kumar</p>
                              <p className="text-[11px] text-[#9ca3af]">VIIT-2021-CS-101</p>
                           </div>
                         </div>
                         <div className="text-right">
                            <span className="inline-block px-2 py-0.5 bg-[#f0fdf4] text-[#10b981] text-[10px] font-bold rounded-full mb-1">Pass</span>
                            <p className="text-xs font-bold text-[#111827]">Avg: 18.2</p>
                         </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity pt-3 border-t border-gray-100">
                         <button className="text-[11px] font-bold text-[#1a56db] hover:underline flex items-center gap-1">
                           View Profile <ChevronRight size={12} />
                         </button>
                         <button className="p-1.5 hover:bg-white rounded">
                           <Download size={14} className="text-gray-400" />
                         </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto p-6 border-t border-[#e5e7eb] bg-gray-50">
                <button className="w-full py-3 bg-[#1a56db] text-white rounded-xl font-bold hover:bg-[#1648c8] shadow-lg hover:shadow-blue-500/20 transition-all">
                  Show Full Student List
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const BookIcon = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
);

export default Subjects;
