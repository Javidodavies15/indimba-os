import { Calendar, MapPin } from 'lucide-react';
import { chessEventsStore } from '@indimba/mock-data';

export const metadata = {
  title: 'Zambia Chess Community',
  description: 'Chess clubs, tournaments and events across Zambia.',
};

export default function ChessPage() {
  const events = chessEventsStore.list().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-6 py-8">
      <div className="mb-10">
        <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#059669' }}>
          Indimba Community
        </p>
        <h1 className="font-display text-4xl lg:text-5xl tracking-wide text-white">CHESS</h1>
        <p className="text-surface-300 text-sm mt-3 max-w-lg">
          From junior opens to national norm tournaments, here&apos;s what&apos;s happening in Zambia&apos;s growing chess scene.
        </p>
      </div>

      <div className="bg-surface-800 rounded-2xl border border-white/5 divide-y divide-white/5">
        {events.map((e) => (
          <div key={e.id} className="flex items-center justify-between px-5 py-4">
            <div>
              <h3 className="font-bold text-white text-sm">{e.title}</h3>
              <p className="flex items-center gap-1.5 text-surface-400 text-xs mt-1">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(e.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}
                <span className="mx-1">·</span>
                <MapPin className="w-3.5 h-3.5" /> {e.location}
              </p>
              <p className="text-surface-500 text-[11px] mt-1">{e.format}</p>
            </div>
            <span className="text-sm font-bold text-white shrink-0 ml-4">{e.entryFeeZmw === 0 ? 'Free' : `K${e.entryFeeZmw}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
