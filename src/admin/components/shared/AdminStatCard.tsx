import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const AdminStatCard = ({ icon: Icon, label, value, sub, trend, trendType, color = 'blue', onClick }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const cardRef = useRef(null);
  
  const colors = {
    blue: { bg: 'bg-pl', text: 'text-p' },
    green: { bg: 'bg-sl', text: 'text-s' },
    red: { bg: 'bg-dl', text: 'text-d' },
    orange: { bg: 'bg-wl', text: 'text-w' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600' }
  };

  const theme = colors[color] || colors.blue;

  // Simple count-up effect
  useEffect(() => {
    const target = parseFloat(value.toString().replace(/[^0-9.]/g, '')) || 0;
    let start = 0;
    const duration = 1200;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setDisplayValue(target);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div 
      ref={cardRef}
      onClick={onClick}
      className={`adm-card flex flex-col gap-4 ${onClick ? 'cursor-pointer active:scale-95' : ''}`}
    >
      <div className="flex justify-between items-start">
        <span className="text-[11px] font-bold text-t4 uppercase tracking-wider">{label}</span>
        <div className={`w-9 h-9 rounded-xl ${theme.bg} ${theme.text} flex items-center justify-center`}>
          <Icon size={18} />
        </div>
      </div>

      <div>
        <h3 className="text-3xl font-bold text-t1 adm-mono">
          {typeof value === 'string' && value.includes('%') ? `${displayValue}%` : displayValue.toLocaleString()}
        </h3>
        <p className="text-xs text-t4 mt-1">{sub}</p>
      </div>

      {trend && (
        <div className={`flex items-center gap-1.5 text-[11px] font-semibold ${
          trendType === 'up' ? 'text-s' : trendType === 'down' ? 'text-d' : 'text-t4'
        }`}>
          {trendType === 'up' ? <TrendingUp size={12} /> : 
           trendType === 'down' ? <TrendingDown size={12} /> : <Minus size={12} />}
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
};

export default AdminStatCard;
