'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface BreakingNewsItem {
  id: string;
  title: string;
  slug: string;
  platform: string;
  publishedAt: Date;
}

export function BreakingNewsTicker() {
  const [items, setItems] = useState<BreakingNewsItem[]>([]);

  useEffect(() => {
    fetch('/api/v1/articles?is_breaking=true&limit=10&status=published')
      .then(r => r.json())
      .then(d => setItems(d.articles));

    const interval = setInterval(() => {
      fetch('/api/v1/articles?is_breaking=true&limit=10&status=published')
        .then(r => r.json())
        .then(d => setItems(d.articles));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="bg-red-600 border-b border-red-700 overflow-hidden
                    flex items-stretch h-9">
      <div className="flex-shrink-0 bg-red-800 flex items-center px-4
                      border-r border-red-700">
        <span className="text-white text-xs font-black tracking-widest
                         uppercase flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          BREAKING
        </span>
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="flex items-center h-full animate-[ticker_30s_linear_infinite]
                        whitespace-nowrap">
          {[...items, ...items].map((item, i) => (
            <Link
              key={`${item.id}-${i}`}
              href={`/${item.platform}/${item.slug}`}
              className="inline-flex items-center gap-6 px-8 
                         hover:text-indimba-gold-300 transition-colors">
              <span className="text-white text-xs font-semibold">
                {item.title}
              </span>
              <span className="text-red-400">◆</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
