import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, TrendingUp, Target, Activity, Star, 
  CheckCircle, Lock, Calendar, Download, Share2, 
  ArrowRight, Award, BookOpen, BarChart3, ChevronRight, 
  Search, Bell, Info, AlertCircle, XCircle, Milestone, 
  Layers, RefreshCw, AlertTriangle, Lightbulb, History, Users, Plus, X, 
  CheckSquare, Timer, Brain
} from 'lucide-react';
import StudentLayout from '../../components/layout/StudentLayout';

// ═══════════════════════════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════════════════════════

const ACHIEVEMENT_DATA = {
  stats: {
    cgpa: {
      current: 8.04,
      previous: 7.8,
      improvement: 0.24,
      percentage: 3.1,
      rank: { prev: 68, current: 23 },
      credits: { completed: 130, total: 180 }
    },
    sgpaHistory: [
      { sem: 'S1', value: 8.2 },
      { sem: 'S2', value: 8.5 },
      { sem: 'S3', value: 7.9 },
      { sem: 'S4', value: 9.0 },
      { sem: 'S5', value: 7.6 },
      { sem: 'S6', value: 8.1, projected: true }
    ],
    summaries: [
      { id: 1, icon: Trophy, color: '#F59E0B', text: "6 achievements unlocked" },
      { id: 2, icon: Target, color: '#10B981', text: "2 of 3 semester goals achieved" },
      { id: 3, icon: TrendingUp, color: '#1A56DB', text: "Improving in 3 of 4 subjects" },
      { id: 4, icon: Calendar, color: '#7C3AED', text: "18 weeks of test consistency" }
    ],
    mostImproved: {
      subject: "EC601 Digital Circuits",
      delta: "+17.4%",
      from: "Semester 5"
    }
  },
  unlockedBadges: [
    { id: 'b1', title: 'EC601 Top Scorer', category: 'Academic', icon: Star, color: '#1A56DB', date: '15 Mar 2026', desc: 'Scored above 82% in EC601 Digital Circuits across all internal assessments this semester' },
    { id: 'b2', title: 'Weekly Test Consistency', category: 'Consistency', icon: Activity, color: '#7C3AED', date: '12 Mar 2026', desc: 'Attended every weekly test for 18 consecutive weeks without a single absence' },
    { id: 'b3', title: 'CGPA Recovery', category: 'Improvement', icon: TrendingUp, color: '#10B981', date: '28 Feb 2026', desc: 'Recovered CGPA from 7.6 (Semester 5) to 8.04 (current) — a 0.44 point improvement' },
    { id: 'b4', title: 'CS602 Lab Excellence', category: 'Academic', icon: Star, color: '#1A56DB', date: '18 Mar 2026', desc: 'Scored above 88% in all CS602 Operating Systems lab assessments' },
    { id: 'b5', title: 'Assignment Submission Rate', category: 'Consistency', icon: CheckSquare, color: '#7C3AED', date: '10 Mar 2026', desc: 'Submitted 100% of assignments on time across all subjects in Semester 6' },
    { id: 'b6', title: 'Above Class Average', category: 'Academic', icon: Award, color: '#1A56DB', date: '14 Mar 2026', desc: 'Maintained above class average performance in EC601 for all 7 weekly tests this semester' }
  ],
  inProgressBadges: [
    { id: 'p1', title: 'CGPA 8.5 Target', category: 'Goal-based', icon: Target, color: '#F59E0B', progress: 68, criteria: 'Requires CGPA 8.5. Currently at 8.04. Need 0.46 more CGPA points.' },
    { id: 'p2', title: 'CS603 Recovery', category: 'Improvement', icon: TrendingUp, color: '#10B981', progress: 45, criteria: 'Improve CS603 marks by 15% vs current semester. Currently at 8% improvement.' },
    { id: 'p3', title: 'Perfect Week', category: 'Consistency', icon: Activity, color: '#7C3AED', progress: 71, criteria: 'Score above class average in all subjects in a single week. Achieved in 5 of 7 weeks.' },
    { id: 'p4', title: 'Semester Top 15%', category: 'Academic', icon: Award, color: '#1A56DB', progress: 55, criteria: 'Finish in the top 15% of your department. Currently ranked 19% (23rd of 120).' }
  ],
  subjectProgress: [
    { code: 'CS603', name: 'Software Eng', trajectory: [69, 72, 70, 71, 71.3], trend: 'Stable', delta: '+2.3%', color: 'amber' },
    { code: 'CS602', name: 'Operating Sys', trajectory: [77, 79, 80, 81, 81.1], trend: 'Improving', delta: '+4.1%', color: 'green' },
    { code: 'MA601', name: 'Discrete Math', trajectory: [60, 62, 58], trend: 'Needs data', delta: '—', color: 'gray' },
    { code: 'EC601', name: 'Digital Circuits', trajectory: [65, 72, 78, 80, 83], trend: 'Improving', delta: '+17.4%', color: 'green' }
  ],
  milestones: [
    { date: '18 Mar 2026', type: 'Achievement', title: 'Unlocked: CS602 Lab Excellence badge', desc: 'Scored 22/25 in CS602 Lab Assessment 3 — above 88% in all lab assessments.', impact: 'Badge unlocked', impactColor: 'amber' },
    { date: '15 Mar 2026', type: 'Academic', title: 'EC601 mid-semester 1 result: 22/30', desc: 'Above class average of 19.1. Strongest mid-semester performance.', impact: 'Class rank: Top 22%', impactColor: 'green' },
    { date: '12 Mar 2026', type: 'Consistency', title: '18 consecutive weekly tests attended', desc: 'No missed tests since Semester 5 Week 8. Longest streak on record.', impact: 'Consistency +1', impactColor: 'blue' },
    { date: '10 Mar 2026', type: 'Achievement', title: 'Unlocked: EC601 Top Scorer badge', desc: '83.2% overall internal score — highest in your enrolled subjects.', impact: 'Badge unlocked', impactColor: 'amber' },
    { date: '28 Feb 2026', type: 'Improvement', title: 'CGPA recovery confirmed: 8.04', desc: '0.4 point CGPA recovery. Rank improved from 68th to 23rd.', impact: 'CGPA +0.44', impactColor: 'green' }
  ],
  evolution: [
    { code: 'CS603', name: 'Software Eng', s4: 72, s5: 68, s6: 71, status: 'Watch' },
    { code: 'CS602', name: 'Operating Sys', s4: 75, s5: 76, s6: 81, status: 'Strength' },
    { code: 'MA601', name: 'Discrete Math', s4: 65, s5: 58, s6: 62, status: 'Improving' },
    { code: 'EC601', name: 'Digital Circuits', s4: 68, s5: 65, s6: 83, status: 'Strength' }
  ]
};

// ═══════════════════════════════════════════════════════════════
// HELPER COMPONENTS
// ═══════════════════════════════════════════════════════════════

const Badge = ({ children, color }: { children: React.ReactNode, color: string }) => {
  const styles: any = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    red: 'bg-red-50 text-red-700 border-red-100',
    violet: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    gray: 'bg-gray-50 text-gray-700 border-gray-100'
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${styles[color] || styles.gray}`}>
      {children}
    </span>
  );
};

const StatCard = ({ label, value, sub, icon: Icon, color, trend, trendColor, onClick }: any) => {
  return (
    <motion.div 
      whileHover={{ translateY: -3 }}
      onClick={onClick}
      className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 shadow-sm hover:shadow-md hover:border-[#D1D5DB] transition-all cursor-pointer border-l-[3px]"
      style={{ borderLeftColor: color }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15`, color }}>
          <Icon size={20} />
        </div>
        <Badge color={trendColor}>{trend}</Badge>
      </div>
      <div>
        <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-1 font-outfit">{label}</p>
        <h4 className="text-[32px] font-bold text-[#111827] font-mono leading-none mb-2">{value}</h4>
        <p className="text-[12px] text-[#6B7280] font-outfit">{sub}</p>
      </div>
    </motion.div>
  );
};

const AchievementCard = ({ badge, isLocked = false, onOpen }: any) => {
  const Icon = badge.icon;
  const color = badge.color;

  return (
    <motion.div 
      whileHover={!isLocked ? { translateY: -3, boxShadow: '0 8px 20px rgba(0,0,0,0.08)' } : {}}
      onClick={() => !isLocked && onOpen(badge)}
      className={`bg-white border ${isLocked ? 'opacity-60 grayscale' : 'hover:border-[#D1D5DB] cursor-pointer'} border-[#E5E7EB] rounded-[14px] p-4.5 transition-all relative group h-full flex flex-col`}
    >
      <div className="relative mb-3 flex justify-center">
        <div className={`w-14 h-14 rounded-[14px] flex items-center justify-center transition-all ${!isLocked && 'group-hover:brightness-110'}`} style={{ backgroundColor: `${color}15`, color }}>
          {isLocked ? <Lock size={20} className="text-[#D1D5DB]" /> : <Icon size={28} />}
        </div>
        {!isLocked && badge.date && (
          <div className="absolute -top-1 -right-1">
            <CheckCircle size={16} className="text-[#10B981] fill-white" />
          </div>
        )}
      </div>

      <div className="flex-1">
        <h5 className={`text-[13px] font-bold font-outfit mb-1 ${isLocked ? 'text-[#9CA3AF]' : 'text-[#111827]'}`}>{badge.title}</h5>
        <p className={`text-[11px] font-outfit line-height-1.5 mb-3 ${isLocked ? 'text-[#D1D5DB]' : 'text-[#6B7280]'}`}>{badge.desc}</p>
      </div>

      {badge.progress !== undefined && (
         <div className="mb-3">
            <div className="flex justify-between text-[10px] font-mono mb-1" style={{ color }}>
                <span>Progress</span>
                <span>{badge.progress}%</span>
            </div>
            <div className="h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${badge.progress}%` }}
                    className="h-full"
                    style={{ backgroundColor: color }}
                />
            </div>
         </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-[#F3F4F6] mt-auto">
        <div className="flex items-center gap-1">
          <Calendar size={10} className="text-[#9CA3AF]" />
          <span className="text-[10px] font-mono text-[#9CA3AF]">{badge.date || 'Locked'}</span>
        </div>
        <Badge color={badge.category === 'Academic' ? 'blue' : badge.category === 'Improvement' ? 'green' : badge.category === 'Consistency' ? 'violet' : 'amber'}>
            {badge.category}
        </Badge>
      </div>
    </motion.div>
  );
};

const Sparkline = ({ data }: { data: any[] }) => {
  const width = 260;
  const height = 100;
  const padding = 10;
  
  const minV = 7.0;
  const maxV = 10.0;
  
  const points = data.map((d, i) => ({
    x: padding + (i * ((width - 2 * padding) / (data.length - 1))),
    y: height - padding - ((d.value - minV) / (maxV - minV)) * (height - 2 * padding),
    ...d
  }));

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${path} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <div className="relative group w-full flex flex-col items-center">
      <p className="text-[10px] font-bold text-[#9CA3AF] mb-4 uppercase tracking-[0.15em] font-outfit self-start lg:self-center">SGPA per semester</p>
      <div className="relative">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
          {/* Reference lines */}
          <line x1={0} y1={height - padding - ((8.0 - minV) / (maxV - minV)) * (height - 2 * padding)} x2={width} y2={height - padding - ((8.0 - minV) / (maxV - minV)) * (height - 2 * padding)} stroke="#E5E7EB" strokeDasharray="4 4" strokeWidth="1" />
          <line x1={0} y1={height - padding - ((7.5 - minV) / (maxV - minV)) * (height - 2 * padding)} x2={width} y2={height - padding - ((7.5 - minV) / (maxV - minV)) * (height - 2 * padding)} stroke="#FEE2E2" strokeDasharray="4 4" strokeWidth="1" />
          
          {/* Area fill */}
          <motion.path 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            d={areaPath} 
            fill="rgba(26,86,219,0.06)" 
          />
          
          {/* Line */}
          <motion.path 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            d={path} 
            fill="none" 
            stroke="#1A56DB" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          
          {/* Data points */}
          {points.map((p, i) => (
            <motion.g 
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.15, type: 'spring' }}
            >
              <circle 
                cx={p.x} 
                cy={p.y} 
                r={p.projected ? 5 : 4} 
                className={`${p.projected ? 'fill-white stroke-[#1A56DB]' : 'fill-[#1A56DB] stroke-white'} stroke-[2.5]`} 
              />
              {p.projected && (
                  <text x={p.x + 8} y={p.y - 12} className="text-[10px] font-bold fill-[#1A56DB] font-outfit uppercase tracking-tighter">NOW</text>
              )}
              <text x={p.x} y={height + 14} textAnchor="middle" className="text-[11px] font-mono font-bold fill-[#9CA3AF]">{p.sem}</text>
            </motion.g>
          ))}
        </svg>
      </div>
    </div>
  );
};

const MilestoneItem = ({ item, isLast, index }: any) => {
  const getIconColor = (type: string) => {
    switch(type) {
      case 'Academic': return '#1A56DB';
      case 'Improvement': return '#10B981';
      case 'Achievement': return '#F59E0B';
      case 'CGPA': return '#7C3AED';
      case 'Consistency': return '#0EA5E9';
      default: return '#6B7280';
    }
  };

  return (
    <div className="flex group min-h-[100px]">
      <div className="flex flex-col items-center mr-8">
        <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', delay: index * 0.1 }}
            className="w-4 h-4 rounded-full z-10 border-2 border-white shadow-sm flex items-center justify-center shrink-0" 
            style={{ backgroundColor: getIconColor(item.type) }}
        />
        {!isLast && (
           <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-[2px] bg-[#E5E7EB] flex-1 relative"
           >
              <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-[#1A56DB] to-[#93C5FD] opacity-20" />
           </motion.div>
        )}
      </div>
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.1 }}
        className="flex-1 pb-10"
      >
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4.5 group-hover:bg-[#F9FAFB] transition-all cursor-default">
           <div className="flex justify-between items-start mb-3">
              <Badge color={item.type === 'Academic' ? 'blue' : item.type === 'Achievement' ? 'amber' : item.type === 'Consistency' ? 'violet' : 'green'}>
                {item.type}
              </Badge>
              <span className="text-[11px] font-mono text-[#9CA3AF] bg-[#F3F4F6] px-2 py-0.5 rounded-full">{item.date}</span>
           </div>
           <h4 className="text-[14px] font-bold text-[#111827] font-outfit mb-1">{item.title}</h4>
           <div className="flex items-center gap-2 mb-3">
              <p className="text-[12px] text-[#6B7280] font-outfit flex-1 leading-relaxed">{item.desc}</p>
           </div>
           <div className="flex items-center justify-between mt-autp">
              <Badge color={item.impactColor || 'gray'}>{item.impact}</Badge>
              <button className="text-[11px] font-bold text-[#1A56DB] hover:underline flex items-center gap-1">View details <ArrowRight size={12}/></button>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

const GoalArc = ({ current = 0, target = 8.5 }: { current?: number, target?: number }) => {
    const safeCurrent = typeof current === 'number' ? current : 0;
    const safeTarget = typeof target === 'number' && target > 0 ? target : 8.5;
    const percentage = Math.min((safeCurrent / safeTarget) * 100, 100);
    const radius = 80;
    const halfCircumference = Math.PI * radius;
    const strokeDashoffset = halfCircumference - (percentage / 100) * halfCircumference;

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-[180px] h-[90px] overflow-visible">
                <svg width="180" height="90" viewBox="0 0 180 90">
                    <path
                        d="M 10 90 A 80 80 0 0 1 170 90"
                        fill="none"
                        stroke="#F3F4F6"
                        strokeWidth="12"
                        strokeLinecap="round"
                    />
                    <motion.path
                        initial={{ strokeDashoffset: halfCircumference }}
                        whileInView={{ strokeDashoffset }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        d="M 10 90 A 80 80 0 0 1 170 90"
                        fill="none"
                        stroke="#1A56DB"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={halfCircumference.toString()}
                    />
                </svg>
                <div className="absolute top-[45px] inset-x-0 flex flex-col items-center justify-center">
                    <span className="text-[32px] font-bold text-[#111827] font-fraunces leading-none">{safeCurrent.toFixed(2)}</span>
                    <span className="text-[11px] font-bold text-[#9CA3AF] font-outfit uppercase tracking-wider mt-1.5">/ {safeTarget} target</span>
                </div>
            </div>
            <div className="mt-8 px-5 py-2 bg-blue-50 text-[#1A56DB] rounded-full font-outfit text-[12px] font-bold border border-blue-100/50 shadow-sm">
                {Math.round(percentage)}% toward CGPA target
            </div>
            <p className="text-[11px] font-medium text-[#9CA3AF] font-outfit mt-3 uppercase tracking-widest">
                {(safeTarget - safeCurrent).toFixed(2)} pts remaining
            </p>
        </div>
    );
};

const Achievements = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [selectedBadge, setSelectedBadge] = useState<any>(null);

    const filteredUnlocked = useMemo(() => {
        if (activeTab === 'All') return ACHIEVEMENT_DATA.unlockedBadges;
        if (activeTab === 'In Progress') return [];
        return ACHIEVEMENT_DATA.unlockedBadges.filter(b => b.category === activeTab);
    }, [activeTab]);

    const filteredInProgress = useMemo(() => {
        if (activeTab === 'All' || activeTab === 'In Progress') return ACHIEVEMENT_DATA.inProgressBadges;
        return ACHIEVEMENT_DATA.inProgressBadges.filter(b => b.category === activeTab);
    }, [activeTab]);

    return (
        <StudentLayout activePage="achievements" onNavigate={() => {}}>
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="max-w-[1400px] mx-auto px-7 pb-20 space-y-6"
            >
                {/* PAGE HEADER */}
                <header className="flex justify-between items-end pb-5 border-b border-[#F3F4F6]">
                    <div>
                        <h1 className="text-[24px] font-fraunces font-light italic text-[#111827]">Achievements & Progress</h1>
                        <p className="mt-1 text-[13px] font-outfit text-[#6B7280]">Your complete academic growth journey · Semester 1 through Semester 6</p>
                        <p className="mt-1 text-[11px] font-outfit text-[#9CA3AF]">All data is sourced directly from your marks, attendance, and exam history</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="h-10 px-4 bg-white border border-[#E5E7EB] rounded-lg text-[13px] font-medium font-outfit text-[#374151] flex items-center gap-2 hover:bg-[#F9FAFB] active:scale-95 transition-all">
                            <Share2 size={16} /> Share Progress
                        </button>
                        <button className="h-10 px-5 bg-white border border-[#E5E7EB] rounded-lg text-[13px] font-medium font-outfit text-[#374151] flex items-center gap-2 hover:bg-[#F9FAFB] active:scale-95 transition-all shadow-sm">
                            <Download size={16} /> Export Report
                        </button>
                    </div>
                </header>

                {/* SECTION A: PROGRESS OVERVIEW HERO */}
                <section className="bg-white border border-[#E5E7EB] rounded-[20px] p-8 shadow-[0_4px_24px_rgba(12,36,97,0.08)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-blue-500/5 to-transparent rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
                    
                    <div className="flex flex-col lg:flex-row justify-between gap-12 relative z-10">
                        {/* Left side: CGPA journey */}
                        <div className="flex-1 flex flex-col justify-center">
                            <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.2em] mb-8 font-outfit">CGPA Journey</p>
                            <div className="flex items-center gap-6 mb-8">
                                <span className="text-[32px] font-fraunces font-light text-[#9CA3AF] opacity-50">{ACHIEVEMENT_DATA?.stats?.cgpa?.previous}</span>
                                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 shadow-sm">
                                    <ArrowRight size={20} className="text-[#10B981]" />
                                </div>
                                <span className="text-[56px] font-fraunces font-medium text-[#111827] leading-none tracking-tight">{ACHIEVEMENT_DATA?.stats?.cgpa?.current}</span>
                                <div className="px-4 py-1.5 bg-[#ECFDF5] text-[#10B981] text-[18px] font-mono font-bold rounded-xl border border-[#A7F3D0] shadow-sm">
                                    +{ACHIEVEMENT_DATA?.stats?.cgpa?.improvement}
                                </div>
                            </div>
                            <div className="space-y-5">
                                <div className="flex items-center gap-3 text-[#10B981] font-bold text-[14px] font-outfit bg-emerald-50/50 w-fit px-3 py-1.5 rounded-lg border border-emerald-100/50">
                                    <TrendingUp size={18} />
                                    <span>Improved by {ACHIEVEMENT_DATA?.stats?.cgpa?.percentage}% vs last sem</span>
                                </div>
                                <div className="flex items-center gap-4 text-[13px] font-outfit text-[#4B5563]">
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                                        <Award size={16} className="text-[#9CA3AF]" />
                                    </div>
                                    <span>Rank improved: <span className="font-bold text-[#111827]">{ACHIEVEMENT_DATA?.stats?.cgpa?.rank?.prev}th</span> → <span className="font-bold text-[#111827]">{ACHIEVEMENT_DATA?.stats?.cgpa?.rank?.current}rd</span> this semester</span>
                                </div>
                                <div className="flex items-center gap-4 text-[13px] font-outfit text-[#4B5563]">
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                                        <BookOpen size={16} className="text-[#9CA3AF]" />
                                    </div>
                                    <span><span className="font-bold text-[#111827]">{ACHIEVEMENT_DATA?.stats?.cgpa?.credits?.completed}</span> of {ACHIEVEMENT_DATA?.stats?.cgpa?.credits?.total} credits completed · <span className="text-blue-600 font-bold">72% track</span></span>
                                </div>
                            </div>
                        </div>

                        {/* Center: Sparkline */}
                        <div className="flex items-center justify-center lg:px-12 lg:border-x lg:border-[#F3F4F6]">
                            <Sparkline data={ACHIEVEMENT_DATA.stats.sgpaHistory} />
                        </div>

                        {/* Right side: Summaries */}
                        <div className="w-full lg:w-[340px] flex flex-col justify-center">
                            <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.2em] mb-6 font-outfit">Performance Quick-View</p>
                            <div className="space-y-3">
                                {ACHIEVEMENT_DATA.stats.summaries.map(sum => (
                                    <div key={sum.id} className="flex items-center gap-4 p-4 bg-white border border-[#F3F4F6] rounded-2xl hover:border-[#E5E7EB] hover:shadow-sm transition-all group/sum">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors" style={{ backgroundColor: `${sum.color}10` }}>
                                            <sum.icon size={18} style={{ color: sum.color }} />
                                        </div>
                                        <span className="text-[14px] font-bold text-[#374151] font-outfit group-hover/sum:text-[#111827]">{sum.text}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 p-4 bg-[#ECFDF5] border-l-4 border-[#10B981] rounded-r-2xl shadow-sm">
                                <p className="text-[10px] font-bold text-[#059669] uppercase tracking-wider mb-1 font-outfit">Most improved subject</p>
                                <p className="text-[13px] font-bold text-[#111827] font-outfit leading-tight">
                                    {ACHIEVEMENT_DATA.stats.mostImproved.subject} <span className="text-[#10B981] ml-1">{ACHIEVEMENT_DATA.stats.mostImproved.delta}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION B: SUMMARY STAT CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <StatCard 
                        label="ACHIEVEMENTS UNLOCKED" 
                        value="6" 
                        sub="4 academic · 1 improvement · 1 consistency" 
                        icon={Trophy} 
                        color="#F59E0B" 
                        trend="+2 new" 
                        trendColor="green" 
                    />
                    <StatCard 
                        label="OVERALL GROWTH" 
                        value="+3.1%" 
                        sub="CGPA improvement vs last semester" 
                        icon={TrendingUp} 
                        color="#10B981" 
                        trend="↑ Improving" 
                        trendColor="green" 
                    />
                    <StatCard 
                        label="GOALS ACHIEVED" 
                        value="2/3" 
                        sub="Semester 6 goals · 1 in progress" 
                        icon={CheckCircle} 
                        color="#1A56DB" 
                        trend="1 remaining" 
                        trendColor="amber" 
                    />
                    <StatCard 
                        label="CONSISTENCY SCORE" 
                        value="82%" 
                        sub="Test attendance + submission rate" 
                        icon={Activity} 
                        color="#7C3AED" 
                        trend="↑ +7% vs S5" 
                        trendColor="green" 
                    />
                </div>

                {/* SECTION C: ACHIEVEMENT BADGES */}
                <section className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center bg-[#F9FAFB]/50">
                        <div className="flex items-center gap-2">
                            <Trophy size={16} className="text-[#F59E0B]" />
                            <h3 className="text-[14px] font-bold text-[#111827] font-outfit">Achievements</h3>
                        </div>
                        <span className="text-[12px] text-[#6B7280]">6 unlocked · 4 in progress · 5 locked</span>
                    </div>

                    <div className="bg-[#F9FAFB] h-11 border-b border-[#F3F4F6] px-6 flex items-center">
                        <div className="flex gap-6 h-full items-center relative">
                            {['All', 'Academic', 'Improvement', 'Consistency', 'In Progress'].map(tab => (
                                <button 
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`text-[12px] font-bold font-outfit h-full border-b-[2px] transition-all px-1 ${
                                        activeTab === tab ? 'text-[#1A56DB] border-[#1A56DB]' : 'text-[#9CA3AF] border-transparent hover:text-[#6B7280]'
                                    }`}
                                >
                                    {tab} {tab === 'All' ? '(6)' : tab === 'Academic' ? '(4)' : tab === 'In Progress' ? '(4)' : '(1)'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredUnlocked.map(badge => (
                                <AchievementCard key={badge.id} badge={badge} onOpen={setSelectedBadge} />
                            ))}
                            {filteredInProgress.map(badge => (
                                <AchievementCard key={badge.id} badge={badge} onOpen={setSelectedBadge} />
                            ))}
                            {activeTab === 'All' && [1, 2, 3, 4].map(i => (
                                <AchievementCard key={i} badge={{ title: 'Locked Achievement', desc: 'Criteria not yet met', category: 'Goal-based', color: '#6B7280' }} isLocked={true} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION D: TWO-COLUMN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 items-start">
                    {/* LEFT COLUMN: PROGRESS ANALYTICS */}
                    <section className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center bg-[#F9FAFB]/50">
                            <div className="flex items-center gap-2">
                                <BarChart3 size={16} className="text-[#6B7280]" />
                                <h3 className="text-[14px] font-bold text-[#111827] font-outfit">Progress Analytics</h3>
                            </div>
                            <select className="h-9 px-3 bg-white border border-[#E5E7EB] rounded-lg text-[12px] font-medium outline-none">
                                <option>This semester</option>
                                <option>All semesters</option>
                            </select>
                        </div>
                        
                        <div className="p-6">
                            <p className="text-[12px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-6 font-outfit">Subject-wise improvement</p>
                            <div className="space-y-0">
                                {ACHIEVEMENT_DATA.subjectProgress.map(sub => (
                                    <div key={sub.code} className="py-4 border-b border-[#F3F4F6] flex items-center group">
                                        <div className="w-[180px] shrink-0">
                                            <p className="text-[10px] font-mono font-bold text-[#9CA3AF]">{sub.code}</p>
                                            <p className="text-[14px] font-bold text-[#111827]">{sub.name}</p>
                                        </div>
                                        <div className="flex-1 flex items-center gap-3">
                                            {sub.trajectory.map((val, idx) => (
                                                <React.Fragment key={idx}>
                                                    <div 
                                                        className={`w-11 h-8 rounded-lg flex items-center justify-center text-[12px] font-mono font-bold ${
                                                            val >= 75 ? 'bg-emerald-50 text-emerald-700' : 
                                                            val >= 60 ? 'bg-blue-50 text-blue-700' :
                                                            val >= 50 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                                                        }`}
                                                    >
                                                        {Math.round(val)}%
                                                    </div>
                                                    {idx < sub.trajectory.length - 1 && <ArrowRight size={10} className="text-[#D1D5DB]" />}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <div className={`flex items-center gap-1.5 text-[11px] font-bold ${sub.trend === 'Improving' ? 'text-emerald-600' : sub.trend === 'Declining' ? 'text-red-500' : 'text-amber-500'}`}>
                                                {sub.trend === 'Improving' ? <TrendingUp size={14}/> : sub.trend === 'Declining' ? <TrendingUp size={14} className="rotate-180"/> : <X size={14}/>}
                                                {sub.trend}
                                            </div>
                                            <p className={`text-[13px] font-mono font-bold ${sub.trend === 'Improving' ? 'text-emerald-600' : 'text-[#111827]'}`}>{sub.delta}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10">
                                <p className="text-[12px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-6 font-outfit">Exam Performance Trend — Semester 6</p>
                                <div className="h-[200px] w-full bg-[#F9FAFB] rounded-2xl border border-dashed border-[#E5E7EB] flex items-center justify-center text-[#9CA3AF]">
                                    {/* Mock chart background */}
                                    <div className="relative w-full h-full p-6">
                                        <div className="absolute inset-0 flex justify-between px-10 items-end pb-8">
                                            {[1,2,3,4,5,6,7].map(w => <span key={w} className="text-[10px] font-mono">W{w}</span>)}
                                        </div>
                                        <svg className="w-full h-[120px]" preserveAspectRatio="none">
                                            <motion.path 
                                                d="M 20 100 L 100 80 L 180 90 L 260 60 L 340 70 L 420 40 L 500 50" 
                                                fill="none" stroke="#1A56DB" strokeWidth="2" strokeDasharray="5 5" 
                                            />
                                            <motion.path 
                                                d="M 20 80 L 100 60 L 180 70 L 260 40 L 340 50 L 420 20 L 500 30" 
                                                fill="none" stroke="#7C3AED" strokeWidth="2" 
                                            />
                                        </svg>
                                        <div className="absolute bottom-16 right-6 flex gap-4">
                                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#1A56DB]"/> <span className="text-[10px] font-bold">Weekly</span></div>
                                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#7C3AED]"/> <span className="text-[10px] font-bold">Mid-Sem</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* RIGHT COLUMN: GOAL TRACKING */}
                    <aside className="space-y-6">
                        <section className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-6 sticky top-24">
                            <div className="flex justify-between items-center mb-8">
                                <div className="flex items-center gap-2">
                                    <Target size={16} className="text-[#6B7280]" />
                                    <h3 className="text-[14px] font-bold text-[#111827] font-outfit">Goal Tracking</h3>
                                </div>
                                <button className="text-[12px] font-bold text-[#1A56DB] px-3 py-1 rounded-full border border-[#E5E7EB] hover:bg-blue-50 flex items-center gap-1.5 transition-all">
                                    <Plus size={14}/> Set Goals
                                </button>
                            </div>

                            <GoalArc current={ACHIEVEMENT_DATA?.stats?.cgpa?.current} target={8.5} />

                            <div className="mt-8 space-y-8">
                                    <div>
                                        <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.2em] mb-6 font-outfit">Subject Targets</p>
                                        <div className="space-y-7">
                                            {[
                                                { code: 'CS603', name: 'Software Eng', current: 69, target: 75, status: 'On track', color: '#1A56DB' },
                                                { code: 'CS602', name: 'Operating Sys', current: 77, target: 75, status: 'Met ✓', color: '#10B981' },
                                                { code: 'MA601', name: 'Discrete Math', current: 60, target: 70, status: 'Behind', color: '#F59E0B' },
                                            ].map(target => (
                                                <div key={target.code} className="group/target">
                                                    <div className="flex justify-between items-end mb-3">
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="text-[10px] font-mono font-bold text-[#9CA3AF] uppercase px-1.5 py-0.5 bg-gray-50 rounded border border-gray-100">{target.code}</span>
                                                                <span className={`text-[11px] font-bold font-outfit uppercase tracking-wider ${target.status === 'Met ✓' ? 'text-emerald-500' : target.status === 'Behind' ? 'text-amber-500' : 'text-blue-500'}`}>
                                                                    {target.status}
                                                                </span>
                                                            </div>
                                                            <h4 className="text-[14px] font-bold text-[#111827] font-outfit">{target.name}</h4>
                                                        </div>
                                                        <div className="text-right">
                                                            <span className="text-[14px] font-bold text-[#111827] font-mono">{target.current}%</span>
                                                            <span className="text-[11px] font-bold text-[#9CA3AF] font-mono mx-1">/</span>
                                                            <span className="text-[12px] font-bold text-[#4B5563] font-mono">{target.target}%</span>
                                                        </div>
                                                    </div>
                                                    <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden relative border border-gray-50 shadow-inner">
                                                        <div 
                                                            className="absolute top-0 bottom-0 left-0 bg-white/30 w-full z-10 pointer-events-none"
                                                            style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', backgroundSize: '200% 100%', animation: 'shimmer 2s infinite linear' }}
                                                        />
                                                        <motion.div 
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${(target.current / target.target) * 100}%` }}
                                                            className="h-full rounded-full z-0"
                                                            style={{ backgroundColor: target.color }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                <div className="pt-6 border-t border-[#F3F4F6]">
                                    <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-4">Semester SGPA Target</p>
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <p className="text-[24px] font-light text-[#9CA3AF] font-dm-mono">8.5</p>
                                            <p className="text-[10px] text-[#9CA3AF] uppercase font-bold">Target SGPA</p>
                                        </div>
                                        <ArrowRight className="text-[#D1D5DB]" />
                                        <div className="text-right">
                                            <p className="text-[24px] font-bold text-[#1A56DB] font-dm-mono">8.1 *</p>
                                            <p className="text-[10px] text-[#93C5FD] uppercase font-bold">Projected</p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-blue-50/50 border-l-[3px] border-[#1A56DB] rounded-r-xl">
                                        <p className="text-[12px] font-medium text-[#374151] font-outfit leading-relaxed">
                                            Need <span className="font-bold">46/60 avg</span> in End Semester to reach SGPA 8.5
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </aside>
                </div>

                {/* SECTION E: MILESTONES TIMELINE */}
                <section className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center bg-[#F9FAFB]/50">
                        <div className="flex items-center gap-2">
                             <Milestone size={16} className="text-[#6B7280]" />
                             <h3 className="text-[14px] font-bold text-[#111827] font-outfit">Academic Milestones</h3>
                        </div>
                        <select className="h-9 px-3 bg-white border border-[#E5E7EB] rounded-lg text-[12px] font-medium outline-none">
                            <option>This semester</option>
                            <option>All time</option>
                        </select>
                    </div>
                    <div className="p-8 pb-4">
                        <div className="max-w-[800px]">
                            {ACHIEVEMENT_DATA.milestones.map((item, idx) => (
                                <MilestoneItem 
                                    key={idx} 
                                    item={item} 
                                    index={idx}
                                    isLast={idx === ACHIEVEMENT_DATA.milestones.length - 1} 
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION F: STRENGTH VS WEAKNESS EVOLUTION */}
                <section className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center bg-[#F9FAFB]/50">
                        <div className="flex items-center gap-2">
                             <Layers size={16} className="text-[#6B7280]" />
                             <h3 className="text-[14px] font-bold text-[#111827] font-outfit">Strength vs Weakness Evolution</h3>
                        </div>
                        <span className="text-[11px] italic text-[#9CA3AF]">Across last 3 semesters</span>
                    </div>
                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#F9FAFB] text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">
                                    <tr>
                                        <th className="px-6 py-4 w-[220px]">Subject</th>
                                        <th className="px-6 py-4 text-center">Sem 4</th>
                                        <th className="px-6 py-4 text-center">Sem 5</th>
                                        <th className="px-6 py-4 text-center border-x border-[#F3F4F6] bg-blue-50/30">Sem 6 (Cur)</th>
                                        <th className="px-6 py-4 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F3F4F6]">
                                    {ACHIEVEMENT_DATA.evolution.map(sub => (
                                        <tr key={sub.code} className="hover:bg-[#F9FAFB] transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="text-[10px] font-mono text-[#9CA3AF] uppercase mb-0.5">{sub.code}</p>
                                                <p className="text-[13px] font-bold text-[#111827]">{sub.name}</p>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className={`inline-flex w-12 h-8 items-center justify-center rounded-lg text-[11px] font-mono font-bold ${sub.s4 >= 75 ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>
                                                    {sub.s4}%
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className={`inline-flex w-12 h-8 items-center justify-center rounded-lg text-[11px] font-mono font-bold ${sub.s5 >= 75 ? 'bg-emerald-50 text-emerald-700' : sub.s5 >= 60 ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'}`}>
                                                    {sub.s5}%
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center border-x border-[#F3F4F6] bg-blue-50/10">
                                                <div className={`inline-flex w-[52px] h-9 items-center justify-center rounded-xl text-[13px] font-mono font-bold shadow-sm ${sub.s6 >= 75 ? 'bg-emerald-500 text-white' : 'bg-[#1A56DB] text-white'}`}>
                                                    {sub.s6}%
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Badge color={sub.status === 'Strength' ? 'green' : sub.status === 'Improving' ? 'blue' : 'amber'}>{sub.status}</Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-4 px-6 py-3 bg-[#F9FAFB] rounded-xl border border-[#F3F4F6]">
                            <span className="text-[12px] font-bold text-emerald-700 flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"/> 2 strengths</span>
                            <span className="text-[12px] font-bold text-red-600 flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500"/> 0 concern areas</span>
                            <span className="text-[12px] font-bold text-blue-700 flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"/> 1 subject improving</span>
                        </div>
                    </div>
                </section>

                {/* SECTION G: SMART INSIGHTS STRIP */}
                <section className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-[#F3F4F6] flex justify-between items-center bg-[#F9FAFB]/50">
                        <div className="flex items-center gap-2">
                             <Brain size={18} className="text-[#7C3AED]" />
                             <h3 className="text-[14px] font-bold text-[#111827] font-outfit">Growth Intelligence</h3>
                        </div>
                        <span className="text-[11px] italic text-[#9CA3AF]">Personalized for you</span>
                    </div>
                    <div className="p-6 overflow-x-auto flex gap-5 custom-scrollbar pb-8">
                        {[
                            { color: 'green', icon: TrendingUp, title: 'Biggest improvement: EC601', body: 'EC601 Digital Circuits improved 17.4% from Semester 5. This is your strongest growth area.' },
                            { color: 'blue', icon: Activity, title: '18-week test consistency', body: 'You have attended every weekly test for 18 consecutive weeks. This correlates with 8% better final scores.' },
                            { color: 'violet', icon: RefreshCw, title: 'CGPA recovery in progress', body: 'Your CGPA recovered from 7.6 to 8.04. Recovery is on track to reach 8.21 at year end.' },
                            { color: 'amber', icon: Trophy, title: 'Next achievement: 3 days away', body: "The 'CS602 Weekly Improvement' achievement requires 5 consecutive weeks of improvement. You are on Week 4." }
                        ].map((insight, idx) => (
                             <div key={idx} className={`min-w-[320px] p-6 rounded-2xl border border-l-4 shadow-sm hover:shadow-md transition-all ${
                                 insight.color === 'green' ? 'border-emerald-500 bg-emerald-50/5' : 
                                 insight.color === 'blue' ? 'border-blue-500 bg-blue-50/5' :
                                 insight.color === 'violet' ? 'border-indigo-500 bg-indigo-50/5' : 'border-amber-400 bg-amber-50/5'
                             }`}>
                                <insight.icon size={24} className="mb-4" style={{ color: insight.color === 'green' ? '#10B981' : insight.color === 'blue' ? '#1A56DB' : insight.color === 'violet' ? '#7C3AED' : '#F59E0B' }}/>
                                <h5 className="text-[15px] font-bold text-[#111827] mb-2">{insight.title}</h5>
                                <p className="text-[13px] text-[#6B7280] leading-relaxed mb-4">{insight.body}</p>
                                <button className="text-[12px] font-bold text-indigo-600 hover:underline">View details →</button>
                             </div>
                        ))}
                    </div>
                </section>

                {/* MODAL POPOVER FOR BADGES */}
                <AnimatePresence>
                    {selectedBadge && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                exit={{ opacity: 0 }} 
                                onClick={() => setSelectedBadge(null)} 
                                className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
                            />
                            <motion.div 
                                initial={{ scale: 0.95, opacity: 0 }} 
                                animate={{ scale: 1, opacity: 1 }} 
                                exit={{ scale: 0.95, opacity: 0 }} 
                                className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative z-10 p-8"
                            >
                                <button 
                                    onClick={() => setSelectedBadge(null)} 
                                    className="absolute top-6 right-6 p-2 hover:bg-[#F9FAFB] rounded-xl transition-all"
                                >
                                    <X size={20} className="text-[#9CA3AF]" />
                                </button>

                                <div className="flex flex-col items-center text-center">
                                    <div className="w-20 h-20 rounded-[20px] flex items-center justify-center mb-6" style={{ backgroundColor: `${selectedBadge.color}15`, color: selectedBadge.color }}>
                                        <selectedBadge.icon size={44} />
                                    </div>
                                    <Badge color={selectedBadge.category === 'Academic' ? 'blue' : selectedBadge.category === 'Improvement' ? 'green' : 'violet'}>{selectedBadge.category}</Badge>
                                    <h2 className="text-[22px] font-bold font-fraunces italic text-[#111827] mt-4">{selectedBadge.title}</h2>
                                    <p className="text-[12px] font-mono text-[#9CA3AF] mb-6">{selectedBadge.date || 'In Progress'}</p>
                                    
                                    <p className="text-[14px] text-[#374151] leading-relaxed mb-8 px-4">
                                        {selectedBadge.desc || selectedBadge.criteria}
                                    </p>

                                    <div className="w-full p-4 bg-blue-50/50 rounded-2xl mb-8 flex items-start gap-3 text-left">
                                        <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
                                        <p className="text-[12px] text-blue-800 leading-relaxed font-outfit">
                                            {selectedBadge.category === 'Academic' ? 
                                                'Academic consistency in this subject supports your final End-Semester grades and demonstrates technical proficiency to external evaluators.' : 
                                                'Improving your scores demonstrates high adaptive learning capabilities, a key trait recruiters look for in senior engineering roles.'
                                            }
                                        </p>
                                    </div>

                                    <div className="flex gap-3 w-full">
                                        <button className="flex-1 h-12 rounded-xl border border-[#E5E7EB] text-[13px] font-bold text-[#374151] hover:bg-[#F9FAFB] transition-all flex items-center justify-center gap-2">
                                            <Share2 size={16} /> Share Achievement
                                        </button>
                                        <button 
                                            onClick={() => setSelectedBadge(null)}
                                            className="h-12 px-6 bg-[#1A56DB] text-white rounded-xl text-[13px] font-bold hover:bg-[#1648C0] transition-all"
                                        >
                                            Got it
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </motion.div>
        </StudentLayout>
    );
};

export default Achievements;
