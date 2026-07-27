"use client";

import { useRef, useState } from "react";

// Accessible inline audio player for meditations.
// Uses the native <audio> element for playback + a custom labelled button.
export function AudioPlayer({
  src,
  title,
  durationMinutes,
  minutesLabel,
  playLabel,
  pauseLabel,
}: {
  src?: string;
  title: string;
  durationMinutes?: number;
  minutesLabel: string;
  playLabel: string;
  pauseLabel: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }

  return (
    <div className="flex items-center gap-4 rounded bg-petrol-700 px-4 py-3 text-white">
      <button
        type="button"
        onClick={toggle}
        aria-label={`${playing ? pauseLabel : playLabel}: ${title}`}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-petrol focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <rect x="2" y="1" width="3.5" height="12" fill="currentColor" />
            <rect x="8.5" y="1" width="3.5" height="12" fill="currentColor" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M3 1l9 6-9 6V1z" fill="currentColor" />
          </svg>
        )}
      </button>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm">{title}</p>
      </div>

      {typeof durationMinutes === "number" ? (
        <span className="shrink-0 text-xs text-white/70">
          {durationMinutes} {minutesLabel}
        </span>
      ) : null}

      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
}
