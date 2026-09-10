'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Search, Bell, Menu, X } from 'lucide-react';
import { LiveScoreWidget } from '@indimba/ui/LiveScoreWidget';
import { CommandPalette } from './CommandPalette';
import { useSession } from '@indimba/auth/context';
import { UserMenu } from './UserMenu';
import { NotificationBell } from './NotificationBell';

const PLATFORMS = [
  { slug: 'entertainment', label: 'Entertainment', color: '#C8102E' },
  { slug: 'sports',        label: 'Sports',         color: '#1D4ED8' },
  { slug: 'music',         label: 'Music',           color: '#7C3AED' },
  { slug: 'events',        label: 'Events',          color: '#0891B2' },
  { slug: 'podcasts',      label: 'Podcasts',        color: '#EA580C' },
  { slug: 'community',     label: 'Community',       color: '#059669' },
  { slug: 'business',      label: 'Business',        color: '#D97706' },
  { slug: 'lifestyle',     label: 'Lifestyle',       color: '#DB2777' },
];

export function TopNav() {
  const pathname = usePathname();
  const { user } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const activePlatform = pathname.split('/')[1];

  return (
    <>
      <header className="sticky top-0 z-40 bg-surface-900/95 backdrop-blur-md
                         border-b border-white/5">
        <div className="flex items-center justify-between h-14 px-4 lg:px-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-indimba-red-500 rounded-lg flex items-center 
                              justify-center font-black text-sm text-white">I</div>
              <span className="font-display text-lg tracking-wider hidden sm:block text-white">
                INDIMBA
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {PLATFORMS.map(p => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="px-3 py-1.5 text-sm font-semibold rounded-md
                             transition-colors"
                  style={{
                    color: activePlatform === p.slug ? p.color : '#9CA3AF',
                    backgroundColor: activePlatform === p.slug 
                      ? `${p.color}1A` : 'transparent',
                  }}
                >
                  {p.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 lg:gap-3">
            <LiveScoreWidget />

            <button onClick={() => setSearchOpen(true)}
                    className="p-2 hover:bg-white/5 rounded-md transition-colors text-white"
                    aria-label="Search">
              <Search className="w-5 h-5" />
            </button>

            {user ? (
              <>
                <NotificationBell />
                <UserMenu user={user} />
              </>
            ) : (
              <Link href="/login"
                    className="hidden sm:flex px-4 py-1.5 bg-indimba-red-500 
                               hover:bg-indimba-red-700 rounded-md text-sm font-semibold
                               transition-colors text-white">
                Sign In
              </Link>
            )}

            <button onClick={() => setMobileOpen(!mobileOpen)}
                    className="lg:hidden p-2 hover:bg-white/5 rounded-md text-white">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden flex items-center gap-1 px-4 pb-2 
                          overflow-x-auto scrollbar-none">
            {PLATFORMS.map(p => (
              <Link
                key={p.slug}
                href={`/${p.slug}`}
                className="px-3 py-1 text-xs font-semibold rounded-full
                           whitespace-nowrap transition-colors flex-shrink-0"
                style={{
                  color: activePlatform === p.slug ? p.color : '#9CA3AF',
                  backgroundColor: activePlatform === p.slug 
                    ? `${p.color}1A` : 'rgba(255,255,255,0.03)',
                }}
              >
                {p.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
