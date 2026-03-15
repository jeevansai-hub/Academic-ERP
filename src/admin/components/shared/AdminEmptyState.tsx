import React from 'react';

const AdminEmptyState = ({ icon: Icon, title, message, actionLabel, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-[adm-fadeUp_0.4s_ease-out]">
      <div className="w-20 h-20 rounded-3xl bg-pl text-p flex items-center justify-center mb-6">
        {Icon ? <Icon size={40} /> : <div className="text-4xl">🔍</div>}
      </div>
      
      <h3 className="text-lg font-bold text-t1 mb-2">{title}</h3>
      <p className="text-sm text-t4 max-w-[320px] mb-8">{message}</p>
      
      {actionLabel && onAction && (
        <button 
          onClick={onAction}
          className="adm-btn adm-btn-primary"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default AdminEmptyState;
