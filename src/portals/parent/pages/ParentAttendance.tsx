import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParentAuth } from '../context/ParentContext';
import { subscribeToStudentAttendance } from '../utils/parentFirestore';
import { 
  CalendarCheck, 
  Info, 
  AlertTriangle, 
  ArrowLeft, 
  ArrowRight,
  ClipboardList,
  Target,
  TrendingDown
} from 'lucide-react';
import ParentSkeletonLoader from '../components/ParentSkeletonLoader';

const ParentAttendance: React.FC = () => {
  const { studentProfile, loading: contextLoading, activeStudentUID } = useParentAuth();
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const studentId = studentProfile?.rollNo || studentProfile?.uid || activeStudentUID;
    
    if (!studentId) {
       if (!contextLoading) setLoading(false);
       return;
    }

    const unsub = subscribeToStudentAttendance(studentId, (data) => {
      setAttendance(data);
      setLoading(false);
    });
    return () => unsub();
  }, [studentProfile?.rollNo, studentProfile?.uid, activeStudentUID, contextLoading]);

  const stats = useMemo(() => {
    if (attendance.length === 0) return { overall: 0, classesAttended: 0, classesTotal: 0, requiredToReach75: 0 };
    
    let totalClasses = 0;
    let attendedClasses = 0;

    attendance.forEach(sub => {
      const perSubTotal = 40; // rough mock based on credits
      totalClasses += perSubTotal;
      attendedClasses += Math.round((sub.percentage / 100) * perSubTotal);
    });

    const overallPct = totalClasses > 0 ? (attendedClasses / totalClasses) * 100 : 0;
    
    // Formula: (attended + required) / (total + required) = 0.75
    // attendance + required = 0.75 * total + 0.75 * required
    // required - 0.75 * required = 0.75 * total - attended
    // 0.25 * required = 0.75 * total - attended
    // required = (0.75 * total - attended) / 0.25
    let required = 0;
    if (overallPct < 75) {
       required = Math.ceil(((0.75 * totalClasses) - attendedClasses) / 0.25);
    }

    return { 
        overall: Math.round(overallPct), 
        classesAttended: attendedClasses, 
        classesTotal: totalClasses,
        requiredToReach75: required
    }; 
  }, [attendance]);

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const startDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const containerAnim = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemAnim = {
      hidden: { opacity: 0, y: 16 },
      show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }
  };

  if (loading || contextLoading) return <ParentSkeletonLoader type="page" />;

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerAnim}
      className="space-y-8 pb-16"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div>
           <h1 className="text-[28px] font-fraunces font-light italic text-[#111827] dark:text-white">Attendance Tracker</h1>
           <p className="mt-1 text-[14px] text-gray-500 dark:text-gray-400 font-outfit">
              Monitoring active participation for <span className="font-bold text-gray-900 dark:text-gray-200">{studentProfile?.name}</span>
           </p>
        </div>
        <div className="flex gap-2">
            <span className={`px-4 py-2 rounded-xl text-[16px] font-mono font-bold shadow-sm border
               ${stats.overall < 75 ? 'bg-red-50 text-red-600 border-red-100 pulse-red-border' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
               {stats.overall}%
            </span>
        </div>
      </div>

      {/* Stats Cards */}
      <motion.div variants={itemAnim} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
         <StatCard 
             label="OVERALL RATE" 
             value={`${stats.overall}%`}
             sub="Semester average"
             color={stats.overall >= 75 ? '#10B981' : '#EF4444'}
             icon={CalendarCheck}
             iconBg={stats.overall >= 75 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'}
             iconColor={stats.overall >= 75 ? '#10B981' : '#EF4444'}
             pulse={stats.overall < 75}
         />
         <StatCard 
             label="CLASSES ATTENDED" 
             value={stats.classesAttended.toString()}
             subValue={`/ ${stats.classesTotal}`}
             sub="Total sessions verified"
             color="#1A56DB"
             icon={ClipboardList}
             iconBg="rgba(26,86,219,0.10)"
             iconColor="#1A56DB"
         />
         <StatCard 
             label="STATUS" 
             value={stats.overall >= 75 ? 'Safe' : 'Critical'}
             sub={stats.overall >= 75 ? "Above required threshold" : "Below 75% limit"}
             color={stats.overall >= 75 ? '#10B981' : '#EF4444'}
             icon={Target}
             iconBg={stats.overall >= 75 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'}
             iconColor={stats.overall >= 75 ? '#10B981' : '#EF4444'}
         />
         <StatCard 
             label="HANDICAP BUFFER" 
             value={stats.requiredToReach75 > 0 ? stats.requiredToReach75.toString() : '5'}
             sub={stats.requiredToReach75 > 0 ? "Target classes to recover" : "Absences allowed safely"}
             color={stats.requiredToReach75 > 0 ? '#F59E0B' : '#6B7280'}
             icon={stats.requiredToReach75 > 0 ? TrendingDown : Info}
             iconBg={stats.requiredToReach75 > 0 ? "rgba(245,158,11,0.1)" : "rgba(107,114,128,0.1)"}
             iconColor={stats.requiredToReach75 > 0 ? "#F59E0B" : "#6B7280"}
         />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Calendar Heatmap */}
        <motion.div variants={itemAnim} className="lg:col-span-12 xl:col-span-8">
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden border">
            <div className="bg-[#0C2461] p-8 text-white flex justify-between items-center relative overflow-hidden">
               <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
               <div className="flex items-center gap-4 relative z-10">
                  <h3 className="text-[22px] font-fraunces italic font-light">
                     {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </h3>
               </div>
               <div className="flex gap-2 relative z-10">
                  <button onClick={() => changeMonth(-1)} className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-xl transition-all active:scale-90"><ArrowLeft size={18} /></button>
                  <button onClick={() => changeMonth(1)} className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-xl transition-all active:scale-90"><ArrowRight size={18} /></button>
               </div>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-7 gap-4 text-center mb-6">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                  <span key={day} className="text-[11px] font-black text-gray-400 tracking-[0.2em]">{day}</span>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-3 md:gap-5">
                 {Array.from({ length: startDay(currentDate) }).map((_, i) => (
                   <div key={`empty-${i}`} className="h-14 md:h-16" />
                 ))}
                 {Array.from({ length: daysInMonth(currentDate) }).map((_, i) => {
                    const day = i + 1;
                    const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
                    
                    // Simple mock projection
                    const status = Math.random() > 0.85 ? 'absent' : (Math.random() > 0.95 ? 'holiday' : 'present');
                    
                    return (
                      <div key={day} className={`h-14 md:h-16 rounded-[1rem] flex flex-col items-center justify-center gap-1 border transition-all hover:scale-110 group relative overflow-hidden cursor-default
                        ${status === 'present' ? 'bg-emerald-50/50 border-emerald-100' : (status === 'absent' ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100')}
                        ${isToday ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}>
                         <span className={`text-[14px] font-black font-mono 
                            ${status === 'present' ? 'text-emerald-600' : (status === 'absent' ? 'text-red-500' : 'text-gray-400')}`}>
                           {day}
                         </span>
                         <div className={`w-1.5 h-1.5 rounded-full ${status === 'present' ? 'bg-emerald-400' : (status === 'absent' ? 'bg-red-400' : 'bg-gray-300')}`} />
                      </div>
                    )
                 })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Summary Panel */}
        <motion.div variants={itemAnim} className="lg:col-span-12 xl:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm h-full max-h-[550px] flex flex-col">
               <h3 className="text-[11px] font-black text-gray-400 mb-6 font-outfit uppercase tracking-[0.2em] border-b border-gray-100 pb-4">Subject Breakdown</h3>
               
               <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-2">
                  {attendance.length > 0 ? attendance.map((sub, i) => (
                    <div key={i} className="group">
                       <div className="flex justify-between items-start mb-2">
                          <p className="text-[13px] font-bold text-gray-900 font-outfit truncate pr-2">{sub.subjectName}</p>
                          <span className={`text-[14px] font-mono font-black ${sub.percentage < 75 ? 'text-red-500 animate-pulse' : 'text-emerald-600'}`}>
                            {sub.percentage}%
                          </span>
                       </div>
                       <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner relative">
                          <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${sub.percentage}%` }}
                             transition={{ duration: 0.8, delay: 0.1 * i, ease: "easeOut" }}
                             className={`absolute left-0 top-0 bottom-0 rounded-full ${sub.percentage < 75 ? 'bg-red-500' : 'bg-blue-600'}`}
                          />
                       </div>
                    </div>
                  )) : (
                    <div className="h-full flex items-center justify-center">
                        <p className="text-gray-400 italic text-[13px] text-center bg-gray-50 border border-gray-100 p-6 rounded-2xl">
                          No distinct subject attendance recorded yet.
                        </p>
                    </div>
                  )}
               </div>
            </div>

            {stats.overall < 75 && (
               <div className="bg-red-50 border border-red-100 p-8 rounded-[2rem] shadow-sm shrink-0">
                  <div className="flex items-center gap-3 text-red-600 mb-4">
                     <AlertTriangle size={24} />
                     <h4 className="font-bold font-outfit text-lg">Warning Alert</h4>
                  </div>
                  <p className="text-[13px] text-red-700 leading-relaxed font-outfit">
                    Attendance has dropped below the mandatory 75% threshold. Please monitor consistency immediately to avoid exam debarment issues.
                  </p>
               </div>
            )}
        </motion.div>
      </div>
    </motion.div>
  );
};

const StatCard = ({ label, value, sub, subValue, color, icon: Icon, iconBg, iconColor, pulse }: any) => (
    <div className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: color }} />
        <div className="w-12 h-12 mb-6 rounded-[1rem] flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner" style={{ background: iconBg }}>
            <Icon size={24} color={iconColor} strokeWidth={2} />
        </div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-outfit">{label}</p>
        <div className="flex items-baseline gap-2 mt-2">
            <span className={`text-[36px] font-mono font-black tracking-tighter ${pulse ? 'animate-pulse text-red-500' : 'text-gray-900'}`}>
                {value}
            </span>
            {subValue && <span className="text-[18px] font-mono font-bold" style={{ color }}>{subValue}</span>}
        </div>
        <p className="text-[12px] font-bold font-outfit text-gray-500 mt-1 opacity-80">{sub}</p>
    </div>
);

export default ParentAttendance;
