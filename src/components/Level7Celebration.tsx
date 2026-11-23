import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface Level7CelebrationProps {
  onReplayJourney: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  type: 'firework' | 'confetti';
  rotation: number;
  vRot: number;
}

const PALETTE = [
  '#f472b6', // pink
  '#c084fc', // purple
  '#e9d5ff', // lavender
  '#93c5fd', // soft blue
  '#fde68a', // warm gold
  '#fb7185', // rose
];

export const Level7Celebration: React.FC<Level7CelebrationProps> = ({
  onReplayJourney,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [hugCount, setHugCount] = useState(0);

  const launchFirework = useCallback((cx?: number, cy?: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const x = cx ?? canvas.width * (0.18 + Math.random() * 0.64);
    const y = cy ?? canvas.height * (0.15 + Math.random() * 0.42);
    const count = 44;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.15;
      const speed = 1.8 + Math.random() * 4.4;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2.2 + Math.random() * 2.5,
        color: PALETTE[i % PALETTE.length],
        alpha: 1,
        decay: 0.011 + Math.random() * 0.01,
        type: 'firework',
        rotation: 0,
        vRot: 0,
      });
    }
  }, []);

  const spawnConfettiShower = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    for (let i = 0; i < 45; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: -15 - Math.random() * 80,
        vx: (Math.random() - 0.5) * 2.2,
        vy: 1.6 + Math.random() * 2.4,
        size: 5 + Math.random() * 5,
        color: PALETTE[i % PALETTE.length],
        alpha: 0.95,
        decay: 0.0025 + Math.random() * 0.002,
        type: 'confetti',
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.14,
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Respect prefers-reduced-motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reducedMotion) {
      launchFirework(window.innerWidth * 0.3, window.innerHeight * 0.28);
      launchFirework(window.innerWidth * 0.7, window.innerHeight * 0.25);
      spawnConfettiShower();
    }

    const fireworkInterval = reducedMotion
      ? null
      : window.setInterval(() => {
          launchFirework();
          if (Math.random() > 0.45) {
            spawnConfettiShower();
          }
        }, 1600);

    let rafId = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const list = particlesRef.current;
      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.type === 'firework') {
          p.vx *= 0.98;
          p.vy = p.vy * 0.98 + 0.045;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          p.rotation += p.vRot;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size * 0.55);
          ctx.restore();
        }

        if (p.alpha <= 0 || p.y > canvas.height + 30) {
          list.splice(i, 1);
        }
      }

      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      if (fireworkInterval) window.clearInterval(fireworkInterval);
      cancelAnimationFrame(rafId);
    };
  }, [launchFirework, spawnConfettiShower]);

  const handleMoreFireworks = () => {
    soundEngine.playFireworkPop();
    launchFirework();
    window.setTimeout(() => launchFirework(), 180);
    spawnConfettiShower();
  };

  const handleSendHug = () => {
    soundEngine.playChime();
    setHugCount((c) => c + 1);
    spawnConfettiShower();
    launchFirework(window.innerWidth * 0.5, window.innerHeight * 0.32);
  };

  return (
    <section
      aria-labelledby="celebration-heading"
      className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-5xl flex-col items-center justify-center px-4 py-12 text-center"
    >
      {/* Full-viewport Fireworks & Confetti Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-10"
      />

      {/* Celebration Centerpiece */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full overflow-hidden rounded-3xl border border-pink-200/30 bg-white/[0.06] px-6 py-12 sm:px-12 sm:py-16 shadow-[0_24px_95px_rgba(168,85,247,0.42)] backdrop-blur-xl"
      >
        {/* Blooming Floral Garland Top */}
        <div className="mb-6 flex items-center justify-center gap-3 text-2xl sm:text-3xl" aria-hidden="true">
          <span className="animate-float-gentle">🌸</span>
          <span className="animate-float-gentle" style={{ animationDelay: '0.4s' }}>🦋</span>
          <span className="animate-float-gentle" style={{ animationDelay: '0.8s' }}>💜</span>
          <span className="animate-float-gentle" style={{ animationDelay: '1.2s' }}>♾️</span>
          <span className="animate-float-gentle" style={{ animationDelay: '1.6s' }}>🌷</span>
        </div>

        <h2
          id="celebration-heading"
          className="font-display mx-auto max-w-3xl text-balance bg-gradient-to-r from-purple-100 via-pink-200 to-sky-200 bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent drop-shadow-[0_0_28px_rgba(244,114,182,0.45)] sm:text-6xl"
        >
          HAPPY 1 MONTH ANNIVERSARY TAHA! 💜
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-lg font-medium text-purple-100/90 sm:text-2xl">
          One Month Together, A Thousand Little Dreams.
        </p>

        <p className="mt-4 text-base font-semibold tracking-wide text-pink-200 sm:text-lg">
          Made with love by Ayan ❤️
        </p>

        {/* Interactive Celebration Controls */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={handleMoreFireworks}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-400 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_32px_rgba(236,72,153,0.42)] transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-200 whitespace-nowrap"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span>Launch More Fireworks</span>
          </button>

          <button
            type="button"
            onClick={handleSendHug}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl border border-pink-200/35 bg-pink-500/20 px-6 py-3 text-sm font-semibold text-pink-100 transition-colors hover:bg-pink-500/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-200 whitespace-nowrap"
          >
            <Heart className="h-4 w-4 fill-pink-300 text-pink-200" aria-hidden="true" />
            <span>
              Send Ayan a Hug {hugCount > 0 ? `(${hugCount})` : ''}
            </span>
          </button>

          <button
            type="button"
            onClick={onReplayJourney}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl border border-purple-200/25 bg-white/[0.06] px-6 py-3 text-sm font-medium text-purple-100 transition-colors hover:bg-white/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-200 whitespace-nowrap"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>Replay Our Journey</span>
          </button>
        </div>

        {hugCount > 0 && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 text-sm text-pink-200/90"
          >
            💜 {hugCount} warm hug{hugCount > 1 ? 's' : ''} received with all of Ayan’s love!
          </motion.p>
        )}
      </motion.div>
    </section>
  );
};
