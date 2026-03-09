import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Calendar, Tag, Pin, Check } from 'lucide-react';
import { remarks } from '../../data/studentData';

const sentimentBorder: Record<string, string> = { strength: 'var(--green)', neutral: 'var(--blue)', critical: 'var(--red)', improvement: 'var(--amber)' };

const RemarksFeedback: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [checkedItems, setCheckedItems] = useState<boolean[]>([false, false, false, false]);

  const totalRemarks = remarks.length;
  const strengths = remarks.reduce((a, r) => a + r.strengths.length, 0);
  const improvements = remarks.reduce((a, r) => a + r.improvements.length, 0);

  const filtered = remarks.filter(r => {
    if (filter === 'strengths') return r.strengths.length > 0;
    if (filter === 'improvements') return r.improvements.length > 0;
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-title text-[32px]" style={{ color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Faculty Remarks & Feedback</h1>
        <p className="text-[13px] mt-1" style={{ color: 'var(--text-muted)' }}>View feedback and suggestions from your faculty</p>
      </div>
      {/* Summary */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        className="rounded-xl p-5 grid grid-cols-3 gap-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
        {[{ l: 'TOTAL REMARKS RECEIVED', v: totalRemarks }, { l: 'IDENTIFIED STRENGTHS', v: strengths, c: 'var(--green)' }, { l: 'IMPROVEMENT AREAS', v: improvements, c: 'var(--red)' }].map((s, i) => (
          <div key={i} className="text-center"><p className="text-[10px] font-medium tracking-[1.5px] uppercase" style={{ color: 'var(--text-label)' }}>{s.l}</p><p className="font-mono text-[28px] font-medium mt-1" style={{ color: s.c || 'var(--text-primary)' }}>{s.v}</p></div>
        ))}
      </motion.div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {[{ k: 'all', l: 'All Remarks' }, { k: 'strengths', l: 'Strengths Only' }, { k: 'improvements', l: 'Improvements Only' }].map(f => (
          <button key={f.k} onClick={() => setFilter(f.k)} className="px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150"
            style={{
              background: filter === f.k ? 'var(--blue-light)' : 'var(--bg-card)',
              border: `1px solid ${filter === f.k ? 'var(--blue-subtle)' : 'var(--border-default)'}`,
              color: filter === f.k ? 'var(--blue)' : 'var(--text-secondary)',
            }}>{f.l}</button>
        ))}
      </div>
      {/* Info */}
      <div className="rounded-lg py-3 px-4" style={{ background: 'var(--blue-light)', border: '1px solid var(--blue-subtle)' }}>
        <div className="flex items-center gap-1.5 mb-1"><MessageSquare size={14} style={{ color: 'var(--blue)' }} /><span className="text-[13px] font-semibold" style={{ color: 'var(--blue)' }}>About Faculty Remarks</span></div>
        <p className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>These remarks are provided by faculty based on your academic performance, participation, and assessments.</p>
      </div>
      {/* Remarks Cards */}
      {filtered.map((r, idx) => (
        <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: idx * 0.05 }}
          className="rounded-xl p-6" style={{
            background: 'var(--bg-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sm)',
            borderLeft: `3px solid ${sentimentBorder[r.sentiment] || 'var(--blue)'}`,
          }}>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div><span className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>{r.subject}</span><p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>By: {r.faculty}</p></div>
            <div className="flex items-center gap-1.5"><Calendar size={12} style={{ color: 'var(--text-muted)' }} /><span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>{r.date}</span></div>
          </div>
          <div className="py-3 my-2" style={{ borderLeft: '3px solid var(--border-strong)', paddingLeft: 16 }}>
            <p className="text-[14px] italic" style={{ color: 'var(--text-secondary)' }}>{r.quote}</p>
          </div>
          {r.strengths.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center gap-1.5 mb-2"><Tag size={12} style={{ color: 'var(--text-muted)' }} /><span className="text-[11px] font-medium tracking-[1.5px] uppercase" style={{ color: 'var(--text-label)' }}>Strengths</span></div>
              <div className="flex flex-wrap gap-1.5">{r.strengths.map((s, i) => (
                <span key={i} className="text-[12px] font-medium px-3 py-1 rounded" style={{ background: 'var(--green-light)', border: '1px solid rgba(22,163,74,0.2)', color: 'var(--green)' }}>{s}</span>
              ))}</div>
            </div>
          )}
          {r.improvements.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center gap-1.5 mb-2"><Tag size={12} style={{ color: 'var(--text-muted)' }} /><span className="text-[11px] font-medium tracking-[1.5px] uppercase" style={{ color: 'var(--text-label)' }}>Areas to Improve</span></div>
              <div className="flex flex-wrap gap-1.5">{r.improvements.map((s, i) => (
                <span key={i} className="text-[12px] font-medium px-3 py-1 rounded" style={{ background: 'var(--red-light)', border: '1px solid rgba(220,38,38,0.2)', color: 'var(--red)' }}>{s}</span>
              ))}</div>
            </div>
          )}
          {r.suggestions.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2"><Tag size={12} style={{ color: 'var(--text-muted)' }} /><span className="text-[11px] font-medium tracking-[1.5px] uppercase" style={{ color: 'var(--text-label)' }}>Suggestions</span></div>
              <div className="flex flex-wrap gap-1.5">{r.suggestions.map((s, i) => (
                <span key={i} className="text-[12px] font-medium px-3 py-1 rounded" style={{ background: 'var(--blue-light)', border: '1px solid var(--blue-subtle)', color: 'var(--blue)' }}>{s}</span>
              ))}</div>
            </div>
          )}
        </motion.div>
      ))}
      {/* Action Items */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}
        className="rounded-xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
        <div className="flex items-center gap-2 mb-4"><Pin size={14} style={{ color: 'var(--blue)' }} /><span className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>Action Items</span></div>
        {['Review all faculty remarks and create an action plan', 'Schedule meetings with faculty to discuss improvement', 'Focus on weakness areas and leverage strengths', 'Implement suggestions to enhance overall performance'].map((item, i) => (
          <div key={i} className="flex items-center gap-3 py-2.5" style={{ borderBottom: i < 3 ? '1px solid var(--border-faint)' : 'none' }}>
            <button onClick={() => { const n = [...checkedItems]; n[i] = !n[i]; setCheckedItems(n); }}
              className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all duration-200"
              style={{
                background: checkedItems[i] ? 'var(--blue)' : 'transparent',
                border: `1px solid ${checkedItems[i] ? 'var(--blue)' : 'var(--border-strong)'}`,
              }}>
              {checkedItems[i] && <Check size={10} className="text-white" />}
            </button>
            <span className="text-[13px] transition-all duration-200" style={{ color: checkedItems[i] ? 'var(--text-muted)' : 'var(--text-secondary)', textDecoration: checkedItems[i] ? 'line-through' : 'none' }}>{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default RemarksFeedback;
