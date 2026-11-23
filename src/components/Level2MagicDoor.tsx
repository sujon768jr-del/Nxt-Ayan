import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, KeyRound, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface Level2MagicDoorProps {
  onNext: () => void;
}

export const Level2MagicDoor: React.FC<Level2MagicDoorProps> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDoor = () => {
    if (!isOpen) {
      soundEngine.playDoorOpen();
      setIsOpen(true);
    }
  };

  return (
    <section
      aria-labelledby="door-heading"
      className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-4xl flex-col items-center justify-center px-4 py-10 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="w-full"
      >
        <p className="text-xs sm:text-sm tracking-[0.18em] text-purple-200/75 uppercase">
          Level 02 · Our First Month ♾️
        </p>
        <h2
          id="door-heading"
          className="font-display mt-2 text-balance text-3xl font-semibold text-white sm:text-5xl"
        >
          Tap the Magical Door
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-purple-200/80 sm:text-base">
          {isOpen
            ? 'Welcome inside our first chapter together.'
            : 'Unlock what lies behind our very first month together.'}
        </p>

        {/* 3D Magical Archway Door */}
        <div className="perspective-1200 relative mx-auto mt-9 flex h-[370px] w-[260px] items-end justify-center sm:h-[410px] sm:w-[290px]">
          {/* Outer Glowing Arch Frame */}
          <div className="relative flex h-full w-full items-end justify-center rounded-t-[150px] border-2 border-purple-200/35 bg-gradient-to-b from-purple-900/60 via-fuchsia-950/70 to-indigo-950/90 p-3 shadow-[0_0_65px_rgba(192,132,252,0.35)] backdrop-blur-md">
            {/* Inner Illuminated Portal Revealed Behind the Door */}
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-t-[136px] border border-pink-200/25 bg-gradient-to-b from-[#2e1065] via-[#4c1d95] to-[#1e1b4b] px-5 text-center shadow-inner">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 50% 40%, rgba(251,207,232,0.38), rgba(196,181,253,0.16) 50%, transparent 78%)',
                }}
              />

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 flex flex-col items-center"
                  >
                    <Sparkles className="mb-3 h-8 w-8 text-amber-200" aria-hidden="true" />
                    <p className="font-display text-2xl font-semibold leading-snug text-white sm:text-[26px]">
                      “One month down, countless beautiful memories to create.”
                    </p>
                    <span className="mt-4 text-xs tracking-widest text-pink-200/90 uppercase">
                      Forever Us ♾️
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Swinging 3D Door Leaf */}
            <button
              type="button"
              onClick={handleOpenDoor}
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Magical door opened' : 'Open the magical door'}
              className="preserve-3d absolute inset-3 cursor-pointer rounded-t-[136px] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-200"
              style={{
                transformOrigin: 'left center',
                transform: isOpen ? 'rotateY(-112deg)' : 'rotateY(0deg)',
                transition: 'transform 1.15s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <div className="backface-hidden relative flex h-full w-full flex-col items-center justify-between rounded-t-[136px] border border-purple-200/40 bg-gradient-to-b from-[#4c1d95] via-[#3b0764] to-[#1e1b4b] p-6 shadow-[inset_0_0_32px_rgba(244,114,182,0.28)]">
                {/* Ornate Arch Trim */}
                <div className="mt-6 flex flex-col items-center text-center">
                  <span className="text-3xl" aria-hidden="true">♾️</span>
                  <span className="font-display mt-2 text-lg font-medium tracking-wide text-purple-100">
                    Month One
                  </span>
                </div>

                {/* Decorative Carved Panels */}
                <div className="my-4 h-28 w-28 rounded-full border border-purple-200/30 bg-purple-400/10 flex items-center justify-center shadow-[0_0_24px_rgba(196,181,253,0.25)]">
                  <KeyRound className="h-9 w-9 text-amber-200" aria-hidden="true" />
                </div>

                {/* Door Knob & Prompt */}
                <div className="mb-3 flex w-full items-center justify-between px-2">
                  <span className="text-xs font-medium text-purple-200/85">
                    {isOpen ? 'Opened' : 'Click to open'}
                  </span>
                  <span
                    className="h-4 w-4 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 shadow-[0_0_12px_rgba(253,224,71,0.8)]"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Reveal Action Button once Door is Open */}
        <div className="mt-8 min-h-[56px]">
          {isOpen ? (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              type="button"
              onClick={onNext}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(236,72,153,0.38)] transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-200 whitespace-nowrap"
            >
              <span>Step Inside Our Memories</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </motion.button>
          ) : (
            <button
              type="button"
              onClick={handleOpenDoor}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-purple-300/30 bg-purple-400/10 px-6 py-2.5 text-sm font-medium text-purple-100 transition-colors hover:bg-purple-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 whitespace-nowrap"
            >
              <span>Unlock the Door</span>
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
};
