import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface LoadingCurtainProps {
  onFinish: () => void;
}

export const LoadingCurtain: React.FC<LoadingCurtainProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const duration = 1450;
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (elapsed < duration) {
        frameId = requestAnimationFrame(tick);
      } else {
        setVisible(false);
        window.setTimeout(onFinish, 450);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0c0617] px-6 text-center"
          role="status"
          aria-live="polite"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                'radial-gradient(circle at 50% 45%, rgba(168,85,247,0.28), rgba(244,114,182,0.12) 45%, transparent 72%)',
            }}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-purple-300/30 bg-purple-500/15 shadow-[0_0_40px_rgba(192,132,252,0.35)] backdrop-blur-md">
              <span className="text-3xl" aria-hidden="true">♾️</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-wide text-purple-50">
              Forever Us
            </h1>
            <p className="mt-2 flex items-center gap-2 text-sm text-purple-200/80">
              <Sparkles className="h-3.5 w-3.5 text-pink-300" aria-hidden="true" />
              <span>Preparing Taha’s One Month Anniversary Surprise</span>
            </p>

            <div className="mt-8 w-56 overflow-hidden rounded-full bg-purple-950/70 p-0.5 ring-1 ring-purple-300/20">
              <div
                className="h-1.5 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-sky-300 transition-[width] duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setVisible(false);
                onFinish();
              }}
              className="mt-6 text-xs text-purple-300/70 underline-offset-4 hover:text-purple-100 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 rounded px-2 py-1"
            >
              Enter now
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
