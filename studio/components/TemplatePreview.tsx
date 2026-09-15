"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";
import styles from "./TemplatePreview.module.css";

const widths = [
  { id: "desktop", label: "Desktop" },
  { id: "tablet", label: "Tablet" },
  { id: "phone", label: "Phone" },
] as const;

type WidthId = (typeof widths)[number]["id"];

const native = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 834, height: 1112 },
  phone: { width: 390, height: 844 },
} as const;

type TemplatePreviewProps = {
  src: string;
  title: string;
  fill?: boolean;
};

export function TemplatePreview({ src, title, fill }: TemplatePreviewProps) {
  const [width, setWidth] = useState<WidthId>("desktop");
  const [ready, setReady] = useState(false);
  const [full, setFull] = useState(false);
  const [fullReady, setFullReady] = useState(false);
  const [scale, setScale] = useState(0);
  const screenRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const size = native[width];

  useEffect(() => {
    setReady(false);
    const fallback = window.setTimeout(() => setReady(true), 800);
    return () => window.clearTimeout(fallback);
  }, [src, width]);

  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;

    const update = () => {
      const next = Math.min(
        el.clientWidth / size.width,
        el.clientHeight / size.height,
      );
      setScale(Number.isFinite(next) && next > 0 ? next : 0);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [size.height, size.width, width]);

  useEffect(() => {
    if (!full) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    closeRef.current?.focus();
  }, [full]);

  function openFull() {
    setFullReady(false);
    setFull(true);
  }

  function closeFull() {
    dialogRef.current?.close();
    setFull(false);
  }

  return (
    <div className={cx(styles.wrap, fill && styles.fill)}>
      <div className={styles.toolbar}>
        <div className={styles.devices} role="group" aria-label="Preview device">
          {widths.map((option) => (
            <button
              key={option.id}
              type="button"
              className={cx(
                styles.widthBtn,
                width === option.id && styles.widthOn,
              )}
              aria-pressed={width === option.id}
              onClick={() => setWidth(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <button type="button" className={styles.fullBtn} onClick={openFull}>
          Full screen
        </button>
      </div>
      <div className={cx(styles.viewport, styles[width])}>
        <div className={styles.device}>
          <div className={styles.lid}>
            <span className={styles.camera} aria-hidden="true" />
            <span className={styles.island} aria-hidden="true" />
            <div className={styles.screen} ref={screenRef}>
              {!ready ? (
                <p className={styles.loading} aria-live="polite">
                  Loading preview
                </p>
              ) : null}
              <div
                className={styles.scaler}
                style={{
                  width: size.width,
                  height: size.height,
                  transform: `scale(${scale})`,
                }}
              >
                <iframe
                  key={`${src}-${width}`}
                  src={src}
                  title={`${title} live preview`}
                  className={styles.iframe}
                  width={size.width}
                  height={size.height}
                  onLoad={() => setReady(true)}
                />
              </div>
            </div>
            <span className={styles.home} aria-hidden="true" />
          </div>
          <div className={styles.hinge} aria-hidden="true" />
          <div className={styles.base} aria-hidden="true">
            <span className={styles.lip} />
          </div>
        </div>
      </div>

      {full ? (
        <dialog
          ref={dialogRef}
          className={styles.dialog}
          aria-label={`${title} full screen`}
          onClose={() => setFull(false)}
          onCancel={(event) => {
            event.preventDefault();
            closeFull();
          }}
        >
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            onClick={closeFull}
          >
            Close
          </button>
          {!fullReady ? (
            <p className={styles.fullLoading} aria-live="polite">
              Loading preview
            </p>
          ) : null}
          <iframe
            src={src}
            title={`${title} full screen`}
            className={styles.fullFrame}
            onLoad={() => setFullReady(true)}
          />
        </dialog>
      ) : null}
    </div>
  );
}
