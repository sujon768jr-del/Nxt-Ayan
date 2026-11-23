import React, { useMemo } from 'react';

interface MagicalBackdropProps {
  onSecretStarClick?: () => void;
  secretsFound?: number;
}

const ButterflySvg: React.FC<{ colorA: string; colorB: string; size?: number }> = ({
  colorA,
  colorB,
  size = 34,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    aria-hidden="true"
    className="drop-shadow-[0_0_10px_rgba(232,121,249,0.55)]"
  >
    <g className="animate-wing">
      <path
        d="M31 31C23 18 7 12 6 24C5 34 19 36 31 33Z"
        fill={colorA}
        fillOpacity="0.78"
      />
      <path
        d="M31 34C21 37 11 47 16 53C21 58 29 47 31 36Z"
        fill={colorB}
        fillOpacity="0.68"
      />
      <path
        d="M33 31C41 18 57 12 58 24C59 34 45 36 33 33Z"
        fill={colorA}
        fillOpacity="0.78"
      />
      <path
        d="M33 34C43 37 53 47 48 53C43 58 35 47 33 36Z"
        fill={colorB}
        fillOpacity="0.68"
      />
    </g>
    <rect x="30.5" y="21" width="3" height="22" rx="1.5" fill="#FDF4FF" fillOpacity="0.9" />
    <path d="M31.5 22C29 17 26 15 24 15" stroke="#FDF4FF" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M32.5 22C35 17 38 15 40 15" stroke="#FDF4FF" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const BlossomFlowerSvg: React.FC<{ className?: string; hue?: string }> = ({
  className = '',
  hue = '#e9d5ff',
}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <g opacity="0.55">
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="60"
          cy="30"
          rx="14"
          ry="24"
          fill={hue}
          fillOpacity="0.24"
          stroke={hue}
          strokeOpacity="0.35"
          strokeWidth="1"
          transform={`rotate(${deg} 60 60)`}
        />
      ))}
      <circle cx="60" cy="60" r="9" fill="#fbcfe8" fillOpacity="0.6" />
      <circle cx="60" cy="60" r="4" fill="#fef08a" fillOpacity="0.8" />
    </g>
  </svg>
);

export const MagicalBackdrop: React.FC<MagicalBackdropProps> = ({
  onSecretStarClick,
}) => {
  const stars = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        id: i,
        left: `${(i * 23 + 7) % 98}%`,
        top: `${(i * 37 + 11) % 94}%`,
        size: i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1.5,
        delay: `${(i * 0.37) % 4}s`,
        duration: `${2.8 + (i % 4) * 0.9}s`,
      })),
    []
  );

  const floatingHearts = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${(i * 9 + 4) % 95}%`,
        delay: `${i * 1.4}s`,
        duration: `${13 + (i % 5) * 2.5}s`,
        size: 12 + (i % 4) * 4,
        color:
          i % 3 === 0
            ? 'rgba(244, 114, 182, 0.35)'
            : i % 3 === 1
            ? 'rgba(196, 181, 253, 0.35)'
            : 'rgba(147, 197, 253, 0.32)',
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Deep Twilight Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0617] via-[#170c2b] to-[#110a22]" />

      {/* Aurora Ribbons (Purple, Lavender, Pink, Soft Blue) */}
      <div
        className="animate-aurora absolute -top-36 -left-32 h-[540px] w-[540px] rounded-full blur-[110px]"
        style={{
          background:
            'radial-gradient(circle, rgba(168,85,247,0.34) 0%, rgba(196,181,253,0.12) 55%, transparent 75%)',
        }}
      />
      <div
        className="animate-aurora absolute top-1/4 -right-32 h-[520px] w-[520px] rounded-full blur-[120px]"
        style={{
          animationDelay: '-5s',
          background:
            'radial-gradient(circle, rgba(244,114,182,0.28) 0%, rgba(192,132,252,0.14) 55%, transparent 75%)',
        }}
      />
      <div
        className="animate-aurora absolute -bottom-40 left-1/3 h-[560px] w-[560px] rounded-full blur-[125px]"
        style={{
          animationDelay: '-10s',
          background:
            'radial-gradient(circle, rgba(125,211,252,0.22) 0%, rgba(167,139,250,0.16) 55%, transparent 75%)',
        }}
      />

      {/* Twinkling Starfield */}
      {stars.map((star) => (
        <span
          key={star.id}
          className="animate-twinkle absolute rounded-full bg-purple-100"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.delay,
            animationDuration: star.duration,
            boxShadow: '0 0 8px rgba(233, 213, 255, 0.85)',
          }}
        />
      ))}

      {/* Subtle Floating Hearts */}
      {floatingHearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute -bottom-10"
          style={{
            left: heart.left,
            animation: `floatHeartUp ${heart.duration} linear ${heart.delay} infinite`,
          }}
          aria-hidden="true"
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill={heart.color}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </span>
      ))}

      {/* Animated Butterflies */}
      <div
        className="animate-butterfly absolute top-[18%] left-[7%] opacity-75 hidden sm:block"
        style={{ animationDelay: '-2s' }}
      >
        <ButterflySvg colorA="#c4b5fd" colorB="#f472b6" size={34} />
      </div>
      <div
        className="animate-butterfly absolute top-[62%] right-[8%] opacity-70"
        style={{ animationDelay: '-7s' }}
      >
        <ButterflySvg colorA="#f9a8d4" colorB="#93c5fd" size={30} />
      </div>
      <div
        className="animate-butterfly absolute bottom-[18%] left-[12%] opacity-60 hidden md:block"
        style={{ animationDelay: '-4s' }}
      >
        <ButterflySvg colorA="#a5b4fc" colorB="#f0abfc" size={26} />
      </div>

      {/* Animated Corner Blossoms */}
      <BlossomFlowerSvg
        className="animate-petal-sway absolute -bottom-8 -left-8 h-40 w-40 opacity-50"
        hue="#d8b4fe"
      />
      <BlossomFlowerSvg
        className="animate-petal-sway absolute -bottom-10 -right-8 h-44 w-44 opacity-45"
        hue="#fbcfe8"
      />

      {/* Hidden Collectible Wishing Star (interactive easter egg) */}
      {onSecretStarClick && (
        <button
          type="button"
          onClick={onSecretStarClick}
          title="A tiny wishing star — tap for a secret note"
          aria-label="Reveal hidden wishing star surprise"
          className="pointer-events-auto absolute bottom-5 right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full text-amber-200/70 transition-transform duration-200 hover:scale-125 hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-[0_0_8px_rgba(253,230,138,0.8)]">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6L12 2z" />
          </svg>
        </button>
      )}
    </div>
  );
};
