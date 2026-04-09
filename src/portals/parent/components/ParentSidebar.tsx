import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, BarChart2, CalendarCheck, 
  CreditCard, Bell, Users, User, LogOut, ChevronRight,
  ClipboardList, TrendingUp, AlertTriangle, MessageSquare,
  BookOpen, Calendar as CalendarIcon, FileText, ChevronDown,
  GraduationCap, X
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParentAuth } from '../context/ParentContext';

interface ParentSidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

const ParentSidebar: React.FC<ParentSidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    parentProfile, 
    studentProfile, 
    linkedStudents, 
    activeStudentUID, 
    setActiveStudentUID, 
    logout,
    loading: contextLoading
  } = useParentAuth();
  
  const [showStudentSwitcher, setShowStudentSwitcher] = useState(false);

  // Derive the active student's name more reliably
  const activeStudentName = useMemo(() => {
    if (studentProfile?.name) return studentProfile.name;
    const fromLinked = linkedStudents.find(s => s.uid === activeStudentUID);
    return fromLinked?.name || (contextLoading ? 'Loading...' : 'Select Child');
  }, [studentProfile, linkedStudents, activeStudentUID, contextLoading]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/parent/dashboard', group: 'OVERVIEW' },
    { id: 'performance', label: 'Marks Overview', icon: BarChart2, path: '/parent/performance', group: 'ACADEMICS' },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck, path: '/parent/attendance', group: 'ACADEMICS' },
    { id: 'timetable', label: 'Class Schedule', icon: CalendarIcon, path: '/parent/timetable', group: 'ACADEMICS' },
    { id: 'exams', label: 'Exam Hub', icon: FileText, path: '/parent/exam-hub', group: 'ACADEMICS' },
    { id: 'curriculum', label: 'Curriculum', icon: BookOpen, path: '/parent/curriculum', group: 'ACADEMICS' },
    { id: 'fees', label: 'Fees & Payments', icon: CreditCard, path: '/parent/fees', group: 'ADMIN' },
    { id: 'notifications', label: 'Notifications', icon: Bell, path: '/parent/notifications', group: 'ADMIN' },
    { id: 'meeting-request', label: 'Meeting Request', icon: MessageSquare, path: '/parent/meeting-request', group: 'CONNECT' },
    { id: 'profile', label: 'My Profile', icon: User, path: '/parent/profile', group: 'CONNECT' },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    onCloseMobile();
  };

  const NavItem = ({ item }: { item: any }) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;

    return (
      <button
        onClick={() => handleNavigate(item.path)}
        className={`relative flex items-center gap-3 px-3 mx-2 h-10 rounded-xl transition-all duration-150 group
          ${isActive ? 'bg-[#1A56DB] text-white shadow-lg shadow-blue-900/20' : 'text-[#A0AEC0] hover:bg-white/5 hover:text-[#E2E8F0]'}`}
      >
        {isActive && (
          <motion.div 
            layoutId="activeSideNav"
            className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-[3px] h-4 bg-[#60A5FA] rounded-r-sm" 
          />
        )}
        <Icon size={18} strokeWidth={1.5} className={`${isActive ? 'text-white' : 'text-white/45 group-hover:text-[#E2E8F0]'}`} />
        <span className="text-[13px] font-medium font-outfit flex-1 text-left">{item.label}</span>
      </button>
    );
  };

  const groups = ['OVERVIEW', 'ACADEMICS', 'ADMIN', 'CONNECT'];

  return (
    <>
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/50 z-[60] lg:hidden backdrop-blur-md"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed top-0 left-0 h-screen w-[240px] bg-[#0C2461] border-r border-white/5 shadow-[2px_0_12px_rgba(0,0,0,0.2)] z-[100] flex flex-col transition-transform duration-300 lg:translate-x-0 
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Logo Block & Mobile Close Button */}
        <div className="p-6 pb-4 flex justify-between items-start">
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2.5 px-2.5 py-1.5 bg-[#1A56DB]/25 border border-[#1A56DB]/45 rounded-lg w-fit">
              <div className="w-1.5 h-1.5 bg-[#34D399] rounded-full animate-pulse" />
              <span className="text-[12px] font-semibold font-outfit uppercase tracking-[0.1em] text-[#93C5FD]">ECAP</span>
            </div>
            <div>
              <h1 className="text-[15px] font-bold font-outfit text-white tracking-wide">Parent Portal</h1>
              <p className="text-[11px] text-[#718096] font-outfit mt-0.5 opacity-80">Monitoring Excellence</p>
            </div>
          </div>
          
          <button 
            onClick={onCloseMobile}
            className="lg:hidden p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-xl transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Child Switcher / Identity Block */}
        <div className="px-3 mb-4 mt-2">
          <div className="relative">
            <button 
              onClick={() => linkedStudents.length > 1 && setShowStudentSwitcher(!showStudentSwitcher)}
              className="w-full px-3 py-3 border border-white/10 flex items-center gap-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-left group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1A56DB] to-[#1E40AF] flex items-center justify-center text-[15px] font-semibold text-white font-outfit relative shadow-inner">
                {activeStudentName[0] || 'S'}
                <div className="absolute right-0 bottom-0 w-3 h-3 bg-[#10B981] border-2 border-[#0C2461] rounded-full"/>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-bold text-white truncate font-outfit">{activeStudentName}</p>
                <p className="text-[10px] text-[#A0AEC0] font-outfit truncate mt-0.5">Roll: {studentProfile?.rollNo || '...'}</p>
              </div>
              {linkedStudents.length > 1 && (
                <ChevronDown size={16} className={`text-white/40 transition-transform ${showStudentSwitcher ? 'rotate-180' : ''}`} />
              )}
            </button>

            {/* Switcher Dropdown */}
            <AnimatePresence>
              {showStudentSwitcher && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-[#1A2E6E] border border-white/10 rounded-xl shadow-2xl z-[60] overflow-hidden origin-top"
                >
                  <p className="px-4 py-2 text-[10px] font-bold text-white/30 uppercase tracking-widest border-b border-white/5">SWITCH STUDENT</p>
                  {linkedStudents.map((student) => (
                    <button
                      key={student.uid}
                      onClick={() => {
                        setActiveStudentUID(student.uid);
                        setShowStudentSwitcher(false);
                      }}
                      className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-all
                        ${activeStudentUID === student.uid ? 'bg-white/5' : ''}`}
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[12px] font-bold">
                        {student.name?.[0]}
                      </div>
                      <div className="text-left">
                        <p className={`text-[12px] font-medium ${activeStudentUID === student.uid ? 'text-white' : 'text-white/60'}`}>{student.name}</p>
                        <p className="text-[10px] text-white/30">{student.rollNo}</p>
                      </div>
                      {activeStudentUID === student.uid && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto pt-2 pb-6 space-y-6 custom-scrollbar">
          {groups.map(group => (
            <div key={group}>
              <p className="px-5 mb-2 text-[10px] font-bold text-white/20 uppercase tracking-[0.15em] font-outfit">{group}</p>
              <div className="flex flex-col gap-0.5">
                {menuItems.filter(item => item.group === group).map(item => (
                  <NavItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="p-5 border-t border-white/10 bg-[#0C2461]/50 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4 px-1">
             <div>
                <p className="text-[10px] uppercase text-[#718096] font-bold tracking-wider font-outfit">Performance</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <p className="text-[18px] font-bold text-white font-mono">{studentProfile?.cgpa || studentProfile?.cgpaEstimate || "—"}</p>
                  <span className="text-[10px] text-emerald-400 font-bold">CGPA</span>
                </div>
             </div>
             <div className="w-10 h-10 rounded-full border-2 border-white/5 flex items-center justify-center">
                <GraduationCap size={20} className="text-white/40" />
             </div>
          </div>
          
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 h-11 rounded-xl text-[#A0AEC0] hover:bg-[#EF4444]/10 hover:text-[#FC8181] transition-all bg-white/5 active:scale-[0.98]"
          >
            <LogOut size={18} strokeWidth={1.5} />
            <span className="text-[13px] font-medium font-outfit">Secure Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default ParentSidebar;
