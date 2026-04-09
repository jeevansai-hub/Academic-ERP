import React from 'react';
import { 
  Bell, 
  BarChart2, 
  CreditCard, 
  AlertTriangle, 
  Calendar,
  Clock, 
  ArrowRight,
  LucideIcon
} from 'lucide-react';
import { formatRelativeTime } from '../utils/formatters';

interface AlertCardProps {
  type: string; // 'attendance' | 'marks' | 'fees' | 'disciplinary' | 'announcement';
  title: string;
  message: string;
  createdAt: any;
  isRead: boolean;
  onClick?: () => void;
}

const AlertCard: React.FC<AlertCardProps> = ({ type, title, message, createdAt, isRead, onClick }) => {
  const iconMap: Record<string, LucideIcon> = {
    attendance: Calendar,
    marks: BarChart2,
    fees: CreditCard,
    disciplinary: AlertTriangle,
    announcement: Bell
  };

  const colorMap: Record<string, string> = {
    attendance: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20',
    marks: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
    fees: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20',
    disciplinary: 'text-rose-600 bg-rose-50 dark:bg-rose-900/20',
    announcement: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20'
  };

  const Icon = iconMap[type] || Bell;
  const colors = colorMap[type] || colorMap.announcement;

  return (
    <div 
      onClick={onClick}
      className={`group p-4 rounded-xl border transition-all duration-200 cursor-pointer relative overflow-hidden backdrop-blur-sm shadow-sm hover:shadow-lg
        ${!isRead 
          ? 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700/50 border-l-4 border-l-blue-600' 
          : 'bg-gray-50/50 dark:bg-gray-900/40 border-gray-100 dark:border-gray-800 border-l-4 border-l-transparent'}`}
    >
      <div className="flex gap-4">
        <div className={`p-2.5 rounded-lg flex-shrink-0 h-fit transition-transform group-hover:scale-110 duration-200 ${colors}`}>
          <Icon size={20} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h4 className={`text-sm font-bold truncate pr-6 ${!isRead ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
              {title}
            </h4>
            <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium whitespace-nowrap bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-full">
              <Clock size={10} />
              {formatRelativeTime(createdAt)}
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
            {message}
          </p>
        </div>
        
        <div className="flex items-center text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-all group-hover:translate-x-1 duration-200">
          <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(AlertCard);
