import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, FileSpreadsheet, Download, 
  Search, Clock, ChevronRight, Share2, 
  Calendar, Users, BookOpen
} from 'lucide-react';

const ReportsAttendance: React.FC = () => {
  const reports = [
    { title: 'Class Grade Sheet', format: 'PDF', size: '2.4 MB', type: 'Academic', color: '#1a56db', icon: <FileText size={24} />, desc: 'Complete grade summary for all students in Section A' },
    { title: 'Weekly Test Analysis', format: 'XLSX', size: '1.2 MB', type: 'Analytics', color: '#10b981', icon: <FileSpreadsheet size={24} />, desc: 'Week-by-week performance comparison and trends' },
    { title: 'At-Risk Student Report', format: 'PDF', size: '940 KB', type: 'Alert', color: '#ef4444', icon: <FileText size={24} />, desc: 'Detailed analysis of students below threshold marks' },
    { title: 'Attendance Log - March', format: 'PDF', size: '3.1 MB', type: 'Attendance', color: '#8b5cf6', icon: <Calendar size={24} />, desc: 'Daily attendance record for faculty-led sections' },
    { title: 'Co-Curricular Marks', format: 'XLSX', size: '450 KB', type: 'Academic', color: '#f59e0b', icon: <FileSpreadsheet size={24} />, desc: 'Interaction points and extra-curricular evaluation' },
    { title: 'Semester Comparison', format: 'PDF', size: '5.2 MB', type: 'Analytics', color: '#0891b2', icon: <FileText size={24} />, desc: 'Current vs Previous semester performance' },
  ];

  const recentDownloads = [
    { name: 'WT_Analysis_W6.xlsx', date: 'Today, 10:45 AM', user: 'You' },
    { name: 'Grade_Sheet_Final.pdf', date: 'Yesterday, 04:30 PM', user: 'You' },
    { name: 'Attendance_Report_Feb.pdf', date: '2 days ago', user: 'Admin' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Reports & Attendance</h1>
          <p className="text-sm text-[#6b7280] mt-1">Generate and download academic performance documents</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search reports..."
            className="w-full md:w-64 pl-10 pr-4 py-2 bg-white border border-[#e5e7eb] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
          />
        </div>
      </div>

      {/* Stats Summary Panel */}
      <div className="bg-[#111827] text-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 relative z-10">
          <div className="space-y-1">
             <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Reports Generated</p>
             <p className="text-3xl font-bold">142</p>
          </div>
          <div className="space-y-1">
             <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Avg Attendance</p>
             <p className="text-3xl font-bold text-[#10b981]">92.4%</p>
          </div>
          <div className="space-y-1">
             <p className="text-xs font-bold text-white/50 uppercase tracking-widest">At Risk Count</p>
             <p className="text-3xl font-bold text-[#ef4444]">05</p>
          </div>
        </div>
        <div className="relative z-10 flex gap-4">
           <button className="px-6 py-2.5 bg-blue-600 rounded-xl font-bold text-sm hover:bg-blue-500 transition-all">Bulk Generate</button>
           <button className="p-2.5 bg-white/10 rounded-xl hover:bg-white/20 transition-all"><Share2 size={20} /></button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Reports Grid */}
        <div className="lg:col-span-3">
          <h2 className="text-lg font-bold text-[#111827] mb-6">Available Report Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((report, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between">
                   <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg mb-4"
                    style={{ backgroundColor: report.color }}
                   >
                     {report.icon}
                   </div>
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{report.format} · {report.size}</span>
                </div>
                <h3 className="font-bold text-[#111827] group-hover:text-[#1a56db] transition-colors">{report.title}</h3>
                <p className="text-xs text-[#6b7280] mt-2 leading-relaxed min-h-[32px]">{report.desc}</p>
                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                   <span className={`px-2 py-0.5 rounded text-[10px] font-bold`} style={{ backgroundColor: `${report.color}15`, color: report.color }}>
                     {report.type}
                   </span>
                   <button 
                    className="flex items-center gap-2 text-xs font-bold text-[#1a56db] hover:underline"
                   >
                     Download <Download size={14} />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar Panel */}
        <div className="space-y-8">
           {/* Recent Downloads */}
           <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm overflow-hidden">
             <div className="p-4 border-b border-[#e5e7eb] bg-gray-50/50">
               <h3 className="font-bold text-[#111827] text-sm flex items-center gap-2">
                 <Clock size={16} /> Recent Activity
               </h3>
             </div>
             <div className="divide-y divide-gray-50">
                {recentDownloads.map((dl, i) => (
                  <div key={i} className="p-4 hover:bg-gray-50 transition-colors group cursor-pointer">
                    <p className="text-xs font-bold text-[#374151] group-hover:text-[#1a56db] truncate">{dl.name}</p>
                    <p className="text-[10px] text-[#9ca3af] mt-1">{dl.date} · {dl.user}</p>
                  </div>
                ))}
             </div>
             <div className="p-4 border-t border-gray-50">
                <button className="w-full text-center text-xs font-bold text-[#1a56db] hover:underline">View Download History</button>
             </div>
           </div>

           {/* Quick Stats Sidebar */}
           <div className="bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] p-6 rounded-2xl text-white shadow-xl relative overflow-hidden">
              <h3 className="font-bold text-lg mb-4">Insights</h3>
              <div className="space-y-4 relative z-10">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center"><Users size={16} /></div>
                    <div><p className="text-[10px] opacity-70">Students Tracked</p><p className="font-bold">120 Total</p></div>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center"><BookOpen size={16} /></div>
                    <div><p className="text-[10px] opacity-70">Completed Tests</p><p className="font-bold">42 This Sem</p></div>
                 </div>
              </div>
              <div className="mt-8 relative z-10">
                 <button className="w-full py-2.5 bg-white text-[#7c3aed] rounded-xl font-bold text-xs hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                   View Full Summary <ChevronRight size={14} />
                 </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAttendance;
