import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const AdminModal = ({ isOpen, onClose, title, icon: Icon, iconBg = 'bg-pl', children, footer }) => {
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
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-t1/40 backdrop-blur-sm animate-[adm-fadeIn_0.25s_ease-out]" 
        onClick={onClose}
      />
      
      <div className="relative bg-c w-full max-w-[480px] rounded-2xl shadow-sh-xl overflow-hidden animate-[adm-scaleIn_0.3s_var(--ease-spring)]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-bd flex items-center gap-4">
          {Icon && (
            <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
              <Icon size={20} />
            </div>
          )}
          <h3 className="text-base font-bold text-t1 flex-1">{title}</h3>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-bg flex items-center justify-center text-t3 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 bg-bg border-t border-bd flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default AdminModal;
