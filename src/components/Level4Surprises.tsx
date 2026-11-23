import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Gift, Heart, Sparkles } from 'lucide-react';
import { GIFT_SURPRISES, GiftSurprise } from '../data/anniversaryData';
import { soundEngine } from '../utils/soundEngine';

interface Level4SurprisesProps {
  onNext: () => void;
}

const ACCENT_MAP: Record<GiftSurprise['accent'], { box: string; ribbon: string }> = {
  lavender: {
    box: 'from-purple-500/30 via-indigo-500/20 to-purple-900/40 border-purple-300/35',
    ribbon: 'from-purple-400 to-pink-400',
  },
  rose: {
    box: 'from-pink-500/30 via-rose-500/20 to-purple-900/40 border-pink-300/35',
    ribbon: 'from-pink-400 to-rose-300',
  },
  sky: {
    box: 'from-sky-500/25 via-indigo-500/20 to-purple-900/40 border-sky-300/35',
    ribbon: 'from-sky-300 to-purple-400',
  },
  violet: {
    box: 'from-fuchsia-500/25 via-purple-500/20 to-indigo-900/40 border-fuchsia-300/35',
    ribbon: 'from-fuchsia-400 to-violet-300',
  },
};

export const Level4Surprises: React.FC<Level4SurprisesProps> = ({ onNext }) => {
  const [openedIds, setOpenedIds] = useState<number[]>([]);

  const handleToggleBox = (id: number) => {
    if (!openedIds.includes(id)) {
      soundEngine.playGiftPop();
      setOpenedIds((prev) => [...prev, id]);
    }
  };

  const handleOpenAll = () => {
    soundEngine.playChime();
    setOpenedIds(GIFT_SURPRISES.map((g) => g.id));
  };

  return (
    <section
      aria-labelledby="surprises-heading"
      className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs sm:text-sm tracking-[0.18em] text-purple-200/80 uppercase">
          Level 04 · Little Surprises 🎁
        </p>
        <h2
          id="surprises-heading"
          className="font-display mt-2 text-balance text-3xl font-semibold text-white sm:text-5xl"
        >
          Ten Little Gifts From My Heart
        </h2>
        <p className="mt-3 text-sm text-purple-100/80 sm:text-base">
          Tap each gift box to unwrap a little wish, compliment, or promise just for you.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-purple-200/85">
          <span className="tabular-nums font-medium">
            {openedIds.length} of {GIFT_SURPRISES.length} surprises unwrapped
          </span>
          {openedIds.length < GIFT_SURPRISES.length && (
            <button
              type="button"
              onClick={handleOpenAll}
              className="min-h-[40px] rounded-xl border border-purple-200/25 bg-white/[0.06] px-4 py-1.5 font-medium text-purple-100 transition-colors hover:bg-purple-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 whitespace-nowrap"
            >
              Unwrap All
            </button>
          )}
        </div>
      </div>

      {/* 10 Interactive Gift Boxes */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {GIFT_SURPRISES.map((gift, index) => {
          const isOpen = openedIds.includes(gift.id);
          const styles = ACCENT_MAP[gift.accent];

          return (
            <motion.div
              key={gift.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="h-full"
            >
              <button
                type="button"
                onClick={() => handleToggleBox(gift.id)}
                aria-expanded={isOpen}
                className={`group relative flex h-full min-h-[210px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border bg-gradient-to-br p-5 text-center transition-all duration-300 backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 ${
                  styles.box
                } ${
                  isOpen
                    ? 'shadow-[0_14px_38px_rgba(236,72,153,0.28)]'
                    : 'hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(168,85,247,0.3)]'
                }`}
              >
                {!isOpen ? (
                  <div className="flex flex-col items-center">
                    {/* Ribbon Bow & Gift Icon */}
                    <div
                      className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${styles.ribbon} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <Gift className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-medium tracking-wider text-purple-200/80 uppercase tabular-nums">
                      Gift #{gift.id}
                    </span>
                    <span className="mt-1 text-sm font-medium text-white">
                      Tap to Unwrap
                    </span>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex h-full flex-col items-center justify-between"
                  >
                    <div className="flex items-center gap-1.5 text-pink-200">
                      <Sparkles className="h-4 w-4 text-amber-200" aria-hidden="true" />
                      <span className="text-xs font-semibold tracking-wide uppercase">
                        {gift.title}
                      </span>
                    </div>
                    <p className="my-3 text-sm leading-relaxed text-purple-50">
                      {gift.message}
                    </p>
                    <Heart
                      className="h-4 w-4 fill-pink-400/80 text-pink-200"
                      aria-hidden="true"
                    />
                  </motion.div>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Continue */}
      <div className="mt-12 flex justify-center">
        <button
          type="button"
          onClick={onNext}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(236,72,153,0.38)] transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-200 whitespace-nowrap"
        >
          <span>Play Heart Collection</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};
