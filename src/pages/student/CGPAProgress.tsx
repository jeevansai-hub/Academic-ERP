import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart2, TrendingUp, Award, BookOpen, Building2, GraduationCap, 
  AlertTriangle, Calculator, Calendar, FileText, CheckCircle, 
  XCircle, Search, Download, ChevronRight, ChevronDown, Activity, 
  Star, Info, Minus, TrendingDown, Target, Building, ArrowUpRight, Copy, Plus, Trash2, RefreshCw
} from 'lucide-react';
import StudentLayout from '../../components/layout/StudentLayout';

// ═══════════════════════════════════════════════════════════════
// MOCK DATA (As per specification)
// ═══════════════════════════════════════════════════════════════

const STUDENT_DATA = {
    name: 'Aditya Kumar',
    rollNo: '21L31A0503',
    department: 'Computer Science & Engineering',
    semester: 6,
    cgpa: 8.04,
    totalCredits: 130,
    requiredCredits: 180,
    rank: 23,
    totalStudents: 120,
    attendance: 82,
    activeBacklogs: 1, 
    backlogSubject: 'CS603',
    semesterHistory: [
        { sem: 1, sgpa: 8.2, credits: 22, rank: 41, attendance: 85, status: 'Completed' },
        { sem: 2, sgpa: 8.5, credits: 21, rank: 28, attendance: 88, status: 'Completed' },
        { sem: 3, sgpa: 7.9, credits: 23, rank: 52, attendance: 80, status: 'Completed' },
        { sem: 4, sgpa: 9.0, credits: 22, rank: 12, attendance: 92, status: 'Completed' },
        { sem: 5, sgpa: 7.6, credits: 21, rank: 68, attendance: 78, status: 'Completed' },
        { sem: 6, sgpa: 8.1, credits: 22, rank: 0, attendance: 82, status: 'In Progress' }
    ],
    currentSubjects: [
        { code: 'CS603', name: 'DBMS', internal: 52, maxInternal: 75, credits: 4 },
        { code: 'CS602', name: 'Operating Systems', internal: 58, maxInternal: 75, credits: 4 },
        { code: 'MA601', name: 'Engineering Math', internal: 27, maxInternal: 45, credits: 3 },
        { code: 'EC601', name: 'Digital Circuits', internal: 62, maxInternal: 75, credits: 4 }
    ],
    companies: [
        { name: 'TCS', type: 'Tier 2', cutoff: 6.0, backlogAllowed: 0, attendance: 75 },
        { name: 'Infosys', type: 'Tier 2', cutoff: 6.5, backlogAllowed: 0, attendance: 75 },
        { name: 'Wipro', type: 'Tier 2', cutoff: 6.5, backlogAllowed: 0, attendance: 75 },
        { name: 'Accenture', type: 'Tier 2', cutoff: 7.0, backlogAllowed: 0, attendance: 75 },
        { name: 'Amazon', type: 'Tier 1', cutoff: 7.5, backlogAllowed: 0, attendance: 75 },
        { name: 'Microsoft', type: 'Tier 1', cutoff: 8.0, backlogAllowed: 0, attendance: 75 },
        { name: 'Google', type: 'Tier 1', cutoff: 8.5, backlogAllowed: 0, attendance: 75 }
    ]
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
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${styles[color] || styles.gray} font-outfit whitespace-nowrap`}>
      {children}
    </span>
  );
};

const CountUp = ({ to, duration = 1200, decimals = 2 }: { to: number, duration?: number, decimals?: number }) => {
  const [value, setValue] = useState(0);
  
  useEffect(() => {
    let startTime: number | null = null;
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const current = progress * to;
      setValue(current);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [to, duration]);

  return <>{value.toFixed(decimals)}</>;
};

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

const CGPAProgress = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [companySearch, setCompanySearch] = useState('');
  const [predictorMode, setPredictorMode] = useState<'forward' | 'target'>('forward');
  const [hypotheticalScores, setHypotheticalScores] = useState<Record<string, number>>(
    STUDENT_DATA.currentSubjects.reduce((acc, s) => ({ ...acc, [s.code]: 38 }), {})
  );
  const [targetCGPA, setTargetCGPA] = useState('');
  const [semesterTarget, setSemesterTarget] = useState('8.5');
  const [isFormulaExpanded, setIsFormulaExpanded] = useState(true);
  const [calcRows, setCalcRows] = useState(STUDENT_DATA.semesterHistory.map(h => ({ sem: h.sem, sgpa: h.sgpa.toString(), credits: h.credits.toString() })));
  const [showCumulativeColumn, setShowCumulativeColumn] = useState(false);
  const [expandedSemRow, setExpandedSemRow] = useState<number | null>(null);

  // Stagger layout animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 2000);
  };

  const currentCompletedSum = useMemo(() => {
    return STUDENT_DATA.semesterHistory
      .filter(h => h.status === 'Completed')
      .reduce((sum, h) => sum + h.sgpa * h.credits, 0);
  }, []);

  const totalCompletedCredits = useMemo(() => {
    return STUDENT_DATA.semesterHistory
      .filter(h => h.status === 'Completed')
      .reduce((sum, h) => sum + h.credits, 0);
  }, []);

  const projectedCGPA = useMemo(() => {
    if (predictorMode === 'forward') {
      const sem6Credits = 22;
      const sem6Points = STUDENT_DATA.currentSubjects.reduce((sum, s) => {
          const score = (s.internal + hypotheticalScores[s.code]);
          const percent = (score / (s.maxInternal + 60)) * 100;
          let gp = 0;
          if (percent >= 90) gp = 10;
          else if (percent >= 80) gp = 9;
          else if (percent >= 70) gp = 8;
          else if (percent >= 60) gp = 7;
          else if (percent >= 50) gp = 6;
          else if (percent >= 40) gp = 5;
          return sum + gp * s.credits;
      }, 0);
      const sem6SGPA = sem6Points / 22;
      return (currentCompletedSum + sem6Points) / (totalCompletedCredits + 22);
    }
    return STUDENT_DATA.cgpa;
  }, [predictorMode, hypotheticalScores, currentCompletedSum, totalCompletedCredits]);

  const calculateRequiredSGPA = (target: number) => {
      const totalCreditsAtEnd = 131; // Total credits including Sem 6
      const requiredSum = target * totalCreditsAtEnd;
      const neededFromSem6 = requiredSum - currentCompletedSum;
      return neededFromSem6 / 22;
  };

  const requiredSGPA = useMemo(() => {
    const target = parseFloat(targetCGPA);
    if (!isNaN(target)) return calculateRequiredSGPA(target);
    return null;
  }, [targetCGPA]);

  const copyNarrative = () => {
    const text = document.getElementById('performance-narrative-content')?.innerText;
    if (text) {
        navigator.clipboard.writeText(text);
        // Show copied state logic
    }
  };

  return (
    <StudentLayout activePage="cgpa" onNavigate={() => {}}>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-[1400px] mx-auto px-7 pb-20 space-y-6"
      >
        {/* PAGE HEADER SECTION */}
        <div className="flex justify-between items-end pb-6 border-b border-[#F3F4F6]">
          <div>
            <h1 className="text-[24px] font-fraunces font-light italic text-[#111827]">CGPA Progress</h1>
            <p className="mt-1 text-[13px] font-outfit text-[#6B7280]">
              Your complete academic trajectory · Semester 1 through Semester 6
            </p>
          </div>
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="h-10 px-4 bg-white border border-[#E5E7EB] rounded-lg text-[13px] font-medium font-outfit text-[#374151] flex items-center gap-2 hover:bg-[#F9FAFB] active:scale-95 transition-all"
          >
            {isExporting ? <RefreshCw size={16} className="animate-spin text-[#1A56DB]" /> : <Download size={16} />}
            {isExporting ? 'Generating...' : 'Export Report'}
          </button>
        </div>

        {/* HERO CGPA SECTION */}
        <motion.div variants={itemAnim} className="bg-white border border-[#E5E7EB] rounded-[20px] p-8 shadow-[0_4px_24px_rgba(12,36,97,0.10)] relative overflow-hidden flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="absolute top-[-60px] right-[-40px] w-72 h-72 rounded-full bg-[#1A56DB]/[0.04] pointer-events-none" />
            <div className="absolute bottom-[-50px] right-[200px] w-44 h-44 rounded-full bg-[#1A56DB]/[0.03] pointer-events-none" />

            <div className="z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
                <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-[0.1em] font-outfit">CURRENT CGPA</p>
                <h2 className="text-[64px] font-mono font-light text-[#111827] leading-none mt-1">
                    <CountUp to={STUDENT_DATA.cgpa} />
                </h2>
                <div className="mt-3">
                    <Badge color="green">↑ +0.3 vs Semester 5</Badge>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[13px] font-medium text-[#374151] font-outfit">
                        <Award size={14} className="text-[#9CA3AF]" />
                        <span>Rank {STUDENT_DATA.rank} of {STUDENT_DATA.totalStudents} students</span>
                        <span className="text-[#9CA3AF]">·</span>
                        <span className="text-[12px] text-[#6B7280]">Dept: {STUDENT_DATA.department}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px] font-medium text-[#374151] font-outfit">
                        <BookOpen size={14} className="text-[#9CA3AF]" />
                        <span>{STUDENT_DATA.totalCredits} of {STUDENT_DATA.requiredCredits} credits completed</span>
                    </div>
                </div>
            </div>

            <div className="z-10 w-full max-w-[320px]">
                <div className="h-28 relative">
                    <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#1A56DB" stopOpacity="0.08" />
                                <stop offset="100%" stopColor="#1A56DB" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <path 
                           d="M 0 100 L 0 80 L 50 75 L 100 85 L 150 65 L 200 90 L 250 82" 
                           fill="url(#areaGrad)" 
                        />
                        <motion.path 
                            d="M 0 80 L 50 75 L 100 85 L 150 65 L 200 90 L 250 82"
                            fill="none" stroke="#1A56DB" strokeWidth="2.5"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
                        />
                        <line x1="0" y1="80.4" x2="300" y2="80.4" stroke="#E5E7EB" strokeDasharray="4" />
                        {[0, 50, 100, 150, 200, 250].map((x, i) => (
                            <motion.circle 
                                key={i} cx={x} cy={[80, 75, 85, 65, 90, 82][i]} r={i === 5 ? 5 : 4} 
                                fill="#1A56DB" stroke="#fff" strokeWidth="2"
                                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 + i * 0.1 }}
                            />
                        ))}
                    </svg>
                    <div className="flex justify-between mt-2 px-1 text-[10px] font-mono text-[#9CA3AF]">
                        {['S1','S2','S3','S4','S5','S6'].map(s => <span key={s}>{s}</span>)}
                    </div>
                    <div className="absolute right-0 top-[20px] text-[10px] font-mono text-[#9CA3AF]">CGPA 8.04</div>
                </div>
            </div>

            <div className="z-10 w-full max-w-[280px] p-1">
                <p className="text-[12px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">Quick eligibility check</p>
                <div className="mt-3 space-y-1">
                    <EligibilityRow icon={Building2} label="Placement eligible" status="Eligible" color="green" />
                    <EligibilityRow icon={GraduationCap} label="Merit scholarship" status="Qualifies" color="green" />
                    <EligibilityRow icon={AlertTriangle} label="Active backlogs" status="1 backlog" color="red" />
                </div>
            </div>
        </motion.div>

        {/* SUMMARY STAT CARDS ROW */}
        <motion.div variants={itemAnim} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard 
                label="CURRENT CGPA" 
                value={STUDENT_DATA.cgpa}
                sub={`Semester 5 · ${STUDENT_DATA.totalCredits} credits`}
                trend="↑ +0.3 vs Sem 5" trendUp={true} color="#1A56DB" icon={TrendingUp}
            />
            <StatCard 
                label="SEMESTER SGPA" 
                value={8.1} asterisk="*"
                sub="Semester 6 projected · From internals"
                trend="↑ Improving vs Sem 5" trendUp={true} color="#1A56DB" icon={Activity}
            />
            <StatCard 
                label="DEPT RANK" 
                value={STUDENT_DATA.rank}
                sub={`out of ${STUDENT_DATA.totalStudents} · Top 19%`}
                trend="↑ +5 positions vs Sem 5" trendUp={true} color="#10B981" icon={Award}
            />
            <StatCard 
                label="CREDITS EARNED" 
                value={STUDENT_DATA.totalCredits}
                sub={`of ${STUDENT_DATA.requiredCredits} required · 72%`}
                trend="50 remaining" isBadge={true} color="#7C3AED" icon={BookOpen}
            />
        </motion.div>

        {/* TWO-COLUMN MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
            <div className="lg:col-span-6 space-y-6">
                <PlacementEligibilityCard />
                <CompanyCutoffCard search={companySearch} />
                <CGPAPredictorCard 
                    mode={predictorMode} setMode={setPredictorMode}
                    scores={hypotheticalScores} setScores={setHypotheticalScores}
                    projected={projectedCGPA}
                />
            </div>
            <div className="lg:col-span-4 space-y-6">
                <ScholarshipCard />
                <RankTrackerCard />
                <SemesterTargetCard 
                    target={semesterTarget} setTarget={setSemesterTarget}
                />
            </div>
        </div>

        {/* CGPA FORMULA TRANSPARENCY SECTION */}
        <FormulaSection expanded={isFormulaExpanded} onToggle={() => setIsFormulaExpanded(!isFormulaExpanded)} />

        {/* SEMESTER HISTORY TABLE */}
        <SemesterHistoryTable 
            showCumulative={showCumulativeColumn} onToggleCumulative={() => setShowCumulativeColumn(!showCumulativeColumn)} 
            expandedRow={expandedSemRow} onExpandRow={(r) => setExpandedSemRow(expandedSemRow === r ? null : r)}
        />

        {/* PERFORMANCE NARRATIVE SECTION */}
        <PerformanceNarrative onCopy={copyNarrative} />

        {/* TOAST NOTIFICATION */}
        <AnimatePresence>
            {showToast && (
                <motion.div 
                    initial={{ opacity: 0, y: 20, x: 20 }} animate={{ opacity: 1, y: 0, x: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed bottom-8 right-8 z-[100] bg-[#10B981] text-white px-5 py-3.5 rounded-xl shadow-lg flex items-center gap-3 font-outfit font-medium border border-white/20"
                >
                    <CheckCircle size={18} />
                    <span>CGPA report downloaded successfully</span>
                </motion.div>
            )}
        </AnimatePresence>
      </motion.div>
    </StudentLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════

const EligibilityRow = ({ icon: Icon, label, status, color }: any) => (
    <div className="flex items-center justify-between h-9 px-2 hover:bg-[#F9FAFB] rounded-lg transition-colors group cursor-pointer">
        <div className="flex items-center gap-3">
            <Icon size={16} className="text-[#9CA3AF] group-hover:text-[#1A56DB] transition-colors" />
            <span className="text-[13px] font-medium text-[#374151] font-outfit">{label}</span>
        </div>
        <Badge color={color}>{status}</Badge>
    </div>
);

const StatCard = ({ label, value, sub, trend, trendUp, color, icon: Icon, asterisk, isBadge }: any) => (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all group" style={{ borderLeft: `3px solid ${color}` }}>
        <div className="w-10 h-10 mb-4 rounded-xl flex items-center justify-center bg-[#1A56DB]/[0.05]">
            <Icon size={20} className="text-[#1A56DB]" strokeWidth={1.5} />
        </div>
        <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">{label}</p>
        <div className="flex items-baseline gap-1 mt-1">
            <span className="text-[32px] font-mono font-bold text-[#111827]">
                <CountUp to={typeof value === 'number' ? value : parseFloat(value.toString())} decimals={typeof value === 'number' && Number.isInteger(value) ? 0 : 2} />
            </span>
            {asterisk && <span className="text-[14px] font-outfit text-[#9CA3AF] align-top">{asterisk}</span>}
        </div>
        <p className="text-[12px] font-outfit text-[#6B7280] mt-1">{sub}</p>
        <div className="mt-3">
            {isBadge ? <Badge color="gray">{trend}</Badge> : <Badge color={trendUp ? 'green' : 'red'}>{trend}</Badge>}
        </div>
    </div>
);

const PlacementEligibilityCard = () => (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center">
            <div className="flex items-center gap-2 text-[14px] font-semibold text-[#111827] font-outfit">
                <Building2 size={16} className="text-[#6B7280]" />
                <span>Placement eligibility</span>
            </div>
            <Badge color="amber">Partially eligible</Badge>
        </div>
        <div className="bg-[#F59E0B]/[0.08] px-6 py-3 flex items-center gap-2.5">
            <AlertTriangle size={16} className="text-[#F59E0B]" />
            <span className="text-[13px] font-medium text-[#92400E] font-outfit">You meet 2 of 3 criteria. Resolve your active backlog to qualify for Tier 1 companies.</span>
        </div>
        <div className="divide-y divide-[#F3F4F6]">
            <CriteriaRow icon={TrendingUp} label="CGPA requirement" value="8.04" note="Most Tier 1 require ≥ 7.5" met={true} chip="8.04 ≥ 7.5 cutoff" />
            <CriteriaRow icon={AlertTriangle} label="Active backlogs" value="1 backlog" note="Tier 1 require 0 backlogs" met={false} chip="1 backlog" pulse={true} warningIdx={1} />
            <CriteriaRow icon={Activity} label="Attendance" value="82%" note="Min 75% required" met={true} chip="82% ≥ 75%" />
        </div>
        <div className="px-6 py-4 border-t border-[#F3F4F6]">
            <p className="text-[12px] font-medium text-[#374151] font-outfit mb-2">Check company cutoff</p>
            <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                <input 
                    type="text" placeholder="Type company name e.g. TCS, Infosys..."
                    className="w-full h-10 pl-10 pr-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[13px] font-outfit focus:outline-none focus:ring-4 focus:ring-[#1A56DB]/5 focus:border-[#1A56DB] transition-all"
                />
            </div>
        </div>
    </div>
);

const CriteriaRow = ({ icon: Icon, label, value, note, met, chip, pulse, warningIdx }: any) => (
    <div className={`px-6 py-4 flex items-center gap-4 ${warningIdx === 1 ? 'bg-[#EF4444]/[0.02]' : ''}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${met ? 'bg-[#1A56DB]/[0.08]' : 'bg-[#EF4444]/[0.08]'}`}>
            <Icon size={16} className={met ? 'text-[#1A56DB]' : 'text-[#EF4444]'} />
        </div>
        <div className="flex-1">
            <p className="text-[13px] font-medium text-[#374151] font-outfit">{label}</p>
            <p className="text-[11px] text-[#9CA3AF] font-outfit">{note}</p>
        </div>
        <div className="text-right flex items-center gap-3">
            <span className="text-[13px] font-mono font-bold text-[#111827]">{value}</span>
            {met ? <CheckCircle size={18} className="text-[#10B981]" /> : <XCircle size={18} className="text-[#EF4444]" />}
            <Badge color={met ? 'green' : 'red'}>{chip}</Badge>
        </div>
    </div>
);

const CompanyCutoffCard = ({ search }: any) => (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center">
            <div className="flex items-center gap-2 text-[14px] font-semibold text-[#111827] font-outfit">
                <Building2 size={16} className="text-[#6B7280]" />
                <span>Company cutoff comparison</span>
            </div>
        </div>
        <div className="max-h-[360px] overflow-y-auto custom-scrollbar">
            {STUDENT_DATA.companies.map((c, i) => (
                <div key={i} className={`px-6 py-4 flex items-center gap-4 border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors ${c.cutoff > STUDENT_DATA.cgpa ? 'bg-[#EF4444]/[0.01]' : ''}`}>
                    <div className="w-32 flex-shrink-0">
                        <p className="text-[14px] font-bold text-[#111827] font-outfit">{c.name}</p>
                        <Badge color={c.type === 'Tier 1' ? 'violet' : c.type === 'Tier 2' ? 'blue' : 'teal'}>{c.type}</Badge>
                    </div>
                    <div className="flex-1 flex gap-6">
                        <CompactCriteria label="CGPA" val={`≥ ${c.cutoff}`} met={STUDENT_DATA.cgpa >= c.cutoff} />
                        <CompactCriteria label="BACKLOGS" val="0" met={false} />
                        <CompactCriteria label="ATTENDANCE" val="≥ 75%" met={STUDENT_DATA.attendance >= 75} />
                    </div>
                    <div className="text-right min-w-[100px]">
                        <Badge color={STUDENT_DATA.cgpa >= c.cutoff ? 'green' : 'red'}>{STUDENT_DATA.cgpa >= c.cutoff ? 'Eligible' : 'Not eligible'}</Badge>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const CompactCriteria = ({ label, val, met }: any) => (
    <div className="flex flex-col">
        <span className="text-[9px] font-bold text-[#9CA3AF] uppercase font-outfit">{label}</span>
        <span className="text-[12px] font-mono font-bold text-[#374151]">{val}</span>
        <div className="flex items-center gap-1 mt-0.5">
            {met ? <CheckCircle size={10} className="text-[#10B981]" /> : <XCircle size={10} className="text-[#EF4444]" />}
            <span className={`text-[10px] font-medium font-outfit ${met ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>{met ? 'Met' : 'Not met'}</span>
        </div>
    </div>
);

const CGPAPredictorCard = ({ mode, setMode, scores, setScores, projected }: any) => {
    return (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center">
                <div className="flex items-center gap-2 text-[14px] font-semibold text-[#111827] font-outfit">
                    <Calculator size={16} className="text-[#6B7280]" />
                    <span>CGPA predictor</span>
                </div>
                <div className="flex bg-[#F9FAFB] p-1 rounded-lg gap-1">
                    <button onClick={() => setMode('forward')} className={`px-4 py-1.5 rounded-md text-[12px] font-medium font-outfit transition-all ${mode === 'forward' ? 'bg-[#1A56DB] text-white shadow-sm' : 'text-[#6B7280]'}`}>Forward mode</button>
                    <button onClick={() => setMode('target')} className={`px-4 py-1.5 rounded-md text-[12px] font-medium font-outfit transition-all ${mode === 'target' ? 'bg-[#1A56DB] text-white shadow-sm' : 'text-[#6B7280]'}`}>Target mode</button>
                </div>
            </div>

            <div className="p-6">
                {mode === 'forward' ? (
                    <>
                        <div className="flex items-center justify-between mb-8">
                            <div className="bg-[#F0F7FF] border border-[#1A56DB]/10 rounded-2xl px-6 py-4 flex-1 mr-4">
                                <p className="text-[10px] font-bold text-[#1A56DB] uppercase font-outfit">PROJECTED CGPA</p>
                                <div className="flex items-baseline gap-2 mt-1">
                                    <span className="text-[32px] font-mono font-bold text-[#1A56DB]">{projected.toFixed(2)}</span>
                                    <span className={`text-[13px] font-medium font-outfit ${projected >= STUDENT_DATA.cgpa ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                                        vs {STUDENT_DATA.cgpa} → {projected >= STUDENT_DATA.cgpa ? '+' : ''}{(projected - STUDENT_DATA.cgpa).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[12px] font-medium text-[#4B5563] font-outfit">Projected rank</p>
                                <p className="text-[20px] font-mono font-bold text-[#111827]">~19th <span className="text-[12px] font-normal text-[#9CA3AF]">(est.)</span></p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {STUDENT_DATA.currentSubjects.map((s, i) => (
                                <div key={i} className="flex items-center gap-5">
                                    <div className="w-40 flex-shrink-0">
                                        <p className="text-[11px] font-mono text-[#9CA3AF] uppercase">{s.code}</p>
                                        <p className="text-[13px] font-bold text-[#374151] font-outfit truncate">{s.name}</p>
                                        <p className="text-[10px] font-mono text-[#1A56DB]">Int: {s.internal}/{s.maxInternal}</p>
                                    </div>
                                    <div className="flex-1 relative pt-4">
                                        <input 
                                          type="range" min="0" max="60" 
                                          value={scores[s.code]} 
                                          onChange={(e) => setScores({...scores, [s.code]: parseInt(e.target.value)})}
                                          className="w-full h-1.5 bg-[#F3F4F6] rounded-full appearance-none cursor-pointer accent-[#1A56DB]"
                                        />
                                        <div className="flex justify-between mt-2 text-[9px] font-mono text-[#9CA3AF]">
                                            <span>0</span><span>60</span>
                                        </div>
                                    </div>
                                    <div className="w-20 text-right">
                                        <p className="text-[14px] font-mono font-bold text-[#111827]">{scores[s.code]}<span className="text-[11px] font-normal text-[#9CA3AF]">/60</span></p>
                                        <Badge color={((s.internal+scores[s.code])/(s.maxInternal+60)*100) >= 80 ? 'green' : 'amber'}>
                                            {((s.internal+scores[s.code])/(s.maxInternal+60)*100) >= 90 ? 'O' : 'A+'}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="space-y-8">
                        <div>
                            <p className="text-[13px] font-medium text-[#374151] font-outfit mb-3">Set your target CGPA</p>
                            <input 
                                type="number" step="0.01" placeholder="e.g. 8.5"
                                className="w-full h-14 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-center text-[28px] font-mono font-bold text-[#111827] focus:ring-4 focus:ring-[#1A56DB]/5 focus:border-[#1A56DB] transition-all"
                            />
                        </div>
                        <div className="p-6 bg-[#F9FAFB] border border-[#F3F4F6] rounded-2xl space-y-4">
                            <div className="flex items-center gap-3">
                                <CheckCircle size={20} className="text-[#10B981]" />
                                <p className="text-[14px] font-medium text-[#374151] font-outfit">To reach 8.5 CGPA, you need <span className="text-[18px] font-mono font-bold text-[#1A56DB]">9.2</span> SGPA this semester.</p>
                            </div>
                            <p className="text-[13px] text-[#6B7280] font-outfit">This target is <span className="text-[#10B981] font-semibold">achievable</span>. Approximately 48/60 needed in each end-semester exam.</p>
                        </div>
                        <p className="text-[12px] text-[#9CA3AF] font-outfit italic text-center">You have 3 semesters remaining to adjust your trajectory.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const ScholarshipCard = () => (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center">
            <div className="flex items-center gap-2 text-[14px] font-semibold text-[#111827] font-outfit">
                <GraduationCap size={16} className="text-[#6B7280]" />
                <span>Scholarship eligibility</span>
            </div>
            <Badge color="green">2 qualified</Badge>
        </div>
        <div className="divide-y divide-[#F3F4F6]">
            <ScholarshipRow name="Merit Scholarship" req="CGPA ≥ 8.0" current="8.04" status="Qualified ✓" color="green" />
            <ScholarshipRow name="Academic Excellence Award" req="CGPA ≥ 8.5" current="8.04" status="Close" color="amber" sub="Needs 0.46 more" />
            <ScholarshipRow name="Govt Merit Scholarship" req="CGPA ≥ 7.5" current="8.04" status="Qualified ✓" color="green" />
            <ScholarshipRow name="Partial Fee Waiver" req="CGPA ≥ 8.0 & 0 Backlogs" current="8.04" status="Backlog" color="red" sub="1 backlog prevents it" />
        </div>
    </div>
);

const ScholarshipRow = ({ name, req, current, status, color, sub }: any) => (
    <div className="px-6 py-4 flex items-center justify-between hover:bg-[#F9FAFB] transition-colors group cursor-pointer" style={{ borderLeft: `4px solid ${color === 'green' ? '#10B981' : color === 'amber' ? '#F59E0B' : '#EF4444'}` }}>
        <div>
            <p className="text-[13px] font-bold text-[#111827] font-outfit">{name}</p>
            <p className="text-[11px] text-[#9CA3AF] font-outfit uppercase tracking-wider">{req}</p>
            <p className={`text-[10px] font-medium mt-0.5 ${color === 'green' ? 'text-[#10B981]' : color === 'amber' ? 'text-[#F59E0B]' : 'text-[#EF4444]'}`}>{sub || `Your CGPA: ${current}`}</p>
        </div>
        <Badge color={color}>{status}</Badge>
    </div>
);

const RankTrackerCard = () => (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center">
            <div className="flex items-center gap-2 text-[14px] font-semibold text-[#111827] font-outfit">
                <Award size={16} className="text-[#6B7280]" />
                <span>Department rank tracker</span>
            </div>
            <Badge color="green">Top 19%</Badge>
        </div>
        <div className="p-6 border-b border-[#F3F4F6] flex items-center gap-5">
            <span className="text-[48px] font-mono font-light text-[#111827] leading-none">23</span>
            <div>
                <p className="text-[13px] font-medium text-[#6B7280] font-outfit">out of 120 students</p>
                <div className="mt-1">
                    <Badge color="green">↑ +5 positions vs last sem</Badge>
                </div>
            </div>
        </div>
        <div className="p-6">
            <p className="text-[12px] font-semibold text-[#374151] font-outfit mb-4 uppercase tracking-wider">Where you stand</p>
            <div className="h-4 w-full rounded-full flex overflow-hidden ring-1 ring-[#F3F4F6] relative">
                <div className="w-1/4 h-full bg-[#10B981]/[0.12]" />
                <div className="w-1/4 h-full bg-[#1A56DB]/[0.12]" />
                <div className="w-1/4 h-full bg-[#F59E0B]/[0.12]" />
                <div className="w-1/4 h-full bg-[#EF4444]/[0.12]" />
                <motion.div 
                    initial={{ left: '100%' }} animate={{ left: '19.1%' }} transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    className="absolute top-[-4px] bottom-[-4px] w-0.5 bg-[#111827] shadow-[0_0_10px_rgba(0,0,0,0.2)]"
                >
                    <div className="absolute top-[-16px] left-1/2 -translate-x-1/2 text-[10px] font-bold font-outfit text-[#1A56DB]">YOU</div>
                </motion.div>
            </div>
            <div className="flex justify-between mt-2.5 text-[9px] font-bold text-[#9CA3AF] uppercase font-outfit">
                <span>Top 25%</span><span>50%</span><span>75%</span><span>Bottom</span>
            </div>
        </div>
    </div>
);

const SemesterTargetCard = ({ target, setTarget }: any) => (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center">
            <div className="flex items-center gap-2 text-[14px] font-semibold text-[#111827] font-outfit">
                <Target size={16} className="text-[#6B7280]" />
                <span>Semester target</span>
            </div>
            <Badge color="amber">Sem 6 ongoing</Badge>
        </div>
        <div className="p-6 space-y-5">
            <div>
                <label className="text-[12px] font-medium text-[#374151] font-outfit mb-2 block">Target SGPA for Sem 6</label>
                <input 
                  type="number" step="0.1" value={target} onChange={(e) => setTarget(e.target.value)}
                  className="w-full h-11 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-center text-[18px] font-mono font-bold text-[#111827] focus:ring-4 focus:ring-[#1A56DB]/5 focus:border-[#1A56DB] transition-all"
                />
            </div>
            <div className="flex flex-wrap gap-2">
                {['7.0','7.5','8.0','8.5','9.0'].map(val => (
                    <button key={val} onClick={() => setTarget(val)} className={`px-3 py-1 rounded-full text-[11px] font-bold font-outfit transition-all ${target === val ? 'bg-[#1A56DB] text-white' : 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F9FAFB]'}`}>{val}</button>
                ))}
            </div>
            <div className="pt-4 border-t border-[#F3F4F6] space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-[13px] font-medium text-[#374151] font-outfit">Achievability</span>
                    <Badge color="green">Achievable</Badge>
                </div>
                <p className="text-[12px] text-[#6B7280] font-outfit leading-relaxed">Required average of <span className="text-[#1A56DB] font-bold">85%</span> across subjects. This will raise your CGPA to <span className="text-[#1A56DB] font-bold">8.19</span>.</p>
            </div>
        </div>
    </div>
);

const FormulaSection = ({ expanded, onToggle }: any) => (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
        <button onClick={onToggle} className="w-full px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center hover:bg-[#F9FAFB] transition-colors">
            <div className="flex items-center gap-2 text-[14px] font-semibold text-[#111827] font-outfit">
                <BookOpen size={16} className="text-[#6B7280]" />
                <span>How your CGPA is calculated</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[12px] font-medium text-[#9CA3AF] font-outfit">{expanded ? 'Collapse' : 'Show calculation'}</span>
                <ChevronDown size={14} className={`text-[#9CA3AF] transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
            </div>
        </button>
        <AnimatePresence>
            {expanded && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                    <div className="p-8 space-y-10">
                        <div className="flex flex-col lg:flex-row gap-12">
                            <div className="flex-1">
                                <h3 className="text-[13px] font-bold text-[#111827] uppercase tracking-wider mb-4 font-outfit">The formula</h3>
                                <div className="bg-[#F9FAFB] border border-[#F3F4F6] rounded-xl p-6 text-center">
                                    <p className="text-[16px] font-mono font-bold text-[#111827]">CGPA = Σ (SGPA × Credits) ÷ Total Credits</p>
                                </div>
                                <div className="mt-6 space-y-3">
                                    {[
                                        'SGPA is your performance in one semester.',
                                        'Each SGPA is weighted by that semester\'s credit load.',
                                        'Higher-credit semesters impact your CGPA more.'
                                    ].map((text, i) => (
                                        <div key={i} className="flex gap-3 text-[13px] text-[#4B5563] font-outfit">
                                            <ChevronRight size={16} className="text-[#10B981] flex-shrink-0 mt-0.5" />
                                            <span>{text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-[1.5]">
                                <h3 className="text-[13px] font-bold text-[#111827] uppercase tracking-wider mb-4 font-outfit">Your actual calculation</h3>
                                <div className="border border-[#E5E7EB] rounded-xl overflow-hidden">
                                    <table className="w-full text-left font-mono text-[12px]">
                                        <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                                            <tr>
                                                <th className="px-4 py-2 font-bold text-[#9CA3AF]">SEM</th>
                                                <th className="px-4 py-2 text-right font-bold text-[#9CA3AF]">SGPA</th>
                                                <th className="px-4 py-2 text-right font-bold text-[#9CA3AF]">CREDITS</th>
                                                <th className="px-4 py-2 text-right font-bold text-[#9CA3AF]">PRODUCT</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#F3F4F6]">
                                            {[
                                                {s:1, gp:8.2, cr:22}, {s:2, gp:8.5, cr:21}, 
                                                {s:3, gp:7.9, cr:23}, {s:4, gp:9.0, cr:22}, 
                                                {s:5, gp:7.6, cr:21}
                                            ].map(r => (
                                                <tr key={r.s}>
                                                    <td className="px-4 py-2 text-[#6B7280]">Semester {r.s}</td>
                                                    <td className="px-4 py-2 text-right font-bold text-[#111827]">{r.gp.toFixed(2)}</td>
                                                    <td className="px-4 py-2 text-right text-[#6B7280]">{r.cr}</td>
                                                    <td className="px-4 py-2 text-right font-bold text-[#1A56DB]">{(r.gp*r.cr).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                            <tr className="bg-[#F9FAFB] font-bold border-t border-[#E5E7EB]">
                                                <td className="px-4 py-3 text-[#111827] font-outfit">TOTALS</td>
                                                <td className="px-4 py-3 text-right text-[#1A56DB] text-[14px]">8.24 CGPA</td>
                                                <td className="px-4 py-3 text-right text-[#111827]">109</td>
                                                <td className="px-4 py-3 text-right text-[#111827]">898.20</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4 bg-[#F0F7FF] border border-[#1A56DB]/10 rounded-xl p-4 flex gap-3">
                                    <Info size={16} className="text-[#1A56DB] flex-shrink-0 mt-0.5" />
                                    <p className="text-[12px] text-[#374151] font-outfit leading-relaxed">Your current CGPA of 8.04 is based on completed semesters (Sem 1–5). Semester 6 is projected at 8.1. Once finalized, your CGPA will update to approximately 8.21.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const SemesterHistoryTable = ({ showCumulative, onToggleCumulative, expandedRow, onExpandRow }: any) => (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center">
            <div className="flex items-center gap-2 text-[14px] font-semibold text-[#111827] font-outfit">
                <Calendar size={16} className="text-[#6B7280]" />
                <span>Semester history</span>
            </div>
            <button onClick={onToggleCumulative} className="text-[12px] font-medium text-[#1A56DB] hover:underline font-outfit">{showCumulative ? 'Hide cumulative CGPA' : 'Show cumulative CGPA'}</button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-[#F9FAFB] border-b border-[#F3F4F6]">
                    <tr className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider font-outfit">
                        <th className="px-6 py-4">Semester</th>
                        <th className="px-6 py-4 text-right">SGPA</th>
                        <th className="px-6 py-4">Grade</th>
                        <th className="px-6 py-4 text-right">Credits</th>
                        <th className="px-6 py-4 text-right">Rank</th>
                        <th className="px-6 py-4 text-right">Attendance</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Trend</th>
                        {showCumulative && <th className="px-6 py-4 text-right">Cumul. CGPA</th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F4F6]">
                    {STUDENT_DATA.semesterHistory.map((s, i) => {
                        const isCurrent = s.status === 'In Progress';
                        const isExpanded = expandedRow === s.sem;
                        return (
                            <React.Fragment key={s.sem}>
                                <tr 
                                  onClick={() => onExpandRow(s.sem)}
                                  className={`h-[52px] group cursor-pointer transition-colors ${isCurrent ? 'bg-[#1A56DB]/[0.03] border-l-2 border-l-[#1A56DB]' : 'hover:bg-[#F9FAFB]'} ${isExpanded ? 'bg-[#F0F7FF]' : ''}`}
                                >
                                    <td className="px-6 py-2 text-[13px] font-bold text-[#111827] font-outfit">Semester {s.sem} {isCurrent && '(Current)'}</td>
                                    <td className={`px-6 text-right font-mono font-bold text-[14px] ${s.sgpa >= 8.5 ? 'text-[#10B981]' : 'text-[#1A56DB]'}`}>{s.sgpa.toFixed(1)}{isCurrent ? '*' : ''}</td>
                                    <td className="px-6">
                                        <Badge color={s.sgpa >= 8.5 ? 'green' : s.sgpa >= 7.5 ? 'blue' : 'amber'}>{s.sgpa >= 9.0 ? 'O' : s.sgpa >= 8.5 ? 'A+' : 'A'}</Badge>
                                    </td>
                                    <td className="px-6 text-right font-mono text-[13px] text-[#374151]">{s.credits}</td>
                                    <td className={`px-6 text-right font-mono text-[13px] font-bold ${s.rank && s.rank <= 30 ? 'text-[#10B981]' : 'text-[#374151]'}`}>{s.rank ? `${s.rank}/120` : '—'}</td>
                                    <td className={`px-6 text-right font-mono text-[13px] font-bold ${s.attendance >= 85 ? 'text-[#10B981]' : 'text-[#F59E0B]'}`}>{s.attendance}%</td>
                                    <td className="px-6"><Badge color={isCurrent ? 'blue' : 'green'}>{s.status}</Badge></td>
                                    <td className="px-6">{i === 0 ? '—' : (s.sgpa > STUDENT_DATA.semesterHistory[i-1].sgpa ? <TrendingUp size={16} className="text-[#10B981]" /> : <TrendingDown size={16} className="text-[#EF4444]" />)}</td>
                                    {showCumulative && <td className="px-6 text-right font-mono font-bold text-[#1A56DB] text-[13px]">8.24</td>}
                                </tr>
                                <AnimatePresence>
                                    {isExpanded && (
                                        <tr className="bg-[#FAFAFA]">
                                            <td colSpan={showCumulative ? 9 : 8} className="p-0">
                                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                                    <div className="px-12 py-6 grid grid-cols-1 sm:grid-cols-2 gap-8 border-b border-[#F3F4F6]">
                                                        <div>
                                                            <p className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Course Breakdown</p>
                                                            <div className="space-y-2">
                                                                {['CS601 (A+)', 'CS602 (O)', 'CS603 (A)', 'MA601 (A+)'].map(c => (
                                                                    <div key={c} className="flex justify-between items-center text-[12px] font-outfit">
                                                                        <span className="text-[#4B5563]">{c.split(' ')[0]}</span>
                                                                        <span className="font-mono font-bold text-[#111827]">{c.split(' ')[1]}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4">
                                                            <p className="text-[11px] font-bold text-[#374151] font-outfit mb-2">Key achievement</p>
                                                            <p className="text-[12px] text-[#6B7280] font-outfit leading-relaxed italic">Featured in Dean's list for top 10% academic performance in Department.</p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </td>
                                        </tr>
                                    )}
                                </AnimatePresence>
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
        <p className="px-6 py-4 text-[11px] text-[#9CA3AF] font-outfit italic">* Projected based on latest internal marks and weekly test averages.</p>
    </div>
);

const PerformanceNarrative = ({ onCopy }: any) => (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center">
            <div className="flex items-center gap-2 text-[14px] font-semibold text-[#111827] font-outfit">
                <FileText size={16} className="text-[#6B7280]" />
                <span>Performance narrative</span>
            </div>
            <span className="text-[11px] text-[#9CA3AF] font-outfit italic">Auto-generated from your academic data</span>
        </div>
        <div id="performance-narrative-content" className="p-6 space-y-4">
            <NarrativeBlock accent="#1A56DB" content="Your current CGPA of 8.04 places you in the top 19% of your department across 130 credits completed over 5 semesters. This is a strong academic standing." />
            <NarrativeBlock accent="#10B981" content="Your strongest semester was Semester 4 with an SGPA of 9.0, when you ranked 12th in your department. That semester's performance was your highest across all recorded semesters." />
            <NarrativeBlock accent="#F59E0B" content="Your Semester 5 SGPA of 7.6 was your lowest, representing a dip of 1.4 points from your Semester 4 peak. This drop moved your rank from 12th to 68th." />
            <NarrativeBlock accent="#1A56DB" content="Your Semester 6 trajectory (projected SGPA 8.1) indicates a recovery from the Semester 5 dip. If this projection holds, your cumulative CGPA will improve to approximately 8.21." />
        </div>
        <div className="px-6 py-4 border-t border-[#F3F4F6] bg-[#F9FAFB] flex justify-end">
            <button onClick={onCopy} className="h-9 px-4 bg-white border border-[#E5E7EB] rounded-lg text-[12px] font-bold text-[#374151] font-outfit flex items-center gap-2 hover:bg-[#F9FAFB] active:scale-95 transition-all">
                <Copy size={14} />
                <span>Copy narrative</span>
            </button>
        </div>
    </div>
);

const NarrativeBlock = ({ accent, content }: any) => (
    <div className="border-l-[3px] bg-[#F9FAFB] rounded-r-xl p-4" style={{ borderLeftColor: accent }}>
        <p className="text-[13px] text-[#374151] font-outfit leading-[1.75]">{content}</p>
    </div>
);

export default CGPAProgress;
