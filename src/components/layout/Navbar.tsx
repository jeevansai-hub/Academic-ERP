import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, User, HelpCircle, LogOut, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { studentInfo, notifications } from '../../data/studentData';

interface NavbarProps {
  onMenuClick?: () => void;
  isMenuOpen?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick, isMenuOpen }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotif(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const dotColor: Record<string, string> = {
    red: 'var(--red)',
    blue: 'var(--blue)',
    purple: 'var(--purple)',
  };

  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 h-[56px] flex items-center justify-between px-6 z-50"
      style={{
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-default)',
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="hidden md:block lg:hidden p-1.5 -ml-2 rounded-md transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-hover)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}
        <span className="font-title text-[22px]" style={{ color: 'var(--text-primary)' }}>
          ECAP
        </span>
        <div className="hidden md:block w-[1px] h-4" style={{ background: 'var(--border-default)' }} />
        <span
          className="hidden md:inline-block text-[11px] font-medium tracking-[2px] uppercase"
          style={{ color: 'var(--text-muted)', fontFamily: "'DM Sans', sans-serif" }}
        >
          Student Performance Portal
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Notification bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
            className="relative p-2 rounded-md transition-colors duration-150"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            id="notification-bell"
          >
            <Bell size={18} strokeWidth={1.5} />
            <span
              className="absolute top-1 right-1 w-2 h-2 rounded-full"
              style={{ background: 'var(--red)' }}
            />
          </button>

          <AnimatePresence>
            {showNotif && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute right-0 top-[48px] w-[320px] rounded-xl overflow-hidden"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-default)',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-default)' }}>
                  <span className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>Notifications</span>
                  <button onClick={() => setShowNotif(false)}>
                    <X size={14} style={{ color: 'var(--text-muted)' }} />
                  </button>
                </div>
                {notifications.map((n, i) => (
                  <div
                    key={i}
                    className="px-4 py-3 flex items-start gap-3 cursor-pointer transition-colors duration-[120ms]"
                    style={{ borderBottom: i < notifications.length - 1 ? '1px solid var(--border-faint)' : 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-hover)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span
                      className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: dotColor[n.type] || 'var(--blue)' }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px]" style={{ color: 'var(--text-primary)' }}>{n.text}</p>
                    </div>
                    <span className="font-mono text-[11px] flex-shrink-0" style={{ color: 'var(--text-muted)' }}>{n.time}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-[1px] h-4" style={{ background: 'var(--border-default)' }} />

        {/* Student info */}
        <div className="text-right hidden sm:block">
          <p className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>{studentInfo.name}</p>
          <p className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>{studentInfo.rollNo}</p>
        </div>

        {/* Avatar */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
            className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[13px] font-semibold text-white transition-all duration-150"
            style={{ background: 'var(--blue)' }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 0 2px var(--blue-subtle)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            id="avatar-button"
          >
            {studentInfo.initials}
            <span
              className="absolute bottom-0 right-0 w-2 h-2 rounded-full"
              style={{ background: 'var(--green)', border: '2px solid white' }}
            />
          </button>

          <AnimatePresence>
            {showProfile && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-black/40 z-[90] md:hidden"
                  onClick={() => setShowProfile(false)}
                />
                <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.97 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="fixed bottom-0 left-0 right-0 w-full md:absolute md:right-0 md:top-[48px] md:bottom-auto md:w-[200px] rounded-t-2xl md:rounded-xl overflow-hidden py-1 z-[100] md:z-auto"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-default)',
                  boxShadow: 'var(--shadow-lg)',
                  backgroundColor: '#ffffff'
                }}
              >
                <>
                  <div className="md:hidden flex flex-col items-center py-5 border-b border-gray-100">
                    <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-[20px] font-semibold text-white mb-2" style={{ background: 'var(--blue)' }}>
                      {studentInfo.initials}
                    </div>
                    <span className="text-[16px] font-bold text-gray-800">{studentInfo.name}</span>
                    <span className="text-[13px] text-gray-500 font-mono mt-1">{studentInfo.rollNo}</span>
                  </div>
                  <div 
                    className="px-5 md:px-4 py-0 h-[52px] md:h-auto md:py-2.5 flex items-center gap-3 md:gap-2.5 cursor-pointer transition-colors duration-[120ms] border-b border-gray-100 md:border-none"
                    onMouseEnter={e => (e.currentTarget.style.background = '#f0f4ff')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    onClick={() => {
                      setShowProfile(false);
                      navigate('/settings');
                    }}
                  >
                    <User size={18} className="md:w-4 md:h-4 text-gray-500" strokeWidth={1.5} />
                    <span className="text-[14px] md:text-[13px]" style={{ color: 'var(--text-primary)' }}>View Profile</span>
                  </div>
                  <div 
                    className="px-5 md:px-4 py-0 h-[52px] md:h-auto md:py-2.5 flex items-center gap-3 md:gap-2.5 cursor-pointer transition-colors duration-[120ms] border-b border-gray-100 md:border-none"
                    onMouseEnter={e => (e.currentTarget.style.background = '#f0f4ff')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    onClick={() => setShowProfile(false)}
                  >
                    <HelpCircle size={18} className="md:w-4 md:h-4 text-gray-500" strokeWidth={1.5} />
                    <span className="text-[14px] md:text-[13px]" style={{ color: 'var(--text-primary)' }}>Help & Support</span>
                  </div>
                  <div className="hidden md:block" style={{ height: '1px', background: 'var(--border-default)', margin: '4px 0' }} />
                  <div 
                    className="px-5 md:px-4 py-0 h-[52px] md:h-auto md:py-2.5 flex items-center gap-3 md:gap-2.5 cursor-pointer transition-colors duration-[120ms]"
                    onMouseEnter={e => (e.currentTarget.style.background = '#fcf0f0')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    onClick={async () => {
                      setShowProfile(false);
                      try {
                        localStorage.clear();
                        sessionStorage.clear();
                        await logout();
                        navigate('/login');
                      } catch (error) {
                        console.error('Logout failed', error);
                        navigate('/login');
                      }
                    }}
                  >
                    <LogOut size={18} className="md:w-4 md:h-4 text-red-500" strokeWidth={1.5} />
                    <span className="text-[14px] md:text-[13px]" style={{ color: 'var(--red)' }}>Log Out</span>
                  </div>
                </>
              </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
