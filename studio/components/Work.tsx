"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PillTag } from "@/components/PillTag";
import { work } from "@/content";
import { cx } from "@/lib/cx";
import styles from "./Work.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ratioClass = {
  portrait: styles.portrait,
  square: styles.square,
  portraitHigh: styles.portraitHigh,
  landscape: styles.landscape,
  wide: styles.wide,
} as const;

const strip = [...work, ...work];
const AUTOPLAY = 0.022;
const SCROLL_TRAVEL = 0.45;

type Motion = {
  auto: number;
  drag: number;
  vel: number;
  scroll: number;
  loop: number;
  progress: number;
  inView: boolean;
};

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const motionRef = useRef<Motion>({
    auto: 0,
    drag: 0,
    vel: 0,
    scroll: 0,
    loop: 0,
    progress: 0,
    inView: true,
  });
  const dragRef = useRef({
    active: false,
    moved: false,
    startX: 0,
    originDrag: 0,
    pointerId: -1,
    lastX: 0,
    lastT: 0,
  });
  const pausedRef = useRef(false);
  const resumeTimer = useRef(0);
  const userPausedRef = useRef(false);
  const [touchUi, setTouchUi] = useState(false);
  const [tapped, setTapped] = useState<number | null>(null);
  const [userPaused, setUserPaused] = useState(false);
  userPausedRef.current = userPaused;

  function pause(resumeAfter?: number) {
    pausedRef.current = true;
    window.clearTimeout(resumeTimer.current);
    if (resumeAfter != null) {
      resumeTimer.current = window.setTimeout(() => {
        pausedRef.current = false;
      }, resumeAfter);
    }
  }

  function resume() {
    window.clearTimeout(resumeTimer.current);
    if (!dragRef.current.active) pausedRef.current = false;
  }

  useLayoutEffect(() => {
    const media = window.matchMedia("(hover: none)");
    const sync = () => setTouchUi(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const motion = motionRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      userPausedRef.current = true;
      setUserPaused(true);
    }

    const travel = window.matchMedia("(width <= 1024px)").matches
      ? 0.28
      : SCROLL_TRAVEL;

    const measure = () => {
      const items = track.children;
      let width = 0;
      for (let i = 0; i < work.length; i++) {
        const item = items[i];
        if (item instanceof HTMLElement) width += item.offsetWidth;
      }
      motion.loop = width;
      if (!userPausedRef.current) {
        motion.scroll = motion.progress * width * travel;
      }
    };

    measure();
    const first = track.children[0];
    if (first instanceof HTMLElement) {
      motion.auto = first.offsetWidth * 0.38;
    }

    const apply = () => {
      const loop = motion.loop;
      let x = motion.auto + motion.drag + motion.scroll;
      if (loop > 0) {
        x = ((x % loop) + loop) % loop;
      }
      track.style.transform = `translate3d(${-x}px, 0, 0)`;
    };

    apply();

    const io = new IntersectionObserver(
      ([entry]) => {
        motion.inView = entry.isIntersecting;
      },
      { rootMargin: "12% 0px", threshold: 0 },
    );
    io.observe(section);

    const ro = new ResizeObserver(measure);
    ro.observe(track);

    let ctx: gsap.Context | undefined;
    if (!reduced) {
      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 88%",
          end: "bottom 55%",
          scrub: 2,
          onUpdate: (self) => {
            if (userPausedRef.current) return;
            motion.progress = self.progress;
            motion.scroll = self.progress * motion.loop * travel;
          },
        });
      }, section);
    }

    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 48);
      last = now;
      const dragging = dragRef.current.active;
      if (
        !pausedRef.current &&
        !userPausedRef.current &&
        motion.inView &&
        !dragging &&
        !ScrollTrigger.isScrolling()
      ) {
        motion.auto += AUTOPLAY * dt;
      }
      if (!dragging && motion.vel !== 0) {
        motion.drag += motion.vel * (dt / 16.67);
        motion.vel *= Math.pow(0.92, dt / 16.67);
        if (Math.abs(motion.vel) < 0.06) motion.vel = 0;
      }
      apply();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      pause(900);
      motion.drag += event.deltaX;
      motion.vel = 0;
    };
    viewport.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      viewport.removeEventListener("wheel", onWheel);
      ctx?.revert();
      window.clearTimeout(resumeTimer.current);
    };
  }, []);

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    pause();
    dragRef.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      originDrag: motionRef.current.drag,
      pointerId: event.pointerId,
      lastX: event.clientX,
      lastT: event.timeStamp,
    };
    motionRef.current.vel = 0;
    viewport.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag.active) return;
    const delta = event.clientX - drag.startX;
    if (!drag.moved && Math.abs(delta) < 5) return;
    const viewport = viewportRef.current;
    if (!drag.moved) {
      drag.moved = true;
      viewport?.classList.add(styles.dragging);
    }
    motionRef.current.drag = drag.originDrag - delta;
    const step = event.timeStamp - drag.lastT;
    if (step > 0) {
      motionRef.current.vel = -((event.clientX - drag.lastX) / step) * 16.67;
    }
    drag.lastX = event.clientX;
    drag.lastT = event.timeStamp;
  }

  function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag.active) return;
    drag.active = false;
    const viewport = viewportRef.current;
    if (viewport && drag.pointerId === event.pointerId) {
      viewport.classList.remove(styles.dragging);
      try {
        viewport.releasePointerCapture(event.pointerId);
      } catch {
        /* already released */
      }
    }
    pause(1400);
    requestAnimationFrame(() => {
      drag.moved = false;
    });
  }

  return (
    <section
      ref={sectionRef}
      className={cx("global-section", styles.section)}
      aria-label="Work"
    >
      <div className={`container ${styles.intro}`}>
        <PillTag>Work</PillTag>
        <h2 className={`display-lg ${styles.heading}`}>Sites that shipped</h2>
        <p className="body-lg centered">
          Live client sites. Drag the rail, or let it run.
        </p>
        <button
          type="button"
          className={styles.pause}
          onClick={() => setUserPaused((paused) => !paused)}
          aria-pressed={userPaused}
        >
          {userPaused ? "Play strip" : "Pause strip"}
        </button>
      </div>
      <div
        ref={viewportRef}
        className={styles.scroller}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerEnter={() => pause()}
        onPointerLeave={() => resume()}
      >
        <ul ref={trackRef} className={styles.track}>
          {strip.map((item, index) => {
            const isClone = index >= work.length;
            return (
              <li
                key={`${item.title}-${index}`}
                className={cx(
                  styles.wrap,
                  ratioClass[item.ratio],
                  touchUi && styles.isMobile,
                  tapped === index && styles.isTapped,
                )}
                aria-hidden={isClone || undefined}
                onClick={() => {
                  if (touchUi) setTapped(index);
                }}
              >
                <article className={styles.card}>
                  <a
                    href={item.href}
                    className={styles.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    tabIndex={isClone ? -1 : undefined}
                    onClick={(event) => {
                      if (dragRef.current.moved) event.preventDefault();
                    }}
                  >
                    <span className="visually-hidden">Visit {item.title}</span>
                  </a>
                  <span className={styles.hoverCta} aria-hidden="true">
                    <span className={styles.viewPill}>View</span>
                  </span>
                  <div className={styles.content}>
                    <div className={styles.holder}>
                      <div className={styles.media}>
                        <div className={styles.image}>
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            sizes="(max-width: 1024px) 72vw, 580px"
                            draggable={false}
                            className={styles.img}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.footer}>
                      <div className={styles.text}>
                        <h3 className={styles.title}>{item.title}</h3>
                        <p className={styles.meta}>{item.meta}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
