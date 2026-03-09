import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, X, Mic, 
  ChevronDown, ChevronRight, Filter, 
  LayoutList, LayoutGrid, Activity, BarChart2,
  Download,
  AlertCircle, CheckCircle2, TrendingUp, TrendingDown,
  MessageSquare, History, Bookmark
} from 'lucide-react';
import { subjects, remarks, notifications } from '../../data/studentData';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell
} from 'recharts';

const CHIPS = [
  { id: 'backlogs', label: '🔴 All Backlogs' },
  { id: 'below_avg', label: '📉 Below Average' },
  { id: 'top_scores', label: '📈 Top Scores' },
  { id: 'missing', label: '⏳ Missing Tests' },
  { id: 'remarks', label: '💬 Has Remarks' },
  { id: 'best_subj', label: '🏆 Best Subject' },
  { id: 'this_week', label: '📅 This Week' },
  { id: 'improved', label: '🔥 Most Improved' },
  { id: 'at_risk', label: '⚠️ At Risk' }
];

const SmartSearchAndFilters: React.FC = () => {
  // Search & View State
  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'cards' | 'timeline' | 'chart'>('table');
  const [activeChips, setActiveChips] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('Latest');
  const [showExport, setShowExport] = useState(false);

  // Filter Collapse State
  const [openFilters, setOpenFilters] = useState({
    academic: true,
    time: true,
    performance: true,
    status: false,
    faculty: false,
    portal: false
  });

  // Active Filters State
  const [filters, setFilters] = useState({
    subjects: [] as string[],
    testTypes: [] as string[],
    dateRange: 'Today',
    scoreRange: 'All',
    performanceTags: [] as string[],
    status: [] as string[],
    alertLevel: [] as string[],
    hasRemarks: false,
    portalSections: [] as string[]
  });

  // Memoized Search History (mock)
  const recentSearches = ['CS601 remarks', 'math scores below 12', 'Pending tests', 'Lab Exams', 'Top scores'];

  const toggleFilter = (section: keyof typeof openFilters) => {
    setOpenFilters(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleChipToggle = (chipId: string) => {
    setActiveChips(prev => 
      prev.includes(chipId) ? prev.filter(c => c !== chipId) : [...prev, chipId]
    );
  };

  const updateArrayFilter = (key: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const arr = prev[key] as string[];
      if (arr.includes(value)) {
        return { ...prev, [key]: arr.filter(v => v !== value) };
      }
      return { ...prev, [key]: [...arr, value] };
    });
  };

  // Compile full search data mapping
  const searchableData = useMemo(() => {
    return subjects.map(s => {
      const subjRemarks = remarks.find(r => r.subject === s.name);
      return {
        ...s,
        testType: 'Internal Assessment',
        date: '15 Mar 2026',
        score: s.internal,
        scoreMax: s.internalMax,
        facultyRemarks: subjRemarks ? subjRemarks.quote : '',
        alertLevel: s.status === 'Fail' ? 'Critical' : s.internal < 14 ? 'Warning' : 'Normal',
        type: 'Marks'
      };
    });
  }, []);

  // Filter Logic
  const filteredData = useMemo(() => {
    let result = searchableData;

    // 1. Text Search
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.facultyRemarks.toLowerCase().includes(q) ||
        item.testType.toLowerCase().includes(q) ||
        (item.score).toString() === q
      );
    }

    // 2. Sidebar Filters
    if (filters.subjects.length > 0) {
      result = result.filter(item => filters.subjects.includes(item.code));
    }
    if (filters.scoreRange !== 'All') {
      if (filters.scoreRange === 'Below 10') result = result.filter(item => item.score < 10);
      else if (filters.scoreRange === '10–14') result = result.filter(item => item.score >= 10 && item.score <= 14);
      else if (filters.scoreRange === '15–17') result = result.filter(item => item.score >= 15 && item.score <= 17);
      else if (filters.scoreRange === '18–20') result = result.filter(item => item.score >= 18);
    }
    if (filters.alertLevel.length > 0) {
       result = result.filter(item => filters.alertLevel.includes(item.alertLevel));
    }

    // 3. Quick Chips Overrides
    if (activeChips.includes('backlogs')) {
      result = result.filter(item => item.status === 'Fail');
    }
    if (activeChips.includes('below_avg')) {
      result = result.filter(item => item.score < 14);
    }
    if (activeChips.includes('top_scores')) {
       result = result.filter(item => item.score >= 18);
    }
    if (activeChips.includes('remarks')) {
       result = result.filter(item => item.facultyRemarks.length > 0);
    }

    // 4. Sort
    if (sortBy === 'Score High-Low') result.sort((a,b) => b.score - a.score);
    if (sortBy === 'Score Low-High') result.sort((a,b) => a.score - b.score);
    if (sortBy === 'Subject') result.sort((a,b) => a.name.localeCompare(b.name));

    return result;
  }, [searchableData, query, filters, activeChips, sortBy]);

  const resetAll = () => {
    setQuery('');
    setActiveChips([]);
    setFilters({
      subjects: [], testTypes: [], dateRange: 'Today', scoreRange: 'All',
      performanceTags: [], status: [], alertLevel: [], hasRemarks: false, portalSections: []
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 15) return 'text-green-600 bg-green-50/50 border-green-200';
    if (score >= 10) return 'text-amber-600 bg-amber-50/50 border-amber-200';
    return 'text-red-600 bg-red-50/50 border-red-200';
  };

  return (
    <div className="flex flex-col gap-6" style={{ background: 'var(--bg-page)', minHeight: 'calc(100vh - 120px)' }}>
      
      {/* ════ ZONE 1: SMART SEARCH BAR ════ */}
      <div className="w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative z-20">
        <div className="relative flex items-center">
          <Search size={20} className="absolute left-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search natural language: e.g., 'math scores below 12' or 'pending tests this month'..."
            className="w-full h-14 pl-12 pr-24 bg-gray-50/50 border border-gray-200 rounded-xl text-[15px] outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-gray-800 placeholder-gray-400"
          />
          <div className="absolute right-4 flex items-center gap-3">
             {query && (
               <button onClick={() => setQuery('')} className="p-1 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                 <X size={18} />
               </button>
             )}
             <div className="w-[1px] h-5 bg-gray-200"></div>
             <button className="p-1 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
               <Mic size={18} />
             </button>
          </div>
        </div>
        
        {/* Recent Searches Chips */}
        <div className="flex items-center gap-2 mt-4 px-1 overflow-x-auto no-scrollbar">
          <span className="text-[12px] font-medium tracking-wider uppercase text-gray-400 mr-2 flex items-center gap-1">
            <History size={12} /> Recent:
          </span>
          {recentSearches.map((s, idx) => (
            <button 
              key={idx}
              onClick={() => setQuery(s)}
              className="px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-[12px] text-gray-600 hover:bg-gray-100 hover:border-gray-300 transition-colors whitespace-nowrap"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 relative">
        
        {/* ════ ZONE 2: LEFT SIDEBAR FILTER PANEL ════ */}
        <div className="w-full lg:w-[280px] lg:flex-shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-fit lg:sticky lg:top-[80px]">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-800 font-semibold">
              <Filter size={18} className="text-blue-600" />
              <span>Filters</span>
            </div>
            {(filters.subjects.length > 0 || filters.scoreRange !== 'All' || filters.alertLevel.length > 0) && (
              <span className="bg-blue-100 text-blue-700 text-[11px] font-bold px-2 py-0.5 rounded-md">
                Active
              </span>
            )}
          </div>

          <div className="p-2 max-h-[calc(100vh-250px)] overflow-y-auto filter-scroll">
            
            {/* Section A: Academic */}
            <div className="mb-1">
              <button onClick={() => toggleFilter('academic')} className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="text-[13px] font-medium text-gray-700">Academic</span>
                {openFilters.academic ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
              </button>
              <AnimatePresence>
                {openFilters.academic && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-3 pb-3">
                    <p className="text-[11px] font-semibold text-gray-400 tracking-wider uppercase mb-2 mt-1">Subjects</p>
                    <div className="flex flex-col gap-2.5">
                      {['CS601', 'CS602', 'CS603', 'CS604', 'CS605', 'MA601'].map(code => (
                        <label key={code} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={filters.subjects.includes(code)}
                            onChange={() => updateArrayFilter('subjects', code)}
                            className="w-4 h-4 rounded-[4px] border-gray-300 text-blue-600 focus:ring-blue-500/30 cursor-pointer" 
                          />
                          <span className="text-[13px] text-gray-600 group-hover:text-gray-900">{code}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Section C: Performance */}
            <div className="mb-1">
              <button onClick={() => toggleFilter('performance')} className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="text-[13px] font-medium text-gray-700">Performance</span>
                {openFilters.performance ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
              </button>
              <AnimatePresence>
                {openFilters.performance && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-3 pb-3">
                    <div className="flex flex-col gap-2.5 mt-1">
                      {['All', 'Below 10', '10–14', '15–17', '18–20'].map(range => (
                        <label key={range} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="radio" 
                            name="scoreRange"
                            checked={filters.scoreRange === range}
                            onChange={() => setFilters(prev => ({ ...prev, scoreRange: range }))}
                            className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500/30 cursor-pointer" 
                          />
                          <span className="text-[13px] text-gray-600 group-hover:text-gray-900">{range}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Section D: Status  */}
            <div className="mb-1">
              <button onClick={() => toggleFilter('status')} className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="text-[13px] font-medium text-gray-700">Alert Status</span>
                {openFilters.status ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
              </button>
              <AnimatePresence>
                {openFilters.status && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-3 pb-3">
                    <div className="flex flex-col gap-2.5 mt-1">
                      {['Critical', 'Warning', 'Normal'].map(lvl => (
                        <label key={lvl} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={filters.alertLevel.includes(lvl)}
                            onChange={() => updateArrayFilter('alertLevel', lvl)}
                            className="w-4 h-4 rounded-[4px] border-gray-300 text-blue-600 focus:ring-blue-500/30 cursor-pointer" 
                          />
                          <span className="text-[13px] text-gray-600 group-hover:text-gray-900">{lvl}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex flex-col gap-3">
            <button className="w-full bg-[#1a56db] hover:bg-blue-700 text-white py-2.5 rounded-lg text-[13px] font-semibold transition-colors shadow-sm">
              Apply Filters
            </button>
            <button onClick={resetAll} className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-2.5 rounded-lg text-[13px] font-semibold transition-colors">
              Reset All
            </button>
            <button className="flex items-center justify-center gap-2 mt-1 text-[12px] font-medium text-blue-600 hover:text-blue-800 transition-colors">
              <Bookmark size={14} /> Save Current Filter
            </button>
          </div>
        </div>

        {/* ════ ZONE 3: LIVE RESULTS AREA ════ */}
        <div className="flex-1 flex flex-col">
          
          {/* Quick Filter Chips */}
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1 mb-5">
            {CHIPS.map(chip => {
              const isActive = activeChips.includes(chip.id);
              return (
                <button
                  key={chip.id}
                  onClick={() => handleChipToggle(chip.id)}
                  className={`px-3.5 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-all border
                    ${isActive 
                      ? 'bg-[#1a56db] border-[#1a56db] text-white shadow-md shadow-blue-500/20' 
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
            <div className="text-[16px] font-semibold text-gray-800">
              Showing {filteredData.length} result{filteredData.length !== 1 && 's'}
            </div>
            
            <div className="flex items-center gap-3">
              <select 
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="h-[36px] pl-3 pr-8 rounded-lg border border-gray-200 bg-white text-[13px] text-gray-700 outline-none focus:border-blue-500 appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center', backgroundSize: '16px' }}
              >
                <option>Latest</option>
                <option>Oldest</option>
                <option>Score High-Low</option>
                <option>Score Low-High</option>
                <option>Subject</option>
              </select>

              <div className="flex bg-white rounded-lg border border-gray-200 p-1">
                <button onClick={() => setViewMode('table')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'table' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}><LayoutList size={16} /></button>
                <button onClick={() => setViewMode('cards')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'cards' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}><LayoutGrid size={16} /></button>
                <button onClick={() => setViewMode('timeline')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'timeline' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}><Activity size={16} /></button>
                <button onClick={() => setViewMode('chart')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'chart' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}><BarChart2 size={16} /></button>
              </div>

              <button 
                onClick={() => setShowExport(true)}
                className="flex items-center gap-2 h-[36px] px-3 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Download size={16} className="text-gray-400" /> Export
              </button>
            </div>
          </div>

          {/* Render Result Views */}
          {filteredData.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                <Search size={28} className="text-gray-300" />
              </div>
              <h3 className="text-[16px] font-bold text-gray-800 mb-2">No matching results found</h3>
              <p className="text-[14px] text-gray-500 max-w-[300px]">Try adjusting your search query, removing some filters, or clearing active chips.</p>
              <button onClick={resetAll} className="mt-6 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-[13px] font-semibold hover:bg-blue-100 transition-colors">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="w-full animate-fade-up">

              {/* TABLE VIEW */}
              {viewMode === 'table' && (
                <div className="w-full bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="bg-gray-50/80 border-b border-gray-100">
                          <th className="py-3 px-5 text-[11px] font-semibold tracking-wider text-gray-500 uppercase">Subject</th>
                          <th className="py-3 px-5 text-[11px] font-semibold tracking-wider text-gray-500 uppercase">Test Type</th>
                          <th className="py-3 px-5 text-[11px] font-semibold tracking-wider text-gray-500 uppercase">Date</th>
                          <th className="py-3 px-5 text-[11px] font-semibold tracking-wider text-gray-500 uppercase">Score</th>
                          <th className="py-3 px-5 text-[11px] font-semibold tracking-wider text-gray-500 uppercase">Status</th>
                          <th className="py-3 px-5 text-[11px] font-semibold tracking-wider text-gray-500 uppercase">Remarks</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredData.map((row, idx) => (
                          <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                            <td className="py-3.5 px-5">
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full" style={{ background: row.color }}></div>
                                <div>
                                  <p className="text-[13px] font-semibold text-gray-800 tracking-tight">{row.name}</p>
                                  <p className="text-[11px] font-mono text-gray-400">{row.code}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-5 text-[13px] text-gray-600">{row.testType}</td>
                            <td className="py-3.5 px-5 text-[13px] text-gray-500 whitespace-nowrap">{row.date}</td>
                            <td className="py-3.5 px-5">
                              <span className={`inline-flex px-2 py-0.5 rounded-md font-mono text-[13px] font-medium border ${getScoreColor(row.score)}`}>
                                {row.score}/{row.scoreMax}
                              </span>
                            </td>
                            <td className="py-3.5 px-5">
                              {row.alertLevel === 'Critical' && <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-red-50 text-red-600 text-[11px] font-bold uppercase"><X size={12}/> Critical</span>}
                              {row.alertLevel === 'Warning' && <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-amber-50 text-amber-600 text-[11px] font-bold uppercase"><AlertCircle size={12}/> Warning</span>}
                              {row.alertLevel === 'Normal' && <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-green-50 text-green-600 text-[11px] font-bold uppercase"><CheckCircle2 size={12}/> Normal</span>}
                            </td>
                            <td className="py-3.5 px-5">
                              {row.facultyRemarks ? (
                                <div className="max-w-[180px] text-[12px] text-gray-600 truncate flex items-center gap-2" title={row.facultyRemarks}>
                                  <MessageSquare size={14} className="text-blue-500 flex-shrink-0" />
                                  {row.facultyRemarks}
                                </div>
                              ) : (
                                <span className="text-[12px] text-gray-400 italic">No remarks</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* CARDS VIEW */}
              {viewMode === 'cards' && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredData.map((card, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 relative overflow-hidden group hover:shadow-md transition-shadow">
                      <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: card.color }}></div>
                      
                      <div className="flex justify-between items-start mb-4">
                        <div className="pl-2">
                           <p className="text-[16px] font-bold text-gray-800 tracking-tight leading-tight mb-1">{card.name}</p>
                           <p className="text-[12px] font-mono text-gray-400">{card.code} · {card.date}</p>
                        </div>
                        <div className={`px-2 py-1 rounded-lg border text-[14px] font-bold font-mono ${getScoreColor(card.score)}`}>
                          {card.score}/{card.scoreMax}
                        </div>
                      </div>

                      <div className="pl-2 flex items-center gap-2 mb-4">
                         <span className="bg-gray-100 text-gray-600 text-[11px] font-semibold uppercase px-2 py-0.5 rounded-sm tracking-wider">
                           {card.testType}
                         </span>
                         {card.alertLevel === 'Critical' && <span className="text-red-500 bg-red-50 text-[11px] font-bold uppercase px-2 py-0.5 rounded-sm">Critical</span>}
                         {card.alertLevel === 'Warning' && <span className="text-amber-500 bg-amber-50 text-[11px] font-bold uppercase px-2 py-0.5 rounded-sm">Warning</span>}
                      </div>

                      <div className="pl-2 pt-4 border-t border-gray-100">
                        {card.facultyRemarks ? (
                          <p className="text-[12px] text-gray-600 line-clamp-2 italic">"{card.facultyRemarks}"</p>
                        ) : (
                          <p className="text-[12px] text-gray-400">No faculty remarks available.</p>
                        )}
                      </div>

                      <button className="w-full mt-4 py-2 border border-blue-100 text-blue-600 bg-blue-50/30 hover:bg-blue-50 rounded-xl text-[13px] font-semibold transition-colors opacity-0 group-hover:opacity-100 absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 duration-200">
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* TIMELINE VIEW */}
              {viewMode === 'timeline' && (
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
                  <div className="relative border-l-2 border-gray-200 ml-4 pl-8 py-2 space-y-10">
                    {filteredData.map((item, idx) => (
                      <div key={idx} className="relative">
                        <div className={`absolute -left-[41px] w-[18px] h-[18px] rounded-full border-4 border-white shadow-sm flex items-center justify-center`}
                             style={{ background: item.color }}>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="w-[120px] pt-1">
                            <p className="text-[13px] font-bold text-gray-800">{item.date}</p>
                            <p className="text-[11px] font-mono text-gray-500">{item.code}</p>
                          </div>
                          <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center justify-between">
                            <div>
                              <p className="text-[14px] font-bold text-gray-800 mb-1">{item.name}</p>
                              <p className="text-[12px] text-gray-600">{item.testType}</p>
                            </div>
                            <div className={`px-3 py-1.5 rounded-lg border text-[14px] font-bold font-mono ${getScoreColor(item.score)}`}>
                              {item.score}/{item.scoreMax}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CHART VIEW */}
              {viewMode === 'chart' && (
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                  <h3 className="text-[15px] font-bold text-gray-800 mb-6">Performance Distribution</h3>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="code" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                        <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                        <Bar dataKey="score" radius={[4, 4, 0, 0]} maxBarSize={40}>
                           {filteredData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} />
                           ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* AI INSIGHTS */}
              <div className="mt-6 bg-blue-50/60 border border-blue-100 rounded-2xl p-5 relative overflow-hidden flex items-start gap-4">
                <div className="absolute right-0 top-0 w-32 h-32 bg-blue-400 rounded-full opacity-[0.03] blur-2xl transform translate-x-10 -translate-y-10"></div>
                <div className="w-10 h-10 rounded-full bg-blue-100/80 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Activity size={20} />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-blue-900 mb-2 tracking-tight flex items-center gap-2">
                    Smart Insights <div className="px-1.5 py-0.5 rounded-md bg-blue-200/50 text-blue-700 text-[9px] uppercase tracking-wider font-bold">AI Gen</div>
                  </h4>
                  <ul className="space-y-1.5 text-[13px] text-blue-800/80">
                    <li className="flex flex-row items-center gap-2"><TrendingUp size={14} className="text-green-600"/> <strong className="text-blue-900">Machine Learning & Testing</strong> maintained consistenly excellent scores.</li>
                    <li className="flex flex-row items-center gap-2"><TrendingDown size={14} className="text-red-500"/> <strong className="text-blue-900">Mathematics</strong> has dropped below threshold requiring immediate attention.</li>
                    <li className="flex flex-row items-center gap-2"><MessageSquare size={14} className="text-blue-600"/> 3 subjects currently have faculty remarks demanding action.</li>
                  </ul>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* EXPORT MODAL overlay */}
      <AnimatePresence>
        {showExport && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} 
              className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-[420px] overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h3 className="text-[15px] font-bold text-gray-800">Export Report</h3>
                <button onClick={() => setShowExport(false)} className="text-gray-400 hover:text-gray-600 bg-white shadow-sm border border-gray-100 rounded-full p-1"><X size={16}/></button>
              </div>
              <div className="p-5">
                <p className="text-[13px] font-medium text-gray-700 mb-3">Format</p>
                <div className="flex gap-2 mb-6">
                  {['PDF', 'Excel', 'CSV'].map(fmt => (
                    <button key={fmt} className={`flex-1 py-2 text-[13px] font-bold rounded-lg border transition-colors ${fmt === 'PDF' ? 'bg-[#1a56db] text-white border-[#1a56db]' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
                      {fmt}
                    </button>
                  ))}
                </div>
                <p className="text-[13px] font-medium text-gray-700 mb-3">Include Data</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {['Scores', 'Remarks', 'Dates', 'Faculty', 'Charts'].map(inc => (
                    <label key={inc} className="flex items-center gap-2.5 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded-[4px] border-gray-300 text-blue-600 focus:ring-blue-500/30" />
                      <span className="text-[13px] text-gray-600">{inc}</span>
                    </label>
                  ))}
                </div>
                <button onClick={() => setShowExport(false)} className="w-full bg-[#1a56db] hover:bg-blue-700 text-white font-bold text-[14px] py-3 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2">
                  <Download size={18}/> Download Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartSearchAndFilters;
