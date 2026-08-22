'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', callback);
      return () => mq.removeEventListener('change', callback);
    },
    () => window.matchMedia(query).matches,
    () => true,
  );
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(hover: none) and (pointer: coarse)');
  const [isHovering, setIsHovering] = useState(false);
  const mouse = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const spotlightPos = useRef({ x: -100, y: -100 });
  const raf = useRef(0);

  useEffect(() => {
    if (isMobile) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor-hover]')) {
        setIsHovering(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor-hover]')) {
        setIsHovering(false);
      }
    };

    // Single rAF loop — lerp dot toward mouse, spotlight trails further behind
    const tick = () => {
      const dx = mouse.current.x - dotPos.current.x;
      const dy = mouse.current.y - dotPos.current.y;
      dotPos.current.x += dx * 0.35;
      dotPos.current.y += dy * 0.35;

      const sx = mouse.current.x - spotlightPos.current.x;
      const sy = mouse.current.y - spotlightPos.current.y;
      spotlightPos.current.x += sx * 0.12;
      spotlightPos.current.y += sy * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x - 4}px, ${dotPos.current.y - 4}px)`;
      }
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate(${spotlightPos.current.x - 160}px, ${spotlightPos.current.y - 160}px)`;
      }

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      cancelAnimationFrame(raf.current);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div ref={spotlightRef} className="cursor-spotlight" />
      <div ref={dotRef} className={`cursor-dot ${isHovering ? 'is-hovering' : ''}`} />
    </>
  );
}
