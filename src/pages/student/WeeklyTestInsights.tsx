import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, ClipboardList } from 'lucide-react';
import { weeklyTestData } from '../../data/studentData';

const WeeklyTestInsights: React.FC = () => {
  const totalTests = weeklyTestData.reduce((a, s) => a + s.scores.length, 0);
  const overallAvg = (weeklyTestData.reduce((a, s) => a + s.avg, 0) / weeklyTestData.length).toFixed(1);
  const bestSubject = weeklyTestData.reduce((a, b) => a.avg > b.avg ? a : b);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="font-title text-[32px]" style={{ color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Weekly Test Insights</h1>
        <p className="text-[13px] mt-1" style={{ color: 'var(--text-muted)' }}>Track your weekly test performance across all subjects</p>
      </div>

      {/* Insights banner */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-xl py-5 px-6"
        style={{ background: 'var(--blue-light)', border: '1px solid var(--blue-subtle)' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={16} style={{ color: 'var(--blue)' }} />
          <span className="text-[14px] font-semibold" style={{ color: 'var(--blue)' }}>Performance Insights</span>
        </div>
        {[
          `Your overall weekly test average is <b>${overallAvg}/20</b>, indicating consistent preparation.`,
          `<b>${bestSubject.name}</b> is your strongest subject with an average of <b>${bestSubject.avg}/20</b>.`,
          `Mathematics needs immediate attention — average score is the lowest at <b>12.1/20</b>.`,
          `Maintain consistency in Software Testing to keep the top position.`,
        ].map((text, i) => (
          <div key={i} className="flex items-start gap-2 mb-2 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
            <span className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--blue)' }} />
            <span dangerouslySetInnerHTML={{ __html: text }} />
          </div>
        ))}
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: ClipboardList, color: 'var(--blue)', bg: 'var(--blue-light)', label: 'TOTAL TESTS CONDUCTED', value: totalTests.toString(), sub: '7 per subject' },
          { icon: TrendingUp, color: 'var(--green)', bg: 'var(--green-light)', label: 'OVERALL AVG SCORE', value: overallAvg, sub: `Out of 20 — ${((parseFloat(overallAvg) / 20) * 100).toFixed(1)}%` },
          { icon: Award, color: 'var(--amber)', bg: 'var(--amber-light)', label: 'MOST CONSISTENT', value: bestSubject.name, sub: `Avg: ${bestSubject.avg} / 20`, isText: true },
        ].map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.06 * i }}
            className="rounded-xl p-6"
            style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-default)',
              boxShadow: 'var(--shadow-sm)', transition: 'transform 200ms, box-shadow 200ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: c.bg }}>
              <c.icon size={16} strokeWidth={1.5} style={{ color: c.color }} />
            </div>
            <p className="text-[11px] font-medium tracking-[1.5px] uppercase mt-4" style={{ color: 'var(--text-label)' }}>{c.label}</p>
            <p className={`${c.isText ? 'text-[20px] font-semibold' : 'font-mono text-[28px] font-medium'} mt-1`}
              style={{ color: 'var(--text-primary)' }}>{c.value}</p>
            <p className="text-[12px] mt-1" style={{ color: 'var(--text-muted)' }}>{c.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Color Legend */}
      <div className="flex flex-wrap gap-2">
        {weeklyTestData.map(s => (
          <span key={s.code} className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>
            <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
            {s.code}
          </span>
        ))}
      </div>

      {/* Subject Cards */}
      {weeklyTestData.map((s, idx) => (
        <motion.div
          key={s.code}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 * idx }}
          className="rounded-xl p-6"
          style={{
            background: 'var(--bg-card)', border: '1px solid var(--border-default)',
            borderLeft: `3px solid ${s.color}`, boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-5">
            <div>
              <span className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>{s.name}</span>
              <span className="font-mono text-[11px] ml-2" style={{ color: 'var(--text-muted)' }}>{s.code}</span>
            </div>
            <div className="text-right">
              <span className="font-mono text-[14px] font-semibold" style={{ color: s.color }}>Avg: {s.avg}/20</span>
              <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{s.scores.length} tests completed</p>
            </div>
          </div>

          {/* Weekly scores */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {s.scores.map((score, wi) => (
              <div key={wi} className="flex flex-col items-center gap-1">
                <div className="w-full flex flex-col items-center">
                  <div className="w-[3px] rounded-full" style={{
                    background: s.color,
                    height: `${(score / 20) * 40}px`,
                    opacity: 0.6 + (score / 20) * 0.4,
                  }} />
                </div>
                <span className="font-mono text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>{score}</span>
                <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>W{wi + 1}</span>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-4 text-[12px]">
            <span><span className="font-mono" style={{ color: 'var(--green)' }}>Best:</span> <span className="font-mono font-medium">{s.best}</span></span>
            <span><span className="font-mono" style={{ color: 'var(--red)' }}>Lowest:</span> <span className="font-mono font-medium">{s.lowest}</span></span>
            <span><span className="font-mono" style={{ color: 'var(--text-muted)' }}>Range:</span> <span className="font-mono font-medium">{s.best - s.lowest}</span></span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default WeeklyTestInsights;
