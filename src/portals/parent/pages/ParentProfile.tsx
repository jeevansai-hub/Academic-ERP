import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParentAuth } from '../context/ParentContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  GraduationCap, 
  Edit2,
  Camera,
  Smartphone,
  ChevronRight
} from 'lucide-react';
import ParentSkeletonLoader from '../components/ParentSkeletonLoader';

const ParentProfile: React.FC = () => {
    const { parentProfile, studentProfile, loading: contextLoading } = useParentAuth();
    const [loading, setLoading] = useState(true);
    const [pageLoaded, setPageLoaded] = useState(false);

    useEffect(() => {
        setPageLoaded(true);
        if (!contextLoading) {
            const timer = setTimeout(() => setLoading(false), 500);
            return () => clearTimeout(timer);
        }
    }, [contextLoading]);

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
            initial="hidden" animate="show"
            variants={containerAnim}
            className="max-w-5xl mx-auto space-y-8 pb-16"
        >
            {/* Header / Avatar Section */}
            <motion.div variants={itemAnim} className="relative bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden min-h-[220px] flex flex-col md:flex-row items-center gap-10">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-[#0C2461] to-[#1A56DB] opacity-10 pointer-events-none" />
                
                <div className="relative">
                   <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-[48px] md:text-[60px] font-fraunces font-light italic text-white shadow-xl border-4 border-white dark:border-gray-800">
                      {parentProfile?.name?.[0] || 'P'}
                   </div>
                   <button className="absolute bottom-2 right-2 p-3 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-full shadow-lg border border-gray-100 dark:border-gray-600 hover:scale-110 active:scale-95 transition-all">
                      <Camera size={20} />
                   </button>
                </div>

                <div className="relative flex-1 text-center md:text-left space-y-3">
                   <div className="space-y-1">
                      <h1 className="text-3xl font-fraunces font-light italic text-gray-900 dark:text-white">{parentProfile?.name || 'Parent Name'}</h1>
                      <div className="flex flex-wrap justify-center md:justify-start gap-3 items-center mt-3">
                         <span className="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">PORTAL ACTIVE</span>
                         <span className="text-gray-400 dark:text-gray-500 font-mono text-sm font-bold">UID: {parentProfile?.uid?.substring(0, 8)}...</span>
                      </div>
                   </div>
                   <p className="text-sm text-gray-500 dark:text-gray-400 font-medium max-w-md font-outfit leading-relaxed pt-2">
                      Primary registered guardian for <span className="text-blue-600 dark:text-blue-400 font-bold">{studentProfile?.name}</span> at Vignan's Institute of Information Technology.
                   </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 pt-4 md:pt-0">
                   <button className="h-12 px-6 bg-[#0C2461] hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[12px] rounded-2xl flex items-center gap-2 transition-all shadow-xl shadow-blue-900/20 active:scale-95">
                      <Edit2 size={16} /> Edit Details
                   </button>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Details Container */}
                <motion.div variants={itemAnim} className="lg:col-span-12 space-y-8">
                     
                     {/* Personal Info Box */}
                     <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col">
                        <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 flex justify-between items-center">
                           <h3 className="font-black text-gray-400 dark:text-gray-500 font-outfit uppercase tracking-[0.2em] text-[11px]">Personal Registry</h3>
                           <button className="text-blue-600 dark:text-blue-400 text-[12px] font-bold hover:underline">Verify Identity →</button>
                        </div>
                        <div className="p-10">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                                <ProfileField icon={User} label="Legal Name" value={parentProfile?.name} />
                                <ProfileField icon={Mail} label="Contact Email" value={parentProfile?.email} />
                                <ProfileField icon={Phone} label="Primary Network" value={parentProfile?.phone || "+91 8897 123 456"} />
                                <ProfileField icon={Smartphone} label="Alt Network" value={parentProfile?.altPhone || "Not Configured"} />
                                <ProfileField icon={MapPin} label="Registered Address" value={parentProfile?.address || "Duvvada, Visakhapatnam, AP - 530049"} />
                                <ProfileField icon={Shield} label="Authority Relation" value={parentProfile?.relationship || "Primary Guardian"} />
                            </div>
                        </div>
                     </div>

                     {/* Linked Student Box */}
                     <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 flex items-center gap-3">
                           <GraduationCap size={20} className="text-[#0C2461] dark:text-blue-400" />
                           <h3 className="font-black text-gray-400 dark:text-gray-500 font-outfit uppercase tracking-[0.2em] text-[11px]">Linked Ward Profile</h3>
                        </div>
                        
                        <div className="p-8">
                            <div className="flex flex-col md:flex-row items-center gap-8 bg-blue-50/50 dark:bg-blue-900/20 p-8 rounded-[2rem] border border-blue-100 dark:border-blue-800/50 group hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                               <div className="w-24 h-24 rounded-[1.5rem] bg-white dark:bg-gray-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-md shrink-0">
                                  <User size={40} strokeWidth={1.5} />
                               </div>
                               <div className="flex-1 space-y-4 text-center md:text-left">
                                  <div>
                                     <h4 className="text-[24px] font-bold text-gray-900 dark:text-white font-outfit leading-tight">{studentProfile?.name}</h4>
                                     <p className="text-[14px] text-gray-500 dark:text-gray-400 font-medium mt-1">{studentProfile?.branch} · Semester {studentProfile?.currentSemester}</p>
                                  </div>
                                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                     <span className="text-[13px] font-mono text-blue-700 dark:text-blue-300 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl border border-blue-100 dark:border-gray-700 font-bold shadow-sm">
                                        ID: {studentProfile?.rollNo}
                                     </span>
                                     <span className="text-[13px] font-mono text-blue-700 dark:text-blue-300 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl border border-blue-100 dark:border-gray-700 font-bold shadow-sm">
                                        Batch: {studentProfile?.batch || '2021-25'}
                                     </span>
                                  </div>
                               </div>
                               <button className="w-14 h-14 bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg transition-all active:scale-95 shrink-0">
                                  <ChevronRight size={24} />
                                </button>
                            </div>
                        </div>
                     </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

// Internal Field Component
const ProfileField = ({ icon: Icon, label, value }: any) => (
    <div className="flex items-start gap-5 group">
        <div className="w-14 h-14 rounded-[1.25rem] bg-gray-50 dark:bg-gray-900/50 text-gray-400 dark:text-gray-500 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all shrink-0 border border-gray-100 dark:border-gray-800 shadow-inner">
            <Icon size={24} strokeWidth={1.5} />
        </div>
        <div className="space-y-1.5 flex-1">
            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] leading-none">{label}</p>
            <p className="text-[16px] font-bold text-gray-900 dark:text-white font-outfit break-words">
                {value && value !== "" ? value : <span className="opacity-50 italic font-medium">Not Configured</span>}
            </p>
        </div>
    </div>
);

export default ParentProfile;
