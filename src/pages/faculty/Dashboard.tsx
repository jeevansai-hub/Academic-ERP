import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, BookOpen, CheckCircle, Clock, 
  ArrowUpRight, ArrowDownRight, MoreHorizontal 
} from 'lucide-react';
import { 
  facultyInfo, facultyStats, assignedSubjects, 
  facultyRecentActivity, facultyAlerts, classAverageThisWeek,
  topPerformers, upcomingAssessments
} from '../../data/facultyData';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, ReferenceLine, Cell 
} from 'recharts';

const FacultyDashboard: React.FC = () => {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[16px] bg-gradient-to-br from-[#1a56db] to-[#1e40af] p-8 text-white shadow-lg"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {greeting()}, {facultyInfo.name} 👋
            </h1>
            <p className="mt-2 text-white/80 text-sm md:text-base">
              {facultyInfo.department}  •  Semester 6  •  {facultyStats.subjectsAssigned} Subjects Assigned
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <div className="mt-2 flex flex-wrap justify-end gap-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">{facultyStats.totalStudents} Students</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">{facultyStats.testsConducted} Tests Done</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">{facultyStats.pendingMarks} Pending</span>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>
      </motion.div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1a56db] text-white rounded-[8px] font-semibold text-sm hover:bg-[#1648c8] hover:-translate-y-0.5 transition-all shadow-md active:scale-95">
          <span>+ Upload Marks</span>
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 border border-[#1a56db] text-[#1a56db] rounded-[8px] font-semibold text-sm hover:bg-[#eff6ff] hover:-translate-y-0.5 transition-all active:scale-95">
          <span>+ Post Remark</span>
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 border border-[#1a56db] text-[#1a56db] rounded-[8px] font-semibold text-sm hover:bg-[#eff6ff] hover:-translate-y-0.5 transition-all active:scale-95">
          <span>+ Create Assessment</span>
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 border border-[#e5e7eb] text-[#374151] rounded-[8px] font-semibold text-sm hover:bg-gray-50 hover:-translate-y-0.5 transition-all active:scale-95">
          <span>📊 View Analytics</span>
        </button>
      </div>

      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={<Users size={20} className="text-[#1a56db]" />}
          iconBg="bg-[#eff6ff]"
          label="Total Students"
          value={facultyStats.totalStudents.toString()}
          sub="Across 2 sections"
          trend="+5 from last sem"
          trendUp={true}
          delay={0}
        />
        <StatCard 
          icon={<BookOpen size={20} className="text-[#8b5cf6]" />}
          iconBg="bg-[#f5f3ff]"
          label="Subjects Assigned"
          value={facultyStats.subjectsAssigned.toString()}
          sub="CS601, MA601, CS603"
          delay={0.1}
        />
        <StatCard 
          icon={<CheckCircle size={20} className="text-[#10b981]" />}
          iconBg="bg-[#f0fdf4]"
          label="Tests Conducted"
          value={facultyStats.testsConducted.toString()}
          sub="This semester"
          trend="7 this week"
          trendUp={true}
          delay={0.2}
        />
        <StatCard 
          icon={<Clock size={20} className="text-[#f59e0b]" />}
          iconBg="bg-[#fffbeb]"
          label="Pending Marks"
          value={facultyStats.pendingMarks.toString()}
          sub="Action required"
          danger={facultyStats.pendingMarks > 0}
          delay={0.3}
        />
      </div>

      {/* 3 Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Recent Activity */}
        <div className="bg-white rounded-[12px] border border-[#e5e7eb] shadow-sm flex flex-col h-[450px]">
          <div className="p-5 border-b border-[#e5e7eb] flex items-center justify-between">
            <h2 className="font-bold text-[#111827]">Recent Activity</h2>
            <button className="text-xs font-semibold text-[#1a56db] hover:underline">View All →</button>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
            {facultyRecentActivity.map((activity, i) => (
              <div key={i} className="flex gap-4 group cursor-pointer hover:bg-[#f9fafb] p-2 -m-2 rounded-lg transition-colors">
                <div className="mt-1 relative">
                  <div className="w-2.5 h-2.5 rounded-full z-10 relative" style={{ backgroundColor: activity.color }}></div>
                  {i !== facultyRecentActivity.length - 1 && (
                    <div className="absolute top-2.5 left-1 w-[1px] h-[calc(100%+24px)] bg-gray-200"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#111827]">{activity.text}</p>
                  <p className="text-xs text-[#6b7280] mt-0.5">{activity.detail}</p>
                </div>
                <div className="text-[10px] text-[#9ca3af] whitespace-nowrap">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Class Average */}
        <div className="bg-white rounded-[12px] border border-[#e5e7eb] shadow-sm h-[450px] flex flex-col">
          <div className="p-5 border-b border-[#e5e7eb] flex items-center justify-between">
            <h2 className="font-bold text-[#111827]">Class Average — This Week</h2>
            <div className="flex bg-gray-50 border border-gray-200 p-1 rounded-lg text-[10px] font-bold">
              <button className="px-2 py-1 bg-white shadow-sm rounded-md text-[#1a56db]">Bar Chart</button>
              <button className="px-2 py-1 text-[#6b7280]">Table</button>
            </div>
          </div>
          <div className="flex-1 p-5 min-h-0">
            <ResponsiveContainer width="100%" height="70%">
              <BarChart data={classAverageThisWeek} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280', fontWeight: 600 }} />
                <YAxis domain={[0, 20]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
                <Tooltip 
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <ReferenceLine y={10} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'right', value: 'Threshold', fill: '#ef4444', fontSize: 10 }} />
                <ReferenceLine y={15} stroke="#10b981" strokeDasharray="3 3" label={{ position: 'right', value: 'Goal', fill: '#10b981', fontSize: 10 }} />
                <Bar dataKey="avg" radius={[6, 6, 0, 0]} barSize={40}>
                  {classAverageThisWeek.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.avg >= 15 ? '#10b981' : entry.avg >= 10 ? '#f59e0b' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            
            <div className="mt-4 space-y-3">
              {classAverageThisWeek.map((item, i) => {
                const diff = item.avg - item.lastWeek;
                return (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: assignedSubjects[i]?.color }}></div>
                       <span className="text-xs font-semibold text-[#374151]">{item.subject}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#111827]">{item.avg}</span>
                      <div className={`flex items-center text-[10px] font-bold ${diff >= 0 ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                        {diff >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        {Math.abs(diff).toFixed(1)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Column 3: Alerts Panel */}
        <div className="bg-white rounded-[12px] border border-[#e5e7eb] shadow-sm h-[450px] flex flex-col">
          <div className="p-5 border-b border-[#e5e7eb] flex items-center justify-between">
            <h2 className="font-bold text-[#111827]">Alerts & Notifications</h2>
            <span className="bg-[#ef4444] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">2 New</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {facultyAlerts.map((alert, i) => (
              <div key={i} className={`p-4 rounded-[10px] border relative group transition-all hover:translate-x-1
                ${alert.severity === 'high' ? 'bg-[#fef2f2] border-[#fee2e2]' : alert.severity === 'medium' ? 'bg-[#fffbeb] border-[#fef3c7]' : 'bg-[#f0fdf4] border-[#dcfce7]'}`}>
                <div className="flex justify-between items-start pr-4">
                  <div>
                    <h3 className="text-sm font-bold text-[#111827]">{alert.title}</h3>
                    <p className="text-xs text-[#6b7280] mt-1">{alert.detail}</p>
                    <button className="text-[11px] font-bold text-[#1a56db] mt-2 hover:underline">View Students →</button>
                  </div>
                  <span className="text-[10px] text-[#9ca3af] whitespace-nowrap">{alert.time}</span>
                </div>
                <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-black/5 rounded text-gray-400">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-[#e5e7eb]">
            <button className="w-full text-center text-sm font-bold text-[#1a56db] hover:underline">View All Notifications →</button>
          </div>
        </div>
      </div>

      {/* Bottom Row - Performers & Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white rounded-[12px] border border-[#e5e7eb] shadow-sm flex flex-col overflow-hidden">
          <div className="p-5 border-b border-[#e5e7eb] flex items-center justify-between">
            <h2 className="font-bold text-[#111827] flex items-center gap-2">
              🏆 Top Performers This Week
            </h2>
            <button className="text-xs font-semibold text-[#1a56db] hover:underline">View All →</button>
          </div>
          <div className="divide-y divide-[#f3f4f6]">
            {topPerformers.map((student, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-[#f9fafb] transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-[#9ca3af] w-4">{i + 1}</span>
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-700">
                    {student.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#111827]">{student.name}</p>
                    <p className="text-[11px] text-[#6b7280]">{student.subject}</p>
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-sm font-bold text-[#10b981]">{student.score}/20</p>
                   <p className="text-[10px] text-[#9ca3af]">Consistent</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Assessments */}
        <div className="bg-white rounded-[12px] border border-[#e5e7eb] shadow-sm flex flex-col p-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-[#111827]">Upcoming Assessments</h2>
            <button className="text-xs font-semibold text-[#1a56db] hover:underline">View Calendar →</button>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 custom-scrollbar no-scrollbar">
            {upcomingAssessments.map((test, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -4 }}
                className="min-w-[180px] p-5 rounded-[12px] border border-[#e5e7eb] flex flex-col bg-white shadow-sm hover:shadow-md transition-all"
              >
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full w-fit mb-3" style={{ backgroundColor: `${test.color}15`, color: test.color }}>
                   {test.subject}
                </span>
                <h3 className="text-sm font-bold text-[#111827]">{test.name}</h3>
                <p className="text-[11px] text-[#6b7280] mt-1">{test.date} • {test.section}</p>
                <div className="mt-4 pt-4 border-t border-[#f3f4f6] flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#ef4444]">In {test.daysLeft} days</span>
                  <div className="flex gap-1">
                    <button className="p-1.5 bg-gray-50 rounded hover:bg-gray-100"><MoreHorizontal size={14} /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-auto pt-6 grid grid-cols-2 gap-4">
             <div className="bg-[#eff6ff] p-4 rounded-xl border border-blue-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1a56db] shadow-sm">
                   <Users size={18} />
                </div>
                <div>
                   <p className="text-xs font-semibold text-[#1a56db]">Students High Risk</p>
                   <p className="text-xl font-bold text-[#1a56db]">5</p>
                </div>
             </div>
             <div className="bg-[#f0fdf4] p-4 rounded-xl border border-green-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#10b981] shadow-sm">
                   <ArrowUpRight size={18} />
                </div>
                <div>
                   <p className="text-xs font-semibold text-[#10b981]">Class Improvement</p>
                   <p className="text-xl font-bold text-[#10b981]">12%</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  sub: string;
  trend?: string;
  trendUp?: boolean;
  danger?: boolean;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, iconBg, label, value, sub, trend, trendUp, danger, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    whileHover={{ y: -3 }}
    className={`bg-white p-5 rounded-[12px] border shadow-sm transition-all group
      ${danger ? 'border-[#f59e0b] ring-1 ring-[#f59e0b22]' : 'border-[#e5e7eb] hober:border-blue-200'}`}
  >
    <div className="flex items-center gap-4">
      <div className={`w-11 h-11 ${iconBg} rounded-[10px] flex items-center justify-center transition-transform group-hover:scale-110`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">{label}</p>
        <div className="flex items-baseline gap-2 mt-0.5">
           <h3 className="text-2xl font-bold text-[#111827]">{value}</h3>
           {trend && (
             <span className={`text-[10px] font-bold flex items-center ${trendUp ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                {trendUp ? <ArrowUpRight size={12} strokeWidth={3} /> : <ArrowDownRight size={12} strokeWidth={3} />}
                {trend}
             </span>
           )}
        </div>
        <p className={`text-[11px] mt-0.5 truncate ${danger ? 'text-[#f59e0b] font-bold' : 'text-[#9ca3af]'}`}>{sub}</p>
      </div>
    </div>
  </motion.div>
);

const X = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default FacultyDashboard;
