'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bell } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface NotificationItem {
  id: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
  href?: string;
}

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/v1/notifications')
      .then((res) => (res.ok ? res.json() : { items: [], unreadCount: 0 }))
      .then((data) => {
        if (cancelled) return;
        setItems(data.items ?? []);
        setUnreadCount(data.unreadCount ?? 0);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  function markAllRead() {
    setUnreadCount(0);
    setItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
    fetch('/api/v1/notifications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ markAllRead: true }),
    }).catch(() => {});
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 hover:bg-white/5 rounded-md transition-colors relative"
      >
        <Bell className="w-5 h-5 text-white" />
        {unreadCount > 0 && (
          <span
            className="absolute top-1 right-1 w-4 h-4 bg-indimba-red-500
                           rounded-full text-[10px] font-bold flex items-center
                           justify-center text-white"
          >
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 top-10 w-80 bg-surface-800 rounded-xl
                          border border-white/10 shadow-xl z-50 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
              <p className="font-semibold text-sm text-white">Notifications</p>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-xs text-indimba-red-400 hover:text-indimba-red-300 font-semibold">
                  Mark all read
                </button>
              )}
            </div>
            {items.length === 0 ? (
              <div className="py-8 text-center text-surface-400 text-sm">No new notifications</div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {items.map((n) => (
                  <Link
                    key={n.id}
                    href={n.href ?? '#'}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${
                      n.isRead ? 'opacity-60' : ''
                    }`}
                  >
                    <p className="text-sm font-semibold text-white">{n.title}</p>
                    <p className="text-xs text-surface-300 mt-0.5 line-clamp-2">{n.body}</p>
                    <p className="text-[11px] text-surface-500 mt-1">
                      {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
