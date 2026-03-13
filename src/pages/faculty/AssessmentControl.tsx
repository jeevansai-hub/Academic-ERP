import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Calendar as CalendarIcon, List, Search,
  MoreVertical, Clock, CheckCircle2, AlertCircle,
  X, HelpCircle, ChevronLeft, ChevronRight
} from 'lucide-react';

const AssessmentControl: React.FC = () => {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const assessments = [
    { id: '1', name: 'Weekly Test 7', subject: 'CS601', type: 'Weekly Test', date: '15 Mar 2026', time: '10:00 AM', max: 20, students: 120, status: 'Scheduled' },
    { id: '2', name: 'Internal Assessment 2', subject: 'MA601', type: 'Internal', date: '18 Mar 2026', time: '02:00 PM', max: 40, students: 60, status: 'Draft' },
    { id: '3', name: 'Lab Viva - Cloud', subject: 'CS602', type: 'Lab', date: '12 Mar 2026', time: '09:00 AM', max: 20, students: 58, status: 'Completed' },
    { id: '4', name: 'Surprise Quiz 2', subject: 'CS603', type: 'Quiz', date: '10 Mar 2026', time: '11:45 AM', max: 10, students: 60, status: 'Completed' },
    { id: '5', name: 'Assignment 3', subject: 'CS605', type: 'Assignment', date: '25 Mar 2026', time: '11:59 PM', max: 20, students: 120, status: 'Scheduled' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Assessment Control</h1>
          <p className="text-sm text-[#6b7280] mt-1">Schedule and manage your classroom assessments</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1a56db] text-white rounded-xl font-bold hover:bg-[#1648c8] shadow-lg shadow-blue-500/20 active:translate-y-0.5 transition-all"
        >
          <Plus size={20} /> Create Assessment
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center p-1 bg-gray-100 rounded-xl w-fit">
        <button 
          onClick={() => setView('list')}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all
            ${view === 'list' ? 'bg-white text-[#1a56db] shadow-sm' : 'text-gray-500'}`}
        >
          <List size={18} /> List View
        </button>
        <button 
          onClick={() => setView('calendar')}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all
            ${view === 'calendar' ? 'bg-white text-[#1a56db] shadow-sm' : 'text-gray-500'}`}
        >
          <CalendarIcon size={18} /> Calendar View
        </button>
      </div>

      <AnimatePresence mode="wait">
        {view === 'list' ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-[#e5e7eb] flex items-center justify-between">
               <div className="relative w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input type="text" placeholder="Search assessments..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-[#e5e7eb] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db]" />
               </div>
               <div className="flex gap-2">
                 <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold">5 TOTAL</span>
                 <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-[10px] font-bold">2 DONE</span>
               </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">
                    <th className="px-6 py-4">Assessment Name</th>
                    <th className="px-6 py-4">Subject</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Date & Time</th>
                    <th className="px-6 py-4 text-center">Max Marks</th>
                    <th className="px-6 py-4 text-center">Students</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {assessments.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-[#111827]">{a.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-gray-100 rounded-md text-[10px] font-bold text-gray-600">{a.subject}</span>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500">{a.type}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                           <span className="text-sm text-[#374151] font-bold">{a.date}</span>
                           <span className="text-[10px] text-[#9ca3af]">{a.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-[#111827]">{a.max}</td>
                      <td className="px-6 py-4 text-center text-xs text-gray-500">{a.students}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={a.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-white rounded-lg transition-all text-gray-400">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm p-6"
          >
             <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-[#111827]">March 2026</h3>
               <div className="flex items-center gap-2">
                 <button className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft size={20} /></button>
                 <button className="px-4 py-2 hover:bg-gray-100 rounded-lg text-sm font-bold">Today</button>
                 <button className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRight size={20} /></button>
               </div>
             </div>
             <div className="grid grid-cols-7 border-t border-l border-[#e5e7eb]">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                  <div key={day} className="p-3 bg-gray-50 border-r border-b border-[#e5e7eb] text-center text-[10px] font-bold text-gray-400">
                    {day}
                  </div>
                ))}
                {[...Array(31)].map((_, i) => (
                  <div key={i} className="min-h-[120px] p-2 border-r border-b border-[#e5e7eb] relative group hover:bg-blue-50/20 transition-all">
                    <span className={`text-sm font-bold ${i+1 === 13 ? 'bg-[#1a56db] text-white w-7 h-7 flex items-center justify-center rounded-full' : 'text-gray-400'}`}>
                      {i + 1}
                    </span>
                    {i + 1 === 15 && (
                      <div className="mt-2 p-1.5 bg-blue-100 border-l-2 border-blue-600 rounded text-[9px] font-bold text-blue-700">
                        WT-7 · CS601
                      </div>
                    )}
                    {i + 1 === 18 && (
                      <div className="mt-2 p-1.5 bg-orange-100 border-l-2 border-orange-600 rounded text-[9px] font-bold text-orange-700">
                        IA-2 · MA601
                      </div>
                    )}
                    <button className="absolute bottom-2 right-2 p-1 bg-white border rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus size={12} className="text-[#1a56db]" />
                    </button>
                  </div>
                ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Modal Slide Panel */}
      <AnimatePresence>
        {showCreateModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-[70] backdrop-blur-sm"
              onClick={() => setShowCreateModal(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 w-full md:w-[500px] h-full bg-white z-[80] shadow-2xl flex flex-col pt-20"
            >
              <div className="px-8 flex items-center justify-between pb-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-[#111827]">Create New Assessment</h2>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                ><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                <div className="space-y-1">
                   <label className="text-xs font-bold text-[#6b7280] uppercase">Assessment Name *</label>
                   <input type="text" placeholder="e.g. Weekly Test 8" className="w-full px-4 py-3 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#1a56db] outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                     <label className="text-xs font-bold text-[#6b7280] uppercase">Subject *</label>
                     <select className="w-full px-4 py-3 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm font-medium outline-none">
                        <option>CS601</option>
                        <option>MA601</option>
                        <option>CS603</option>
                     </select>
                  </div>
                  <div className="space-y-1">
                     <label className="text-xs font-bold text-[#6b7280] uppercase">Section *</label>
                     <select className="w-full px-4 py-3 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm font-medium outline-none">
                        <option>Section A</option>
                        <option>Section B</option>
                        <option>Both</option>
                     </select>
                  </div>
                </div>
                <div className="space-y-1">
                   <label className="text-xs font-bold text-[#6b7280] uppercase">Type *</label>
                   <select className="w-full px-4 py-3 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm font-medium outline-none">
                      <option>Weekly Test</option>
                      <option>Internal Assessment</option>
                      <option>Assignment</option>
                      <option>Quiz</option>
                   </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                     <label className="text-xs font-bold text-[#6b7280] uppercase">Date *</label>
                     <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm font-medium outline-none" />
                  </div>
                  <div className="space-y-1">
                     <label className="text-xs font-bold text-[#6b7280] uppercase">Max Marks *</label>
                     <input type="number" defaultValue={20} className="w-full px-4 py-3 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm font-medium outline-none" />
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-3">
                   <HelpCircle size={20} className="text-[#1a56db]" />
                   <p className="text-xs text-[#1a56db] font-medium leading-relaxed">
                     Students will receive a notification as soon as you schedule this assessment. You can still save it as a draft.
                   </p>
                </div>
              </div>
              <div className="p-8 border-t border-gray-100 bg-gray-50 flex gap-4">
                 <button className="flex-1 py-3 border border-[#e5e7eb] rounded-xl font-bold text-gray-500 hover:bg-white bg-transparent">Save Draft</button>
                 <button className="flex-[2] py-3 bg-[#1a56db] text-white rounded-xl font-extrabold shadow-lg shadow-blue-500/20 hover:bg-[#1648c8]">Schedule Now</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  switch(status) {
    case 'Scheduled': return <span className="flex items-center gap-1.5 text-xs font-bold text-blue-600"><Clock size={14} /> Scheduled</span>;
    case 'Completed': return <span className="flex items-center gap-1.5 text-xs font-bold text-green-600"><CheckCircle2 size={14} /> Completed</span>;
    case 'Draft': return <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400"><Clock size={14} /> Draft</span>;
    default: return <span className="text-xs font-bold text-red-600">{status}</span>;
  }
};

export default AssessmentControl;
