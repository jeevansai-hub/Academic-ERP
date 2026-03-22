import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, X, ChevronDown, User, HelpCircle, LogOut, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { studentInfo, notifications } from '../../data/studentData';

interface NavbarProps {
  onMenuClick?: () => void;
  isMenuOpen?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick, isMenuOpen }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) setSearchValue('');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-7 z-50 transition-all duration-300 border-b
        ${scrolled ? 'bg-white/92 backdrop-blur-md saturate-[180%] border-[#E5E7EB]' : 'bg-white border-transparent'}`}
    >
      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-1.5 min-w-[200px]">
        <span className="text-[12px] font-outfit text-[#9CA3AF]">Student</span>
        <span className="text-[#D1D5DB]">/</span>
        <span className="text-[12px] font-outfit font-medium text-[#6B7280]">Dashboard</span>
      </div>

      {/* Center: Title */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <h1 className="text-[16px] font-semibold font-outfit text-[#111827]">Dashboard</h1>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4 min-w-[200px] justify-end">
        {/* Search */}
        <div className="flex items-center relative">
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 300, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 flex items-center bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg h-9 overflow-hidden pr-3"
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search marks, subjects, remarks..."
                  className="bg-transparent border-none outline-none px-3 w-full text-[13px] font-outfit placeholder-[#9CA3AF]"
                />
                {searchValue && (
                  <button onClick={() => setSearchValue('')}>
                    <X size={14} className="text-[#9CA3AF] hover:text-[#6B7280]" />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          <button 
            onClick={toggleSearch}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-150 relative z-10
              ${isSearchOpen ? 'opacity-0' : 'text-[#6B7280] hover:bg-[#F9FAFB]'}`}
            aria-label="Open search"
          >
            <Search size={20} />
          </button>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(true)}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F9FAFB] transition-colors duration-150 relative"
            aria-label="Notifications, 3 unread"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-[18px] h-[18px] bg-[#EF4444] rounded-full border-2 border-white flex items-center justify-center text-[10px] font-semibold text-white font-outfit animate-in zoom-in duration-300">
              3
            </span>
          </button>
        </div>

        <div className="w-[1px] h-5 bg-[#E5E7EB]" />

        {/* Student Profile */}
        <div className="flex items-center gap-3 relative">
          <div className="text-right hidden sm:block">
            <p className="text-[13px] font-semibold text-[#374151] font-outfit">Aditya</p>
            <p className="text-[11px] text-[#9CA3AF] font-mono">{studentInfo.rollNo}</p>
          </div>
          <button 
            onClick={() => navigate('/student/profile')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#1A56DB] flex items-center justify-center text-[11px] font-semibold text-white font-outfit border-2 border-transparent transition-all group-hover:border-[#1A56DB]/20 relative">
              {studentInfo.initials}
              <div className="absolute right-0 bottom-0 w-2.5 h-2.5 bg-[#10B981] border-2 border-white rounded-full group-hover:scale-110 transition-transform" />
            </div>
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.97 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 top-[48px] w-[200px] bg-white rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.04)] py-1.5 z-[100]"
              >
                <button className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-[#F9FAFB] transition-colors text-left" onClick={() => navigate('/student/profile')}>
                  <User size={16} className="text-[#6B7280]" />
                  <span className="text-[13px] font-medium text-[#111827] font-outfit">View Profile</span>
                </button>
                <button className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-[#F9FAFB] transition-colors text-left">
                  <HelpCircle size={16} className="text-[#6B7280]" />
                  <span className="text-[13px] font-medium text-[#111827] font-outfit">Help & Support</span>
                </button>
                <div className="h-[1px] bg-[#E5E7EB] my-1.5" />
                <button 
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-[#FEF2F2] transition-colors text-left group"
                  onClick={async () => {
                    await logout();
                    navigate('/login');
                  }}
                >
                  <LogOut size={16} className="text-[#EF4444]" />
                  <span className="text-[13px] font-medium text-[#EF4444] font-outfit">Log Out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Notification Drawer */}
      <AnimatePresence>
        {showNotifications && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNotifications(false)}
              className="fixed inset-0 bg-black/20 z-[60]"
            />
            <motion.div
              initial={{ x: 360 }}
              animate={{ x: 0 }}
              exit={{ x: 360 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-[360px] bg-white shadow-[-4px_0_32px_rgba(0,0,0,0.12)] border-l border-[#E5E7EB] z-[70] flex flex-col"
            >
              <div className="px-5 h-16 flex items-center justify-between border-b border-[#E5E7EB]">
                <h2 className="text-[16px] font-semibold text-[#111827] font-outfit">Notifications</h2>
                <div className="flex items-center gap-4">
                  <button className="text-[12px] font-medium text-[#6B7280] hover:text-[#374151] font-outfit">Mark all as read</button>
                  <button onClick={() => setShowNotifications(false)} className="text-[#9CA3AF] hover:text-[#6B7280]">
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="px-5 py-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit bg-[#F9FAFB]/50">Today</div>
                <div className="flex flex-col">
                  {notifications.slice(0, 3).map((n, i) => (
                    <NotificationItem key={i} n={n} />
                  ))}
                </div>
                
                <div className="px-5 py-3 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider font-outfit bg-[#F9FAFB]/50 border-t border-[#E5E7EB]">Earlier</div>
                <div className="flex flex-col">
                  {notifications.slice(3).map((n, i) => (
                    <NotificationItem key={i} n={n} />
                  ))}
                </div>

                {notifications.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-12 text-center">
                    <CheckCircle size={32} className="text-[#D1D5DB] mb-3" />
                    <p className="text-[13px] text-[#6B7280] font-outfit">You're all caught up</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

const NotificationItem = ({ n }: { n: any }) => {
  const stripeColors: Record<string, string> = {
    red: '#EF4444',
    blue: '#1A56DB',
    purple: '#7C3AED',
    green: '#10B981',
    teal: '#0EA5E9',
    amber: '#F59E0B'
  };

  return (
    <div className="group relative flex gap-3 px-5 py-3.5 border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors cursor-pointer bg-[#1A56DB]/[0.02]">
      <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: stripeColors[n.type] || '#1A56DB' }} />
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
        <Bell size={14} className="text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-[#111827] font-outfit leading-snug">{n.text}</p>
        <p className="text-[12px] text-[#6B7280] font-outfit mt-0.5 line-clamp-1">New announcement regarding Semester 6 results</p>
        <span className="text-[11px] text-[#9CA3AF] font-outfit uppercase mt-2 block">{n.time}</span>
      </div>
    </div>
  );
};

export default Navbar;
