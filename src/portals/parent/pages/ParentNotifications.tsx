import React, { useState, useEffect, useMemo } from 'react';
import { useParentAuth } from '../context/ParentContext';
import { subscribeToParentNotifications, markNotificationAsRead, markAllNotificationsAsRead } from '../utils/parentFirestore';
import ParentSkeletonLoader from '../components/ParentSkeletonLoader';
import AlertCard from '../components/AlertCard';
import { 
  Bell, 
  CheckCheck, 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ParentNotifications: React.FC = () => {
  const { parentProfile, loading: contextLoading } = useParentAuth();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [markingAll, setMarkingAll] = useState(false);

  useEffect(() => {
    if (!parentProfile?.uid) {
      if (!contextLoading) setLoading(false);
      return;
    }

    setLoading(true);
    const unsub = subscribeToParentNotifications(parentProfile.uid, (data) => {
      setNotifications(data);
      setLoading(false);
    });
    return () => unsub();
  }, [parentProfile?.uid, contextLoading]);

  const filteredNotifications = useMemo(() => {
    if (activeFilter === 'All') return notifications;
    return notifications.filter(n => n.type === activeFilter.toLowerCase());
  }, [notifications, activeFilter]);

  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.isRead).length;
  }, [notifications]);

  const handleMarkAll = async () => {
     if (!parentProfile?.uid) return;
     setMarkingAll(true);
     await markAllNotificationsAsRead(parentProfile.uid);
     setMarkingAll(false);
  };

  const containerAnim = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemAnim = {
      hidden: { opacity: 0, y: 16 },
      show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }
  };

  if (loading || contextLoading) return <ParentSkeletonLoader type="page" />;

  return (
    <motion.div 
      initial="hidden" animate="show" variants={containerAnim}
      className="space-y-8 pb-16"
    >
      {/* Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 className="text-[28px] font-fraunces font-light italic text-[#111827] dark:text-white flex items-center gap-3">
            Notifications Center
            {unreadCount > 0 && (
              <span className="px-3 py-1 bg-red-500 text-white text-[10px] font-black rounded-lg uppercase tracking-widest animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.5)]">
                {unreadCount} New
              </span>
            )}
          </h1>
          <p className="mt-1 text-[14px] text-gray-500 dark:text-gray-400 font-outfit">
            Recent activity alerts and academic announcements.
          </p>
        </div>
        
        <button 
          onClick={handleMarkAll}
          disabled={unreadCount === 0 || markingAll}
          className={`flex items-center justify-center gap-2 px-8 h-12 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all w-full md:w-auto
            ${unreadCount > 0 ? 'bg-[#1A56DB] hover:bg-blue-700 text-white shadow-xl shadow-blue-900/20 active:scale-95' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-200 dark:border-gray-700'}`}
        >
          {markingAll ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <CheckCheck size={18} />}
          Mark All Read
        </button>
      </div>

      {/* Filter Bar */}
      <motion.div variants={itemAnim} className="flex flex-wrap gap-2 p-2 bg-gray-50 dark:bg-gray-900 rounded-[1.25rem] border border-gray-100 dark:border-gray-800 shadow-inner w-full md:w-max">
         {['All', 'Attendance', 'Marks', 'Fees', 'Announcement'].map(filter => (
           <button 
             key={filter}
             onClick={() => setActiveFilter(filter)}
             className={`px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap flex-1 md:flex-none
               ${activeFilter === filter ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-200 dark:border-gray-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800'}`}
           >
             {filter}
           </button>
         ))}
      </motion.div>

      {/* Notification List */}
      <motion.div variants={itemAnim} className="grid grid-cols-1 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((n) => (
              <motion.div
                key={n.id}
                layout
                initial={{ opacity: 0, x: -20, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
              >
                <div onClick={() => markNotificationAsRead(n.id)} className="cursor-pointer group relative">
                    <AlertCard 
                        type={n.type}
                        title={n.title}
                        message={n.message}
                        createdAt={n.createdAt}
                        isRead={n.isRead}
                        onClick={() => {}} // Handle at parent level for group hover effects
                    />
                    {!n.isRead && (
                        <div className="absolute top-1/2 -translate-y-1/2 right-6 w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)] group-hover:scale-0 transition-transform" />
                    )}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
               className="py-24 bg-white dark:bg-gray-800 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center gap-6 shadow-sm"
            >
               <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center text-gray-300 dark:text-gray-600 shadow-inner">
                 <Bell size={40} />
               </div>
               <div className="text-center">
                 <h4 className="text-[18px] font-bold text-gray-900 dark:text-white mb-2 font-outfit">Inbox Empty</h4>
                 <p className="text-[14px] text-gray-500 dark:text-gray-400 font-medium">You're completely caught up! No recent alerts or updates found.</p>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default ParentNotifications;
