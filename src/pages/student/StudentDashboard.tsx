import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart2, Calendar, Calculator, Download, Users, 
  AlertTriangle, CheckCircle, ArrowUpRight, ArrowDownRight,
  FileText, MessageSquare, History, Activity, ExternalLink,
  ChevronDown, Heart, Send, Plus, X, Search, Info, Clock,
  LayoutDashboard, ClipboardList, TrendingUp, Bell
} from 'lucide-react';
import { 
  studentInfo, subjects, notifications, recentActivity, 
  remarks, reports, sgpaTrend, semesterTable 
} from '../../data/studentData';
import StudentLayout from '../../components/layout/StudentLayout';

// ═══════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════

// 1. Hero Banner
const HeroBanner = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-[#0C2461] to-[#1A56DB] p-8 text-white shadow-[0_4px_24px_rgba(12,36,97,0.18)]"
    >
      {/* Decorative Circles */}
      <div className="absolute top-[-80px] right-[-60px] w-[300px] h-[300px] rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[120px] w-[200px] h-[200px] rounded-full bg-white/3 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex-1">
          <motion.h1 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-[28px] font-fraunces font-light italic"
          >
            Good Evening, {studentInfo.name.split(' ')[0]} 👋
          </motion.h1>
          <p className="mt-2 text-white/70 text-[14px] font-outfit">
            {studentInfo.department} · Semester {studentInfo.semester} · Roll: {studentInfo.rollNo}
          </p>
          
          <div className="mt-4 flex items-center gap-3 w-full max-w-[400px]">
            <div className="flex-1 h-[3px] bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '61.1%' }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="h-full bg-white/80"
              />
            </div>
            <span className="text-[11px] font-outfit text-white/55 whitespace-nowrap">Week 11 of 18</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <p className="text-[12px] font-outfit text-white/55">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <div className="flex flex-wrap justify-end gap-2">
            <button className="px-3 py-1.5 bg-white/15 border border-white/30 rounded-full text-[12px] font-medium font-outfit hover:bg-white/25 transition-colors">
              CGPA 8.04
            </button>
            <button className="px-3 py-1.5 bg-white/15 border border-white/30 rounded-full text-[12px] font-medium font-outfit hover:bg-white/25 transition-colors">
              Rank 23 / 120
            </button>
            <button className="px-3 py-1.5 bg-[#EF4444]/30 border border-[#EF4444]/50 rounded-full text-[12px] font-medium font-outfit hover:bg-[#EF4444]/40 transition-colors animate-pulse">
              5 Alerts
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// 2. Quick Actions
const QuickActions = () => {
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      <button className="flex items-center gap-2.5 px-[18px] h-10 bg-[#1A56DB] text-white rounded-[10px] text-[13px] font-medium font-outfit hover:bg-[#1648C0] transition-colors active:scale-95 duration-150">
        <BarChart2 size={16} />
        View My Marks
      </button>
      <button className="flex items-center gap-2.5 px-[18px] h-10 bg-white border border-[#E5E7EB] text-[#374151] rounded-[10px] text-[13px] font-medium font-outfit hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-all active:scale-95 duration-150">
        <Calendar size={16} />
        Check Events
      </button>
      <button className="flex items-center gap-2.5 px-[18px] h-10 bg-white border border-[#E5E7EB] text-[#374151] rounded-[10px] text-[13px] font-medium font-outfit hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-all active:scale-95 duration-150">
        <Calculator size={16} />
        CGPA Calculator
      </button>
      <button className="flex items-center gap-2.5 px-[18px] h-10 bg-white border border-[#E5E7EB] text-[#374151] rounded-[10px] text-[13px] font-medium font-outfit hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-all active:scale-95 duration-150">
        <Download size={16} />
        Download Report
      </button>
    </div>
  );
};

// 3. Stat Cards
const StatCard = ({ icon: Icon, color, label, value, sub, trend, trendUp, delay, alertCount }: any) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value) || 0;
    if (start === end) return;
    
    let timer = setInterval(() => {
      start += Math.ceil(end / 40);
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [value]);

  const isRisk = alertCount > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3 }}
      className={`group bg-white rounded-[16px] border border-[#E5E7EB] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.10)] transition-all cursor-pointer relative overflow-hidden
        ${isRisk ? 'border-l-[3px] border-l-[#EF4444]' : 'border-l-[3px] border-l-[#E5E7EB] hover:border-l-[#1A56DB]'}`}
    >
      <div className={`w-10 h-10 mb-5 rounded-[10px] flex items-center justify-center transition-transform group-hover:scale-108 duration-150
        ${color === 'green' ? 'bg-[#10B981]/10 text-[#10B981]' : 
          color === 'amber' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' : 
          'bg-[#EF4444]/10 text-[#EF4444]'}`}>
        <Icon size={20} strokeWidth={1.5} />
      </div>
      
      <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-[0.08em] font-outfit">{label}</p>
      <div className="flex items-baseline gap-1 mt-1">
        <span className={`text-[32px] font-mono font-semibold ${isRisk ? 'text-[#EF4444] animate-pulse' : 'text-[#111827]'}`}>
          {displayValue}
        </span>
        <span className="text-[14px] font-outfit text-[#6B7280]">{value.includes('%') ? '%' : ''}</span>
      </div>
      <p className={`text-[12px] font-outfit mt-1 line-clamp-1 ${isRisk ? 'text-[#EF4444]' : 'text-[#6B7280]'}`}>{sub}</p>
      
      <div className="mt-3">
        {trend && (
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-[11px] font-medium font-outfit
            ${trendUp ? 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]' : 'bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA]'}`}>
            {trend}
          </span>
        )}
      </div>
    </motion.div>
  );
};

// 4. Breakdown Table
const AcademicBreakdown = () => {
  const [activeTab, setActiveTab] = useState('Internals');

  const tabs = ['Internals', 'Externals', 'Weekly Trend', 'History'];

  return (
    <div className="bg-white rounded-[16px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
      <div className="px-6 py-5 flex justify-between items-start border-b border-[#F3F4F6]">
        <h2 className="text-[14px] font-semibold text-[#111827] font-outfit">Quick academic breakdown</h2>
        <span className="text-[12px] text-[#9CA3AF] font-outfit">Last updated: Today, 9:41 AM</span>
      </div>
      
      {/* Tab Bar */}
      <div className="h-11 bg-[#F9FAFB] border-b border-[#F3F4F6] px-6 flex relative">
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
        {/* Sliding Indicator */}
        <motion.div 
          layoutId="tab-indicator"
          className="absolute bottom-0 h-[2px] bg-[#1A56DB]"
          initial={false}
          animate={{ 
            left: (tabs.indexOf(activeTab) * 80) + 24, // Approximation for fixed width
            width: activeTab === 'Weekly Trend' ? 95 : 70 // Adjust width based on tab text
          }}
          transition={{ duration: 0.2 }}
        />
      </div>

      <div className="p-6 pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {activeTab === 'Internals' && <InternalsTab />}
            {activeTab === 'Externals' && <ExternalsTab />}
            {activeTab === 'Weekly Trend' && <WeeklyTrendTab />}
            {activeTab === 'History' && <HistoryTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const InternalsTab = () => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-[#F9FAFB] border-b-2 border-[#F3F4F6]">
          <th className="text-left py-2.5 px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit min-w-[180px]">Subject</th>
          <th className="text-right py-2.5 px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">Weekly</th>
          <th className="text-right py-2.5 px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">Mid-1</th>
          <th className="text-right py-2.5 px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">Mid-2</th>
          <th className="text-right py-2.5 px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">Lab</th>
          <th className="text-right py-2.5 px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">Total</th>
          <th className="text-right py-2.5 px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">Status</th>
        </tr>
      </thead>
      <tbody>
        {subjects.map((sub, i) => (
          <AcademicRow key={i} sub={sub} type="internals" />
        ))}
      </tbody>
    </table>
    <InsightsList type="internals" />
  </div>
);

const AcademicRow = ({ sub, type }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <tr 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="h-11 border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors cursor-pointer group"
      >
        <td className="py-3 px-3">
          <p className="text-[12px] font-mono text-[#9CA3AF]">{sub.code}</p>
          <p className="text-[13px] font-medium text-[#111827] font-outfit">{sub.name}</p>
        </td>
        {type === 'internals' && (
          <>
            <td className="text-right py-3 px-3 text-[13px] font-mono text-[#1A56DB]">{sub.weeklyAvg}/20</td>
            <td className="text-right py-3 px-3 text-[13px] font-mono text-[#7C3AED]">{sub.midSem}/40</td>
            <td className="text-right py-3 px-3 text-[13px] font-mono text-[#7C3AED]">{sub.midSem - 2}/40</td>
            <td className="text-right py-3 px-3 text-[13px] font-mono text-[#0EA5E9]">{sub.code.startsWith('MA') ? '—' : '22/25'}</td>
            <td className="text-right py-3 px-3 text-[13px] font-mono font-semibold text-[#111827]">{sub.internal}/25</td>
            <td className="text-right py-3 px-3">
              <span className={`text-[11px] font-medium font-outfit px-2 py-0.5 rounded-full
                ${sub.status === 'Pass' ? 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]' : 'bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA] pulse-red'}`}>
                {sub.status === 'Pass' ? 'Safe' : 'Risk'}
              </span>
            </td>
          </>
        )}
      </tr>
      <AnimatePresence>
        {isHovered && (
          <motion.tr
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#F9FAFB]/50"
          >
            <td colSpan={7} className="px-6 py-2 overflow-hidden">
              <p className="text-[12px] font-mono text-[#6B7280]">
                Weekly breakdown: W1: 18 · W2: 16 · W3: 15 · W4: 14 · W5: 14
              </p>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
};

const ExternalsTab = () => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-[#F9FAFB] border-b-2 border-[#F3F4F6]">
          <th className="text-left py-2.5 px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit min-w-[180px]">Subject</th>
          <th className="text-right py-2.5 px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">Internal</th>
          <th className="text-right py-2.5 px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">Pass (≥50%)</th>
          <th className="text-right py-2.5 px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">A Grade (≥75%)</th>
          <th className="text-right py-2.5 px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">Status</th>
        </tr>
      </thead>
      <tbody>
        {subjects.map((sub, i) => {
          const passNeeded = Math.max(0, 50 - sub.internal);
          const aGradeNeeded = Math.max(0, 75 - sub.internal);
          return (
            <tr key={i} className="h-11 border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors cursor-pointer group">
              <td className="py-3 px-3">
                <p className="text-[12px] font-mono text-[#9CA3AF]">{sub.code}</p>
                <p className="text-[13px] font-medium text-[#111827] font-outfit">{sub.name}</p>
              </td>
              <td className="text-right py-3 px-3 text-[13px] font-mono font-semibold text-[#111827]">{sub.internal}/25</td>
              <td className="text-right py-3 px-3 text-[13px] font-mono" 
                  style={{ color: passNeeded <= 20 ? '#10B981' : passNeeded <= 45 ? '#F59E0B' : '#EF4444' }}>
                {passNeeded <= 0 ? 'Secured ✓' : `${passNeeded}/60`}
              </td>
              <td className="text-right py-3 px-3 text-[13px] font-mono"
                  style={{ color: aGradeNeeded <= 20 ? '#10B981' : aGradeNeeded <= 60 ? '#F59E0B' : '#EF4444' }}>
                {aGradeNeeded > 60 ? 'Not achievable' : `${aGradeNeeded}/60`}
              </td>
              <td className="text-right py-3 px-3">
                <span className={`text-[11px] font-medium font-outfit px-2 py-0.5 rounded-full
                  ${passNeeded <= 28 ? 'bg-[#ECFDF5] text-[#065F46]' : passNeeded <= 44 ? 'bg-[#FFFBEB] text-[#92400E]' : 'bg-[#FEF2F2] text-[#991B1B]'}`}>
                  {passNeeded <= 28 ? 'Comfortable' : passNeeded <= 44 ? 'Achievable' : 'Difficult'}
                </span>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
    <div className="mt-4 p-4 bg-[#F9FAFB] rounded-xl border border-[#F3F4F6]">
        <button className="flex items-center gap-2 text-[13px] font-medium text-[#6B7280] hover:text-[#374151] transition-colors">
            <ChevronDown size={14} />
            Simulate my end-semester performance
        </button>
    </div>
  </div>
);

const WeeklyTrendTab = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#F9FAFB] border-b-2 border-[#F3F4F6]">
            <th className="text-left py-2.5 px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">Subject</th>
            <th className="text-right py-2.5 px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">W1</th>
            <th className="text-right py-2.5 px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">W2</th>
            <th className="text-right py-2.5 px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">W3</th>
            <th className="text-right py-2.5 px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">W4</th>
            <th className="text-right py-2.5 px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">W5</th>
            <th className="text-center py-2.5 px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">Trend</th>
            <th className="text-right py-2.5 px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">Status</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((sub, i) => (
            <tr key={i} className="h-11 border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors cursor-pointer group">
              <td className="py-3 px-3">
                <p className="text-[12px] font-mono text-[#9CA3AF]">{sub.code}</p>
                <p className="text-[13px] font-medium text-[#111827] font-outfit">{sub.name}</p>
              </td>
              {[18, 17, 19, 15, 16].map((score, idx) => (
                <td key={idx} className={`text-right py-3 px-3 text-[13px] font-mono ${score >= 17 ? 'text-[#10B981]' : score >= 14 ? 'text-[#374151]' : 'text-[#EF4444]'}`}>
                    {score}
                </td>
              ))}
              <td className="text-center py-3 px-3">
                <svg width="52" height="16" className="mx-auto overflow-visible">
                    <polyline fill="none" stroke={i === 0 ? "#10B981" : "#EF4444"} strokeWidth="1.5" points="0,10 10,8 20,12 30,5 40,3 50,6" />
                    <circle cx="50" cy="6" r="2.5" fill={i === 0 ? "#10B981" : "#EF4444"} />
                </svg>
              </td>
              <td className="text-right py-3 px-3 text-[12px] font-medium font-outfit" style={{ color: i === 0 ? '#10B981' : '#EF4444' }}>
                {i === 0 ? '↑ Improving' : '↓ Declining'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <InsightsList type="weekly" />
    </div>
);

const HistoryTab = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#F9FAFB] border-b-2 border-[#F3F4F6]">
            <th className="text-left py-2.5 px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">Semester</th>
            <th className="text-right py-2.5 px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">SGPA</th>
            <th className="text-right py-2.5 px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">Credits</th>
            <th className="text-right py-2.5 px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">Rank</th>
            <th className="text-right py-2.5 px-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit">Trend</th>
          </tr>
        </thead>
        <tbody>
          {semesterTable.map((row, i) => (
            <tr key={i} className={`h-11 border-b border-[#F3F4F6] transition-colors
                ${i === semesterTable.length - 1 ? 'bg-[#1A56DB]/[0.04] border-l-[2px] border-l-[#1A56DB]' : 'hover:bg-[#F9FAFB] cursor-pointer'}`}>
              <td className="py-3 px-3 text-[13px] font-medium text-[#111827] font-outfit">{row.semester}</td>
              <td className="text-right py-3 px-3 text-[13px] font-mono font-semibold text-[#111827]">
                {row.sgpa}{i === semesterTable.length - 1 ? ' *' : ''}
              </td>
              <td className="text-right py-3 px-3 text-[13px] font-mono text-[#374151]">{row.credits}</td>
              <td className="text-right py-3 px-3 text-[13px] font-mono text-[#374151]">23/120</td>
              <td className="text-right py-3 px-3">
                {i > 0 && (
                   <span className={semesterTable[i].sgpa >= semesterTable[i-1].sgpa ? 'text-[#10B981]' : 'text-[#EF4444]'}>
                    {semesterTable[i].sgpa >= semesterTable[i-1].sgpa ? '↑' : '↓'}
                   </span>
                )}
                {i === 0 && <span className="text-[#D1D5DB]">——</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-[11px] text-[#9CA3AF] font-outfit">
        * Projected SGPA based on current internal marks and average recent test performance
      </p>
      <div className="mt-4 p-4 bg-[#F9FAFB] border-l-[3px] border-l-[#1A56DB] rounded-xl font-outfit text-[13px] text-[#4B5563] leading-relaxed">
        Your strongest semester was Sem 2 (SGPA 8.5 · Rank 12/120). Your current Sem 6 projection (SGPA 7.6) shows a recovery trend from mid-sem dips.
      </div>
    </div>
);

const InsightsList = ({ type }: any) => {
    const insights = type === 'internals' ? [
        { color: '#1A56DB', text: 'CS603 weekly test scores are 20% below class average — highest risk area.' },
        { color: '#F59E0B', text: 'MA601 mid-semester 1 marks have not been uploaded — verify with faculty.' },
        { color: '#10B981', text: 'CS601 is your strongest subject this semester — 83% of internal marks secured.' }
    ] : [
        { color: '#EF4444', text: 'CS603 has declined 4 consecutive weeks — topics from Weeks 3–5 need revision.' },
        { color: '#F59E0B', text: 'MA601 Week 3 marks not yet uploaded — verify marks with faculty.' }
    ];

    return (
        <div className="mt-4 border-t border-[#F3F4F6]">
            <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-[0.1em] px-6 py-3">INSIGHTS</p>
            {insights.map((item, i) => (
                <div key={i} className="px-6 py-2.5 flex items-center gap-3 border-b border-[#F3F4F6] last:border-none">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <p className="text-[12px] font-outfit text-[#4B5563]">{item.text}</p>
                </div>
            ))}
            <div className="px-6 py-4">
                <button className="text-[12px] font-medium text-[#1A56DB] hover:text-[#1648C0] transition-colors group">
                    → Focus on CS603 weekly tests to move from Risk to Watch
                    <div className="h-[1px] bg-[#1A56DB] w-0 group-hover:w-full transition-all duration-200" />
                </button>
            </div>
        </div>
    );
}

// 5. Right Column Components
const ExamCalendar = () => (
    <div className="bg-white rounded-[16px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="px-6 py-5 flex justify-between items-center border-b border-[#F3F4F6]">
            <h2 className="text-[14px] font-semibold text-[#111827] font-outfit">Upcoming exams</h2>
            <span className="text-[12px] text-[#9CA3AF] font-outfit">Next 30 days</span>
        </div>
        <div>
            {[
                { day: '24', month: 'MAR', subject: 'CS603 Internal Assessment', type: 'Internal', color: '#1A56DB', in: 3 },
                { day: '28', month: 'MAR', subject: 'CS601 Mid-semester 1', type: 'Mid-semester', color: '#EF4444', in: 7 },
                { day: '02', month: 'APR', subject: 'CS602 Lab Assessment', type: 'Lab', color: '#0EA5E9', in: 12 },
                { day: '05', month: 'APR', subject: 'MA601 Assignment Submission', type: 'Assignment', color: '#F59E0B', in: 15 }
            ].map((ev, i) => (
                <div key={i} className="h-16 flex items-center px-5 border-b border-[#F3F4F6] last:border-none hover:bg-[#F9FAFB] transition-colors cursor-pointer group">
                    <div className="w-[52px] border-r border-[#F3F4F6] pr-3 text-right flex flex-col items-end">
                        <span className="text-[20px] font-mono font-semibold text-[#111827] leading-none">{ev.day}</span>
                        <span className="text-[11px] font-outfit text-[#9CA3AF] mt-0.5">{ev.month}</span>
                    </div>
                    <div className="flex-1 pl-3">
                        <p className="text-[13px] font-medium text-[#111827] font-outfit truncate">{ev.subject}</p>
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold mt-1`} 
                              style={{ backgroundColor: `${ev.color}15`, color: ev.color, border: `1px solid ${ev.color}25` }}>
                            {ev.type}
                        </span>
                    </div>
                    <div className="flex items-center">
                        {ev.in <= 7 && <Bell size={14} className="text-[#F59E0B] animate-bounce mr-2" />}
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium font-outfit
                            ${ev.in <= 3 ? 'bg-[#FEF2F2] text-[#EF4444]' : ev.in <= 7 ? 'bg-[#FFFBEB] text-[#F59E0B]' : 'bg-[#F9FAFB] text-[#6B7280]'}`}>
                            in {ev.in} days
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const AlertsCard = () => (
    <div className="mt-5 bg-white rounded-[16px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="px-6 py-5 flex justify-between items-center border-b border-[#F3F4F6]">
            <h2 className="text-[14px] font-semibold text-[#111827] font-outfit">Alerts & Notifications</h2>
            <span className="bg-[#EF4444] text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">3 New</span>
        </div>
        <div className="divide-y divide-[#F3F4F6]">
            {[
                { border: '#EF4444', icon: AlertTriangle, iconBg: '#EF444410', iconColor: '#EF4444', title: 'Backlog risk in CS603', detail: 'Internal + mid-semester projection: need 58/60 in End Sem to pass.', link: 'View recovery options →', time: 'Today' },
                { border: '#F59E0B', icon: Users, iconBg: '#F59E0B10', iconColor: '#F59E0B', title: 'MA601 attendance at 73%', detail: 'Below 75% threshold. Attend next 8 classes to recover eligibility.', link: 'View attendance →', time: 'Today' },
                { border: '#1A56DB', icon: MessageSquare, iconBg: '#1A56DB10', iconColor: '#1A56DB', title: 'Action required: Remark from Dr. Ramesh', detail: 'CS601 — Submit the pending assignment by this Friday.', link: 'View remark →', time: 'Yesterday' }
            ].map((alert, i) => (
                <div key={i} className="p-5 flex gap-4 hover:bg-[#F9FAFB] transition-colors cursor-pointer relative bg-[#1A56DB]/[0.03]">
                    <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: alert.border }} />
                    <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: alert.iconBg }}>
                        <alert.icon size={16} color={alert.iconColor} />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h3 className="text-[13px] font-semibold text-[#111827] font-outfit">{alert.title}</h3>
                            <span className="text-[11px] text-[#9CA3AF] font-outfit">{alert.time}</span>
                        </div>
                        <p className="text-[12px] text-[#6B7280] font-outfit mt-1 leading-relaxed">{alert.detail}</p>
                        <button className="text-[12px] text-[#1A56DB] font-medium mt-2 hover:underline">{alert.link}</button>
                    </div>
                </div>
            ))}
        </div>
        <div className="p-4 text-center border-t border-[#F3F4F6]">
            <button className="text-[12px] font-medium text-[#6B7280] hover:text-[#374151]">Mark all as read</button>
        </div>
    </div>
);

// 6. Reports & Downloads
const ReportsSection = () => (
    <div className="mt-8">
        <div className="flex justify-between items-start">
            <div>
                <h2 className="text-[20px] font-fraunces italic font-light text-[#111827]">Reports & Downloads</h2>
                <p className="text-[13px] text-[#6B7280] font-outfit mt-1">Request official documents and track their status</p>
            </div>
            <button className="text-[13px] font-medium text-[#1A56DB] hover:underline">View all requests →</button>
        </div>
        
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
                { name: 'Bonafide Certificate', icon: FileText, color: '#1A56DB', desc: 'Official proof of enrollment for banks and visas.', time: '2–3 working days' },
                { name: 'Marks Sheet', icon: ClipboardList, color: '#10B981', desc: 'Semester-wise marks statement. Required for HR.', time: 'Available immediately' },
                { name: 'Consolidated Transcript', icon: History, color: '#7C3AED', desc: 'All semesters combined transcripts report.', time: '3–5 working days' }
            ].map((doc, i) => (
                <div key={i} className="bg-white p-5 rounded-[14px] border border-[#E5E7EB] hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                    <div className="w-10 h-10 rounded-[10px] flex items-center justify-center mb-4" style={{ backgroundColor: `${doc.color}15` }}>
                        <doc.icon size={24} color={doc.color} />
                    </div>
                    <h3 className="text-[13px] font-semibold text-[#111827] font-outfit">{doc.name}</h3>
                    <p className="text-[12px] text-[#6B7280] font-outfit mt-1.5 line-clamp-2">{doc.desc}</p>
                    <p className="text-[11px] text-[#9CA3AF] font-outfit mt-2">{doc.time}</p>
                    <button className="w-full mt-4 h-9 flex items-center justify-center gap-2 rounded-lg text-white font-medium text-[13px] font-outfit active:scale-95 transition-transform"
                            style={{ backgroundColor: doc.color }}>
                        {doc.name.includes('Sheet') ? 'Download PDF' : 'Request'}
                    </button>
                </div>
            ))}
        </div>
    </div>
);

// 7. Activity Feed
const ActivityFeed = () => (
    <div className="mt-8 bg-white rounded-[16px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="px-6 py-5 flex justify-between items-center border-b border-[#F3F4F6]">
            <h2 className="text-[14px] font-semibold text-[#111827] font-outfit">Recent activity</h2>
            <button className="text-[13px] font-medium text-[#1A56DB] hover:underline">View all →</button>
        </div>
        <div className="divide-y divide-[#F3F4F6]">
            {[
                { color: '#1A56DB', title: 'Marks uploaded: CS601 Weekly Test 7', detail: 'You scored 16/20 · Class average: 14.2', time: '2 hours ago' },
                { color: '#10B981', title: 'Attendance update: Overall 82%', detail: 'All subjects tracked · No critical drops this week', time: 'Yesterday' },
                { color: '#F59E0B', title: 'Action required: Remark from Dr. Ramesh', detail: 'CS601 — Submit the pending assignment by Friday', time: '2 days ago' },
                { color: '#EF4444', title: 'Alert: Backlog risk in CS603', detail: 'Need 58/60 in End Sem to pass current projection', time: '3 days ago' },
                { color: '#0EA5E9', title: 'Result announced: MA601 Mid-sem 1', detail: 'You scored 22/30 · Consistent with goals', time: '14 Mar' }
            ].map((item, i) => (
                <div key={i} className="h-14 px-6 flex items-center gap-3 hover:bg-[#F9FAFB] cursor-pointer transition-colors group">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <div className="flex-1">
                        <p className="text-[13px] font-medium text-[#111827] font-outfit">{item.title}</p>
                        <p className="text-[12px] text-[#6B7280] font-outfit truncate">{item.detail}</p>
                    </div>
                    <span className="text-[11px] text-[#9CA3AF] font-outfit whitespace-nowrap">{item.time}</span>
                </div>
            ))}
        </div>
    </div>
)

// ═══════════════════════════════════════════════════════════════
// MAIN DASHBOARD PAGE
// ═══════════════════════════════════════════════════════════════

const StudentDashboard = () => {
    const [pageLoaded, setPageLoaded] = useState(false);
    
    useEffect(() => {
        setPageLoaded(true);
    }, []);

    // Stagger layout animation
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.06
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }
    };

    return (
        <StudentLayout activePage="dashboard" onNavigate={(page) => console.log('Navigate to:', page)}>
            <motion.div 
                variants={container}
                initial="hidden"
                animate={pageLoaded ? "show" : "hidden"}
                className="space-y-8"
            >
                {/* Part 3: Hero Area */}
                <motion.div variants={item}><HeroBanner /></motion.div>
                <motion.div variants={item}><QuickActions /></motion.div>
                
                <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <StatCard icon={Users} color="green" label="OVERALL ATTENDANCE" value="82%" sub="6 subjects tracked · 2 watchable" trend="↑ +3% vs last month" trendUp={true} delay={0.2} />
                    <StatCard icon={Calendar} color="amber" label="NEXT EXAM" value="3 days" sub="CS603 IA · Mon, 24 March · 20 marks" trend="Internal Assessment" trendUp={true} delay={0.3} />
                    <StatCard icon={AlertTriangle} color="red" label="ACTIVE ALERTS" value="5" sub="Action required in CS603" trend="Critical" trendUp={false} alertCount={5} delay={0.4} />
                </motion.div>

                {/* Part 3.5: At-risk warning band */}
                <motion.div 
                    variants={item}
                    className="bg-[#F59E0B]/5 border border-[#F59E0B]/20 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <div className="flex items-center gap-2.5 text-[#92400E]">
                        <AlertTriangle size={18} />
                        <span className="text-[13px] font-medium font-outfit">2 subjects need your attention before end semester exams</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-[#FEF2F2] text-[#EF4444] border border-[#EF4444]/20 rounded-full text-[12px] font-medium font-outfit shadow-sm">CS603</span>
                        <span className="px-3 py-1 bg-[#FEF2F2] text-[#EF4444] border border-[#EF4444]/20 rounded-full text-[12px] font-medium font-outfit shadow-sm">MA601</span>
                    </div>
                </motion.div>

                {/* Part 4 & 5: Academic Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <motion.div variants={item} className="lg:col-span-8">
                        <AcademicBreakdown />
                    </motion.div>

                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <motion.div variants={item}><ExamCalendar /></motion.div>
                        <motion.div variants={item}><AlertsCard /></motion.div>
                    </div>
                </div>

                {/* Part 7: Reports */}
                <motion.div variants={item}><ReportsSection /></motion.div>

                {/* Part 8: Activity & Footer */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <motion.div variants={item}><ActivityFeed /></motion.div>
                    
                    {/* Part 8: Wellbeing Strip */}
                    <div className="flex flex-col justify-end">
                        <motion.div 
                            variants={item}
                            className="bg-[#6366F1]/5 border border-[#6366F1]/20 rounded-[14px] p-6 flex flex-col sm:flex-row justify-between items-center gap-6"
                        >
                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#6366F1] shadow-sm flex-shrink-0">
                                    <Heart size={20} />
                                </div>
                                <p className="text-[13px] text-[#374151] font-outfit leading-relaxed">
                                    We noticed your scores have dropped across several subjects recently. 
                                    Your academic advisor is available if you want to talk — not just about academics.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 w-full sm:w-auto min-w-[160px]">
                                <button className="h-9 px-4 bg-[#1A56DB] text-white rounded-lg text-[13px] font-medium font-outfit hover:bg-[#1648C0] transition-colors">
                                    Schedule a meeting
                                </button>
                                <button className="h-9 px-4 bg-white border border-[#D1D5DB] text-[#6B7280] rounded-lg text-[13px] font-medium font-outfit hover:bg-[#F9FAFB] transition-colors">
                                    Dismiss
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="pb-12" />
            </motion.div>
        </StudentLayout>
    );
};

export default StudentDashboard;
