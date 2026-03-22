import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface StudentLayoutProps {
  activePage: string;
  onNavigate: (page: string) => void;
  children: React.ReactNode;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ activePage, onNavigate, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, activePage]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-page)' }}>
      <Navbar />
      
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-[14px] left-4 z-50 p-1.5 rounded-md lg:hidden"
        style={{ color: mobileOpen ? 'var(--blue)' : 'var(--text-secondary)', background: 'var(--bg-card)' }}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        isMobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <motion.main
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
        className="lg:ml-[240px] mt-[56px] p-4 sm:p-7 lg:p-8"
        style={{ minHeight: 'calc(100vh - 56px)', background: 'var(--bg-page)' }}
      >
        <div className="max-w-[1280px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.main>
    </div>
  );
};

export default StudentLayout;
