import React, { useState, useEffect } from 'react';
import { useParentAuth } from '../context/ParentContext';
import { 
  getStudentFacultyAdvisor, 
  submitMeetingRequest, 
  subscribeMeetingHistory 
} from '../utils/parentFirestore';
import { formatDate } from '../utils/formatters';
import { 
  Users, 
  Calendar, 
  Clock, 
  MessageSquare, 
  Video, 
  MapPin, 
  Info,
  CheckCircle2,
  XCircle,
  Clock3
} from 'lucide-react';
import ParentSkeletonLoader from '../components/ParentSkeletonLoader';
import { motion } from 'framer-motion';

const ParentMeetingRequest: React.FC = () => {
  const { parentProfile, studentProfile, activeStudentUID, loading: contextLoading } = useParentAuth();
  const [advisor, setAdvisor] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manual Form State
  const [form, setForm] = useState({
    preferredDate: '',
    preferredTime: '',
    mode: 'Online' as 'Online' | 'In-Person',
    reason: ''
  });
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    // Rely on student profile UID or the activeUID
    const currentUID = studentProfile?.uid || activeStudentUID;
    if (!currentUID || !parentProfile?.uid) {
       if (!contextLoading) setLoading(false);
       return;
    }
    
    setLoading(true);
    const init = async () => {
      try {
        const adv = await getStudentFacultyAdvisor(currentUID);
        setAdvisor(adv);
      } catch (err) {
        console.error("Error fetching advisor:", err);
      }
    };
    init();

    const unsub = subscribeMeetingHistory(parentProfile.uid, (data) => {
      // Filter history for the currently active student view
      setHistory(data.filter((req: any) => req.studentUID === currentUID));
      setLoading(false);
    });
    return () => unsub();
  }, [studentProfile?.uid, activeStudentUID, parentProfile?.uid, contextLoading]);

  const validate = () => {
    const newErrors: any = {};
    if (!form.preferredDate) newErrors.preferredDate = "Date is required";
    if (!form.preferredTime) newErrors.preferredTime = "Time is required";
    if (form.reason.length < 10) newErrors.reason = "Reason must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const currentUID = studentProfile?.uid || activeStudentUID;
    if (!currentUID || !parentProfile?.uid) return;

    setIsSubmitting(true);
    try {
      await submitMeetingRequest({
        ...form,
        parentUID: parentProfile.uid,
        studentUID: currentUID,
        facultyUID: advisor?.uid || 'Unknown',
        facultyName: advisor?.name || 'Faculty Advisor',
        status: 'Pending'
      });
      alert("Successfully submitted meeting request!");
      setForm({ preferredDate: '', preferredTime: '', mode: 'Online', reason: '' });
    } catch (err: any) {
      alert(err.message || "Failed to submit request");
    } finally {
      setIsSubmitting(false);
    }
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
      initial="hidden" animate="show" variants={containerAnim}
      className="space-y-8 pb-16"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div>
           <h1 className="text-[28px] font-fraunces font-light italic text-[#111827] dark:text-white">Meetings Request</h1>
           <p className="mt-1 text-[14px] text-gray-500 dark:text-gray-400 font-outfit">
              Connect with the academic advisor for <span className="font-bold text-gray-900 dark:text-gray-200">{studentProfile?.name}</span>
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left Column: Form */}
        <motion.div variants={itemAnim} className="xl:col-span-4 space-y-6">
           <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col">
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6 font-outfit">Schedule Consultation</h3>
              
              <form onSubmit={onSubmit} className="space-y-8 flex-1">
                 {/* Advisor Display */}
                 <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-black shadow-inner shrink-0">
                      {advisor?.name?.[0] || 'F'}
                    </div>
                    <div className="min-w-0">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Assigned Advisor</p>
                       <p className="text-sm font-bold text-gray-900 dark:text-white truncate font-outfit">{advisor?.name || "Dr. K. Vardhan"}</p>
                    </div>
                 </div>

                 {/* Date and Time Fields */}
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date focus</label>
                       <input 
                         type="date" 
                         value={form.preferredDate}
                         onChange={(e) => setForm({...form, preferredDate: e.target.value})}
                         min={new Date().toISOString().split('T')[0]}
                         className="w-full bg-gray-50 focus:bg-white border border-gray-200 focus:border-blue-500 rounded-xl px-4 py-3 text-sm font-bold outline-none transition-all dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                       />
                       {errors.preferredDate && <p className="text-[10px] text-red-500 font-bold">{errors.preferredDate}</p>}
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Time focus</label>
                       <input 
                         type="time" 
                         value={form.preferredTime}
                         onChange={(e) => setForm({...form, preferredTime: e.target.value})}
                         className="w-full bg-gray-50 focus:bg-white border border-gray-200 focus:border-blue-500 rounded-xl px-4 py-3 text-sm font-bold outline-none transition-all dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                       />
                       {errors.preferredTime && <p className="text-[10px] text-red-500 font-bold">{errors.preferredTime}</p>}
                    </div>
                 </div>

                 {/* Mode Selector */}
                 <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Format</label>
                     <div className="grid grid-cols-2 gap-2 p-1.5 bg-gray-50 dark:bg-gray-900 rounded-[1rem] border border-gray-100 dark:border-gray-800">
                        <button 
                          type="button" 
                          onClick={() => setForm({...form, mode: 'Online'})}
                          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all
                            ${form.mode === 'Online' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                           <Video size={16} /> Online
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setForm({...form, mode: 'In-Person'})}
                          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all
                            ${form.mode === 'In-Person' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                           <MapPin size={16} /> Campus
                        </button>
                     </div>
                 </div>

                 {/* Reason Field */}
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Discussion Topic</label>
                    <textarea 
                      value={form.reason}
                      onChange={(e) => setForm({...form, reason: e.target.value})}
                      placeholder="e.g. Discussing recent drop in Mathematics marks..."
                      className="w-full bg-gray-50 focus:bg-white border border-gray-200 focus:border-blue-500 rounded-[1rem] px-5 py-4 text-sm font-bold outline-none transition-all min-h-[140px] resize-none dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                    />
                    {errors.reason && <p className="text-[10px] text-red-500 font-bold">{errors.reason}</p>}
                 </div>

                 <button 
                   type="submit"
                   disabled={isSubmitting}
                   className={`w-full py-4 bg-[#0C2461] hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-lg flex items-center justify-center gap-3 transition-all
                     ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'}`}
                 >
                    {isSubmitting ? 'Submitting...' : 'Send Request'}
                 </button>
              </form>
           </div>
        </motion.div>

        {/* Right Column: History */}
        <motion.div variants={itemAnim} className="xl:col-span-8">
           <div className="bg-white dark:bg-gray-800 mx-auto rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden h-full min-h-[600px] flex flex-col">
              <div className="p-8 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 flex justify-between items-center">
                 <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">History & Status</h3>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                 {history.length > 0 ? (
                    <div className="space-y-4">
                        {history.map((req, i) => (
                            <div key={i} className="p-6 bg-gray-50 border border-gray-100 rounded-[1.5rem] hover:bg-white hover:border-gray-200 hover:shadow-md transition-all group">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-gray-100 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm shrink-0
                                            ${req.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : (req.status === 'Declined' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600')}`}>
                                            {req.status === 'Approved' ? <CheckCircle2 size={20} /> : (req.status === 'Declined' ? <XCircle size={20} /> : <Clock3 size={20} />)}
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-bold text-gray-900 font-outfit truncate pr-2">{req.facultyName || "Faculty Advisor"}</p>
                                            <p className="text-[11px] text-gray-500 font-medium">Faculty Name</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border shrink-0
                                            ${req.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : (req.status === 'Declined' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-amber-50 text-amber-600 border-amber-100 animate-pulse')}`}>
                                            {req.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-[12px] text-gray-600 font-medium">
                                            <Calendar size={14} className="text-gray-400 shrink-0" /> Date: <span className="font-bold text-gray-900">{formatDate(req.preferredDate)}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[12px] text-gray-600 font-medium">
                                            <Clock size={14} className="text-gray-400 shrink-0" /> Time: <span className="font-bold text-gray-900">{req.preferredTime}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[12px] text-gray-600 font-medium">
                                            {req.mode === 'Online' ? <Video size={14} className="text-blue-500 shrink-0" /> : <MapPin size={14} className="text-emerald-500 shrink-0" />} 
                                            Mode: <span className="font-bold text-gray-900">{req.mode || 'Online'}</span>
                                        </div>
                                    </div>
                                    <div className="bg-white border border-gray-100 p-4 rounded-2xl flex md:items-center">
                                        <p className="text-[13px] text-gray-500 italic flex-1">"{req.reason}"</p>
                                    </div>
                                </div>
                                {req.facultyResponse && (
                                    <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Response Notes</p>
                                        <p className="text-[13px] text-blue-900 leading-relaxed font-medium">{req.facultyResponse}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                 ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-100 rounded-[2rem]">
                        <MessageSquare size={48} className="text-gray-200 mb-4" />
                        <p className="text-gray-500 font-bold font-outfit text-lg">No Meeting Requests</p>
                        <p className="text-gray-400 text-sm mt-1">You haven't requested any meetings for this student yet.</p>
                    </div>
                 )}
              </div>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ParentMeetingRequest;
