import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Heart, Pause, Play, RotateCcw, Sparkles } from 'lucide-react';
import { HEART_MESSAGES } from '../data/anniversaryData';
import { soundEngine } from '../utils/soundEngine';

interface Level5HeartGameProps {
  onNext: () => void;
}

interface FloatingHeart {
  id: number;
  x: number; // percentage 8..92
  y: number; // percentage 0..100
  speed: number;
  swayOffset: number;
  color: 'pink' | 'lavender' | 'sky' | 'gold';
  points: number;
}

const HEART_COLORS: Record<FloatingHeart['color'], string> = {
  pink: 'text-pink-400 fill-pink-400/85 drop-shadow-[0_0_12px_rgba(244,114,182,0.85)]',
  lavender:
    'text-purple-300 fill-purple-400/85 drop-shadow-[0_0_12px_rgba(192,132,252,0.85)]',
  sky: 'text-sky-300 fill-sky-400/85 drop-shadow-[0_0_12px_rgba(125,211,252,0.85)]',
  gold: 'text-amber-200 fill-amber-300/90 drop-shadow-[0_0_14px_rgba(253,224,71,0.95)]',
};

export const Level5HeartGame: React.FC<Level5HeartGameProps> = ({ onNext }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [latestMessage, setLatestMessage] = useState<string>(
    'Tap any floating heart to collect a sweet love note!'
  );
  const [burst, setBurst] = useState<{ id: number; x: number; y: number } | null>(null);

  const nextIdRef = useRef(1);
  const msgIndexRef = useRef(0);
  const lastSpawnRef = useRef(0);

  const spawnHeart = useCallback((): FloatingHeart => {
    const id = nextIdRef.current++;
    const roll = Math.random();
    const color: FloatingHeart['color'] =
      roll > 0.88 ? 'gold' : roll > 0.56 ? 'pink' : roll > 0.28 ? 'lavender' : 'sky';
    return {
      id,
      x: 10 + Math.random() * 80,
      y: 104,
      speed: 14 + Math.random() * 14, // % per second upward
      swayOffset: Math.random() * Math.PI * 2,
      color,
      points: color === 'gold' ? 2 : 1,
    };
  }, []);

  // Seed initial hearts
  useEffect(() => {
    setHearts([
      { ...spawnHeart(), y: 78 },
      { ...spawnHeart(), y: 54 },
      { ...spawnHeart(), y: 32 },
    ]);
  }, [spawnHeart]);

  useEffect(() => {
    if (!isPlaying) return;

    let rafId = 0;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      setHearts((prev) => {
        const moved = prev
          .map((h) => ({
            ...h,
            y: h.y - h.speed * dt,
          }))
          .filter((h) => h.y > -12);

        if (now - lastSpawnRef.current > 780 && moved.length < 9) {
          lastSpawnRef.current = now;
          moved.push(spawnHeart());
        }
        return moved;
      });

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, spawnHeart]);

  const catchHeart = (heart: FloatingHeart) => {
    soundEngine.playHeartCatch();
    setHearts((prev) => prev.filter((h) => h.id !== heart.id));

    setScore((prev) => {
      const updated = prev + heart.points;
      setBestScore((best) => Math.max(best, updated));
      return updated;
    });

    const msg = HEART_MESSAGES[msgIndexRef.current % HEART_MESSAGES.length];
    msgIndexRef.current += 1;
    setLatestMessage(msg);

    setBurst({ id: heart.id, x: heart.x, y: heart.y });
    window.setTimeout(() => {
      setBurst((curr) => (curr?.id === heart.id ? null : curr));
    }, 500);
  };

  const resetGame = () => {
    soundEngine.playSparkle();
    setScore(0);
    setHearts([
      { ...spawnHeart(), y: 74 },
      { ...spawnHeart(), y: 48 },
    ]);
    setLatestMessage('Fresh start! Catch as many hearts as you can 💕');
    setIsPlaying(true);
  };

  return (
    <section
      aria-labelledby="game-heading"
      className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6"
    >
      <div className="text-center">
        <p className="text-xs sm:text-sm tracking-[0.18em] text-purple-200/80 uppercase">
          Level 05 · Heart Collection 💕
        </p>
        <h2
          id="game-heading"
          className="font-display mt-2 text-balance text-3xl font-semibold text-white sm:text-5xl"
        >
          Catch Every Little Heart
        </h2>
      </div>

      {/* Game HUD & Positive Message Banner */}
      <div className="mt-6 rounded-2xl border border-purple-200/20 bg-white/[0.05] p-4 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-5 text-sm">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 fill-pink-400 text-pink-300" aria-hidden="true" />
              <span className="text-purple-200/80">Hearts:</span>
              <span className="font-semibold text-white tabular-nums">{score}</span>
            </div>
            <div className="flex items-center gap-2 text-purple-200/75">
              <span>Best:</span>
              <span className="font-semibold text-purple-100 tabular-nums">{bestScore}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-purple-200/25 bg-purple-500/20 px-3.5 py-1.5 text-xs font-medium text-purple-100 transition-colors hover:bg-purple-500/35 whitespace-nowrap"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Resume</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={resetGame}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-purple-200/25 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-purple-100 transition-colors hover:bg-white/[0.14] whitespace-nowrap"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Positive Message Reveal */}
        <div className="mt-3 flex min-h-[48px] items-center justify-center rounded-xl bg-purple-950/50 px-4 py-2.5 text-center border border-pink-300/15">
          <AnimatePresence mode="wait">
            <motion.p
              key={latestMessage}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-sm font-medium text-pink-100 sm:text-base"
            >
              {latestMessage}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Play Arena */}
      <div
        className="relative mt-5 h-[360px] sm:h-[420px] w-full overflow-hidden rounded-3xl border border-purple-200/25 bg-gradient-to-b from-[#1a0d30]/80 via-[#251145]/75 to-[#150b29]/90 shadow-[0_20px_60px_rgba(88,28,135,0.35)] backdrop-blur-md select-none"
        aria-label="Heart catching play area"
      >
        {/* Subtle inner sky stars */}
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
          <Sparkles className="absolute top-6 left-8 h-4 w-4 text-purple-200" />
          <Sparkles className="absolute top-14 right-10 h-5 w-5 text-pink-200" />
          <Sparkles className="absolute bottom-12 left-1/3 h-4 w-4 text-sky-200" />
        </div>

        {hearts.map((heart) => (
          <button
            key={heart.id}
            type="button"
            onClick={() => catchHeart(heart)}
            aria-label={`Catch ${heart.color} heart`}
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            className="absolute flex h-14 w-14 cursor-pointer items-center justify-center rounded-full transition-transform active:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
          >
            <Heart
              className={`h-9 w-9 sm:h-10 sm:w-10 transition-transform hover:scale-110 ${
                HEART_COLORS[heart.color]
              }`}
            />
            {heart.points > 1 && (
              <span className="absolute -top-0.5 -right-0.5 text-[10px] font-bold text-amber-100">
                +2
              </span>
            )}
          </button>
        ))}

        {/* Sparkle Pop Feedback */}
        {burst && (
          <motion.div
            key={`burst-${burst.id}`}
            initial={{ opacity: 1, scale: 0.5 }}
            animate={{ opacity: 0, scale: 1.8 }}
            transition={{ duration: 0.45 }}
            style={{
              left: `${burst.x}%`,
              top: `${burst.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            className="pointer-events-none absolute text-pink-200"
            aria-hidden="true"
          >
            <Sparkles className="h-8 w-8" />
          </motion.div>
        )}

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-xs">
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg"
            >
              <Play className="h-4 w-4" aria-hidden="true" />
              <span>Resume Catching Hearts</span>
            </button>
          </div>
        )}
      </div>

      {/* Milestone hint + Continue */}
      <div className="mt-8 flex flex-col items-center gap-4">
        {score >= 10 && (
          <p className="text-sm font-medium text-amber-200">
            ✨ {score} hearts collected — you unlocked Ayan’s special love letter!
          </p>
        )}
        <button
          type="button"
          onClick={onNext}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(236,72,153,0.38)] transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-200 whitespace-nowrap"
        >
          <span>Open Our Special Letter 💌</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};
