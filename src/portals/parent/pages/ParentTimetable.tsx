import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, MapPin, User, Calendar, 
  ChevronLeft, ChevronRight, Info,
  AlertCircle
} from 'lucide-react';
import { useParentAuth } from '../context/ParentContext';
import ParentSkeletonLoader from '../components/ParentSkeletonLoader';

const ParentTimetable = () => {
  const { studentProfile, loading: contextLoading } = useParentAuth();
  const [activeDay, setActiveDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'>('Mon');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

  const scheduleData: any = {
    'Mon': [
      { time: '09:00 - 10:00', subject: 'Machine Learning', room: 'L-402', faculty: 'Dr. Priya Sharma', type: 'Lecture', status: 'completed' },
      { time: '10:00 - 11:00', subject: 'Cloud Computing', room: 'L-405', faculty: 'Prof. Amit Desai', type: 'Lecture', status: 'completed' },
      { time: '11:15 - 12:15', subject: 'Software Testing', room: 'L-201', faculty: 'Prof. Rekha Jain', type: 'Lecture', status: 'current' },
      { time: '12:15 - 01:15', subject: 'LUNCH BREAK', room: 'Cafeteria', type: 'Break', status: '' },
      { time: '01:15 - 03:15', subject: 'DBMS Lab', room: 'Lab 3', faculty: 'Dr. Sunita Patil', type: 'Practical', status: 'upcoming' },
    ],
    'Tue': [
       { time: '09:00 - 10:00', subject: 'Big Data', room: 'L-402', faculty: 'Dr. Suresh V', type: 'Lecture', status: 'completed' },
       { time: '10:00 - 12:00', subject: 'Cloud Computing Lab', room: 'Lab 1', faculty: 'Prof. Amit Desai', type: 'Practical', status: 'current' },
    ],
    'Wed': [{ time: '09:00 - 11:00', subject: 'Machine Learning Lab', room: 'Lab 2', faculty: 'Dr. Priya Sharma', type: 'Practical', status: '' }],
    'Thu': [{ time: '10:00 - 11:00', subject: 'Soft Skills', room: 'Audit Hall', faculty: 'Ms. Neha Sinha', type: 'Session', status: '' }],
    'Fri': [{ time: '09:00 - 10:00', subject: 'Project Seminar', room: 'Sem Hall', faculty: 'HOD', type: 'Seminar', status: '' }],
    'Sat': [{ time: '09:00 - 12:00', subject: 'Guest Lecture', room: 'Audit Hall', type: 'Session', status: '' }],
  };

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
           <h1 className="text-[28px] font-fraunces font-light italic text-[#111827] dark:text-white">Academic Schedule</h1>
           <p className="mt-1 text-[14px] text-gray-500 dark:text-gray-400 font-outfit">
              Reviewing active timetable allocations for <span className="font-bold text-gray-900 dark:text-gray-200">{studentProfile?.name}</span>
           </p>
        </div>
        
        <div className="flex bg-gray-50 dark:bg-gray-800 shadow-inner border border-gray-100 dark:border-gray-700 p-1.5 rounded-2xl w-full md:w-auto overflow-x-auto custom-scrollbar">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-4 xl:px-6 py-2.5 text-[13px] font-bold font-outfit rounded-xl transition-all whitespace-nowrap
                ${activeDay === day ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm border border-gray-200 dark:border-gray-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Context Status */}
        <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
          <div className="p-8 bg-[#0C2461] rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group hover:shadow-blue-900/20 transition-all">
             <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
             <p className="text-[10px] font-black tracking-[0.2em] uppercase text-white/60 mb-2 border-b border-white/10 pb-4">Live Status Check</p>
             <h3 className="text-[24px] font-bold mt-4 font-outfit">Active in Class</h3>
             
             <div className="mt-6 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-5 items-start sm:items-center lg:items-start xl:items-center bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-sm">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-inner shrink-0">
                   <Clock size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-[16px] font-bold leading-tight font-outfit">Software Testing</p>
                  <p className="text-[12px] opacity-70 mt-1 font-mono">11:15 AM - 12:15 PM</p>
                </div>
             </div>

             <div className="mt-8 flex items-center justify-between bg-black/20 p-5 rounded-3xl border border-white/5">
                <div>
                   <p className="text-[9px] uppercase font-black text-white/50 tracking-[0.2em] mb-1">Venue</p>
                   <p className="text-[14px] font-bold font-mono">Room L-201</p>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">In Progress</span>
                </div>
             </div>
          </div>

          <div className="p-8 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[2.5rem] shadow-sm flex flex-col h-[calc(100%-420px)] min-h-[250px]">
             <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                    <Info size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="text-[14px] font-black font-outfit text-gray-900 dark:text-white uppercase tracking-widest">Faculty Advisor</h4>
             </div>
             
             <div className="flex items-center gap-4 mt-auto">
                <div className="w-14 h-14 rounded-[1rem] bg-gray-50 border border-gray-100 dark:bg-gray-900 dark:border-gray-700 flex items-center justify-center text-gray-800 dark:text-gray-200 font-black text-lg shadow-inner">
                   PS
                </div>
                <div>
                   <p className="text-[15px] font-bold text-gray-900 dark:text-white font-outfit">Dr. Priya Sharma</p>
                   <p className="text-[12px] text-gray-500 font-medium">Head of Department · CS</p>
                </div>
             </div>
             
             <button className="w-full mt-6 h-12 border-2 border-gray-100 bg-gray-50 dark:bg-gray-900 dark:border-gray-700 rounded-2xl text-[12px] font-black uppercase tracking-widest text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:border-blue-200 dark:hover:border-blue-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm active:scale-95">
                Contact Office
             </button>
          </div>
        </motion.div>

        {/* Right Column: Timeline Detail */}
        <motion.div variants={itemVariants} className="lg:col-span-8">
           <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[2.5rem] overflow-hidden shadow-sm h-full flex flex-col">
              <div className="px-8 py-6 border-b border-gray-50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/80 flex items-center justify-between">
                 <h3 className="text-[18px] font-bold text-gray-900 dark:text-white font-outfit">Scheduled Flow</h3>
                 <span className="text-[10px] font-black text-gray-500 bg-white border border-gray-200 px-4 py-2 rounded-xl uppercase tracking-widest shadow-sm">
                   Activity for {activeDay}
                 </span>
              </div>

              <div className="p-8 space-y-2 flex-1 overflow-y-auto custom-scrollbar">
                 {scheduleData[activeDay]?.map((slot: any, i: number) => (
                    <div key={i} className={`flex items-stretch gap-6 group transition-all relative
                       ${slot.status === 'completed' ? 'opacity-60 grayscale-[0.5]' : ''}`}>
                       
                       {/* Left Timeline Numbers */}
                       <div className="min-w-[100px] shrink-0 pt-6 text-right pb-8">
                          <p className="text-[14px] font-black text-gray-900 dark:text-white font-mono tracking-tighter">{slot.time.split(' - ')[0]}</p>
                          <p className="text-[11px] text-gray-400 font-mono font-medium mt-1 uppercase">{slot.time.split(' - ')[1]}</p>
                       </div>

                       {/* Right Card / Path */}
                       <div className="relative flex-1 pb-8 border-l-2 border-gray-100 dark:border-gray-700 pl-8 group-last:border-transparent group-last:pb-0">
                          
                          {/* Dot Tracer */}
                          <div className={`absolute top-7 left-[-7px] w-3 h-3 rounded-full transition-all border-2 border-white dark:border-gray-800
                            ${slot.status === 'current' ? 'bg-blue-600 scale-150 ring-4 ring-blue-100 shadow-[0_0_12px_rgba(37,99,235,0.4)]' : 
                              slot.type === 'Break' ? 'bg-amber-400' : 'bg-gray-300 dark:bg-gray-600'}
                          `} />

                          {/* Detail Card */}
                          <div className={`p-6 rounded-[1.5rem] border transition-all 
                            ${slot.status === 'current' ? 'bg-[#F0F7FF] border-blue-200 shadow-md transform scale-[1.02]' : 
                              slot.type === 'Break' ? 'bg-amber-50/50 border-amber-100 border-dashed' : 
                              'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-lg'}
                          `}>
                             <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                <div className="space-y-3">
                                   <div className="flex items-center gap-3">
                                      {slot.type !== 'Break' && (
                                         <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border
                                            ${slot.status === 'current' ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
                                            {slot.type}
                                         </span>
                                      )}
                                      <h4 className={`text-[18px] font-bold font-outfit leading-none mt-0.5
                                         ${slot.type === 'Break' ? 'text-amber-700' : 'text-gray-900 dark:text-white'}`}>
                                         {slot.subject}
                                      </h4>
                                   </div>
                                   
                                   {slot.faculty && (
                                     <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-gray-500 font-medium">
                                        <span className="flex items-center gap-2"><div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center shrink-0"><User size={12} className="text-gray-400" /></div> {slot.faculty}</span>
                                        <span className="flex items-center gap-2"><div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center shrink-0"><MapPin size={12} className="text-gray-400" /></div> <span className="font-mono text-gray-700 font-bold">{slot.room}</span></span>
                                     </div>
                                   )}
                                </div>

                                {slot.status === 'current' && (
                                   <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 bg-white/50 px-4 py-2 rounded-xl shrink-0">
                                      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">In Session</p>
                                   </div>
                                )}
                             </div>
                          </div>
                          
                       </div>
                    </div>
                 ))}

                 {(!scheduleData[activeDay] || scheduleData[activeDay].length === 0) && (
                    <div className="py-24 flex flex-col items-center text-center border-2 border-dashed border-gray-200 rounded-[2rem] bg-gray-50/50">
                       <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                           <Calendar size={28} className="text-gray-400" />
                       </div>
                       <p className="text-gray-900 font-bold font-outfit text-lg">No Schedule</p>
                       <p className="text-gray-500 font-medium text-sm mt-1">There are no academic activities scheduled for today.</p>
                    </div>
                 )}
              </div>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ParentTimetable;
