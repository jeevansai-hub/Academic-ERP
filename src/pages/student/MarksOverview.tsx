import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart2, TrendingUp, AlertTriangle, Award, 
  Download, ChevronDown, Filter, LayoutGrid, List,
  CheckCircle, ArrowUp, ArrowDown, X, Star, AlertCircle,
  TrendingDown, Minus, Info, Calendar, FileText, ClipboardList,
  Search, Bell, History, Activity, ExternalLink, ChevronLeft, ChevronRight,
  MoreVertical, RefreshCw
} from 'lucide-react';
import StudentLayout from '../../components/layout/StudentLayout';
import { studentInfo } from '../../data/studentData';

// ═══════════════════════════════════════════════════════════════
// MOCK DATA (As per specification)
// ═══════════════════════════════════════════════════════════════

const MARKS_DATA = {
  subjects: [
    { 
      code: 'EC601', name: 'Digital Circuits', percentage: 83.2, status: 'Safe', color: '#10B981', 
      assessments: [
        { type: 'Weekly Test', name: 'Weekly Test 1', score: 17, max: 20, avg: 16, date: '15 Jan 2026' },
        { type: 'Weekly Test', name: 'Weekly Test 2', score: 17, max: 20, avg: 16, date: '22 Jan 2026' },
        { type: 'Weekly Test', name: 'Weekly Test 3', score: 18, max: 20, avg: 16, date: '29 Jan 2026' },
        { type: 'Weekly Test', name: 'Weekly Test 4', score: 17, max: 20, avg: 16, date: '05 Feb 2026' },
        { type: 'Weekly Test', name: 'Weekly Test 5', score: 19, max: 20, avg: 17, date: '12 Feb 2026' },
        { type: 'Mid-semester', name: 'Mid-semester 1', score: 22, max: 30, avg: 19.1, date: '20 Feb 2026' },
        { type: 'Lab', name: 'Lab Assessment 1', score: 23, max: 25, avg: 21.9, date: '05 Mar 2026' }
      ]
    },
    { 
      code: 'CS602', name: 'Operating Systems', percentage: 77.3, status: 'Safe', color: '#1A56DB',
      assessments: [
        { type: 'Weekly Test', name: 'Weekly Test 1', score: 15, max: 20, avg: 15, date: '16 Jan 2026' },
        { type: 'Weekly Test', name: 'Weekly Test 2', score: 16, max: 20, avg: 15, date: '23 Jan 2026' },
        { type: 'Weekly Test', name: 'Weekly Test 3', score: 17, max: 20, avg: 16, date: '30 Jan 2026' },
        { type: 'Weekly Test', name: 'Weekly Test 4', score: 16, max: 20, avg: 15, date: '06 Feb 2026' },
        { type: 'Weekly Test', name: 'Weekly Test 5', score: 18, max: 20, avg: 16, date: '13 Feb 2026' },
        { type: 'Mid-semester', name: 'Mid-semester 1', score: 20, max: 30, avg: 18.2, date: '21 Feb 2026' },
        { type: 'Lab', name: 'Lab Assessment 1', score: 22, max: 25, avg: 20.8, date: '06 Mar 2026' }
      ]
    },
    { 
      code: 'CS603', name: 'Database Management Systems', percentage: 69.3, status: 'Watch', color: '#7C3AED',
      assessments: [
        { type: 'Weekly Test', name: 'Weekly Test 1', score: 18, max: 20, avg: 17, date: '17 Jan 2026' },
        { type: 'Weekly Test', name: 'Weekly Test 2', score: 16, max: 20, avg: 17, date: '24 Jan 2026' },
        { type: 'Weekly Test', name: 'Weekly Test 3', score: 15, max: 20, avg: 16, date: '31 Jan 2026' },
        { type: 'Weekly Test', name: 'Weekly Test 4', score: 14, max: 20, avg: 16, date: '07 Feb 2026' },
        { type: 'Weekly Test', name: 'Weekly Test 5', score: 14, max: 20, avg: 15, date: '14 Feb 2026' },
        { type: 'Mid-semester', name: 'Mid-semester 1', score: 18, max: 30, avg: 16.4, date: '22 Feb 2026' },
        { type: 'Lab', name: 'Lab Assessment 1', score: 20, max: 25, avg: 21.3, date: '07 Mar 2026' }
      ]
    },
    { 
      code: 'MA601', name: 'Engineering Mathematics', percentage: 60.0, status: 'Watch', color: '#F59E0B',
      assessments: [
        { type: 'Weekly Test', name: 'Weekly Test 1', score: 12, max: 20, avg: 14, date: '18 Jan 2026' },
        { type: 'Weekly Test', name: 'Weekly Test 2', score: 13, max: 20, avg: 14, date: '25 Jan 2026' },
        { type: 'Weekly Test', name: 'Weekly Test 4', score: 11, max: 20, avg: 13, date: '08 Feb 2026' },
        { type: 'Weekly Test', name: 'Weekly Test 5', score: 10, max: 20, avg: 13, date: '15 Feb 2026' }
      ]
    }
  ],
  overallRank: 23,
  totalStudents: 120,
  overallPercentage: 74.2,
  prevSemesterPercentage: 71.1
};

// ═══════════════════════════════════════════════════════════════
// HELPER COMPONENTS
// ═══════════════════════════════════════════════════════════════

const Badge = ({ children, color }: { children: React.ReactNode, color: string }) => {
  const styles: Record<string, string> = {
    green: 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]',
    red: 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]',
    amber: 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]',
    blue: 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]',
    violet: 'bg-[#F5F3FF] text-[#5B21B6] border-[#DDD6FE]',
    teal: 'bg-[#F0FDFA] text-[#0D9488] border-[#99F6E4]',
    gray: 'bg-[#F9FAFB] text-[#4B5563] border-[#E5E7EB]'
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${styles[color] || styles.gray} font-outfit`}>
      {children}
    </span>
  );
};

const ArcIndicator = ({ percentage, color, size = 56 }: { percentage: number, color: string, size?: number }) => {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="#F3F4F6" strokeWidth="4"
        />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[13px] font-mono font-bold" style={{ color }}>{Math.round(percentage)}%</span>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

const MarksOverview = () => {
  const [semester, setSemester] = useState('6');
  const [viewType, setViewType] = useState<'grid' | 'table'>('grid');
  const [isExporting, setIsExporting] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTypeTab, setActiveTypeTab] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedSubjectsFilter, setSelectedSubjectsFilter] = useState<string[]>([]);
  const [showSubjectFilter, setShowSubjectFilter] = useState(false);
  
  // Stagger layout animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06 }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }
  };

  const [showToast, setShowToast] = useState(false);
  
  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 2000);
  };

  const filteredSubjects = useMemo(() => {
    let result = MARKS_DATA.subjects;
    if (selectedSubjectsFilter.length > 0) {
      result = result.filter(s => selectedSubjectsFilter.includes(s.code));
    }
    return result;
  }, [selectedSubjectsFilter]);

  const allAssessments = useMemo(() => {
    let list: any[] = [];
    filteredSubjects.forEach(s => {
      s.assessments.forEach(a => {
        list.push({ ...a, subjectCode: s.code, subjectName: s.name });
      });
    });

    if (activeTypeTab !== 'All') {
      list = list.filter(a => a.type === activeTypeTab);
    }

    // Sorting logic
    if (sortOrder === 'newest') {
        // Mock sorting by date string
    }

    return list;
  }, [filteredSubjects, activeTypeTab, sortOrder]);

  return (
    <StudentLayout activePage="marks" onNavigate={() => {}}>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-[1400px] mx-auto px-7 pb-16 space-y-6"
      >
        {/* PAGE HEADER SECTION */}
        <div className="flex justify-between items-end pb-6 border-b border-[#F3F4F6]">
          <div>
            <h1 className="text-[24px] font-fraunces font-light italic text-[#111827]">Marks Overview</h1>
            <p className="mt-1 text-[13px] font-outfit text-[#6B7280]">
              All assessments across your enrolled subjects · Semester {semester}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select 
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="h-10 pl-3.5 pr-10 bg-white border border-[#E5E7EB] rounded-lg text-[13px] font-medium font-outfit text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#1A56DB]/10 focus:border-[#1A56DB] transition-all cursor-pointer"
              >
                {[1,2,3,4,5,6].map(s => (
                  <option key={s} value={s.toString()}>Semester {s} {s === 6 ? '(Current)' : ''}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
            </div>
            
            <button 
              onClick={handleExport}
              disabled={isExporting}
              className="h-10 px-4 bg-white border border-[#E5E7EB] rounded-lg text-[13px] font-medium font-outfit text-[#374151] flex items-center gap-2 hover:bg-[#F9FAFB] active:scale-95 transition-all"
            >
              {isExporting ? (
                <RefreshCw size={16} className="animate-spin text-[#1A56DB]" />
              ) : (
                <Download size={16} />
              )}
              {isExporting ? 'Generating...' : 'Export PDF'}
            </button>
          </div>
        </div>

        {/* SUMMARY STAT CARDS ROW */}
        <motion.div variants={itemAnim} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard 
                label="OVERALL PERCENTAGE" 
                value={`${MARKS_DATA.overallPercentage}%`}
                sub={`Across ${MARKS_DATA.subjects.length} subjects · Sem ${semester}`}
                trend="↑ +3.1% vs last semester"
                trendUp={true}
                color={MARKS_DATA.overallPercentage >= 75 ? '#10B981' : MARKS_DATA.overallPercentage >= 60 ? '#F59E0B' : '#EF4444'}
                icon={BarChart2}
                iconBg="rgba(26,86,219,0.10)"
                iconColor="#1A56DB"
            />
            <StatCard 
                label="HIGHEST SCORE" 
                value="EC601"
                subValue="83.2%"
                sub="Digital Circuits · Best performing"
                trend="Above class avg"
                trendUp={true}
                color="#10B981"
                icon={TrendingUp}
                iconBg="rgba(16,185,129,0.10)"
                iconColor="#10B981"
                isSubjectCode={true}
            />
            <StatCard 
                label="NEEDS ATTENTION" 
                value="2"
                sub="MA601 · CS603"
                trend="Action required"
                trendUp={false}
                color="#EF4444"
                icon={AlertTriangle}
                iconBg="rgba(239,68,68,0.10)"
                iconColor="#EF4444"
                pulse={true}
            />
            <StatCard 
                label="SEMESTER RANK" 
                value={MARKS_DATA.overallRank.toString()}
                sub={`out of ${MARKS_DATA.totalStudents} students · Dept rank`}
                trend="↑ +5 positions"
                trendUp={true}
                color="#1A56DB"
                icon={Award}
                iconBg="rgba(26,86,219,0.10)"
                iconColor="#1A56DB"
            />
        </motion.div>

        {/* FILTER AND VIEW CONTROLS BAR */}
        <motion.div variants={itemAnim} className="bg-white border border-[#E5E7EB] rounded-xl p-3 flex items-center gap-3 flex-wrap">
            <div className="relative">
                <button 
                  onClick={() => setShowSubjectFilter(!showSubjectFilter)}
                  className="h-9 px-3.5 border border-[#E5E7EB] rounded-lg text-[13px] font-medium font-outfit text-[#374151] flex items-center gap-2 hover:bg-[#F9FAFB] transition-all"
                >
                    <Filter size={14} className="text-[#9CA3AF]" />
                    {selectedSubjectsFilter.length === 0 ? 'All subjects' : `${selectedSubjectsFilter.length} subjects`}
                </button>
                <AnimatePresence>
                    {showSubjectFilter && (
                        <motion.div 
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          className="absolute top-11 left-0 w-64 bg-white border border-[#E5E7EB] rounded-xl shadow-lg z-20 py-2"
                        >
                            <div className="px-3 pb-2 flex justify-between">
                                <button onClick={() => setSelectedSubjectsFilter([])} className="text-[12px] text-[#1A56DB] font-medium hover:underline">Clear all</button>
                                <button onClick={() => setShowSubjectFilter(false)} className="text-[12px] text-[#9CA3AF] hover:text-[#374151]">Close</button>
                            </div>
                            {MARKS_DATA.subjects.map(s => (
                                <label key={s.code} className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-[#F9FAFB] cursor-pointer">
                                    <input 
                                      type="checkbox" 
                                      checked={selectedSubjectsFilter.includes(s.code)}
                                      onChange={(e) => {
                                          if (e.target.checked) setSelectedSubjectsFilter([...selectedSubjectsFilter, s.code]);
                                          else setSelectedSubjectsFilter(selectedSubjectsFilter.filter(c => c !== s.code));
                                      }}
                                      className="w-4 h-4 rounded border-[#E5E7EB] text-[#1A56DB] focus:ring-[#1A56DB]/20"
                                    />
                                    <span className="text-[12px] font-mono text-[#6B7280]">{s.code}</span>
                                    <span className="text-[13px] font-medium text-[#374151] font-outfit truncate">{s.name}</span>
                                </label>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="flex bg-[#F9FAFB] p-1 rounded-lg gap-1">
                {['All', 'Weekly Test', 'Mid-semester', 'Lab'].map(type => (
                    <button
                        key={type}
                        onClick={() => setActiveTypeTab(type)}
                        className={`px-3.5 h-7 rounded-md text-[12px] font-medium font-outfit transition-all
                            ${activeTypeTab === type ? 'bg-[#1A56DB] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#374151]'}`}
                    >
                        {type}s
                    </button>
                ))}
            </div>

            <div className="relative ml-auto sm:ml-0">
                <select 
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="h-9 pl-3 pr-8 bg-white border border-[#E5E7EB] rounded-lg text-[13px] font-medium font-outfit text-[#374151] appearance-none"
                >
                    <option value="newest">Date (newest first)</option>
                    <option value="score_desc">Score (high to low)</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
            </div>

            <div className="hidden lg:flex items-center gap-1.5 ml-auto text-[12px] font-outfit text-[#9CA3AF]">
                <span>Showing {allAssessments.length} assessments</span>
                <div className="w-[1px] h-4 bg-[#E5E7EB] mx-1" />
                <div className="flex bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-0.5">
                    <button 
                      onClick={() => setViewType('grid')}
                      className={`p-1.5 rounded-md transition-all ${viewType === 'grid' ? 'bg-[#1A56DB] text-white' : 'text-[#6B7280] hover:text-[#374151]'}`}
                    >
                        <LayoutGrid size={16} />
                    </button>
                    <button 
                      onClick={() => setViewType('table')}
                      className={`p-1.5 rounded-md transition-all ${viewType === 'table' ? 'bg-[#1A56DB] text-white' : 'text-[#6B7280] hover:text-[#374151]'}`}
                    >
                        <List size={16} />
                    </button>
                </div>
            </div>
        </motion.div>

        {/* MAIN CONTENT AREA */}
        <AnimatePresence mode="wait">
            {viewType === 'grid' ? (
                <motion.div 
                    key="grid"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                    {filteredSubjects.map((sub, idx) => (
                        <SubjectCard 
                            key={sub.code} 
                            sub={sub} 
                            onClick={() => { setSelectedSubject(sub); setIsDrawerOpen(true); }}
                            delay={0.36 + (idx * 0.04)}
                        />
                    ))}
                </motion.div>
            ) : (
                <motion.div 
                    key="table"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                >
                    <FullMarksTable assessments={allAssessments} />
                </motion.div>
            )}
        </AnimatePresence>

        {/* PERFORMANCE INSIGHTS STRIP */}
        <motion.div variants={itemAnim} className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden mt-8">
            <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center">
                <h2 className="text-[14px] font-semibold text-[#111827] font-outfit">Performance insights</h2>
                <span className="text-[12px] text-[#9CA3AF] font-outfit">Based on Semester 6 data</span>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <InsightCard 
                    title="Strongest subject" 
                    content="EC601 Digital Circuits — 83.2% overall, consistently above class average in all assessment types."
                    border="#10B981"
                    icon={Star}
                    iconColor="#10B981"
                    linkText="View subject →"
                />
                <InsightCard 
                    title="Needs most attention" 
                    content="MA601 Engineering Mathematics — 60.0% overall. Weekly tests are 20% below class average."
                    border="#EF4444"
                    icon={AlertCircle}
                    iconColor="#EF4444"
                    linkText="View subject →"
                />
                <InsightCard 
                    title="Semester trend" 
                    content="You are performing 3.1% better overall than Semester 5. Improvement is consistent across theory subjects."
                    border="#1A56DB"
                    icon={TrendingUp}
                    iconColor="#1A56DB"
                    linkText="View CGPA page →"
                />
            </div>
        </motion.div>

        {/* SUBJECT DETAIL DRAWER */}
        <SubjectDetailDrawer 
            isOpen={isDrawerOpen} 
            subject={selectedSubject} 
            onClose={() => setIsDrawerOpen(false)} 
        />

        <AnimatePresence>
            {showToast && (
                <motion.div 
                    initial={{ opacity: 0, y: 20, x: 20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed top-20 right-8 z-[100] bg-[#10B981] text-white px-5 py-3.5 rounded-xl shadow-lg flex items-center gap-3 font-outfit font-medium border border-white/20 backdrop-blur-md"
                >
                    <CheckCircle size={18} />
                    <span>Marks sheet downloaded successfully</span>
                </motion.div>
            )}
        </AnimatePresence>

        
        {/* Backdrop for Drawer */}
        <AnimatePresence>
            {isDrawerOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsDrawerOpen(false)}
                    className="fixed inset-0 bg-black/15 z-[60] lg:ml-[240px] mt-[56px]"
                />
            )}
        </AnimatePresence>
      </motion.div>
    </StudentLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════

const StatCard = ({ label, value, sub, subValue, trend, trendUp, color, icon: Icon, iconBg, iconColor, pulse, isSubjectCode }: any) => {
    return (
        <div 
          className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all group overflow-hidden"
          style={{ borderLeft: `3px solid ${color}` }}
        >
            <div className="w-10 h-10 mb-5 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: iconBg }}>
                <Icon size={20} color={iconColor} strokeWidth={1.5} />
            </div>
            <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">{label}</p>
            <div className="flex items-baseline gap-2 mt-1">
                <span className={`text-[32px] font-mono font-semibold ${pulse ? 'animate-pulse' : ''} text-[#111827]`}>
                    {value}
                </span>
                {subValue && <span className="text-[18px] font-mono font-medium" style={{ color }}>{subValue}</span>}
            </div>
            <p className="text-[12px] font-outfit text-[#6B7280] mt-1">{sub}</p>
            <div className="mt-3">
                <Badge color={trendUp ? 'green' : 'red'}>{trend}</Badge>
            </div>
        </div>
    );
};

const SubjectCard = ({ sub, onClick, delay }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            onClick={onClick}
            className="bg-white border border-[#E5E7EB] rounded-2xl shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group flex flex-col"
        >
            <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-start">
                <div>
                    <p className="text-[12px] font-mono text-[#9CA3AF]">{sub.code}</p>
                    <h3 className="text-[16px] font-bold text-[#111827] font-outfit mt-0.5">{sub.name}</h3>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <ArcIndicator percentage={sub.percentage} color={sub.color} />
                    <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold font-outfit
                      ${sub.status === 'Safe' ? 'bg-[#ECFDF5] text-[#10B981]' : 'bg-[#FFFBEB] text-[#F59E0B]'}
                      ${sub.percentage < 60 ? 'animate-pulse' : ''}`}>
                        {sub.status === 'Safe' ? 'Safe' : 'Watch'}
                    </span>
                </div>
            </div>

            <div className="px-6 py-4 space-y-3.5 flex-1">
                {['Weekly Test', 'Mid-semester', 'Lab'].map((type, i) => {
                    const rowData = sub.assessments.find((a: any) => a.type === type) || { score: 0, max: 20, avg: 15 };
                    const progressColor = type === 'Weekly Test' ? '#1A56DB' : type === 'Mid-semester' ? '#7C3AED' : '#0EA5E9';
                    const isMath = sub.code === 'MA601' && type === 'Lab';
                    if (isMath) return null;

                    return (
                        <div key={i} className="flex items-center gap-4">
                            <span className="text-[12px] font-medium text-[#4B5563] font-outfit w-24 flex-shrink-0">{type}s</span>
                            <div className="flex-1 h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(rowData.score / rowData.max) * 100}%` }}
                                    transition={{ duration: 0.8, delay: delay + 0.2 }}
                                    className="h-full rounded-full"
                                    style={{ background: progressColor }}
                                />
                            </div>
                            <div className="text-right w-12 flex-shrink-0">
                                <p className="text-[13px] font-mono font-semibold" style={{ color: progressColor }}>{rowData.score}/{rowData.max}</p>
                                <p className="text-[10px] font-mono text-[#9CA3AF]">avg {rowData.avg}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="px-6 py-4 mt-auto border-t border-[#F3F4F6] flex justify-between items-center text-[12px] font-outfit">
                <span className="text-[#9CA3AF]">Last updated: 2 hours ago</span>
                <span className="text-[#1A56DB] font-medium group-hover:underline flex items-center gap-1">
                    View details <ChevronRight size={14} />
                </span>
            </div>
        </motion.div>
    );
};

const FullMarksTable = ({ assessments }: any) => {
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    return (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#F9FAFB] border-b-2 border-[#F3F4F6]">
                        <tr>
                            <th className="px-6 py-3.5 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">Subject</th>
                            <th className="px-6 py-3.5 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">Assessment</th>
                            <th className="px-6 py-3.5 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">Type</th>
                            <th className="px-6 py-3.5 text-right text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">Date</th>
                            <th className="px-6 py-3.5 text-right text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">Score</th>
                            <th className="px-6 py-3.5 text-right text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">Max</th>
                            <th className="px-6 py-3.5 text-right text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">Avg</th>
                            <th className="px-6 py-3.5 text-right text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">Percentile</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3F4F6]">
                        {assessments.map((a: any, i: number) => {
                            const isExpanded = expandedRow === `${a.subjectCode}-${i}`;
                            const isBelowAvg = a.score < a.avg * 0.8;
                            
                            return (
                                <React.Fragment key={i}>
                                    <tr 
                                      onClick={() => setExpandedRow(isExpanded ? null : `${a.subjectCode}-${i}`)}
                                      className={`h-[52px] cursor-pointer transition-colors group
                                        ${isExpanded ? 'bg-[#F0F7FF]' : isBelowAvg ? 'bg-[#FEF2F2]/30 hover:bg-[#F9FAFB]' : 'hover:bg-[#F9FAFB]'}`}
                                    >
                                        <td className="px-6 py-2">
                                            <p className="text-[11px] font-mono text-[#9CA3AF]">{a.subjectCode}</p>
                                            <p className="text-[13px] font-bold text-[#111827] font-outfit">{a.subjectName}</p>
                                        </td>
                                        <td className="px-6 text-[13px] font-medium text-[#4B5563] font-outfit">{a.name}</td>
                                        <td className="px-6">
                                            <Badge color={a.type === 'Weekly Test' ? 'blue' : a.type === 'Mid-semester' ? 'violet' : 'teal'}>{a.type}</Badge>
                                        </td>
                                        <td className="px-6 text-right text-[12px] font-mono text-[#6B7280]">{a.date}</td>
                                        <td className="px-6 text-right text-[14px] font-mono font-bold text-[#111827]">{a.score}</td>
                                        <td className="px-6 text-right text-[13px] font-mono text-[#9CA3AF]">{a.max}</td>
                                        <td className="px-6 text-right text-[13px] font-mono font-medium" style={{ color: a.score >= a.avg ? '#10B981' : '#EF4444' }}>{a.avg}</td>
                                        <td className="px-6 text-right">
                                            <Badge color={a.score >= a.avg * 1.1 ? 'green' : 'gray'}>Top {Math.round(100 - (a.score/a.max*100)*0.8)}%</Badge>
                                        </td>
                                    </tr>
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.tr 
                                              initial={{ height: 0, opacity: 0 }}
                                              animate={{ height: 'auto', opacity: 1 }}
                                              exit={{ height: 0, opacity: 0 }}
                                              className="bg-[#F9FAFB]"
                                            >
                                                <td colSpan={8} className="px-10 py-4 overflow-hidden border-b border-[#F3F4F6]">
                                                    <div className="flex gap-8 text-[12px] font-mono text-[#6B7280]">
                                                        <span>Submitted on: {a.date}</span>
                                                        <span>Faculty: Dr. Ramesh Kumar</span>
                                                        <span>Section: A</span>
                                                        <span>Remarks: Excellent focus on core concepts.</span>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        )}
                                    </AnimatePresence>
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="px-6 py-4 flex justify-between items-center bg-[#F9FAFB] border-t border-[#F3F4F6]">
                <span className="text-[12px] font-outfit text-[#6B7280]">Showing 1–{assessments.length} of {assessments.length} assessments</span>
                <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-lg border border-[#E5E7EB] flex items-center justify-center text-[#9CA3AF] hover:bg-white transition-all"><ChevronLeft size={16} /></button>
                    <button className="w-8 h-8 rounded-lg bg-[#1A56DB] text-white flex items-center justify-center text-[13px] font-mono font-bold">1</button>
                    <button className="w-8 h-8 rounded-lg border border-[#E5E7EB] flex items-center justify-center text-[#9CA3AF] hover:bg-white transition-all"><ChevronRight size={16} /></button>
                </div>
            </div>
        </div>
    );
};

const SubjectDetailDrawer = ({ isOpen, subject, onClose }: any) => {
    const [activeTab, setActiveTab] = useState('All Assessments');
    const tabs = ['All Assessments', 'Weekly Tests', 'Analytics'];

    if (!subject) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: 480 }}
                    animate={{ x: 0 }}
                    exit={{ x: 480 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed top-[56px] right-0 h-[calc(100vh-56px)] w-[480px] bg-white shadow-drawer border-l border-[#E5E7EB] z-[70] flex flex-col"
                >
                    <div className="p-6 pb-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[12px] font-mono text-[#9CA3AF]">{subject.code}</p>
                                <h1 className="text-[20px] font-bold text-[#111827] font-outfit mt-0.5">{subject.name}</h1>
                            </div>
                            <button 
                              onClick={onClose}
                              className="w-10 h-10 rounded-xl hover:bg-[#F9FAFB] flex items-center justify-center text-[#9CA3AF] transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="mt-6">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-[13px] font-mono font-bold text-[#111827]">Overall: {subject.percentage}%</span>
                                <Badge color={subject.status === 'Safe' ? 'green' : 'amber'}>{subject.status}</Badge>
                            </div>
                            <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${subject.percentage}%` }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="h-full rounded-full"
                                    style={{ background: subject.color }}
                                />
                            </div>
                            <span className="block mt-2 text-[11px] font-mono text-[#9CA3AF]">Class average: 69.8%</span>
                        </div>
                    </div>

                    <div className="mt-2 h-11 bg-[#F9FAFB] border-y border-[#F3F4F6] px-6 flex relative">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 h-full text-[13px] font-medium font-outfit transition-all duration-200
                                ${activeTab === tab ? 'text-[#1A56DB]' : 'text-[#9CA3AF] hover:text-[#6B7280]'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {activeTab === 'All Assessments' && (
                            <div className="divide-y divide-[#F3F4F6]">
                                {subject.assessments.map((a: any, i: number) => (
                                    <div key={i} className="px-6 py-4 flex items-center gap-4 hover:bg-[#F9FAFB] transition-colors group">
                                        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: a.type === 'Weekly Test' ? '#1A56DB' : a.type === 'Mid-semester' ? '#7C3AED' : '#0EA5E9' }} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[13px] font-bold text-[#111827] font-outfit">{a.name}</p>
                                            <p className="text-[11px] font-outfit text-[#9CA3AF]">{a.date}</p>
                                        </div>
                                        <div className="w-20 h-1 bg-[#F3F4F6] rounded-full overflow-hidden hidden sm:block">
                                            <div className="h-full rounded-full" style={{ width: `${(a.score/a.max)*100}%`, background: a.score >= a.avg ? '#10B981' : '#EF4444' }} />
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[14px] font-mono font-bold text-[#111827]">{a.score}/{a.max}</p>
                                            <p className="text-[11px] font-mono text-[#9CA3AF]">avg {a.avg}</p>
                                        </div>
                                        {a.score > a.avg ? <TrendingUp size={14} className="text-[#10B981]" /> : a.score < a.avg ? <TrendingDown size={14} className="text-[#EF4444]" /> : <Minus size={14} className="text-[#9CA3AF]" />}
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'Weekly Tests' && (
                            <div className="p-6 space-y-8">
                                <div className="grid grid-cols-2 gap-3">
                                    <MetricBox label="TOTAL TESTS" value="5" />
                                    <MetricBox label="AVG SCORE" value="16.2" />
                                    <MetricBox label="BEST WEEK" value="19" />
                                    <MetricBox label="WORST WEEK" value="14" />
                                </div>
                                
                                <div className="pt-4">
                                    <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-6">Score Trend (W1 - W5)</p>
                                    <div className="h-28 relative">
                                        <svg width="100%" height="100%" viewBox="0 0 432 100" preserveAspectRatio="none">
                                            <motion.path 
                                                d="M 20 80 L 120 70 L 220 75 L 320 85 L 420 85"
                                                fill="none" stroke="#1A56DB" strokeWidth="2"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 1 }}
                                            />
                                            <line x1="0" y1="75" x2="432" y2="75" stroke="#F3F4F6" strokeDasharray="4" />
                                            {[20, 120, 220, 320, 420].map((x, i) => (
                                                <motion.circle 
                                                    key={i} cx={x} cy={[80, 70, 75, 85, 85][i]} r="4" fill="#1A56DB" stroke="#fff" strokeWidth="2"
                                                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 + i * 0.1 }}
                                                />
                                            ))}
                                        </svg>
                                        <div className="flex justify-between mt-2 px-2 text-[10px] font-mono text-[#9CA3AF]">
                                            <span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Analytics' && (
                            <div className="p-6 space-y-8">
                                <div>
                                    <h3 className="text-[13px] font-bold text-[#111827] font-outfit mb-3">Your position in class</h3>
                                    <div className="h-4 bg-gradient-to-r from-red-100 via-amber-100 to-green-100 rounded-lg relative overflow-hidden">
                                        <motion.div 
                                            initial={{ left: 0 }}
                                            animate={{ left: '68%' }}
                                            transition={{ duration: 1, type: "spring" }}
                                            className="absolute top-0 bottom-0 w-[2px] bg-[#111827] z-10"
                                        />
                                    </div>
                                    <div className="flex justify-between mt-1.5 text-[10px] font-mono text-[#9CA3AF]">
                                        <span>Bottom</span><span>Average</span><span>Top</span>
                                    </div>
                                    <p className="mt-3 text-[13px] text-[#4B5563] font-outfit">You are in the top 32% of your class for this subject.</p>
                                </div>

                                <div>
                                    <h3 className="text-[13px] font-bold text-[#111827] font-outfit mb-3">What you need in End Semester</h3>
                                    <div className="space-y-2 border border-[#F3F4F6] rounded-xl p-4">
                                        {[
                                            { grade: 'O', need: '57/60', color: '#10B981' },
                                            { grade: 'A+', need: '48/60', color: '#10B981' },
                                            { grade: 'A', need: '35/60', color: '#F59E0B' },
                                            { grade: 'B+', need: '22/60', color: '#EF4444' }
                                        ].map(gr => (
                                            <div key={gr.grade} className="flex justify-between items-center text-[13px] py-1">
                                                <span className="font-bold text-[#111827]">Grade {gr.grade}</span>
                                                <span className="font-mono" style={{ color: gr.color }}>Need {gr.need}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const MetricBox = ({ label, value }: { label: string, value: string }) => (
    <div className="bg-[#F9FAFB] border border-[#F3F4F6] rounded-xl p-4">
        <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider">{label}</p>
        <p className="text-[20px] font-mono font-bold text-[#111827] mt-1">{value}</p>
    </div>
);

const InsightCard = ({ title, content, border, icon: Icon, iconColor, linkText }: any) => {
    return (
        <div 
          className="bg-white border border-[#E5E7EB] rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all text-left"
          style={{ borderLeft: `3px solid ${border}` }}
        >
            <div className="w-8 h-8 rounded-full flex items-center justify-center mb-4" style={{ background: `${iconColor}15` }}>
                <Icon size={16} color={iconColor} strokeWidth={2.5} />
            </div>
            <h3 className="text-[13px] font-bold text-[#111827] font-outfit">{title}</h3>
            <p className="text-[12px] text-[#6B7280] font-outfit mt-2 leading-relaxed">{content}</p>
            <button className="text-[12px] font-medium text-[#1A56DB] mt-4 hover:underline block">{linkText}</button>
        </div>
    );
};

export default MarksOverview;
