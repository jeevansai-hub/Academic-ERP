import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarDays, Download, MapPin, Clock, 
  Search, Filter, List, Calendar, Info, 
  CheckCircle, AlertTriangle, FileText,
  Timer
} from 'lucide-react';
import { useParentAuth } from '../context/ParentContext';
import ParentSkeletonLoader from '../components/ParentSkeletonLoader';

const ParentExamHub = () => {
  const { studentProfile, loading: contextLoading } = useParentAuth();
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }
  };

  const exams = [
    { id: 'ex1', sub: 'CS603', name: 'Database Management Systems', type: 'Internal Assessment', date: '24 Mar 2026', time: '10:00 AM', venue: 'Hall B, Room 201', seat: 'Bench 12', status: 'upcoming' },
    { id: 'ex2', sub: 'MA601', name: 'Mathematics-III', type: 'Internal Assessment', date: '28 Mar 2026', time: '11:00 AM', venue: 'Hall A, Room 104', seat: 'Bench 4', status: 'upcoming' },
    { id: 'ex3', sub: 'CS602', name: 'Cloud Computing', type: 'Lab Assessment', date: '02 Apr 2026', time: '02:00 PM', venue: 'Lab 3, Block C', seat: 'Bench 6', status: 'upcoming' },
    { id: 'ex4', sub: 'MA601', name: 'Mathematics-III', type: 'Mid-semester', date: '10 Apr 2026', time: '09:00 AM', venue: 'Hall A, Room 104', seat: 'Row B', status: 'upcoming' },
  ];

  if (contextLoading) return <ParentSkeletonLoader type="page" />;

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
      className="space-y-8 pb-16"
    >
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div>
           <h1 className="text-[28px] font-fraunces font-light italic text-[#111827] dark:text-white">Exam & Results Hub</h1>
           <p className="mt-1 text-[14px] text-gray-500 dark:text-gray-400 font-outfit">
              Comprehensive academic assessments tracking for <span className="font-bold text-gray-900 dark:text-gray-200">{studentProfile?.name}</span>
           </p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <button className="w-full md:w-auto h-12 px-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-2xl text-[13px] font-black uppercase tracking-widest text-[#111827] dark:text-white flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition-all">
            <Download size={18} /> Hall Ticket
          </button>
        </div>
      </div>

      {/* Highlights Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
         {/* Next Exam Highlight Card */}
         <div className="p-8 bg-[#0C2461] rounded-[2.5rem] text-white shadow-xl overflow-hidden relative group hover:shadow-blue-900/20 transition-all">
            <div className="absolute right-[-40px] top-[-40px] w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10">
               <p className="text-[10px] font-black uppercase text-blue-200 tracking-[0.2em] mb-2">Next Milestone</p>
               <h3 className="text-2xl font-bold mt-2 font-outfit leading-tight w-4/5">Sessional Examination</h3>
               
               <div className="mt-8 flex items-center gap-4 bg-white/10 border border-white/20 p-5 rounded-3xl backdrop-blur-md">
                  <Timer size={28} className="text-blue-200" />
                  <div>
                     <p className="text-[22px] font-mono font-black tracking-tighter leading-none">In 3 Days</p>
                     <p className="text-[11px] font-medium text-blue-200 mt-1 uppercase tracking-widest">March 24th, 10:00 AM</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Upcoming Assessments Summary */}
         <div className="p-8 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[2.5rem] shadow-sm flex flex-col h-full">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700 pb-4 mb-4">Immediate Assessments</p>
            <div className="flex-1 flex flex-col justify-center space-y-5">
               {exams.slice(0, 2).map(ex => (
                 <div key={ex.id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-600">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                       <FileText size={18} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-gray-900 dark:text-white font-outfit">{ex.sub} — {ex.type}</p>
                      <p className="text-[12px] font-mono font-medium text-gray-500 dark:text-gray-400 mt-0.5">{ex.date}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Eligibility Status */}
         <div className="p-8 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 rounded-[2.5rem] shadow-sm md:col-span-2 xl:col-span-1 flex flex-col justify-between">
            <div>
               <p className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-[0.2em] mb-4">Clearance Status</p>
               <h3 className="text-[42px] font-black text-emerald-700 dark:text-emerald-300 mt-2 font-mono leading-none flex items-center gap-3">
                  <CheckCircle size={36} /> Good
               </h3>
            </div>
            <p className="text-[13px] text-emerald-800 dark:text-emerald-200 mt-8 font-medium leading-relaxed bg-emerald-100/50 dark:bg-emerald-800/30 p-5 rounded-2xl">
               The student is <strong className="font-bold">eligible</strong> for all upcoming examinations. Attendance criteria (75%+) and clearance checks are satisfied.
            </p>
         </div>
      </motion.div>

      {/* Main Content Hub */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[2.5rem] overflow-hidden shadow-sm">
         <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-700 p-1.5 rounded-2xl w-full md:w-auto">
               <button onClick={() => setViewMode('calendar')} className={`px-6 py-2.5 flex-1 md:flex-none text-[12px] font-black uppercase tracking-widest rounded-xl transition-all ${viewMode === 'calendar' ? 'bg-[#1A56DB] text-white shadow-md' : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>Calendar</button>
               <button onClick={() => setViewMode('list')} className={`px-6 py-2.5 flex-1 md:flex-none text-[12px] font-black uppercase tracking-widest rounded-xl transition-all ${viewMode === 'list' ? 'bg-[#1A56DB] text-white shadow-md' : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>List View</button>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
               <select className="w-full md:w-auto px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-[13px] font-bold text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer appearance-none">
                  <option>Semester 6</option>
                  <option>Semester 5</option>
               </select>
            </div>
         </div>

         {viewMode === 'list' ? (
            <div className="overflow-x-auto custom-scrollbar">
               <table className="w-full text-left font-outfit whitespace-nowrap">
                  <thead className="bg-gray-50/50 dark:bg-gray-800/50 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
                     <tr>
                        <th className="px-8 py-6">Subject</th>
                        <th className="px-8 py-6">Type</th>
                        <th className="px-8 py-6">Date & Time</th>
                        <th className="px-8 py-6">Venue/Seat</th>
                        <th className="px-8 py-6 text-right">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                     {exams.map(ex => (
                        <tr key={ex.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/30 transition-colors group">
                           <td className="px-8 py-6">
                              <div>
                                 <p className="text-[11px] font-mono font-black tracking-widest text-[#1A56DB] dark:text-blue-400 mb-1">{ex.sub}</p>
                                 <p className="text-[15px] font-bold text-gray-900 dark:text-white leading-tight">{ex.name}</p>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-[0.5rem] text-[10px] font-black uppercase tracking-widest shadow-sm">
                                 {ex.type}
                              </span>
                           </td>
                           <td className="px-8 py-6">
                              <div className="flex flex-col">
                                 <span className="text-[14px] font-bold text-gray-900 dark:text-white font-mono">{ex.date}</span>
                                 <span className="text-[12px] font-medium text-gray-500 dark:text-gray-400 mt-1">{ex.time}</span>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <div className="flex flex-col">
                                 <span className="text-[14px] font-bold text-gray-900 dark:text-white flex items-center gap-2"><MapPin size={14} className="text-gray-400" />{ex.venue}</span>
                                 <span className="text-[11px] font-mono font-black tracking-widest text-emerald-600 mt-1">Seat: {ex.seat}</span>
                              </div>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <span className="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl border border-blue-100 dark:border-blue-800 inline-block shadow-sm">
                                 Upcoming
                              </span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         ) : (
            <div className="p-16 flex flex-col items-center justify-center text-center">
               <div className="w-24 h-24 rounded-[2rem] bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-400 mb-8 shadow-inner">
                  <CalendarDays size={40} />
               </div>
               <div>
                  <h4 className="text-[20px] font-bold text-gray-900 dark:text-white font-outfit">Interactive Calendar Mode</h4>
                  <p className="text-[14px] font-medium text-gray-500 dark:text-gray-400 mt-3 max-w-sm mx-auto leading-relaxed">
                     Switch to the comprehensive calendar view to observe all assessments, reading days, and results mapped on a temporal scale.
                  </p>
               </div>
               <button className="mt-8 px-8 h-14 bg-[#1A56DB] hover:bg-blue-700 text-white rounded-2xl text-[13px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/20 active:scale-95 transition-all">
                  Load Calendar Module
               </button>
            </div>
         )}
      </motion.div>

      {/* Footer Info Notice */}
      <motion.div variants={itemVariants} className="flex items-center gap-4 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-[2rem] shadow-sm">
         <div className="w-12 h-12 bg-white dark:bg-gray-900 rounded-xl flex flex-shrink-0 items-center justify-center shadow-sm">
            <Info size={24} className="text-[#1A56DB] dark:text-blue-400" />
         </div>
         <p className="text-[13px] text-blue-800 dark:text-blue-200 font-medium leading-relaxed font-outfit">
            Assessment dates and venues are subject to change. Please ensure your child frequently reviews the live portal notifications for the most immediate and recent updates prior to examinations.
         </p>
      </motion.div>
    </motion.div>
  );
};

export default ParentExamHub;
