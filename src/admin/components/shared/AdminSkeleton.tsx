import React from 'react';

const AdminSkeleton = ({ type = 'table', rows = 5, cols = 4 }) => {
  if (type === 'table') {
    return (
      <div className="w-full space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4 p-4 border-b border-bd animate-pulse">
            {Array.from({ length: cols }).map((_, j) => (
              <div key={j} className="h-4 bg-bdl rounded flex-1" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="adm-card h-40 animate-pulse bg-bdl/50" />
        ))}
      </div>
    );
  }

  return null;
};

export default AdminSkeleton;
