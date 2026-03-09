import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { subjects } from '../../data/studentData';

const SubjectAnalysis: React.FC = () => {
  const barData = subjects.map(s => ({ name: s.code, percentage: s.percentage, status: s.status, fullName: s.name }));
  const radarData = subjects.map(s => ({ subject: s.code, score: s.percentage, fullMark: 100 }));
  const avg = (subjects.reduce((a, b) => a + b.percentage, 0) / subjects.length).toFixed(1);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-title text-[32px]" style={{ color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Subject-wise Analysis</h1>
        <p className="text-[13px] mt-1" style={{ color: 'var(--text-muted)' }}>Detailed performance breakdown for each subject</p>
      </div>
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="rounded-xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>Percentage Comparison</span>
            <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>Avg: {avg}%</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-faint)" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: 8, padding: '10px 14px' }}
                labelStyle={{ color: '#fff', fontSize: 11 }} itemStyle={{ fontFamily: 'JetBrains Mono', fontSize: 13 }}
                formatter={(v: number) => [`${v}%`, 'Score']} />
              <Bar dataKey="percentage" radius={[4, 4, 0, 0]} animationDuration={600}>
                {barData.map((e, i) => <Cell key={i} fill={e.status === 'Fail' ? 'var(--red)' : 'var(--blue)'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
          <span className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>Performance Radar</span>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="var(--border-default)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fill: 'var(--text-muted)' }} />
              <Radar name="Score" dataKey="score" stroke="var(--blue)" fill="var(--blue)" fillOpacity={0.15} strokeWidth={2} animationDuration={800} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
      {/* Subject Detail Cards */}
      {subjects.map((s, idx) => (
        <motion.div key={s.code} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: idx * 0.05 }}
          className="rounded-xl p-6" style={{
            background: 'var(--bg-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sm)',
            borderLeft: `3px solid ${s.status === 'Fail' ? 'var(--red)' : s.color}`,
          }}>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
            <div>
              <span className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>{s.name}</span>
              <span className="font-mono text-[11px] ml-2" style={{ color: 'var(--text-muted)' }}>{s.code}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className={`grade-badge ${s.grade === 'A+' ? 'grade-aplus' : s.grade === 'A' ? 'grade-a' : s.grade === 'B+' ? 'grade-bplus' : s.grade === 'F' ? 'grade-f' : 'grade-c'}`}>{s.grade}</span>
              <span className="font-mono text-[14px] font-semibold" style={{ color: s.percentage >= 80 ? 'var(--green)' : s.percentage >= 60 ? 'var(--blue)' : 'var(--red)' }}>{s.percentage}%</span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: 'Internal', v: `${s.internal}/${s.internalMax}` },
              { l: 'Mid Semester', v: `${s.midSem}/${s.midSemMax}` },
              { l: 'End Semester', v: `${s.endSem}/${s.endSemMax}` },
              { l: 'Total', v: `${s.total}/${s.totalMax}` },
            ].map((f, i) => (
              <div key={i} className="rounded-lg p-3" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-faint)' }}>
                <p className="text-[10px] font-medium tracking-[1.5px] uppercase" style={{ color: 'var(--text-label)' }}>{f.l}</p>
                <p className="font-mono text-[16px] font-medium mt-1" style={{ color: 'var(--text-primary)' }}>{f.v}</p>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SubjectAnalysis;
