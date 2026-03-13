import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, ChevronRight, Search, Download, 
  Upload, Clipboard, Save, Trash2, Edit2, 
  AlertCircle, ChevronLeft, Flag, MessageSquare,
  BarChart3, FileSpreadsheet
} from 'lucide-react';
import { assignedSubjects } from '../../data/facultyData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Types
interface StudentEntry {
  id: string;
  rollNo: string;
  name: string;
  score: string; // string to handle empty and 'AB'
  remark: string;
  flagged: boolean;
  initials: string;
}

const MarksManagement: React.FC = () => {
  const [step, setStep] = useState(1);
  const [context, setContext] = useState({
    subject: '',
    section: 'Section A',
    type: 'Weekly Test',
    week: 'Week 7',
    date: '2026-03-15',
    maxMarks: '20'
  });

  const [students, setStudents] = useState<StudentEntry[]>([
    { id: '1', rollNo: 'VIIT21CS001', name: 'Rajesh Kumar', score: '', remark: '', flagged: false, initials: 'RK' },
    { id: '2', rollNo: 'VIIT21CS002', name: 'Priya Singh', score: '', remark: '', flagged: false, initials: 'PS' },
    { id: '3', rollNo: 'VIIT21CS003', name: 'Arun Mehra', score: '', remark: '', flagged: false, initials: 'AM' },
    { id: '4', rollNo: 'VIIT21CS004', name: 'Sonal Verma', score: '', remark: '', flagged: false, initials: 'SV' },
    { id: '5', rollNo: 'VIIT21CS005', name: 'Deepak Rao', score: '', remark: '', flagged: false, initials: 'DR' },
    { id: '6', rollNo: 'VIIT21CS006', name: 'Neha Gupta', score: '', remark: '', flagged: false, initials: 'NG' },
    { id: '7', rollNo: 'VIIT21CS007', name: 'Vikram Singh', score: '', remark: '', flagged: false, initials: 'VS' },
    { id: '8', rollNo: 'VIIT21CS008', name: 'Anjali Sharma', score: '', remark: '', flagged: false, initials: 'AS' },
  ]);

  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Auto-save simulation
  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => {
        setSaving(true);
        setTimeout(() => {
          setSaving(false);
          setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 800);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [students, step]);

  const handleScoreChange = (id: string, value: string) => {
    const max = parseInt(context.maxMarks) || 20;
    
    // Validate entry
    if (value.toLowerCase() === 'ab') {
      value = 'AB';
    } else if (value !== '' && !isNaN(Number(value))) {
        if (Number(value) > max) return; // Prevent exceeding max
    } else if (value !== '') {
        return; // Only numbers or AB
    }

    setStudents(prev => prev.map(s => s.id === id ? { ...s, score: value } : s));
  };

  const getScoreColor = (score: string) => {
    if (score === '') return 'bg-white border-gray-200';
    if (score === 'AB') return 'bg-gray-100 border-gray-300 text-gray-500';
    const num = Number(score);
    const max = parseInt(context.maxMarks) || 20;
    const pct = (num / max) * 100;
    
    if (pct >= 90) return 'bg-[#f0fdf4] border-[#10b981] text-[#10b981]';
    if (pct >= 75) return 'bg-[#eff6ff] border-[#1a56db] text-[#1a56db]';
    if (pct >= 50) return 'bg-[#fffbeb] border-[#f59e0b] text-[#f59e0b]';
    return 'bg-[#fef2f2] border-[#ef4444] text-[#ef4444]';
  };

  const getStatusBadge = (score: string) => {
    if (score === '') return { label: 'Pending', color: 'bg-gray-100 text-gray-500' };
    if (score === 'AB') return { label: 'Absent', color: 'bg-gray-200 text-gray-600' };
    const num = Number(score);
    const max = parseInt(context.maxMarks) || 20;
    const pct = (num / max) * 100;
    
    if (pct >= 90) return { label: 'Excellent', color: 'bg-[#f0fdf4] text-[#10b981]' };
    if (pct >= 75) return { label: 'Good', color: 'bg-[#eff6ff] text-[#1a56db]' };
    if (pct >= 50) return { label: 'Average', color: 'bg-[#fffbeb] text-[#f59e0b]' };
    return { label: 'Critical', color: 'bg-[#fef2f2] text-[#ef4444]' };
  };

  const stats = {
    entered: students.filter(s => s.score !== '').length,
    absent: students.filter(s => s.score === 'AB').length,
    pending: students.filter(s => s.score === '').length,
    avg: students.filter(s => s.score !== '' && s.score !== 'AB').length 
      ? (students.reduce((acc, s) => s.score !== '' && s.score !== 'AB' ? acc + Number(s.score) : acc, 0) / students.filter(s => s.score !== '' && s.score !== 'AB').length).toFixed(1)
      : '0.0'
  };

  return (
    <div className="space-y-8 pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Marks Management</h1>
          <p className="text-sm text-[#6b7280] mt-1">Enter, manage, and analyze student marks</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-[#e5e7eb] rounded-lg text-sm font-semibold bg-white hover:bg-gray-50">
            <Download size={16} /> Import Template
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-[#e5e7eb] rounded-lg text-sm font-semibold bg-white hover:bg-gray-50">
            <Clipboard size={16} /> History
          </button>
        </div>
      </div>

      {/* Step Progress Indicator */}
      <div className="flex items-center justify-between max-w-4xl mx-auto px-4 relative">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-[#1a56db] -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        ></div>

        {[
          { num: 1, label: 'Select Context' },
          { num: 2, label: 'Enter Marks' },
          { num: 3, label: 'Review & Submit' }
        ].map((s) => (
          <div key={s.num} className="relative z-10 flex flex-col items-center gap-2 group">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300
              ${step === s.num ? 'bg-[#1a56db] text-white shadow-lg scale-110 shadow-blue-500/30' : 
                step > s.num ? 'bg-[#10b981] text-white' : 'bg-white text-gray-400 border-2 border-gray-200'}`}
            >
              {step > s.num ? <Check size={20} strokeWidth={3} /> : s.num}
            </div>
            <span className={`text-xs font-bold whitespace-nowrap ${step >= s.num ? 'text-[#1a56db]' : 'text-gray-400'}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="max-w-4xl mx-auto bg-white rounded-2xl border border-[#e5e7eb] shadow-xl overflow-hidden p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#6b7280] uppercase">Subject *</label>
                <select 
                  className="w-full px-4 py-3 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#1a56db] outline-none"
                  value={context.subject}
                  onChange={(e) => setContext({ ...context, subject: e.target.value })}
                >
                  <option value="">Select Subject</option>
                  {assignedSubjects.map(s => <option key={s.code} value={s.code}>{s.code} - {s.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#6b7280] uppercase">Section *</label>
                <select 
                  className="w-full px-4 py-3 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#1a56db] outline-none"
                  value={context.section}
                  onChange={(e) => setContext({ ...context, section: e.target.value })}
                >
                  <option>Section A</option>
                  <option>Section B</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#6b7280] uppercase">Assessment Type *</label>
                <select 
                  className="w-full px-4 py-3 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#1a56db] outline-none"
                  value={context.type}
                  onChange={(e) => setContext({ ...context, type: e.target.value })}
                >
                  <option>Weekly Test</option>
                  <option>Internal Assessment 1</option>
                  <option>Internal Assessment 2</option>
                  <option>Surprise Test</option>
                  <option>Lab Quiz</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#6b7280] uppercase">Week / Unit *</label>
                <select 
                  className="w-full px-4 py-3 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#1a56db] outline-none"
                  value={context.week}
                  onChange={(e) => setContext({ ...context, week: e.target.value })}
                >
                  {[...Array(16)].map((_, i) => <option key={i} value={`Week ${i+1}`}>Week {i+1}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#6b7280] uppercase">Date *</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#1a56db] outline-none"
                  value={context.date}
                  onChange={(e) => setContext({ ...context, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#6b7280] uppercase">Max Marks *</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-3 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#1a56db] outline-none"
                  value={context.maxMarks}
                  onChange={(e) => setContext({ ...context, maxMarks: e.target.value })}
                />
              </div>
            </div>

            {context.subject && (
              <div className="mt-8 p-4 bg-[#eff6ff] rounded-xl border border-blue-100 flex items-start gap-3">
                <AlertCircle size={20} className="text-[#1a56db] mt-0.5" />
                <div className="text-sm text-[#1a56db]">
                   <p className="font-bold">Summary Preview:</p>
                   <p className="mt-1">Entering marks for <b>{context.subject}</b> • <b>{context.type}</b> • {context.section} • {context.week} • Max: {context.maxMarks}</p>
                </div>
              </div>
            )}

            <button 
              onClick={() => setStep(2)}
              disabled={!context.subject}
              className="w-full mt-10 py-4 bg-[#1a56db] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#1648c8] shadow-lg shadow-blue-500/20 active:translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0"
            >
              Continue to Marks Entry <ChevronRight size={20} />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Top Info Bar */}
            <div className="bg-[#1a56db] rounded-xl p-4 text-white flex flex-wrap items-center justify-between gap-4 shadow-lg shadow-blue-500/10">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <div>
                  <h3 className="text-lg font-bold leading-tight">{context.subject} — {context.type}</h3>
                  <p className="text-xs text-white/70 italic">{context.section} • {context.week} • Max: {context.maxMarks} Marks</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-[10px] text-white/60 font-medium">ENTERED</p>
                  <p className="text-lg font-bold">{stats.entered}/{students.length}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-white/60 font-medium">CLASS AVG</p>
                  <p className="text-lg font-bold">{stats.avg}</p>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                 <input 
                  type="text" 
                  placeholder="Search students by name or roll..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-[#e5e7eb] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
                 />
              </div>
              <div className="flex items-center gap-3">
                 <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-[#e5e7eb] text-xs font-medium">
                   {saving ? (
                     <><div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div> Saving...</>
                   ) : (
                     <><div className="w-2 h-2 rounded-full bg-green-500"></div> Saved {lastSaved || 'just now'}</>
                   )}
                 </div>
                 <button className="p-2 border border-[#e5e7eb] rounded-lg text-gray-600 hover:bg-white">
                   <Upload size={18} />
                 </button>
              </div>
            </div>

            {/* Marks Table */}
            <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-[#e5e7eb]">
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-[#6b7280] uppercase tracking-wider w-12">#</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-[#6b7280] uppercase tracking-wider w-32">Roll No</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Student Name</th>
                    <th className="px-4 py-3 text-center text-[10px] font-bold text-[#6b7280] uppercase tracking-wider w-24">Score</th>
                    <th className="px-4 py-3 text-center text-[10px] font-bold text-[#6b7280] uppercase tracking-wider w-28">Status</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Quick Remark</th>
                    <th className="px-4 py-3 text-center text-[10px] font-bold text-[#6b7280] uppercase tracking-wider w-16"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {students.map((student, i) => {
                    const status = getStatusBadge(student.score);
                    return (
                      <tr 
                        key={student.id} 
                        className={`group transition-colors hover:bg-gray-50/50 ${student.score === 'AB' ? 'bg-gray-50/40' : ''}`}
                      >
                        <td className="px-4 py-4 text-xs font-bold text-[#9ca3af]">{i + 1}</td>
                        <td className="px-4 py-4 text-sm font-medium text-[#111827] font-mono">{student.rollNo}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#1a56db]/10 flex items-center justify-center text-[10px] font-bold text-[#1a56db]">
                               {student.initials}
                            </div>
                            <span className="text-sm font-semibold text-[#374151]">{student.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-1.5">
                            <input 
                              type="text" 
                              maxLength={3}
                              className={`w-14 h-9 text-center rounded-lg border-2 font-bold text-sm outline-none transition-all duration-300 focus:shadow-md
                                ${getScoreColor(student.score)}`}
                              value={student.score}
                              onChange={(e) => handleScoreChange(student.id, e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'a' || e.key === 'A') {
                                  handleScoreChange(student.id, 'AB');
                                  e.preventDefault();
                                }
                              }}
                            />
                            <span className="text-[10px] font-bold text-[#9ca3af]">/{context.maxMarks}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                           <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${status.color}`}>
                             {status.label}
                           </span>
                        </td>
                        <td className="px-4 py-4">
                           <div className="relative group/remark">
                             <input 
                               type="text" 
                               placeholder="Add remark..."
                               className="w-full h-8 px-2 bg-transparent text-xs text-[#6b7280] focus:bg-white focus:border-[#e5e7eb] border border-transparent rounded transition-all outline-none"
                               value={student.remark}
                               onChange={(e) => {
                                 const val = e.target.value;
                                 setStudents(prev => prev.map(s => s.id === student.id ? { ...s, remark: val } : s));
                               }}
                             />
                             <div className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover/remark:opacity-100 transition-opacity">
                               <Edit2 size={12} className="text-gray-400" />
                             </div>
                           </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                           <button className="p-1 hover:bg-gray-100 rounded text-gray-400">
                             <Flag size={14} />
                           </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="p-4 bg-gray-50 border-t border-[#e5e7eb] flex items-center justify-between text-xs font-bold text-[#6b7280] uppercase tracking-wider">
                <span>Total: {students.length} Students</span>
                <div className="flex gap-4">
                   <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-[#10b981]"></div> Excellent</div>
                   <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-[#1a56db]"></div> Good</div>
                   <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-[#f59e0b]"></div> Average</div>
                   <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-[#ef4444]"></div> Critical</div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xl fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] lg:w-[calc(100%-288px)] max-w-7xl z-20">
               <div className="flex items-center gap-6">
                  <div className="hidden sm:block">
                     <p className="text-[10px] font-bold text-[#9ca3af] uppercase">Completion</p>
                     <div className="flex items-center gap-2 mt-1">
                        <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                           <div className="h-full bg-[#10b981] transition-all" style={{ width: `${(stats.entered / students.length) * 100}%` }}></div>
                        </div>
                        <span className="text-sm font-bold text-[#374151]">{Math.round((stats.entered / students.length) * 100)}%</span>
                     </div>
                  </div>
               </div>
               <div className="flex gap-4">
                  <button className="px-6 py-2.5 border border-[#e5e7eb] rounded-xl font-bold text-sm text-[#374151] hover:bg-gray-50 transition-all flex items-center gap-2">
                    <Save size={18} /> Save Draft
                  </button>
                  <button 
                    onClick={() => setStep(3)}
                    disabled={stats.pending > 0}
                    className="px-8 py-2.5 bg-[#1a56db] text-white rounded-xl font-bold text-sm hover:bg-[#1648c8] hover:-translate-y-0.5 shadow-lg shadow-blue-500/20 active:translate-y-0 transition-all flex items-center gap-2 group disabled:opacity-50 disabled:translate-y-0"
                  >
                    Review & Submit <ChevronRight size={18} />
                  </button>
               </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-5xl mx-auto space-y-8 pb-40"
          >
            <div className="bg-white rounded-3xl border border-[#e5e7eb] shadow-2xl overflow-hidden p-8">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-100">
                  <div>
                    <h2 className="text-2xl font-bold text-[#111827]">Review Final List</h2>
                    <p className="text-sm text-[#6b7280] mt-1">Please double check all marks before final submission</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-600">{context.subject}</span>
                    <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-600">{context.type}</span>
                    <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-600">{context.section}</span>
                    <span className="px-3 py-1 bg-[#f0fdf4] text-[#10b981] rounded-lg text-xs font-bold font-mono">Max: {context.maxMarks}</span>
                  </div>
               </div>

               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                  <StatMini label="Total" value={students.length} color="#6b7280" />
                  <StatMini label="Entered" value={stats.entered} color="#1a56db" />
                  <StatMini label="Absent" value={stats.absent} color="#f59e0b" />
                  <StatMini label="Class Avg" value={stats.avg} color="#10b981" />
               </div>

               <div className="mt-12 h-64 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h4 className="text-[12px] font-bold text-[#6b7280] uppercase mb-4">Score Distribution</h4>
                  <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={[
                      { range: '0-9', count: students.filter(s => s.score !== '' && s.score !== 'AB' && Number(s.score) < 10).length },
                      { range: '10-14', count: students.filter(s => s.score !== '' && s.score !== 'AB' && Number(s.score) >= 10 && Number(s.score) <= 14).length },
                      { range: '15-17', count: students.filter(s => s.score !== '' && s.score !== 'AB' && Number(s.score) >= 15 && Number(s.score) <= 17).length },
                      { range: '18-20', count: students.filter(s => s.score !== '' && s.score !== 'AB' && Number(s.score) >= 18).length },
                    ]}>
                      <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={50}>
                        <Cell fill="#ef4444" />
                        <Cell fill="#f59e0b" />
                        <Cell fill="#1a56db" />
                        <Cell fill="#10b981" />
                      </Bar>
                      <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700 }} />
                      <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '10px' }} />
                    </BarChart>
                  </ResponsiveContainer>
               </div>

               <div className="mt-12 space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                     <AlertCircle size={20} className="text-[#1a56db]" />
                     <p className="text-xs text-[#1a56db] font-medium leading-relaxed">
                        By submitting, these marks will be reflected in student dashboards instantly. Please ensure accuracy.
                     </p>
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer p-4 group">
                     <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#1a56db] focus:ring-[#1a56db]" />
                     <span className="text-sm font-semibold text-[#374151]">I confirm that these marks have been verified against the original answer sheets.</span>
                  </label>
               </div>

               <div className="flex gap-4 mt-8 pt-8 border-t border-gray-100">
                  <button 
                    onClick={() => setStep(2)}
                    className="flex-1 py-4 border border-[#e5e7eb] rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all"
                  >
                    Go Back & Edit
                  </button>
                  <button className="flex-[2] py-4 bg-[#1a56db] text-white rounded-2xl font-extrabold text-lg flex items-center justify-center gap-2 hover:bg-[#1648c8] hover:-translate-y-1 shadow-2xl shadow-blue-500/40 active:translate-y-0 transition-all">
                    Submit Final Marks
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatMini = ({ label, value, color }: { label: string, value: string | number, color: string }) => (
  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
    <p className="text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">{label}</p>
    <p className="text-xl font-bold mt-1" style={{ color }}>{value}</p>
  </div>
);

const BookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
);

export default MarksManagement;
