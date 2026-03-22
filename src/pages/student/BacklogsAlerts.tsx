import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, AlertOctagon, RefreshCw, Download, 
  XCircle, CheckCircle, Users, MessageSquare, Radar, 
  TrendingUp, TrendingDown, Calculator, Map, Grid, 
  ChevronDown, ChevronRight, Clock, Building2, Flag,
  Heart, HeartHandshake, MapPin, Phone, Minus, Search, List, Calendar as CalendarIcon, Edit2, Send
} from 'lucide-react';
import StudentLayout from '../../components/layout/StudentLayout';

// ═══════════════════════════════════════════════════════════════
// MOCK DATA (As per specification)
// ═══════════════════════════════════════════════════════════════

const BACKLOG_DATA = {
    subjects: [
        { 
            code: 'CS603', name: 'Database Management Systems', severity: 'Critical', 
            weekly: '14/20', mid1: '18/30', lab: '20/25', internal: 52, totalMax: 135,
            backlog: true, type: ['Theory', 'Lab']
        },
        { 
            code: 'CS602', name: 'Operating Systems', severity: 'Safe', 
            weekly: '16/20', mid1: '20/30', lab: '22/25', internal: 58, totalMax: 135,
            backlog: false, type: ['Theory', 'Lab']
        },
        { 
            code: 'MA601', name: 'Engineering Mathematics', severity: 'Watch', 
            weekly: '12/20', mid1: null, lab: null, internal: 27, totalMax: 105,
            backlog: false, type: ['Theory'], attendance: 73
        },
        { 
            code: 'EC601', name: 'Digital Circuits', severity: 'Safe', 
            weekly: '17/20', mid1: '22/30', lab: '23/25', internal: 62, totalMax: 135,
            backlog: false, type: ['Theory', 'Lab']
        }
    ],
    timeline: [
        { date: '14 Mar', name: 'CS601 Weekly Test 7', sub: 'CS601', type: 'Internal', score: '16/20', completed: true },
        { date: '18 Mar', name: 'EC601 Lab Assessment 2', sub: 'EC601', type: 'Lab', score: '23/25', completed: true },
        { date: '24 Mar', name: 'CS603 Internal Assessment 2', sub: 'CS603', type: 'Internal', days: 3, completed: false },
        { date: '28 Mar', name: 'MA601 Assignment 2', sub: 'MA601', type: 'Assignment', days: 7, completed: false },
        { date: '10 Apr', name: 'CS603 Supplementary Exam', sub: 'CS603', type: 'Supplementary', action: 'Register', completed: false }
    ],
    remarks: [
        { 
            id: 1, faculty: 'Dr. Ramesh Kumar', sub: 'CS601', context: 'Assignment 2', 
            text: 'Please submit your pending assignment (Assignment 2) by this Friday, 21 March. This affects your internal marks.', 
            severity: 'amber', 
            actions: [{ text: 'Submit Assignment 2 before Friday', done: false }, { text: 'Confirm submission to faculty', done: false }] 
        },
        { 
            id: 2, faculty: 'Dr. Priya Sharma', sub: 'EC601', context: 'General feedback', 
            text: 'Your Lab Assessment 2 was excellent. Keep up the consistency in the upcoming Mid-semester.', 
            severity: 'blue', actions: [], 
            replies: [{ from: 'Student', text: 'Thank you, ma\'am. I will maintain this.', time: '2 days ago' }] 
        }
    ]
};

// ═══════════════════════════════════════════════════════════════
// HELPER COMPONENTS
// ═══════════════════════════════════════════════════════════════

const Badge = ({ children, color, filled, pulse }: { children: React.ReactNode, color: string, filled?: boolean, pulse?: boolean }) => {
    const styles: Record<string, string> = {
        red: filled ? 'bg-[#EF4444] text-white border-[#EF4444]' : 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]',
        amber: filled ? 'bg-[#F59E0B] text-white border-[#F59E0B]' : 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]',
        green: filled ? 'bg-[#10B981] text-white border-[#10B981]' : 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]',
        blue: filled ? 'bg-[#1A56DB] text-white border-[#1A56DB]' : 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]',
        gray: 'bg-[#F9FAFB] text-[#4B5563] border-[#E5E7EB]',
        violet: 'bg-[#F5F3FF] text-[#5B21B6] border-[#DDD6FE]',
        teal: 'bg-[#F0FDFA] text-[#0D9488] border-[#99F6E4]'
    };
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${styles[color] || styles.gray} font-outfit ${pulse ? 'animate-pulse' : ''}`}>
            {children}
        </span>
    );
};

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

const BacklogsAlerts = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [severityFilter, setSeverityFilter] = useState('All');
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
    const [selectedSubForPlan, setSelectedSubForPlan] = useState('CS603');
    const [showToast, setShowToast] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 800);
    };

    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.08 } }
    };

    const itemAnim = {
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }
    };

    return (
        <StudentLayout activePage="alerts" onNavigate={() => {}}>
            <motion.div 
                variants={container} initial="hidden" animate="show"
                className="max-w-[1400px] mx-auto px-7 pb-20 space-y-6"
            >
                {/* PAGE HEADER */}
                <div className="flex justify-between items-end pb-6 border-b border-[#F3F4F6]">
                    <div>
                        <h1 className="text-[24px] font-fraunces font-light italic text-[#111827]">Backlogs & Alerts</h1>
                        <p className="mt-1 text-[13px] font-outfit text-[#6B7280]">Early warning system · Semester 6</p>
                        <p className="mt-1 text-[11px] font-outfit text-[#9CA3AF]">Last updated: Today, 9:41 AM · Recalculates on every marks upload</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={handleRefresh}
                            className="h-10 px-4 bg-white border border-[#E5E7EB] rounded-lg text-[13px] font-medium font-outfit text-[#374151] flex items-center gap-2 hover:bg-[#F9FAFB] active:scale-95 transition-all"
                        >
                            <RefreshCw size={16} className={`${isRefreshing ? 'animate-spin' : ''} text-[#1A56DB]`} />
                            Refresh
                        </button>
                        <button className="h-10 px-4 bg-white border border-[#E5E7EB] rounded-lg text-[13px] font-medium font-outfit text-[#374151] flex items-center gap-2 hover:bg-[#F9FAFB] active:scale-95 transition-all">
                            <Download size={16} />
                            Export Alerts
                        </button>
                    </div>
                </div>

                {/* URGENCY SUMMARY BAND */}
                <motion.div 
                    initial={{ translateY: -10, opacity: 0 }} animate={{ translateY: 0, opacity: 1 }}
                    className="bg-[#EF4444]/[0.08] border border-[#EF4444]/25 rounded-[14px] px-6 py-4 flex justify-between items-center"
                >
                    <div className="flex items-center gap-3">
                        <AlertOctagon size={20} className="text-[#EF4444] flex-shrink-0" />
                        <p className="text-[13px] font-medium text-[#991B1B] font-outfit leading-relaxed">
                            You have 2 subjects at critical risk of backlog and 1 subject with attendance below the exam eligibility threshold. Immediate action is required.
                        </p>
                    </div>
                    <button className="h-9 px-4 bg-[#EF4444] text-white text-[13px] font-medium font-outfit rounded-lg hover:bg-[#DC2626] active:scale-95 transition-all whitespace-nowrap ml-4">
                        Jump to critical subjects
                    </button>
                </motion.div>

                {/* STAT CARDS ROW */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <StatCard 
                        label="ACTIVE BACKLOGS" value={1} sub="CS603 · Needs supply exam" 
                        chip="Resolve immediately" color="#EF4444" icon={XCircle} pulse={true}
                    />
                    <StatCard 
                        label="AT-RISK SUBJECTS" value={2} sub="CS603 · MA601" 
                        chip="Action required" color="#EF4444" icon={AlertTriangle}
                    />
                    <StatCard 
                        label="ATTENDANCE ALERTS" value={1} sub="MA601 at 73% · Low eligibility" 
                        chip="1 subject at risk" color="#F59E0B" icon={Users}
                    />
                    <StatCard 
                        label="PENDING REMARKS" value={2} sub="2 remarks need response" 
                        chip="Response required" color="#1A56DB" icon={MessageSquare}
                    />
                </div>

                {/* FILTER BAR */}
                <motion.div variants={itemAnim} className="bg-white border border-[#E5E7EB] rounded-2xl p-3 flex items-center gap-3 flex-wrap">
                    <div className="flex bg-[#F9FAFB] p-1 rounded-lg gap-1">
                        {['All', 'Critical', 'High', 'Watch', 'Resolved'].map(s => (
                            <button 
                                key={s} onClick={() => setSeverityFilter(s)}
                                className={`px-3.5 py-1.5 rounded-md text-[12px] font-medium font-outfit transition-all ${severityFilter === s ? 'bg-[#1A56DB] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#374151]'}`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                    <div className="w-[1px] h-6 bg-[#E5E7EB] mx-1" />
                    <button className="h-9 px-3.5 border border-[#E5E7EB] rounded-lg text-[12px] font-medium font-outfit text-[#374151] flex items-center gap-2 hover:bg-[#F9FAFB]">
                        <Search size={14} className="text-[#9CA3AF]" />
                        All subjects
                    </button>
                    <div className="ml-auto text-[12px] text-[#9CA3AF] font-outfit">Showing 4 subjects</div>
                </motion.div>

                {/* TWO-COLUMN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-6 space-y-6">
                        <div className="space-y-4">
                            <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider font-outfit">Subject status</p>
                            {BACKLOG_DATA.subjects.map((sub, i) => (
                                <SubjectStatusCard key={sub.code} subject={sub} />
                            ))}
                        </div>
                        <AtRiskWarningSystem />
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="lg:col-span-4 space-y-6">
                        <AssessmentTimeline view={viewMode} setView={setViewMode} />
                        <FacultyRemarks remarks={BACKLOG_DATA.remarks} />
                        <CounselorContactCard />
                    </div>
                </div>

                {/* BOTTOM FULL-WIDTH SECTIONS */}
                <EndSemCalculator />
                <GradeBoundaryTable />
                <RecoveryPlan selectedSub={selectedSubForPlan} />
                
            </motion.div>
        </StudentLayout>
    );
};

// ═══════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════

const StatCard = ({ label, value, sub, chip, color, icon: Icon, pulse }: any) => (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all group" style={{ borderLeft: `3px solid ${color}` }}>
        <div className="w-10 h-10 mb-4 rounded-xl flex items-center justify-center bg-[#F3F4F6]">
            <Icon size={20} style={{ color }} />
        </div>
        <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider font-outfit">{label}</p>
        <div className="flex items-baseline gap-2 mt-1">
            <span className={`text-[32px] font-mono font-bold text-[#111827] ${pulse ? 'animate-pulse text-[#EF4444]' : ''}`}>{value}</span>
        </div>
        <p className="text-[12px] text-[#6B7280] font-outfit mt-1">{sub}</p>
        <div className="mt-3">
            <Badge color={color === '#EF4444' ? 'red' : color === '#F59E0B' ? 'amber' : 'blue'}>{chip}</Badge>
        </div>
    </div>
);

const SubjectStatusCard = ({ subject }: any) => {
    const isCritical = subject.severity === 'Critical';
    return (
        <div className={`bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden flex flex-col`} style={{ borderLeft: `4px solid ${isCritical ? '#EF4444' : subject.severity === 'Watch' ? '#F59E0B' : '#10B981'}` }}>
            <div className="px-6 py-4 flex justify-between items-start border-b border-[#F3F4F6]">
                <div>
                    <p className="text-[11px] font-mono text-[#9CA3AF]">{subject.code}</p>
                    <h3 className="text-[15px] font-bold text-[#111827] font-outfit mt-0.5">{subject.name}</h3>
                    <div className="flex gap-1.5 mt-2">
                        {subject.type.map((t: any) => <Badge key={t} color={t === 'Theory' ? 'gray' : 'teal'}>{t}</Badge>)}
                    </div>
                </div>
                <div className="text-right">
                    <Badge color={isCritical ? 'red' : subject.severity === 'Watch' ? 'amber' : 'green'} filled={isCritical} pulse={isCritical}>
                        {subject.severity}
                    </Badge>
                    <p className="text-[11px] text-[#9CA3AF] mt-1.5">Updated 2h ago</p>
                </div>
            </div>
            
            <div className="px-6 py-4 grid grid-cols-4 gap-4 border-b border-[#F3F4F6]">
                <MetricChip label="WEEKLY" val={subject.weekly} color="blue" />
                <MetricChip label="MID-1" val={subject.mid1 || '—/30'} color="violet" missing={!subject.mid1} />
                {subject.lab && <MetricChip label="LAB" val={subject.lab} color="teal" />}
                <MetricChip label="INTERNAL" val={`${subject.internal}/75`} color="gray" bold={true} />
            </div>

            <div className="px-6 py-3 flex items-center gap-4 bg-[#F9FAFB]">
                <span className="text-[12px] font-medium text-[#4B5563] font-outfit flex items-center gap-2 flex-shrink-0">
                    <TrendingUp size={14} /> Projected
                </span>
                <div className="flex-1 h-2 bg-[#E5E7EB] rounded-full relative">
                    <div className="h-full bg-[#1A56DB] rounded-full" style={{ width: '60.7%' }} />
                    <div className="absolute top-[-4px] left-1/2 w-0.5 h-4 bg-[#EF4444] z-10">
                       <span className="absolute top-[-14px] left-1/2 -translate-x-1/2 text-[9px] font-bold text-[#EF4444]">PASS</span>
                    </div>
                </div>
                <span className="text-[13px] font-mono font-bold text-[#111827]">60.7%</span>
            </div>

            <div className="px-6 py-4 flex gap-2">
                <button className="h-8 px-3 border border-[#E5E7EB] rounded-lg text-[12px] font-medium text-[#374151] font-outfit flex items-center gap-2 hover:bg-[#F9FAFB] transition-all">
                    <Calculator size={14} className="text-[#9CA3AF]" />
                    Target Calculator
                </button>
                <button className="h-8 px-3 border border-[#E5E7EB] rounded-lg text-[12px] font-medium text-[#374151] font-outfit flex items-center gap-2 hover:bg-[#F9FAFB] transition-all">
                    <Map size={14} className="text-[#9CA3AF]" />
                    Recovery Plan
                </button>
            </div>
        </div>
    );
};

const MetricChip = ({ label, val, color, bold, missing }: any) => (
    <div className={`p-3 rounded-xl border flex flex-col items-center justify-center relative
        ${color === 'blue' ? 'bg-[#EFF6FF] border-[#BFDBFE]' : color === 'violet' ? 'bg-[#F5F3FF] border-[#DDD6FE]' : color === 'teal' ? 'bg-[#F0FDFA] border-[#99F6E4]' : 'bg-[#F9FAFB] border-[#E5E7EB]'}
    `}>
        <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-1">{label}</span>
        <span className={`text-[14px] font-mono ${bold ? 'font-bold' : 'font-semibold'} ${missing ? 'text-[#9CA3AF]' : 'text-[#111827]'}`}>{val}</span>
        {missing && <Clock size={10} className="absolute top-1.5 right-1.5 text-[#F59E0B]" />}
    </div>
);

const AtRiskWarningSystem = () => (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center">
            <div className="flex items-center gap-2 text-[14px] font-semibold text-[#111827] font-outfit">
                <Radar size={16} className="text-[#EF4444]" />
                <span>Early warning system</span>
            </div>
        </div>
        <div className="p-6 space-y-6">
            <div className="bg-[#1A56DB]/[0.04] p-4 rounded-xl text-[13px] text-[#374151] font-outfit leading-relaxed">
                This system detects backlog risk using your internal marks and mid-semester scores — weeks before final results are announced. Early action changes outcomes.
            </div>
            <div className="bg-[#F9FAFB] border border-[#F3F4F6] rounded-xl p-5">
                <p className="text-[13px] font-bold text-[#111827] mb-4">CS603 Risk Breakdown</p>
                <div className="flex justify-between items-end gap-1 px-4">
                    <div className="flex flex-col items-center">
                        <span className="text-[18px] font-mono font-bold text-[#1A56DB]">52/75</span>
                        <span className="text-[10px] text-[#9CA3AF] uppercase mt-1">INTERNAL</span>
                    </div>
                    <Minus className="mb-4 text-[#9CA3AF]" size={16} />
                    <div className="flex flex-col items-center">
                        <span className="text-[18px] font-mono font-bold text-[#10B981]">60/60</span>
                        <span className="text-[10px] text-[#9CA3AF] uppercase mt-1">BEST END-SEM</span>
                    </div>
                    <Badge color="blue">=</Badge>
                    <div className="flex flex-col items-center">
                        <span className="text-[18px] font-mono font-bold text-[#111827]">112/135</span>
                        <span className="text-[10px] text-[#9CA3AF] uppercase mt-1">MAX POSSIBLE</span>
                    </div>
                </div>
                <div className="mt-8 pt-4 border-t border-[#F3F4F6] bg-[#EF4444]/[0.04] p-4 rounded-lg flex items-center gap-3">
                    <div className="w-[3px] h-10 bg-[#EF4444] rounded-full" />
                    <p className="text-[14px] font-medium text-[#991B1B] font-outfit">
                        → You need a minimum of <span className="text-[18px] font-mono font-bold">16/60</span> in the End Semester to pass CS603.
                    </p>
                </div>
            </div>
        </div>
    </div>
);

const AssessmentTimeline = ({ view, setView }: any) => (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden flex flex-col h-[480px]">
        <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center">
            <div className="flex items-center gap-2 text-[14px] font-semibold text-[#111827] font-outfit">
                <CalendarIcon size={16} className="text-[#6B7280]" />
                <span>Assessment timeline</span>
            </div>
            <div className="flex bg-[#F9FAFB] p-0.5 rounded-lg border">
                <button onClick={() => setView('list')} className={`px-2.5 py-1 rounded-md transition-all ${view === 'list' ? 'bg-white shadow-sm' : ''}`}><List size={14} /></button>
                <button onClick={() => setView('calendar')} className={`px-2.5 py-1 rounded-md transition-all ${view === 'calendar' ? 'bg-white shadow-sm' : ''}`}><CalendarIcon size={14} /></button>
            </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
            <div className="relative pl-4 space-y-6 border-l-2 border-[#E5E7EB]">
                {BACKLOG_DATA.timeline.map((item, i) => (
                    <div key={i} className="relative pl-6">
                        <div className={`absolute left-[-29px] top-1.5 w-4 h-4 rounded-full border-2 border-white 
                            ${item.type === 'Internal' ? 'bg-[#1A56DB]' : item.type === 'Lab' ? 'bg-[#0EA5E9]' : item.type === 'Supplementary' ? 'bg-[#EF4444]' : 'bg-[#7C3AED]'}
                        `} />
                        <div className="flex justify-between items-start mb-0.5">
                            <h4 className="text-[13px] font-bold text-[#111827] font-outfit">{item.name}</h4>
                            <span className="text-[10px] font-mono text-[#9CA3AF]">{item.date}</span>
                        </div>
                        <p className="text-[11px] font-mono text-[#6B7280]">{item.sub}</p>
                        <div className="mt-2">
                             {item.completed ? <Badge color="gray">Completed: {item.score}</Badge> : <Badge color={item.days && item.days <= 3 ? 'red' : 'amber'}>in {item.days} days</Badge>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const FacultyRemarks = ({ remarks }: any) => (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center">
            <div className="flex items-center gap-2 text-[14px] font-semibold text-[#111827] font-outfit">
                <MessageSquare size={16} className="text-[#6B7280]" />
                <span>Faculty remarks</span>
            </div>
            <Badge color="red">2 pending</Badge>
        </div>
        <div className="divide-y divide-[#F3F4F6]">
            {remarks.map(r => (
                <div key={r.id} className="p-5 hover:bg-[#F9FAFB] transition-all border-l-[3px]" style={{ borderLeftColor: r.severity === 'amber' ? '#F59E0B' : '#1A56DB' }}>
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-[12px] font-bold text-[#111827] font-outfit">{r.faculty}</span>
                        <span className="text-[10px] text-[#9CA3AF]">Yesterday</span>
                    </div>
                    <p className="text-[11px] font-mono text-[#6B7280] mb-3">{r.sub} · {r.context}</p>
                    <p className="text-[13px] text-[#4B5563] font-outfit leading-relaxed line-clamp-2">{r.text}</p>
                    {r.actions.length > 0 && (
                        <div className="mt-4 space-y-2">
                            {r.actions.map((a: any, idx: number) => (
                                <label key={idx} className="flex items-center gap-2.5 cursor-pointer group">
                                    <div className="w-4 h-4 rounded border-[#D1D5DB] group-hover:border-[#1A56DB] flex items-center justify-center transition-all bg-white"><div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-[#1A56DB]/20" /></div>
                                    <span className="text-[12px] text-[#4B5563] font-outfit">{a.text}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
);

const CounselorContactCard = () => (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm border-l-[3px] border-l-[#6366F1]">
        <div className="flex items-center gap-2 mb-4">
            <HeartHandshake size={18} className="text-[#6366F1]" />
            <h3 className="text-[13px] font-bold text-[#111827] font-outfit">Student counseling</h3>
        </div>
        <p className="text-[13px] font-bold text-[#111827] font-outfit">Dr. Anjali Menon</p>
        <p className="text-[11px] text-[#9CA3AF] font-outfit mb-4">Student Wellness Counselor</p>
        <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-[11px] text-[#6B7280] font-outfit">
                <MapPin size={12} className="text-[#9CA3AF]" />
                Room 204, Admin Block
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#6B7280] font-outfit">
                <Clock size={12} className="text-[#9CA3AF]" />
                Mon–Fri · 10:0 AM – 5:00 PM
            </div>
        </div>
        <button className="w-full h-10 bg-[#6366F1]/10 text-[#6366F1] font-bold text-[13px] rounded-lg border border-[#6366F1]/20 hover:bg-[#6366F1]/20 transition-all flex items-center justify-center gap-2">
            <CalendarIcon size={14} />
            Book a session
        </button>
    </div>
);

const EndSemCalculator = () => (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center">
            <div className="flex items-center gap-2 text-[14px] font-semibold text-[#111827] font-outfit">
                <Calculator size={16} className="text-[#6B7280]" />
                <span>End-semester target calculator</span>
            </div>
        </div>
        <div className="p-6">
            <div className="flex bg-[#F9FAFB] p-1 rounded-lg border mb-6 inline-flex">
                {['CS603', 'CS602', 'MA601', 'EC601'].map(s => (
                    <button key={s} className={`px-5 py-2 rounded-md text-[13px] font-bold font-outfit transition-all ${s === 'CS603' ? 'bg-white text-[#1A56DB] shadow-sm' : 'text-[#6B7280]'}`}>{s}</button>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <p className="text-[13px] font-bold text-[#374151]">Current Position — CS603</p>
                    <div className="h-6 w-full rounded-full flex overflow-hidden ring-1 ring-[#F3F4F6]">
                        <div className="w-[10%] h-full bg-[#1A56DB]" />
                        <div className="w-[15%] h-full bg-[#7C3AED]" />
                        <div className="w-[14%] h-full bg-[#0EA5E9]" />
                        <div className="flex-1 h-full bg-[#E5E7EB]" />
                    </div>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-12">
                        <CalcRow label="Weekly Tests" val="14/20" />
                        <CalcRow label="Mid-semester" val="18/30" />
                        <CalcRow label="Lab Assessment" val="20/25" />
                        <CalcRow label="Current Total" val="52/75" bold={true} />
                    </div>
                </div>
                <div>
                    <p className="text-[13px] font-bold text-[#374151] mb-4">Targeting Grades</p>
                    <div className="grid grid-cols-2 gap-3">
                        <GradeCard grade="A" need="38/60" target="≥75%" status="amber" />
                        <GradeCard grade="B+" need="28/60" target="≥65%" status="blue" />
                        <GradeCard grade="B" need="18/60" target="≥55%" status="green" />
                        <GradeCard grade="Pass" need="14/60" target="≥50%" status="green" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const CalcRow = ({ label, val, bold }: any) => (
    <div className="flex justify-between items-center py-2 border-b border-[#F3F4F6]">
        <span className="text-[12px] font-medium text-[#6B7280]">{label}</span>
        <span className={`text-[13px] font-mono ${bold ? 'font-bold text-[#111827]' : 'text-[#374151]'}`}>{val}</span>
    </div>
);

const GradeCard = ({ grade, need, target, status }: any) => (
    <div className="bg-[#F9FAFB] border border-[#F3F4F6] rounded-xl p-4 flex flex-col items-center">
        <span className="text-[20px] font-bold text-[#111827]">{grade}</span>
        <span className={`text-[16px] font-mono font-bold my-1 ${status === 'green' ? 'text-[#10B981]' : status === 'amber' ? 'text-[#F59E0B]' : 'text-[#1A56DB]'}`}>{need}</span>
        <span className="text-[10px] text-[#9CA3AF]">{target}</span>
    </div>
);

const GradeBoundaryTable = () => (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center">
            <div className="flex items-center gap-2 text-[14px] font-semibold text-[#111827] font-outfit">
                <Grid size={16} className="text-[#6B7280]" />
                <span>Grade boundary table</span>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-[12px]">
                <thead className="bg-[#F9FAFB] border-b border-[#F3F4F6]">
                    <tr className="text-[10px] font-bold text-[#9CA3AF] uppercase">
                        <th className="px-6 py-3">Subject</th>
                        <th className="px-6 py-3 text-right">Internal</th>
                        <th className="px-6 py-3 text-right">Pass (50%)</th>
                        <th className="px-6 py-3 text-right">B (55%)</th>
                        <th className="px-6 py-3 text-right">A (75%)</th>
                        <th className="px-6 py-3 text-right">Max Grade</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F4F6]">
                     {[
                         { sub: 'CS603', int: '52/75', pass: 16, b: 23, a: 51, max: 'A' },
                         { sub: 'CS602', int: '58/75', pass: 10, b: 17, a: 46, max: 'A+' },
                         { sub: 'MA601', int: '27/45', pass: 26, b: 31, a: 52, max: 'A+' }
                     ].map(r => (
                         <tr key={r.sub} className="hover:bg-[#F9FAFB]">
                             <td className="px-6 py-4 font-bold text-[#111827]">{r.sub}</td>
                             <td className="px-6 py-4 text-right">{r.int}</td>
                             <td className="px-6 py-4 text-right text-[#10B981]">{r.pass}</td>
                             <td className="px-6 py-4 text-right text-[#1A56DB]">{r.b}</td>
                             <td className="px-6 py-4 text-right text-[#F59E0B]">{r.a}</td>
                             <td className="px-6 py-4 text-right"><Badge color="green">{r.max}</Badge></td>
                         </tr>
                     ))}
                </tbody>
            </table>
        </div>
    </div>
);

const RecoveryPlan = ({ selectedSub }: any) => (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center bg-[#EF4444]/[0.05]">
            <div className="flex items-center gap-2 text-[14px] font-bold text-[#991B1B] font-outfit">
                <Map size={16} />
                <span>Recovery plan: {selectedSub}</span>
            </div>
            <Badge color="red">Critical Risk</Badge>
        </div>
        <div className="p-8 space-y-8">
            <PlanStep num={1} title="Assess exactly where you stand" desc="Review your internal marks and identify high-weightage topics. You need 16/60 minimum to stay safe." />
            <PlanStep num={2} title="Gather preparation materials" desc="Download previous 3 years' question papers and official syllabus. Week 14 registration deadline is approaching." />
            <PlanStep num={3} title="Weekly study target" desc="Dedicate 4 hours per week to CS603 focusing on SQL and Transaction Management (Unit 1 & 2)." />
            <PlanStep num={4} title="Meeting with advisor" desc="Schedule a consultation with Dr. Anjali Menon before end-semester registration starts." btn="Schedule now" />
        </div>
    </div>
);

const PlanStep = ({ num, title, desc, btn }: any) => (
    <div className="flex gap-6">
        <div className="w-10 h-10 rounded-full border-2 border-[#E5E7EB] flex items-center justify-center font-mono font-bold text-[#374151] flex-shrink-0">{num}</div>
        <div className="flex-1">
            <p className="text-[14px] font-bold text-[#111827] font-outfit">{title}</p>
            <p className="text-[13px] text-[#6B7280] font-outfit mt-1 leading-relaxed">{desc}</p>
            {btn && <button className="mt-4 h-9 px-4 bg-[#1A56DB] text-white text-[12px] font-bold rounded-lg hover:bg-[#1648C0] transition-all">{btn}</button>}
        </div>
    </div>
);

export default BacklogsAlerts;
