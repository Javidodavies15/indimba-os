import Link from 'next/link';
import { Search as SearchIcon } from 'lucide-react';
import { search, trendingQueries } from '@indimba/mock-data';

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = searchParams.q ?? '';
  const results = q ? search(q) : [];

  return (
    <div className="max-w-2xl mx-auto px-4 lg:px-6 py-8">
      <form className="relative mb-8">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search articles, artists, events..."
          className="w-full bg-surface-800 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-white/30"
        />
      </form>

      {!q && (
        <div>
          <p className="text-xs font-bold tracking-widest text-surface-400 uppercase mb-3">Trending</p>
          <div className="flex flex-wrap gap-2">
            {trendingQueries().map((t) => (
              <Link key={t} href={`/search?q=${encodeURIComponent(t)}`} className="text-xs px-3 py-1.5 rounded-full bg-surface-800 border border-white/5 text-surface-300 hover:text-white hover:border-white/20">
                {t}
              </Link>
            ))}
          </div>
        </div>
      )}

      {q && (
        <div>
          <p className="text-surface-400 text-sm mb-4">
            {results.length} result{results.length === 1 ? '' : 's'} for &ldquo;{q}&rdquo;
          </p>
          <div className="bg-surface-800 rounded-2xl border border-white/5 divide-y divide-white/5">
            {results.map((r) => (
              <Link key={r.id} href={r.url} className="flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors">
                <div>
                  <p className="text-white text-sm font-semibold">{r.title}</p>
                  <p className="text-surface-400 text-xs mt-0.5">{r.subtitle}</p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wide text-surface-500">{r.type}</span>
              </Link>
            ))}
            {results.length === 0 && <p className="px-5 py-8 text-center text-surface-400 text-sm">No results found.</p>}
          </div>
        </div>
      )}
    </div>
  );
}
