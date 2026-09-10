'use client';
import { useState } from 'react';
import { Bell } from 'lucide-react';

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [count] = useState(3); // TODO: Connect to real notifications

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}
              className="p-2 hover:bg-white/5 rounded-md transition-colors relative">
        <Bell className="w-5 h-5 text-white" />
        {count > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-indimba-red-500 
                           rounded-full text-[10px] font-bold flex items-center 
                           justify-center text-white">
            {count}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-10 w-80 bg-surface-800 rounded-xl
                          border border-white/10 shadow-xl z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-white/5">
              <p className="font-semibold text-sm text-white">Notifications</p>
            </div>
            <div className="py-8 text-center text-surface-400 text-sm">
              No new notifications
            </div>
          </div>
        </>
      )}
    </div>
  );
}
