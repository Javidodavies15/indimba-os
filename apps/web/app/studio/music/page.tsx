'use client';
import { useState } from 'react';
import { Music, Upload } from 'lucide-react';
import { Button } from '@indimba/ui/Button';

export default function StudioMusicPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-extrabold text-xl text-white">Music Studio</h2>
        <Button onClick={() => setShowModal(true)} variant="music">
          <Upload className="w-4 h-4 mr-2" /> Upload Track
        </Button>
      </div>

      <div className="bg-surface-800 rounded-xl border border-white/5 p-8 text-center">
        <Music className="w-10 h-10 text-surface-500 mx-auto mb-3" />
        <p className="text-surface-300 text-sm">No tracks yet. Upload your first one to get started.</p>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
             onClick={() => setShowModal(false)}>
          <div className="w-full max-w-md bg-surface-800 rounded-2xl p-6 border border-white/10"
               onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-lg text-white mb-4">Upload New Track</h3>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500/50 transition-colors">
              <Upload className="w-8 h-8 text-surface-400 mx-auto mb-2" />
              <p className="text-sm text-surface-300">Drop audio file or click to browse</p>
            </div>
            <p className="text-xs text-surface-400 mt-3 text-center">
              By uploading, you confirm you own the rights to this recording.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
