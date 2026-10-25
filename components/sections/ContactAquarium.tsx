"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import styles from "./ContactAquarium.module.css";

export default function ContactAquarium() {
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = video.current;
    const region = container.current;
    if (!element || !region) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const syncPlayback = () => {
      if (visible && !paused && !failed && !reducedMotion.matches && !document.hidden) {
        // Autoplay can be blocked by device settings. Keep the poster and play button available.
        void element.play().catch(() => {});
      } else {
        element.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.05 });
    observer.observe(region);
    reducedMotion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      element.pause();
    };
  }, [paused, failed]);

  function togglePlayback() {
    const shouldPause = playing && !paused;
    setPaused(shouldPause);
    if (shouldPause) video.current?.pause();
    else void video.current?.play().catch(() => {});
  }

  return (
    <>
      <div ref={container} className={styles.aquarium} data-aquarium data-paused={paused} aria-hidden="true">
        <video
          ref={video}
          className={styles.video}
          data-ready={ready && !failed}
          src="/contact/aquarium-real.mp4"
          poster="/contact/aquarium-poster.webp"
          width={960}
          height={540}
          preload="none"
          muted
          loop
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
          onPlaying={() => { setReady(true); setPlaying(true); }}
          onPause={() => setPlaying(false)}
          onError={() => { setFailed(true); setReady(false); setPlaying(false); }}
        />
      </div>
      {!failed && (
        <button type="button" className={styles.toggle} onClick={togglePlayback} aria-label={playing ? "Pause aquarium animation" : "Play aquarium animation"} aria-pressed={paused}>
          {playing ? <Pause size={13} aria-hidden /> : <Play size={13} aria-hidden />}
          <span>{playing ? "Pause aquarium" : "Play aquarium"}</span>
        </button>
      )}
    </>
  );
}
