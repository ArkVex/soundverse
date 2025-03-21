import React from 'react';

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative">
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" 
               style={{ animationDuration: '0.8s' }} />
        </div>
        <div className="w-8 h-8 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"
             style={{ animationDuration: '0.6s' }} />
      </div>
      <div className="mt-8 space-y-2 text-center">
        <h2 className="text-xl font-semibold text-white">Loading artists...</h2>
        <p className="text-sm text-gray-400">Please wait while we tune in</p>
      </div>
    </div>
  );
};
