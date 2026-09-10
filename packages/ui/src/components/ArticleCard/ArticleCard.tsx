import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Eye, Clock } from 'lucide-react';

interface ArticleCardProps {
  article: {
    title: string;
    slug: string;
    excerpt: string;
    featuredImage: { url: string; alt: string };
    platform: string;
    category: string;
    author: { displayName: string; avatarUrl?: string };
    publishedAt: Date;
    viewCount: number;
    readingTime: number;
    isBreaking?: boolean;
    isFeatured?: boolean;
  };
  variant?: 'default' | 'featured' | 'compact' | 'horizontal';
  platformAccent?: string;
}

export function ArticleCard({ 
  article, 
  variant = 'default',
  platformAccent = '#C8102E'
}: ArticleCardProps) {

  if (variant === 'featured') {
    return (
      <Link href={`/${article.platform}/${article.slug}`}>
        <article className="relative group rounded-2xl overflow-hidden 
                            aspect-[16/9] cursor-pointer">
          <Image
            src={article.featuredImage.url}
            alt={article.featuredImage.alt}
            fill
            className="object-cover transition-transform duration-500 
                       group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t 
                          from-black/90 via-black/40 to-transparent" />
          {article.isBreaking && (
            <div className="absolute top-4 left-4 flex items-center gap-2
                            bg-red-500 text-white text-xs font-black
                            px-3 py-1.5 rounded-md tracking-widest uppercase
                            animate-pulse">
              <span className="w-2 h-2 bg-white rounded-full" />
              BREAKING
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: platformAccent }}>
              {article.category}
            </span>
            <h2 className="mt-2 text-xl font-extrabold text-white 
                           leading-snug group-hover:text-indimba-gold-300
                           transition-colors line-clamp-2">
              {article.title}
            </h2>
            <div className="mt-3 flex items-center gap-4 text-xs 
                            text-white/60">
              <span>{article.author.displayName}</span>
              <span>·</span>
              <span>{formatDistanceToNow(article.publishedAt)} ago</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readingTime}m read
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={`/${article.platform}/${article.slug}`}>
        <article className="flex gap-3 group cursor-pointer py-3
                            border-b border-white/5 last:border-0">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={article.featuredImage.url}
              alt={article.featuredImage.alt}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold tracking-wider uppercase mb-1"
               style={{ color: platformAccent }}>
              {article.category}
            </p>
            <h3 className="text-sm font-bold text-white leading-snug
                           group-hover:text-indimba-gold-300 transition-colors
                           line-clamp-2">
              {article.title}
            </h3>
            <p className="text-xs text-surface-300 mt-1">
              {formatDistanceToNow(article.publishedAt)} ago
            </p>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link href={`/${article.platform}/${article.slug}`}>
        <article className="flex gap-4 group cursor-pointer bg-surface-800
                            rounded-xl p-4 border border-white/5
                            hover:border-white/10 transition-colors">
          <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={article.featuredImage.url}
              alt={article.featuredImage.alt}
              fill
              className="object-cover transition-transform duration-300
                         group-hover:scale-105"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold tracking-wider uppercase mb-1"
               style={{ color: platformAccent }}>
              {article.category}
            </p>
            <h3 className="text-sm font-extrabold text-white leading-snug
                           group-hover:text-indimba-gold-300 transition-colors
                           line-clamp-2">
              {article.title}
            </h3>
            <p className="text-xs text-surface-200 mt-1.5 line-clamp-1">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-surface-300">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {article.viewCount.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readingTime}m
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Default card
  return (
    <Link href={`/${article.platform}/${article.slug}`}>
      <article className="group cursor-pointer bg-surface-800 rounded-xl
                          overflow-hidden border border-white/5
                          hover:border-white/10 transition-all duration-200
                          hover:-translate-y-0.5 hover:shadow-lg">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={article.featuredImage.url}
            alt={article.featuredImage.alt}
            fill
            className="object-cover transition-transform duration-500
                       group-hover:scale-105"
          />
          {article.isBreaking && (
            <div className="absolute top-3 left-3 bg-red-500 text-white
                            text-xs font-black px-2 py-1 rounded
                            tracking-widest uppercase">
              BREAKING
            </div>
          )}
          {article.isFeatured && !article.isBreaking && (
            <div className="absolute top-3 left-3 bg-indimba-gold-500 text-black
                            text-xs font-black px-2 py-1 rounded
                            tracking-widest uppercase">
              FEATURED
            </div>
          )}
        </div>
        <div className="p-4">
          <p className="text-xs font-bold tracking-wider uppercase mb-2"
             style={{ color: platformAccent }}>
            {article.category}
          </p>
          <h3 className="font-extrabold text-white leading-snug
                         group-hover:text-indimba-gold-300 transition-colors
                         line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-surface-200 mt-2 line-clamp-2 
                        leading-relaxed">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between mt-4 pt-3
                          border-t border-white/5">
            <div className="flex items-center gap-2">
              {article.author.avatarUrl && (
                <Image
                  src={article.author.avatarUrl}
                  alt={article.author.displayName}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              )}
              <span className="text-xs text-surface-300">
                {article.author.displayName}
              </span>
            </div>
            <span className="text-xs text-surface-300">
              {formatDistanceToNow(article.publishedAt)} ago
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
