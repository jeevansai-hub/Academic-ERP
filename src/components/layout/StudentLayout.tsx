import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Home, FileText, Users, BarChart2 } from 'lucide-react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface StudentLayoutProps {
  activePage: string;
  onNavigate: (page: string) => void;
  children: React.ReactNode;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ activePage, onNavigate, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Bug 1: Close sidebar on activePage change
  React.useEffect(() => {
    if (window.innerWidth < 1025) {
      setMobileOpen(false);
    }
  }, [activePage]);

  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-page)' }}>
      <Navbar onMenuClick={() => setMobileOpen(!mobileOpen)} isMenuOpen={mobileOpen} />
      
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        isMobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <motion.main
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
        className="lg:ml-[240px] mt-[56px] p-3 md:p-5 lg:p-6 pb-[84px] md:pb-6"
        style={{ minHeight: 'calc(100vh - 56px)' }}
      >
        <div className="w-full mx-auto" style={{ overflowX: 'hidden' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-[64px] bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex justify-around items-center z-40 px-2">
        {[
          { icon: Home, label: 'Home', id: 'dashboard' },
          { icon: FileText, label: 'Marks', id: 'marks' },
          { icon: Users, label: 'Students', id: 'students' },
          { icon: BarChart2, label: 'Analytics', id: 'weekly' },
        ].map((tab) => {
          const isActive = activePage === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                onNavigate(tab.id);
                setMobileOpen(false);
              }}
              className="flex flex-col items-center justify-center w-full h-full gap-1 pt-1"
            >
              <tab.icon size={22} style={{ color: isActive ? 'var(--blue)' : 'var(--text-muted)' }} />
              <span className="text-[10px] font-medium" style={{ color: isActive ? 'var(--blue)' : 'var(--text-muted)' }}>{tab.label}</span>
            </button>
          );
        })}
        <button
          onClick={() => setMobileOpen(true)}
          className="flex flex-col items-center justify-center w-full h-full gap-1 pt-1"
        >
          <Menu size={22} style={{ color: 'var(--text-muted)' }} />
          <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>More</span>
        </button>
      </div>
    </div>
  );
};

export default StudentLayout;
