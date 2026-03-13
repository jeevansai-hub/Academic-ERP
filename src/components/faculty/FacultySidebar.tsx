import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, BookOpen, PenTool, Users, BarChart3, 
  Settings, LogOut, X, MessageSquare, AlertTriangle, 
  FileDown, Search, ClipboardCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/faculty/dashboard' },
  { icon: BookOpen, label: 'Subjects & Classes', path: '/faculty/subjects' },
  { icon: PenTool, label: 'Marks Management', path: '/faculty/marks', badge: '5 Pending', badgeColor: '#f59e0b' },
  { icon: Users, label: 'Student Performance', path: '/faculty/performance' },
  { icon: BarChart3, label: 'Class Analytics', path: '/faculty/analytics' },
  { icon: ClipboardCheck, label: 'Assessment Control', path: '/faculty/assessments', badge: '2 Due', badgeColor: '#ef4444' },
  { icon: FileDown, label: 'Reports & Downloads', path: '/faculty/reports' },
];

interface FacultySidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

const FacultySidebar: React.FC<FacultySidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 lg:hidden"
            onClick={onCloseMobile}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: -240 }}
        animate={{ x: 0 }}
        className={`fixed top-0 left-0 w-[240px] h-full bg-white border-r border-[#e5e7eb] flex flex-col z-50 lg:z-40
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 shadow-[2px_0_8px_rgba(0,0,0,0.04)]`}
      >
        {/* Top Section: Avatar & Faculty Info */}
        <div className="p-5 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-[#1a56db] flex items-center justify-center text-white font-bold shrink-0 shadow-sm">
              {userProfile?.name?.split(' ').map(n => n[0]).join('') || 'F'}
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10b981] border-2 border-white rounded-full"></div>
            </div>
            <div className="min-w-0">
              <p className="text-[14px] font-bold text-[#111827] truncate">{userProfile?.name || 'Faculty Member'}</p>
              <p className="text-[12px] text-[#6b7280] truncate">{userProfile?.department || 'Department'}</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto pt-4 px-3 space-y-1 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group
                  ${isActive ? 'bg-[#1a56db] text-white shadow-md' : 'text-[#374151] hover:bg-[#eff6ff] hover:text-[#1a56db]'}`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} className={isActive ? 'text-white' : 'text-[#6b7280] group-hover:text-[#1a56db]'} />
                  <span className="text-[14px] font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold
                    ${isActive ? 'bg-white text-[#1a56db]' : 'text-white'}`}
                    style={{ backgroundColor: isActive ? undefined : item.badgeColor }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-[#e5e7eb] space-y-1">
          <button
            onClick={() => { navigate('/faculty/settings'); onCloseMobile(); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#374151] hover:bg-[#f9fafb] transition-all"
          >
            <Settings size={20} className="text-[#6b7280]" />
            <span className="text-[14px] font-medium">Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#ef4444] hover:bg-[#fef2f2] transition-all"
          >
            <LogOut size={20} />
            <span className="text-[14px] font-medium">Log Out</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default FacultySidebar;
