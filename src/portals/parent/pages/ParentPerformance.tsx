import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParentAuth } from '../context/ParentContext';
import { subscribeToStudentMarks } from '../utils/parentFirestore';
import { 
  BarChart2, 
  TrendingUp, 
  AlertTriangle,
  Award,
  ChevronDown,
  LayoutGrid,
  List,
  ChevronRight,
  Filter,
  CheckCircle,
  Activity,
  Star,
  Download,
  AlertCircle
} from 'lucide-react';
import ParentSkeletonLoader from '../components/ParentSkeletonLoader';

const ParentPerformance: React.FC = () => {
    const { studentProfile, loading: contextLoading, activeStudentUID } = useParentAuth();
    const [loading, setLoading] = useState(true);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [marksData, setMarksData] = useState<any[]>([]);
    
    // View States
    const [viewType, setViewType] = useState<'grid' | 'table'>('grid');
    const [semester, setSemester] = useState('6');
    const [activeTab, setActiveTab] = useState('All');

    useEffect(() => {
        setPageLoaded(true);
        const studentId = studentProfile?.rollNo || studentProfile?.uid || activeStudentUID;

        if (!studentId) {
           if (!contextLoading) setLoading(false);
           return;
        }

        const unsub = subscribeToStudentMarks(studentId, `Semester ${semester}`, (marks) => {
            setMarksData(marks);
            setLoading(false);
        });

        return () => unsub();
    }, [studentProfile?.rollNo, studentProfile?.uid, activeStudentUID, contextLoading, semester]);

    // Data Processing for Grid
    const mappedSubjects = useMemo(() => {
        return marksData.map(m => {
            const rawPct = m.total ? (m.total / 100) * 100 : 0;
            return {
                code: m.subjectCode || 'UNK',
                name: m.subjectName || 'Subject',
                percentage: rawPct,
                status: rawPct >= 60 ? 'Safe' : 'Watch',
                color: rawPct >= 75 ? '#10B981' : rawPct >= 60 ? '#1A56DB' : '#EF4444',
                internal: m.internal || 0,
                external: m.external || 0,
                total: m.total || 0,
                grade: m.grade || '—'
            };
        });
    }, [marksData]);

    const overallPct = mappedSubjects.length > 0 
        ? mappedSubjects.reduce((acc, curr) => acc + curr.percentage, 0) / mappedSubjects.length 
        : 0;

    const riskSubjects = mappedSubjects.filter(s => s.status === 'Watch').length;

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
            variants={containerAnim}
            initial="hidden"
            animate={pageLoaded ? "show" : "hidden"}
            className="space-y-8 pb-16"
        >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-gray-200 dark:border-gray-800">
                <div>
                   <h1 className="text-[28px] font-fraunces font-light italic text-[#111827] dark:text-white">Marks Overview</h1>
                   <p className="mt-1 text-[14px] text-gray-500 dark:text-gray-400 font-outfit">
                      Monitoring academic progress for <span className="font-bold text-gray-900 dark:text-gray-200">{studentProfile?.name}</span>
                   </p>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-40">
                        <select 
                          value={semester}
                          onChange={(e) => setSemester(e.target.value)}
                          className="w-full h-11 pl-4 pr-10 bg-white border border-gray-200 rounded-xl text-[13px] font-bold font-outfit text-gray-700 active:scale-[0.98] transition-all cursor-pointer appearance-none shadow-sm"
                        >
                            {[1,2,3,4,5,6].map(s => (
                                <option key={s} value={s.toString()}>Semester {s}</option>
                            ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Top Stat Cards */}
            <motion.div variants={itemAnim} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatCard 
                    label="OVERALL AVG" 
                    value={`${overallPct.toFixed(1)}%`}
                    sub={`Based on ${mappedSubjects.length} subjects`}
                    trend="↑ Trending Up"
                    trendUp={true}
                    color={overallPct >= 75 ? '#10B981' : overallPct >= 60 ? '#1A56DB' : '#EF4444'}
                    icon={BarChart2}
                    iconBg="rgba(26,86,219,0.10)"
                    iconColor="#1A56DB"
                />
                <StatCard 
                    label="HIGHEST SUBJECT" 
                    value={mappedSubjects.length > 0 ? [...mappedSubjects].sort((a,b) => b.percentage - a.percentage)[0].code : '—'}
                    subValue={mappedSubjects.length > 0 ? `${[...mappedSubjects].sort((a,b) => b.percentage - a.percentage)[0].percentage}%` : null}
                    sub="Exceptional performance"
                    trend="Above Class"
                    trendUp={true}
                    color="#10B981"
                    icon={TrendingUp}
                    iconBg="rgba(16,185,129,0.10)"
                    iconColor="#10B981"
                />
                <StatCard 
                    label="AT RISK" 
                    value={riskSubjects.toString()}
                    sub="Subjects below 60%"
                    trend="Requires Attention"
                    trendUp={false}
                    color={riskSubjects > 0 ? '#EF4444' : '#10B981'}
                    icon={AlertTriangle}
                    iconBg={riskSubjects > 0 ? "rgba(239,68,68,0.10)" : "rgba(16,185,129,0.10)"}
                    iconColor={riskSubjects > 0 ? "#EF4444" : "#10B981"}
                    pulse={riskSubjects > 0}
                />
                <StatCard 
                    label="SEMESTER CGPA" 
                    value={overallPct > 0 ? (overallPct / 10).toFixed(2) : '0.00'}
                    sub="Estimated current SGPA"
                    trend="Consistent"
                    trendUp={true}
                    color="#1A56DB"
                    icon={Award}
                    iconBg="rgba(26,86,219,0.10)"
                    iconColor="#1A56DB"
                />
            </motion.div>

            {/* Tab Controls Navigation */}
            <motion.div variants={itemAnim} className="bg-white border border-gray-200 rounded-2xl p-2 flex justify-between items-center shadow-sm">
                <div className="flex gap-1 md:gap-2 overflow-x-auto custom-scrollbar">
                    {['All', 'Internal', 'External'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-xl text-[13px] font-bold font-outfit whitespace-nowrap transition-all
                                ${activeTab === tab ? 'bg-[#1A56DB] text-white shadow-md' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="hidden sm:flex bg-gray-50 border border-gray-200 rounded-xl p-1 gap-1">
                    <button 
                        onClick={() => setViewType('grid')}
                        className={`p-1.5 rounded-lg transition-all ${viewType === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <LayoutGrid size={18} />
                    </button>
                    <button 
                        onClick={() => setViewType('table')}
                        className={`p-1.5 rounded-lg transition-all ${viewType === 'table' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <List size={18} />
                    </button>
                </div>
            </motion.div>

            {/* Data Rendering */}
            <AnimatePresence mode="wait">
                {viewType === 'grid' ? (
                    <motion.div 
                        key="grid"
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    >
                        {mappedSubjects.map((sub, idx) => (
                             <SubjectGridCard key={sub.code} sub={sub} delay={0.2 + (idx * 0.05)} activeTab={activeTab} />
                        ))}
                        {mappedSubjects.length === 0 && (
                            <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-200 rounded-[2rem]">
                                <p className="text-gray-400 font-outfit font-medium italic">No marks currently published for this semester.</p>
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div 
                        key="table"
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: 10 }}
                    >
                        <SubjectTable mappedSubjects={mappedSubjects} activeTab={activeTab} />
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
};

// ═══════════════════════════════════════════════════════════════
// SUB COMPONENTS
// ═══════════════════════════════════════════════════════════════

const StatCard = ({ label, value, sub, subValue, trend, trendUp, color, icon: Icon, iconBg, iconColor, pulse }: any) => (
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

const SubjectGridCard = ({ sub, delay, activeTab }: any) => {
    // Logic to select which score is displayed prominently based on ActiveTab
    const renderScore = () => {
        if (activeTab === 'Internal') return { score: sub.internal, max: 25, label: 'Internal Assessment' };
        if (activeTab === 'External') return { score: sub.external, max: 75, label: 'End Semester' };
        return { score: sub.total, max: 100, label: 'Cumulative Total' };
    };

    const targetScore = renderScore();
    const pct = targetScore.max > 0 ? (targetScore.score / targetScore.max) * 100 : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            className="bg-white border border-gray-200 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col group p-6"
        >
            <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col">
                    <span className="text-[11px] font-black font-mono text-blue-500 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-lg w-fit mb-3">{sub.code}</span>
                    <h3 className="text-[18px] font-bold text-gray-900 font-outfit leading-tight line-clamp-2">{sub.name}</h3>
                </div>
                <div className="flex flex-col items-end shrink-0 ml-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider
                        ${sub.status === 'Safe' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-orange-50 text-orange-600 border border-orange-100 animate-pulse'}`}>
                        {sub.status}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 mt-2">GRADE: <span className="text-gray-900">{sub.grade}</span></span>
                </div>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-100">
                <div className="flex justify-between items-end mb-3">
                    <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">{targetScore.label}</span>
                    <span className="text-[24px] font-mono font-black tracking-tighter" style={{ color: sub.color }}>
                        {targetScore.score}<span className="text-[14px] text-gray-400">/{targetScore.max}</span>
                    </span>
                </div>
                
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden w-full relative shadow-inner">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
                        className="absolute left-0 top-0 bottom-0 rounded-full"
                        style={{ background: sub.color }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

const SubjectTable = ({ mappedSubjects, activeTab }: any) => {
    return (
        <div className="bg-white border border-gray-200 rounded-[2rem] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50/50 border-b-2 border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] font-outfit">Subject</th>
                            {(activeTab === 'All' || activeTab === 'Internal') && (
                                <th className="px-6 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] font-outfit">Internal (/25)</th>
                            )}
                            {(activeTab === 'All' || activeTab === 'External') && (
                                <th className="px-6 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] font-outfit">External (/75)</th>
                            )}
                            <th className="px-6 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] font-outfit">Total (/100)</th>
                            <th className="px-6 py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] font-outfit">Grade</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {mappedSubjects.length === 0 ? (
                            <tr><td colSpan={5} className="py-12 text-center text-gray-400 italic">No marks found</td></tr>
                        ) : mappedSubjects.map((sub: any, i: number) => (
                            <tr key={i} className="hover:bg-blue-50/30 transition-colors group">
                                <td className="px-6 py-5">
                                    <p className="text-[11px] font-mono font-bold text-gray-400 group-hover:text-blue-500 transition-colors">{sub.code}</p>
                                    <p className="text-[14px] font-bold text-gray-900 font-outfit mt-1">{sub.name}</p>
                                </td>
                                {(activeTab === 'All' || activeTab === 'Internal') && (
                                    <td className="px-6 py-5 text-right font-mono text-[14px] font-bold text-gray-600">{sub.internal}</td>
                                )}
                                {(activeTab === 'All' || activeTab === 'External') && (
                                    <td className="px-6 py-5 text-right font-mono text-[14px] font-bold text-gray-600">{sub.external}</td>
                                )}
                                <td className="px-6 py-5 text-right font-mono text-[16px] font-black text-blue-600 tracking-tighter">{sub.total}</td>
                                <td className="px-6 py-5 text-center">
                                    <span className="inline-flex w-10 h-10 items-center justify-center rounded-2xl bg-gray-50 border border-gray-200 font-bold font-outfit text-gray-900 group-hover:shadow-md transition-all">
                                        {sub.grade}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ParentPerformance;
