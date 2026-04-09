import React from 'react';

interface ParentSkeletonLoaderProps {
  type?: 'fullpage' | 'page' | 'card' | 'table' | 'chart';
}

const ParentSkeletonLoader: React.FC<ParentSkeletonLoaderProps> = ({ type = 'page' }) => {
  const pulseClass = "animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg";

  if (type === 'fullpage') {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-900 z-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4 shadow-lg"></div>
        <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">Loading ECAP Parent Portal...</p>
      </div>
    );
  }

  if (type === 'page') {
    return (
      <div className="space-y-8 p-6">
        <div className={`h-12 w-1/3 ${pulseClass}`}></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-32 mb-4 ${pulseClass}`}></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className={`h-80 ${pulseClass}`}></div>
          <div className="space-y-4">
             <div className={`h-10 w-full ${pulseClass}`}></div>
             <div className={`h-10 w-full ${pulseClass}`}></div>
             <div className={`h-10 w-full ${pulseClass}`}></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'card') {
    return <div className={`h-40 ${pulseClass}`}></div>;
  }

  if (type === 'table') {
    return (
      <div className="space-y-4">
        <div className={`h-10 w-full ${pulseClass}`}></div>
        {[1, 2, 3, 4, 5].map((i) => (
           <div key={i} className="flex space-x-4">
              <div className={`h-8 flex-1 ${pulseClass}`}></div>
              <div className={`h-8 flex-1 ${pulseClass}`}></div>
              <div className={`h-8 flex-1 ${pulseClass}`}></div>
           </div>
        ))}
      </div>
    );
  }

  if (type === 'chart') {
    return (
      <div className="space-y-6">
        <div className={`h-64 w-full ${pulseClass}`}></div>
        <div className="flex justify-center space-x-8">
           <div className={`h-4 w-20 ${pulseClass}`}></div>
           <div className={`h-4 w-20 ${pulseClass}`}></div>
        </div>
      </div>
    );
  }

  return <div className={`h-10 ${pulseClass}`}></div>;
};

export default ParentSkeletonLoader;
