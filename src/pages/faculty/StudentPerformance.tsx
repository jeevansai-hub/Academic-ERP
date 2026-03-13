import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, ChevronDown, MessageSquare, 
  AlertTriangle, Eye, Download, MoreVertical,
  ChevronLeft, ChevronRight, CheckSquare, Square
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentPerformance: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const navigate = useNavigate();

  const students = [
    { id: '1', name: 'Rajesh Kumar', rollNo: 'VIIT21CS001', avg: 19.4, cgpa: 9.2, tests: 42, status: 'Top Performer', lastTest: '18.5', section: 'A' },
    { id: '2', name: 'Priya Singh', rollNo: 'VIIT21CS002', avg: 18.8, cgpa: 8.9, tests: 40, status: 'Good', lastTest: '17.0', section: 'A' },
    { id: '3', name: 'Arun Mehra', rollNo: 'VIIT21CS003', avg: 11.2, cgpa: 6.5, tests: 38, status: 'At Risk', lastTest: '08.5', section: 'B' },
    { id: '4', name: 'Sonal Verma', rollNo: 'VIIT21CS004', avg: 14.5, cgpa: 7.2, tests: 42, status: 'Average', lastTest: '13.0', section: 'A' },
    { id: '5', name: 'Deepak Rao', rollNo: 'VIIT21CS005', avg: 15.6, cgpa: 7.8, tests: 41, status: 'Good', lastTest: '16.0', section: 'B' },
    { id: '6', name: 'Neha Gupta', rollNo: 'VIIT21CS006', avg: 9.8, cgpa: 5.4, tests: 35, status: 'Critical', lastTest: '07.0', section: 'B' },
    { id: '7', name: 'Vikram Singh', rollNo: 'VIIT21CS007', avg: 18.2, cgpa: 8.6, tests: 42, status: 'Good', lastTest: '19.0', section: 'A' },
  ];

  const toggleSelect = (id: string) => {
    setSelectedStudents(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Top Performer': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Good': return 'bg-green-100 text-green-700 border-green-200';
      case 'Average': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'At Risk': return 'bg-red-100 text-red-700 border-red-200';
      case 'Critical': return 'bg-red-200 text-red-900 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Student Performance</h1>
          <p className="text-sm text-[#6b7280] mt-1">Directory of all students in your assigned sections</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e5e7eb] rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all shadow-sm">
          <Download size={18} /> Export List
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#e5e7eb] shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[300px]">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
             <input 
              type="text" 
              placeholder="Search by name or roll number..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-[#e5e7eb] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db] transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
             />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e5e7eb] rounded-lg text-sm font-medium hover:bg-gray-50">
              <Filter size={18} className="text-gray-400" />
              <span>More Filters</span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {['All', 'Top Performers', 'Average', 'Below Average', 'At Risk', 'Backlog Risk'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all
                ${filter === f ? 'bg-[#1a56db] text-white border-[#1a56db] shadow-md shadow-blue-500/20' : 'bg-white text-gray-500 border-gray-200 hover:border-blue-200 hover:text-blue-600'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-[#e5e7eb]">
                <th className="px-4 py-4 w-12">
                   <button 
                    onClick={() => {
                        if (selectedStudents.length === students.length) setSelectedStudents([]);
                        else setSelectedStudents(students.map(s => s.id));
                    }}
                   >
                     {selectedStudents.length === students.length ? <CheckSquare size={18} className="text-[#1a56db]" /> : <Square size={18} className="text-gray-300" />}
                   </button>
                </th>
                <th className="px-4 py-4 text-left text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Student</th>
                <th className="px-4 py-4 text-left text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Roll No</th>
                <th className="px-4 py-4 text-center text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Avg Score</th>
                <th className="px-4 py-4 text-center text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">CGPA</th>
                <th className="px-4 py-4 text-center text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Status</th>
                <th className="px-4 py-4 text-center text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Last Test</th>
                <th className="px-4 py-4 text-right text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((student) => (
                <tr 
                  key={student.id} 
                  className={`group transition-all hover:bg-blue-50/30 ${selectedStudents.includes(student.id) ? 'bg-blue-50/50 border-l-2 border-l-[#1a56db]' : ''}`}
                >
                  <td className="px-4 py-4 text-center">
                    <button onClick={() => toggleSelect(student.id)}>
                      {selectedStudents.includes(student.id) ? <CheckSquare size={18} className="text-[#1a56db]" /> : <Square size={18} className="text-gray-300 group-hover:text-gray-400" />}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-700">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[#111827] truncate">{student.name}</p>
                        <p className="text-[11px] text-[#9ca3af]">Section {student.section}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-[#374151] font-mono">{student.rollNo}</td>
                  <td className="px-4 py-4 text-center">
                    <span className="text-sm font-bold text-[#111827]">{student.avg}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="text-sm font-bold text-[#111827]">{student.cgpa}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`text-sm font-bold ${Number(student.lastTest) >= 15 ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                      {student.lastTest}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2 text-gray-400 hover:text-[#1a56db] hover:bg-blue-50 rounded-lg transition-all" title="View Profile">
                         <Eye size={18} />
                       </button>
                       <button className="p-2 text-gray-400 hover:text-[#1a56db] hover:bg-blue-50 rounded-lg transition-all" title="Post Remark">
                         <MessageSquare size={18} />
                       </button>
                       <button className="p-2 text-gray-400 hover:text-[#ef4444] hover:bg-red-50 rounded-lg transition-all">
                         <MoreVertical size={18} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-[#e5e7eb] flex items-center justify-between">
          <p className="text-xs font-bold text-[#6b7280]">Showing 1-7 of 120 students</p>
          <div className="flex gap-2">
             <button className="p-1.5 border border-[#e5e7eb] rounded-lg text-gray-400 disabled:opacity-50" disabled><ChevronLeft size={18} /></button>
             <button className="w-8 h-8 flex items-center justify-center bg-[#1a56db] text-white text-[12px] font-bold rounded-lg shadow-md shadow-blue-500/20">1</button>
             <button className="w-8 h-8 flex items-center justify-center bg-white text-gray-600 text-[12px] font-bold rounded-lg border border-[#e5e7eb] hover:bg-gray-50 transition-all">2</button>
             <button className="w-8 h-8 flex items-center justify-center bg-white text-gray-600 text-[12px] font-bold rounded-lg border border-[#e5e7eb] hover:bg-gray-50 transition-all">3</button>
             <button className="p-1.5 border border-[#e5e7eb] rounded-lg text-gray-400 hover:bg-gray-50"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>

      {/* Bulk Action Bar */}
      <AnimatePresence>
        {selectedStudents.length > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] lg:w-[calc(100%-288px)] max-w-5xl bg-[#111827] text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between z-50 border border-white/10"
          >
            <div className="flex items-center gap-4 pl-2">
               <span className="bg-[#1a56db] text-[10px] font-bold px-2 py-1 rounded-md">{selectedStudents.length}</span>
               <span className="text-sm font-semibold opacity-90">Students selected</span>
            </div>
            <div className="flex items-center gap-3">
               <button className="px-4 py-2 bg-white/10 border border-white/5 rounded-xl text-xs font-bold hover:bg-white/20 transition-all flex items-center gap-2">
                 <MessageSquare size={14} /> Post Remark
               </button>
               <button className="px-4 py-2 bg-white/10 border border-white/5 rounded-xl text-xs font-bold hover:bg-white/20 transition-all flex items-center gap-2 text-red-300">
                 <AlertTriangle size={14} /> Flag At Risk
               </button>
               <div className="w-[1px] h-6 bg-white/10 mx-1"></div>
               <button 
                onClick={() => setSelectedStudents([])}
                className="px-4 py-2 text-xs font-bold opacity-60 hover:opacity-100 transition-opacity"
               >
                 Cancel
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentPerformance;
