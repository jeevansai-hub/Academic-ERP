import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronDown, Info } from 'lucide-react';
import { internalAssessment } from '../../data/studentData';

const InternalAssessment: React.FC = () => {
  const [showGuidelines, setShowGuidelines] = useState(false);
  const avgInternal = (internalAssessment.reduce((a, b) => a + b.final, 0) / internalAssessment.length).toFixed(2);
  const fullInternal = internalAssessment.filter(s => s.final === s.finalMax).length;
  const avgPct = (internalAssessment.reduce((a, b) => a + b.percentage, 0) / internalAssessment.length).toFixed(1);
  const colors: Record<string, string> = { 'Internal-1': 'var(--blue)', 'Internal-2': 'var(--blue)', 'Assignments': 'var(--purple)', 'Lab/Practical': 'var(--green)' };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-title text-[32px]" style={{ color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Internal Assessment Breakup</h1>
        <p className="text-[13px] mt-1" style={{ color: 'var(--text-muted)' }}>Detailed breakdown of internal assessment components</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[{ l: 'AVG INTERNAL MARKS', v: `${avgInternal}/20` }, { l: 'FULL INTERNAL', v: fullInternal.toString(), c: 'var(--green)' }, { l: 'AVG PERCENTAGE', v: `${avgPct}%`, c: 'var(--blue)' }].map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.06 }}
            className="rounded-xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
            <p className="text-[11px] font-medium tracking-[1.5px] uppercase" style={{ color: 'var(--text-label)' }}>{c.l}</p>
            <p className="font-mono text-[28px] font-medium mt-2" style={{ color: c.c || 'var(--text-primary)' }}>{c.v}</p>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative">
          <select className="h-[38px] rounded-lg px-3 pr-8 text-[13px] appearance-none cursor-pointer outline-none"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}>
            <option>Semester 6</option>
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
        </div>
        <button onClick={() => setShowGuidelines(!showGuidelines)} className="flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: 'var(--blue)' }}>
          <Info size={14} /> Assessment Guidelines
        </button>
      </div>
      {showGuidelines && (
        <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg py-4 px-5" style={{ background: 'var(--blue-light)', border: '1px solid var(--blue-subtle)' }}>
          {['Best of Internal-1 and Internal-2 is considered.', 'Assignment marks contribute to evaluation.', 'Lab marks apply only for practical subjects.'].map((t, i) => (
            <div key={i} className="flex items-start gap-2 mb-1.5 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
              <span className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--blue)' }} />{t}
            </div>
          ))}
        </motion.div>
      )}
      {internalAssessment.map((s, idx) => (
        <motion.div key={s.code} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: idx * 0.05 }}
          className="rounded-xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-5">
            <div><span className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>{s.name}</span><span className="font-mono text-[11px] ml-2" style={{ color: 'var(--text-muted)' }}>{s.code}</span></div>
            <div className="text-right"><span className="font-mono text-[15px] font-semibold" style={{ color: 'var(--blue)' }}>Final: {s.final}/{s.finalMax}</span><p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{s.percentage}%</p></div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.values(s.components).map((comp, ci) => {
              if (!comp) return (
                <div key={ci} className="rounded-lg p-4" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-default)' }}>
                  <p className="text-[10px] font-medium tracking-[1.5px] uppercase" style={{ color: 'var(--text-label)' }}>Lab/Practical</p>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded mt-3 inline-block" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-default)', color: 'var(--text-muted)' }}>Not Applicable</span>
                </div>
              );
              const pct = Math.round((comp.score / comp.max) * 100);
              return (
                <div key={ci} className="rounded-lg p-4 relative" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-default)' }}>
                  {comp.label === 'Internal-2' && <CheckCircle2 size={14} className="absolute top-3 right-3" style={{ color: 'var(--green)' }} />}
                  <p className="text-[10px] font-medium tracking-[1.5px] uppercase" style={{ color: 'var(--text-label)' }}>{comp.label}</p>
                  <p className="font-mono text-[20px] font-medium mt-2" style={{ color: 'var(--text-primary)' }}>{comp.score}/{comp.max}</p>
                  <div className="mt-2.5 h-1.5 rounded-full" style={{ background: 'var(--border-default)' }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.7, ease: 'easeOut', delay: ci * 0.1 }} className="h-full rounded-full" style={{ background: colors[comp.label] || 'var(--blue)' }} />
                  </div>
                  <p className="font-mono text-[11px] mt-1.5" style={{ color: 'var(--text-muted)' }}>{pct}%</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default InternalAssessment;
