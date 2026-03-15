import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const AdminToast = () => {
  const { toasts } = useAdmin();

  if (!Array.isArray(toasts) || toasts.length === 0) return null;

  return (
    <div className="adm-toast-container fixed bottom-6 right-6 z-[1000] flex flex-col gap-3">
      {toasts.map(toast => (
        <div 
          key={toast.id}
          className="adm-toast bg-white border border-bd rounded-xl shadow-sh-xl p-4 flex items-center gap-3 min-w-[320px] animate-[adm-toastIn_0.3s_var(--ease-spring)]"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            toast.type === 'success' ? 'bg-sl text-s' : 
            toast.type === 'error' ? 'bg-dl text-d' : 'bg-pl text-p'
          }`}>
            {toast.type === 'success' ? <CheckCircle size={18} /> : 
             toast.type === 'error' ? <AlertCircle size={18} /> : <Info size={18} />}
          </div>
          <p className="text-sm font-medium text-t1 flex-1">{toast.message}</p>
          <div className="adm-toast-progress absolute bottom-0 left-0 h-1 bg-p/20 w-full overflow-hidden">
            <div className="h-full bg-p animate-[adm-progressFill_3.5s_linear]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminToast;
