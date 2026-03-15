import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const AdminSlidePanel = ({ isOpen, onClose, title, subtitle, width = '520px', children, footer }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex justify-end">
      <div 
        className="absolute inset-0 bg-t1/30 backdrop-blur-[2px] animate-[adm-fadeIn_0.3s_ease]" 
        onClick={onClose}
      />
      
      <div 
        style={{ width }}
        className="relative bg-white h-full shadow-sh-xl flex flex-col animate-[adm-slideInRight_0.4s_var(--ease-out)]"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-bd flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-t1">{title}</h2>
            {subtitle && <p className="text-xs text-t4 mt-0.5">{subtitle}</p>}
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-bg flex items-center justify-center text-t3 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-bd bg-bg/50 flex justify-end gap-3 sticky bottom-0">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default AdminSlidePanel;
