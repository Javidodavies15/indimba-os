'use client';
import { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@indimba/ui/Button';

export function UploadTrackButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)} variant="music">
        <Upload className="w-4 h-4 mr-2" /> Upload Track
      </Button>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="w-full max-w-md bg-surface-800 rounded-2xl p-6 border border-white/10" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-lg text-white mb-4">Upload New Track</h3>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500/50 transition-colors">
              <Upload className="w-8 h-8 text-surface-400 mx-auto mb-2" />
              <p className="text-sm text-surface-300">Drop audio file or click to browse</p>
            </div>
            <p className="text-xs text-surface-400 mt-3 text-center">By uploading, you confirm you own the rights to this recording.</p>
          </div>
        </div>
      )}
    </>
  );
}
