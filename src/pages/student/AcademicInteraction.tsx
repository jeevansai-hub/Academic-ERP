import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, MessageSquare, AlertTriangle, Sparkles, 
  Search, Filter, Plus, ChevronRight, FileText, 
  BarChart2, Trash2, Send, Paperclip, MoreVertical, 
  CheckCircle, Clock, Calendar, User, Eye, History,
  Brain, AlertCircle, Zap, BookOpen, TrendingUp, X,
  ThumbsUp, ThumbsDown, Flag, Printer, Copy, Terminal
} from 'lucide-react';
import StudentLayout from '../../components/layout/StudentLayout';

// ═══════════════════════════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════════════════════════

const INTERACTION_DATA = {
    doubts: [
        { id: "DBT-0023", sub: "CS603", topic: "3NF Normalization", text: "What is 3NF? How is it different from 2NF? Need an example with functional dependencies.", status: "Answered", askedAt: "2026-03-20T10:00:00", to: "Dr. Ramesh Kumar", thread: [
            { sender: "Student", text: "What is 3NF? How is it different from 2NF? Need an example with functional dependencies.", time: "2026-03-20T10:00:00" },
            { sender: "Faculty", text: "Focus on the concept of transitive dependency. In 3NF, no non-prime attribute should be transitively dependent on the candidate key. For example, if A->B and B->C, then A->C is a transitive dependency.", time: "2026-03-20T15:22:00", name: "Dr. Ramesh Kumar", initials: "RK", rating: { up: 4, down: 0 } }
        ]},
        { id: "DBT-0024", sub: "CS602", topic: "Scheduling", text: "Difference between preemptive and non-preemptive scheduling?", status: "Pending", askedAt: "2026-03-17T11:00:00", to: "Prof. Sarah Jenkins", thread: [
            { sender: "Student", text: "Difference between preemptive and non-preemptive scheduling?", time: "2026-03-17T11:00:00" }
        ]},
        { id: "DBT-0022", sub: "EC601", topic: "Lab procedure", text: "Is the simulation for Lab 4 required in the record book?", status: "Closed", askedAt: "2026-03-08T12:00:00", to: "Mr. Vikram Shah", thread: [
            { sender: "Student", text: "Is the simulation for Lab 4 required in the record book?", time: "2026-03-08T12:00:00" },
            { sender: "Faculty", text: "Yes, simulating the circuit and attaching the screenshot is mandatory for the final marks.", time: "2026-03-08T16:00:00", name: "Mr. Vikram Shah", initials: "VS", rating: { up: 2, down: 0 } },
            { sender: "Student", text: "Got it, thank you sir.", time: "2026-03-08T16:30:00" }
        ]}
    ],
    feedback: [
        { id: "FB-001", type: "Faculty", priority: "Critical", sub: "CS603", subName: "DBMS", text: "You are consistently scoring below class average in weekly tests. Immediate revision of indexing and normalization is recommended before IA-2.", faculty: "Dr. Ramesh Kumar", time: "2026-03-20T10:15:00", read: false, action: { label: "View Marks", link: "/student/marks" } },
        { id: "FB-002", type: "System", priority: "Important", sub: "MA601", subName: "Mathematics", text: "Mid-semester marks not uploaded yet. SGPA projection currently suspended for this subject.", time: "2026-03-15T14:00:00", read: true },
        { id: "FB-003", type: "Faculty", priority: "Important", sub: "CS602", subName: "Operating Systems", text: "Lab performance is good, but theory assignment on Deadlocks is still pending. Submit by end of week.", faculty: "Prof. Sarah Jenkins", time: "2026-03-19T14:00:00", read: false, action: { label: "Upload Assignment", link: "/student/dashboard" } }
    ],
    remarks: [
        { id: "RMK-0018", sub: "CS603", priority: "Critical", text: "Consistently scoring below average in theory tests. Requires immediate intervention.", faculty: "Dr. Ramesh Kumar", time: "2026-03-20T10:15:00", status: "Requires action", checklist: ["Revise Unit 1 & 2", "Review lab exercises", "Submit practice assignment"] },
        { id: "RMK-0019", sub: "EC601", priority: "Normal", text: "Lab Assessment 2 was excellent performance. Keep it up.", faculty: "Mr. Vikram Shah", time: "2026-03-19T16:00:00", status: "Informational" },
        { id: "RMK-0020", sub: "CS602", priority: "Important", text: "Assignment on Thread Scheduling is pending. Impact on internals.", faculty: "Prof. Sarah Jenkins", time: "2026-03-20T09:00:00", status: "Requires action" }
    ],
    summaryRemark: {
        text: "Consistent academic engagement throughout Semester 6. Performance in theory subjects is strong. Practical lab scores are improving. CS603 requires immediate attention given the projected backlog risk. Student demonstrates good attitude and responsiveness to feedback.",
        faculty: "Dr. Ramesh Kumar", role: "Class Advisor", date: "2026-03-15"
    }
};

const STAT_CARDS = [
    { label: "TOTAL DOUBTS", value: 8, sub: "5 answered · 2 pending", icon: HelpCircle, color: "#1A56DB", trend: "2 pending", trendColor: "amber" },
    { label: "FACULTY FEEDBACK", value: 12, sub: "3 unread · 9 read", icon: MessageSquare, color: "#10B981", trend: "3 unread", trendColor: "blue" },
    { label: "PERFORMANCE REMARKS", value: 6, sub: "1 critical · 2 important", icon: FileText, color: "#F59E0B", trend: "1 critical", trendColor: "red" },
    { label: "RESPONSE RATE", value: "85%", sub: "Avg response: 18 hours", icon: TrendingUp, color: "#10B981", trend: "↑ +5% vs Sem 5", trendColor: "green" }
];

// ═══════════════════════════════════════════════════════════════
// HELPER COMPONENTS
// ═══════════════════════════════════════════════════════════════

const Badge = ({ children, color, filled, pulse }: any) => {
    const colors: any = {
        blue: filled ? 'bg-[#1A56DB] text-white border-transparent' : 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]',
        amber: filled ? 'bg-[#F59E0B] text-white border-transparent' : 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]',
        red: filled ? 'bg-[#EF4444] text-white border-transparent' : 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]',
        green: filled ? 'bg-[#10B981] text-white border-transparent' : 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]',
        violet: filled ? 'bg-[#7C3AED] text-white border-transparent' : 'bg-[#F5F3FF] text-[#6D28D9] border-[#DDD6FE]',
        gray: 'bg-[#F9FAFB] text-[#6B7280] border-[#E5E7EB]'
    };
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${colors[color] || colors.gray} font-outfit uppercase tracking-wider ${pulse ? 'animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.3)]' : ''}`}>
            {children}
        </span>
    );
};

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

const AcademicInteraction = () => {
    const [activeTab, setActiveTab] = useState('Doubts');
    const [selectedDoubt, setSelectedDoubt] = useState<any>(INTERACTION_DATA.doubts[0]);
    const [isAskModalOpen, setIsAskModalOpen] = useState(false);
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

    return (
        <StudentLayout activePage="interaction" onNavigate={() => {}}>
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="max-w-[1400px] mx-auto px-7 pb-20 space-y-6"
            >
                {/* PAGE HEADER */}
                <header className="flex justify-between items-end pb-5 border-b border-[#F3F4F6]">
                    <div>
                        <h1 className="text-[24px] font-fraunces font-light italic text-[#111827]">Academic Interaction</h1>
                        <p className="mt-1 text-[13px] font-outfit text-[#6B7280]">Doubts, feedback, remarks and guidance · Semester 6</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setIsRequestModalOpen(true)}
                            className="h-10 px-4 bg-white border border-[#E5E7EB] rounded-lg text-[13px] font-medium font-outfit text-[#374151] flex items-center gap-2 hover:bg-[#F9FAFB] transition-all"
                        >
                            <MessageSquare size={16} /> Request Feedback
                        </button>
                        <button 
                            onClick={() => setIsAskModalOpen(true)}
                            className="h-10 px-4 bg-[#1A56DB] rounded-lg text-[13px] font-medium font-outfit text-white flex items-center gap-2 hover:bg-[#1648C0] active:scale-95 transition-all shadow-md shadow-blue-500/20"
                        >
                            <HelpCircle size={16} /> Ask a Doubt
                        </button>
                    </div>
                </header>

                {/* SECTION A: QUICK INTERACTION PANEL */}
                <QuickInteractionPanel />

                {/* SECTION B: STAT CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {STAT_CARDS.map((card, i) => (
                        <StatCard key={i} {...card} />
                    ))}
                </div>

                {/* SECTION C: PRIMARY TAB BAR & CONTENT */}
                <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden min-h-[700px]">
                    <div className="h-12 bg-[#F9FAFB] border-b border-[#F3F4F6] px-6 flex items-center relative">
                        {['Doubts', 'Faculty Feedback', 'Remarks', 'Timeline'].map((tab) => {
                            const count = tab === 'Doubts' ? 8 : tab === 'Faculty Feedback' ? 12 : tab === 'Remarks' ? 6 : null;
                            const isActive = activeTab === tab;
                            return (
                                <button
                                    key={tab} onClick={() => setActiveTab(tab)}
                                    className={`h-12 px-5 text-[13px] font-medium transition-all flex items-center gap-2 relative z-10 
                                        ${isActive ? 'text-[#1A56DB] cursor-default' : 'text-[#9CA3AF] hover:text-[#6B7280]'}`}
                                >
                                    {tab}
                                    {count && <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-[#1A56DB] text-white' : 'bg-[#E5E7EB] text-[#6B7280]'}`}>{count}</span>}
                                    {isActive && (
                                        <motion.div layoutId="activeTab" className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#1A56DB]" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="p-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeTab === 'Doubts' && <DoubtsTab selected={selectedDoubt} onSelect={setSelectedDoubt} />}
                                {activeTab === 'Faculty Feedback' && <FeedbackTab />}
                                {activeTab === 'Remarks' && <RemarksTab />}
                                {activeTab === 'Timeline' && <TimelineTab />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* SECTION D: SYSTEM INTELLIGENCE STRIP */}
                <IntelligenceStrip />

                {/* MODALS */}
                <AskDoubtModal isOpen={isAskModalOpen} onClose={() => setIsAskModalOpen(false)} />
                {isRequestModalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-scale-in">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-[18px] font-bold font-outfit">Request Feedback</h2>
                            <button onClick={() => setIsRequestModalOpen(false)}><X size={20} className="text-[#9CA3AF]" /></button>
                        </div>
                        <p className="text-[14px] text-[#6B7280] font-outfit mb-6 italic">Request detailed guidance from your subject faculty.</p>
                        <button onClick={() => setIsRequestModalOpen(false)} className="w-full py-3 bg-[#1A56DB] text-white rounded-xl font-bold font-outfit uppercase tracking-wider shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all">Submit Request</button>
                    </div>
                </div>}

            </motion.div>
        </StudentLayout>
    );
};

// ═══════════════════════════════════════════════════════════════
// SUB COMPONENTS
// ═══════════════════════════════════════════════════════════════

const QuickInteractionPanel = () => (
    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Sparkles size={20} />
            </div>
            <p className="text-[13px] font-medium text-[#374151] font-outfit max-w-md">
                You have 2 unanswered doubts, 3 unread feedback items, and 1 critical remark requiring your attention.
            </p>
        </div>
        <div className="flex gap-2">
            <SummaryPill icon={HelpCircle} color="amber">2 pending doubts</SummaryPill>
            <SummaryPill icon={MessageSquare} color="blue">3 unread feedback</SummaryPill>
            <SummaryPill icon={AlertTriangle} color="red" pulse>1 critical remark</SummaryPill>
        </div>
    </div>
);

const SummaryPill = ({ icon: Icon, color, children, pulse }: any) => {
    const styles: any = {
        amber: 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]',
        blue: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]',
        red: 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]'
    };
    return (
        <div className={`px-3 py-1.5 rounded-full border flex items-center gap-2 text-[11px] font-bold font-outfit uppercase tracking-wider cursor-pointer hover:scale-105 transition-all ${styles[color]} ${pulse ? 'animate-pulse' : ''}`}>
            <Icon size={12} /> {children}
        </div>
    );
};

const StatCard = ({ label, value, sub, icon: Icon, color, trend, trendColor }: any) => (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all group" style={{ borderLeft: `3px solid ${color}` }}>
        <div className="w-10 h-10 mb-4 rounded-xl flex items-center justify-center bg-[#F9FAFB]">
            <Icon size={20} style={{ color }} />
        </div>
        <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider font-outfit">{label}</p>
        <div className="flex items-baseline gap-1 mt-1">
            <span className="text-[32px] font-mono font-bold text-[#111827]">{value}</span>
        </div>
        <p className="text-[12px] text-[#6B7280] font-outfit mt-1">{sub}</p>
        <div className="mt-3">
            <Badge color={trendColor} pulse={trendColor === 'red'}>{trend}</Badge>
        </div>
    </div>
);

// TAB 1: DOUBTS
const DoubtsTab = ({ selected, onSelect }: any) => (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mt-4">
        {/* Left Column: List */}
        <div className="lg:col-span-4 space-y-4">
            <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-[#1A56DB] text-white text-[12px] font-bold rounded-lg font-outfit">All</button>
                    <button className="px-3 py-1.5 bg-white border border-[#E5E7EB] text-[#6B7280] text-[12px] font-bold rounded-lg font-outfit hover:bg-[#F9FAFB]">Pending</button>
                    <button className="px-3 py-1.5 bg-white border border-[#E5E7EB] text-[#6B7280] text-[12px] font-bold rounded-lg font-outfit hover:bg-[#F9FAFB]">Answered</button>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={14} />
                    <input type="text" placeholder="Search doubts..." className="w-full h-10 pl-10 pr-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[13px] font-outfit outline-none focus:border-[#1A56DB] focus:ring-4 focus:ring-blue-500/10 transition-all" />
                </div>
            </div>
            <div className="divide-y divide-[#F3F4F6] border border-[#E5E7EB] rounded-2xl shadow-xs bg-white h-[500px] overflow-y-auto">
                {INTERACTION_DATA.doubts.map((d) => (
                    <div 
                        key={d.id} onClick={() => onSelect(d)}
                        className={`p-4 cursor-pointer hover:bg-[#F9FAFB] transition-all relative ${selected?.id === d.id ? 'bg-blue-50/50' : ''}`}
                    >
                        {selected?.id === d.id && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#1A56DB]" />}
                        <div className="flex justify-between items-start mb-2">
                            <Badge color={d.sub === 'CS603' ? 'blue' : d.sub === 'CS602' ? 'violet' : 'teal'}>{d.sub}</Badge>
                            <Badge color={d.status === 'Answered' ? 'green' : d.status === 'Pending' ? 'amber' : 'gray'}>{d.status}</Badge>
                        </div>
                        <h4 className="text-[13px] font-bold text-[#111827] font-outfit line-clamp-2 leading-tight">{d.text}</h4>
                        <div className="flex justify-between items-center mt-3">
                            <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-lg border border-blue-100 font-bold font-outfit">#{d.topic}</span>
                            <span className="text-[10px] text-[#9CA3AF] font-mono">{d.askedAt.split('T')[0]}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Right Column: Detail */}
        <div className="lg:col-span-6">
            {selected ? (
                <div className="space-y-4">
                    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-2">
                                <Badge color="blue">{selected.sub}</Badge>
                                <Badge color="amber" filled>{selected.status}</Badge>
                            </div>
                            <span className="text-[12px] font-mono text-[#9CA3AF] font-bold uppercase tracking-widest">{selected.id}</span>
                        </div>
                        <h3 className="text-[18px] font-bold text-[#111827] font-outfit">{selected.topic}</h3>
                        <p className="mt-3 text-[14px] text-[#374151] font-outfit leading-relaxed">{selected.text}</p>
                        <div className="mt-6 pt-6 border-t border-[#F3F4F6] flex gap-6">
                            <MetaItem icon={Calendar} label="Asked on" val={selected.askedAt.split('T')[0]} />
                            <MetaItem icon={User} label="To Faculty" val={selected.to} />
                            <MetaItem icon={Clock} label="Target" val="24 Hours" />
                        </div>
                    </div>

                    <div className="space-y-4 pt-4">
                        <h4 className="text-[14px] font-bold text-[#374151] font-outfit flex items-center gap-2">
                            <MessageSquare size={16} /> Conversation
                        </h4>
                        <div className="space-y-4">
                            {selected.thread.map((msg: any, i: number) => (
                                <div key={i} className={`flex ${msg.sender === 'Student' ? 'justify-end' : 'justify-start'} gap-3 items-end`}>
                                    {msg.sender === 'Faculty' && (
                                        <div className="w-8 h-8 rounded-full bg-[#1A56DB] flex-shrink-0 flex items-center justify-center text-white text-[12px] font-bold font-outfit">
                                            {msg.initials}
                                        </div>
                                    )}
                                    <div className={`max-w-[80%] rounded-2xl p-4 shadow-xs ${msg.sender === 'Student' ? 'bg-[#1A56DB] text-white rounded-br-none' : 'bg-[#F9FAFB] border border-[#F3F4F6] text-[#374151] rounded-bl-none'}`}>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[11px] font-bold opacity-70 uppercase tracking-widest">{msg.sender === 'Student' ? 'You' : msg.name}</span>
                                            <span className="text-[10px] font-mono opacity-60 ml-4">{msg.time.split('T')[1].substring(0,5)}</span>
                                        </div>
                                        <p className="text-[13px] font-outfit leading-relaxed">{msg.text}</p>
                                        {msg.rating && (
                                            <div className="mt-4 pt-3 border-t border-black/5 flex items-center gap-3">
                                                <button className="flex items-center gap-1.5 text-emerald-600 hover:scale-110 transition-all"><ThumbsUp size={12} /> <span className="text-[11px] font-bold">{msg.rating.up}</span></button>
                                                <button className="flex items-center gap-1.5 text-rose-600 hover:scale-110 transition-all"><ThumbsDown size={12} /> <span className="text-[11px] font-bold">{msg.rating.down}</span></button>
                                            </div>
                                        )}
                                    </div>
                                    {msg.sender === 'Student' && (
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 text-[12px] font-bold font-outfit">
                                            AK
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm space-y-4">
                        <textarea placeholder="Type a follow-up question..." className="w-full h-24 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[13px] font-outfit outline-none focus:border-[#1A56DB] transition-all resize-none" />
                        <div className="flex justify-between items-center">
                            <button className="flex items-center gap-2 text-[12px] text-[#6B7280] hover:text-[#374151] font-bold font-outfit"><Paperclip size={14} /> Attach File</button>
                            <button className="px-5 py-2 bg-[#1A56DB] text-white rounded-lg text-[13px] font-bold font-outfit hover:bg-[#1648C0] active:scale-95 transition-all flex items-center gap-2">Send <Send size={14} /></button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-[#9CA3AF] space-y-4">
                    <MessageSquare size={48} className="opacity-20" />
                    <p className="text-[14px] font-outfit">Select a doubt to view details and replies</p>
                </div>
            )}
        </div>
    </div>
);

const MetaItem = ({ icon: Icon, label, val }: any) => (
    <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-[#F9FAFB] flex items-center justify-center text-[#9CA3AF]">
            <Icon size={14} />
        </div>
        <div>
            <p className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-wider">{label}</p>
            <p className="text-[12px] text-[#374151] font-mono font-bold">{val}</p>
        </div>
    </div>
);

// TAB 2: FEEDBACK
const FeedbackTab = () => (
    <div className="space-y-6 mt-4">
        <div className="flex justify-between items-center">
            <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-[#1A56DB] text-white text-[12px] font-bold rounded-lg font-outfit">All Feedback</button>
                <button className="px-3 py-1.5 bg-white border border-[#E5E7EB] text-[#6B7280] text-[12px] font-bold rounded-lg font-outfit hover:bg-[#F9FAFB]">Unread</button>
                <button className="px-3 py-1.5 bg-white border border-[#E5E7EB] text-[#6B7280] text-[12px] font-bold rounded-lg font-outfit hover:bg-[#F9FAFB]">Priority</button>
            </div>
            <select className="px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-lg text-[12px] outline-none">
                <option>Newest First</option>
                <option>Oldest First</option>
            </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {INTERACTION_DATA.feedback.map((f) => (
                <FeedbackCard key={f.id} feedback={f} />
            ))}
        </div>
    </div>
);

const FeedbackCard = ({ feedback }: any) => (
    <div className={`bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border-l-4 ${feedback.priority === 'Critical' ? 'border-red-500' : 'border-amber-400'}`}>
        <div className="flex justify-between items-start mb-4">
            <div className="flex gap-2">
                <Badge color={feedback.priority === 'Critical' ? 'red' : 'amber'} pulse={feedback.priority === 'Critical'}>{feedback.priority}</Badge>
                <Badge color="blue" filled>{feedback.type}</Badge>
            </div>
            {!feedback.read && <div className="w-2 h-2 rounded-full bg-[#1A56DB]" />}
        </div>
        <div className="flex justify-between items-center mb-3">
            <div>
                <span className="text-[11px] font-mono text-[#9CA3AF] uppercase font-bold">{feedback.sub}</span>
                <h4 className="text-[15px] font-bold text-[#111827] font-outfit leading-tight mt-0.5">{feedback.subName} Performance</h4>
            </div>
            <span className="text-[11px] text-[#9CA3AF] font-mono">{feedback.time.split('T')[0]}</span>
        </div>
        <p className="text-[14px] text-[#374151] font-outfit line-clamp-3 leading-relaxed">{feedback.text}</p>
        <div className="mt-5 pt-4 border-t border-[#F3F4F6] flex justify-between items-center">
            <span className="text-[12px] text-[#6B7280] font-outfit">From: <span className="font-bold text-[#111827]">{feedback.faculty || 'AI Engine'}</span></span>
            <button className="px-4 py-1.5 border border-[#E5E7EB] rounded-lg text-[11px] font-bold font-outfit hover:bg-[#F9FAFB] transition-all">Mark as Read</button>
        </div>
        {feedback.action && (
            <div className="mt-4 bg-blue-50/50 p-3 rounded-xl flex justify-between items-center border border-blue-100">
                <p className="text-[11px] text-[#1A56DB] font-medium font-outfit">Action Suggested</p>
                <button className="text-[11px] font-bold text-[#1A56DB] flex items-center gap-1 hover:underline">{feedback.action.label} <ChevronRight size={14} /></button>
            </div>
        )}
    </div>
);

// TAB 3: REMARKS
const RemarksTab = () => (
    <div className="space-y-10 mt-4">
        <RemarkSection title="Requires Action" color="red" remarks={INTERACTION_DATA.remarks.filter(r => r.status === 'Requires action')} />
        <RemarkSection title="Informational" color="blue" remarks={INTERACTION_DATA.remarks.filter(r => r.status === 'Informational')} />
        
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border-l-4 border-indigo-600 rounded-2xl p-8 relative overflow-hidden">
            <Brain size={120} className="absolute right-[-20px] bottom-[-20px] text-indigo-600/5 rotate-12" />
            <h3 className="text-[13px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-4">Semester Summary Remark</h3>
            <p className="text-[18px] text-[#1e1e2d] font-outfit italic leading-relaxed relative z-10">"{INTERACTION_DATA.summaryRemark.text}"</p>
            <div className="mt-6 flex justify-between items-center relative z-10">
                <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">RK</div>
                    <div>
                        <p className="text-[14px] font-bold text-[#1e1e2d]">{INTERACTION_DATA.summaryRemark.faculty}</p>
                        <p className="text-[12px] text-[#6B7280]">{INTERACTION_DATA.summaryRemark.role} · {INTERACTION_DATA.summaryRemark.date}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-white/50 rounded-lg text-indigo-600 transition-all"><Copy size={18} /></button>
                    <button className="p-2 hover:bg-white/50 rounded-lg text-indigo-600 transition-all"><Printer size={18} /></button>
                </div>
            </div>
        </div>
    </div>
);

const RemarkSection = ({ title, color, remarks }: any) => (
    <div className="space-y-4">
        <div className="flex items-center gap-3">
            <h3 className={`text-[12px] font-black uppercase tracking-[0.2em] ${color === 'red' ? 'text-rose-500' : 'text-blue-500'}`}>{title}</h3>
            <div className={`flex-1 h-[1px] ${color === 'red' ? 'bg-rose-100' : 'bg-blue-100'}`} />
        </div>
        <div className="space-y-4">
            {remarks.map((r: any) => (
                <div key={r.id} className={`bg-white border border-[#E5E7EB] rounded-2xl shadow-xs overflow-hidden border-l-4 ${color === 'red' ? 'border-rose-500' : 'border-blue-500'}`}>
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-2">
                                <Badge color="blue">{r.sub}</Badge>
                                <span className="text-[12px] font-bold text-[#374151] font-outfit mt-0.5">{r.faculty}</span>
                            </div>
                            <span className="text-[11px] font-mono text-[#9CA3AF] uppercase font-bold">{r.id}</span>
                        </div>
                        <p className="text-[14px] text-[#111827] font-outfit leading-relaxed">{r.text}</p>
                        {r.checklist && (
                            <div className="mt-4 space-y-2">
                                {r.checklist.map((item: string, i: number) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-4 h-4 rounded border border-rose-200 flex items-center justify-center bg-[#F9FAFB]"><div className="w-2 h-2 rounded-full bg-rose-500 opacity-0 group-hover:opacity-20" /></div>
                                        <span className="text-[13px] text-[#6B7280] font-outfit">{item}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {color === 'red' && (
                        <div className="px-5 py-3 bg-[#F9FAFB] border-t border-[#F3F4F6] flex justify-between items-center">
                            <div className="flex gap-4">
                                <button className="text-[12px] font-bold text-rose-600 flex items-center gap-1.5 hover:underline"><Flag size={14} /> Request Revaluation</button>
                                <button className="text-[12px] font-bold text-[#6B7280] flex items-center gap-1.5 hover:underline"><MessageSquare size={14} /> Reply</button>
                            </div>
                            <button className="px-4 py-1.5 bg-[#10B981] text-white text-[11px] font-black uppercase tracking-widest rounded-lg shadow-sm hover:translate-y-[-1px] active:translate-y-0 transition-all">Mark as actioned</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
);

// TAB 4: TIMELINE
const TimelineTab = () => (
    <div className="mt-6 relative">
        <div className="absolute left-[28px] top-0 bottom-0 w-[2px] bg-[#F3F4F6] z-0" />
        <div className="absolute left-[28px] top-0 h-[30%] w-[2px] bg-[#1A56DB] z-0" />
        
        <div className="space-y-12">
            <TimelineGroup date="Today · March 20, 2026" entries={[
                { type: "Doubt Asked", sub: "CS603", txt: "Explain 3NF Normalization with example.", time: "02:34 PM", color: "blue", status: "Answered" },
                { type: "Feedback Received", sub: "CS603", txt: "Weekly test decline - Critical status.", time: "10:15 AM", color: "red", status: "Critical" }
            ]} />
            <TimelineGroup date="Yesterday · March 19, 2026" entries={[
                { type: "Remark Added", sub: "EC601", txt: "Excellent lab performance.", time: "04:00 PM", color: "amber", status: "Informational" },
                { type: "Faculty Reply", sub: "CS603", txt: "Focus on transitive dependency logic.", time: "10:00 AM", color: "green", status: "Answered" }
            ]} />
        </div>
    </div>
);

const TimelineGroup = ({ date, entries }: any) => (
    <div className="space-y-6">
        <div className="flex items-center gap-6 sticky top-0 bg-white z-10 py-2">
            <div className="w-14 h-6 rounded-full bg-[#1A56DB] text-white text-[10px] font-bold flex items-center justify-center font-outfit uppercase tracking-tighter">New</div>
            <h4 className="text-[14px] font-bold text-[#374151] font-outfit">{date}</h4>
        </div>
        <div className="space-y-8 pl-14">
            {entries.map((e: any, i: number) => (
                <div key={i} className="relative">
                    <div className={`absolute left-[-47px] top-2 w-4 h-4 rounded-full border-4 border-white z-10
                        ${e.color === 'blue' ? 'bg-[#1A56DB]' : e.color === 'red' ? 'bg-rose-500' : e.color === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-xs hover:shadow-md transition-all group max-w-2xl">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">{e.type}</span>
                            <span className="text-[10px] font-mono text-[#9CA3AF]">{e.time}</span>
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                            <Badge color="blue">{e.sub}</Badge>
                            <h5 className="text-[14px] font-bold text-[#111827] font-outfit">{e.txt}</h5>
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#F3F4F6] opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[11px] font-bold text-[#1A56DB] cursor-pointer hover:underline">View full conversation →</span>
                            <Badge color={e.status === 'Critical' ? 'red' : e.status === 'Answered' ? 'green' : 'amber'}>{e.status}</Badge>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// SECTION D: INTELLIGENCE STRIP
const IntelligenceStrip = () => (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Brain size={18} className="text-[#7C3AED]" />
                <h3 className="text-[14px] font-bold text-[#111827] font-outfit">Performance intelligence</h3>
            </div>
            <span className="text-[11px] text-[#9CA3AF] font-outfit italic">Auto-generated from your interaction history</span>
        </div>
        <div className="p-6 overflow-x-auto custom-scrollbar flex gap-5 pb-8">
            <InsightCard icon={AlertCircle} title="Recurring topic: 3NF" body="You have asked 3 doubts about normalization in the last 4 weeks. Review recommended." color="violet" />
            <InsightCard icon={Zap} title="Fast Expert: Dr. Ramesh" body="Dr. Ramesh Kumar responds in under 8 hours avg. High engagement detected." color="green" />
            <InsightCard icon={TrendingUp} title="Active Feedback Action" body="85% of critical feedback acted upon within 48h. 25% above class average." color="blue" />
            <InsightCard icon={AlertTriangle} title="Pending Doubts" body="2 doubts have been pending for >72hrs. Consider faculty office hours." color="red" pulse />
        </div>
    </div>
);

const InsightCard = ({ icon: Icon, title, body, color, pulse }: any) => {
    const borders: any = {
        violet: 'border-violet-500', green: 'border-emerald-500', blue: 'border-blue-500', red: 'border-rose-500'
    };
    return (
        <div className={`min-w-[280px] bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col border-l-4 ${borders[color]}`}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#F9FAFB] mb-4">
                <Icon size={20} className={`${pulse ? 'animate-pulse' : ''}`} style={{ color: color === 'violet' ? '#7C3AED' : color === 'green' ? '#10B981' : color === 'blue' ? '#1A56DB' : '#EF4444'}} />
            </div>
            <h4 className="text-[14px] font-bold text-[#111827] font-outfit mb-2">{title}</h4>
            <p className="text-[12px] text-[#6B7280] font-outfit leading-relaxed flex-1">{body}</p>
            <button className="mt-4 text-[12px] font-bold text-[#1A56DB] hover:underline text-left">View details →</button>
        </div>
    );
};

// MODALS
const AskDoubtModal = ({ isOpen, onClose }: any) => (
    <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={onClose} 
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative z-10"
                >
                    <div className="px-8 py-6 border-b border-[#F3F4F6] flex justify-between items-center">
                        <div>
                            <h2 className="text-[20px] font-bold font-outfit text-[#111827]">Ask a Doubt</h2>
                            <p className="text-[12px] text-[#6B7280] font-outfit">Your question will be sent to the subject faculty</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-all"><X size={20} className="text-[#9CA3AF]" /></button>
                    </div>
                    <div className="p-8 space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <FormGroup label="Subject" required>
                                <select className="w-full h-11 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[13px] font-outfit outline-none">
                                    <option>CS603 · DBMS</option>
                                    <option>CS602 · OS</option>
                                </select>
                            </FormGroup>
                            <FormGroup label="Directed To" required>
                                <select className="w-full h-11 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[13px] font-outfit outline-none">
                                    <option>Dr. Ramesh Kumar</option>
                                </select>
                            </FormGroup>
                        </div>
                        <FormGroup label="Topic">
                            <input type="text" placeholder="e.g. Normalization, Scheduling" className="w-full h-11 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[13px] font-outfit outline-none" />
                        </FormGroup>
                        <FormGroup label="Your Question" required>
                            <textarea placeholder="Describe your doubt clearly..." className="w-full h-32 px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[13px] font-outfit outline-none resize-none" />
                        </FormGroup>
                        <div className="border-2 border-dashed border-[#E5E7EB] rounded-2xl p-6 text-center hover:border-blue-400 transition-all cursor-pointer bg-[#F9FAFB]">
                            <Paperclip size={24} className="mx-auto text-[#9CA3AF] mb-2" />
                            <p className="text-[12px] font-bold text-[#374151] font-outfit">Attach file or screenshot</p>
                            <p className="text-[11px] text-[#9CA3AF] font-outfit mt-1">Image or PDF up to 5MB</p>
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button onClick={onClose} className="flex-1 py-3 text-[13px] font-bold text-[#6B7280] hover:bg-[#F9FAFB] rounded-xl transition-all">Cancel</button>
                            <button className="flex-1 py-3 bg-[#1A56DB] text-white rounded-xl text-[13px] font-bold font-outfit hover:bg-[#1648C0] shadow-lg shadow-blue-500/20 active:scale-95 transition-all">Submit Doubt</button>
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
    </AnimatePresence>
);

const FormGroup = ({ label, required, children }: any) => (
    <div className="space-y-1.5">
        <label className="text-[11px] font-black text-[#9CA3AF] uppercase tracking-widest pl-1">{label} {required && <span className="text-rose-500">*</span>}</label>
        {children}
    </div>
);

export default AcademicInteraction;
