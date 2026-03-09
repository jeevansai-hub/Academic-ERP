import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';
import { studentInfo, notifications } from '../../data/studentData';

const Navbar: React.FC = () => {
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
        <span className="font-title text-[22px]" style={{ color: 'var(--text-primary)' }}>
          ECAP
        </span>
        <div className="w-[1px] h-4" style={{ background: 'var(--border-default)' }} />
        <span
          className="text-[11px] font-medium tracking-[2px] uppercase"
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
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
