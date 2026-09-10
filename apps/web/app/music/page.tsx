import { Suspense } from 'react';
import { ChartsTable } from '@indimba/ui/ChartsTable';
import { ArticleCard } from '@indimba/ui/ArticleCard';
import Link from 'next/link';

async function getWeeklyCharts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/music/charts?limit=10`, {
      next: { revalidate: 300 }
    });
    if (!res.ok) return { entries: [], weekLabel: 'This Week' };
    return res.json();
  } catch {
    return { entries: [], weekLabel: 'This Week' };
  }
}

async function getMusicArticles() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/articles?platform=music&limit=6`, {
      next: { revalidate: 120 }
    });
    if (!res.ok) return { articles: [] };
    return res.json();
  } catch {
    return { articles: [] };
  }
}

export const metadata = {
  title: "Indimba Music — Zambia's Charts & Artists",
  description: 'The official Zambia music charts, artist profiles, and new releases.',
};

export default async function MusicHomePage() {
  const [charts, articles] = await Promise.all([
    getWeeklyCharts(),
    getMusicArticles(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <div className="mb-10">
        <p className="text-xs font-bold tracking-widest text-purple-400 uppercase mb-2">Indimba Music</p>
        <h1 className="font-display text-4xl lg:text-5xl tracking-wide text-white">ZAMBIA&apos;S SOUND</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-10">
          <section>
            <h2 className="font-extrabold text-xl text-white mb-4">Latest Music News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.articles?.map((article: any) => (
                <ArticleCard key={article.id} article={article} platformAccent="#7C3AED" />
              ))}
            </div>
          </section>
        </div>

        <aside>
          <ChartsTable entries={charts.entries || []} weekLabel={charts.weekLabel || 'This Week'} />
          <Link href="/music/charts" className="block text-center mt-3 text-sm text-purple-400 hover:text-purple-300 font-semibold">
            View Full Top 50 →
          </Link>
        </aside>
      </div>
    </div>
  );
}
