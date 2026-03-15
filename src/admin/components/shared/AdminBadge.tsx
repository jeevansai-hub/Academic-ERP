import React from 'react';

const AdminBadge = ({ label, color = 'blue', dot = true }) => {
  const styles = {
    blue: 'bg-pl text-p border-blue-100',
    green: 'bg-sl text-s border-emerald-100',
    red: 'bg-dl text-d border-red-100',
    orange: 'bg-wl text-w border-amber-100',
    gray: 'bg-bg text-t3 border-bd',
    purple: 'bg-purple-50 text-purple-600 border-purple-100'
  };

  const dots = {
    blue: 'bg-p',
    green: 'bg-s',
    red: 'bg-d',
    orange: 'bg-w',
    gray: 'bg-t4',
    purple: 'bg-purple-600'
  };

  return (
    <span className={`adm-badge border animate-[adm-fadeIn_0.2s_ease-out] ${styles[color] || styles.blue}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dots[color] || dots.blue}`} />}
      {label}
    </span>
  );
};

export default AdminBadge;
