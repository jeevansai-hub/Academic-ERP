import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, ChevronRight, Search, Download, 
  Upload, Clipboard, Save, Edit2, 
  AlertCircle, ChevronLeft, Flag
} from 'lucide-react';
import { assignedSubjects } from '../../data/facultyData';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface StudentEntry {
  id: string;
  rollNo: string;
  name: string;
  initials: string;
  flagged: boolean;
  score: string; 
  remark: string; 
  partA: string;
  partB: string;
  record: string;
  viva: string;
  execution: string;
  written: string;
  internal: string;
  external: string;
}

const initialStudents: StudentEntry[] = [
    { id: '1', rollNo: 'VIIT21CS001', name: 'Rajesh Kumar', initials: 'RK', flagged: false, score: '', remark: '', partA: '', partB: '', record: '', viva: '', execution: '', written: '', internal: '', external: '' },
    { id: '2', rollNo: 'VIIT21CS002', name: 'Priya Singh', initials: 'PS', flagged: false, score: '', remark: '', partA: '', partB: '', record: '', viva: '', execution: '', written: '', internal: '', external: '' },
    { id: '3', rollNo: 'VIIT21CS003', name: 'Arun Mehra', initials: 'AM', flagged: false, score: '', remark: '', partA: '', partB: '', record: '', viva: '', execution: '', written: '', internal: '', external: '' },
    { id: '4', rollNo: 'VIIT21CS004', name: 'Sonal Verma', initials: 'SV', flagged: false, score: '', remark: '', partA: '', partB: '', record: '', viva: '', execution: '', written: '', internal: '', external: '' },
    { id: '5', rollNo: 'VIIT21CS005', name: 'Kiran Patel', initials: 'KP', flagged: false, score: '', remark: '', partA: '', partB: '', record: '', viva: '', execution: '', written: '', internal: '', external: '' },
    { id: '6', rollNo: 'VIIT21CS006', name: 'Neha Gupta', initials: 'NG', flagged: false, score: '', remark: '', partA: '', partB: '', record: '', viva: '', execution: '', written: '', internal: '', external: '' },
    { id: '7', rollNo: 'VIIT21CS007', name: 'Suresh Reddy', initials: 'SR', flagged: false, score: '', remark: '', partA: '', partB: '', record: '', viva: '', execution: '', written: '', internal: '', external: '' },
    { id: '8', rollNo: 'VIIT21CS008', name: 'Divya Sharma', initials: 'DS', flagged: false, score: '', remark: '', partA: '', partB: '', record: '', viva: '', execution: '', written: '', internal: '', external: '' },
];

const MarksManagement: React.FC = () => {
  const [step, setStep] = useState(1);
  const [context, setContext] = useState({
    subject: '',
    section: 'Section A',
    type: 'Weekly Test',
    week: 'Week 1',
    date: '2026-03-22',
    maxMarks: '10'
  });

  const [students, setStudents] = useState<StudentEntry[]>(JSON.parse(JSON.stringify(initialStudents)));
  const [searchTerm, setSearchTerm] = useState('');
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingTypeChange, setPendingTypeChange] = useState<string>('');

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

  const anyMarksEntered = students.some(s => 
    s.score !== '' || s.partA !== '' || s.partB !== '' || 
    s.record !== '' || s.viva !== '' || s.execution !== '' || s.written !== '' || 
    s.internal !== '' || s.external !== ''
  );

  const resetMarksForTypeChange = (newType: string) => {
    setStudents(JSON.parse(JSON.stringify(initialStudents)));
    setStep(1);
    
    let defaultWeek = 'Week 1';
    let max = '10';
    if (newType === 'Weekly Test') { defaultWeek = 'Week 1'; max = '10'; }
    if (newType === 'Mid-1 Exam') { defaultWeek = 'Mid-1 Examination'; max = '40'; }
    if (newType === 'Mid-2 Exam') { defaultWeek = 'Mid-2 Examination'; max = '40'; }
    if (newType === 'Lab Internal') { defaultWeek = 'CS6L1 — OS & DBMS Lab'; max = '30'; }
    if (newType === 'External Exam') { defaultWeek = 'Semester 6 (Current)'; max = '100'; }

    setContext(prev => ({ ...prev, type: newType, week: defaultWeek, maxMarks: max }));
  };

  const handleTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (step === 2 && anyMarksEntered && val !== context.type) {
      setPendingTypeChange(val);
      setShowConfirm(true);
    } else {
      resetMarksForTypeChange(val);
    }
  };

  const confirmTypeChange = () => {
    resetMarksForTypeChange(pendingTypeChange);
    setShowConfirm(false);
    setPendingTypeChange('');
  };

  const getSubFields = () => {
    switch (context.type) {
      case 'Mid-1 Exam':
      case 'Mid-2 Exam':
        return (
          <div className="grid grid-cols-2 gap-4 mt-3">
             <div className="space-y-2"><label className="text-xs font-bold text-[#6b7280] uppercase">Part-A Max</label><input type="text" disabled value="10" className="w-full px-4 py-3 bg-gray-100 border border-[#e5e7eb] outline-none rounded-xl text-sm font-bold text-[#374151] opacity-60 cursor-not-allowed" /></div>
             <div className="space-y-2"><label className="text-xs font-bold text-[#6b7280] uppercase">Part-B Max</label><input type="text" disabled value="30" className="w-full px-4 py-3 bg-gray-100 border border-[#e5e7eb] outline-none rounded-xl text-sm font-bold text-[#374151] opacity-60 cursor-not-allowed" /></div>
          </div>
        );
      case 'Lab Internal':
        return (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
             <div className="space-y-2"><label className="text-xs font-bold text-[#6b7280] uppercase">Lab Record Max</label><input type="text" disabled value="08" className="w-full px-4 py-3 bg-gray-100 border border-[#e5e7eb] outline-none rounded-xl text-sm font-bold text-[#374151] opacity-60 cursor-not-allowed" /></div>
             <div className="space-y-2"><label className="text-xs font-bold text-[#6b7280] uppercase">Viva-Voce Max</label><input type="text" disabled value="08" className="w-full px-4 py-3 bg-gray-100 border border-[#e5e7eb] outline-none rounded-xl text-sm font-bold text-[#374151] opacity-60 cursor-not-allowed" /></div>
             <div className="space-y-2"><label className="text-xs font-bold text-[#6b7280] uppercase">Prg Execution Max</label><input type="text" disabled value="09" className="w-full px-4 py-3 bg-gray-100 border border-[#e5e7eb] outline-none rounded-xl text-sm font-bold text-[#374151] opacity-60 cursor-not-allowed" /></div>
             <div className="space-y-2"><label className="text-xs font-bold text-[#6b7280] uppercase">Written Test Max</label><input type="text" disabled value="05" className="w-full px-4 py-3 bg-gray-100 border border-[#e5e7eb] outline-none rounded-xl text-sm font-bold text-[#374151] opacity-60 cursor-not-allowed" /></div>
          </div>
        );
      case 'External Exam':
        return (
          <div className="grid grid-cols-2 gap-4 mt-3">
             <div className="space-y-2"><label className="text-xs font-bold text-[#6b7280] uppercase">Internal Max</label><input type="text" disabled value="30" className="w-full px-4 py-3 bg-gray-100 border border-[#e5e7eb] outline-none rounded-xl text-sm font-bold text-[#374151] opacity-60 cursor-not-allowed" /></div>
             <div className="space-y-2"><label className="text-xs font-bold text-[#6b7280] uppercase">External Max</label><input type="text" disabled value="70" className="w-full px-4 py-3 bg-gray-100 border border-[#e5e7eb] outline-none rounded-xl text-sm font-bold text-[#374151] opacity-60 cursor-not-allowed" /></div>
          </div>
        );
      default: return null;
    }
  };

  const getWeekOptions = () => {
    switch (context.type) {
      case 'Weekly Test': return ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'].map(o => <option key={o} value={o}>{o}</option>);
      case 'Mid-1 Exam': return <option value="Mid-1 Examination">Mid-1 Examination</option>;
      case 'Mid-2 Exam': return <option value="Mid-2 Examination">Mid-2 Examination</option>;
      case 'Lab Internal': return ['CS6L1 — OS & DBMS Lab', 'EC6L1 — Digital Circuits Lab'].map(o => <option key={o} value={o}>{o}</option>);
      case 'External Exam': return ['Semester 4', 'Semester 5', 'Semester 6 (Current)'].map(o => <option key={o} value={o}>{o}</option>);
    }
  };

  const getWeekLabel = () => {
    switch (context.type) {
      case 'Weekly Test': return 'WEEK / UNIT *';
      case 'Mid-1 Exam': 
      case 'Mid-2 Exam': return 'EXAM *';
      case 'Lab Internal': return 'LAB SUBJECT *';
      case 'External Exam': return 'SEMESTER *';
      default: return 'WEEK / UNIT *';
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, rowIndex: number, field: string) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      if (e.key === 'Enter') e.preventDefault();
      
      const formElements = Array.from(document.querySelectorAll('input:not([disabled])'));
      const index = formElements.indexOf(e.currentTarget);
      
      if (index > -1 && index < formElements.length - 1) {
        (formElements[index + 1] as HTMLElement).focus();
      }
    }
  };

  const handleInputChange = (id: string, field: keyof StudentEntry, value: string, max: number) => {
    if (value === '') {
      setStudents(prev => prev.map(s => s.id === id ? { ...s, [field]: '' } : s));
      return;
    }
    if (!/^\d*\.?\d*$/.test(value)) return;
    if (value.includes('.') && value.split('.')[1].length > 1) return;
    
    // As per prompt: reject silently negative
    if (Number(value) < 0) value = '0';
    
    setStudents(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  // Validation helper
  const isInvalid = (val: string, max: number) => val !== '' && Number(val) > max;

  const getStats = () => {
    let entered = 0, sum = 0, count = 0, pending = 0;
    
    students.forEach(s => {
      if (context.type === 'Weekly Test') {
        if (s.score !== '') { entered++; sum += Number(s.score); count++; }
        else pending++;
      } else if (context.type === 'Mid-1 Exam' || context.type === 'Mid-2 Exam') {
        if (s.partA !== '' && s.partB !== '') {
          entered++; sum += (Number(s.partA) + Number(s.partB)); count++;
        }
        else pending++;
      } else if (context.type === 'Lab Internal') {
        if (s.record !== '' && s.viva !== '' && s.execution !== '' && s.written !== '') {
          entered++; sum += (Number(s.record) + Number(s.viva) + Number(s.execution) + Number(s.written)); count++;
        }
        else pending++;
      } else if (context.type === 'External Exam') {
        if (s.internal !== '' && s.external !== '') {
          entered++; sum += (Number(s.internal) + Number(s.external)); count++;
        }
        else pending++;
      }
    });

    return {
      entered,
      pending,
      avg: count > 0 ? (sum / count).toFixed(1) : '0.0',
      totalStuds: students.length
    };
  };

  const stats = getStats();
  
  const getAvatarColor = (initials: string) => {
    const map: Record<string, string> = {
      'RK': 'bg-blue-100 text-[#1a56db]', 'PS': 'bg-purple-100 text-purple-700', 'AM': 'bg-green-100 text-green-700', 
      'SV': 'bg-teal-100 text-teal-700', 'KP': 'bg-amber-100 text-amber-700', 'NG': 'bg-pink-100 text-pink-700',
      'SR': 'bg-indigo-100 text-indigo-700', 'DS': 'bg-rose-100 text-rose-700'
    };
    return map[initials] || 'bg-gray-100 text-gray-700';
  };

  const getBadgeStyle = (label: string, fallbackColor: string) => {
    switch (label) {
      case 'Entered': case 'Pass': case 'S': case 'A': return 'bg-[#f0fdf4] text-[#10b981] border border-[#10b981]/20';
      case 'B': return 'bg-[#eff6ff] text-[#1a56db] border border-[#1a56db]/20';
      case 'Low': case 'D': return 'bg-[#fffbeb] text-[#f59e0b] border border-[#f59e0b]/20';
      case 'Fail': case 'E': return 'bg-[#fef2f2] text-[#ef4444] border border-[#ef4444]/20';
      case 'Pending': case 'C': return 'bg-gray-100 text-gray-500 border border-gray-200';
      case '—': return 'bg-gray-50 text-gray-400 border border-transparent';
      default: return `bg-${fallbackColor}-50 text-${fallbackColor}-600`;
    }
  };

  const renderStatus = (label: string) => (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${getBadgeStyle(label, 'gray')}`}>{label}</span>
  );

  const getExtGradeColor = (t: number) => {
    if (t >= 91) return '#065F46'; // S
    if (t >= 81) return '#10B981'; // A
    if (t >= 71) return '#1A56DB'; // B
    if (t >= 61) return '#6B7280'; // C
    if (t >= 50) return '#F59E0B'; // D
    return '#EF4444'; // E
  };

  const InputCell = ({ val, max, field, id, index }: any) => {
    const exceeds = isInvalid(val, max);
    return (
      <div className="relative inline-block w-full max-w-[70px] group/input">
        <input 
            type="text"
            value={val}
            placeholder="-"
            className={`w-full h-[40px] text-center rounded-xl border-2 font-bold text-[14px] outline-none transition-all 
            ${exceeds ? 'border-red-500 bg-red-50 text-red-600 focus:border-red-600 focus:shadow-md' : 'border-[#e5e7eb] bg-white text-[#374151] focus:border-[#1a56db] focus:shadow-md'}`}
            onChange={(e) => handleInputChange(id, field, e.target.value, max)}
            onKeyDown={(e) => handleKeyDown(e, index, field)}
            onBlur={(e) => { if (exceeds) e.target.title = `Cannot exceed ${max}`; else e.target.title = ''; }}
        />
        {exceeds && <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[11px] font-bold px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover/input:opacity-100 transition-opacity">Cannot exceed {max}</span>}
      </div>
    );
  };

  const filteredStudents = students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()));
  const subjectCode = context.subject ? context.subject.split(' - ')[0] : 'Subject';

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

      <div className="flex items-center justify-between max-w-4xl mx-auto px-4 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
        <div className="absolute top-1/2 left-0 h-0.5 bg-[#1a56db] -translate-y-1/2 z-0 transition-all duration-500" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
        {[ { num: 1, label: 'Select Context' }, { num: 2, label: 'Enter Marks' }, { num: 3, label: 'Review & Submit' }].map((s) => (
          <div key={s.num} className="relative z-10 flex flex-col items-center gap-2 group">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${step === s.num ? 'bg-[#1a56db] text-white shadow-lg scale-110 shadow-blue-500/30' : step > s.num ? 'bg-[#10b981] text-white cursor-pointer hover:scale-105' : 'bg-white text-gray-400 border-2 border-gray-200'}`} onClick={() => step > s.num && setStep(1)}>
              {step > s.num ? <Check size={20} strokeWidth={3} /> : s.num}
            </div>
            <span className={`text-xs font-bold whitespace-nowrap ${step >= s.num ? 'text-[#1a56db]' : 'text-gray-400'}`}>{s.label}</span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="max-w-4xl mx-auto bg-white rounded-2xl border border-[#e5e7eb] shadow-xl overflow-hidden p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#6b7280] uppercase">Subject *</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#1a56db] outline-none" value={context.subject} onChange={(e) => setContext({ ...context, subject: e.target.value })}>
                  <option value="">Select Subject</option>
                  {assignedSubjects.map(s => <option key={s.code} value={`${s.code} - ${s.name}`}>{s.code} - {s.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#6b7280] uppercase">Section *</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#1a56db] outline-none" value={context.section} onChange={(e) => setContext({ ...context, section: e.target.value })}>
                  <option>Section A</option>
                  <option>Section B</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#6b7280] uppercase">Assessment Type *</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#1a56db] outline-none" value={context.type} onChange={handleTypeSelect}>
                  <option value="Weekly Test">Weekly Test</option>
                  <option value="Mid-1 Exam">Mid-1 Exam</option>
                  <option value="Mid-2 Exam">Mid-2 Exam</option>
                  <option value="Lab Internal">Lab Internal</option>
                  <option value="External Exam">External Exam</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#6b7280] uppercase">{getWeekLabel()}</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#1a56db] outline-none" value={context.week} onChange={(e) => setContext({ ...context, week: e.target.value })}>
                  {getWeekOptions()}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#6b7280] uppercase">Date *</label>
                <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#1a56db] outline-none" value={context.date} onChange={(e) => setContext({ ...context, date: e.target.value })} />
              </div>
              <div className="space-y-2">
                <div className="space-y-2">
                   <label className="text-xs font-bold text-[#6b7280] uppercase">Max Marks *</label>
                   <input type="number" readOnly className="w-full px-4 py-3 bg-gray-100 border border-[#e5e7eb] outline-none rounded-xl text-sm font-bold opacity-60 cursor-not-allowed" value={context.maxMarks} />
                </div>
                {getSubFields()}
              </div>
            </div>

            <button onClick={() => setStep(2)} disabled={!context.subject} className="w-full mt-12 py-4 bg-[#1a56db] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#1648c8] shadow-lg shadow-blue-500/20 active:translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none">
              Continue to Marks Entry <ChevronRight size={20} />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="bg-[#1a56db] rounded-xl p-5 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-blue-500/10">
              <div className="flex items-center gap-5 w-full md:w-auto">
                <button onClick={() => setStep(1)} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors hidden sm:block"><ChevronLeft size={20} /></button>
                <div className="flex-1">
                  <h3 className="text-xl font-bold tracking-tight">{subjectCode} — {context.type}</h3>
                  <p className="text-sm text-white/80 mt-1 font-medium">{context.section} <span className="mx-1">•</span> {context.week} <span className="mx-1">•</span> Max: {context.maxMarks} Marks</p>
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto mt-4 md:mt-0 px-4 md:px-0 border-t border-white/10 md:border-0 pt-4 md:pt-0">
                <div className="text-center">
                  <p className="text-[10px] text-white/70 font-bold tracking-wider uppercase">ENTERED</p>
                  <p className="text-2xl font-black tabular-nums mt-0.5 leading-none">{stats.entered}<span className="text-white/50 text-base">/{students.length}</span></p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-white/70 font-bold tracking-wider uppercase">CLASS AVG</p>
                  <p className="text-2xl font-black tabular-nums mt-0.5 leading-none">{stats.avg}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:max-w-md">
                 <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                 <input type="text" placeholder="Search students by name or roll..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e5e7eb] rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:border-transparent transition-all shadow-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <div className="flex items-center justify-between w-full sm:w-auto gap-3">
                 <div className="flex items-center justify-center min-w-[130px] h-10 bg-white rounded-xl border border-[#e5e7eb] shadow-sm text-xs font-bold text-gray-600">
                   {saving ? <><div className="w-2 h-2 rounded-full bg-[#1a56db] animate-pulse mr-2"></div> Saving...</> : <><div className="w-2 h-2 rounded-full bg-[#10b981] mr-2"></div> Saved {lastSaved || 'just now'}</>}
                 </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm overflow-x-auto">
              <table className="w-full border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-[#f9fafb] border-b border-[#e5e7eb] h-[48px]">
                    <th className="px-5 py-3 text-left text-[10px] font-bold text-[#6b7280] uppercase tracking-wider w-12">#</th>
                    <th className="px-5 py-3 text-left text-[10px] font-bold text-[#6b7280] uppercase tracking-wider w-36">Roll No</th>
                    <th className="px-5 py-3 text-left text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Student Name</th>
                    
                    {context.type === 'Weekly Test' && <><th className="px-5 py-3 text-center text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Score (/10)</th><th className="px-5 py-3 text-center text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Status</th><th className="px-5 py-3 text-left text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Quick Remark</th></>}
                    
                    {(context.type === 'Mid-1 Exam' || context.type === 'Mid-2 Exam') && <><th colSpan={3} className="px-5 py-3 text-center text-[10px] font-bold text-[#6b7280] uppercase tracking-wider border-x border-[#e5e7eb] bg-[#f3f4f6]">Part-A (/10) <span className="mx-2 font-normal text-gray-400">+</span> Part-B (/30)</th><th className="px-5 py-3 text-center text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Total (/40)</th><th className="px-5 py-3 text-center text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Status</th><th className="px-5 py-3 text-left text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Quick Remark</th></>}
                    
                    {context.type === 'Lab Internal' && <><th className="px-5 py-3 text-center text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Record (/8)</th><th className="px-5 py-3 text-center text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Viva (/8)</th><th className="px-5 py-3 text-center text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Execution (/9)</th><th className="px-5 py-3 text-center text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Written (/5)</th><th className="px-5 py-3 text-center text-[10px] font-bold text-[#6b7280] uppercase tracking-wider border-l border-[#e5e7eb]">Total (/30)</th><th className="px-5 py-3 text-center text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Status</th></>}

                    {context.type === 'External Exam' && <><th className="px-5 py-3 text-center text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Int Marks (/30)</th><th className="px-5 py-3 text-center text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Ext Marks (/70)</th><th className="px-5 py-3 text-center text-[10px] font-bold text-[#6b7280] uppercase tracking-wider border-l border-[#e5e7eb]">Total (/100)</th><th className="px-5 py-3 text-center text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Grade</th><th className="px-5 py-3 text-center text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Status</th></>}

                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredStudents.map((student, i) => {
                    return (
                      <tr key={student.id} className="group transition-colors hover:bg-gray-50/50 h-[72px]">
                        <td className="px-5 py-4 text-xs font-bold text-[#9ca3af]">{i + 1}</td>
                        <td className="px-5 py-4 text-sm font-bold text-[#374151] font-mono tracking-tight whitespace-nowrap">{student.rollNo}</td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold ${getAvatarColor(student.initials)}`}>{student.initials}</div>
                            <span className="text-sm font-bold text-[#111827]">{student.name}</span>
                          </div>
                        </td>

                        {context.type === 'Weekly Test' && (() => {
                          const num = Number(student.score);
                          let st = 'Pending';
                          if (student.score !== '') st = num >= 6 ? 'Entered' : 'Low';
                          return (
                            <>
                              <td className="px-5 py-4 text-center"><InputCell val={student.score} max={10} field="score" id={student.id} index={i} /></td>
                              <td className="px-5 py-4 text-center">{renderStatus(st)}</td>
                              <td className="px-5 py-4"><input type="text" placeholder="Add remark..." className="w-full min-w-[140px] h-9 px-3 text-[13px] font-medium text-[#4b5563] focus:bg-white bg-transparent outline-none border border-transparent focus:border-[#d1d5db] focus:shadow-sm rounded-lg transition-all" value={student.remark} onChange={(e) => setStudents(prev => prev.map(s => s.id === student.id ? { ...s, remark: e.target.value } : s))} /></td>
                            </>
                          )
                        })()}

                        {(context.type === 'Mid-1 Exam' || context.type === 'Mid-2 Exam') && (() => {
                          const t = (student.partA !== '' && student.partB !== '') ? Number(student.partA) + Number(student.partB) : null;
                          let st = 'Pending';
                          if (t !== null) st = t >= 16 ? 'Pass' : 'Fail';
                          let tc = '#111827';
                          if (t !== null) tc = t >= 32 ? '#10B981' : t >= 24 ? '#4B5563' : t >= 20 ? '#F59E0B' : '#EF4444';
                          return (
                            <>
                              <td className="px-5 py-4 text-center border-l border-gray-100 bg-[#f9fafb]/50"><InputCell val={student.partA} max={10} field="partA" id={student.id} index={i} /></td>
                              <td className="py-4 text-center w-6 text-gray-300 font-bold bg-[#f9fafb]/50">+</td>
                              <td className="px-5 py-4 text-center border-r border-gray-100 bg-[#f9fafb]/50"><InputCell val={student.partB} max={30} field="partB" id={student.id} index={i} /></td>
                              <td className="px-5 py-4 text-center"><span className="font-mono text-[16px] font-black" style={{color: tc}}>{t !== null ? t : '—'}</span></td>
                              <td className="px-5 py-4 text-center">{renderStatus(st)}</td>
                              <td className="px-5 py-4"><input type="text" placeholder="Add remark..." className="w-full min-w-[140px] h-9 px-3 text-[13px] font-medium text-[#4b5563] focus:bg-white bg-transparent outline-none border border-transparent focus:border-[#d1d5db] focus:shadow-sm rounded-lg transition-all" value={student.remark} onChange={(e) => setStudents(prev => prev.map(s => s.id === student.id ? { ...s, remark: e.target.value } : s))} /></td>
                            </>
                          )
                        })()}

                        {context.type === 'Lab Internal' && (() => {
                          const isFull = student.record !== '' && student.viva !== '' && student.execution !== '' && student.written !== '';
                          const t = isFull ? Number(student.record) + Number(student.viva) + Number(student.execution) + Number(student.written) : null;
                          let st = 'Pending';
                          if (t !== null) st = t >= 12 ? 'Pass' : 'Fail';
                          let tc = '#111827';
                          if (t !== null) tc = t >= 24 ? '#10B981' : t >= 18 ? '#4B5563' : t >= 15 ? '#F59E0B' : '#EF4444';
                          return (
                            <>
                              <td className="px-5 py-4 text-center"><InputCell val={student.record} max={8} field="record" id={student.id} index={i} /></td>
                              <td className="px-5 py-4 text-center"><InputCell val={student.viva} max={8} field="viva" id={student.id} index={i} /></td>
                              <td className="px-5 py-4 text-center"><InputCell val={student.execution} max={9} field="execution" id={student.id} index={i} /></td>
                              <td className="px-5 py-4 text-center"><InputCell val={student.written} max={5} field="written" id={student.id} index={i} /></td>
                              <td className="px-5 py-4 text-center border-l border-gray-100 bg-[#f9fafb]/30"><span className="font-mono text-[16px] font-black" style={{color: tc}}>{t !== null ? t : '—'}</span></td>
                              <td className="px-5 py-4 text-center">{renderStatus(st)}</td>
                            </>
                          )
                        })()}

                        {context.type === 'External Exam' && (() => {
                          const isFull = student.internal !== '' && student.external !== '';
                          const t = isFull ? Number(student.internal) + Number(student.external) : null;
                          let st = 'Pending';
                          if (isFull) {
                            st = Number(student.external) >= 28 ? 'Pass' : 'Fail';
                          }
                          let g = '—';
                          if (t !== null) {
                            if (t >= 91) g = 'S'; else if (t >= 81) g = 'A'; else if (t >= 71) g = 'B'; else if (t >= 61) g = 'C'; else if (t >= 50) g = 'D'; else g = 'E';
                          }
                          const tc = t !== null ? getExtGradeColor(t) : '#111827';
                          return (
                            <>
                              <td className="px-5 py-4 text-center"><InputCell val={student.internal} max={30} field="internal" id={student.id} index={i} /></td>
                              <td className="px-5 py-4 text-center"><InputCell val={student.external} max={70} field="external" id={student.id} index={i} /></td>
                              <td className="px-5 py-4 text-center border-l border-gray-100 bg-[#f9fafb]/30"><span className="font-mono text-[16px] font-black" style={{color: tc}}>{t !== null ? t : '—'}</span></td>
                              <td className="px-5 py-4 text-center">{g !== '—' ? renderStatus(g) : <span className="text-[14px] font-bold text-gray-300">—</span>}</td>
                              <td className="px-5 py-4 text-center">{renderStatus(st)}</td>
                            </>
                          )
                        })()}

                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="px-6 py-4 bg-gray-50 border-t border-[#e5e7eb] flex justify-between items-center text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">
                <span>Total: {filteredStudents.length} Students</span>
              </div>
            </div>

            <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.1)] fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] lg:w-[calc(100%-288px)] max-w-7xl z-50">
               <div className="flex items-center gap-6">
                  <div className="hidden sm:block">
                     <p className="text-[10px] font-bold text-[#6b7280] uppercase tracking-wider mb-2">Completion Progress</p>
                     <div className="flex items-center gap-3">
                        <div className="w-48 h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                           <div className="h-full bg-[#10b981] transition-all duration-500 ease-out" style={{ width: `${(stats.entered / students.length) * 100}%` }}></div>
                        </div>
                        <span className="text-[13px] font-bold text-[#374151] tabular-nums">{Math.round((stats.entered / students.length) * 100)}%</span>
                     </div>
                  </div>
               </div>
               <div className="flex gap-4 relative group/submit">
                  <button className="hidden sm:flex px-6 py-3 border border-[#e5e7eb] rounded-xl font-bold text-sm text-[#374151] hover:bg-gray-50 transition-colors items-center gap-2">
                    <Save size={18} /> Save Draft
                  </button>
                  <button onClick={() => setStep(3)} disabled={stats.pending > 0} className="px-8 py-3 bg-[#1a56db] text-white rounded-xl font-bold text-sm hover:bg-[#1648c8] shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed">
                    Review & Submit <ChevronRight size={18} />
                  </button>
                  {stats.pending > 0 && <span className="absolute -top-12 right-0 bg-gray-900 border border-gray-700 text-white text-xs font-semibold px-4 py-2 rounded-lg opacity-0 group-hover/submit:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">{stats.pending} students still pending</span>}
               </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-5xl mx-auto space-y-8 pb-40">
             <div className="bg-white rounded-3xl border border-[#e5e7eb] shadow-2xl overflow-hidden p-8">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-100">
                  <div>
                    <h2 className="text-2xl font-bold text-[#111827]">Review Final List</h2>
                    <p className="text-sm text-[#6b7280] mt-1">Please double check all marks before final submission</p>
                  </div>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-700">{context.subject}</span>
                    <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-700">{context.type}</span>
                    <span className="px-3 py-1 bg-[#dcfce7] text-[#065f46] border border-[#10b981]/20 rounded-lg text-xs font-bold font-mono tracking-wider">Max: {context.maxMarks}</span>
                  </div>
               </div>
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8">
                  <StatMini label="Total Students" value={students.length} color="#6b7280" />
                  <StatMini label="Class Avg" value={stats.avg} color="#10b981" />
                  <StatMini label="Max Possible" value={context.maxMarks} color="#1a56db" />
               </div>
               <div className="mt-12 space-y-4">
                  <div className="flex items-start sm:items-center gap-4 p-5 bg-[#eff6ff] rounded-2xl border border-blue-100">
                     <AlertCircle size={22} className="text-[#1a56db] mt-0.5 sm:mt-0" />
                     <p className="text-xs sm:text-sm text-[#1a56db] font-semibold leading-relaxed">By submitting, these marks will be reflected in student dashboards instantly. Please ensure accuracy.</p>
                  </div>
                  <label className="flex items-center gap-4 cursor-pointer p-4 group">
                     <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#1a56db] focus:ring-[#1a56db] cursor-pointer" />
                     <span className="text-sm font-bold text-[#374151]">I confirm that these marks have been verified against the original answer sheets.</span>
                  </label>
               </div>
               <div className="flex gap-4 mt-8 pt-8 border-t border-gray-100">
                  <button onClick={() => setStep(2)} className="flex-1 py-4 border border-[#e5e7eb] bg-white rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-colors">Go Back & Edit</button>
                  <button className="flex-[2] py-4 bg-[#1a56db] text-white rounded-2xl font-extrabold text-lg flex items-center justify-center gap-2 hover:bg-[#1648c8] shadow-xl shadow-blue-500/20 active:translate-y-0.5 transition-all">Submit Final Marks</button>
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border border-gray-100">
            <h3 className="text-xl font-black text-gray-900">Change Assessment Type?</h3>
            <p className="text-sm text-gray-500 mt-3 leading-relaxed font-medium">Changing the assessment type will clear all currently entered marks. This action cannot be undone. Do you want to continue?</p>
            <div className="flex gap-3 mt-8">
              <button onClick={() => { setShowConfirm(false); setPendingTypeChange(''); }} className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-colors text-sm">Cancel</button>
              <button onClick={confirmTypeChange} className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-500/20 text-sm">Yes, Clear Marks</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

const StatMini = ({ label, value, color }: { label: string, value: string | number, color: string }) => (
  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
    <p className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">{label}</p>
    <p className="text-2xl font-black tabular-nums mt-1.5 leading-none" style={{ color }}>{value}</p>
  </div>
);

export default MarksManagement;
