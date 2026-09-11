import { NextResponse } from 'next/server';
import { tracksStore } from '@indimba/mock-data';

const ARTIST_SLUG = 'flex-musonda';

export async function GET() {
  const tracks = tracksStore.list((t) => t.artistSlug === ARTIST_SLUG);
  const totalStreams = tracks.reduce((sum, t) => sum + t.zambiaStreamsTotal, 0);
  const weeklyStreams = tracks.reduce((sum, t) => sum + t.zambiaStreamsWeekly, 0);
  const estimatedEarningsZmwCents = Math.round(totalStreams * 0.08 * 100);

  return NextResponse.json({
    totalViews: totalStreams,
    articles: 0,
    tracks: tracks.length,
    weeklyStreams,
    earningsZmwCents: estimatedEarningsZmwCents,
    trackList: tracks,
  });
}
