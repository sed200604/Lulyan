import { useState, useEffect, useRef, useCallback } from 'react';

// ═══════════════════════════════════════════
// HOOK — GESTION VIDÉO INTELLIGENTE
// ═══════════════════════════════════════════

export function useHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'playing' | 'error'>('loading');
  const [canAutoplay, setCanAutoplay] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Quand la vidéo est prête
    const handleCanPlay = () => {
      setState('ready');
      setCanAutoplay(true);
      // On tente de la jouer dès qu'elle est prête
      video.play().catch(() => {
        setCanAutoplay(false);
        setState('error');
      });
    };

    // Quand la vidéo joue
    const handlePlaying = () => {
      setState('playing');
    };

    // Erreur de chargement
    const handleError = () => {
      setState('error');
      setCanAutoplay(false);
    };

    video.addEventListener('canplaythrough', handleCanPlay);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('error', handleError);

    // Essayer de charger/jouer immédiatement si déjà prête
    if (video.readyState >= 3) {
      handleCanPlay();
    }

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('error', handleError);
    };
  }, []);

  const play = useCallback(async () => {
    try {
      if (videoRef.current) {
        await videoRef.current.play();
      }
    } catch {
      setState('error');
    }
  }, []);

  return { videoRef, state, canAutoplay, play };
}
