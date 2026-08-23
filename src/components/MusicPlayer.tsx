"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // On mobile, iOS blocks preload. We manually trigger load on mount
  // so audio is buffered by the time user taps play.
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.25;
      // Trigger the browser to start fetching audio data immediately
      audioRef.current.load();
    }
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);

    // On iOS, audio.readyState may be 0 (HAVE_NOTHING). We wait for canplay.
    const tryPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Playback failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (audio.readyState >= 2) {
      // Already loaded enough — play immediately
      await tryPlay();
    } else {
      // Wait for it to load
      const onCanPlay = async () => {
        audio.removeEventListener("canplay", onCanPlay);
        await tryPlay();
      };
      audio.addEventListener("canplay", onCanPlay);
      // Fallback: if canplay never fires within 5s, try anyway
      setTimeout(async () => {
        audio.removeEventListener("canplay", onCanPlay);
        await tryPlay();
      }, 5000);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        playsInline
        x-webkit-airplay="allow"
      >
        {/* Serve small mobile version first for quick loading on phones */}
        {isMobile ? (
          <>
            <source src="/audio/bgm_mobile.mp3" type="audio/mpeg" />
            <source src="/audio/bgm.mp3" type="audio/mpeg" />
          </>
        ) : (
          <>
            <source src="/audio/bgm.mp3" type="audio/mpeg" />
            <source src="/audio/bgm.webm" type="audio/webm" />
          </>
        )}
      </audio>

      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleMusic}
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#000000]/80 backdrop-blur-md border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#000000] transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]"
          aria-label={isPlaying ? "Pause Music" : "Play Music"}
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-[#D4AF37] border-t-transparent rounded-full"
              />
            ) : isPlaying ? (
              <motion.div
                key="pause"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Volume2 size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <VolumeX size={20} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sound waves animation when playing */}
          {isPlaying && (
            <div className="absolute -inset-2 rounded-full border border-[#D4AF37]/30 animate-[ping_3s_ease-in-out_infinite]" />
          )}
        </button>
      </div>
    </>
  );
}
