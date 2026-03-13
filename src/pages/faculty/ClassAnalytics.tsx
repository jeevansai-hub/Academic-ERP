import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, 
  Legend, PieChart, Pie, Cell, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Users, Award, 
  Target, AlertCircle, Calendar, Filter 
} from 'lucide-react';

const ClassAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('This Semester');

  const stats = [
    { label: 'Class Avg', value: '16.4', sub: '/20.0', trend: '+1.2', up: true },
    { label: 'Highest', value: '20.0', sub: 'Rajesh K.', trend: 'Stable', up: null },
    { label: 'Lowest', value: '08.5', sub: 'Needs Attention', trend: '-2.0', up: false },
    { label: 'Pass Rate', value: '94.2%', sub: '113/120', trend: '+2.1%', up: true },
  ];

  const trendData = [
    { name: 'Week 1', avg: 14.5, students: 118 },
    { name: 'Week 2', avg: 15.2, students: 120 },
    { name: 'Week 3', avg: 14.8, students: 115 },
    { name: 'Week 4', avg: 16.0, students: 119 },
    { name: 'Week 5', avg: 15.7, students: 120 },
    { name: 'Week 6', avg: 16.2, students: 118 },
    { name: 'Week 7', avg: 16.4, students: 120 },
  ];

  const gradeData = [
    { name: 'A (18-20)', value: 45, color: '#10b981' },
    { name: 'B (15-17)', value: 38, color: '#1a56db' },
    { name: 'C (10-14)', value: 25, color: '#f59e0b' },
    { name: 'D (<10)', value: 7, color: '#ef4444' },
    { name: 'Absent', value: 5, color: '#9ca3af' },
  ];

  const radarData = [
    { subject: 'ML', A: 120, B: 110, full: 150 },
    { subject: 'Cloud', A: 98, B: 130, full: 150 },
    { subject: 'Test', A: 86, B: 130, full: 150 },
    { subject: 'OS', A: 99, B: 100, full: 150 },
    { subject: 'DB', A: 85, B: 90, full: 150 },
    { subject: 'Networks', A: 65, B: 85, full: 150 },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Class Analytics</h1>
          <p className="text-sm text-[#6b7280] mt-1">Deep dive into performance trends and distribution</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            className="px-4 py-2 bg-white border border-[#e5e7eb] rounded-lg text-sm font-semibold outline-none focus:ring-2 focus:ring-[#1a56db]"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option>This Week</option>
            <option>This Month</option>
            <option>This Semester</option>
            <option>Previous Year</option>
          </select>
          <button className="p-2 bg-white border border-[#e5e7eb] rounded-lg text-gray-600 hover:bg-gray-50">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-5 rounded-2xl border border-[#e5e7eb] shadow-sm flex flex-col justify-between"
          >
            <p className="text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">{s.label}</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold text-[#111827]">{s.value}</span>
              <span className="text-xs text-[#9ca3af]">{s.sub}</span>
            </div>
            <div className={`mt-3 flex items-center gap-1.5 text-[11px] font-bold ${s.up === true ? 'text-[#10b981]' : s.up === false ? 'text-[#ef4444]' : 'text-gray-400'}`}>
              {s.up === true ? <TrendingUp size={14} /> : s.up === false ? <TrendingDown size={14} /> : null}
              {s.trend}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Primary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-[#111827]">Class Average Trend</h3>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#1a56db]"></div> <span className="text-xs font-bold text-gray-500">CS601</span></div>
                 <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div> <span className="text-xs font-bold text-gray-500">Avg</span></div>
              </div>
           </div>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={trendData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontStyle: 'bold', fill: '#9ca3af' }} />
                 <YAxis domain={[0, 20]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                 <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
                 />
                 <Line type="monotone" dataKey="avg" stroke="#1a56db" strokeWidth={3} dot={{ r: 4, fill: '#1a56db', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Grade Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-sm flex flex-col">
           <h3 className="font-bold text-[#111827] mb-8">Grade Distribution</h3>
           <div className="flex-1 flex flex-col md:flex-row items-center gap-8">
              <div className="w-full h-48 md:h-full relative">
                 <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                     <Pie
                       data={gradeData}
                       cx="50%"
                       cy="50%"
                       innerRadius={60}
                       outerRadius={80}
                       paddingAngle={5}
                       dataKey="value"
                     >
                       {gradeData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                     </Pie>
                     <Tooltip />
                   </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-2xl font-bold text-[#111827]">120</p>
                    <p className="text-[10px] font-bold text-[#9ca3af] uppercase">Students</p>
                 </div>
              </div>
              <div className="space-y-3 w-full max-w-[200px]">
                 {gradeData.map((g, i) => (
                   <div key={i} className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.color }}></div>
                        <span className="text-xs font-semibold text-gray-500">{g.name}</span>
                     </div>
                     <span className="text-xs font-bold text-[#111827]">{g.value}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Comparison Radar */}
        <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-sm lg:col-span-1">
           <h3 className="font-bold text-[#111827] mb-6">Subject Comparison</h3>
           <div className="h-[250px]">
             <ResponsiveContainer width="100%" height="100%">
               <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                 <PolarGrid stroke="#f0f0f0" />
                 <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 700 }} />
                 <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                 <Radar name="Class A" dataKey="A" stroke="#1a56db" fill="#1a56db" fillOpacity={0.4} />
                 <Radar name="Class B" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                 <Tooltip />
               </RadarChart>
             </ResponsiveContainer>
           </div>
           <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2"><div className="w-3 h-1 rounded-full bg-[#1a56db]"></div><span className="text-[11px] font-bold text-gray-500">Section A</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-1 rounded-full bg-[#10b981]"></div><span className="text-[11px] font-bold text-gray-500">Section B</span></div>
           </div>
        </div>

        {/* Weak Areas */}
        <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-sm lg:col-span-2 flex flex-col">
           <h3 className="font-bold text-[#111827] mb-6 flex items-center gap-2">
              <AlertCircle size={20} className="text-[#ef4444]" />
              Areas Needing Attention
           </h3>
           <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <WeakAreaCard 
                title="MA601 Class Average: 11.2" 
                detail="Lowest across all subjects this semester. 8 students have consistent downward trends."
                action="Schedule Revision Pool"
              />
              <WeakAreaCard 
                title="CS603 Lab Attendance" 
                detail="Section B attendance dropped to 68% in Week 6. High risk for internal assessment."
                action="Send Reminder to Section B"
              />
              <WeakAreaCard 
                title="Post-Midterm Fatigue" 
                detail="Class performance in ML dropped 15% after IA-1. Students struggling with Neural Network concepts."
                action="Share Supplementary Content"
              />
           </div>
        </div>
      </div>
    </div>
  );
};

const WeakAreaCard = ({ title, detail, action }: { title: string, detail: string, action: string }) => (
  <div className="p-4 rounded-xl border border-[#fef2f2] bg-[#fef2f2]/50 hover:bg-[#fef2f2] transition-colors flex justify-between items-start gap-4">
    <div className="space-y-1">
      <h4 className="text-sm font-bold text-[#ef4444]">{title}</h4>
      <p className="text-xs text-[#b91c1c]/70 leading-relaxed font-medium">{detail}</p>
    </div>
    <button className="shrink-0 px-3 py-1.5 bg-white border border-[#fee2e2] rounded-lg text-[11px] font-extrabold text-[#ef4444] hover:shadow-sm transition-all shadow-sm active:scale-95">
      {action}
    </button>
  </div>
);

export default ClassAnalytics;
