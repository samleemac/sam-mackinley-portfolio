"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/Button";
import { NotFoundMesh } from "@/components/NotFoundMesh";
import { notFound, site } from "@/content";
import styles from "./NotFoundScreen.module.css";

export function NotFoundScreen() {
  const pathname = usePathname();
  const videoRef = useRef<HTMLVideoElement>(null);
  const looked = pathname && pathname !== "/" ? pathname : null;

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-lost", "");
    return () => root.removeAttribute("data-lost");
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seam = 0.06;
    let frame = 0;

    const playIfAllowed = () => {
      if (reduce.matches) {
        video.pause();
        return;
      }
      video.play().catch(() => {});
    };

    const stitch = () => {
      if (reduce.matches || !video.duration) return;
      if (video.currentTime >= video.duration - seam) {
        video.currentTime = seam;
      }
    };

    const onFrame = (_now: number, metadata: VideoFrameCallbackMetadata) => {
      if (video.duration && metadata.mediaTime >= video.duration - seam) {
        video.currentTime = seam;
      }
      frame = video.requestVideoFrameCallback(onFrame);
    };

    const onEnded = () => {
      video.currentTime = seam;
      playIfAllowed();
    };

    playIfAllowed();
    reduce.addEventListener("change", playIfAllowed);
    video.addEventListener("ended", onEnded);
    video.addEventListener("timeupdate", stitch);

    if ("requestVideoFrameCallback" in HTMLVideoElement.prototype) {
      frame = video.requestVideoFrameCallback(onFrame);
    }

    return () => {
      reduce.removeEventListener("change", playIfAllowed);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("timeupdate", stitch);
      if (frame && "cancelVideoFrameCallback" in video) {
        video.cancelVideoFrameCallback(frame);
      }
    };
  }, []);

  return (
    <section className={styles.screen} aria-labelledby="lost-title">
      <div className={styles.stage}>
        <NotFoundMesh>
          <Image
            src="/404/valley.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.still}
          />
          <video
            ref={videoRef}
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/studio/404/valley.webp"
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src="/studio/404/valley-loop.mp4" type="video/mp4" />
          </video>
        </NotFoundMesh>
      </div>

      <div className={styles.inner}>
        <h1 id="lost-title" className={styles.code} aria-label="404">
          <span className={styles.bloom} aria-hidden="true" />
          <span className={styles.digits} aria-hidden="true">
            <span className={styles.four}>4</span>
            <span className={styles.zero} />
            <span className={styles.four}>4</span>
          </span>
        </h1>

        <div className={styles.bottom}>
          <div className={styles.copy}>
            <p className={styles.lede}>
              {notFound.ledeLine1}
              <br />
              {notFound.ledeLine2}
            </p>
            {looked ? (
              <p className={styles.path}>
                {notFound.lookedFor}{" "}
                <span className={styles.route}>{looked}</span>
              </p>
            ) : null}
          </div>

          <div className={styles.actions}>
            <Button href="/" variant="violet" compact>
              {notFound.home}
            </Button>
            <a
              href={site.portfolioUrl}
              className={styles.work}
              target="_blank"
              rel="noreferrer noopener"
            >
              {notFound.work}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
