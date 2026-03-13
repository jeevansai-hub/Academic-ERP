import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FacultySidebar from './FacultySidebar';
import FacultyNavbar from './FacultyNavbar';

interface FacultyLayoutProps {
  children: React.ReactNode;
}

const FacultyLayout: React.FC<FacultyLayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Sidebar - Fixed on desktop, overlay on mobile */}
      <FacultySidebar 
        isMobileOpen={mobileMenuOpen} 
        onCloseMobile={() => setMobileMenuOpen(false)} 
      />

      <div className="lg:ml-[240px] pt-16">
        {/* Navbar - Fixed top */}
        <FacultyNavbar onMenuClick={() => setMobileMenuOpen(true)} />

        {/* Page Content */}
        <motion.main
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="p-6 md:p-8"
        >
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </motion.main>
      </div>

      {/* Global Toast Placeholder (if any) */}
    </div>
  );
};

export default FacultyLayout;
