import Link from 'next/link';
import { Calendar, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Indimba Events — Concerts, Tours & Tickets',
  description: 'Discover events across Zambia. Buy tickets for the Kopala Tour and more.',
};

export default function EventsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <div className="mb-10">
        <p className="text-xs font-bold tracking-widest text-teal-400 uppercase mb-2">Indimba Events</p>
        <h1 className="font-display text-4xl lg:text-5xl tracking-wide text-white">WHAT&apos;S ON</h1>
      </div>

      {/* Kopala Tour CTA */}
      <Link href="/events/kopala-tour"
            className="block mb-12 relative rounded-2xl overflow-hidden aspect-[21/9] group">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 to-purple-900/60" />
        <div className="absolute inset-0 flex items-center p-8 lg:p-12">
          <div>
            <p className="text-xs font-bold tracking-widest text-teal-300 uppercase mb-2">Flagship Event</p>
            <h2 className="font-display text-3xl lg:text-5xl text-white tracking-wide">KOPALA TOUR 2026</h2>
            <p className="text-surface-200 mt-3 max-w-lg">The biggest music event in Zambia. Four cities. One unforgettable experience.</p>
            <div className="mt-4 flex items-center gap-4 text-sm text-surface-300">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Coming 2026</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Lusaka, Kitwe, Ndola, Livingstone</span>
            </div>
          </div>
        </div>
      </Link>

      <div className="bg-surface-800 rounded-2xl border border-white/5 p-8 text-center">
        <p className="text-surface-300">More events coming soon.</p>
      </div>
    </div>
  );
}
