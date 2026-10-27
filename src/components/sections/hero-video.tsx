"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/hooks";

const POSTER = "/cat-poster.webp";

export function HeroVideo() {
  const reduceMotion = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduceMotion) video.pause();
    else video.play().catch(() => {});
  }, [reduceMotion, isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={POSTER}
        aria-hidden
        className="absolute inset-0 size-full object-cover motion-reduce:hidden"
      >
        <source src="/cat.webm" type="video/webm" />
        <source src="/cat.mp4" type="video/mp4" />
      </video>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={POSTER}
        alt=""
        width={320}
        height={320}
        className="absolute inset-0 hidden size-full object-cover motion-reduce:block"
      />
    </>
  );
}
