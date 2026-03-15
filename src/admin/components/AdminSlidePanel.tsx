import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface AdminSlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  width?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const AdminSlidePanel: React.FC<AdminSlidePanelProps> = ({ 
  isOpen, onClose, title, subtitle, width = '520px', children, footer 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', 
          backdropFilter: 'blur(4px)', zIndex: 1000, animation: 'adm-fadeIn 200ms ease'
        }}
        onClick={onClose}
      />
      
      {/* Panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, height: '100vh', width, 
        background: '#fff', zIndex: 1001, boxShadow: 'var(--sh-xl)',
        display: 'flex', flexDirection: 'column', animation: 'adm-slideInRight 300ms var(--ease-out)'
      }}>
        {/* Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid var(--bdl)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--t1)' }}>{title}</h2>
            {subtitle && <p style={{ fontSize: '12px', color: 'var(--t4)', marginTop: '2px' }}>{subtitle}</p>}
          </div>
          <button 
            onClick={onClose}
            style={{ 
              width: '32px', height: '32px', borderRadius: '50%', border: 'none', 
              background: 'var(--bg)', cursor: 'pointer', display: 'flex', 
              alignItems: 'center', justifyContent: 'center', color: 'var(--t3)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div style={{ padding: '16px 24px', borderTop: '1px solid var(--bdl)', background: 'var(--bg)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            {footer}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminSlidePanel;
