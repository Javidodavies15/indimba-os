import { ChartsTable } from '@indimba/ui/ChartsTable';
import { getChartEntries } from '@indimba/mock-data';

export const metadata = {
  title: 'Zambia Top 50 Charts',
  description: 'The definitive weekly Zambian music streaming chart.',
};

export default function ChartsPage() {
  const { entries, weekLabel } = getChartEntries(50);

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-6 py-8">
      <div className="mb-8">
        <p className="text-xs font-bold tracking-widest text-purple-400 uppercase mb-2">Indimba Music</p>
        <h1 className="font-display text-4xl lg:text-5xl tracking-wide text-white">ZAMBIA TOP 50</h1>
      </div>
      <ChartsTable entries={entries} weekLabel={weekLabel} />
    </div>
  );
}
