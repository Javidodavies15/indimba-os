'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@indimba/auth/context';
import Link from 'next/link';
import { PenTool, Music, Mic, BarChart3 } from 'lucide-react';

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoading } = useSession();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login?redirect=/studio');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indimba-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <h1 className="font-extrabold text-lg text-white mb-6">Creator Studio</h1>
          <nav className="space-y-1">
            <StudioNavLink href="/studio" icon={<BarChart3 className="w-4 h-4" />} label="Overview" />
            <StudioNavLink href="/studio/articles" icon={<PenTool className="w-4 h-4" />} label="Articles" />
            <StudioNavLink href="/studio/music" icon={<Music className="w-4 h-4" />} label="Music" />
            <StudioNavLink href="/studio/podcasts" icon={<Mic className="w-4 h-4" />} label="Podcasts" />
          </nav>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}

function StudioNavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                     text-surface-300 hover:bg-white/5 hover:text-white transition-colors">
      {icon} {label}
    </Link>
  );
}
