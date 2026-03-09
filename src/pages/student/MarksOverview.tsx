import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, CheckCircle2, XCircle, BarChart2, Search,
  ChevronDown, Download
} from 'lucide-react';
import { subjects } from '../../data/studentData';

const gradeClass: Record<string, string> = {
  'A+': 'grade-aplus', 'A': 'grade-a', 'B+': 'grade-bplus',
  'B': 'grade-b', 'C': 'grade-c', 'F': 'grade-f',
};

const MarkOverview: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = subjects.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.code.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const avgPercentage = (subjects.reduce((a, b) => a + b.percentage, 0) / subjects.length).toFixed(2);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="font-title text-[32px]" style={{ color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Marks Overview</h1>
        <p className="text-[13px] mt-1" style={{ color: 'var(--text-muted)' }}>Comprehensive view of all subject marks</p>
      </div>

      {/* Stat Chips */}
      <div className="flex flex-wrap gap-2">
        {[
          { icon: BookOpen, text: `${subjects.length} Subjects`, color: 'var(--text-secondary)' },
          { icon: CheckCircle2, text: `${subjects.filter(s => s.status === 'Pass').length} Passed`, color: 'var(--green)' },
          { icon: XCircle, text: `${subjects.filter(s => s.status === 'Fail').length} Failed`, color: 'var(--red)' },
          { icon: BarChart2, text: `Avg: ${avgPercentage}%`, color: 'var(--blue)' },
        ].map((c, i) => (
          <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', color: c.color }}>
            <c.icon size={12} /> {c.text}
          </span>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by subject name or code"
            className="w-full h-[38px] rounded-lg pl-9 pr-3 text-[13px] outline-none transition-all duration-200"
            style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-default)',
              color: 'var(--text-primary)',
            }}
            onFocus={e => { e.target.style.borderColor = 'var(--border-focus)'; e.target.style.boxShadow = 'var(--shadow-focus)'; }}
            onBlur={e => { e.target.style.borderColor = 'var(--border-default)'; e.target.style.boxShadow = 'none'; }}
            id="marks-search"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="h-[38px] rounded-lg px-3 pr-8 text-[13px] appearance-none cursor-pointer outline-none"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}
            id="status-filter"
          >
            <option value="All">All Status</option>
            <option value="Pass">Pass</option>
            <option value="Fail">Fail</option>
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
        </div>
        <button
          className="h-[38px] px-4 rounded-lg flex items-center gap-2 text-[12px] font-semibold text-white"
          style={{ background: 'var(--blue)', transition: 'all 150ms' }}
          onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.08)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.transform = 'none'; }}
          id="download-pdf"
        >
          <Download size={14} /> Download PDF
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr style={{ background: 'var(--bg-subtle)', borderBottom: '2px solid var(--border-default)' }}>
                {['SUBJECT', 'WEEKLY AVG', 'INTERNAL', 'MID SEM', 'END SEM', 'TOTAL', 'PERCENTAGE', 'GRADE', 'STATUS'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-medium tracking-[1.5px] uppercase whitespace-nowrap"
                    style={{ color: 'var(--text-label)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <motion.tr
                  key={s.code}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.03, ease: 'easeOut' }}
                  className="group cursor-default"
                  style={{
                    borderBottom: '1px solid var(--border-faint)',
                    background: s.status === 'Fail' ? 'rgba(220,38,38,0.02)' : 'transparent',
                    borderLeft: s.status === 'Fail' ? '3px solid var(--red)' : '3px solid transparent',
                    transition: 'background 120ms, border-left 120ms',
                  }}
                  onMouseEnter={e => {
                    if (s.status !== 'Fail') {
                      e.currentTarget.style.background = 'var(--bg-subtle)';
                      e.currentTarget.style.borderLeft = '3px solid var(--blue-subtle)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (s.status !== 'Fail') {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderLeft = '3px solid transparent';
                    }
                  }}
                >
                  <td className="px-4 py-3 w-[280px]">
                    <div className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>{s.name}</div>
                    <div className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>{s.code}</div>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-[13px] font-medium" style={{ color: 'var(--text-primary)' }}>{s.weeklyAvg.toFixed(1)}</td>
                  <td className="px-4 py-3 text-right font-mono text-[13px] font-medium" style={{ color: 'var(--text-primary)' }}>{s.internal}/{s.internalMax}</td>
                  <td className="px-4 py-3 text-right font-mono text-[13px] font-medium" style={{ color: 'var(--text-primary)' }}>{s.midSem}/{s.midSemMax}</td>
                  <td className="px-4 py-3 text-right font-mono text-[13px] font-medium" style={{ color: 'var(--text-primary)' }}>{s.endSem}/{s.endSemMax}</td>
                  <td className="px-4 py-3 text-right font-mono text-[13px] font-medium" style={{ color: 'var(--text-primary)' }}>{s.total}/{s.totalMax}</td>
                  <td className="px-4 py-3 text-right font-mono text-[13px] font-medium"
                    style={{ color: s.percentage >= 80 ? 'var(--green)' : s.percentage >= 60 ? 'var(--blue)' : 'var(--red)' }}>
                    {s.percentage}%
                  </td>
                  <td className="px-4 py-3">
                    <span className={`grade-badge ${gradeClass[s.grade] || 'grade-c'}`}>{s.grade}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-[12px] font-medium"
                      style={{ color: s.status === 'Pass' ? 'var(--green)' : 'var(--red)' }}>
                      {s.status === 'Pass' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                      {s.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Footer */}
        <div className="px-4 py-3 flex flex-wrap gap-3" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-default)' }}>
          {[
            { icon: BookOpen, text: `${filtered.length} Subjects` },
            { icon: CheckCircle2, text: `${filtered.filter(s => s.status === 'Pass').length} Passed` },
            { icon: XCircle, text: `${filtered.filter(s => s.status === 'Fail').length} Failed` },
          ].map((c, i) => (
            <span key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-medium"
              style={{ background: 'white', border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}>
              <c.icon size={12} /> {c.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarkOverview;
