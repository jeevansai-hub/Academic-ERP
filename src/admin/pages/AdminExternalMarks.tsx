import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, CheckCircle2, AlertTriangle, EyeOff, Eye, Search, 
  Download, Upload, Send, FileText, CheckCircle, Flag,
  Edit2, ChevronDown, ChevronRight, Inbox, Clock, ChevronUp
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface StudentResult {
  id: string;
  rollNo: string;
  name: string;
  initials: string;
  section: string;
  int: number | null;
  ext: number | null;
  total: number | null;
  grade: string;
  result: string;
  status: 'Uploaded' | 'Verified' | 'Flagged' | 'Pending';
  flagReason?: string;
  isEditing?: boolean;
  selected?: boolean;
}

const initialResults: StudentResult[] = [
  { id: '1', rollNo: 'VIIT21CS001', name: 'Rajesh Kumar', initials: 'RK', section: 'A', int: 24, ext: 54, total: 78, grade: 'B', result: 'PASS', status: 'Verified' },
  { id: '2', rollNo: 'VIIT21CS002', name: 'Priya Singh', initials: 'PS', section: 'A', int: 27, ext: 62, total: 89, grade: 'A', result: 'PASS', status: 'Verified' },
  { id: '3', rollNo: 'VIIT21CS003', name: 'Arun Mehra', initials: 'AM', section: 'A', int: 21, ext: 48, total: 69, grade: 'C', result: 'PASS', status: 'Uploaded' },
  { id: '4', rollNo: 'VIIT21CS004', name: 'Sonal Verma', initials: 'SV', section: 'A', int: 18, ext: 41, total: 59, grade: 'D', result: 'PASS', status: 'Flagged', flagReason: 'EXT marks mismatch with answer sheet scan' },
  { id: '5', rollNo: 'VIIT21CS005', name: 'Kiran Patel', initials: 'KP', section: 'B', int: 25, ext: 58, total: 83, grade: 'A', result: 'PASS', status: 'Verified' },
  { id: '6', rollNo: 'VIIT21CS006', name: 'Neha Gupta', initials: 'NG', section: 'B', int: 20, ext: 44, total: 64, grade: 'C', result: 'PASS', status: 'Uploaded' },
  { id: '7', rollNo: 'VIIT21CS007', name: 'Suresh Reddy', initials: 'SR', section: 'B', int: 16, ext: 25, total: 41, grade: 'E', result: 'FAIL', status: 'Flagged', flagReason: 'Below minimum EXT passing marks (28/70)' },
  { id: '8', rollNo: 'VIIT21CS008', name: 'Divya Sharma', initials: 'DS', section: 'B', int: 26, ext: 60, total: 86, grade: 'A', result: 'PASS', status: 'Verified' },
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `p${i}`, rollNo: `VIIT21CS00${i + 9}`, name: 'Pending Student', initials: 'PS', section: 'B', int: null, ext: null, total: null, grade: '—', result: 'PENDING', status: 'Pending' as const
  }))
];

const AdminExternalMarks: React.FC = () => {
  const { showToast } = useAdmin();
  const [results, setResults] = useState<StudentResult[]>(initialResults);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSection, setFilterSection] = useState('All Sections');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isPublished, setIsPublished] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [uploadStep, setUploadStep] = useState(0); // 0: select, 1: processing
  const [uploadProgress, setUploadProgress] = useState(0);
  const [publishConfirmed, setPublishConfirmed] = useState(false);
  const [flaggingId, setFlaggingId] = useState<string | null>(null);
  const [flagInput, setFlagInput] = useState('');
  const [showActivityLog, setShowActivityLog] = useState(false);
  const [showBulkConfirm, setShowBulkConfirm] = useState(false);

  useEffect(() => {
    // Check initial calculations just to be safe
    setResults(prev => prev.map(r => r.status !== 'Pending' ? calculateRowState(r) : r));
  }, []);

  const calculateRowState = (row: StudentResult): StudentResult => {
    if (row.int === null || row.ext === null || row.int === '' as any || row.ext === '' as any) {
      return { ...row, total: null, grade: '—', result: 'PENDING', status: 'Pending' };
    }
    const intNum = Number(row.int) || 0;
    const extNum = Number(row.ext) || 0;
    const t = intNum + extNum;
    
    let g = '—';
    if (t >= 91) g = 'S'; else if (t >= 81) g = 'A'; else if (t >= 71) g = 'B'; else if (t >= 61) g = 'C'; else if (t >= 50) g = 'D'; else g = 'E';
    
    let res = (t >= 50 && extNum >= 28) ? 'PASS' : 'FAIL';
    
    let st = row.status;
    if (st === 'Pending') st = 'Uploaded';
    
    return { ...row, total: t, grade: g, result: res, status: st };
  };

  const handleEditClick = (id: string) => {
    setResults(prev => prev.map(r => r.id === id ? { ...r, isEditing: !r.isEditing } : r));
  };

  const handleVerifyRow = (id: string) => {
    setResults(prev => prev.map(r => r.id === id ? { ...r, status: 'Verified', isEditing: false, flagReason: undefined } : r));
    showToast('Result marked as verified', 'success');
  };

  const handleInputChange = (id: string, field: 'int' | 'ext', value: string) => {
    if (value !== '' && !/^\d*\.?\d*$/.test(value)) return;
    if (value.includes('.') && value.split('.')[1].length > 1) return;
    let numVal = value === '' ? null : Number(value);
    if (numVal !== null && numVal < 0) numVal = 0;
    
    const max = field === 'int' ? 30 : 70;
    if (numVal !== null && numVal > max) numVal = max;

    setResults(prev => prev.map(r => {
      if (r.id === id) {
        const next = { ...r, [field]: numVal };
        return calculateRowState(next);
      }
      return r;
    }));
  };

  const saveFlagReason = () => {
    if (!flaggingId || !flagInput.trim()) return;
    setResults(prev => prev.map(r => r.id === flaggingId ? { ...r, status: 'Flagged', flagReason: flagInput, isEditing: false } : r));
    setFlaggingId(null);
    setFlagInput('');
    showToast('Result flagged successfully', 'warning');
  };

  const toggleSelectRow = (id: string) => {
    setResults(prev => prev.map(r => r.id === id ? { ...r, selected: !r.selected } : r));
  };

  const toggleSelectAll = () => {
    const allSelected = filteredResults.every(r => r.selected);
    setResults(prev => prev.map(r => filteredResults.find(fr => fr.id === r.id) ? { ...r, selected: !allSelected } : r));
  };

  const selectedCount = results.filter(r => r.selected).length;

  const handleBulkVerify = () => {
    setResults(prev => prev.map(r => (r.selected && r.status === 'Uploaded') ? { ...r, status: 'Verified', selected: false } : r));
    setShowBulkConfirm(false);
    showToast(`${selectedCount} results verified successfully`, 'success');
  };

  const handleUploadSimulator = () => {
    setUploadStep(1);
    let prog = 0;
    const intv = setInterval(() => {
      prog += 20;
      setUploadProgress(prog);
      if (prog >= 100) {
        clearInterval(intv);
        setTimeout(() => {
          setShowUploadModal(false);
          setUploadStep(0);
          setUploadProgress(0);
          
          setResults(prev => prev.map(r => {
            if (r.status === 'Pending') {
               const intT = Math.floor(Math.random() * 15) + 15;
               const extT = Math.floor(Math.random() * 40) + 30;
               return calculateRowState({ ...r, int: intT, ext: extT, status: 'Uploaded' });
            }
            return r;
          }));

          showToast('Results uploaded successfully', 'success');
        }, 500);
      }
    }, 400);
  };

  const toggleManualEntryMode = () => {
    const isAnyEditing = results.some(r => r.isEditing);
    if (isAnyEditing) {
      setResults(prev => prev.map(r => ({ ...r, isEditing: false })));
      showToast('Manual Entry Mode disabled. Marks saved.', 'info');
    } else {
      setResults(prev => prev.map(r => (r.status !== 'Verified' ? { ...r, isEditing: true } : r)));
      showToast('Manual Entry Mode enabled. You can now edit unverified rows inline.', 'success');
    }
  };

  const handlePublishToggle = () => {
    if (isPublished) {
      setIsPublished(false);
      showToast('Results unpublished', 'info');
      return;
    }
    setShowPublishModal(true);
  };

  const confirmPublish = () => {
    setIsPublished(true);
    setShowPublishModal(false);
    showToast('Results published successfully. Students can now view their marks.', 'success');
  };

  const filteredResults = results.filter(r => {
    const mSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || r.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    const mSec = filterSection === 'All Sections' || r.section === filterSection.replace('Section ', '');
    const mStat = filterStatus === 'All' || r.status === filterStatus;
    return mSearch && mSec && mStat;
  });

  const statsCount = {
    total: 124,
    uploaded: results.filter(r => r.status !== 'Pending').length,
    underReview: results.filter(r => r.status === 'Flagged').length,
    verified: results.filter(r => r.status === 'Verified').length,
    pending: 124 - results.filter(r => r.status !== 'Pending').length
  };

  const canPublish = statsCount.underReview === 0 && statsCount.verified > 0 && statsCount.pending === 0;

  const getIntColor = (v: number | null) => {
    if (v === null) return 'var(--t4)';
    if (v >= 24) return '#22C55E';
    if (v >= 18) return '#4B5563';
    if (v >= 15) return '#F59E0B';
    return '#EF4444';
  };
  const getExtColor = (v: number | null) => {
    if (v === null) return 'var(--t4)';
    if (v >= 56) return '#22C55E';
    if (v >= 42) return '#4B5563';
    if (v >= 35) return '#F59E0B';
    return '#EF4444';
  };
  const getTotalColor = (v: number | null) => {
    if (v === null) return 'var(--t4)';
    if (v >= 60) return '#22C55E';
    if (v >= 50) return '#4B5563';
    if (v >= 45) return '#F59E0B';
    return '#EF4444';
  };

  const getGradeStyle = (grade: string) => {
    switch (grade) {
      case 'S': return 'bg-[#064E3B] text-white';
      case 'A': return 'bg-[#16A34A] text-white';
      case 'B': return 'bg-[#2563EB] text-white';
      case 'C': return 'bg-[#6B7280] text-white';
      case 'D': return 'bg-[#D97706] text-white';
      case 'E': return 'bg-[#DC2626] text-white';
      default: return 'bg-gray-100 text-gray-400';
    }
  };

  const renderBadge = (res: string) => {
    if (res === 'PASS') return <span className="px-2.5 py-0.5 rounded-full border border-green-500 text-green-600 text-[10px] font-bold">PASS</span>;
    if (res === 'FAIL') return <span className="px-2.5 py-0.5 rounded-full border border-red-500 text-red-600 text-[10px] font-bold">FAIL</span>;
    return <span className="px-2.5 py-0.5 rounded-full border border-gray-300 text-gray-500 text-[10px] font-bold">PENDING</span>;
  };

  const renderStatus = (stat: string) => {
    if (stat === 'Verified') return <span className="px-2.5 py-0.5 rounded-full bg-green-500 text-white text-[10px] font-bold">VERIFIED</span>;
    if (stat === 'Flagged') return <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold">FLAGGED</span>;
    if (stat === 'Uploaded') return <span className="px-2.5 py-0.5 rounded-full border border-blue-500 text-blue-600 text-[10px] font-bold">UPLOADED</span>;
    return <span className="px-2.5 py-0.5 rounded-full border border-gray-300 text-gray-500 text-[10px] font-bold">PENDING</span>;
  };

  const getTimelineLog = () => [
    { color: 'bg-green-500', time: '22 Mar 2026, 2:41 PM', text: '4 results verified by Admin' },
    { color: 'bg-amber-500', time: '22 Mar 2026, 1:15 PM', text: '2 results flagged — discrepancy noted' },
    { color: 'bg-blue-500', time: '22 Mar 2026, 11:30 AM', text: '118 results uploaded via CSV' },
    { color: 'bg-gray-400', time: '20 Mar 2026, 9:00 AM', text: 'External Marks sheet created for Semester 6' }
  ];

  return (
    <div className="p-8 pb-32 max-w-[1600px] mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-fraunces)', fontStyle: 'italic' }}>Final External Marks</h1>
          <p className="text-sm font-medium text-gray-600 mt-2">Upload, review, and publish end-semester examination results</p>
          <p className="text-xs text-gray-400 mt-1">Results sourced from University Examination Board</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={toggleManualEntryMode} className={`px-4 py-2 border rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${results.some(r => r.isEditing) ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-inner' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
            <Edit2 size={16} className={results.some(r => r.isEditing) ? 'text-blue-600' : ''} /> {results.some(r => r.isEditing) ? 'Save Manual Entries' : 'Manual Entry Mode'}
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
            <Download size={16} /> Download Template
          </button>
          <button onClick={() => setShowUploadModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 flex items-center gap-2 transition-colors shadow-sm">
            <Upload size={16} /> Upload Results
          </button>
          <button 
            disabled={!canPublish && !isPublished} 
            onClick={handlePublishToggle}
            className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm
              ${isPublished 
                ? 'border border-red-500 text-red-600 hover:bg-red-50'
                : canPublish 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
            `}
            title={!isPublished && !canPublish ? "Complete review before publishing (0 Pending, 0 Flagged required)" : ""}
          >
            {isPublished ? <CheckCircle2 size={16} /> : <Send size={16} />}
            {isPublished ? 'Unpublish' : 'Publish Results'}
          </button>
        </div>
      </div>

      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col relative overflow-hidden shadow-sm">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="bg-blue-50 p-2.5 rounded-lg text-blue-600"><Users size={20} /></div>
            <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full text-xs font-bold leading-none">Active Batch</span>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Students</p>
          <h2 className="text-3xl font-black text-gray-900 leading-none tracking-tight">124</h2>
          <p className="text-xs font-medium text-gray-500 mt-3 pt-3 border-t border-gray-50/50">B.Tech CSE · Semester 6</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col relative overflow-hidden shadow-sm">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="bg-green-50 p-2.5 rounded-lg text-green-600"><CheckCircle2 size={20} /></div>
            <span className="bg-green-50 text-green-600 px-2.5 py-1 rounded-full text-xs font-bold leading-none">95.2% Complete</span>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Results Uploaded</p>
          <h2 className="text-3xl font-black text-gray-900 leading-none tracking-tight">118 <span className="text-lg text-gray-300">/ 124</span></h2>
          <p className="text-xs font-medium text-gray-500 mt-3 pt-3 border-t border-gray-50/50">{statsCount.pending} pending entry</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col relative overflow-hidden shadow-sm">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="bg-amber-50 p-2.5 rounded-lg text-amber-600"><AlertTriangle size={20} /></div>
            <span className="bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full text-xs font-bold leading-none">Needs Attention</span>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Under Review</p>
          <h2 className="text-3xl font-black text-gray-900 leading-none tracking-tight">{statsCount.underReview}</h2>
          <p className="text-xs font-medium text-gray-500 mt-3 pt-3 border-t border-gray-50/50">Flagged for discrepancy</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col relative overflow-hidden shadow-sm">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="bg-gray-50 p-2.5 rounded-lg text-gray-500">
              {isPublished ? <Eye className="text-green-600" size={20} /> : <EyeOff size={20} />}
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold leading-none ${isPublished ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>{isPublished ? 'Live' : 'Draft'}</span>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Publish Status</p>
          <h2 className="text-2xl mt-1 font-black text-gray-900 leading-tight tracking-tight">{isPublished ? 'Published' : 'Unpublished'}</h2>
          <p className="text-xs font-medium text-gray-500 mt-3 pt-3 border-t border-gray-50/50">{isPublished ? 'Visible to all students' : 'Students cannot see results yet'}</p>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col xl:flex-row justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
             <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 outline-none">
                <option>Semester 6 (Current)</option>
             </select>
             <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 outline-none">
                <option>Computer Science & Engg</option>
             </select>
             <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 outline-none" value={filterSection} onChange={e => setFilterSection(e.target.value)}>
                <option>All Sections</option>
                <option>Section A</option>
                <option>Section B</option>
             </select>
             <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 outline-none" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <option>All</option>
                <option>Uploaded</option>
                <option>Pending</option>
                <option>Flagged</option>
                <option>Verified</option>
             </select>
          </div>
          <div className="flex flex-wrap items-center gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search by roll number or name..." 
                  className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm w-full md:w-[260px] focus:ring-2 focus:ring-blue-500 outline-none"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
             </div>
             <button className="px-3 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50">Export PDF</button>
             <button className="px-3 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5"><Download size={14} className="text-green-600" /> Export Excel</button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
             {showBulkConfirm ? (
               <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl flex items-center justify-between shadow-sm">
                  <span className="text-sm font-bold text-blue-800 ml-2">Verify {selectedCount} results? This cannot be undone.</span>
                  <div className="flex gap-3">
                     <button onClick={handleBulkVerify} className="px-4 py-1.5 bg-green-600 text-white text-xs font-bold rounded-lg shadow-sm hover:bg-green-700">Confirm</button>
                     <button onClick={() => setShowBulkConfirm(false)} className="px-4 py-1.5 text-gray-500 text-xs font-bold hover:text-gray-700">Cancel</button>
                  </div>
               </div>
             ) : (
               <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl flex items-center justify-between shadow-sm">
                  <span className="text-sm font-bold text-blue-800 ml-2">{selectedCount} students selected</span>
                  <div className="flex gap-3">
                     <button onClick={() => setShowBulkConfirm(true)} className="px-4 py-1.5 bg-green-600 text-white text-xs font-bold rounded-lg shadow-sm hover:bg-green-700">Verify Selected</button>
                     <button className="px-4 py-1.5 border border-gray-300 bg-white text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50">Export Selected</button>
                     <button onClick={toggleSelectAll} className="px-4 py-1.5 text-gray-500 text-xs font-bold hover:text-gray-700">Clear Selection</button>
                  </div>
               </div>
             )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Results Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#fcfcfc]">
           <h3 className="text-lg font-bold text-gray-900">Student Results — Semester 6</h3>
           <p className="text-xs text-gray-400 italic">B.Tech Computer Science · Academic Year 2025–26</p>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full min-w-[1000px] border-collapse">
              <thead>
                 <tr className="bg-gray-50/80 border-b border-gray-200 h-[44px]">
                    <th className="px-4 py-3 text-center w-12"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" onChange={toggleSelectAll} checked={results.length > 0 && selectedCount === filteredResults.length} /></th>
                    <th className="px-3 py-3 text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest w-10">#</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest w-[120px]">Roll No</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest w-[200px]">Student Name</th>
                    <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest w-20">Section</th>
                    <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest w-[110px]">INT (/30)</th>
                    <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest w-[110px]">EXT (/70)</th>
                    <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest w-[120px]">Total (/100)</th>
                    <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">Grade</th>
                    <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">Result</th>
                    <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
                    <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                 {filteredResults.map((row, i) => {
                   const isFlagged = row.status === 'Flagged';
                   const isVerified = row.status === 'Verified';
                   const canEdit = row.status === 'Uploaded' || row.status === 'Flagged' || row.status === 'Pending';
                   const isEditing = row.isEditing && canEdit;

                   return (
                     <React.Fragment key={row.id}>
                        <tr className="group transition-colors hover:bg-gray-50 h-[64px]" style={{ borderLeft: isFlagged ? '3px solid #F59E0B' : isVerified ? '3px solid #22C55E' : '3px solid transparent' }}>
                           <td className="px-4 py-3 text-center"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" checked={row.selected || false} onChange={() => toggleSelectRow(row.id)} /></td>
                           <td className="px-3 py-3 text-center text-xs font-bold text-gray-400">{i + 1}</td>
                           <td className="px-4 py-3 text-sm font-bold text-gray-500 font-mono tracking-tight">{row.rollNo}</td>
                           <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">{row.initials}</div>
                                 <span className="text-sm font-bold text-[#111827]">{row.name}</span>
                              </div>
                           </td>
                           <td className="px-4 py-3 text-center">
                              <div className="inline-block w-8 py-1 border border-gray-200 rounded text-xs font-bold text-gray-500 bg-white">{row.section}</div>
                           </td>
                           <td className="px-4 py-3 text-center font-mono font-bold text-[14px]">
                              {isEditing ? (
                                <input type="text" className="w-16 h-8 text-center border-2 border-blue-500 rounded outline-none" value={row.int === null ? '' : row.int} onChange={e => handleInputChange(row.id, 'int', e.target.value)} onBlur={() => handleEditClick(row.id)} autoFocus />
                              ) : (
                                <span style={{ color: getIntColor(row.int), cursor: canEdit ? 'pointer' : 'default' }} onClick={() => canEdit && handleEditClick(row.id)}>{row.int !== null ? row.int : '—'}</span>
                              )}
                           </td>
                           <td className="px-4 py-3 text-center font-mono font-bold text-[14px]">
                              {isEditing ? (
                                <input type="text" className="w-16 h-8 text-center border-2 border-blue-500 rounded outline-none" value={row.ext === null ? '' : row.ext} onChange={e => handleInputChange(row.id, 'ext', e.target.value)} onBlur={() => handleEditClick(row.id)} />
                              ) : (
                                <span style={{ color: getExtColor(row.ext), cursor: canEdit ? 'pointer' : 'default' }} onClick={() => canEdit && handleEditClick(row.id)}>{row.ext !== null ? row.ext : '—'}</span>
                              )}
                           </td>
                           <td className="px-4 py-3 text-center bg-gray-50/50">
                              <span className="font-mono text-[16px] font-black" style={{ color: getTotalColor(row.total) }}>{row.total !== null ? row.total : '—'}</span>
                           </td>
                           <td className="px-4 py-3 text-center">
                              <div className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-extrabold ${getGradeStyle(row.grade)}`}>{row.grade}</div>
                           </td>
                           <td className="px-4 py-3 text-center">{renderBadge(row.result)}</td>
                           <td className="px-4 py-3 text-center">{renderStatus(row.status)}</td>
                           <td className="px-4 py-3">
                              <div className="flex justify-center items-center gap-2">
                                 <button onClick={() => canEdit && handleEditClick(row.id)} disabled={!canEdit} className={`p-1.5 rounded-md ${canEdit ? 'text-gray-500 hover:bg-gray-100 hover:text-blue-600' : 'text-gray-300 cursor-not-allowed'}`} title={isEditing ? 'Save Row' : 'Edit Marks'}><Edit2 size={16} className={isEditing ? 'text-blue-500' : ''} /></button>
                                 <button onClick={() => (row.status === 'Uploaded' || row.status === 'Pending') && handleVerifyRow(row.id)} disabled={row.status === 'Verified'} className={`p-1.5 rounded-md ${row.status !== 'Verified' ? 'text-gray-500 hover:bg-gray-100 hover:text-green-600' : 'text-gray-300 cursor-not-allowed'}`} title="Verify"><CheckCircle size={16} /></button>
                                 <button onClick={() => (row.status === 'Uploaded' || row.status === 'Verified' || row.status === 'Pending') && setFlaggingId(row.id === flaggingId ? null : row.id)} className={`p-1.5 rounded-md text-gray-500 hover:bg-gray-100 hover:text-amber-500 ${flaggingId === row.id ? 'bg-amber-100 text-amber-600' : ''}`} title="Flag Discrepancy"><Flag size={16} /></button>
                              </div>
                           </td>
                        </tr>
                        {row.flagReason && row.status === 'Flagged' && flaggingId !== row.id && (
                          <tr className="bg-amber-50/30">
                            <td colSpan={12} className="px-12 py-2.5 text-xs text-amber-700 font-medium">
                              <span className="font-bold mr-2">Flag Reason:</span> {row.flagReason}
                            </td>
                          </tr>
                        )}
                        {flaggingId === row.id && (
                          <tr className="bg-amber-50 border-y border-amber-100">
                             <td colSpan={12} className="px-12 py-4">
                               <div className="flex items-center gap-3 w-full max-w-2xl">
                                  <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">Reason for flag:</span>
                                  <input type="text" className="flex-1 px-3 py-2 bg-white border border-amber-300 rounded text-sm outline-none focus:ring-2 focus:ring-amber-500" placeholder="e.g., Mismatch with physical answer sheet" autoFocus value={flagInput} onChange={e => setFlagInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && saveFlagReason()} />
                                  <button onClick={saveFlagReason} className="px-3 py-2 bg-amber-500 text-white rounded text-xs font-bold hover:bg-amber-600">Save Flag</button>
                                  <button onClick={() => setFlaggingId(null)} className="px-3 py-2 text-gray-500 text-xs font-bold hover:text-gray-700">Cancel</button>
                               </div>
                             </td>
                          </tr>
                        )}
                     </React.Fragment>
                   );
                 })}
                 {filteredResults.length === 0 && (
                   <tr>
                     <td colSpan={12} className="py-16 text-center text-gray-500">No results found matching your filters.</td>
                   </tr>
                 )}
              </tbody>
           </table>
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
           <div>Showing {filteredResults.length} of {results.length} students</div>
           <div className="flex gap-1">
              <button className="px-3 py-1.5 border border-gray-200 rounded hover:bg-white disabled:opacity-50">Prev</button>
              <button className="px-3 py-1.5 bg-blue-600 text-white rounded font-bold border border-blue-600">1</button>
              <button className="px-3 py-1.5 border border-gray-200 rounded hover:bg-white bg-transparent">2</button>
              <button className="px-3 py-1.5 border border-gray-200 rounded hover:bg-white bg-transparent">...</button>
              <button className="px-3 py-1.5 border border-gray-200 rounded hover:bg-white bg-transparent">13</button>
              <button className="px-3 py-1.5 border border-gray-200 rounded hover:bg-white disabled:opacity-50">Next</button>
           </div>
        </div>
      </div>

      {/* Revaluation Requests Section */}
      {isPublished && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-6">
           <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Revaluation Requests</h3>
              <p className="text-xs text-gray-400 italic">Requests submitted by students after result publication</p>
           </div>
           
           <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
             <table className="w-full text-left">
               <thead className="bg-[#fcfcfc] border-b border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                 <tr>
                   <th className="px-5 py-3 w-12 text-center">#</th>
                   <th className="px-5 py-3 w-32">Roll No</th>
                   <th className="px-5 py-3 w-48">Student Name</th>
                   <th className="px-5 py-3 w-48">Subject</th>
                   <th className="px-5 py-3 w-32">Current Marks</th>
                   <th className="px-5 py-3 text-left">Reason</th>
                   <th className="px-5 py-3 w-32">Submitted On</th>
                   <th className="px-5 py-3 w-32 text-center">Status</th>
                   <th className="px-5 py-3 w-32 text-center">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                 <tr className="hover:bg-gray-50">
                    <td className="px-5 py-4 text-center text-xs font-bold text-gray-400">1</td>
                    <td className="px-5 py-4 text-sm font-bold text-gray-600 font-mono">VIIT21CS007</td>
                    <td className="px-5 py-4 text-sm font-bold text-gray-900">Suresh Reddy</td>
                    <td className="px-5 py-4 text-sm font-medium text-gray-600">EC601 Digital Circuits</td>
                    <td className="px-5 py-4 text-sm font-mono font-bold text-red-600">25/70 EXT</td>
                    <td className="px-5 py-4 text-xs text-gray-600 leading-snug">Answer sheet not evaluated correctly for Q4 and Q5</td>
                    <td className="px-5 py-4 text-xs font-medium text-gray-500">20 Mar 2026</td>
                    <td className="px-5 py-4 text-center"><span className="px-2.5 py-1 rounded bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-wider">New</span></td>
                    <td className="px-5 py-4 text-center">
                       <div className="flex gap-2 justify-center">
                          <button className="px-2.5 py-1 text-xs font-bold border border-green-500 text-green-600 rounded hover:bg-green-50">Approve</button>
                          <button className="px-2.5 py-1 text-xs font-bold border border-red-500 text-red-600 rounded hover:bg-red-50">Reject</button>
                       </div>
                    </td>
                 </tr>
               </tbody>
             </table>
           </div>
        </motion.div>
      )}

      {/* Activity Log Strip */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-8">
         <button onClick={() => setShowActivityLog(!showActivityLog)} className="w-full flex items-center justify-between p-4 bg-[#fcfcfc] hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
               <div className="p-1.5 bg-gray-100 rounded-lg text-gray-500"><Clock size={16} /></div>
               <h3 className="font-bold text-sm text-gray-800">Activity Log</h3>
            </div>
            {showActivityLog ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
         </button>
         <AnimatePresence>
            {showActivityLog && (
               <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden border-t border-gray-100">
                  <div className="p-6 space-y-5">
                     {getTimelineLog().map((log, index) => (
                        <div key={index} className="flex gap-4 relative">
                           {index !== getTimelineLog().length - 1 && <div className="absolute left-2.5 top-6 bottom-[-20px] w-[2px] bg-gray-100"></div>}
                           <div className={`w-5 h-5 rounded-full ${log.color} border-4 border-white shadow-sm flex-shrink-0 relative z-10`}></div>
                           <div className="pt-0.5">
                              <p className="text-[13px] text-gray-600 font-medium" style={{ fontFamily: 'var(--font-outfit)' }}>{log.text}</p>
                              <p className="text-[11px] font-mono text-gray-400 mt-0.5">{log.time}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* Upload Results Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-2xl max-w-[500px] w-full overflow-hidden">
             <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Upload External Marks</h2>
                <p className="text-xs font-medium text-gray-500 mt-1">Upload CSV or Excel file from examination board</p>
             </div>
             
             <div className="p-6 space-y-6">
                <div className="bg-[#eff6ff] p-4 rounded-xl border border-blue-100 flex gap-3">
                   <FileText size={20} className="text-blue-500 shrink-0" />
                   <div>
                      <p className="text-xs text-blue-700 font-medium leading-relaxed">Expected columns: Roll No, Student Name, INT Marks, EXT Marks.</p>
                      <button className="text-[11px] font-bold text-blue-600 mt-1 hover:underline flex items-center gap-1">Download template for correct format <ChevronRight size={12} /></button>
                   </div>
                </div>

                {uploadStep === 0 && (
                  <>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-blue-400 transition-colors group">
                       <div className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 mb-3 group-hover:text-blue-500 group-hover:shadow-sm"><Upload size={24} /></div>
                       <p className="text-sm font-bold text-gray-700">Drop your file here</p>
                       <p className="text-xs text-gray-400 mt-1 font-medium">or click to browse · CSV, XLSX only · Max 5MB</p>
                    </div>
                    
                    <div className="space-y-4">
                       <div>
                          <input type="text" disabled value="Semester 6 (Current)" className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm font-bold text-gray-500 cursor-not-allowed" />
                       </div>
                       <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none shadow-sm">
                          <option>Select Subject</option>
                          <option>CS601 - Software Engineering</option>
                          <option>CS602 - Web Technologies</option>
                       </select>
                    </div>
                  </>
                )}

                {uploadStep === 1 && (
                  <div className="py-8 space-y-4">
                     <p className="text-sm font-bold text-center text-gray-700">Processing file...</p>
                     <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                     </div>
                     <p className="text-xs text-center text-gray-400 font-mono">{uploadProgress}%</p>
                  </div>
                )}
             </div>

             <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                <button onClick={() => setShowUploadModal(false)} className="px-5 py-2.5 border border-gray-300 bg-white text-gray-700 font-bold rounded-xl text-sm hover:bg-gray-50 transition-colors">Cancel</button>
                <button disabled={uploadStep === 1} onClick={handleUploadSimulator} className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-sm shadow-md hover:bg-blue-700 disabled:opacity-50 transition-colors">Upload & Process</button>
             </div>
          </motion.div>
        </div>
      )}

      {/* Publish Results Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-2xl max-w-[480px] w-full overflow-hidden">
             <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Publish External Marks</h2>
             </div>
             
             <div className="p-6 space-y-6">
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                   <div className="space-y-3">
                      <div className="flex justify-between text-sm"><span className="text-gray-500 font-medium">Total Students:</span><span className="font-black text-gray-800">124</span></div>
                      <div className="flex justify-between text-sm"><span className="text-gray-500 font-medium">Verified Results:</span><span className="font-black text-gray-800">{statsCount.verified}</span></div>
                      <div className="h-[1px] w-full bg-gray-200"></div>
                      <div className="flex justify-between text-sm"><span className="text-gray-500 font-medium">Pass:</span><span className="font-bold text-green-600">108</span></div>
                      <div className="flex justify-between text-sm"><span className="text-gray-500 font-medium">Fail:</span><span className="font-bold text-red-600">8</span></div>
                      <div className="flex justify-between text-sm"><span className="text-gray-500 font-medium">Pending:</span><span className="font-bold text-gray-400">{statsCount.pending}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-gray-500 font-medium">Flagged:</span><span className="font-bold text-amber-500">{statsCount.underReview}</span></div>
                   </div>
                </div>

                <div className="flex gap-3">
                   <AlertTriangle className="text-amber-500 shrink-0" size={20} />
                   <p className="text-[13px] text-amber-700 font-semibold leading-relaxed">Once published, all students will immediately see their results on the student portal. This action cannot be undone.</p>
                </div>

                <label className="flex items-start gap-3 cursor-pointer p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                   <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer" checked={publishConfirmed} onChange={e => setPublishConfirmed(e.target.checked)} />
                   <span className="text-sm font-bold text-gray-700 leading-snug">I confirm all results have been reviewed and are accurate.</span>
                </label>
             </div>

             <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                <button onClick={() => { setShowPublishModal(false); setPublishConfirmed(false); }} className="px-5 py-2.5 border border-gray-300 bg-white text-gray-700 font-bold rounded-xl text-sm hover:bg-gray-50 transition-colors">Cancel</button>
                <button disabled={!publishConfirmed} onClick={confirmPublish} className="px-5 py-2.5 bg-green-600 text-white font-bold rounded-xl text-sm shadow-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all">Publish Now</button>
             </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminExternalMarks;
