import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, XCircle, AlertCircle, CheckCircle2, Lightbulb, Info, Bookmark, Calendar, User, Clock } from 'lucide-react';

const BacklogsAlerts: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-title text-[32px]" style={{ color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Backlogs & Alerts</h1>
        <p className="text-[13px] mt-1" style={{ color: 'var(--text-muted)' }}>Track pending backlogs and failed subjects</p>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: AlertTriangle, color: 'var(--red)', bg: 'var(--red-light)', label: 'TOTAL BACKLOGS', value: '1' },
          { icon: XCircle, color: 'var(--red)', bg: 'var(--red-light)', label: 'CURRENT SEM FAILURES', value: '1' },
          { icon: AlertCircle, color: 'var(--amber)', bg: 'var(--amber-light)', label: 'HIGH RISK SUBJECTS', value: '1' },
        ].map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.06 }}
            className="rounded-xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sm)', transition: 'transform 200ms, box-shadow 200ms' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: c.bg }}><c.icon size={16} strokeWidth={1.5} style={{ color: c.color }} /></div>
            <p className="text-[11px] font-medium tracking-[1.5px] uppercase mt-4" style={{ color: 'var(--text-label)' }}>{c.label}</p>
            <p className="font-mono text-[32px] font-medium mt-1" style={{ color: 'var(--text-primary)' }}>{c.value}</p>
          </motion.div>
        ))}
      </div>
      {/* Active Backlogs */}
      <div>
        <p className="text-[15px] font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Active Backlogs</p>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}
          className="rounded-xl p-6" style={{ background: 'var(--red-light)', border: '1px solid rgba(220,38,38,0.2)', borderLeft: '3px solid var(--red)' }}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} style={{ color: 'var(--red)' }} />
              <span className="text-[15px] font-semibold" style={{ color: 'var(--red)' }}>Mathematics</span>
              <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>MA601</span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full" style={{ background: 'var(--blue-light)', color: 'var(--blue)' }}>Sem 6</span>
            </div>
            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full fail-glow" style={{ background: 'var(--red-light)', color: 'var(--red)', border: '1px solid rgba(220,38,38,0.3)' }}>High Risk</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div><p className="text-[11px] font-medium tracking-[1.5px] uppercase" style={{ color: 'var(--text-label)' }}>ATTEMPTS MADE</p><p className="font-mono text-[28px] font-medium" style={{ color: 'var(--red)' }}>1</p></div>
            <div><p className="text-[11px] font-medium tracking-[1.5px] uppercase" style={{ color: 'var(--text-label)' }}>ATTEMPTS LEFT</p><p className="font-mono text-[28px] font-medium" style={{ color: 'var(--text-primary)' }}>2</p></div>
          </div>
          {/* Timeline */}
          <div className="flex items-center gap-3 mb-4 pl-1">
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--red)' }} />
            <span className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>Attempt 1 — Nov 2025 — Failed (46%)</span>
          </div>
          <div className="rounded-lg py-3 px-4" style={{ background: 'rgba(217,119,6,0.06)', borderLeft: '2px solid var(--amber)' }}>
            <div className="flex items-center gap-1.5 mb-1"><Lightbulb size={14} style={{ color: 'var(--amber)' }} /><span className="text-[12px] font-semibold" style={{ color: 'var(--amber)' }}>Suggestion:</span></div>
            <p className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>Focus on core mathematical foundations. Attend extra tutorial sessions and practice previous year papers regularly.</p>
          </div>
        </motion.div>
      </div>
      {/* Failed Current Sem */}
      <div>
        <p className="text-[15px] font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Failed Subjects — Current Semester</p>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}
          className="rounded-xl p-6" style={{ background: 'var(--red-light)', border: '1px solid rgba(220,38,38,0.2)', borderLeft: '3px solid var(--red)' }}>
          <div className="flex items-center gap-2 mb-4"><XCircle size={16} style={{ color: 'var(--red)' }} /><span className="text-[15px] font-semibold" style={{ color: 'var(--red)' }}>Mathematics</span><span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full" style={{ background: 'rgba(220,38,38,0.1)', color: 'var(--red)' }}>Failed</span></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[{ l: 'TOTAL MARKS', v: '46/100', c: 'var(--red)' }, { l: 'PERCENTAGE', v: '46%', c: 'var(--red)' }, { l: 'INTERNAL', v: '13/20' }, { l: 'EXTERNAL', v: '34/80' }].map((s, i) => (
              <div key={i}><p className="text-[10px] font-medium tracking-[1.5px] uppercase" style={{ color: 'var(--text-label)' }}>{s.l}</p><p className="font-mono text-[20px] font-semibold" style={{ color: s.c || 'var(--text-primary)' }}>{s.v}</p></div>
            ))}
          </div>
          <div className="rounded-lg py-3 px-4" style={{ background: 'rgba(220,38,38,0.04)', borderLeft: '2px solid var(--red)' }}>
            <div className="flex items-center gap-1.5 mb-1"><AlertTriangle size={14} style={{ color: 'var(--red)' }} /><span className="text-[12px] font-semibold" style={{ color: 'var(--red)' }}>Action Required:</span></div>
            {['Register for backlog exam in upcoming supplementary period.', 'Attend remedial classes to strengthen fundamentals.', 'Consult with Dr. Sunita Patil for guidance.'].map((t, i) => (
              <div key={i} className="flex items-start gap-2 mb-1 text-[12px]" style={{ color: 'var(--text-secondary)' }}>
                <span className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--red)' }} />{t}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      {/* Cleared History */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.35 }}
        className="rounded-xl p-6" style={{ background: 'var(--green-light)', border: '1px solid rgba(22,163,74,0.2)', borderLeft: '3px solid var(--green)' }}>
        <div className="flex items-center gap-2 mb-3"><CheckCircle2 size={16} style={{ color: 'var(--green)' }} /><span className="text-[14px] font-semibold" style={{ color: 'var(--green)' }}>Cleared Backlogs History</span></div>
        <p className="text-[13px] text-center py-4" style={{ color: 'var(--text-muted)' }}>No cleared backlogs yet — records will appear here</p>
      </motion.div>
      {/* Guidelines */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.4 }}
        className="rounded-xl p-6" style={{ background: 'var(--blue-light)', border: '1px solid var(--blue-subtle)' }}>
        <div className="flex items-center gap-2 mb-3"><Info size={16} style={{ color: 'var(--blue)' }} /><span className="text-[14px] font-semibold" style={{ color: 'var(--blue)' }}>Important Guidelines</span></div>
        {[
          { icon: Bookmark, text: 'Maximum 3 attempts to clear a backlog subject.' },
          { icon: Calendar, text: 'Backlog exams are conducted during supplementary exam period.' },
          { icon: User, text: 'Contact your academic advisor for personalized guidance.' },
          { icon: AlertTriangle, text: '3+ backlogs may affect placement eligibility.' },
          { icon: Clock, text: 'Register within deadline to avoid late penalties.' },
        ].map((g, i) => (
          <div key={i} className="flex items-center gap-3 mb-2 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
            <g.icon size={15} style={{ color: 'var(--blue)' }} />{g.text}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default BacklogsAlerts;
