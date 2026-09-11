import Image from 'next/image';
import { Music } from 'lucide-react';
import { tracksStore } from '@indimba/mock-data';
import { UploadTrackButton } from '@/components/UploadTrackButton';

const ARTIST_SLUG = 'flex-musonda';

export default function StudioMusicPage() {
  const tracks = tracksStore.list((t) => t.artistSlug === ARTIST_SLUG);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-extrabold text-xl text-white">Music Studio</h2>
        <UploadTrackButton />
      </div>

      {tracks.length === 0 ? (
        <div className="bg-surface-800 rounded-xl border border-white/5 p-8 text-center">
          <Music className="w-10 h-10 text-surface-500 mx-auto mb-3" />
          <p className="text-surface-300 text-sm">No tracks yet. Upload your first one to get started.</p>
        </div>
      ) : (
        <div className="bg-surface-800 rounded-xl border border-white/5 divide-y divide-white/5">
          {tracks.map((t) => (
            <div key={t.id} className="flex items-center gap-4 px-4 py-3">
              <Image src={t.coverUrl} alt="" width={40} height={40} className="rounded-md object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate">{t.title}</p>
                <p className="text-surface-400 text-xs">{t.zambiaStreamsTotal.toLocaleString()} total streams</p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                Live
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
