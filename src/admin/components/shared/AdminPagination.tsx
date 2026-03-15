import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AdminPagination = ({ total, page, pageSize, onPageChange, onPageSizeChange }) => {
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 border-t border-bd bg-white">
      <div className="text-xs text-t3">
        Showing <span className="font-bold text-t1">{start}-{end}</span> of <span className="font-bold text-t1">{total.toLocaleString()}</span>
      </div>

      <div className="flex items-center gap-1">
        <button 
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="w-9 h-9 rounded-lg border border-bd flex items-center justify-center text-t2 hover:bg-bg disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        
        {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
          const p = i + 1;
          return (
            <button 
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-9 h-9 rounded-lg border flex items-center justify-center text-xs font-bold transition-all ${
                page === p ? 'bg-p border-p text-white shadow-sh-blue' : 'border-bd text-t3 hover:border-t4'
              }`}
            >
              {p}
            </button>
          );
        })}

        <button 
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="w-9 h-9 rounded-lg border border-bd flex items-center justify-center text-t2 hover:bg-bg disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-t4">Per page:</span>
        <select 
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="h-9 px-2 rounded-lg border border-bd bg-white text-xs font-bold text-t2 focus:outline-none focus:border-p transition-colors"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default AdminPagination;
