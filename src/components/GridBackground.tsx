'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const mouse = { x: width * 0.7, y: height * 0.4 };
    const drift = { x: 0, y: 0 };
    let animId = 0;
    let paused = false;

    const isMobile = isTouchDevice;

    const GRID_SIZE = 80;
    const NODE_RADIUS = 1.2;
    const PROXIMITY_RADIUS = 150;

    // Blueprint reveal progress (0 -> 1)
    const reveal = { value: 0 };
    gsap.to(reveal, {
      value: 1,
      duration: 1.5,
      ease: 'power2.inOut',
    });

    // --- Autonomous node for mobile ---
    const autoNode = {
      x: Math.round(width / 2 / GRID_SIZE) * GRID_SIZE,
      y: Math.round(height / 2 / GRID_SIZE) * GRID_SIZE,
      targetX: 0,
      targetY: 0,
      paused: false,
      pauseTimer: 0,
      direction: 0, // 0=right 1=down 2=left 3=up
    };
    autoNode.targetX = autoNode.x;
    autoNode.targetY = autoNode.y;

    const pickNextTarget = () => {
      const dir = Math.floor(Math.random() * 4);
      autoNode.direction = dir;
      const steps = Math.floor(Math.random() * 3) + 1;
      const dx = [GRID_SIZE, 0, -GRID_SIZE, 0][dir];
      const dy = [0, GRID_SIZE, 0, -GRID_SIZE][dir];
      autoNode.targetX = autoNode.x + dx * steps;
      autoNode.targetY = autoNode.y + dy * steps;
      autoNode.paused = false;
    };
    pickNextTarget();

    // --- Touch tracking ---
    const touchPos = { x: -999, y: -999, active: false };
    const touchTrails: { x: number; y: number; alpha: number }[] = [];

    // --- Gyroscope — drives illumination source on mobile ---
    const gyro = { x: width * 0.5, y: height * 0.4 };
    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma: -90..90 (left/right tilt), beta: 0..180 (front/back tilt)
        const targetX = ((e.gamma + 45) / 90) * width;
        const targetY = ((e.beta - 20) / 120) * height;
        gsap.to(gyro, {
          x: Math.max(0, Math.min(width, targetX)),
          y: Math.max(0, Math.min(height, targetY)),
          duration: 1.2,
          ease: 'power2.out',
          overwrite: true,
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const onMouse = (e: MouseEvent) => {
      const cx = width / 2;
      const cy = height / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      gsap.to(drift, {
        x: dx * -4,
        y: dy * -4,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: true,
      });
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      touchPos.x = t.clientX;
      touchPos.y = t.clientY;
      touchPos.active = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      touchPos.x = t.clientX;
      touchPos.y = t.clientY;
      touchPos.active = true;
      touchTrails.push({ x: t.clientX, y: t.clientY, alpha: 0.15 });
      if (touchTrails.length > 20) touchTrails.shift();
    };

    const onTouchEnd = () => {
      touchPos.active = false;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.save();

      // Parallax: small gyro drift on mobile, mouse drift on desktop
      if (isMobile) {
        const parallaxX = (gyro.x - width / 2) / width * -4;
        const parallaxY = (gyro.y - height / 2) / height * -4;
        ctx.translate(parallaxX, parallaxY);
      } else {
        ctx.translate(drift.x, drift.y);
      }

      const cols = Math.ceil((width + 80) / GRID_SIZE) + 1;
      const rows = Math.ceil((height + 80) / GRID_SIZE) + 1;
      const centerX = width / 2;
      const centerY = height / 2;
      const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);

      // Smooth radius-based reveal: expands from center
      const revealRadius = reveal.value * maxDist * 1.2;
      const REVEAL_SOFTNESS = 60;

      // Active illumination source: mouse on desktop, gyro/touch on mobile
      const illumX = isMobile
        ? (touchPos.active ? touchPos.x : gyro.x)
        : mouse.x;
      const illumY = isMobile
        ? (touchPos.active ? touchPos.y : gyro.y)
        : mouse.y;

      ctx.lineWidth = 1;

      // Vertical lines
      for (let i = 0; i < cols; i++) {
        const x = i * GRID_SIZE;
        const lineDist = Math.abs(x - centerX);

        // Smoothstep fade at the reveal edge
        const edgeFade = revealRadius - lineDist;
        const revealAlpha = edgeFade <= 0 ? 0 : Math.min(1, edgeFade / REVEAL_SOFTNESS);
        if (revealAlpha <= 0) continue;

        const drawLen = height * revealAlpha;
        const startY = centerY - drawLen / 2;
        const endY = centerY + drawLen / 2;

        const d = Math.abs(illumX - x);
        const proxAlpha = d < PROXIMITY_RADIUS
          ? 0.05 + 0.10 * (1 - d / PROXIMITY_RADIUS)
          : 0.05;

        ctx.strokeStyle = `rgba(255, 255, 255, ${proxAlpha * revealAlpha})`;
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x, endY);
        ctx.stroke();
      }

      // Horizontal lines
      for (let j = 0; j < rows; j++) {
        const y = j * GRID_SIZE;
        const lineDist = Math.abs(y - centerY);

        const edgeFade = revealRadius - lineDist;
        const revealAlpha = edgeFade <= 0 ? 0 : Math.min(1, edgeFade / REVEAL_SOFTNESS);
        if (revealAlpha <= 0) continue;

        const drawLen = width * revealAlpha;
        const startX = centerX - drawLen / 2;
        const endX = centerX + drawLen / 2;

        const d = Math.abs(illumY - y);
        const proxAlpha = d < PROXIMITY_RADIUS
          ? 0.05 + 0.10 * (1 - d / PROXIMITY_RADIUS)
          : 0.05;

        ctx.strokeStyle = `rgba(255, 255, 255, ${proxAlpha * revealAlpha})`;
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
        ctx.stroke();
      }

      // Intersection nodes
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * GRID_SIZE;
          const y = j * GRID_SIZE;

          const lineDistX = Math.abs(x - centerX);
          const lineDistY = Math.abs(y - centerY);
          const edgeFadeX = revealRadius - lineDistX;
          const edgeFadeY = revealRadius - lineDistY;
          const progressX = edgeFadeX <= 0 ? 0 : Math.min(1, edgeFadeX / REVEAL_SOFTNESS);
          const progressY = edgeFadeY <= 0 ? 0 : Math.min(1, edgeFadeY / REVEAL_SOFTNESS);
          const nodeAlpha = Math.min(progressX, progressY);
          if (nodeAlpha <= 0) continue;

          const ddx = illumX - x;
          const ddy = illumY - y;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy);

          if (dist < PROXIMITY_RADIUS) {
            const t = 1 - dist / PROXIMITY_RADIUS;
            const radius = NODE_RADIUS + t * 2;
            const alpha = (0.06 + t * 0.19) * nodeAlpha;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200, 182, 162, ${alpha})`;
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.arc(x, y, NODE_RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${0.04 * nodeAlpha})`;
            ctx.fill();
          }
        }
      }

      // Touch trails (mobile)
      if (isMobile) {
        for (let k = touchTrails.length - 1; k >= 0; k--) {
          const trail = touchTrails[k];
          trail.alpha *= 0.94;
          if (trail.alpha < 0.01) {
            touchTrails.splice(k, 1);
            continue;
          }
          const glow = ctx.createRadialGradient(trail.x, trail.y, 0, trail.x, trail.y, PROXIMITY_RADIUS * 0.5);
          glow.addColorStop(0, `rgba(200, 182, 162, ${trail.alpha})`);
          glow.addColorStop(1, 'rgba(200, 182, 162, 0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(trail.x, trail.y, PROXIMITY_RADIUS * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Mouse / touch / gyro glow
      {
        const glow = ctx.createRadialGradient(illumX, illumY, 0, illumX, illumY, PROXIMITY_RADIUS * 0.8);
        glow.addColorStop(0, 'rgba(200, 182, 162, 0.04)');
        glow.addColorStop(1, 'rgba(200, 182, 162, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(illumX, illumY, PROXIMITY_RADIUS * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Autonomous node (mobile only)
      if (isMobile) {
        // Move toward target
        if (!autoNode.paused) {
          const tdx = autoNode.targetX - autoNode.x;
          const tdy = autoNode.targetY - autoNode.y;
          const dist = Math.sqrt(tdx * tdx + tdy * tdy);
          if (dist < 2) {
            autoNode.x = autoNode.targetX;
            autoNode.y = autoNode.targetY;
            autoNode.paused = true;
            autoNode.pauseTimer = Date.now() + 1200 + Math.random() * 2000;
          } else {
            const speed = 0.4;
            autoNode.x += (tdx / dist) * speed;
            autoNode.y += (tdy / dist) * speed;
          }
        } else if (Date.now() > autoNode.pauseTimer) {
          pickNextTarget();
        }

        // Draw autonomous node glow
        const aGlow = ctx.createRadialGradient(
          autoNode.x, autoNode.y, 0,
          autoNode.x, autoNode.y, PROXIMITY_RADIUS * 0.6
        );
        aGlow.addColorStop(0, 'rgba(200, 182, 162, 0.06)');
        aGlow.addColorStop(1, 'rgba(200, 182, 162, 0)');
        ctx.fillStyle = aGlow;
        ctx.beginPath();
        ctx.arc(autoNode.x, autoNode.y, PROXIMITY_RADIUS * 0.6, 0, Math.PI * 2);
        ctx.fill();

        // Bright dot at node
        ctx.beginPath();
        ctx.arc(autoNode.x, autoNode.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200, 182, 162, 0.35)';
        ctx.fill();
      }

      ctx.restore();
      if (!paused) animId = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      if (document.hidden) {
        paused = true;
      } else {
        paused = false;
        animId = requestAnimationFrame(draw);
      }
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouse);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    if (isMobile && typeof DeviceOrientationEvent !== 'undefined') {
      // iOS 13+ requires permission
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        (DeviceOrientationEvent as any).requestPermission()
          .then((state: string) => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', onOrientation);
            }
          })
          .catch(() => {});
      } else {
        window.addEventListener('deviceorientation', onOrientation);
      }
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('deviceorientation', onOrientation);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
      suppressHydrationWarning
    />
  );
}
