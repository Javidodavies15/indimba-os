import { ListingCard } from '@indimba/ui/ListingCard';
import { ArticleCard } from '@indimba/ui/ArticleCard';
import { articlesStore, listingsStore } from '@indimba/mock-data';

export const metadata = {
  title: 'Indimba Business',
  description: 'Zambian business news and a directory of local businesses.',
};

const ACCENT = '#D97706';

export default function BusinessPage() {
  const listings = listingsStore.list();
  const articles = articlesStore
    .list((a) => a.status === 'published' && a.platform === 'business')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <div className="mb-10">
        <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: ACCENT }}>
          Indimba Business
        </p>
        <h1 className="font-display text-4xl lg:text-5xl tracking-wide text-white">ZAMBIA AT WORK</h1>
      </div>

      {articles.length > 0 && (
        <section className="mb-12">
          <h2 className="font-extrabold text-xl text-white mb-4">Business News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a) => (
              <ArticleCard key={a.id} article={a} platformAccent={ACCENT} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="font-extrabold text-xl text-white mb-4">Business Directory</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((l) => (
            <ListingCard key={l.id} slug={l.slug} name={l.name} category={l.category} description={l.description} images={l.images} city={l.location.city} isVerified={l.isVerified} tier={l.tier} />
          ))}
        </div>
      </section>
    </div>
  );
}
