import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileSpreadsheet, Printer, FileText, Eye, ChevronDown, RefreshCw, Lock, GraduationCap, Building, Info, CheckCircle2, XCircle } from 'lucide-react';
import { subjects, studentInfo, reports } from '../../data/studentData';

const iconMap: Record<string, any> = { FileText, FileSpreadsheet, Download };

const ReportsDownloads: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-title text-[32px]" style={{ color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Reports & Downloads</h1>
        <p className="text-[13px] mt-1" style={{ color: 'var(--text-muted)' }}>Download and print your academic reports and marksheets</p>
      </div>
      {/* Semester Selector */}
      <div className="flex items-center gap-3">
        <span className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>Generate report for:</span>
        <div className="relative">
          <select className="h-[38px] rounded-lg px-3 pr-8 text-[13px] appearance-none cursor-pointer outline-none"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}>
            <option>Semester 6</option>
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
        </div>
      </div>
      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Download, color: 'var(--blue)', label: 'Download Marksheet', sub: 'Get semester marksheet in PDF' },
          { icon: FileSpreadsheet, color: 'var(--green)', label: 'Export Data', sub: 'Export performance data as Excel' },
          { icon: Printer, color: 'var(--purple)', label: 'Print Report', sub: 'Print-ready academic report' },
        ].map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.06 }}
            className="rounded-xl py-8 px-6 text-center cursor-pointer"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sm)', transition: 'all 200ms' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.borderColor = 'var(--border-strong)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.borderColor = 'var(--border-default)'; }}>
            <c.icon size={28} className="mx-auto" style={{ color: c.color }} />
            <p className="text-[14px] font-semibold mt-4" style={{ color: 'var(--text-primary)' }}>{c.label}</p>
            <p className="text-[12px] mt-1.5" style={{ color: 'var(--text-muted)' }}>{c.sub}</p>
          </motion.div>
        ))}
      </div>
      {/* Reports List */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
        <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--border-default)' }}>
          <span className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>Available Reports</span>
        </div>
        {reports.map((r, i) => {
          const Icon = iconMap[r.icon] || FileText;
          return (
            <div key={i} className="flex items-center px-5 py-4 transition-colors duration-[120ms]"
              style={{ borderBottom: i < reports.length - 1 ? '1px solid var(--border-faint)' : 'none' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-subtle)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <Icon size={20} className="mr-3.5 flex-shrink-0" style={{ color: r.color }} />
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>{r.name}</p>
                <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{r.desc}</p>
              </div>
              <div className="flex items-center gap-2 ml-3">
                <button className="h-[34px] px-3 rounded-md flex items-center gap-1.5 text-[12px] transition-all duration-150"
                  style={{ border: '1px solid var(--border-default)', color: 'var(--text-muted)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.borderColor = 'var(--border-strong)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border-default)'; }}>
                  <Eye size={13} /> Preview
                </button>
                <button className="h-[34px] px-3.5 rounded-md flex items-center gap-1.5 text-[12px] font-semibold text-white transition-all duration-150"
                  style={{ background: r.format === 'PDF' ? 'var(--blue)' : 'var(--green)' }}
                  onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.08)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.transform = 'none'; }}>
                  <Download size={13} /> {r.format}
                </button>
              </div>
            </div>
          );
        })}
      </motion.div>
      {/* Current Semester Summary */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
        className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
        <div className="px-6 py-4 flex items-center justify-between" style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-default)' }}>
          <span className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>Current Semester Summary</span>
          <button className="h-[34px] px-3 rounded-md flex items-center gap-1.5 text-[12px] transition-all duration-150"
            style={{ border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}>
            <Printer size={13} /> Print
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6">
          {[{ l: 'NAME', v: studentInfo.name }, { l: 'ROLL NUMBER', v: studentInfo.rollNo, mono: true }, { l: 'DEPARTMENT', v: 'CSE' }, { l: 'SEMESTER', v: '6' }].map((f, i) => (
            <div key={i}><p className="text-[10px] font-medium tracking-[1.5px] uppercase mb-1" style={{ color: 'var(--text-label)' }}>{f.l}</p><p className={`text-[14px] font-semibold ${f.mono ? 'font-mono' : ''}`} style={{ color: 'var(--text-primary)' }}>{f.v}</p></div>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead><tr style={{ background: 'var(--bg-subtle)', borderBottom: '2px solid var(--border-default)' }}>
              {['SUBJECT', 'INTERNAL', 'MID SEM', 'END SEM', 'TOTAL', 'GRADE'].map(h => (
                <th key={h} className="text-left px-4 py-2.5 text-[10px] font-medium tracking-[1.5px] uppercase" style={{ color: 'var(--text-label)' }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>{subjects.map((s, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-faint)', background: s.status === 'Fail' ? 'rgba(220,38,38,0.02)' : 'transparent', borderLeft: s.status === 'Fail' ? '3px solid var(--red)' : '3px solid transparent' }}>
                <td className="px-4 py-2.5 text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>{s.name}</td>
                <td className="px-4 py-2.5 font-mono text-[12px]" style={{ color: 'var(--text-primary)' }}>{s.internal}/{s.internalMax}</td>
                <td className="px-4 py-2.5 font-mono text-[12px]" style={{ color: 'var(--text-primary)' }}>{s.midSem}/{s.midSemMax}</td>
                <td className="px-4 py-2.5 font-mono text-[12px]" style={{ color: 'var(--text-primary)' }}>{s.endSem}/{s.endSemMax}</td>
                <td className="px-4 py-2.5 font-mono text-[12px]" style={{ color: 'var(--text-primary)' }}>{s.total}/{s.totalMax}</td>
                <td className="px-4 py-2.5"><span className={`grade-badge ${s.grade === 'A+' ? 'grade-aplus' : s.grade === 'A' ? 'grade-a' : s.grade === 'B+' ? 'grade-bplus' : s.grade === 'F' ? 'grade-f' : 'grade-c'}`}>{s.grade}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div className="px-6 py-3.5 flex flex-wrap items-center justify-between gap-3" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-default)' }}>
          <div className="flex gap-6">
            <span className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>SGPA: <span className="font-mono font-semibold" style={{ color: 'var(--blue)' }}>7.6</span></span>
            <span className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>CGPA: <span className="font-mono font-semibold" style={{ color: 'var(--green)' }}>8.04</span></span>
          </div>
          <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>Generated: {new Date().toLocaleDateString()}</span>
        </div>
      </motion.div>
      {/* Notes */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.35 }}
        className="rounded-xl p-6" style={{ background: 'var(--blue-light)', border: '1px solid var(--blue-subtle)' }}>
        <div className="flex items-center gap-2 mb-3"><Info size={14} style={{ color: 'var(--blue)' }} /><span className="text-[13px] font-semibold" style={{ color: 'var(--blue)' }}>Important Notes</span></div>
        {[
          { icon: RefreshCw, text: 'All reports are generated in real-time with latest data.' },
          { icon: Lock, text: 'Downloaded marksheets are officially stamped and verified.' },
          { icon: GraduationCap, text: 'Reports can be used for scholarship applications.' },
          { icon: Building, text: 'For official transcripts, contact the examination department.' },
        ].map((n, i) => (
          <div key={i} className="flex items-center gap-3 mb-2 text-[12px]" style={{ color: 'var(--text-secondary)' }}>
            <n.icon size={14} style={{ color: 'var(--blue)' }} />{n.text}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ReportsDownloads;
