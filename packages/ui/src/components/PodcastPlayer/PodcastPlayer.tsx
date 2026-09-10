'use client';
import { useState, useRef } from 'react';
import { Play, Pause, RotateCcw, RotateCw, Download, Share2 } from 'lucide-react';

interface Episode {
  id: string;
  title: string;
  podcastTitle: string;
  coverUrl: string;
  audioUrl: string;
  duration: number;
  chapters?: { time: number; title: string }[];
  description: string;
}

export function PodcastPlayer({ episode }: { episode: Episode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  const rates = [0.75, 1, 1.25, 1.5, 1.75, 2];

  const skip = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, 
      Math.min(audioRef.current.currentTime + seconds, audioRef.current.duration));
  };

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    return h > 0 
      ? `${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
      : `${m}:${String(sec).padStart(2,'0')}`;
  };

  const progress = audioRef.current?.duration 
    ? (currentTime / audioRef.current.duration) * 100 
    : 0;

  const currentChapter = episode.chapters?.filter(c => c.time <= currentTime).at(-1);

  return (
    <div className="bg-surface-800 rounded-2xl border border-white/5 overflow-hidden shadow-xl">
      <audio
        ref={audioRef}
        src={episode.audioUrl}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className="flex gap-4 p-5 border-b border-white/5">
        <img src={episode.coverUrl} alt={episode.podcastTitle} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-orange-400 tracking-wider uppercase mb-1">{episode.podcastTitle}</p>
          <h3 className="font-extrabold text-white text-sm leading-snug line-clamp-2">{episode.title}</h3>
          {currentChapter && (
            <p className="text-xs text-surface-300 mt-1 flex items-center gap-1">
              <span className="text-orange-400">▶</span>{currentChapter.title}
            </p>
          )}
        </div>
      </div>
      <div className="px-5 pt-5">
        <div className="relative h-1.5 bg-surface-600 rounded-full cursor-pointer group"
             onClick={e => {
               if (!audioRef.current) return;
               const rect = e.currentTarget.getBoundingClientRect();
               audioRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * audioRef.current.duration;
             }}>
          <div className="absolute inset-y-0 left-0 bg-orange-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
          {episode.chapters?.map(chapter => (
            <div key={chapter.time} className="absolute top-1/2 -translate-y-1/2 w-1 h-3 bg-white/40 rounded-full"
                 style={{ left: `${(chapter.time / (audioRef.current?.duration ?? 1)) * 100}%` }}
                 title={chapter.title} />
          ))}
        </div>
        <div className="flex justify-between text-xs text-surface-300 font-mono mt-1.5">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(audioRef.current?.duration ?? episode.duration)}</span>
        </div>
      </div>
      <div className="flex items-center justify-between px-5 py-4">
        <button onClick={() => {
            const next = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
            setPlaybackRate(next);
            if (audioRef.current) audioRef.current.playbackRate = next;
          }}
          className="w-12 h-8 bg-surface-700 rounded-lg text-xs font-bold text-white hover:bg-surface-600 transition-colors">
          {playbackRate}×
        </button>
        <button onClick={() => skip(-15)} className="text-surface-300 hover:text-white transition-colors relative">
          <RotateCcw className="w-6 h-6" />
          <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black mt-1">15</span>
        </button>
        <button onClick={() => {
            if (!audioRef.current) return;
            isPlaying ? audioRef.current.pause() : audioRef.current.play();
          }}
          className="w-14 h-14 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors shadow-lg active:scale-95">
          {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-0.5" />}
        </button>
        <button onClick={() => skip(30)} className="text-surface-300 hover:text-white transition-colors relative">
          <RotateCw className="w-6 h-6" />
          <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black mt-1">30</span>
        </button>
        <a href={episode.audioUrl} download className="text-surface-300 hover:text-white transition-colors">
          <Download className="w-5 h-5" />
        </a>
      </div>
      {episode.chapters && episode.chapters.length > 0 && (
        <div className="border-t border-white/5 max-h-40 overflow-y-auto">
          {episode.chapters.map((chapter, i) => (
            <button key={i} onClick={() => { if (audioRef.current) { audioRef.current.currentTime = chapter.time; audioRef.current.play(); }}}
              className={`w-full flex items-center gap-3 px-5 py-2.5 hover:bg-white/3 transition-colors text-left
                          ${currentChapter?.time === chapter.time ? 'bg-orange-500/10' : ''}`}>
              <span className="text-xs font-mono text-surface-300 w-12 flex-shrink-0">{formatTime(chapter.time)}</span>
              <span className={`text-sm ${currentChapter?.time === chapter.time ? 'text-orange-400 font-bold' : 'text-surface-200'}`}>
                {chapter.title}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
