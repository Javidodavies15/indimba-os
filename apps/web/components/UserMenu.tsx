'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useSession } from '@indimba/auth/context';
import { LogOut, User, Settings, BarChart3, PenTool } from 'lucide-react';

export function UserMenu({ user }: { user: any }) {
  const [open, setOpen] = useState(false);
  const { logout } = useSession();

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}
              className="w-8 h-8 rounded-full bg-surface-700 hover:bg-surface-600
                         flex items-center justify-center transition-colors">
        <span className="text-xs font-bold text-white">
          {user.displayName?.charAt(0) || 'U'}
        </span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-10 w-56 bg-surface-800 rounded-xl
                          border border-white/10 shadow-xl z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-white/5">
              <p className="font-semibold text-sm text-white truncate">{user.displayName}</p>
              <p className="text-xs text-surface-400 truncate">{user.email || user.phone}</p>
            </div>
            <div className="py-1">
              <MenuLink href="/account" icon={<User className="w-4 h-4" />} label="Profile" />
              <MenuLink href="/studio" icon={<PenTool className="w-4 h-4" />} label="Studio" />
              <MenuLink href="/account/subscriptions" icon={<BarChart3 className="w-4 h-4" />} label="Subscriptions" />
              <MenuLink href="/account/settings" icon={<Settings className="w-4 h-4" />} label="Settings" />
            </div>
            <div className="border-t border-white/5 py-1">
              <button onClick={() => logout()}
                      className="w-full flex items-center gap-3 px-4 py-2
                                 text-sm text-red-400 hover:bg-white/5 transition-colors">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function MenuLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href}
          className="flex items-center gap-3 px-4 py-2 text-sm text-surface-200
                     hover:bg-white/5 hover:text-white transition-colors">
      {icon} {label}
    </Link>
  );
}
