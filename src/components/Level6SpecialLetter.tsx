import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Heart, MailOpen, RotateCcw, Sparkles } from 'lucide-react';
import { SPECIAL_LETTER_TEXT } from '../data/anniversaryData';
import { soundEngine } from '../utils/soundEngine';

interface Level6SpecialLetterProps {
  onNext: () => void;
}

// Segment string safely by grapheme clusters so Bengali conjuncts & emojis never split mid-surrogate
function segmentText(text: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter('bn', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

export const Level6SpecialLetter: React.FC<Level6SpecialLetterProps> = ({ onNext }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const graphemes = useMemo(() => segmentText(SPECIAL_LETTER_TEXT), []);

  useEffect(() => {
    if (!isOpened || !isTyping) return;
    if (visibleCount >= graphemes.length) {
      setIsTyping(false);
      return;
    }

    const currentChar = graphemes[visibleCount];
    const delay = currentChar === '\n' ? 95 : 22;

    const timer = window.setTimeout(() => {
      setVisibleCount((prev) => Math.min(graphemes.length, prev + 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isOpened, isTyping, visibleCount, graphemes]);

  const handleOpenEnvelope = () => {
    if (!isOpened) {
      soundEngine.playEnvelopeOpen();
      setIsOpened(true);
      setVisibleCount(0);
      setIsTyping(true);
    }
  };

  const handleReplayTypewriter = () => {
    soundEngine.playSparkle();
    setVisibleCount(0);
    setIsTyping(true);
  };

  const handleRevealAll = () => {
    soundEngine.playSparkle();
    setVisibleCount(graphemes.length);
    setIsTyping(false);
  };

  const displayedText = graphemes.slice(0, visibleCount).join('');

  return (
    <section
      aria-labelledby="letter-heading"
      className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-4xl flex-col items-center justify-center px-4 py-10 sm:px-6"
    >
      <div className="text-center">
        <p className="text-xs sm:text-sm tracking-[0.18em] text-purple-200/80 uppercase">
          Level 06 · Our Special Letter 💌
        </p>
        <h2
          id="letter-heading"
          className="font-display mt-2 text-balance text-3xl font-semibold text-white sm:text-5xl"
        >
          A Letter From Ayan’s Heart
        </h2>
        <p className="mt-2 text-sm text-purple-200/80 sm:text-base">
          {isOpened
            ? 'Read slowly, every single word is written from the heart.'
            : 'Tap the wax-sealed envelope to open your letter.'}
        </p>
      </div>

      {/* Closed Animated Envelope */}
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="closed-envelope"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -12 }}
            transition={{ duration: 0.45 }}
            className="mt-10 w-full max-w-md"
          >
            <button
              type="button"
              onClick={handleOpenEnvelope}
              aria-label="Open Ayan's special anniversary letter envelope"
              className="group perspective-1200 relative mx-auto block h-64 w-full cursor-pointer rounded-3xl border border-purple-200/30 bg-gradient-to-br from-[#3b155f]/90 via-[#2a114b]/95 to-[#1b0e38]/95 p-6 shadow-[0_24px_70px_rgba(168,85,247,0.38)] transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_80px_rgba(244,114,182,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
            >
              {/* Envelope Inner Flap Lines */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-32 rounded-t-3xl border-b border-purple-200/20 bg-gradient-to-b from-purple-400/20 to-transparent"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 88%)',
                }}
              />

              {/* Wax Seal */}
              <div className="relative z-10 flex h-full flex-col items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.07, 1] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-pink-200/50 bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 shadow-[0_0_32px_rgba(244,114,182,0.75)]"
                >
                  <Heart className="h-8 w-8 fill-white text-white" aria-hidden="true" />
                </motion.div>

                <p className="font-display mt-5 text-2xl font-semibold text-white">
                  For My Dear Taha
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs font-medium tracking-wider text-pink-200/90 uppercase">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Tap to break the seal</span>
                </p>
              </div>
            </button>
          </motion.div>
        ) : (
          /* Opened Letter Sheet */
          <motion.div
            key="opened-letter"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 w-full max-w-3xl"
          >
            <div className="relative overflow-hidden rounded-3xl border border-pink-200/25 bg-gradient-to-b from-[#21103a]/92 via-[#1a0d30]/95 to-[#150a26]/95 p-6 sm:p-10 shadow-[0_24px_85px_rgba(168,85,247,0.35)] backdrop-blur-xl">
              {/* Top Letter Header */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-purple-200/15 pb-4">
                <div className="flex items-center gap-2.5 text-sm font-medium text-pink-200">
                  <MailOpen className="h-4 w-4" aria-hidden="true" />
                  <span>From Ayan · To Taha</span>
                </div>

                <div className="flex items-center gap-2">
                  {visibleCount < graphemes.length && (
                    <button
                      type="button"
                      onClick={handleRevealAll}
                      className="min-h-[38px] rounded-lg border border-purple-200/25 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-purple-100 transition-colors hover:bg-purple-500/25 whitespace-nowrap"
                    >
                      Show Full Letter
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleReplayTypewriter}
                    className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-purple-200/25 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-purple-100 transition-colors hover:bg-purple-500/25 whitespace-nowrap"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Replay</span>
                  </button>
                </div>
              </div>

              {/* Exact Bengali & English Letter Body */}
              <div
                className="font-bengali whitespace-pre-wrap text-[16px] sm:text-[18px] leading-[1.95] text-purple-50 tracking-normal"
                lang="bn"
              >
                {displayedText}
                {isTyping && (
                  <span
                    aria-hidden="true"
                    className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-pink-300 align-middle"
                  />
                )}
              </div>
            </div>

            <div className="mt-9 flex justify-center">
              <button
                type="button"
                onClick={onNext}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-400 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_12px_36px_rgba(236,72,153,0.45)] transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-200 whitespace-nowrap"
              >
                <span>Enter Final Celebration 🎉</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
