import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, TrendingUp, BookOpen, Target, Star } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { sgpaTrend, semesterTable } from '../../data/studentData';

const CGPAProgress: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-title text-[32px]" style={{ color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>CGPA & Progress</h1>
        <p className="text-[13px] mt-1" style={{ color: 'var(--text-muted)' }}>Track your academic performance across semesters</p>
      </div>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: GraduationCap, color: 'var(--blue)', bg: 'var(--blue-light)', label: 'CUMULATIVE CGPA', value: '8.04' },
          { icon: TrendingUp, color: 'var(--green)', bg: 'var(--green-light)', label: 'CURRENT SGPA', value: '7.60', badge: '↓0.90', badgeColor: 'var(--red)', badgeBg: 'var(--red-light)' },
          { icon: BookOpen, color: 'var(--purple)', bg: 'var(--purple-light)', label: 'TOTAL CREDITS', value: '132', sub: 'Across 6 semesters' },
          { icon: Target, color: 'var(--amber)', bg: 'var(--amber-light)', label: 'PLACEMENT STATUS', value: '8.04/7.0', badge: 'Eligible', badgeColor: 'var(--green)', badgeBg: 'var(--green-light)' },
        ].map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.06 }}
            className="rounded-xl p-6 relative" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sm)', transition: 'transform 200ms, box-shadow 200ms' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}>
            <div className="flex items-start justify-between">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: c.bg }}>
                <c.icon size={16} strokeWidth={1.5} style={{ color: c.color }} />
              </div>
              {c.badge && <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full" style={{ background: c.badgeBg, color: c.badgeColor }}>{c.badge}</span>}
            </div>
            <p className="text-[11px] font-medium tracking-[1.5px] uppercase mt-4" style={{ color: 'var(--text-label)' }}>{c.label}</p>
            <p className="font-mono text-[32px] font-medium mt-1" style={{ color: 'var(--text-primary)' }}>{c.value}</p>
            {c.sub && <p className="text-[12px] mt-1" style={{ color: 'var(--text-muted)' }}>{c.sub}</p>}
          </motion.div>
        ))}
      </div>
      {/* Chart */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}
        className="rounded-xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
        <p className="text-[14px] font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>CGPA Trend Over Semesters</p>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={sgpaTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-faint)" vertical={false} />
            <XAxis dataKey="sem" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
            <YAxis domain={[6, 10]} tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: 8, padding: '10px 14px' }}
              labelStyle={{ color: '#fff', fontSize: 11 }} itemStyle={{ color: 'var(--green)', fontFamily: 'JetBrains Mono', fontSize: 13 }}
              formatter={(v: number, name: string) => [v.toFixed(1), name === 'sgpa' ? 'SGPA' : 'CGPA']} />
            <Line type="monotone" dataKey="sgpa" stroke="var(--green)" strokeWidth={2.5} dot={{ r: 5, fill: 'var(--green)', stroke: '#fff', strokeWidth: 2 }} animationDuration={800} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }}
        className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr style={{ background: 'var(--bg-subtle)', borderBottom: '2px solid var(--border-default)' }}>
                {['SEMESTER', 'SGPA', 'CREDITS', 'GRADE POINTS', 'PERFORMANCE'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-medium tracking-[1.5px] uppercase" style={{ color: 'var(--text-label)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {semesterTable.map((r, i) => {
                const isBest = r.sgpa === 8.5 && r.semester === 'Semester 5';
                const perfColor = r.performance === 'Excellent' ? 'var(--amber)' : r.performance === 'Good' ? 'var(--blue)' : 'var(--text-muted)';
                const perfBg = r.performance === 'Excellent' ? 'var(--amber-light)' : r.performance === 'Good' ? 'var(--blue-light)' : 'var(--bg-subtle)';
                return (
                  <tr key={i} style={{
                    borderBottom: '1px solid var(--border-faint)',
                    borderLeft: isBest ? '3px solid var(--amber)' : '3px solid transparent',
                    background: isBest ? 'rgba(217,119,6,0.03)' : 'transparent',
                  }}>
                    <td className="px-4 py-3 text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                      <span className="flex items-center gap-1.5">{isBest && <Star size={12} style={{ color: 'var(--amber)' }} />}{r.semester}</span>
                    </td>
                    <td className="px-4 py-3 font-mono text-[13px] font-medium" style={{ color: 'var(--text-primary)' }}>{r.sgpa.toFixed(1)}</td>
                    <td className="px-4 py-3 font-mono text-[13px]" style={{ color: 'var(--text-primary)' }}>{r.credits}</td>
                    <td className="px-4 py-3 font-mono text-[13px]" style={{ color: 'var(--text-primary)' }}>{r.gradePoints.toFixed(1)}</td>
                    <td className="px-4 py-3"><span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: perfBg, color: perfColor }}>{r.performance}</span></td>
                  </tr>
                );
              })}
              <tr style={{ background: 'var(--bg-subtle)', borderTop: '2px solid var(--border-default)' }}>
                <td colSpan={5} className="px-4 py-3 text-[13px] font-semibold" style={{ color: 'var(--blue)' }}>Cumulative CGPA: 8.04</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
      {/* Insights */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.4 }}
        className="rounded-xl py-5 px-6" style={{ background: 'var(--blue-light)', border: '1px solid var(--blue-subtle)' }}>
        <div className="flex items-center gap-2 mb-3"><TrendingUp size={16} style={{ color: 'var(--blue)' }} /><span className="text-[14px] font-semibold" style={{ color: 'var(--blue)' }}>Performance Insights</span></div>
        {['Best semester: Semester 5 with SGPA 8.5', 'Current SGPA dropped by 0.90 from previous semester.', 'Total credits earned: 132 across 6 semesters.', 'Eligible for campus placements (CGPA ≥ 7.0).', 'Projected CGPA: Maintaining SGPA ≥ 8.0 in Sem 7 will bring CGPA to ~8.10.'].map((t, i) => (
          <div key={i} className="flex items-start gap-2 mb-1.5 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
            <span className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--blue)' }} />{t}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default CGPAProgress;
