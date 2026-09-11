import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArticleCard } from '@indimba/ui/ArticleCard';
import { articlesStore, celebritiesStore } from '@indimba/mock-data';

export function generateMetadata({ params }: { params: { slug: string } }) {
  const celebrity = celebritiesStore.get(params.slug, 'slug');
  if (!celebrity) return {};
  return { title: celebrity.name, description: celebrity.bio };
}

export default function CelebrityPage({ params }: { params: { slug: string } }) {
  const celebrity = celebritiesStore.get(params.slug, 'slug');
  if (!celebrity) notFound();

  const relatedArticles = celebrity.relatedArticleIds
    .map((id) => articlesStore.get(id))
    .filter((a): a is NonNullable<typeof a> => !!a);

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-8">
      <div className="flex items-center gap-5 mb-8">
        <Image src={celebrity.avatarUrl} alt={celebrity.name} width={96} height={96} className="rounded-full" />
        <div>
          <p className="text-xs font-bold tracking-widest text-indimba-red-400 uppercase mb-1">{celebrity.profession}</p>
          <h1 className="font-display text-3xl md:text-4xl tracking-wide text-white">{celebrity.name}</h1>
        </div>
      </div>

      <p className="text-surface-300 text-sm max-w-2xl mb-10">{celebrity.bio}</p>

      {relatedArticles.length > 0 && (
        <section>
          <h2 className="font-extrabold text-xl text-white mb-4">Related Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map((a) => (
              <ArticleCard key={a.id} article={a} platformAccent="#C8102E" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
