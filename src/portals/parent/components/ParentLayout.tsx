import React from 'react';

interface ParentLayoutProps {
  children: React.ReactNode;
}

const ParentLayout: React.FC<ParentLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-transparent transition-colors duration-200">
      <main className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default ParentLayout;
