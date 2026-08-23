"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Attempt to autoplay, though browsers usually block this unless there's user interaction
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.2; // Soothing low volume
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.log("Autoplay blocked by browser. Waiting for user interaction.");
      }
    };
    
    // playAudio(); // Uncomment to try autoplay
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/bgm.mp3"
        loop
        preload="auto"
      />
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleMusic}
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#000000]/80 backdrop-blur-md border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#000000] transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]"
          aria-label={isPlaying ? "Pause Music" : "Play Music"}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
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
