// Gentle Web Audio API music & sound effects synthesizer for Forever Us

class SoundEngine {
  private ctx: AudioContext | null = null;
  private musicEnabled = false;
  private sfxEnabled = true;
  private musicTimer: number | null = null;
  private noteIndex = 0;

  // Tender romantic music-box melody in F major / D minor (frequencies in Hz)
  private readonly melody: Array<{ freq: number; harmony?: number; dur: number }> = [
    { freq: 349.23, harmony: 174.61, dur: 0.75 }, // F4 + F3
    { freq: 440.0, dur: 0.75 }, // A4
    { freq: 523.25, dur: 0.75 }, // C5
    { freq: 587.33, harmony: 220.0, dur: 1.1 }, // D5 + A3
    { freq: 523.25, dur: 0.6 }, // C5
    { freq: 440.0, dur: 0.9 }, // A4

    { freq: 392.0, harmony: 196.0, dur: 0.75 }, // G4 + G3
    { freq: 466.16, dur: 0.75 }, // Bb4
    { freq: 523.25, dur: 0.75 }, // C5
    { freq: 440.0, harmony: 174.61, dur: 1.2 }, // A4 + F3
    { freq: 349.23, dur: 1.1 }, // F4

    { freq: 587.33, harmony: 233.08, dur: 0.75 }, // D5 + Bb3
    { freq: 659.25, dur: 0.75 }, // E5
    { freq: 698.46, dur: 0.9 }, // F5
    { freq: 523.25, harmony: 261.63, dur: 0.9 }, // C5 + C4
    { freq: 440.0, dur: 0.75 }, // A4
    { freq: 392.0, harmony: 196.0, dur: 1.2 }, // G4 + G3
    { freq: 349.23, harmony: 174.61, dur: 1.5 }, // F4 + F3
  ];

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  public setSfxEnabled(enabled: boolean) {
    this.sfxEnabled = enabled;
  }

  public isSfxEnabled(): boolean {
    return this.sfxEnabled;
  }

  public isMusicEnabled(): boolean {
    return this.musicEnabled;
  }

  public toggleMusic(force?: boolean): boolean {
    const next = typeof force === 'boolean' ? force : !this.musicEnabled;
    this.musicEnabled = next;
    if (next) {
      this.startMusicLoop();
    } else {
      this.stopMusicLoop();
    }
    return this.musicEnabled;
  }

  private startMusicLoop() {
    const ctx = this.getContext();
    if (!ctx) return;
    if (this.musicTimer !== null) {
      window.clearTimeout(this.musicTimer);
    }

    const playNext = () => {
      if (!this.musicEnabled) return;
      const step = this.melody[this.noteIndex % this.melody.length];
      this.playMusicBoxTone(step.freq, 0.055, step.dur * 1.4);
      if (step.harmony) {
        this.playPadTone(step.harmony, 0.032, step.dur * 2.1);
      }
      this.noteIndex = (this.noteIndex + 1) % this.melody.length;
      this.musicTimer = window.setTimeout(playNext, step.dur * 760);
    };

    playNext();
  }

  private stopMusicLoop() {
    if (this.musicTimer !== null) {
      window.clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  private playMusicBoxTone(freq: number, volume: number, duration: number) {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0.15, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    osc2.connect(gain2);
    gain2.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + duration + 0.05);
    osc2.stop(now + duration + 0.05);
  }

  private playPadTone(freq: number, volume: number, duration: number) {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  public playChime() {
    if (!this.sfxEnabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((f, idx) => {
      window.setTimeout(() => {
        this.playMusicBoxTone(f, 0.06, 0.55);
      }, idx * 75);
    });
  }

  public playSparkle() {
    if (!this.sfxEnabled) return;
    const notes = [783.99, 987.77, 1174.66];
    notes.forEach((f, idx) => {
      window.setTimeout(() => {
        this.playMusicBoxTone(f, 0.045, 0.4);
      }, idx * 55);
    });
  }

  public playDoorOpen() {
    if (!this.sfxEnabled) return;
    const notes = [293.66, 369.99, 440.0, 587.33, 739.99, 880.0];
    notes.forEach((f, idx) => {
      window.setTimeout(() => {
        this.playMusicBoxTone(f, 0.055, 0.9);
      }, idx * 95);
    });
  }

  public playGiftPop() {
    if (!this.sfxEnabled) return;
    const notes = [587.33, 739.99, 880.0, 1174.66];
    notes.forEach((f, idx) => {
      window.setTimeout(() => {
        this.playMusicBoxTone(f, 0.065, 0.5);
      }, idx * 50);
    });
  }

  public playHeartCatch() {
    if (!this.sfxEnabled) return;
    this.playMusicBoxTone(698.46, 0.06, 0.28);
    window.setTimeout(() => this.playMusicBoxTone(880.0, 0.065, 0.35), 65);
  }

  public playEnvelopeOpen() {
    if (!this.sfxEnabled) return;
    const notes = [440.0, 554.37, 659.25, 880.0];
    notes.forEach((f, idx) => {
      window.setTimeout(() => {
        this.playMusicBoxTone(f, 0.05, 0.75);
      }, idx * 110);
    });
  }

  public playFireworkPop() {
    if (!this.sfxEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(190, now);
    osc.frequency.exponentialRampToValueAtTime(48, now + 0.18);
    gain.gain.setValueAtTime(0.07, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.24);
    window.setTimeout(() => this.playSparkle(), 90);
  }
}

export const soundEngine = new SoundEngine();
