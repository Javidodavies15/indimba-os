import Link from 'next/link';
import { FileText } from 'lucide-react';
import { articlesStore } from '@indimba/mock-data';

export default function StudioArticlesPage() {
  const articles = articlesStore
    .list((a) => a.author.id === 'author_editorial')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div>
      <h2 className="font-extrabold text-xl text-white mb-6">Your Articles</h2>
      {articles.length === 0 ? (
        <div className="bg-surface-800 rounded-xl border border-white/5 p-8 text-center">
          <FileText className="w-10 h-10 text-surface-500 mx-auto mb-3" />
          <p className="text-surface-300 text-sm">No articles yet.</p>
        </div>
      ) : (
        <div className="bg-surface-800 rounded-xl border border-white/5 divide-y divide-white/5">
          {articles.map((a) => (
            <Link key={a.id} href={`/${a.platform}/${a.slug}`} className="flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors">
              <div className="min-w-0">
                <p className="text-white text-sm font-semibold truncate">{a.title}</p>
                <p className="text-surface-400 text-xs mt-0.5">{a.viewCount.toLocaleString()} views</p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 ml-3">
                {a.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
