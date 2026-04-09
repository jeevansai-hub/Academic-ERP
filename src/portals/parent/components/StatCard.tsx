import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  colorVariant?: 'green' | 'yellow' | 'red' | 'blue' | 'default';
  trend?: { type: 'up' | 'down'; value: string };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon: Icon, colorVariant = 'default', trend }) => {
  const colorMap = {
    green: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    yellow: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    red: 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
    blue: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    default: 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
  };

  const iconColorMap = {
    green: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400',
    yellow: 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400',
    red: 'bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400',
    blue: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400',
    default: 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300'
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl ${iconColorMap[colorVariant]}`}>
          <Icon size={22} />
        </div>
        {trend && (
           <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${trend.type === 'up' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600' : 'bg-rose-50 dark:bg-rose-900/30 text-rose-600'}`}>
             {trend.type === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
             {trend.value}
           </div>
        )}
      </div>
      
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{title}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <h3 className="text-2xl font-bold font-mono text-gray-900 dark:text-white leading-none">{value}</h3>
          <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">{subtitle}</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(StatCard);
