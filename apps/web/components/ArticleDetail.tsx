import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { Clock, Eye } from 'lucide-react';
import type { Article } from '@indimba/mock-data';

export function ArticleDetail({ article, accent }: { article: Article; accent: string }) {
  return (
    <article className="max-w-3xl mx-auto px-4 lg:px-6 py-8">
      <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: accent }}>
        {article.category}
      </p>
      <h1 className="font-display text-3xl md:text-5xl tracking-wide text-white mb-4">{article.title}</h1>
      <p className="text-surface-300 text-base mb-6">{article.excerpt}</p>

      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5">
        {article.author.avatarUrl && (
          <Image src={article.author.avatarUrl} alt={article.author.displayName} width={36} height={36} className="rounded-full" />
        )}
        <div>
          <p className="text-white text-sm font-semibold">{article.author.displayName}</p>
          <p className="text-surface-400 text-xs">{formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}</p>
        </div>
        <div className="ml-auto flex items-center gap-4 text-surface-400 text-xs">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {article.readingTime} min read
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> {article.viewCount.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="aspect-video rounded-2xl overflow-hidden mb-8">
        <Image src={article.featuredImage.url} alt={article.featuredImage.alt} width={1200} height={675} className="object-cover w-full h-full" />
      </div>

      <div className="prose prose-invert max-w-none text-surface-200 text-base leading-relaxed space-y-4">
        {article.body.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/5">
          {article.tags.map((tag) => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/5 text-surface-300">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
