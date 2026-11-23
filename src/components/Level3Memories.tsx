import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Expand, Heart, X } from 'lucide-react';
import { MEMORY_PHOTOS, MemoryPhoto } from '../data/anniversaryData';
import { soundEngine } from '../utils/soundEngine';

interface Level3MemoriesProps {
  onNext: () => void;
}

export const Level3Memories: React.FC<Level3MemoriesProps> = ({ onNext }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'story'>('grid');
  const [storyIndex, setStoryIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  const openLightbox = (idx: number) => {
    soundEngine.playSparkle();
    setSelectedIndex(idx);
  };

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    soundEngine.playSparkle();
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + MEMORY_PHOTOS.length) % MEMORY_PHOTOS.length
    );
  }, []);

  const showNext = useCallback(() => {
    soundEngine.playSparkle();
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % MEMORY_PHOTOS.length
    );
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedIndex, closeLightbox, showPrev, showNext]);

  const activePhoto: MemoryPhoto | null =
    selectedIndex !== null ? MEMORY_PHOTOS[selectedIndex] : null;

  const currentStoryPhoto = MEMORY_PHOTOS[storyIndex];

  return (
    <section
      aria-labelledby="memories-heading"
      className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6"
    >
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs sm:text-sm tracking-[0.18em] text-purple-200/80 uppercase">
          Our Little Memories 📸
        </p>
        <h2
          id="memories-heading"
          className="font-display mt-2 text-balance text-3xl font-semibold text-white sm:text-5xl"
        >
          Every Picture Has A Little Story 💗
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-purple-100/80 sm:text-base">
          Tap any photograph to view it full-screen. Every single frame is a favorite memory kept untouched just as you shared it.
        </p>

        {/* Interactive Mode Switcher */}
        <div className="mt-6 inline-flex items-center gap-1 rounded-xl border border-purple-200/20 bg-white/[0.05] p-1 backdrop-blur-md">
          <button
            type="button"
            onClick={() => {
              soundEngine.playSparkle();
              setViewMode('grid');
            }}
            className={`min-h-[40px] rounded-lg px-4 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
              viewMode === 'grid'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm'
                : 'text-purple-200/80 hover:text-white'
            }`}
          >
            All Photos ({MEMORY_PHOTOS.length})
          </button>
          <button
            type="button"
            onClick={() => {
              soundEngine.playSparkle();
              setViewMode('story');
            }}
            className={`min-h-[40px] rounded-lg px-4 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
              viewMode === 'story'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm'
                : 'text-purple-200/80 hover:text-white'
            }`}
          >
            Story Slideshow
          </button>
        </div>
      </div>

      {/* Gallery Grid View (All 13 Original Photographs) */}
      {viewMode === 'grid' ? (
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MEMORY_PHOTOS.map((photo, index) => (
            <motion.article
              key={photo.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.4) }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-purple-200/20 bg-white/[0.04] shadow-[0_12px_40px_rgba(88,28,135,0.22)] transition-all duration-300 hover:border-pink-300/45 hover:shadow-[0_16px_50px_rgba(236,72,153,0.25)] backdrop-blur-md"
            >
              <button
                type="button"
                onClick={() => openLightbox(index)}
                className="relative aspect-[4/5] w-full overflow-hidden bg-[#160b29] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
                aria-label={`View ${photo.title} in full screen`}
              >
                {!failedImages[photo.id] ? (
                  <img
                    src={photo.src}
                    alt={`${photo.title} — ${photo.caption}`}
                    loading={index < 6 ? 'eager' : 'lazy'}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setFailedImages((prev) => ({ ...prev, [photo.id]: true }))
                    }
                    className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-purple-950 to-pink-950 p-6 text-center">
                    <Heart className="mb-2 h-8 w-8 text-pink-300" aria-hidden="true" />
                    <span className="text-sm font-medium text-purple-100">{photo.title}</span>
                  </div>
                )}

                {/* Subtle bottom gradient scrim ONLY at bottom edge for icon legibility */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

                {/* Floating heart & expand affordance */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-pink-200 opacity-80 backdrop-blur-md transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100"
                >
                  <Expand className="h-4 w-4" />
                </span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1 text-xs font-medium text-pink-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <Heart className="h-3.5 w-3.5 fill-pink-400 text-pink-300" />
                </span>
              </button>

              <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                <div>
                  <div className="flex items-center gap-2 text-xs text-purple-300/75 tabular-nums">
                    <span>{photo.momentTag}</span>
                    <span aria-hidden="true">·</span>
                    <span>Taha</span>
                  </div>
                  <h3 className="font-display mt-1 text-xl font-semibold text-white">
                    {photo.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-purple-100/80">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      ) : (
        /* Story Slideshow View */
        <div className="mx-auto mt-10 max-w-3xl">
          <div className="overflow-hidden rounded-3xl border border-purple-200/25 bg-white/[0.05] p-4 sm:p-6 shadow-[0_20px_65px_rgba(88,28,135,0.35)] backdrop-blur-xl">
            <div className="relative aspect-[4/5] sm:aspect-[16/11] w-full overflow-hidden rounded-2xl bg-[#0e0818]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentStoryPhoto.id}
                  src={currentStoryPhoto.src}
                  alt={`${currentStoryPhoto.title} — ${currentStoryPhoto.caption}`}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  onClick={() => openLightbox(storyIndex)}
                  className="h-full w-full cursor-pointer object-contain"
                />
              </AnimatePresence>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playSparkle();
                  setStoryIndex(
                    (prev) => (prev - 1 + MEMORY_PHOTOS.length) % MEMORY_PHOTOS.length
                  );
                }}
                aria-label="Previous memory photo"
                className="absolute top-1/2 left-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-purple-600/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playSparkle();
                  setStoryIndex((prev) => (prev + 1) % MEMORY_PHOTOS.length);
                }}
                aria-label="Next memory photo"
                className="absolute top-1/2 right-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-purple-600/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs text-purple-300/80 tabular-nums">
                  {storyIndex + 1} / {MEMORY_PHOTOS.length} · {currentStoryPhoto.momentTag}
                </p>
                <h3 className="font-display mt-0.5 text-2xl font-semibold text-white">
                  {currentStoryPhoto.title}
                </h3>
                <p className="mt-1 text-sm text-purple-100/80">
                  {currentStoryPhoto.caption}
                </p>
              </div>
              <button
                type="button"
                onClick={() => openLightbox(storyIndex)}
                className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-xl border border-purple-200/25 bg-purple-500/15 px-4 py-2 text-xs font-medium text-purple-100 transition-colors hover:bg-purple-500/30 whitespace-nowrap"
              >
                <Expand className="h-4 w-4" />
                <span>Full Screen</span>
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
              {MEMORY_PHOTOS.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playSparkle();
                    setStoryIndex(idx);
                  }}
                  aria-label={`Select ${p.title}`}
                  className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                    idx === storyIndex
                      ? 'border-pink-400 scale-105 shadow-[0_0_14px_rgba(244,114,182,0.6)]'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={p.src}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Continue Button */}
      <div className="mt-12 flex justify-center">
        <button
          type="button"
          onClick={onNext}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(236,72,153,0.38)] transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-200 whitespace-nowrap"
        >
          <span>Continue to Little Surprises</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* Full-Screen Lightbox */}
      <AnimatePresence>
        {activePhoto && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-xl sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={activePhoto.title}
            onClick={closeLightbox}
          >
            {/* Top Bar inside Lightbox */}
            <div
              className="mb-3 flex w-full max-w-5xl items-center justify-between text-sm text-purple-100"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="tabular-nums text-xs sm:text-sm text-purple-200/85">
                {selectedIndex + 1} / {MEMORY_PHOTOS.length} · {activePhoto.title}
              </span>
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close full-screen photo"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-pink-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Image Container (Original Photo Preserved Uncropped) */}
            <div
              className="relative flex max-h-[75vh] w-full max-w-5xl flex-1 items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous photo"
                className="absolute left-1 sm:left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:bg-purple-600/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              <motion.img
                key={activePhoto.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.22 }}
                src={activePhoto.src}
                alt={`${activePhoto.title} — ${activePhoto.caption}`}
                referrerPolicy="no-referrer"
                className="max-h-[72vh] max-w-full rounded-2xl border border-purple-200/25 object-contain shadow-[0_0_60px_rgba(192,132,252,0.3)]"
              />

              <button
                type="button"
                onClick={showNext}
                aria-label="Next photo"
                className="absolute right-1 sm:right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:bg-purple-600/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {/* Caption */}
            <div
              className="mt-4 max-w-2xl text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-2xl font-semibold text-white">
                {activePhoto.title}
              </h3>
              <p className="mt-1 text-sm text-purple-100/85">
                {activePhoto.caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
