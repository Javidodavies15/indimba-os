import Link from 'next/link';
import { Trophy, Calendar } from 'lucide-react';

export const metadata = {
  title: 'Indimba Sports — Live Scores & Fixtures',
  description: 'Zambian football live scores, fixtures, and match reports.',
};

export default function SportsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <div className="mb-10">
        <p className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-2">Indiwabola</p>
        <h1 className="font-display text-4xl lg:text-5xl tracking-wide text-white">FOOTBALL</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link href="/sports/fixtures"
              className="flex items-center gap-4 p-6 bg-surface-800 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white">Fixtures</h3>
            <p className="text-xs text-surface-300">Upcoming matches</p>
          </div>
        </Link>
        <Link href="/sports/standings"
              className="flex items-center gap-4 p-6 bg-surface-800 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white">Standings</h3>
            <p className="text-xs text-surface-300">League tables</p>
          </div>
        </Link>
      </div>

      <div className="bg-surface-800 rounded-2xl border border-white/5 p-8 text-center">
        <p className="text-surface-300">Live match data coming soon.</p>
      </div>
    </div>
  );
}
