import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart2, TrendingUp, TrendingDown, Award,
  Download, ChevronDown, Clock, Star, FlaskConical, Target,
  RefreshCw, ArrowRight, AlertTriangle
} from 'lucide-react';
import StudentLayout from '../../components/layout/StudentLayout';

// ═══════════════════════════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════════════════════════

const MARKS_DATA = {
    theory: [
        { code: 'CS601', name: 'Software Engineering', credits: 4, overview: { w: 8, m1: 20, m2: 19, ext: 54, cgpa: 8.5, grade: 'A', status: 'PASS' }, m1: { pa: 8, pb: 24, t: 32, st: 'PASS' }, m2: { pa: 7, pb: 22, t: 29, st: 'PASS' }, w: [{ a:'Present', s:8 }, { a:'Present', s:7 }, { a:'Absent', s:null }, { a:'Present', s:9 }, { a:'Present', s:8 }] },
        { code: 'CS602', name: 'Operating Systems', credits: 4, overview: { w: 9, m1: 22, m2: 21, ext: 61, cgpa: 9.2, grade: 'S', status: 'PASS' }, m1: { pa: 9, pb: 27, t: 36, st: 'PASS' }, m2: { pa: 8, pb: 25, t: 33, st: 'PASS' }, w: [{ a:'Present', s:9 }, { a:'Present', s:8 }, { a:'Present', s:7 }, { a:'Present', s:9 }, { a:'Absent', s:null }] },
        { code: 'CS603', name: 'Database Management Systems', credits: 4, overview: { w: 7, m1: 17, m2: 16, ext: 42, cgpa: 7.1, grade: 'B', status: 'PASS' }, m1: { pa: 7, pb: 19, t: 26, st: 'PASS' }, m2: { pa: 6, pb: 18, t: 24, st: 'PASS' }, w: [{ a:'Present', s:6 }, { a:'Present', s:5 }, { a:'Present', s:4 }, { a:'Absent', s:null }, { a:'Present', s:7 }] },
        { code: 'MA601', name: 'Engineering Mathematics', credits: 3, overview: { w: 6, m1: 14, m2: null, ext: 38, cgpa: 6.4, grade: 'C', status: 'PASS' }, m1: { pa: 6, pb: 16, t: 22, st: 'PASS' }, m2: { pa: null, pb: null, t: null, st: 'Scheduled' }, w: [{ a:'Present', s:7 }, { a:'Absent', s:null }, { a:'Present', s:6 }, { a:'Present', s:8 }, { a:'Present', s:7 }] },
        { code: 'EC601', name: 'Digital Circuits', credits: 3, overview: { w: 9, m1: 23, m2: 22, ext: 58, cgpa: 8.9, grade: 'A', status: 'PASS' }, m1: { pa: 9, pb: 26, t: 35, st: 'PASS' }, m2: { pa: 9, pb: 24, t: 33, st: 'PASS' }, w: [{ a:'Present', s:9 }, { a:'Present', s:9 }, { a:'Present', s:8 }, { a:'Present', s:10 }, { a:'Present', s:9 }] }
    ],
    labs: [
        { code: 'CS6L1', name: 'OS & DBMS Lab', iRec: 4, iViva: 4, iExec: 8, iTest: 8, eRec: 8, eViva: 8, eExec: 25, eTest: 18 },
        { code: 'EC6L1', name: 'Digital Circuits Lab', iRec: 5, iViva: 4, iExec: 9, iTest: 7, eRec: 9, eViva: 9, eExec: 27, eTest: 16 }
    ],
    otherCredits: [
        { activity: 'DBMS Seminar', type: 'Seminar', date: '12 Feb 2026', max: 5, score: 5, status: 'Credited' },
        { activity: 'OS Mini Project', type: 'Project', date: '28 Feb 2026', max: 10, score: 9, status: 'Credited' },
        { activity: 'Tech Fest Volunteer', type: 'Activity', date: '05 Mar 2026', max: 2, score: 2, status: 'Credited' },
        { activity: 'Math Assignment 4', type: 'Assignment', date: '15 Mar 2026', max: 5, score: null, status: 'Pending' },
        { activity: 'SE Paper Presentation', type: 'Seminar', date: '10 Jan 2026', max: 5, score: null, status: 'Overdue' }
    ],
    externals: [
        { sem: 5, sgpa: 7.6, credits: 22, subs: [
            { name: 'Software Engineering', int: 24, ext: 56, t: 80, grade: 'A', res: 'PASS' },
            { name: 'Operating Systems', int: 27, ext: 62, t: 89, grade: 'S', res: 'PASS' },
            { name: 'Database Management Systems', int: 21, ext: 48, t: 69, grade: 'B', res: 'PASS' },
            { name: 'Engineering Mathematics', int: 18, ext: 41, t: 59, grade: 'C', res: 'PASS' },
            { name: 'Digital Circuits', int: 25, ext: 55, t: 80, grade: 'A', res: 'PASS' }
        ]},
        { sem: 4, sgpa: 9.0, credits: 24, subs: [
            { name: 'Software Engineering', int: 22, ext: 51, t: 73, grade: 'B', res: 'PASS' },
            { name: 'Operating Systems', int: 26, ext: 60, t: 86, grade: 'A', res: 'PASS' },
            { name: 'Database Management Systems', int: 20, ext: 45, t: 65, grade: 'B', res: 'PASS' },
            { name: 'Engineering Mathematics', int: 17, ext: 38, t: 55, grade: 'C', res: 'PASS' },
            { name: 'Digital Circuits', int: 24, ext: 52, t: 76, grade: 'B', res: 'PASS' }
        ]}
    ]
};
// removed old weekly hook

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

const getScoreColor = (score: number | null, max: number) => {
    if (score === null) return '#9CA3AF'; // muted
    const ratio = score / max;
    if (ratio >= 0.75) return '#10B981'; // green
    if (ratio >= 0.60) return '#4B5563'; // dark gray
    if (ratio >= 0.50) return '#F59E0B'; // amber
    return '#EF4444'; // red
};

const formatScore = (score: number | null, max: number) => {
    if (score === null || score === undefined) {
        return (
            <span className="font-mono text-[14px] text-[#9CA3AF]">
                — <span className="text-[12px]">/ {max}</span>
            </span>
        );
    }
    return (
        <span className="font-mono text-[14px] font-semibold" style={{ color: getScoreColor(score, max) }}>
            {score} <span className="text-[12px] text-[#9CA3AF] font-normal">/ {max}</span>
        </span>
    );
};

const OutlineBadge = ({ children, color }: any) => {
    const styles: Record<string, string> = {
        green: 'text-[#10B981] border-[#10B981]',
        amber: 'text-[#F59E0B] border-[#F59E0B]',
        red: 'text-[#EF4444] border-[#EF4444]',
        blue: 'text-[#1A56DB] border-[#1A56DB]',
        gray: 'text-[#6B7280] border-[#9CA3AF]',
        darkgreen: 'text-[#065F46] border-[#065F46]'
    };
    return (
        <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-bold border font-outfit uppercase tracking-wider ${styles[color] || styles.gray}`}>
            {children}
        </span>
    );
};

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

const InternalExternalMarks = () => {
    const [selectedSem, setSelectedSem] = useState('6');
    const [activeTab, setActiveTab] = useState('Overview');
    const [isExporting, setIsExporting] = useState(false);
    const [expandedRows, setExpandedRows] = useState<string[]>([]);
    const tabRef = useRef<HTMLDivElement>(null);
    const [tabIndicator, setTabIndicator] = useState({ left: 0, width: 0 });

    const tabs = ['Overview', 'Mid Marks', 'Weekly Tests', 'Lab Internals', 'Other Credits', 'External Marks'];

    useEffect(() => {
        const activeTabEl = document.getElementById(`tab-${activeTab}`);
        if (activeTabEl && tabRef.current) {
            const rect = activeTabEl.getBoundingClientRect();
            const parentRect = tabRef.current.getBoundingClientRect();
            setTabIndicator({
                left: rect.left - parentRect.left,
                width: rect.width
            });
        }
    }, [activeTab]);

    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => setIsExporting(false), 2000);
    };

    const toggleRow = (id: string) => {
        setExpandedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
    };

    return (
        <StudentLayout activePage="internal" onNavigate={() => {}}>
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="max-w-[1400px] mx-auto px-7 pb-20 space-y-6"
            >
                {/* PAGE HEADER */}
                <div className="flex justify-between items-end pb-5 border-b border-[#F3F4F6]">
                    <div>
                        <h1 className="text-[24px] font-fraunces font-light italic text-[#111827]">Internal & External Marks</h1>
                        <p className="mt-1 text-[13px] font-outfit text-[#6B7280]">Complete marks history · Semester 1 through Semester 6</p>
                        <p className="mt-1 text-[11px] font-outfit text-[#9CA3AF]">Last updated: Today, 9:41 AM</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <select 
                                value={selectedSem} onChange={(e) => setSelectedSem(e.target.value)}
                                className="h-10 pl-4 pr-10 bg-white border border-[#E5E7EB] rounded-lg text-[13px] font-medium font-outfit appearance-none focus:ring-2 focus:ring-[#1A56DB]/10 focus:border-[#1A56DB] cursor-pointer"
                            >
                                <option value="all">All Semesters</option>
                                <option value="4">Semester 4</option>
                                <option value="5">Semester 5</option>
                                <option value="6">Semester 6 (Current)</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
                        </div>
                        <button 
                            onClick={handleExport}
                            disabled={isExporting}
                            className="h-10 px-4 bg-white border border-[#E5E7EB] rounded-lg text-[13px] font-medium font-outfit text-[#374151] flex items-center gap-2 hover:bg-[#F9FAFB] active:scale-95 transition-all"
                        >
                            {isExporting ? <RefreshCw size={16} className="animate-spin text-[#1A56DB]" /> : <Download size={16} />}
                            {isExporting ? 'Generating...' : 'Export PDF'}
                        </button>
                    </div>
                </div>

                {/* STAT CARDS (Identical to original) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <StatCard label="OVERALL INTERNAL MARKS" value="199 / 280" sub="Total recorded this semester" trend="↑ +12 vs Sem 5" color="#1A56DB" icon={BarChart2} />
                    <StatCard label="BEST ASSESSMENT TYPE" labelVal="Lab" score="86 / 100 total" sub="Consistently above avg" trend="Above avg" color="#10B981" icon={TrendingUp} />
                    <StatCard label="NEEDS IMPROVEMENT" labelVal="Weekly" score="59 / 80 total" sub="3 declining weeks in CS603" trend="Below avg" color="#F59E0B" icon={AlertTriangle} />
                    <StatCard label="TOTAL CREDITS" value="130" sub="of 180 required · 72%" trend="50 remaining" color="#7C3AED" icon={Award} />
                </div>

                {/* MAIN CONTENT CARD */}
                <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[600px]">
                    <div ref={tabRef} className="h-12 bg-[#F9FAFB] border-b border-[#F3F4F6] px-6 flex items-center relative">
                        {tabs.map(tab => (
                            <button 
                                key={tab} id={`tab-${tab}`}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 h-full text-[13px] font-medium font-outfit transition-all relative z-10 ${activeTab === tab ? 'text-[#1A56DB]' : 'text-[#9CA3AF] hover:text-[#6B7280]'}`}
                            >
                                {tab}
                            </button>
                        ))}
                        <motion.div 
                            className="absolute bottom-0 h-0.5 bg-[#1A56DB]"
                            animate={{ left: tabIndicator.left, width: tabIndicator.width }}
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                    </div>

                    <div className="p-0 overflow-x-auto custom-scrollbar">
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={activeTab}
                                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="w-full"
                            >
                                {activeTab === 'Overview' && <OverviewTab theory={MARKS_DATA.theory} labs={MARKS_DATA.labs} expanded={expandedRows} onToggle={toggleRow} />}
                                {activeTab === 'Mid Marks' && <MidMarksTab theory={MARKS_DATA.theory} />}
                                {activeTab === 'Weekly Tests' && <WeeklyTestsTab data={MARKS_DATA.theory} />}
                                {activeTab === 'Lab Internals' && <LabInternalsTab labs={MARKS_DATA.labs} />}
                                {activeTab === 'Other Credits' && <OtherCreditsTab credits={MARKS_DATA.otherCredits} />}
                                {activeTab === 'External Marks' && <ExternalMarksTab externals={MARKS_DATA.externals} />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* PERFORMANCE INSIGHTS (Identical to original) */}
                <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm">
                    <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center">
                        <div className="flex items-center gap-2 text-[14px] font-semibold text-[#111827] font-outfit">
                            <Star size={16} className="text-[#F59E0B]" />
                            <span>Performance insights</span>
                        </div>
                        <span className="text-[11px] text-[#9CA3AF] italic">Auto-generated from your marks</span>
                    </div>
                    <div className="p-6 overflow-x-auto custom-scrollbar flex gap-4 pb-8">
                        <InsightCard type="star" title="Best semester: Semester 4" body="SGPA 9.0 · Your strongest across all seasons. Highly consistent performance." color="green" />
                        <InsightCard type="trend" title="Weekly concern: CS603" body="Declined 3 consecutive weeks in Weekly tests. Topic 'SQL Normalization' may need review." color="amber" />
                        <InsightCard type="flask" title="Lab is your strength" body="Average 21.2 / 25 across labs vs class avg 18.2. Strong practical command." color="teal" />
                        <InsightCard type="target" title="Target for A+: CS602" body="Need 46 / 60 in End Sem to achieve A+ grade. Achievable with current internals." color="violet" />
                    </div>
                </div>
            </motion.div>
        </StudentLayout>
    );
};

// ═══════════════════════════════════════════════════════════════
// SUB COMPONENTS
// ═══════════════════════════════════════════════════════════════

const StatCard = ({ label, value, labelVal, score, sub, trend, color, icon: Icon }: any) => (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all group" style={{ borderLeft: `3px solid ${color}` }}>
        <div className="w-10 h-10 mb-4 rounded-xl flex items-center justify-center bg-[#F3F4F6]">
            <Icon size={20} style={{ color }} />
        </div>
        <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider font-outfit">{label}</p>
        <div className="mt-1">
            {value ? (
                <span className="text-[32px] font-mono font-bold text-[#111827]">{value}</span>
            ) : (
                <div className="flex flex-col">
                    <span className="text-[24px] font-bold text-[#111827] font-outfit">{labelVal}</span>
                    <span className="text-[14px] font-mono font-semibold" style={{ color }}>{score}</span>
                </div>
            )}
        </div>
        <p className="text-[12px] text-[#6B7280] font-outfit mt-1">{sub || 'Semester 6 performance'}</p>
        <div className="mt-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold border font-outfit uppercase tracking-wider
                ${trend.includes('Above') || trend.includes('↑') ? 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]' : trend.includes('Below') ? 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]' : 'bg-[#F9FAFB] text-[#4B5563] border-[#E5E7EB]'}`}>
                {trend}
            </span>
        </div>
    </div>
);

// TAB 1: OVERVIEW
const OverviewTab = ({ theory, labs, expanded, onToggle }: any) => {
    let tW = 0, tM1 = 0, tM2 = 0, tExt = 0;
    theory.forEach((s: any) => {
        tW += s.overview.w; tM1 += s.overview.m1; 
        if(s.overview.m2) tM2 += s.overview.m2; tExt += s.overview.ext;
    });

    return (
        <div className="w-full">
            <table className="w-full text-left border-collapse min-w-[900px]">
                <thead className="bg-[#F9FAFB] border-b-2 border-[#E5E7EB] sticky top-0 z-10">
                    <tr className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider h-10">
                        <th className="px-6 py-2">Subject</th>
                        <th className="px-6 py-2 text-right">Weekly <span className="text-[#9CA3AF]">(10)</span></th>
                        <th className="px-6 py-2 text-right">Mid-1 <span className="text-[#9CA3AF]">(25)</span></th>
                        <th className="px-6 py-2 text-right">Mid-2 <span className="text-[#9CA3AF]">(25)</span></th>
                        <th className="px-6 py-2 text-right">External <span className="text-[#9CA3AF]">(70)</span></th>
                        <th className="px-6 py-2 text-right border-l border-[#E5E7EB]">CGPA <span className="text-[#9CA3AF]">(10)</span></th>
                        <th className="px-6 py-2 text-center">Grade</th>
                        <th className="px-6 py-2 text-center">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F4F6]">
                    {theory.map((s: any) => {
                        const isPass = s.overview.status === 'PASS';
                        const cg = s.overview.cgpa;
                        const cgColor = cg >= 9.0 ? '#10B981' : cg >= 7.0 ? '#4B5563' : cg >= 6.0 ? '#F59E0B' : '#EF4444';
                        return (
                            <React.Fragment key={s.code}>
                                <tr hover-effect="true" onClick={() => onToggle(s.code)} className="h-[52px] hover:bg-[#F9FAFB] cursor-pointer transition-colors border-b border-[#E5E7EB]">
                                    <td className="px-6">
                                        <div className="flex flex-col"><span className="text-[11px] font-mono text-[#9CA3AF] leading-none mb-1">{s.code}</span><span className="text-[14px] font-bold text-[#111827]">{s.name}</span></div>
                                    </td>
                                    <td className="px-6 text-right">{formatScore(s.overview.w, 10)}</td>
                                    <td className="px-6 text-right">{formatScore(s.overview.m1, 25)}</td>
                                    <td className="px-6 text-right">{formatScore(s.overview.m2, 25)}</td>
                                    <td className="px-6 text-right">{formatScore(s.overview.ext, 70)}</td>
                                    <td className="px-6 text-right border-l border-[#F3F4F6]"><span className="font-mono text-[14px] font-bold" style={{color: cgColor}}>{cg.toFixed(1)} <span className="text-[12px] text-[#9CA3AF] font-normal">/ 10</span></span></td>
                                    <td className="px-6 text-center"><OutlineBadge color={s.overview.grade === 'S' ? 'darkgreen' : s.overview.grade === 'A' ? 'green' : s.overview.grade === 'B' ? 'blue' : s.overview.grade === 'C' ? 'gray' : 'amber'}>{s.overview.grade === 'S' ? 'Top' : s.overview.grade === 'E' ? 'Low' : s.overview.grade}</OutlineBadge></td>
                                    <td className="px-6 text-center"><OutlineBadge color={isPass ? 'green' : 'red'}>{isPass ? 'PASS' : 'FAIL'}</OutlineBadge></td>
                                </tr>
                                <AnimatePresence>
                                    {expanded.includes(s.code) && (
                                        <tr><td colSpan={8} className="p-0 border-none bg-[#F9FAFB]"><motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="pl-[160px] pr-6 py-4 flex items-center gap-6"><span className="text-[11px] font-bold text-[#6B7280] uppercase">Weekly Breakdown:</span><div className="flex items-center gap-3">
                                            {s.w.map((w: any, idx: number) => (
                                                <div key={idx} className="flex gap-2 items-center"><span className="text-[12px] font-mono text-[#9CA3AF]">W{idx+1}</span><span className="text-[13px] font-mono font-semibold text-[#374151]">{w.s !== null ? w.s : '—'}</span>{idx < 4 && <div className="w-[1px] h-3 bg-[#D1D5DB]" />}</div>
                                            ))}
                                        </div></div></motion.div></td></tr>
                                    )}
                                </AnimatePresence>
                            </React.Fragment>
                        );
                    })}
                </tbody>
                <tfoot className="bg-[#F9FAFB] border-t-2 border-[#E5E7EB]">
                    <tr className="h-12">
                        <td className="px-6 text-[12px] font-bold text-[#374151] uppercase tracking-wider">Semester 6 Totals</td>
                        <td className="px-6 text-right font-mono font-bold text-[#111827]">{tW} <span className="text-[12px] text-[#9CA3AF] font-normal">/ 50</span></td>
                        <td className="px-6 text-right font-mono font-bold text-[#111827]">{tM1} <span className="text-[12px] text-[#9CA3AF] font-normal">/ 125</span></td>
                        <td className="px-6 text-right font-mono font-bold text-[#111827]">{tM2} <span className="text-[12px] text-[#9CA3AF] font-normal">/ 100</span></td>
                        <td className="px-6 text-right font-mono font-bold text-[#111827]">{tExt} <span className="text-[12px] text-[#9CA3AF] font-normal">/ 350</span></td>
                        <td colSpan={3}></td>
                    </tr>
                </tfoot>
            </table>

            <div className="mt-6 p-6 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] flex justify-between items-center shadow-sm">
                <span className="text-[14px] font-bold text-[#111827] font-outfit">Total CGPA</span>
                <div className="flex flex-col items-end">
                    <span className="font-mono text-[28px] font-bold text-[#111827] leading-none">8.02 <span className="text-[#9CA3AF] text-[20px]">/ 10</span></span>
                    <span className="text-[12px] text-[#6B7280] font-outfit mt-1">Calculated across all 5 subjects · Semester 6</span>
                </div>
            </div>

            <div className="mt-8"><div className="px-6 py-2 bg-[#F3F4F6] border-y border-[#E5E7EB] text-[11px] font-bold text-[#4B5563] uppercase tracking-wider">Lab Subjects</div>
                <table className="w-full text-left border-collapse min-w-[900px]"><thead className="bg-white border-b border-[#E5E7EB]"><tr className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider h-10">
                    <th className="px-6 py-2">Subject</th>
                    <th className="px-6 py-2 text-right">Lab Record <span className="text-[#9CA3AF]">(5)</span></th>
                    <th className="px-6 py-2 text-right">Viva-Voce <span className="text-[#9CA3AF]">(5)</span></th>
                    <th className="px-6 py-2 text-right">Program Exec <span className="text-[#9CA3AF]">(10)</span></th>
                    <th className="px-6 py-2 text-right">Written Test <span className="text-[#9CA3AF]">(10)</span></th>
                    <th className="px-6 py-2 text-right border-l border-[#E5E7EB]">Total <span className="text-[#9CA3AF]">(30)</span></th>
                    <th className="px-6 py-2 text-center">Status</th>
                </tr></thead><tbody className="divide-y divide-[#F3F4F6]">{labs.map((l: any) => {
                    const lTotal = l.iRec + l.iViva + l.iExec + l.iTest;
                    return (
                        <tr key={l.code} className="h-[52px] hover:bg-[#F9FAFB] transition-colors"><td className="px-6"><div className="flex flex-col"><span className="text-[11px] font-mono text-[#9CA3AF] leading-none mb-1">{l.code}</span><span className="text-[14px] font-bold text-[#111827]">{l.name}</span></div></td>
                        <td className="px-6 text-right">{formatScore(l.iRec, 5)}</td>
                        <td className="px-6 text-right">{formatScore(l.iViva, 5)}</td>
                        <td className="px-6 text-right">{formatScore(l.iExec, 10)}</td>
                        <td className="px-6 text-right">{formatScore(l.iTest, 10)}</td>
                        <td className="px-6 text-right border-l border-[#F3F4F6]"><span className="font-mono text-[14px] font-bold text-[#111827]">{lTotal} <span className="text-[12px] text-[#9CA3AF] font-normal">/ 30</span></span></td>
                        <td className="px-6 text-center"><OutlineBadge color="green">PASS</OutlineBadge></td></tr>
                    )
                })}</tbody></table>
            </div>
        </div>
    );
};

// TAB 2: MID MARKS
const MidMarksTab = ({ theory }: any) => {
    const renderSection = (title: string, midKey: string) => {
        let sumPA = 0, sumPB = 0, sumTot = 0, maxPA = 0, maxPB = 0, maxTot = 0;
        theory.forEach((s:any) => {
            if(s[midKey].pa !== null) {
                sumPA += s[midKey].pa; sumPB += s[midKey].pb; sumTot += s[midKey].t;
                maxPA += 10; maxPB += 30; maxTot += 40;
            }
        });

        return (
            <div className="mb-8 last:mb-0">
                <div className="pl-6 py-3 bg-[#F9FAFB] border-b-2 border-[#E5E7EB] text-[12px] font-bold text-[#374151] uppercase tracking-wider">
                    {title}
                </div>
                <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead className="bg-white border-b border-[#E5E7EB]">
                        <tr className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider h-10">
                            <th className="px-6 py-2">Subject</th>
                            <th className="px-6 py-2 text-right">Part-A <span className="text-[#9CA3AF]">(10)</span></th>
                            <th className="px-6 py-2 text-right">Part-B <span className="text-[#9CA3AF]">(30)</span></th>
                            <th className="px-6 py-2 text-right border-l border-[#F3F4F6]">Scored <span className="text-[#9CA3AF]">(40)</span></th>
                            <th className="px-6 py-2 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3F4F6]">
                        {theory.map((s: any) => {
                            const isSched = s[midKey].st === 'Scheduled';
                            const scoreC = s[midKey].t >= 32 ? '#10B981' : s[midKey].t >= 24 ? '#4B5563' : s[midKey].t >= 20 ? '#F59E0B' : '#EF4444';
                            return (
                                <tr key={s.code} className="h-[52px] hover:bg-[#F9FAFB] transition-colors">
                                    <td className="px-6">
                                        <div className="flex flex-col"><span className="text-[11px] font-mono text-[#9CA3AF] leading-none mb-1">{s.code}</span><span className="text-[14px] font-bold text-[#111827]">{s.name}</span></div>
                                    </td>
                                    <td className="px-6 text-right font-mono text-[14px] text-[#374151]">{isSched ? <span className="text-[#9CA3AF]">—</span> : s[midKey].pa}</td>
                                    <td className="px-6 text-right font-mono text-[14px] text-[#374151]">{isSched ? <span className="text-[#9CA3AF]">—</span> : s[midKey].pb}</td>
                                    <td className="px-6 text-right font-mono text-[14px] font-bold border-l border-[#F3F4F6]" style={{color: isSched ? '#9CA3AF' : scoreC}}>{isSched ? '—' : s[midKey].t}</td>
                                    <td className="px-6 text-center">{isSched ? <OutlineBadge color="gray">Scheduled</OutlineBadge> : <OutlineBadge color={s[midKey].t >= 16 ? 'green' : 'red'}>{s[midKey].st}</OutlineBadge>}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot className="bg-[#F9FAFB] border-t-2 border-[#E5E7EB]">
                        <tr className="h-[48px]">
                            <td className="px-6 text-[12px] font-bold text-[#374151] uppercase tracking-wider text-left">Total Marks — All Subjects</td>
                            <td className="px-6 text-right font-mono font-bold text-[#111827]">{sumPA} <span className="text-[12px] font-normal text-[#9CA3AF]">/ {maxPA}</span></td>
                            <td className="px-6 text-right font-mono font-bold text-[#111827]">{sumPB} <span className="text-[12px] font-normal text-[#9CA3AF]">/ {maxPB}</span></td>
                            <td className="px-6 text-right border-l border-[#F3F4F6] font-mono font-bold text-[#111827]">{sumTot} <span className="text-[12px] font-normal text-[#9CA3AF]">/ {maxTot}</span></td>
                            <td className="px-6"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    };

    return (
        <div className="w-full">
            {renderSection('Mid Examination 1', 'm1')}
            <div className="w-full h-[1px] bg-[#E5E7EB] my-2"></div>
            {renderSection('Mid Examination 2', 'm2')}
        </div>
    );
};

// TAB 3: WEEKLY TESTS
const WeeklyTestsTab = ({ data }: any) => {
    return (
        <div className="w-full">
            {data.map((s: any, idx: number) => {
                let subTot = 0; let presentCount = 0;
                s.w.forEach((t:any) => { 
                    if(t.s !== null) { subTot += t.s; presentCount++; }
                });
                const avg = presentCount > 0 ? (subTot / presentCount).toFixed(1) : 0;
                const dates = ['22 Jan', '29 Jan', '05 Feb', '12 Feb', '19 Feb'];

                return (
                    <div key={s.code} className="pb-8 border-b border-[#E5E7EB] mb-8 last:mb-0 last:border-0 last:pb-0">
                        <div className="px-6 py-4 flex flex-col bg-[#F9FAFB] border border-[#E5E7EB] rounded-t-xl border-b-0">
                            <span className="text-[11px] font-mono text-[#9CA3AF] mb-1">{s.code}</span>
                            <span className="text-[14px] font-bold text-[#111827]">{s.name}</span>
                        </div>
                        <div className="overflow-x-auto border border-[#E5E7EB] rounded-b-xl border-t-0">
                            <table className="w-full text-left border-collapse min-w-[700px]">
                                <thead className="bg-white border-b border-[#E5E7EB]">
                                    <tr className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider h-10">
                                        <th className="px-6 py-2">Week</th>
                                        <th className="px-6 py-2">Date</th>
                                        <th className="px-6 py-2">Attempt</th>
                                        <th className="px-6 py-2 text-right">Max</th>
                                        <th className="px-6 py-2 text-right">Scored</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F3F4F6]">
                                    {s.w.map((t: any, wIdx: number) => {
                                        const c = t.s >= 8 ? '#10B981' : t.s >= 6 ? '#4B5563' : t.s >= 5 ? '#F59E0B' : '#EF4444';
                                        return (
                                            <tr key={wIdx} className="h-[48px] hover:bg-[#F9FAFB] transition-colors">
                                                <td className="px-6 text-[13px] font-mono text-[#374151]">W{wIdx+1}</td>
                                                <td className="px-6 text-[13px] font-mono text-[#6B7280]">{dates[wIdx]}</td>
                                                <td className="px-6 flex items-center h-[48px] gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${t.a === 'Present' ? 'bg-[#10B981]' : 'bg-[#EF4444]'}`}></div>
                                                    <span className="text-[13px] text-[#374151] font-medium font-outfit">{t.a}</span>
                                                </td>
                                                <td className="px-6 text-right text-[13px] font-mono text-[#9CA3AF]">{t.a === 'Absent' ? '—' : '10'}</td>
                                                <td className="px-6 text-right font-mono text-[14px] font-bold" style={{color: t.a === 'Absent' ? '#9CA3AF' : c}}>
                                                    {t.a === 'Absent' ? '—' : t.s}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                                <tfoot className="bg-[#F9FAFB] border-t border-[#E5E7EB]">
                                    <tr className="h-[44px]">
                                        <td colSpan={4} className="px-6 text-right text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Average</td>
                                        <td className="px-6 text-right font-mono font-bold text-[#111827]">{avg}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// TAB 4: LAB INTERNALS
const LabInternalsTab = ({ labs }: any) => (
    <div className="p-6 space-y-6 w-full">
        {labs.map((l: any) => {
            const intTot = l.iRec + l.iViva + l.iExec + l.iTest;
            const extTot = l.eRec + l.eViva + l.eExec + l.eTest;
            const grandTot = intTot + extTot;
            return (
                <div key={l.code} className="border border-[#E5E7EB] rounded-2xl overflow-hidden bg-white shadow-sm">
                    <div className="px-6 py-4 border-b border-[#E5E7EB] bg-[#F9FAFB] flex flex-col">
                        <span className="text-[11px] font-mono text-[#9CA3AF] mb-1">{l.code}</span>
                        <span className="text-[15px] font-bold text-[#111827]">{l.name}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                        {/* Internal */}
                        <div className="border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm flex flex-col bg-white">
                            <div className="px-5 py-4 text-[11px] font-bold text-[#4B5563] uppercase tracking-wider border-b border-[#E5E7EB] bg-[#F3F4F6] flex justify-between">
                                <span>Internal Assessment</span>
                                <span>Max: 30</span>
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-[#F9FAFB]">
                                    <tr className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-wider h-8">
                                        <th className="px-5 font-outfit">Component</th>
                                        <th className="px-5 text-right font-outfit text-[#9CA3AF]">Max</th>
                                        <th className="px-5 text-right font-outfit text-[#9CA3AF]">Scored</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { name: 'Lab Record', max: 5, score: l.iRec },
                                        { name: 'Viva-Voce', max: 5, score: l.iViva },
                                        { name: 'Program Execution', max: 10, score: l.iExec },
                                        { name: 'Written Test', max: 10, score: l.iTest }
                                    ].map((c: any, i: number) => {
                                        const r = c.score / c.max;
                                        const col = r >= 0.8 ? '#10B981' : r >= 0.6 ? '#4B5563' : r >= 0.5 ? '#F59E0B' : '#EF4444';
                                        return (
                                        <tr key={i} className="h-10 hover:bg-[#F9FAFB]">
                                            <td className="px-5 text-[13px] text-[#374151] font-outfit">{c.name}</td>
                                            <td className="px-5 text-right text-[13px] font-mono text-[#9CA3AF]">{(c.max).toString().padStart(2, '0')}</td>
                                            <td className="px-5 text-right font-mono text-[14px] font-bold" style={{color: col}}>{c.score}</td>
                                        </tr>
                                    )})}
                                </tbody>
                            </table>
                            <div className="mt-auto px-5 py-3 border-t border-[#E5E7EB] flex justify-between items-center bg-[#F9FAFB]">
                                <span className="text-[12px] text-[#374151] font-bold font-outfit uppercase tracking-wider">Internal Total</span>
                                <div className="flex gap-4 items-center">
                                    <span className="text-[15px] font-mono font-bold text-[#111827]">{intTot} <span className="text-[#9CA3AF] text-[12px] font-normal">/ 30</span></span>
                                </div>
                            </div>
                        </div>

                        {/* External */}
                        <div className="border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm flex flex-col bg-white">
                            <div className="px-5 py-4 text-[11px] font-bold text-[#4B5563] uppercase tracking-wider border-b border-[#E5E7EB] bg-[#F3F4F6] flex justify-between">
                                <span>External Assessment</span>
                                <span>Max: 70</span>
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-[#F9FAFB]">
                                    <tr className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-wider h-8">
                                        <th className="px-5 font-outfit">Component</th>
                                        <th className="px-5 text-right font-outfit text-[#9CA3AF]">Max</th>
                                        <th className="px-5 text-right font-outfit text-[#9CA3AF]">Scored</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { name: 'Lab Record', max: 10, score: l.eRec },
                                        { name: 'Viva-Voce', max: 10, score: l.eViva },
                                        { name: 'Program Execution', max: 30, score: l.eExec },
                                        { name: 'Written Test', max: 20, score: l.eTest }
                                    ].map((c: any, i: number) => {
                                        const r = c.score / c.max;
                                        const col = r >= 0.8 ? '#10B981' : r >= 0.6 ? '#4B5563' : r >= 0.5 ? '#F59E0B' : '#EF4444';
                                        return (
                                        <tr key={i} className="h-10 hover:bg-[#F9FAFB]">
                                            <td className="px-5 text-[13px] text-[#374151] font-outfit">{c.name}</td>
                                            <td className="px-5 text-right text-[13px] font-mono text-[#9CA3AF]">{(c.max).toString().padStart(2, '0')}</td>
                                            <td className="px-5 text-right font-mono text-[14px] font-bold" style={{color: col}}>{c.score}</td>
                                        </tr>
                                    )})}
                                </tbody>
                            </table>
                            <div className="mt-auto px-5 py-3 border-t border-[#E5E7EB] flex justify-between items-center bg-[#F9FAFB]">
                                <span className="text-[12px] text-[#374151] font-bold font-outfit uppercase tracking-wider">External Total</span>
                                <div className="flex gap-4 items-center">
                                    <span className="text-[15px] font-mono font-bold text-[#111827]">{extTot} <span className="text-[#9CA3AF] text-[12px] font-normal">/ 70</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-4 border-t border-[#E5E7EB] bg-white flex justify-end items-center">
                        <span className="text-[16px] font-mono font-bold text-[#111827]">Lab Grand Total: {grandTot} <span className="text-[12px] text-[#9CA3AF] font-normal font-outfit">/ 100</span></span>
                    </div>
                </div>
            )
        })}
    </div>
);

// TAB 5: OTHER CREDITS
const OtherCreditsTab = ({ credits }: any) => {
    let totScore = 0, totMax = 0;
    credits.forEach((c:any) => { if(c.score !== null) totScore += c.score; totMax += c.max; });

    return (
        <div className="w-full">
            <table className="w-full text-left border-collapse min-w-[700px]">
                <thead className="bg-[#F9FAFB] border-b-2 border-[#E5E7EB]">
                    <tr className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider h-10">
                        <th className="px-6 py-2">Activity</th>
                        <th className="px-6 py-2">Type</th>
                        <th className="px-6 py-2 text-right">Submitted On</th>
                        <th className="px-6 py-2 text-right">Max</th>
                        <th className="px-6 py-2 text-right">Credited</th>
                        <th className="px-6 py-2 text-right">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F4F6]">
                    {credits.map((c: any, i: number) => (
                        <tr key={i} className="h-[52px] hover:bg-[#F9FAFB] transition-colors">
                            <td className="px-6 font-semibold text-[14px] text-[#111827]">{c.activity}</td>
                            <td className="px-6"><OutlineBadge color="gray">{c.type}</OutlineBadge></td>
                            <td className="px-6 text-right font-mono text-[12px] text-[#6B7280]">{c.date}</td>
                            <td className="px-6 text-right font-mono text-[13px] text-[#9CA3AF]">{c.max}</td>
                            <td className="px-6 text-right">
                                {c.score === null ? <span className="font-mono text-[#9CA3AF]">—</span> : <span className="font-mono text-[14px] font-bold text-[#111827]">{c.score}</span>}
                            </td>
                            <td className="px-6 text-right">
                                <OutlineBadge color={c.status === 'Credited' ? 'green' : c.status === 'Pending' ? 'amber' : 'red'}>{c.status}</OutlineBadge>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot className="bg-[#F9FAFB] border-t border-[#E5E7EB]">
                    <tr className="h-[52px]">
                        <td colSpan={4} className="px-6 text-right text-[12px] font-bold text-[#374151] uppercase tracking-wider">Total Credits Earned</td>
                        <td className="px-6 text-right font-mono font-bold text-[#111827]">{totScore} <span className="text-[12px] text-[#9CA3AF] font-normal">/ {totMax}</span></td>
                        <td className="px-6"></td>
                    </tr>
                </tfoot>
            </table>
            <div className="px-6 py-4 text-[13px] italic text-[#9CA3AF]">
                Credits contribute to internal assessment. Contact faculty for disputes.
            </div>
        </div>
    );
};

// TAB 6: EXTERNAL MARKS
const ExternalMarksTab = ({ externals }: any) => (
    <div className="w-full">
        <div className="bg-[#EFF6FF] px-6 py-4 border-b border-[#BFDBFE] text-[13px] text-[#1E40AF]">
            Semester 6 End-Semester exams are scheduled. Results will appear here after publication.
        </div>
        {externals.map((sem: any) => (
            <div key={sem.sem} className="border-b border-[#E5E7EB] last:border-0">
                <div className="px-6 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB] flex gap-6 text-[12px] font-bold text-[#374151] uppercase tracking-wider">
                    <span>Semester {sem.sem}</span>
                    <span className="text-[#6B7280]">|</span>
                    <span>SGPA: {sem.sgpa.toFixed(1)}</span>
                    <span className="text-[#6B7280]">|</span>
                    <span>Credits: {sem.credits}</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead className="bg-white border-b border-[#E5E7EB]">
                            <tr className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider h-10">
                                <th className="px-6 py-2">Subject</th>
                                <th className="px-6 py-2 text-right">Int <span className="text-[#9CA3AF]">(30)</span></th>
                                <th className="px-6 py-2 text-right">Ext <span className="text-[#9CA3AF]">(70)</span></th>
                                <th className="px-6 py-2 text-right border-l border-[#E5E7EB]">Total <span className="text-[#9CA3AF]">(100)</span></th>
                                <th className="px-6 py-2 text-center">Grade</th>
                                <th className="px-6 py-2 text-right">Result</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F3F4F6]">
                            {sem.subs.map((s: any, idx: number) => (
                                <tr key={idx} className="h-[52px] hover:bg-[#F9FAFB] transition-colors">
                                    <td className="px-6 font-bold text-[14px] text-[#111827]">{s.name}</td>
                                    <td className="px-6 text-right font-mono text-[14px] text-[#374151]">{s.int}</td>
                                    <td className="px-6 text-right font-mono text-[14px] font-bold text-[#111827]">{s.ext}</td>
                                    <td className="px-6 text-right border-l border-[#F3F4F6] font-mono text-[15px] font-bold text-[#1A56DB]">{s.int + s.ext}</td>
                                    <td className="px-6 text-center">
                                        <OutlineBadge color={['O'].includes(s.grade) ? 'darkgreen' : ['A+'].includes(s.grade) ? 'green' : ['A'].includes(s.grade) ? 'blue' : 'gray'}>{s.grade}</OutlineBadge>
                                    </td>
                                    <td className="px-6 text-right">
                                        <OutlineBadge color={s.res === 'PASS' ? 'green' : 'red'}>{s.res}</OutlineBadge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-[#F9FAFB] border-t border-[#E5E7EB]">
                            <tr className="h-[44px]">
                                <td className="px-6 text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Semester Total</td>
                                <td className="px-6 text-right font-mono text-[#9CA3AF]">—</td>
                                <td className="px-6 text-right font-mono text-[#9CA3AF]">—</td>
                                <td className="px-6 text-right border-l border-[#E5E7EB] font-mono font-bold text-[#111827]">
                                    {sem.subs.reduce((acc:any, s:any) => acc + s.int + s.ext, 0)} <span className="text-[12px] font-normal text-[#9CA3AF]">/ {sem.subs.length * 100}</span>
                                </td>
                                <td className="px-6 text-center font-bold text-[12px] text-[#374151] uppercase tracking-wider">SGPA: {sem.sgpa.toFixed(1)}</td>
                                <td className="px-6 text-right font-mono text-[#9CA3AF]">—</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        ))}
    </div>
);

// MINOR HELPERS
const InsightCard = ({ type, title, body, color }: any) => (
    <div className="min-w-[280px] bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs hover:shadow-lg transition-all flex flex-col" style={{ borderLeft: `4px solid ${color === 'green' ? '#10B981' : color === 'amber' ? '#F59E0B' : color === 'teal' ? '#0EA5E9' : '#8B5CF6'}` }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#F9FAFB] mb-4">
            {type === 'star' ? <Star size={20} className="text-[#F59E0B]" /> : type === 'trend' ? <TrendingDown size={20} className="text-[#EF4444]" /> : type === 'flask' ? <FlaskConical size={20} className="text-[#0EA5E9]" /> : <Target size={20} className="text-[#8B5CF6]" />}
        </div>
        <h4 className="text-[14px] font-bold text-[#111827] font-outfit mb-2">{title}</h4>
        <p className="text-[12px] text-[#6B7280] font-outfit leading-relaxed flex-1">{body}</p>
        <button className="mt-4 text-[12px] font-bold text-[#1A56DB] hover:underline text-left">View details →</button>
    </div>
);

export default InternalExternalMarks;
