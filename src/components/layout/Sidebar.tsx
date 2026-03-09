import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, FileText, BarChart2, Calendar,
  ClipboardList, TrendingUp, AlertCircle, MessageSquare,
  Download, Search, Settings, LogOut, X
} from 'lucide-react';
import { studentInfo } from '../../data/studentData';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: 'dashboard' },
  { icon: FileText, label: 'Marks Overview', path: 'marks' },
  { icon: Calendar, label: 'Weekly Test Insights', path: 'weekly' },
  { icon: ClipboardList, label: 'Internal Assessment', path: 'internal' },
  { icon: TrendingUp, label: 'CGPA & Progress', path: 'cgpa' },
  { icon: AlertCircle, label: 'Backlogs & Alerts', path: 'backlogs' },
  { icon: MessageSquare, label: 'Remarks & Feedback', path: 'remarks' },
  { icon: Download, label: 'Reports & Downloads', path: 'reports' },
  { icon: Search, label: 'Smart Search & Filters', path: 'search' },
];

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate, isMobileOpen, onCloseMobile }) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-black z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <motion.aside
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
        className={`fixed top-[56px] left-0 w-[220px] overflow-hidden flex flex-col z-40
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}
        style={{
          height: 'calc(100vh - 56px)',
          background: 'var(--bg-card)',
          borderRight: '1px solid var(--border-default)',
          boxShadow: 'var(--shadow-xs)',
        }}
      >
        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden absolute top-3 right-3 p-1"
          style={{ color: 'var(--text-muted)' }}
        >
          <X size={16} />
        </button>

        {/* Student mini-profile */}
        <div className="p-4 pb-3" style={{ borderBottom: '1px solid var(--border-faint)' }}>
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-semibold text-white flex-shrink-0"
              style={{ background: 'var(--blue)' }}>
              {studentInfo.initials}
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full pulse-dot"
                style={{ background: 'var(--green)', border: '2px solid white' }} />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{studentInfo.name}</p>
              <p className="text-[11px] truncate" style={{ color: 'var(--text-muted)' }}>
                {studentInfo.department.split(' & ')[0]} · Sem {studentInfo.semester}
              </p>
            </div>
          </div>
        </div>

        {/* Nav section */}
        <div className="flex-1 overflow-y-auto py-3 px-2">
          <p className="text-[9px] font-medium tracking-[2px] uppercase px-2 mb-1.5"
            style={{ color: 'var(--text-muted)' }}>
            ACADEMICS
          </p>
          <nav className="flex flex-col gap-0.5">
            {navItems.map(item => {
              const isActive = activePage === item.path;
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => { onNavigate(item.path); onCloseMobile(); }}
                  className="relative flex items-center gap-2.5 px-3 py-[9px] rounded-lg text-left w-full transition-all duration-150"
                  style={{
                    background: isActive ? 'var(--blue-light)' : 'transparent',
                    borderLeft: isActive ? '2px solid var(--blue)' : '2px solid transparent',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'var(--bg-hover)';
                      e.currentTarget.style.transform = 'translateX(2px)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }
                  }}
                  id={`nav-${item.path}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebarActive"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: 'var(--blue-light)',
                        borderLeft: '2px solid var(--blue)',
                        zIndex: 0,
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 38 }}
                    />
                  )}
                  <Icon
                    size={16}
                    strokeWidth={1.5}
                    className="relative z-10 transition-colors duration-150"
                    style={{ color: isActive ? 'var(--blue)' : 'var(--text-muted)' }}
                  />
                  <span
                    className="relative z-10 text-[13px] transition-colors duration-150"
                    style={{
                      color: isActive ? 'var(--blue)' : 'var(--text-secondary)',
                      fontWeight: isActive ? 600 : 500,
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom section */}
        <div className="px-2 pb-3 pt-1" style={{ borderTop: '1px solid var(--border-faint)' }}>
          <button
            onClick={() => { onNavigate('profile'); onCloseMobile(); }}
            className="flex items-center gap-2.5 px-3 py-[9px] rounded-lg w-full transition-all duration-150"
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-hover)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            id="nav-settings"
          >
            <Settings size={16} strokeWidth={1.5} style={{ color: 'var(--text-muted)' }} />
            <span className="text-[13px] font-medium" style={{ color: 'var(--text-secondary)' }}>Settings</span>
          </button>
          <button
            className="flex items-center gap-2.5 px-3 py-[9px] rounded-lg w-full transition-all duration-150"
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--bg-hover)';
              (e.currentTarget.querySelector('svg') as SVGElement).style.color = 'var(--red)';
              (e.currentTarget.querySelector('span') as HTMLSpanElement).style.color = 'var(--red)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              (e.currentTarget.querySelector('svg') as SVGElement).style.color = 'var(--text-muted)';
              (e.currentTarget.querySelector('span') as HTMLSpanElement).style.color = 'var(--text-secondary)';
            }}
            id="nav-logout"
          >
            <LogOut size={16} strokeWidth={1.5} style={{ color: 'var(--text-muted)' }} />
            <span className="text-[13px] font-medium" style={{ color: 'var(--text-secondary)' }}>Log Out</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
