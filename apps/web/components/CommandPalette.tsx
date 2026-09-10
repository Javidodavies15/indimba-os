'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Search, TrendingUp, Clock, Music, Newspaper, Calendar, Users } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

const RESULT_ICONS: Record<string, React.ReactNode> = {
  article: <Newspaper className="w-4 h-4" />,
  track:   <Music className="w-4 h-4" />,
  event:   <Calendar className="w-4 h-4" />,
  artist:  <Users className="w-4 h-4" />,
};

export function CommandPalette({ open, onClose }: { 
  open: boolean; onClose: () => void; 
}) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 200);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const { data: results, isLoading } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery) return null;
      const res = await fetch(`/api/v1/search?q=${encodeURIComponent(debouncedQuery)}`);
      return res.json();
    },
    enabled: debouncedQuery.length > 1,
  });

  const { data: trending } = useQuery({
    queryKey: ['search-trending'],
    queryFn: async () => {
      const res = await fetch('/api/v1/search/trending');
      return res.json();
    },
    enabled: open && !debouncedQuery,
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm
                    flex items-start justify-center pt-[10vh] px-4"
         onClick={onClose}>
      <div className="w-full max-w-xl bg-surface-800 rounded-2xl
                      border border-white/10 shadow-xl overflow-hidden"
           onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-5 py-4 border-b 
                        border-white/5">
          <Search className="w-5 h-5 text-surface-300 flex-shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search articles, artists, events, teams..."
            className="flex-1 bg-transparent text-white placeholder:text-surface-400
                       outline-none text-sm"
          />
          <kbd className="hidden sm:block text-xs text-surface-400 
                          bg-surface-700 px-2 py-1 rounded">ESC</kbd>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {!debouncedQuery && trending?.queries && (
            <div className="p-4">
              <p className="text-xs font-bold text-surface-300 tracking-wider
                            uppercase mb-2 flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3" /> Trending Searches
              </p>
              {trending.queries.map((q: string) => (
                <button key={q} onClick={() => setQuery(q)}
                        className="w-full text-left px-3 py-2 text-sm
                                   text-surface-200 hover:bg-white/5 
                                   rounded-lg transition-colors">
                  {q}
                </button>
              ))}
            </div>
          )}

          {isLoading && (
            <div className="p-8 text-center text-surface-300 text-sm">
              Searching...
            </div>
          )}

          {results?.items?.length === 0 && (
            <div className="p-8 text-center text-surface-300 text-sm">
              No results for &quot;{debouncedQuery}&quot;
            </div>
          )}

          {results?.items?.map((item: any) => (
            <button
              key={item.id}
              onClick={() => {
                router.push(item.url);
                onClose();
              }}
              className="w-full flex items-center gap-3 px-5 py-3
                         hover:bg-white/5 transition-colors text-left
                         border-b border-white/[0.03] last:border-0"
            >
              <span className="text-surface-300">
                {RESULT_ICONS[item.type] || <Search className="w-4 h-4" />}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {item.title}
                </p>
                <p className="text-xs text-surface-300">{item.subtitle}</p>
              </div>
              <span className="text-xs text-surface-400 capitalize">
                {item.type}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
