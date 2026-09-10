'use client';
import { Play, Pause, Volume2, ExternalLink, SkipBack, SkipForward } from 'lucide-react';
import { useState, useRef } from 'react';

type PlayerSource = 'indimba' | 'spotify' | 'youtube' | 'metadata_only';

interface Track {
  id: string;
  title: string;
  artistName: string;
  coverUrl: string;
  duration: number;
  source: PlayerSource;
  indimbaAudioUrl?: string;
  spotifyId?: string;
  youtubeId?: string;
  streamingLinks: {
    spotify?: string;
    youtube?: string;
    boomplay?: string;
    apple?: string;
  };
}

export function SmartPlayer({ track }: { track: Track }) {
  if (track.source === 'indimba' && track.indimbaAudioUrl) {
    return <IndimbaNativePlayer track={track} />;
  }

  if (track.source === 'spotify' && track.spotifyId) {
    return (
      <div className="rounded-xl overflow-hidden">
        <iframe
          src={`https://open.spotify.com/embed/track/${track.spotifyId}?utm_source=generator&theme=0`}
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-xl"
        />
      </div>
    );
  }

  if (track.source === 'youtube' && track.youtubeId) {
    return (
      <div className="relative aspect-video rounded-xl overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${track.youtubeId}?modestbranding=1&rel=0`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="bg-surface-800 rounded-xl p-5 border border-white/5">
      <div className="flex items-center gap-4 mb-4">
        <img src={track.coverUrl} alt={track.title} className="w-16 h-16 rounded-lg object-cover" />
        <div>
          <p className="font-bold text-white">{track.title}</p>
          <p className="text-sm text-surface-300">{track.artistName}</p>
        </div>
      </div>
      <p className="text-sm text-surface-300 mb-4">Stream this track on your preferred platform:</p>
      <div className="flex flex-wrap gap-2">
        {track.streamingLinks.spotify && (
          <StreamingLink href={track.streamingLinks.spotify} platform="Spotify" color="#1DB954" />
        )}
        {track.streamingLinks.boomplay && (
          <StreamingLink href={track.streamingLinks.boomplay} platform="Boomplay" color="#FF6B35" />
        )}
        {track.streamingLinks.apple && (
          <StreamingLink href={track.streamingLinks.apple} platform="Apple Music" color="#FC3C44" />
        )}
        {track.streamingLinks.youtube && (
          <StreamingLink href={track.streamingLinks.youtube} platform="YouTube" color="#FF0000" />
        )}
      </div>
    </div>
  );
}

const StreamingLink = ({ href, platform, color }: { href: string; platform: string; color: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer"
     className="flex items-center gap-2 px-4 py-2 rounded-lg
                border border-white/10 hover:border-white/20
                text-sm font-semibold transition-colors"
     style={{ color }}>
    <ExternalLink className="w-3.5 h-3.5" />
    {platform}
  </a>
);

const IndimbaNativePlayer = ({ track }: { track: Track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const formatTime = (s: number) => 
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  return (
    <div className="bg-surface-800 rounded-xl p-5 border border-white/5 shadow-lg">
      <audio
        ref={audioRef}
        src={track.indimbaAudioUrl}
        onTimeUpdate={() => {
          if (!audioRef.current) return;
          const pct = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(pct);
          setCurrentTime(audioRef.current.currentTime);
        }}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="flex items-center gap-4 mb-5">
        <div className="relative">
          <img src={track.coverUrl} alt={track.title}
               className={`w-16 h-16 rounded-lg object-cover transition-transform
                           ${isPlaying ? 'animate-[spin_8s_linear_infinite]' : ''}`}
               style={{ borderRadius: isPlaying ? '50%' : '8px', transition: 'border-radius 0.5s' }} />
          {isPlaying && (
            <div className="absolute inset-0 rounded-full border-2 
                            border-indimba-gold-500/30 animate-ping" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-extrabold text-white truncate">{track.title}</p>
          <p className="text-sm text-surface-300">{track.artistName}</p>
          <p className="text-xs text-purple-400 font-semibold mt-1">♦ Indimba Music</p>
        </div>
      </div>
      <div className="mb-3">
        <div className="relative h-1.5 bg-surface-600 rounded-full cursor-pointer group"
             onClick={e => {
               if (!audioRef.current) return;
               const rect = e.currentTarget.getBoundingClientRect();
               const pct = (e.clientX - rect.left) / rect.width;
               audioRef.current.currentTime = pct * audioRef.current.duration;
             }}>
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r
                          from-indimba-red-500 to-indimba-gold-500 rounded-full transition-all"
               style={{ width: `${progress}%` }} />
          <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3
                          bg-white rounded-full shadow-md opacity-0
                          group-hover:opacity-100 transition-opacity"
               style={{ left: `calc(${progress}% - 6px)` }} />
        </div>
        <div className="flex justify-between mt-1.5 text-xs text-surface-300 font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(track.duration)}</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-6">
        <button className="text-surface-300 hover:text-white transition-colors">
          <SkipBack className="w-5 h-5" />
        </button>
        <button onClick={togglePlay}
                className="w-12 h-12 bg-indimba-red-500 hover:bg-indimba-red-700 rounded-full
                           flex items-center justify-center transition-colors
                           shadow-[0_4px_24px_rgba(200,16,46,0.3)] active:scale-95">
          {isPlaying 
            ? <Pause className="w-5 h-5 text-white" />
            : <Play className="w-5 h-5 text-white ml-0.5" />}
        </button>
        <button className="text-surface-300 hover:text-white transition-colors">
          <SkipForward className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
