import React, { useState } from 'react';
import { Bell, LogOut, User as UserIcon, Menu, X } from 'lucide-react';
import { useParentAuth } from '../context/ParentContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ParentNavbarProps {
  onMenuClick?: () => void;
  isMenuOpen?: boolean;
}

const ParentNavbar: React.FC<ParentNavbarProps> = ({ onMenuClick, isMenuOpen }) => {
  const { parentProfile, studentProfile, logout } = useParentAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [unreadCount] = useState(0); 
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    if (!name) return 'P';
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700 flex items-center justify-between px-4 lg:px-10 lg:pl-[270px] z-40 transition-all duration-200">
      <div className="flex items-center gap-4 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        <div className="hidden sm:flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-900 dark:text-white truncate">{parentProfile?.name || 'Welcome'}</span>
            <span className="shrink-0 px-2 py-0.5 text-[9px] font-black bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg uppercase tracking-widest border border-blue-100/50">Parent</span>
          </div>
          {studentProfile && (
            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium truncate">Monitoring: {studentProfile.name}</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        {/* Notifications */}
        <button className="p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-2xl relative transition-all active:scale-90">
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800" />
          )}
        </button>

        <div className="h-8 w-[1px] bg-gray-100 dark:bg-gray-700 hidden xs:block" />

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 group pl-2"
          >
            <div className="hidden md:block text-right">
               <p className="text-[12px] font-bold text-gray-900 dark:text-white leading-none">Account</p>
               <p className="text-[10px] text-gray-500 mt-1 uppercase font-black tracking-tighter opacity-60">Profile Settings</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-[2px]">
               <div className="w-full h-full rounded-[14px] bg-white dark:bg-gray-800 flex items-center justify-center text-xs font-black text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {getInitials(parentProfile?.name)}
               </div>
            </div>
          </button>

          <AnimatePresence>
            {showProfile && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowProfile(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-56 bg-white dark:bg-gray-800 rounded-[20px] shadow-2xl border border-gray-100 dark:border-gray-700 py-2 z-20 overflow-hidden"
                >
                  <div className="px-5 py-4 border-b border-gray-50 dark:border-gray-700 flex flex-col gap-1">
                    <p className="text-[13px] font-bold text-gray-900 dark:text-white truncate">{parentProfile?.name}</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate uppercase tracking-widest font-black opacity-50">{parentProfile?.role || 'Parent Account'}</p>
                  </div>
                  
                  <div className="p-2">
                    <button 
                      onClick={() => { navigate('/parent/profile'); setShowProfile(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <UserIcon size={16} />
                      </div>
                      <span>My Profile</span>
                    </button>
                    
                    <button 
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                        <LogOut size={16} />
                      </div>
                      <span>Log Out</span>
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default ParentNavbar;
