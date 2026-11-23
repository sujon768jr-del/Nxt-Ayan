import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Music, Sparkles, Volume2, VolumeX, X } from 'lucide-react';
import { LEVELS } from './data/anniversaryData';
import { soundEngine } from './utils/soundEngine';
import { MagicalBackdrop } from './components/MagicalBackdrop';
import { LoadingCurtain } from './components/LoadingCurtain';
import { Level1Welcome } from './components/Level1Welcome';
import { Level2MagicDoor } from './components/Level2MagicDoor';
import { Level3Memories } from './components/Level3Memories';
import { Level4Surprises } from './components/Level4Surprises';
import { Level5HeartGame } from './components/Level5HeartGame';
import { Level6SpecialLetter } from './components/Level6SpecialLetter';
import { Level7Celebration } from './components/Level7Celebration';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [musicOn, setMusicOn] = useState(false);
  const [sfxOn, setSfxOn] = useState(true);
  const [secretOpen, setSecretOpen] = useState(false);

  const goToLevel = (level: number) => {
    const clamped = Math.max(1, Math.min(LEVELS.length, level));
    soundEngine.playSparkle();
    setCurrentLevel(clamped);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSurprise = () => {
    if (!musicOn) {
      const enabled = soundEngine.toggleMusic(true);
      setMusicOn(enabled);
    }
    soundEngine.playChime();
    goToLevel(2);
  };

  const handleToggleMusic = () => {
    const next = soundEngine.toggleMusic();
    setMusicOn(next);
  };

  const handleToggleSfx = () => {
    const next = !sfxOn;
    soundEngine.setSfxEnabled(next);
    setSfxOn(next);
    if (next) soundEngine.playSparkle();
  };

  const progressPct = Math.round((currentLevel / LEVELS.length) * 100);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0e0818] text-[#faf5ff]">
      {!loaded && <LoadingCurtain onFinish={() => setLoaded(true)} />}

      {/* Ambient Aurora, Stars, Butterflies, Hearts & Flowers */}
      <MagicalBackdrop
        onSecretStarClick={() => {
          soundEngine.playChime();
          setSecretOpen(true);
        }}
      />

      {/* Clean 3-Zone Top Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-purple-200/15 bg-[#0e0818]/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={() => goToLevel(1)}
            className="font-display text-lg sm:text-xl font-semibold tracking-wide text-white whitespace-nowrap shrink-0 hover:text-pink-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 rounded"
          >
            Forever Us ♾️
          </button>

          {/* Zone 2: Clean Chapter Links (Desktop) */}
          <nav
            aria-label="Anniversary journey levels"
            className="hidden lg:flex items-center gap-5 text-xs font-medium text-purple-200/80"
          >
            {LEVELS.map((lvl) => {
              const active = lvl.level === currentLevel;
              return (
                <button
                  key={lvl.level}
                  type="button"
                  onClick={() => goToLevel(lvl.level)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 rounded ${
                    active ? 'text-white font-semibold' : 'hover:text-pink-200'
                  }`}
                >
                  <span>{lvl.shortLabel}</span>
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Audio & Sound Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleToggleMusic}
              aria-pressed={musicOn}
              aria-label={musicOn ? 'Turn background music off' : 'Turn background music on'}
              className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                musicOn
                  ? 'border-pink-300/45 bg-pink-500/20 text-pink-100'
                  : 'border-purple-200/20 bg-white/[0.05] text-purple-200/80 hover:text-white'
              }`}
            >
              <Music className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{musicOn ? 'Music On' : 'Music Off'}</span>
            </button>

            <button
              type="button"
              onClick={handleToggleSfx}
              aria-pressed={sfxOn}
              aria-label={sfxOn ? 'Mute sound effects' : 'Enable sound effects'}
              className={`inline-flex min-h-[40px] items-center justify-center rounded-xl border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                sfxOn
                  ? 'border-purple-200/30 bg-purple-500/20 text-purple-100'
                  : 'border-purple-200/20 bg-white/[0.05] text-purple-300/70'
              }`}
            >
              {sfxOn ? (
                <Volume2 className="h-4 w-4" aria-hidden="true" />
              ) : (
                <VolumeX className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Thin Journey Progress Bar */}
        <div
          className="h-0.5 w-full bg-purple-950/70"
          role="progressbar"
          aria-valuenow={progressPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Story progress"
        >
          <div
            className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-sky-300 transition-[width] duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </header>

      {/* Main Interactive Story Stage */}
      <main className="relative z-20 pb-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLevel}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {currentLevel === 1 && <Level1Welcome onOpenSurprise={handleOpenSurprise} />}
            {currentLevel === 2 && <Level2MagicDoor onNext={() => goToLevel(3)} />}
            {currentLevel === 3 && <Level3Memories onNext={() => goToLevel(4)} />}
            {currentLevel === 4 && <Level4Surprises onNext={() => goToLevel(5)} />}
            {currentLevel === 5 && <Level5HeartGame onNext={() => goToLevel(6)} />}
            {currentLevel === 6 && <Level6SpecialLetter onNext={() => goToLevel(7)} />}
            {currentLevel === 7 && (
              <Level7Celebration onReplayJourney={() => goToLevel(1)} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Chapter Stepper for Easy Mobile & Desktop Navigation */}
        <div className="mx-auto mt-4 flex max-w-md items-center justify-between gap-4 px-4">
          <button
            type="button"
            disabled={currentLevel === 1}
            onClick={() => goToLevel(currentLevel - 1)}
            className="inline-flex min-h-[44px] items-center gap-1 rounded-xl border border-purple-200/20 bg-white/[0.04] px-4 py-2 text-xs font-medium text-purple-100 transition-colors hover:bg-white/[0.12] disabled:pointer-events-none disabled:opacity-35 whitespace-nowrap"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span>Previous</span>
          </button>

          <span className="text-xs text-purple-200/75 tabular-nums whitespace-nowrap">
            Level {currentLevel} of {LEVELS.length}
          </span>

          <button
            type="button"
            disabled={currentLevel === LEVELS.length}
            onClick={() => goToLevel(currentLevel + 1)}
            className="inline-flex min-h-[44px] items-center gap-1 rounded-xl border border-purple-200/20 bg-white/[0.04] px-4 py-2 text-xs font-medium text-purple-100 transition-colors hover:bg-white/[0.12] disabled:pointer-events-none disabled:opacity-35 whitespace-nowrap"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </main>

      {/* Quiet Signature Footer */}
      <footer className="relative z-20 border-t border-purple-200/10 py-6 text-center text-xs text-purple-200/65">
        <p>Forever Us ♾️ · Our First Month Together 💜 · Made with love by Ayan</p>
      </footer>

      {/* Hidden Surprise Note Modal (Triggered by the Secret Wishing Star) */}
      <AnimatePresence>
        {secretOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="secret-note-title"
            onClick={() => setSecretOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl border border-amber-200/30 bg-[#1a0d30] p-7 text-center shadow-[0_24px_80px_rgba(251,191,36,0.22)]"
            >
              <button
                type="button"
                onClick={() => setSecretOpen(false)}
                aria-label="Close hidden surprise"
                className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-purple-100 hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>

              <Sparkles className="mx-auto mb-3 h-8 w-8 text-amber-200" aria-hidden="true" />
              <h3 id="secret-note-title" className="font-display text-2xl font-semibold text-white">
                You Found a Hidden Star ✨
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-purple-100/90">
                Secret note from Ayan: No matter how quiet the night or how far the miles are, Taha is always my favorite prayer and my happiest thought. 💜
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
