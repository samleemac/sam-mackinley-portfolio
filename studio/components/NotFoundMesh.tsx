"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./NotFoundScreen.module.css";

export function NotFoundMesh({ children }: { children: ReactNode }) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let raf = 0;
    let running = true;
    let time = 0;

    function onPointer(event: PointerEvent) {
      target.x = event.clientX / window.innerWidth - 0.5;
      target.y = event.clientY / window.innerHeight - 0.5;
    }

    const frame = () => {
      if (!running) return;
      mouse.x += (target.x - mouse.x) * 0.05;
      mouse.y += (target.y - mouse.y) * 0.05;
      time += 0.0032;
      const driftX = Math.sin(time) * 0.9;
      const driftY = Math.cos(time * 0.72) * 0.6;
      const x = mouse.x * 2.2 + driftX;
      const y = mouse.y * 2.2 + driftY;
      layer.style.transform = `translate3d(${x}%, ${y}%, 0) scale(1.08)`;
      raf = requestAnimationFrame(frame);
    };

    function onVisibility() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    }

    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={layerRef} className={styles.drift}>
      {children}
    </div>
  );
}
