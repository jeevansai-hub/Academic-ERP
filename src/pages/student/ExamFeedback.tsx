import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, FileText, Clock, GraduationCap, ClipboardCheck, 
  UserCheck, Building2, TrendingDown, TrendingUp, CheckSquare, 
  BarChart3, AlertTriangle, MessageSquare, ChevronDown, 
  Brain, Download, Info, Search, Filter, Copy, 
  Lightbulb, Timer, History, Users, Target, Check, X, Sparkles, PenLine, Save, Send
} from 'lucide-react';
import StudentLayout from '../../components/layout/StudentLayout';

// ═══════════════════════════════════════════════════════════════
// MOCK DATA (Initial)
// ═══════════════════════════════════════════════════════════════

const INITIAL_FEEDBACK_DATA = {
    overallRating: 3.35,
    categories: [
        { id: "cat1", name: "Paper Difficulty", icon: FileText, rating: 3.8, status: "Moderate", impact: "Moderate impact", color: "#7C3AED", bgColor: "rgba(124,58,237,0.1)", trend: "+0.2", desc: "Paper level, syllabus coverage" },
        { id: "cat2", name: "Exam Timing", icon: Clock, rating: 2.9, status: "Needs improvement", impact: "High impact", color: "#EF4444", bgColor: "rgba(239,68,68,0.1)", trend: "-0.3", desc: "Time allotted, schedule conflicts" },
        { id: "cat3", name: "Faculty Explanation", icon: GraduationCap, rating: 4.2, status: "Good", impact: "Positive impact", color: "#10B981", bgColor: "rgba(16,185,129,0.1)", trend: "+0.5", desc: "Teaching quality, topic clarity" },
        { id: "cat4", name: "Exam Conduction", icon: ClipboardCheck, rating: 3.5, status: "Moderate", impact: "Neutral", color: "#1A56DB", bgColor: "rgba(26,86,219,0.1)", trend: "0.0", desc: "Stationery, rule adherence" },
        { id: "cat5", name: "Invigilator Behavior", icon: UserCheck, rating: 3.0, status: "Moderate", impact: "Minor impact", color: "#0EA5E9", bgColor: "rgba(14,165,233,0.1)", trend: "+0.1", desc: "Conduct and support during exam" },
        { id: "cat6", name: "Exam Environment", icon: Building2, rating: 2.7, status: "Needs improvement", impact: "High impact", color: "#EF4444", bgColor: "rgba(239,68,68,0.1)", trend: "-0.5", desc: "Ventilation, noise, seating" }
    ],
    examHistory: [
        { id: "ex1", sub: "CS603", type: "Internal", name: "Assessment 1", date: "14 Feb 2026", rating: 3.17, comment: "Paper was long, ran out of time for last 2 questions.", issues: ["Paper too lengthy", "Insufficient time"], score: "18", max: "20", facultyReply: "Dr. Ramesh Kumar noted your timing concern and will adjust duration." },
        { id: "ex2", sub: "CS602", type: "Lab", name: "Assessment 2", date: "18 Mar 2026", rating: 3.75, comment: "Lab was well organized. Faculty explained procedure clearly.", issues: [], score: "23", max: "25" },
        { id: "ex3", sub: "MA601", type: "Weekly", name: "Test 7", date: "14 Mar 2026", rating: 3.33, comment: "Room was hot and noisy.", issues: ["Poor ventilation", "Noisy environment"], score: "12", max: "20" },
        { id: "ex4", sub: "EC601", type: "Mid", name: "Semester 1", date: "20 Feb 2026", rating: 3.75, comment: "Well-conducted exam. Good environment.", issues: [], score: "22", max: "30" }
    ],
    pendingFeedback: [
        { id: "ex5", sub: "CS603", type: "Internal", name: "Assessment 2", date: "24 Mar 2026", max: "20" }
    ]
};

// ═══════════════════════════════════════════════════════════════
// HELPER COMPONENTS
// ═══════════════════════════════════════════════════════════════

const StarRating = ({ rating, size = 14 }: { rating: number, size?: number }) => {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => {
                const fill = Math.min(Math.max(rating - (s - 1), 0), 1);
                return (
                    <div key={s} className="relative overflow-hidden" style={{ width: size, height: size }}>
                        <Star size={size} className="text-[#E5E7EB]" fill="currentColor" />
                        <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                            <Star size={size} className="text-[#F59E0B]" fill="currentColor" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const Badge = ({ children, color }: any) => {
    const colors: any = {
        green: 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]',
        amber: 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]',
        red: 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]',
        blue: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]',
        gray: 'bg-[#F9FAFB] text-[#6B7280] border-[#E5E7EB]'
    };
    return (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${colors[color] || colors.gray}`}>
            {children}
        </span>
    );
};

// ═══════════════════════════════════════════════════════════════
// FORM SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════

const SuccessOverlay = ({ onComplete }: { onComplete: () => void }) => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-6"
        >
            <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 12 }}
                className="w-24 h-24 bg-[#10B981] rounded-full flex items-center justify-center text-white mb-6 shadow-xl shadow-green-500/20"
            >
                <Check size={48} strokeWidth={3} />
            </motion.div>
            <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-fraunces italic text-[#111827] mb-2"
            >
                Feedback Submitted!
            </motion.h2>
            <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[#6B7280] max-w-md"
            >
                Your exam experience has been recorded and connected to your performance analytics.
            </motion.p>
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "200px" }}
                transition={{ duration: 2.5, ease: "linear" }}
                onAnimationComplete={onComplete}
                className="h-1 bg-[#10B981] rounded-full mt-8"
            />
        </motion.div>
    );
};

const StarInput = ({ value, onChange, label, icon: Icon, color }: any) => {
    const [hover, setHover] = useState(0);
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-[#F3F4F6] group hover:bg-[#F9FAFB]/50 transition-colors px-2 -mx-2 rounded-xl">
            <div className="flex items-center gap-3 mb-2 sm:mb-0">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: `${color}10`, color: color }}>
                    <Icon size={18} />
                </div>
                <div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-[13px] font-bold text-[#374151] font-outfit">{label}</span>
                        <span className="text-red-500 text-[10px]">*</span>
                    </div>
                    <p className="text-[11px] text-[#9CA3AF] font-outfit">Rate this category</p>
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="flex gap-1.5" onMouseLeave={() => setHover(0)}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                            key={star}
                            whileHover={{ scale: 1.25 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onChange(star)}
                            onMouseEnter={() => setHover(star)}
                            className="relative"
                        >
                            <Star 
                                size={26} 
                                className={`transition-all duration-300 ${
                                    (hover || value) >= star 
                                        ? 'text-[#F59E0B] fill-[#F59E0B]' 
                                        : 'text-[#E5E7EB] fill-none'
                                }`}
                                strokeWidth={hover >= star ? 2 : 1.5}
                            />
                            {value === star && (
                                <motion.div 
                                    layoutId="activeStar"
                                    className="absolute -inset-1 border-2 border-[#F59E0B]/20 rounded-full"
                                />
                            )}
                        </motion.button>
                    ))}
                </div>
                <div className="w-14 text-center">
                    <span className={`text-[16px] font-mono font-bold ${value > 0 ? 'text-[#111827]' : 'text-[#D1D5DB]'}`}>
                        {value > 0 ? value.toFixed(1) : '—'}
                    </span>
                    {value > 0 && (
                        <Badge color={value >= 4 ? 'green' : value >= 3 ? 'amber' : 'red'}>
                            {value >= 4 ? 'Great' : value >= 3 ? 'Ok' : 'Poor'}
                        </Badge>
                    )}
                </div>
            </div>
        </div>
    );
};

const DirectFeedbackForm = ({ 
    feedbackData, selectedExam, selectedExamId, setSelectedExamId, 
    score, setScore, maxMarks, setMaxMarks, 
    categoryRatings, setCategoryRatings, 
    selectedIssues, setSelectedIssues, 
    comment, setComment, 
    preparationLevel, setPreparationLevel,
    isSubmitting, averageRating, onSubmit 
}: any) => {
    const issues = ["Paper too lengthy", "Insufficient time", "Noisy environment", "Poor light", "Drafty room", "Invigilator delay", "Tough questions", "Out of syllabus"];

    const toggleIssue = (issue: string) => {
        setSelectedIssues((prev: string[]) => 
            prev.includes(issue) ? prev.filter(i => i !== issue) : [...prev, issue]
        );
    };

    const isStep1Complete = !!selectedExamId && !!score && !!maxMarks;
    const isStep2Complete = Object.keys(categoryRatings).length >= 3;
    const isStep3Complete = !!comment && comment.length > 20;

    return (
        <section className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden flex flex-col xl:flex-row min-h-[600px]">
            {/* LEFT SIDE: INPUT FORM */}
            <div className="flex-1 p-8 border-b xl:border-b-0 xl:border-r border-[#F3F4F6]">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-[18px] font-bold text-[#111827] font-outfit flex items-center gap-2">
                            <PenLine size={20} className="text-[#1A56DB]" />
                            Direct Feedback Entry
                        </h2>
                        <p className="text-[13px] text-[#6B7280] font-outfit mt-1">Submit your exam experience ratings directly on the page</p>
                    </div>
                    <div className="flex gap-1">
                        {[1, 2, 3].map(step => {
                            const isComplete = step === 1 ? isStep1Complete : step === 2 ? isStep2Complete : isStep3Complete;
                            return (
                                <div 
                                    key={step}
                                    className={`w-10 h-1.5 rounded-full transition-all duration-500 ${
                                        isComplete ? 'bg-[#10B981]' : step === 1 ? 'bg-[#1A56DB]' : 'bg-[#E5E7EB]'
                                    }`}
                                />
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-10">
                    {/* STEP 1: EXAM & SCORE */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-6 h-6 rounded-full bg-[#1A56DB]/10 text-[#1A56DB] flex items-center justify-center text-[11px] font-bold">1</span>
                            <h3 className="text-[14px] font-bold text-[#374151] font-outfit">Select Exam & Enter Score</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[12px] font-bold text-[#6B7280] font-outfit">EXAM NAME</label>
                                <select 
                                    value={selectedExamId || ''} 
                                    onChange={(e) => setSelectedExamId(e.target.value)}
                                    className="w-full h-11 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[13px] font-medium font-outfit focus:ring-2 focus:ring-[#1A56DB]/20 focus:border-[#1A56DB] transition-all outline-none"
                                >
                                    {[...feedbackData.pendingFeedback, ...feedbackData.examHistory].map(ex => (
                                        <option key={ex.id} value={ex.id}>{ex.sub} — {ex.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <label className="text-[12px] font-bold text-[#6B7280] font-outfit">SCORE</label>
                                    <input 
                                        type="number" 
                                        value={score}
                                        onChange={(e) => setScore(e.target.value)}
                                        placeholder="00"
                                        className="w-full h-11 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[13px] font-medium font-outfit focus:ring-2 focus:ring-[#1A56DB]/20 focus:border-[#1A56DB] transition-all outline-none"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[12px] font-bold text-[#6B7280] font-outfit">MAX</label>
                                    <input 
                                        type="number" 
                                        value={maxMarks}
                                        disabled
                                        className="w-full h-11 px-4 bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl text-[13px] font-medium font-outfit text-[#9CA3AF]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* STEP 2: RATINGS */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-6 h-6 rounded-full bg-[#1A56DB]/10 text-[#1A56DB] flex items-center justify-center text-[11px] font-bold">2</span>
                            <h3 className="text-[14px] font-bold text-[#374151] font-outfit">Rate Your Experience</h3>
                        </div>
                        <div className="space-y-1">
                            {feedbackData.categories.map((cat: any) => (
                                <StarInput 
                                    key={cat.id}
                                    label={cat.name}
                                    icon={cat.icon}
                                    color={cat.color}
                                    value={categoryRatings[cat.id] || 0}
                                    onChange={(val: number) => setCategoryRatings((prev: any) => ({ ...prev, [cat.id]: val }))}
                                />
                            ))}
                        </div>
                    </div>

                    {/* STEP 3: DETAILS */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#1A56DB]/10 text-[#1A56DB] flex items-center justify-center text-[11px] font-bold">3</span>
                            <h3 className="text-[14px] font-bold text-[#374151] font-outfit">Add Details & Observations</h3>
                        </div>
                        
                        <div className="space-y-3">
                            <label className="text-[12px] font-bold text-[#6B7280] font-outfit">SPECIFIC ISSUES EXPERIENCED</label>
                            <div className="flex flex-wrap gap-2">
                                {issues.map(issue => (
                                    <button
                                        key={issue}
                                        onClick={() => toggleIssue(issue)}
                                        className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${
                                            selectedIssues.includes(issue)
                                                ? 'bg-[#1A56DB] text-white'
                                                : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
                                        }`}
                                    >
                                        {issue}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[12px] font-bold text-[#6B7280] font-outfit uppercase">Detailed Feedback</label>
                            <textarea 
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Describe your experience in detail..."
                                className="w-full h-32 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl text-[13px] font-outfit resize-none focus:ring-2 focus:ring-[#1A56DB]/20 focus:border-[#1A56DB] transition-all outline-none"
                            />
                        </div>

                        <div className="space-y-4 pt-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[12px] font-bold text-[#6B7280] font-outfit uppercase">Preparation Self-Assessment</label>
                                <span className="text-[13px] font-bold text-[#1A56DB] font-mono">{preparationLevel}/10</span>
                            </div>
                            <input 
                                type="range" 
                                min="1" 
                                max="10" 
                                value={preparationLevel}
                                onChange={(e) => setPreparationLevel(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-[#E5E7EB] rounded-full appearance-none cursor-pointer accent-[#1A56DB]"
                            />
                            <div className="flex justify-between text-[10px] text-[#9CA3AF] font-bold uppercase tracking-wider">
                                <span>Not Prepared</span>
                                <span>Fully Prepared</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex items-center justify-between pt-8 border-t border-[#F3F4F6]">
                    <div className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${isStep1Complete && isStep2Complete && isStep3Complete ? 'bg-[#10B981]' : 'bg-[#EF4444]'}`} />
                        <span className="text-[12px] font-medium text-[#6B7280]">
                            {isStep1Complete && isStep2Complete && isStep3Complete 
                                ? 'Form complete and ready to submit' 
                                : 'Please complete all required steps'}
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <button className="h-11 px-5 rounded-xl border border-[#E5E7EB] text-[13px] font-bold text-[#374151] hover:bg-[#F9FAFB] transition-colors flex items-center gap-2">
                            <Save size={16} /> Save Draft
                        </button>
                        <button 
                            onClick={onSubmit}
                            disabled={isSubmitting || !(isStep1Complete && isStep2Complete && isStep3Complete)}
                            className="h-11 px-8 bg-[#1A56DB] text-white rounded-xl text-[13px] font-bold hover:bg-[#1648C0] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95"
                        >
                            {isSubmitting ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : <Send size={16} />}
                            Submit Feedback
                        </button>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: LIVE PREVIEW & SMART REMARKS */}
            <div className="w-full xl:w-[450px] bg-[#F9FAFB] p-8 flex flex-col">
                <div className="mb-8">
                    <h3 className="text-[14px] font-bold text-[#111827] font-outfit mb-1">Live Remark Generation</h3>
                    <p className="text-[11px] text-[#9CA3AF] font-outfit uppercase tracking-wider font-bold">Powered by ECAP AI</p>
                </div>

                {/* REAL-TIME PREVIEW CARD */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5E7EB] mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[#1A56DB] flex items-center justify-center text-white text-[18px] font-bold font-fraunces italic">
                            {selectedExam?.sub || '??'}
                        </div>
                        <div>
                            <h4 className="text-[14px] font-bold text-[#111827]">{selectedExam?.name || 'Select Exam'}</h4>
                            <p className="text-[11px] text-[#6B7280]">Real-time feedback analysis</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-[11px] mb-1.5">
                                <span className="font-bold text-[#6B7280]">AVERAGE RATING</span>
                                <span className="font-mono font-bold text-[#F59E0B]">{averageRating.toFixed(2)} / 5.0</span>
                            </div>
                            <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(averageRating / 5) * 100}%` }}
                                    className="h-full bg-[#F59E0B]"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-[11px] mb-1.5">
                                <span className="font-bold text-[#6B7280]">ESTIMATED PERFORMANCE</span>
                                <span className="font-mono font-bold text-[#10B981]">{((parseInt(score) / parseInt(maxMarks)) * 100 || 0).toFixed(1)}%</span>
                            </div>
                            <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(parseInt(score) / parseInt(maxMarks)) * 100 || 0}%` }}
                                    className="h-full bg-[#10B981]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI REMARKS DYNAMIC */}
                <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Brain size={16} className="text-[#7C3AED]" />
                        <span className="text-[12px] font-bold text-[#7C3AED] uppercase tracking-wider">Strategic Recommendations</span>
                    </div>

                    <div className="space-y-4 relative">
                        <AnimatePresence mode="wait">
                            {!(isStep1Complete && isStep2Complete) ? (
                                <motion.div 
                                    key="shimmer"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-4"
                                >
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-20 bg-white/50 rounded-xl border border-dashed border-[#E5E7EB] flex items-center justify-center">
                                            <div className="w-1/2 h-2 bg-[#E5E7EB] rounded-full overflow-hidden relative">
                                                <motion.div 
                                                    animate={{ x: ["-100%", "100%"] }}
                                                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="remarks"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-4"
                                >
                                    <div className="p-4 bg-white rounded-xl border border-[#E5E7EB] shadow-sm">
                                        <div className="flex gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                                                <AlertTriangle size={16} />
                                            </div>
                                            <div>
                                                <h5 className="text-[13px] font-bold text-[#111827]">Timing Bottleneck</h5>
                                                <p className="text-[12px] text-[#6B7280] mt-0.5 leading-relaxed">
                                                    Your low rating for 'Exam Timing' ({categoryRatings.cat2}) combined with your Score ({score}) suggests technical proficiency is hindered by time management. Practice under timed constraints.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-[#10B981]/5 rounded-xl border border-[#10B981]/20 shadow-sm border-l-4 border-l-[#10B981]">
                                        <div className="flex gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-green-50 text-[#10B981] flex items-center justify-center shrink-0">
                                                <Lightbulb size={16} />
                                            </div>
                                            <div>
                                                <h5 className="text-[13px] font-bold text-[#065F46]">Preparation Correlation</h5>
                                                <p className="text-[12px] text-[#065F46] mt-0.5 leading-relaxed">
                                                    A self-assessment of {preparationLevel}/10 correlates with your current scores. Moving this to 8/10 could yield a potential 15% score increase.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-blue-50/50 rounded-xl border border-[#E5E7EB] italic text-[#6B7280] text-[12px] leading-relaxed">
                                        "The environment issues you noted ({selectedIssues.join(', ')}) will be flagged for faculty review."
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
                    <Info size={16} className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-[#92400E] leading-relaxed">
                        <b>Draft saved locally.</b> You can leave this page and return later to finish your submission. Unsaved changes are persisted in your browser.
                    </p>
                </div>
            </div>
        </section>
    );
};


// ═══════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════

const CategoryCard = ({ icon: Icon, name, rating, status, impact, color, desc, onGiveFeedback }: any) => (
    <div 
        onClick={onGiveFeedback}
        className="bg-white border border-[#E5E7EB] rounded-2xl p-5 hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-1"
    >
        <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center`} style={{ backgroundColor: `${color}15`, color }}>
                <Icon size={20} />
            </div>
            <h4 className="text-[15px] font-bold text-[#111827] group-hover:text-[#1A56DB] transition-colors">{name}</h4>
        </div>
        <div className="flex items-baseline gap-2 mb-1">
            <span className="text-[28px] font-mono font-bold text-[#111827]">{rating}</span>
            <StarRating rating={rating} />
        </div>
        <div className="mb-4"><Badge color={rating < 3.0 ? 'red' : rating >= 4.0 ? 'green' : 'amber'}>{status}</Badge></div>
        <p className="text-[10px] text-[#9CA3AF] font-outfit mb-1 uppercase tracking-widest font-bold">IMPACT ON YOU</p>
        <p className="text-[12px] font-bold" style={{ color: rating < 3.0 ? '#EF4444' : rating >= 4.0 ? '#10B981' : '#F59E0B' }}>{impact}</p>
        <p className="mt-3 text-[11px] text-[#6B7280] font-outfit leading-tight">{desc}</p>
    </div>
);

const StatCard = ({ label, value, sub, icon: Icon, color, trend, trendColor, stars }: any) => (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all" style={{ borderLeft: `3px solid ${color}` }}>
        <div className="w-10 h-10 mb-4 rounded-xl flex items-center justify-center bg-[#F9FAFB]">
            <Icon size={20} style={{ color }} />
        </div>
        <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider font-outfit">{label}</p>
        <div className="flex items-center gap-2 mt-1">
            <span className="text-[32px] font-mono font-bold text-[#111827]">{value}</span>
            {stars && <StarRating rating={stars} size={16} />}
        </div>
        <p className="text-[12px] text-[#6B7280] font-outfit mt-1">{sub}</p>
        <div className="mt-4">
            <Badge color={trendColor}>{trend}</Badge>
        </div>
    </div>
);

const FeedbackItem = ({ ex, expanded, onToggle }: any) => (
    <div className="group">
        <div onClick={onToggle} className="p-5 flex items-center justify-between cursor-pointer hover:bg-[#F9FAFB] transition-colors">
            <div className="flex items-center gap-4">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <Badge color="blue">{ex.sub}</Badge>
                        <span className="text-[14px] font-bold text-[#111827] font-outfit">{ex.type} {ex.name}</span>
                    </div>
                    <span className="text-[12px] text-[#9CA3AF] mt-1 font-mono">{ex.date}</span>
                </div>
                <div className="ml-10 hidden sm:flex items-center gap-2">
                    <StarRating rating={ex.rating} size={12} />
                    <span className="text-[13px] font-mono font-bold text-[#F59E0B]">{ex.rating}</span>
                </div>
            </div>
            <ChevronDown size={18} className={`text-[#9CA3AF] transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
        </div>
        <AnimatePresence>
            {expanded && (
                <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-[#F9FAFB]"
                >
                    <div className="p-6 pt-2 space-y-5">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {['Difficulty', 'Timing', 'Environment', 'Faculty', 'Conduct', 'Invigilator'].map(c => (
                                <div key={c}>
                                    <p className="text-[10px] text-[#9CA3AF] uppercase font-bold">{c}</p>
                                    <p className="text-[12px] font-mono font-bold text-[#374151]">★ {c === 'Timing' ? 2.5 : c === 'Environment' ? 2.5 : 3.8}</p>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Your feedback:</p>
                                <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] text-[13px] text-[#374151] font-outfit leading-relaxed shadow-sm">
                                    "{ex.comment}"
                                </div>
                            </div>
                            {ex.issues.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {ex.issues.map((iss: string) => (
                                        <span key={iss} className="px-3 py-1 bg-red-50 text-red-700 text-[10px] font-bold rounded-lg border border-red-100 uppercase tracking-tight">
                                           ⚠️ {iss}
                                        </span>
                                    ))}
                                </div>
                            )}
                            {ex.facultyReply && (
                                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-xl">
                                    <p className="text-[13px] text-emerald-800 font-outfit italic">"{ex.facultyReply}"</p>
                                </div>
                            )}
                            <div className="bg-blue-50/50 border-l-4 border-[#1A56DB] p-4 rounded-r-xl flex items-center justify-between">
                                <p className="text-[12px] text-[#1A56DB] font-medium font-outfit">System analyzed {ex.sub} score correlation: <span className="font-mono font-bold">14/20</span> indicates timing impacted final results.</p>
                                <button className="text-[11px] font-bold text-[#1A56DB] hover:underline">Edit Feedback</button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const SmartRemarks = () => (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm sticky top-24 overflow-hidden">
        <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center bg-indigo-50/10">
            <div className="flex items-center gap-2">
                <Brain size={16} className="text-indigo-600" />
                <h2 className="text-[14px] font-bold text-[#111827] font-outfit">Smart exam remarks</h2>
            </div>
            <span className="text-[10px] text-[#9CA3AF] italic">Auto-generated from your feedback + marks</span>
        </div>
        <div className="p-0 divide-y divide-[#F3F4F6]">
            <RemarkBlock 
                label="Overall Insight" color="blue" 
                txt="Exam difficulty is manageable. However, exam timing and environment are consistently rated below acceptable levels, directly impacting your potential." 
            />
            <div className="p-5 space-y-3">
                <p className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-widest mb-3">Category-wise Analysis</p>
                <MiniRemark icon={Clock} rating={2.9} color="red" txt="Insufficient time is affecting paper completion rates." />
                <MiniRemark icon={Building2} rating={2.7} color="red" txt="Environment conditions are affecting your level of focus." />
                <MiniRemark icon={GraduationCap} rating={4.2} color="green" txt="Strong conceptual support from faculty guidance." />
            </div>
            <RemarkBlock 
                label="Priority Focus" color="red" 
                txt="Improve time management strategies. Practice completing papers within strict limits. Arrive early to secure a comfortable seat." 
            />
            <RemarkBlock 
                label="Performance Link" color="violet" 
                txt="Low timing rating (2.9) correlates with a 12% score gap. Addressing this is projected to increase results by 8–15%." 
            />
            <div className="p-4 flex justify-center">
                <button className="text-[12px] font-bold text-indigo-600 hover:underline flex items-center gap-2 uppercase tracking-widest"><Copy size={14} /> Copy all remarks</button>
            </div>
        </div>
    </div>
);

const RemarkBlock = ({ label, txt, color }: any) => {
    const styles: any = {
        blue: 'bg-blue-50/50 border-[#1A56DB] text-[#374151]',
        red: 'bg-red-50/50 border-red-500 text-red-900',
        violet: 'bg-indigo-50 border-indigo-600 text-indigo-900'
    };
    return (
        <div className={`p-5 border-l-4 ${styles[color]}`}>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">{label}</p>
            <p className="text-[13px] font-outfit leading-relaxed">{txt}</p>
        </div>
    );
};

const MiniRemark = ({ icon: Icon, rating, color, txt }: any) => (
    <div className="flex gap-3 items-start group">
        <Icon size={14} className={`mt-1 ${color === 'red' ? 'text-red-500' : 'text-emerald-500'}`} />
        <div>
            <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold text-[#111827]">★ {rating}</span>
                <div className={`w-1.5 h-1.5 rounded-full ${color === 'red' ? 'bg-red-500' : 'bg-emerald-500'}`} />
            </div>
            <p className="text-[12px] text-[#6B7280] leading-tight mt-0.5">{txt}</p>
        </div>
    </div>
);

const CorrelationPanel = ({ title, delta, score1, score2, color, label1, label2, insight }: any) => (
    <div className={`bg-white border rounded-2xl p-5 border-l-4 ${color === 'red' ? 'border-red-500' : color === 'amber' ? 'border-amber-400' : 'border-emerald-500'}`}>
        <h4 className="text-[13px] font-bold text-[#111827] font-outfit mb-4">{title}</h4>
        <div className="space-y-4">
            <div className="flex justify-between items-center text-[12px]">
                <span className="text-[#6B7280]">{label1}</span>
                <span className="font-mono font-bold text-emerald-600">{score1}</span>
            </div>
            <div className="flex justify-between items-center text-[12px]">
                <span className="text-[#6B7280]">{label2}</span>
                <span className="font-mono font-bold text-red-600">{score2}</span>
            </div>
            <div className={`py-1.5 px-3 rounded-lg text-center text-[12px] font-bold ${color === 'red' ? 'bg-red-50 text-red-700' : color === 'amber' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
                → {delta}
            </div>
            <p className="text-[11px] text-[#9CA3AF] italic leading-tight">{insight}</p>
        </div>
    </div>
);

const IntelligenceStrip = () => (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-[#F59E0B]" />
                <h3 className="text-[14px] font-bold text-[#111827] font-outfit">Exam intelligence</h3>
                <span className="bg-blue-100 text-[#1A56DB] text-[9px] font-bold px-1.5 py-0.5 rounded">NEW</span>
            </div>
            <span className="text-[10px] text-[#9CA3AF] italic">Personalized data-driven insights</span>
        </div>
        <div className="p-6 overflow-x-auto flex gap-5 pb-8 custom-scrollbar">
            <InsightStripCard color="red" icon={Timer} title="Time Management Priority" body="You rated timing below 3.0 in 4 of 6 exams. Practice timed papers for CS603." />
            <InsightStripCard color="amber" icon={Building2} title="Adapt to environment" body="Environment below 2.8/5. Arrive 20 mins early to secure center seating." />
            <InsightStripCard color="green" icon={GraduationCap} title="Maximize Guidance" body="Faculty support rated 4.2/5. Guidance has 14% proven positive mark impact." />
            <InsightStripCard color="blue" icon={History} title="Semester Trend" body="Environment score dropped 0.5 (3.2 → 2.7). Aligns with Hall shift." />
            <InsightStripCard color="violet" icon={Users} title="Peer Benchmark" body="Your rating (3.35) is class median. Timing sensitivity is 73% higher than peers." />
        </div>
    </div>
);

const InsightStripCard = ({ color, icon: Icon, title, body }: any) => {
    const styles: any = {
        red: 'border-red-500 bg-red-50/10', amber: 'border-amber-400 bg-amber-50/10', 
        green: 'border-emerald-500 bg-emerald-50/10', blue: 'border-blue-500 bg-blue-50/10', 
        violet: 'border-indigo-600 bg-indigo-50/10'
    };
    return (
        <div className={`min-w-[280px] p-5 rounded-2xl border-l-4 border shadow-xs hover:shadow-lg transition-all ${styles[color]}`}>
            <Icon size={20} className="mb-4" />
            <h5 className="text-[14px] font-bold text-[#111827] mb-2">{title}</h5>
            <p className="text-[12px] text-[#6B7280] leading-relaxed flex-1">{body}</p>
            <button className="mt-4 text-[12px] font-bold hover:underline text-indigo-600">View Details →</button>
        </div>
    );
};

const GiveFeedbackModal = ({ isOpen, onClose }: any) => (
    <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-[90vh]">
                    <div className="px-8 py-6 border-b border-[#F3F4F6] flex justify-between items-center">
                        <div>
                            <h2 className="text-[20px] font-bold font-outfit text-[#111827]">Give Exam Feedback</h2>
                            <p className="text-[12px] text-[#6B7280]">Your feedback is anonymous and helps improve exam quality</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-all"><X size={20} className="text-[#9CA3AF]" /></button>
                    </div>
                    <div className="p-8 space-y-8 overflow-y-auto">
                        <FormGroup label="Which exam are you rating?" required>
                            <select className="w-full h-11 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[13px] font-bold font-outfit outline-none">
                                <option>CS603 · Internal Assessment 2 · 24 Mar 2026</option>
                                <option>CS601 · Weekly Test 8 · 21 Mar 2026</option>
                            </select>
                        </FormGroup>
                        <div className="space-y-6">
                            {[
                                { name: "Paper Difficulty", hint: "1 = Too easy / unclear · 5 = Balanced" },
                                { name: "Exam Timing", hint: "1 = Insufficient · 5 = Adequate" },
                                { name: "Faculty Explanation", hint: "1 = No support · 5 = Excellent" },
                                { name: "Exam Conduction", hint: "1 = Disorganized · 5 = Smooth" },
                                { name: "Invigilator Behavior", hint: "1 = Intrusive · 5 = Supportive" },
                                { name: "Exam Environment", hint: "1 = Uncomfortable · 5 = Ideal" }
                            ].map((c) => (
                                <div key={c.name} className="flex justify-between items-center group">
                                    <div>
                                        <p className="text-[13px] font-bold text-[#111827]">{c.name}</p>
                                        <p className="text-[10px] text-[#9CA3AF] italic">{c.hint}</p>
                                    </div>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <button key={s} className="p-1 hover:scale-125 transition-transform"><Star size={24} className={s <= 4 ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-[#E5E7EB]'} /></button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <FormGroup label="Any specific issues (optional)">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                                {["Paper too lengthy", "Insufficient time", "Poor ventilation", "Noisy environment", "Late start", "Answer sheets inadequate"].map(iss => (
                                    <button key={iss} className="px-3 py-2 border border-[#E5E7EB] rounded-xl text-[11px] font-medium text-[#6B7280] hover:border-[#1A56DB] hover:text-[#1A56DB] transition-all text-left">
                                        {iss}
                                    </button>
                                ))}
                            </div>
                        </FormGroup>
                        <FormGroup label="Additional comments (optional)">
                            <textarea placeholder="Describe your experience..." className="w-full h-24 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[13px] outline-none" />
                        </FormGroup>
                    </div>
                    <div className="p-8 border-t border-[#F3F4F6] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-[13px] font-bold text-[#111827]">Overall Preview:</span>
                            <StarRating rating={3.6} size={18} />
                            <span className="text-[14px] font-mono font-bold text-[#F59E0B]">3.6</span>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={onClose} className="px-6 py-2.5 text-[13px] font-bold text-[#6B7280] hover:bg-[#F9FAFB] rounded-xl">Cancel</button>
                            <button className="px-8 py-2.5 bg-[#1A56DB] text-white rounded-xl text-[13px] font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all">Submit Feedback</button>
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
    </AnimatePresence>
);

const FormGroup = ({ label, required, children }: any) => (
    <div className="space-y-2">
        <label className="text-[11px] font-black text-[#9CA3AF] uppercase tracking-widest pl-1">{label} {required && <span className="text-red-500">*</span>}</label>
        {children}
    </div>
);

const ExamFeedback = () => {
    const [feedbackData, setFeedbackData] = useState(INITIAL_FEEDBACK_DATA);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expandedExam, setExpandedExam] = useState<string | null>(null);

    // DRAFT / FORM STATE
    const [selectedExamId, setSelectedExamId] = useState<string | null>("ex5"); // Pre-loaded as ex5 Internal Assessment 2 demo
    const [score, setScore] = useState<string>("14");
    const [maxMarks, setMaxMarks] = useState<string>("20");
    const [categoryRatings, setCategoryRatings] = useState<Record<string, number>>({ cat1: 3.5, cat2: 2.0 });
    const [selectedIssues, setSelectedIssues] = useState<string[]>(["Insufficient time", "Noisy environment"]);
    const [comment, setComment] = useState<string>("The exam hall was very noisy and the time allotted was not enough to complete all questions.");
    const [preparationLevel, setPreparationLevel] = useState<number>(6);
    
    // UI STATES
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const selectedExam = useMemo(() => {
        const fullHistory = [...feedbackData.examHistory, ...feedbackData.pendingFeedback];
        return fullHistory.find(e => e.id === selectedExamId);
    }, [selectedExamId, feedbackData]);

    const averageRating = useMemo(() => {
        const ratedValues = Object.values(categoryRatings);
        if (ratedValues.length === 0) return 0;
        return ratedValues.reduce((a, b) => a + b, 0) / ratedValues.length;
    }, [categoryRatings]);

    // Handle initial draft load / sync with categories
    useEffect(() => {
        if (averageRating > 0) {
            setFeedbackData(prev => ({
                ...prev,
                categories: prev.categories.map(cat => ({
                    ...cat,
                    rating: categoryRatings[cat.id] || cat.rating
                }))
            }));
        }
    }, [categoryRatings, averageRating]);

    const stats = useMemo(() => {
        const sorted = [...feedbackData.categories].sort((a, b) => a.rating - b.rating);
        return {
            overall: feedbackData.categories.reduce((a, b) => a + b.rating, 0) / feedbackData.categories.length,
            lowest: sorted[0],
            highest: sorted[sorted.length - 1],
            completed: 6 // Mocking
        };
    }, [feedbackData.categories]);


    return (
        <StudentLayout activePage="exam-feedback" onNavigate={() => {}}>
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="max-w-[1400px] mx-auto px-7 pb-20 space-y-6"
            >
                {/* PAGE HEADER */}
                <header className="flex justify-between items-end pb-5 border-b border-[#F3F4F6]">
                    <div>
                        <h1 className="text-[24px] font-fraunces font-light italic text-[#111827]">Exam Experience & Feedback</h1>
                        <p className="mt-1 text-[13px] font-outfit text-[#6B7280]">Rate your exam experience · Connect feedback to performance · Semester 6</p>
                        <p className="mt-1 text-[11px] font-outfit text-[#9CA3AF]">Your feedback helps identify systemic issues and improve your preparation strategy</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="h-10 px-4 bg-white border border-[#E5E7EB] rounded-lg text-[13px] font-medium font-outfit text-[#374151] flex items-center gap-2 hover:bg-[#F9FAFB] active:scale-95 transition-all">
                            <Download size={16} /> Export Report
                        </button>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="h-10 px-5 bg-[#1A56DB] rounded-lg text-[13px] font-medium font-outfit text-white flex items-center gap-2 hover:bg-[#1648C0] active:scale-95 transition-all shadow-md shadow-blue-500/20"
                        >
                            <Star size={16} /> Give Feedback
                        </button>
                    </div>
                </header>

                {/* SECTION A: QUICK FEEDBACK PANEL */}
                <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center bg-[#F9FAFB]/50">
                        <div className="flex items-center gap-2">
                            <Star size={16} className="text-[#F59E0B]" />
                            <h3 className="text-[14px] font-bold text-[#111827] font-outfit">Exam experience categories</h3>
                        </div>
                        <span className="text-[11px] font-outfit text-[#9CA3AF] italic">Tap a category to give feedback</span>
                    </div>
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {feedbackData.categories.map((cat) => (
                            <CategoryCard key={cat.id} {...cat} onGiveFeedback={() => setIsModalOpen(true)} />
                        ))}
                    </div>
                </div>

                {/* SECTION B: STAT CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <StatCard 
                        label="OVERALL RATING" 
                        value={stats.overall.toFixed(2)} 
                        sub="Across 6 categories · Semester 6" 
                        icon={Star} 
                        color="#F59E0B" 
                        trend="↑ +0.3 vs Sem 5" 
                        trendColor="green" 
                        stars={stats.overall} 
                        hasUpdateDot={averageRating > 0}
                    />
                    <StatCard 
                        label="LOWEST RATED" 
                        value={stats.lowest.rating.toFixed(1)} 
                        sub={`${stats.lowest.name} · Concern`} 
                        icon={TrendingDown} 
                        color="#EF4444" 
                        trend="Needs improvement" 
                        trendColor="red" 
                    />
                    <StatCard 
                        label="HIGHEST RATED" 
                        value={stats.highest.rating.toFixed(1)} 
                        sub={`${stats.highest.name} · Strength`} 
                        icon={TrendingUp} 
                        color="#10B981" 
                        trend="Good" 
                        trendColor="green" 
                    />
                    <StatCard 
                        label="FEEDBACK GIVEN" 
                        value={`${stats.completed}/${feedbackData.examHistory.length + feedbackData.pendingFeedback.length}`} 
                        sub="2 exams pending feedback" 
                        icon={CheckSquare} 
                        color="#1A56DB" 
                        trend="2 pending" 
                        trendColor="amber" 
                    />
                </div>

                {/* SECTION B2: DIRECT FEEDBACK INPUT */}
                <DirectFeedbackForm 
                    feedbackData={feedbackData}
                    selectedExam={selectedExam}
                    selectedExamId={selectedExamId}
                    setSelectedExamId={setSelectedExamId}
                    score={score}
                    setScore={setScore}
                    maxMarks={maxMarks}
                    setMaxMarks={setMaxMarks}
                    categoryRatings={categoryRatings}
                    setCategoryRatings={setCategoryRatings}
                    selectedIssues={selectedIssues}
                    setSelectedIssues={setSelectedIssues}
                    comment={comment}
                    setComment={setComment}
                    preparationLevel={preparationLevel}
                    setPreparationLevel={setPreparationLevel}
                    isSubmitting={isSubmitting}
                    averageRating={averageRating}
                    onSubmit={() => {
                        setIsSubmitting(true);
                        setTimeout(() => {
                            setIsSubmitting(false);
                            setShowSuccess(true);
                        }, 2000);
                    }}
                />


                {/* SECTION C: EXAM EXPERIENCE RATING SUMMARY */}
                <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center bg-[#F9FAFB]/50">
                        <div className="flex items-center gap-2">
                            <BarChart3 size={16} className="text-[#6B7280]" />
                            <h3 className="text-[14px] font-bold text-[#111827] font-outfit">Experience rating summary</h3>
                        </div>
                        <select className="h-9 px-3 bg-white border border-[#E5E7EB] rounded-lg text-[12px] font-medium outline-none">
                            <option>Semester 6</option>
                            <option>Semester 5</option>
                        </select>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#F9FAFB] text-[10px] font-bold text-[#9CA3AF] uppercase border-b border-[#F3F4F6]">
                                <tr>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4 text-right">Rating</th>
                                    <th className="px-6 py-4">Visual</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Impact</th>
                                    <th className="px-6 py-4 text-right">vs Last Sem</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F3F4F6]">
                                {feedbackData.categories.map((cat) => (
                                    <tr key={cat.id} className={`hover:bg-[#F9FAFB] transition-colors cursor-pointer ${cat.rating < 3.0 ? 'bg-red-50/10' : ''}`}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <cat.icon size={16} className="text-[#6B7280]" style={{ color: cat.color }} />
                                                <span className="text-[13px] font-medium text-[#111827]">{cat.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right font-mono font-bold text-[#111827]">{cat.rating}</td>
                                        <td className="px-6 py-4">
                                            <div className="w-32 h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full rounded-full transition-all duration-700" 
                                                    style={{ width: `${(cat.rating / 5) * 100}%`, backgroundColor: cat.color }}
                                                />
                                            </div>
                                            <p className="text-[9px] font-mono text-[#9CA3AF] mt-1">out of 5.0</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge color={cat.status === 'Good' ? 'green' : cat.status === 'Moderate' ? 'amber' : 'red'}>{cat.status}</Badge>
                                        </td>
                                        <td className="px-6 py-4 text-[12px]" style={{ color: cat.rating < 3.0 ? '#EF4444' : cat.rating >= 4.0 ? '#10B981' : '#F59E0B' }}>
                                            {cat.impact}
                                        </td>
                                        <td className="px-6 py-4 text-right text-[12px] font-bold" style={{ color: cat.trend.startsWith('+') ? '#10B981' : '#EF4444' }}>
                                            {cat.trend.startsWith('+') ? '↑' : '↓'} {cat.trend}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="bg-[#F9FAFB] font-bold">
                                    <td className="px-6 py-4 text-[13px]">Overall average</td>
                                    <td className="px-6 py-4 text-right font-mono text-[#F59E0B]">{feedbackData.overallRating}</td>
                                    <td className="px-6 py-4">
                                        <div className="w-32 h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                                            <div className="h-full bg-[#F59E0B] w-[67%]" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4"><Badge color="amber">Moderate</Badge></td>
                                    <td className="px-6 py-4 font-outfit text-[#6B7280] text-[12px]" colSpan={2}>
                                        Exam conditions moderately affecting performance
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="p-4 bg-red-50/50 border-t border-red-100 flex items-center gap-3 mx-6 mb-6 rounded-xl mt-4">
                        <AlertTriangle size={18} className="text-red-500" />
                        <p className="text-[12px] text-red-900 font-medium">
                            <span className="font-bold">Priority focus:</span> Exam Timing (2.9) and Exam Environment (2.7) are your lowest-rated categories. Address these in your strategy.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
                    {/* LEFT COLUMN: DETAILED FEEDBACK */}
                    <div className="lg:col-span-6 space-y-4">
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
                            <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center bg-[#F9FAFB]/50">
                                <div className="flex items-center gap-2">
                                    <MessageSquare size={16} className="text-[#6B7280]" />
                                    <h2 className="text-[14px] font-bold text-[#111827] font-outfit">Detailed feedback by exam</h2>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 border border-[#E5E7EB] bg-white rounded-lg hover:bg-[#F9FAFB]"><Search size={14} /></button>
                                    <button className="p-2 border border-[#E5E7EB] bg-white rounded-lg hover:bg-[#F9FAFB]"><Filter size={14} /></button>
                                </div>
                            </div>
                            <div className="divide-y divide-[#F3F4F6]">
                                {feedbackData.examHistory.map((ex) => (
                                    <FeedbackItem key={ex.id} ex={ex} expanded={expandedExam === ex.id} onToggle={() => setExpandedExam(expandedExam === ex.id ? null : ex.id)} />
                                ))}
                                {feedbackData.pendingFeedback.map((ex) => (
                                    <div key={ex.id} className="p-5 bg-amber-50/30 border-l-2 border-amber-400 flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <Badge color="blue">{ex.sub}</Badge>
                                            <span className="text-[13px] font-medium text-[#111827]">{ex.type} {ex.name}</span>
                                            <span className="text-[11px] text-[#9CA3AF]">{ex.date}</span>
                                        </div>
                                        <button onClick={() => setIsModalOpen(true)} className="text-[12px] font-bold text-[#1A56DB] hover:underline">Give feedback →</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: SMART REMARK SYSTEM */}
                    <div className="lg:col-span-4 space-y-6">
                        <SmartRemarks />
                    </div>
                </div>

                {/* SECTION E: PERFORMANCE CORRELATION */}
                <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <BarChart3 size={18} className="text-[#7C3AED]" />
                            <h2 className="text-[15px] font-bold text-[#111827] font-outfit">Performance correlation analysis</h2>
                        </div>
                        <span className="text-[11px] text-[#9CA3AF] italic">Connecting exam experience to actual scores</span>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <CorrelationPanel title="Exam Timing vs Score" delta="12% score diff" score1="74%" score2="62%" color="red" label1="Exams rated ≥ 3.5" label2="Exams rated < 3.0" insight="Lower satisfaction correlates with 12% lower scores." />
                        <CorrelationPanel title="Environment vs Focus" delta="17% completion gap" score1="88%" score2="71%" color="amber" label1="Comfortable (≥ 3.5)" label2="Uncomfortable (< 3.0)" insight="Poor environment reduces paper completion by 17%." />
                        <CorrelationPanel title="Faculty vs Performance" delta="14% advantage" score1="81%" score2="67%" color="green" label1="High rating (≥ 4.0)" label2="Lower rating (< 3.5)" insight="Strong faculty support shows 14% better outcome." />
                    </div>
                    <div className="px-6 pb-6 pt-2">
                        <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl flex items-center gap-3">
                            <Lightbulb size={20} className="text-indigo-600" />
                            <p className="text-[12px] text-indigo-900 leading-relaxed font-outfit">
                                <span className="font-bold">Data insight:</span> Improving your exam timing and environment satisfaction is projected to increase your overall results by <span className="font-mono font-bold">10–15%</span>. Address these personal constraints before End-Semester exams.
                            </p>
                        </div>
                    </div>
                </div>

                {/* SECTION F: EXAM INTELLIGENCE STRIP */}
                <IntelligenceStrip />

                {/* MODAL */}
                <GiveFeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            </motion.div>
        </StudentLayout>
    );
};


export default ExamFeedback;
