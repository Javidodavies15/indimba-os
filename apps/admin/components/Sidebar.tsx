'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Newspaper,
  Music,
  Trophy,
  Calendar,
  Mic2,
  ShoppingBag,
  Building2,
  ShieldAlert,
  Users,
  BarChart3,
} from 'lucide-react';

const NAV = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/articles', label: 'Articles', icon: Newspaper },
  { href: '/music', label: 'Music', icon: Music },
  { href: '/sports/matches', label: 'Sports', icon: Trophy },
  { href: '/events', label: 'Events', icon: Calendar },
  { href: '/podcasts', label: 'Podcasts', icon: Mic2 },
  { href: '/store', label: 'Store', icon: ShoppingBag },
  { href: '/business', label: 'Business', icon: Building2 },
  { href: '/moderation/comments', label: 'Moderation', icon: ShieldAlert },
  { href: '/users', label: 'Users', icon: Users },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 bg-surface-800 border-r border-white/5 min-h-screen py-6 px-3">
      <div className="flex items-center gap-2 px-3 mb-8">
        <div className="w-8 h-8 bg-indimba-red-500 rounded-lg" />
        <span className="font-display text-lg tracking-wide text-white">INDIMBA ADMIN</span>
      </div>
      <nav className="space-y-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active ? 'bg-indimba-red-500/15 text-white' : 'text-surface-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
