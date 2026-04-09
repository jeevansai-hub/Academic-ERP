import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, User, CheckCircle2, 
  ChevronRight, Info, Search, 
  Layers, BarChart
} from 'lucide-react';
import { useParentAuth } from '../context/ParentContext';
import ParentSkeletonLoader from '../components/ParentSkeletonLoader';

const ParentCurriculum = () => {
  const { studentProfile, loading: contextLoading } = useParentAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }
  };

  const subjects = [
    { id: '1', code: 'CS601', name: 'Machine Learning', faculty: 'Dr. Priya Sharma', units: 5, covered: 2, total: 24, status: 'on-track', color: '#1A56DB' },
    { id: '2', code: 'CS602', name: 'Cloud Computing', faculty: 'Prof. Amit Desai', units: 5, covered: 3, total: 20, status: 'ahead', color: '#10B981' },
    { id: '3', code: 'CS603', name: 'Software Testing', faculty: 'Prof. Rekha Jain', units: 4, covered: 1, total: 18, status: 'behind', color: '#EF4444' },
    { id: '4', code: 'CS604', name: 'Big Data', faculty: 'Dr. Suresh V', units: 5, covered: 2, total: 22, status: 'on-track', color: '#7C3AED' },
  ];

  if (contextLoading) return <ParentSkeletonLoader type="page" />;

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
      className="space-y-8 pb-16"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div>
           <h1 className="text-[28px] font-fraunces font-light italic text-[#111827] dark:text-white">Curriculum & Syllabus</h1>
           <p className="mt-1 text-[14px] text-gray-500 dark:text-gray-400 font-outfit">
              Active track completion monitoring for <span className="font-bold text-gray-900 dark:text-gray-200">{studentProfile?.name}</span>
           </p>
        </div>
        
        <div className="relative w-full md:w-[320px]">
           <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
           <input 
              type="text" 
              placeholder="Search subjects or units..." 
              className="w-full h-11 pl-11 pr-4 bg-white border border-gray-200 rounded-xl text-[13px] font-bold font-outfit text-gray-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
           />
        </div>
      </div>

      {/* Progress Summary Big Card */}
      <motion.div variants={itemVariants} className="p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row items-center gap-10 hover:shadow-xl transition-all relative overflow-hidden">
         {/* Decorative Background */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

         <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[8px] md:border-[12px] border-gray-50 relative flex items-center justify-center shrink-0 shadow-inner bg-white z-10">
            <svg className="absolute inset-0 w-full h-full -rotate-90 stroke-blue-600 drop-shadow-[0_4px_12px_rgba(37,99,235,0.4)]">
               <circle cx="50%" cy="50%" r="calc(50% - 6px)" fill="transparent" strokeWidth="12" strokeDasharray="440" strokeDashoffset="330" strokeLinecap="round" />
            </svg>
            <div className="text-center">
               <p className="text-[28px] md:text-[36px] font-black font-mono text-gray-900 tracking-tighter shadow-sm leading-none mt-2">25<span className="text-xl">%</span></p>
               <p className="text-[9px] font-black uppercase text-gray-400 tracking-[0.2em] mt-1">Syllabus</p>
            </div>
         </div>
         
         <div className="flex-1 space-y-6 relative z-10 w-full text-center md:text-left">
            <div>
               <h3 className="text-2xl font-bold text-gray-900 font-outfit">Semester Completion Status</h3>
               <p className="text-[14px] text-gray-500 mt-2 font-medium">Based on aggregated topic coverage across {subjects.length} active theory subjects.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="flex items-center justify-center md:justify-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
                  <p className="text-[13px] font-bold text-gray-600">8 of 84 topics covered</p>
               </div>
               <div className="flex items-center justify-center md:justify-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                  <p className="text-[13px] font-bold text-gray-600">On-track for midterms</p>
               </div>
            </div>
         </div>

         <div className="md:border-l border-gray-100 md:pl-10 relative z-10 w-full md:w-auto">
            <button className="h-14 px-8 bg-[#0C2461] hover:bg-blue-700 text-white rounded-[1.25rem] text-[13px] font-black uppercase tracking-widest shadow-lg shadow-blue-900/20 active:scale-95 transition-all w-full md:w-auto flex flex-col items-center justify-center gap-0.5 group">
               <span>Full Archive</span>
               <span className="text-[9px] font-medium opacity-60 normal-case tracking-normal">View past semesters</span>
            </button>
         </div>
      </motion.div>

      {/* Advisory Alert */}
      <motion.div variants={itemVariants} className="p-8 bg-orange-50 border border-orange-100 rounded-[2.5rem] shadow-sm flex flex-col lg:flex-row items-start lg:items-center gap-6">
         <div className="w-14 h-14 bg-orange-100 flex items-center justify-center rounded-2xl shrink-0 shadow-inner">
             <AlertTriangle size={28} className="text-orange-600" />
         </div>
         <div className="flex-1">
            <h4 className="text-[16px] font-bold text-orange-900 font-outfit uppercase tracking-tighter">Academic Readiness Insight</h4>
            <p className="text-[13px] text-orange-800 mt-2 leading-relaxed font-medium">
               <span className="font-bold border-b border-orange-200">Software Testing (CS603)</span> progress is currently flagging behind the semester pacing schedule. We recommend encouraging your child to review the Unit 2 topics on "Test Case Design" before the upcoming sessional boundaries.
            </p>
         </div>
      </motion.div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {subjects.map(sub => (
           <motion.div 
             key={sub.id} 
             variants={itemVariants}
             className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group flex flex-col relative overflow-hidden"
           >
              {/* Top Section */}
              <div className="flex justify-between items-start mb-8 relative z-10">
                 <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner group-hover:shadow-[0_10px_20px_rgba(37,99,235,0.3)]">
                       <BookOpen size={28} />
                    </div>
                    <div>
                       <p className="text-[11px] font-black font-mono text-gray-400 tracking-widest">{sub.code}</p>
                       <h4 className="text-[18px] font-bold text-gray-900 font-outfit mt-1 leading-tight">{sub.name}</h4>
                    </div>
                 </div>
              </div>

              {/* Status Badge Positioned Specially */}
              <div className="absolute top-8 right-8 z-10">
                 <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border
                    ${sub.status === 'ahead' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                      sub.status === 'behind' ? 'bg-rose-50 text-rose-600 border-rose-100 animate-pulse' : 
                      'bg-blue-50 text-blue-600 border-blue-100'}
                 `}>
                    {sub.status.replace('-', ' ')}
                 </span>
              </div>

              {/* Progress UI */}
              <div className="space-y-5 mt-auto relative z-10">
                 <div className="flex justify-between items-end border-b border-gray-100 pb-4">
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Pacing Graph</p>
                    <p className="text-[28px] font-bold text-gray-900 font-mono leading-none tracking-tighter">
                        {Math.round((sub.covered/sub.total)*100)}<span className="text-lg opacity-40">%</span>
                    </p>
                 </div>
                 
                 <div className="w-full h-3.5 bg-gray-100 rounded-full overflow-hidden shadow-inner relative">
                    <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${(sub.covered/sub.total)*100}%` }} 
                        transition={{ duration: 1.2, ease: "easeOut" }} 
                        className="absolute top-0 bottom-0 left-0 rounded-full"
                        style={{ backgroundColor: sub.color }}
                    />
                 </div>
                 
                 {/* Footer Info */}
                 <div className="pt-6 flex items-center justify-between mt-6">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <User size={14} className="text-gray-500" />
                       </div>
                       <div>
                           <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Faculty Lead</p>
                           <p className="text-[13px] font-bold text-gray-900">{sub.faculty}</p>
                       </div>
                    </div>
                    <button className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                       <ChevronRight size={20} />
                    </button>
                 </div>
              </div>
           </motion.div>
         ))}
      </div>

    </motion.div>
  );
};

export default ParentCurriculum;
