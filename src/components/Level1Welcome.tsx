import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

interface Level1WelcomeProps {
  onOpenSurprise: () => void;
}

export const Level1Welcome: React.FC<Level1WelcomeProps> = ({ onOpenSurprise }) => {
  return (
    <section
      aria-labelledby="welcome-heading"
      className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-4xl flex-col items-center justify-center px-4 py-10 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full overflow-hidden rounded-3xl border border-purple-200/20 bg-white/[0.05] px-6 py-12 sm:px-12 sm:py-16 shadow-[0_24px_80px_rgba(88,28,135,0.35)] backdrop-blur-xl"
      >
        {/* Soft corner glow inside card */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-56 w-96 -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(244,114,182,0.22), rgba(167,139,250,0.16), transparent 70%)',
          }}
        />

        {/* Quiet unboxed kicker */}
        <p className="relative z-10 text-xs sm:text-sm tracking-[0.18em] text-purple-200/80 uppercase">
          Forever Us ♾️ · Our First Month Together 💜
        </p>

        {/* Central emblem */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 mx-auto my-7 flex h-24 w-24 items-center justify-center rounded-full border border-pink-200/30 bg-gradient-to-br from-purple-500/25 via-pink-500/20 to-sky-400/20 shadow-[0_0_45px_rgba(244,114,182,0.35)]"
        >
          <Heart className="h-10 w-10 fill-pink-400/75 text-pink-200" aria-hidden="true" />
          <Sparkles
            className="absolute -top-1 -right-1 h-5 w-5 text-amber-200"
            aria-hidden="true"
          />
        </motion.div>

        <h1
          id="welcome-heading"
          className="font-display relative z-10 mx-auto max-w-2xl text-balance text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Welcome to Our Little World, Taha!
        </h1>

        <p className="relative z-10 mx-auto mt-5 max-w-xl text-base leading-relaxed text-purple-100/85 sm:text-lg">
          A little surprise, made with love by Ayan.
        </p>

        <p className="relative z-10 mt-2 text-sm text-purple-200/70">
          One Month of Beautiful Memories 💜
        </p>

        <div className="relative z-10 mt-10 flex flex-col items-center justify-center gap-4">
          <motion.button
            type="button"
            onClick={onOpenSurprise}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex min-h-[52px] items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-400 px-8 py-4 text-base font-semibold text-white shadow-[0_12px_36px_rgba(236,72,153,0.45)] transition-shadow hover:shadow-[0_16px_44px_rgba(192,132,252,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-200 whitespace-nowrap"
          >
            <span className="relative z-10">Open Your Surprise 💌</span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              style={{ animation: 'shimmerSweep 3.2s ease-in-out infinite' }}
            />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};
