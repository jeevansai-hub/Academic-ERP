import React, { useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';

const AdminToast: React.FC = () => {
  const { toasts, removeToast } = useAdmin();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle size={18} color="#10b981" />;
      case 'warning': return <AlertTriangle size={18} color="#f59e0b" />;
      case 'error': return <AlertCircle size={18} color="#ef4444" />;
      default: return <Info size={18} color="#2563eb" />;
    }
  };

  return (
    <div style={{
      position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000,
      display: 'flex', flexDirection: 'column', gap: '8px'
    }}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} getIcon={getIcon} />
      ))}
    </div>
  );
};

const ToastItem = ({ toast, onRemove, getIcon }: any) => {
  useEffect(() => {
    const timer = setTimeout(onRemove, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      minWidth: '280px', background: '#fff', border: '1px solid var(--bdl)',
      borderRadius: '12px', padding: '12px 16px', boxShadow: 'var(--sh-lg)',
      display: 'flex', alignItems: 'center', gap: '12px', animation: 'adm-toastIn 300ms var(--ease-spring)',
      position: 'relative', overflow: 'hidden'
    }}>
      <div style={{
        width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {getIcon(toast.type)}
      </div>
      <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--t1)', flex: 1 }}>{toast.message}</div>
      <button 
        onClick={onRemove}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--t4)' }}
      >
        <X size={16} />
      </button>
      {/* Progress Bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, height: '3px', background: 'var(--p)',
        animation: 'adm-progressFill 3500ms linear forwards', width: '0%',
        '--target-width': '100%'
      } as any}></div>
    </div>
  );
};

export default AdminToast;
