import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowDown, Sparkles, MessageCircle, Calendar, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { createWhatsAppLink, WHATSAPP_MESSAGES } from '../utils/whatsapp';

interface CinematicVideoExperienceProps {
  onOpenBooking: () => void;
  onExploreCollections: () => void;
  onOpenCustomOrder: () => void;
  onOpenContact: () => void;
  customWhatsAppNumber?: string;
}

// Local high-speed byte-range video served directly from Vite/Express public directory
const LOCAL_VIDEO_URL = '/videos/bamako_couture_hero.mp4';
const FALLBACK_RAW_URL =
  'https://raw.githubusercontent.com/prodioumar910-ai/Bamako-couture-/refs/heads/main/Fashion_commercial_for_luxury_cl%E2%80%A6_211bdf47.mp4';
const FALLBACK_GITHUB_URL =
  'https://github.com/prodioumar910-ai/Bamako-couture-/raw/refs/heads/main/Fashion_commercial_for_luxury_cl%E2%80%A6_211bdf47.mp4';

// Hermite interpolation (smoothstep) for silky-smooth fluid animation
function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export const CinematicVideoExperience: React.FC<CinematicVideoExperienceProps> = ({
  onOpenBooking,
  onExploreCollections,
  onOpenCustomOrder,
  onOpenContact,
  customWhatsAppNumber,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Fluid smoothed progress state (updated via RAF at 60/120fps)
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  // Target and interpolated references
  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const isSeekingRef = useRef(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Ensure video properties are strictly applied to DOM element on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    // Prime the video decoder so the first frame renders immediately
    const primeDecoder = () => {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            video.pause();
            video.currentTime = 0.001;
            currentTimeRef.current = 0.001;
            setVideoLoaded(true);
          })
          .catch(() => {
            video.currentTime = 0.001;
            currentTimeRef.current = 0.001;
            setVideoLoaded(true);
          });
      }
    };

    video.addEventListener('loadedmetadata', primeDecoder, { once: true });
    video.addEventListener('canplay', () => setVideoLoaded(true), { once: true });

    // Explicit load
    video.load();

    return () => {
      video.removeEventListener('loadedmetadata', primeDecoder);
    };
  }, []);

  // Update target progress on scroll with sub-pixel precision
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const containerHeight = container.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = containerHeight - viewportHeight;

    if (scrollableDistance <= 0) return;

    // Raw progress from 0 to 1 inside the 520vh container
    const rawProgress = -rect.top / scrollableDistance;
    const clampedProgress = Math.max(0, Math.min(1, rawProgress));

    targetProgressRef.current = clampedProgress;

    const video = videoRef.current;
    if (video && video.duration && !isNaN(video.duration) && video.duration > 0) {
      targetTimeRef.current = clampedProgress * video.duration;
    }
  }, []);

  // 60FPS RAF LOOP: Dual-smoothing for video scrub AND text animations
  useEffect(() => {
    let isRunning = true;

    const smoothStep = (timestamp: number) => {
      if (!isRunning) return;

      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.08);
      lastTimeRef.current = timestamp;

      // 1. Smooth the scroll progress for buttery text fluidity
      const targetP = targetProgressRef.current;
      const currentP = smoothProgressRef.current;
      const pDiff = targetP - currentP;

      if (Math.abs(pDiff) > 0.0001) {
        // High-damping exponential ease (silky smooth settling)
        const pFactor = 1 - Math.exp(-dt * 8);
        const nextP = currentP + pDiff * pFactor;
        smoothProgressRef.current = nextP;
        setSmoothProgress(nextP);

        // Update active chapter smoothly
        if (nextP < 0.20) setActiveChapter(0);
        else if (nextP < 0.42) setActiveChapter(1);
        else if (nextP < 0.65) setActiveChapter(2);
        else if (nextP < 0.85) setActiveChapter(3);
        else setActiveChapter(4);
      }

      // 2. Smooth the video timeline scrub
      const video = videoRef.current;
      if (video && video.duration && !isNaN(video.duration) && !reducedMotion) {
        const targetT = targetTimeRef.current;
        const currentT = currentTimeRef.current;
        const tDiff = targetT - currentT;

        if (Math.abs(tDiff) > 0.004 && !isSeekingRef.current) {
          const tFactor = 1 - Math.exp(-dt * 9.5);
          currentTimeRef.current = currentT + tDiff * tFactor;

          const clampedTime = Math.max(0, Math.min(video.duration, currentTimeRef.current));
          if (Math.abs(video.currentTime - clampedTime) > 0.006) {
            video.currentTime = clampedTime;
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(smoothStep);
    };

    rafIdRef.current = requestAnimationFrame(smoothStep);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      isRunning = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll, reducedMotion]);

  // Handle video seeked event to maintain continuous decode
  const handleSeeked = () => {
    isSeekingRef.current = false;
  };

  const handleSeeking = () => {
    isSeekingRef.current = true;
  };

  const handleError = () => {
    // If local fails for any reason, fallback gracefully
    setLoadError(true);
    setVideoLoaded(true);
  };

  // Jump to specific chapter along the container
  const jumpToChapter = (chapterIndex: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerTop = container.offsetTop;
    const scrollableDistance = container.offsetHeight - window.innerHeight;
    const targetProportions = [0.02, 0.28, 0.52, 0.74, 0.94];
    const targetScrollY = containerTop + targetProportions[chapterIndex] * scrollableDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  // ULTRA FLUID OPACITY & TRANSLATE CALCULATIONS USING SMOOTHSTEP
  const computeFluidStyle = (
    start: number,
    peakStart: number,
    peakEnd: number,
    end: number
  ) => {
    const p = smoothProgress;
    let opacity = 0;
    let translateY = 0;

    if (p < start || p > end) {
      opacity = 0;
      translateY = p < start ? 32 : -32;
    } else if (p >= peakStart && p <= peakEnd) {
      opacity = 1;
      translateY = 0;
    } else if (p < peakStart) {
      // Fluid ease-in (from start to peakStart)
      const t = smoothstep(start, peakStart, p);
      opacity = t;
      translateY = (1 - t) * 32;
    } else {
      // Fluid ease-out (from peakEnd to end)
      const t = smoothstep(peakEnd, end, p);
      opacity = 1 - t;
      translateY = -t * 32;
    }

    return {
      opacity,
      transform: `translate3d(0, ${translateY.toFixed(2)}px, 0)`,
      pointerEvents: opacity > 0.4 ? ('auto' as const) : ('none' as const),
      willChange: 'transform, opacity',
      transition: 'none', // RAF drives the values smoothly, avoiding conflicting CSS transitions
    };
  };

  // Fluid styles for the 5 story sections
  const style1 = computeFluidStyle(0.0, 0.03, 0.16, 0.23);
  const style2 = computeFluidStyle(0.20, 0.27, 0.38, 0.45);
  const style3 = computeFluidStyle(0.42, 0.49, 0.60, 0.67);
  const style4 = computeFluidStyle(0.64, 0.71, 0.82, 0.89);
  const style5 = computeFluidStyle(0.86, 0.91, 1.0, 1.0);

  // Dynamic scrim overlay intensity based on fluid progress
  const overlayDarkness =
    0.35 + smoothstep(0.75, 0.98, smoothProgress) * 0.38;

  return (
    <div
      ref={containerRef}
      id="experience"
      className="relative w-full"
      style={{ height: '520vh' }}
    >
      {/* FIXED VIEWPORT CINEMATIC CANVAS */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0 bg-[#291A17]">
        {/* Cinematic Video Element */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          onSeeking={handleSeeking}
          onSeeked={handleSeeked}
          onError={handleError}
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none transition-opacity duration-1000"
          style={{
            objectPosition: 'center 35%',
            opacity: videoLoaded ? 1 : 0.7,
            willChange: 'opacity',
          }}
        >
          {/* Primary local high-performance source */}
          <source src={LOCAL_VIDEO_URL} type="video/mp4" />
          {/* Direct raw GitHub fallback */}
          <source src={FALLBACK_RAW_URL} type="video/mp4" />
          {/* Original GitHub URL */}
          <source src={FALLBACK_GITHUB_URL} type="video/mp4" />
        </video>

        {/* Fallback poster or gradient if video has error */}
        {loadError && (
          <div className="absolute inset-0 bg-[#291A17] flex items-center justify-center p-6 text-center">
            <div className="max-w-md">
              <span className="text-[#C5A46D] text-xs uppercase tracking-[0.25em] font-medium block mb-2">
                Maison Bamako Couture
              </span>
              <p className="font-editorial text-2xl text-[#F6F1E9]">
                L’Art de Sublimer l’Élégance Africaine
              </p>
            </div>
          </div>
        )}

        {/* Cinematic Scrim & Vignette Gradients */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: `rgba(25, 23, 21, ${overlayDarkness.toFixed(3)})`,
            backgroundImage: `radial-gradient(circle at 50% 45%, transparent 35%, rgba(20, 15, 14, 0.75) 100%)`,
          }}
        />

        {/* Top and bottom subtle gradients for seamless header and footer blend */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#191715]/85 via-[#191715]/30 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#191715]/90 via-[#191715]/40 to-transparent pointer-events-none" />

        {/* Audio control button */}
        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-30 flex items-center gap-3">
          <button
            onClick={() => {
              const video = videoRef.current;
              if (video) {
                const nextMuted = !isAudioMuted;
                video.muted = nextMuted;
                setIsAudioMuted(nextMuted);
              }
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#291A17]/80 hover:bg-[#291A17] text-[#F6F1E9]/80 hover:text-[#C5A46D] text-xs tracking-wider border border-[#C5A46D]/25 transition-all backdrop-blur-md"
            title={isAudioMuted ? 'Activer le son' : 'Couper le son'}
          >
            {isAudioMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span className="text-[11px] uppercase tracking-widest hidden sm:inline">Audio Muet</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span className="text-[11px] uppercase tracking-widest hidden sm:inline">Audio Actif</span>
              </>
            )}
          </button>
        </div>

        {/* RIGHT SIDE CINEMATIC CHAPTER NAVIGATOR */}
        <div className="hidden lg:flex flex-col items-end gap-3.5 absolute right-8 top-1/2 -translate-y-1/2 z-20 pointer-events-auto">
          {[
            { num: '01', name: 'Révélation' },
            { num: '02', name: 'Savoir-Faire' },
            { num: '03', name: 'Sur Mesure' },
            { num: '04', name: 'Collection' },
            { num: '05', name: 'Signature' },
          ].map((chap, idx) => {
            const isActive = activeChapter === idx;
            return (
              <button
                key={chap.num}
                onClick={() => jumpToChapter(idx)}
                className="group flex items-center gap-3 text-right py-1 transition-all focus:outline-none"
              >
                <span
                  className={`text-[11px] font-sans tracking-widest transition-all duration-300 ${
                    isActive
                      ? 'text-[#C5A46D] font-medium opacity-100 translate-x-0'
                      : 'text-[#F6F1E9]/40 opacity-0 group-hover:opacity-80 translate-x-2 group-hover:translate-x-0'
                  }`}
                >
                  {chap.name}
                </span>
                <span
                  className={`font-mono text-xs tabular-nums transition-colors duration-300 ${
                    isActive ? 'text-[#C5A46D] font-bold' : 'text-[#F6F1E9]/50 group-hover:text-[#F6F1E9]'
                  }`}
                >
                  {chap.num}
                </span>
                <span
                  className={`block transition-all duration-300 ${
                    isActive
                      ? 'w-8 h-[2px] bg-[#C5A46D]'
                      : 'w-3 h-[1px] bg-[#F6F1E9]/30 group-hover:w-5 group-hover:bg-[#C5A46D]/60'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* FIVE CINEMATIC STORYTELLING SECTIONS (ULTRA-FLUID TEXT)   */}
        {/* ========================================================= */}

        {/* SECTION 01 — THE BRAND REVEAL */}
        <div
          className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-28 z-10"
          style={style1}
        >
          <div className="max-w-2xl text-left">
            {/* Headline */}
            <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#F6F1E9] leading-[1.05] mb-8 [text-wrap:balance]">
              L’ÉLÉGANCE A UNE SIGNATURE.
            </h1>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => jumpToChapter(1)}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-[#641D32] hover:bg-[#7e253f] text-[#F6F1E9] text-xs uppercase tracking-[0.22em] font-medium transition-all shadow-lg hover:shadow-2xl"
              >
                <span>Découvrir notre univers</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#C5A46D]" />
              </button>

              <a
                href={createWhatsAppLink(WHATSAPP_MESSAGES.general, customWhatsAppNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#C5A46D]/40 hover:border-[#C5A46D] bg-[#291A17]/60 hover:bg-[#291A17]/90 text-[#F6F1E9] text-xs uppercase tracking-[0.2em] transition-all backdrop-blur-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#C5A46D]" />
                <span>Nous contacter</span>
              </a>
            </div>
          </div>
        </div>

        {/* SECTION 02 — THE ART OF CRAFTSMANSHIP */}
        <div
          className="absolute inset-0 flex flex-col justify-center items-end px-6 sm:px-12 md:px-20 lg:px-28 z-10"
          style={style2}
        >
          <div className="max-w-xl text-right">
            {/* Headline */}
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#F6F1E9] leading-[1.1] mb-8 [text-wrap:balance]">
              CHAQUE DÉTAIL RACONTE UNE HISTOIRE.
            </h2>

            <div className="inline-flex items-center gap-6 py-3.5 px-5 bg-[#191715]/40 backdrop-blur-sm border border-[#C5A46D]/25 text-left text-xs text-[#F6F1E9]/80">
              <div>
                <span className="text-[#C5A46D] font-mono block text-sm font-semibold">45H+</span>
                <span className="text-[11px] tracking-wider uppercase text-[#F6F1E9]/60">Broderie d’Or</span>
              </div>
              <div className="w-px h-8 bg-[#C5A46D]/20" />
              <div>
                <span className="text-[#C5A46D] font-mono block text-sm font-semibold">100%</span>
                <span className="text-[11px] tracking-wider uppercase text-[#F6F1E9]/60">Bazin Teinté Main</span>
              </div>
              <div className="w-px h-8 bg-[#C5A46D]/20" />
              <div>
                <span className="text-[#C5A46D] font-mono block text-sm font-semibold">Bamako</span>
                <span className="text-[11px] tracking-wider uppercase text-[#F6F1E9]/60">Atelier d’Art</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 03 — CUSTOM-MADE CREATIONS */}
        <div
          className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-28 z-10"
          style={style3}
        >
          <div className="max-w-xl text-left bg-[#191715]/50 backdrop-blur-md p-6 sm:p-10 border border-[#C5A46D]/25 shadow-2xl">
            {/* Headline */}
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#F6F1E9] leading-[1.1] mb-8 [text-wrap:balance]">
              VOTRE STYLE. VOTRE SIGNATURE.
            </h2>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={createWhatsAppLink(WHATSAPP_MESSAGES.custom, customWhatsAppNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#C5A46D] hover:bg-[#d8b982] text-[#191715] text-xs uppercase tracking-[0.22em] font-semibold transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-[#191715]" />
                <span>Commander une création</span>
              </a>
            </div>
          </div>
        </div>

        {/* SECTION 04 — READY-TO-WEAR COLLECTION */}
        <div
          className="absolute inset-0 flex flex-col justify-center items-end px-6 sm:px-12 md:px-20 lg:px-28 z-10"
          style={style4}
        >
          <div className="max-w-xl text-right bg-[#291A17]/70 backdrop-blur-md p-6 sm:p-10 border border-[#C5A46D]/25 shadow-2xl">
            {/* Headline */}
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#F6F1E9] leading-[1.1] mb-8 [text-wrap:balance]">
              LE RAFFINEMENT, AU QUOTIDIEN.
            </h2>

            {/* CTA */}
            <div className="flex flex-wrap items-center justify-end gap-4">
              <button
                onClick={onExploreCollections}
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#641D32] hover:bg-[#7e253f] text-[#F6F1E9] text-xs uppercase tracking-[0.22em] font-medium transition-all shadow-lg"
              >
                <span>Découvrir la collection</span>
                <ArrowRight className="w-4 h-4 text-[#C5A46D]" />
              </button>

              <a
                href={createWhatsAppLink(WHATSAPP_MESSAGES.readyToWear, customWhatsAppNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 border border-[#C5A46D]/40 text-[#C5A46D] hover:bg-[#C5A46D]/10 text-xs uppercase tracking-[0.2em] transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Discuter en direct</span>
              </a>
            </div>
          </div>
        </div>

        {/* SECTION 05 — THE FINAL BRAND STATEMENT */}
        <div
          className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 sm:px-12 md:px-20 z-10"
          style={style5}
        >
          <div className="max-w-3xl">
            {/* Brand Signature Monogram */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-[#C5A46D]/60 bg-[#291A17]/90 mb-6 text-[#C5A46D] font-editorial text-2xl shadow-xl">
              BC
            </div>

            {/* Headline */}
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#F6F1E9] leading-[1.05] mb-6 [text-wrap:balance]">
              PORTEZ L’EXCEPTION.
            </h2>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl md:text-2xl text-[#F6F1E9]/90 font-light leading-relaxed max-w-xl mx-auto mb-10">
              Votre élégance mérite une création unique. Confiez-nous votre prochaine tenue.
            </p>

            {/* Actions: Primary & Secondary CTA */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-12">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 bg-[#C5A46D] hover:bg-[#d8b982] text-[#191715] text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold transition-all shadow-2xl hover:scale-105"
              >
                <Calendar className="w-4 h-4 text-[#191715]" />
                <span>PRENDRE RENDEZ-VOUS</span>
              </button>

              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 border border-[#C5A46D]/50 hover:border-[#C5A46D] bg-[#291A17]/70 hover:bg-[#291A17] text-[#F6F1E9] text-xs sm:text-sm uppercase tracking-[0.25em] transition-all backdrop-blur-sm"
              >
                <span>NOUS CONTACTER</span>
              </button>
            </div>

            {/* Brand Signature */}
            <div className="pt-8 border-t border-[#C5A46D]/20">
              <span className="font-editorial text-xl sm:text-2xl text-[#C5A46D] tracking-widest block mb-1">
                BAMAKO COUTURE
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#F6F1E9]/60 font-light">
                L’ART DE SUBLIMER L’ÉLÉGANCE AFRICAINE
              </span>
            </div>
          </div>
        </div>

        {/* Global Bottom Progress Bar across the 520vh */}
        <div className="absolute bottom-0 inset-x-0 h-[3px] bg-[#191715]/40 z-20">
          <div
            className="h-full bg-gradient-to-r from-[#641D32] via-[#C5A46D] to-[#F6F1E9]"
            style={{ width: `${(smoothProgress * 100).toFixed(1)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
