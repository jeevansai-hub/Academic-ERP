import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Filter, XCircle, CheckCircle2 } from 'lucide-react';
import { subjects } from '../../data/studentData';

const SmartSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const filtered = subjects.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.code.toLowerCase().includes(query.toLowerCase()) ||
    s.grade.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-title text-[32px]" style={{ color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Smart Search & Filters</h1>
        <p className="text-[13px] mt-1" style={{ color: 'var(--text-muted)' }}>Quickly find subjects, grades, and performance data</p>
      </div>
      {/* Search */}
      <div className="relative">
        <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
        <input
          type="text" value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Search by subject name, code, or grade..."
          className="w-full h-[48px] rounded-xl pl-11 pr-4 text-[14px] outline-none transition-all duration-200"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', boxShadow: 'var(--shadow-sm)' }}
          onFocus={e => { e.target.style.borderColor = 'var(--border-focus)'; e.target.style.boxShadow = 'var(--shadow-focus)'; }}
          onBlur={e => { e.target.style.borderColor = 'var(--border-default)'; e.target.style.boxShadow = 'var(--shadow-sm)'; }}
          id="smart-search"
        />
      </div>
      <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>Showing {filtered.length} of {subjects.length} subjects</p>
      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <SearchIcon size={40} className="mx-auto mb-4" style={{ color: 'var(--border-default)' }} />
          <p className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>No subjects match your search</p>
          <p className="text-[13px] mt-1" style={{ color: 'var(--text-muted)' }}>Try searching for a different subject name, code, or grade</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((s, i) => (
            <motion.div key={s.code}
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
              className="rounded-xl p-5 flex items-center justify-between cursor-default"
              style={{
                background: 'var(--bg-card)', border: '1px solid var(--border-default)',
                borderLeft: `3px solid ${s.status === 'Fail' ? 'var(--red)' : s.color}`,
                boxShadow: 'var(--shadow-sm)', transition: 'all 120ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-subtle)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}>
              <div>
                <p className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>{s.name}</p>
                <p className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>{s.code}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[14px] font-medium" style={{ color: s.percentage >= 80 ? 'var(--green)' : s.percentage >= 60 ? 'var(--blue)' : 'var(--red)' }}>{s.percentage}%</span>
                <span className={`grade-badge ${s.grade === 'A+' ? 'grade-aplus' : s.grade === 'A' ? 'grade-a' : s.grade === 'B+' ? 'grade-bplus' : s.grade === 'F' ? 'grade-f' : 'grade-c'}`}>{s.grade}</span>
                <span className="flex items-center gap-1 text-[12px] font-medium" style={{ color: s.status === 'Pass' ? 'var(--green)' : 'var(--red)' }}>
                  {s.status === 'Pass' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}{s.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SmartSearch;
