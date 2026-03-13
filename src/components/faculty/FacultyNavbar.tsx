import React, { useState } from 'react';
import { 
  Bell, Search, ChevronDown, User, Settings, 
  HelpCircle, LogOut, Menu 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface FacultyNavbarProps {
  onMenuClick: () => void;
}

const FacultyNavbar: React.FC<FacultyNavbarProps> = ({ onMenuClick }) => {
  const { userProfile, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Derive page title from path
  const getPageTitle = () => {
    const path = location.pathname.split('/').pop() || 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 right-0 left-0 lg:left-[240px] h-16 bg-white border-b border-[#e5e7eb] flex items-center justify-between px-6 z-30 shadow-sm">
      {/* Left: Mobile Menu & Breadcrumb */}
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-600">
          <Menu size={24} />
        </button>
        
        <div className="hidden sm:flex items-center gap-2 text-[14px]">
          <span className="text-[#6b7280]">Faculty</span>
          <span className="text-[#e5e7eb]">/</span>
          <span className="font-medium text-[#111827]">{getPageTitle()}</span>
        </div>
      </div>

      {/* Center: Page Title */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
        <h1 className="text-[18px] font-bold text-[#111827]">{getPageTitle()}</h1>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button className="p-2 text-[#6b7280] hover:bg-[#eff6ff] hover:text-[#1a56db] rounded-lg transition-colors">
          <Search size={20} />
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-[#6b7280] hover:bg-[#eff6ff] hover:text-[#1a56db] rounded-lg transition-colors relative"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#ef4444] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
              3
            </span>
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)}></div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#e5e7eb] overflow-hidden z-20"
                >
                  <div className="p-4 border-b border-[#e5e7eb] flex items-center justify-between">
                    <span className="font-bold text-[#111827]">Notifications</span>
                    <button className="text-[12px] text-[#1a56db] font-medium hover:underline">Mark all as read</button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="p-4 border-b border-[#f3f4f6] hover:bg-[#f9fafb] cursor-pointer">
                        <p className="text-[13px] text-[#374151]">Pending marks for <b>CS601 Weekly Test 7</b></p>
                        <p className="text-[11px] text-[#9ca3af] mt-1">2 hours ago</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-[#e5e7eb]">
                    <button className="text-[13px] text-[#1a56db] font-semibold">View all notifications</button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1.5 pr-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#1a56db]/10 flex items-center justify-center text-[#1a56db] font-bold text-xs border border-[#1a56db]/20">
              {userProfile?.name?.split(' ').map(n => n[0]).join('') || 'F'}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-[12px] font-bold text-[#111827] leading-none">{userProfile?.name?.split(' ')[0] || 'Faculty'}</p>
              <p className="text-[10px] text-[#6b7280] mt-0.5">Faculty</p>
            </div>
            <ChevronDown size={14} className="text-[#6b7280]" />
          </button>

          <AnimatePresence>
            {showProfileMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)}></div>
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#e5e7eb] py-2 z-20"
                >
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-[#374151] hover:bg-[#f9fafb]">
                    <User size={18} className="text-[#6b7280]" />
                    <span>View Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-[#374151] hover:bg-[#f9fafb]">
                    <Settings size={18} className="text-[#6b7280]" />
                    <span>Settings</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-[#374151] hover:bg-[#f9fafb]">
                    <HelpCircle size={18} className="text-[#6b7280]" />
                    <span>Help & Support</span>
                  </button>
                  <div className="my-1 border-t border-[#e5e7eb]"></div>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-[#ef4444] hover:bg-[#fef2f2]"
                  >
                    <LogOut size={18} />
                    <span>Log Out</span>
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default FacultyNavbar;
