import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, BarChart2, Activity, CalendarCheck, 
  ClipboardList, TrendingUp, AlertTriangle, MessageSquare, 
  Download, Search, Settings, LogOut, ChevronRight, CalendarDays,
  Star, Trophy, BookOpen
} from 'lucide-react';

import { studentInfo } from '../../data/studentData';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  activePage: string;
  onNavigate?: (page: string) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate, isMobileOpen, onCloseMobile }) => {
  const navigate = useNavigate();

  const handleNavigate = (id: string) => {
    if (onNavigate) onNavigate(id);
    onCloseMobile();

    // Route map
    const routes: Record<string, string> = {
      'dashboard': '/student/dashboard',
      'exams': '/student/exam-hub',
      'marks': '/student/marks',
      'analysis': '/student/analysis',
      'weekly': '/student/weekly',
      'internal': '/student/internal-marks',
      'cgpa': '/student/cgpa',
      'alerts': '/student/backlogs',
      'interaction': '/student/academic-interaction',
      'exam-feedback': '/student/exam-feedback',
      'achievements': '/student/achievements',
      'reports': '/student/reports',
      'settings': '/student/profile',
      'curriculum': '/student/curriculum',
      'profile': '/student/profile'
    };
    
    if (routes[id]) {
      navigate(routes[id]);
    }
  };

  const academicsItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'marks', label: 'Marks Overview', icon: BarChart2 },
    { id: 'internal', label: 'Internal Marks', icon: ClipboardList },
    { id: 'cgpa', label: 'CGPA Progress', icon: TrendingUp, badge: 'New', badgeColor: 'blue' },
    { id: 'alerts', label: 'Backlogs & Alerts', icon: AlertTriangle, badge: '5', badgeColor: 'red' },
    { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
    { id: 'exams', label: 'Exam Hub', icon: CalendarDays, badge: '!', badgeColor: 'red' },
    { id: 'interaction', label: 'Academic Interaction', icon: MessageSquare, badge: '5', badgeColor: 'blue' },
    { id: 'exam-feedback', label: 'Exam Feedback', icon: Star },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
  ];

  const supportItems = [
    { id: 'reports', label: 'Reports & Downloads', icon: Download },
    { id: 'search', label: 'Smart Search', icon: Search },
  ];

  const NavItem = ({ item }: { item: any }) => {
    const isActive = activePage === item.id;
    const Icon = item.icon;

    return (
      <button
        onClick={() => { handleNavigate(item.id); }}
        className={`relative flex items-center gap-3 px-3 mx-2 h-11 rounded-xl transition-all duration-150 group
          ${isActive ? 'bg-[#1A56DB] text-white' : 'text-[#A0AEC0] hover:bg-white/5 hover:text-[#E2E8F0]'}`}
      >
        {isActive && (
          <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-[3px] h-4 bg-[#60A5FA] rounded-r-sm" />
        )}
        <Icon size={18} strokeWidth={1.5} className={`${isActive ? 'text-white' : 'text-white/45 group-hover:text-[#E2E8F0]'}`} />
        <span className="text-[13px] font-medium font-outfit flex-1 text-left">{item.label}</span>
        
        {item.badge && (
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full font-outfit
            ${item.badgeColor === 'red' ? 'bg-[#EF4444] text-white' : 'bg-[#1A56DB] text-white'}`}>
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <>
      {/* Mobile background overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed top-0 left-0 h-screen w-[240px] bg-[#0C2461] border-r border-white/5 shadow-[2px_0_8px_rgba(0,0,0,0.15)] z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Logo Block */}
        <div className="p-5 pb-4">
          <div className="inline-flex items-center gap-2.5 px-2.5 py-1.5 bg-[#1A56DB]/25 border border-[#1A56DB]/45 rounded-lg">
            <div className="w-1.5 h-1.5 bg-[#34D399] rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
            <span className="text-[12px] font-semibold font-outfit uppercase tracking-[0.1em] text-[#93C5FD]">ECAP</span>
          </div>
          <div className="mt-4">
            <h1 className="text-[14px] font-medium font-outfit text-white">Student Portal</h1>
            <p className="text-[11px] text-[#718096] font-outfit mt-0.5">Academic Intelligence</p>
          </div>
        </div>

        {/* Student Identity Block */}
        <button onClick={() => handleNavigate('profile')} className="px-5 py-4 border-b border-white/10 flex items-center gap-3 w-full text-left hover:bg-white/5 transition-colors cursor-pointer group">
          <div className="w-11 h-11 rounded-full bg-[#1A56DB] flex items-center justify-center text-[16px] font-semibold text-white font-outfit relative">
            {studentInfo.initials}
            <div className="absolute right-0 bottom-0 w-3 h-3 bg-[#10B981] border-2 border-[#0C2461] rounded-full group-hover:scale-110 transition-transform"/>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-semibold text-white truncate font-outfit group-hover:text-[#93C5FD] transition-colors">{studentInfo.name}</p>
            <p className="text-[12px] text-[#A0AEC0] font-outfit truncate mt-0.5">Computer Science · Sem {studentInfo.semester}</p>
            <p className="text-[11px] text-[#718096] font-outfit mt-0.5">{studentInfo.rollNo}</p>
          </div>
        </button>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto pt-4 space-y-6 custom-scrollbar">
          <div>
            <p className="px-5 mb-2 text-[10px] font-semibold text-white/30 uppercase tracking-[0.12em] font-outfit">ACADEMICS</p>
            <div className="flex flex-col gap-0.5">
              {academicsItems.map(item => <NavItem key={item.id} item={item} />)}
            </div>
          </div>

          <div>
            <p className="px-5 mb-2 text-[10px] font-semibold text-white/30 uppercase tracking-[0.12em] font-outfit">SUPPORT</p>
            <div className="flex flex-col gap-0.5">
              {supportItems.map(item => <NavItem key={item.id} item={item} />)}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-5 border-t border-white/10 bg-[#0C2461]/50">
          <div className="mb-4">
            <p className="text-[10px] uppercase text-[#718096] font-semibold tracking-wider font-outfit">CURRENT CGPA</p>
            <p className="text-[20px] font-semibold text-white font-mono mt-0.5">8.04</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[11px] font-outfit">
              <span className="text-[#A0AEC0]">Sem 6 · Week 11/18</span>
              <span className="text-[#1A56DB] font-medium">61.1%</span>
            </div>
            <div className="h-1 bg-white/15 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '61.1%' }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="h-full bg-[#1A56DB]"
              />
            </div>
          </div>
          
          <div className="mt-6 flex flex-col gap-1">
            <button className="flex items-center gap-3 px-3 h-10 rounded-xl text-[#A0AEC0] hover:bg-white/5 hover:text-[#E2E8F0] transition-all">
              <Settings size={18} strokeWidth={1.5} />
              <span className="text-[13px] font-medium font-outfit">Settings</span>
            </button>
            <button className="flex items-center gap-3 px-3 h-10 rounded-xl text-[#A0AEC0] hover:bg-[#EF4444]/10 hover:text-[#FC8181] transition-all">
              <LogOut size={18} strokeWidth={1.5} />
              <span className="text-[13px] font-medium font-outfit">Log Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
