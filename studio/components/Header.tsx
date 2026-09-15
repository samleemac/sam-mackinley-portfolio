"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/content";
import { cx } from "@/lib/cx";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef(false);
  openRef.current = open;

  function close() {
    setOpen(false);
  }

  function toggle() {
    setOpen((value) => !value);
  }

  useEffect(() => {
    const root = document.documentElement;
    const main = document.getElementById("main");
    const footer = document.querySelector("footer");

    root.toggleAttribute("data-nav-open", open);

    if (open) {
      main?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
      menuBtnRef.current?.focus();
    } else {
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    }

    return () => {
      root.removeAttribute("data-nav-open");
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [open]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (!openRef.current) return;

      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        menuBtnRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;
      const header = headerRef.current;
      if (!header) return;
      const nodes = [
        ...header.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ].filter((node) => node.tabIndex !== -1 && !node.hasAttribute("inert"));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    close();
  }, [pathname]);

  function itemHref(href: string) {
    if (href.startsWith("http")) return href;
    if (href.startsWith("#") && pathname !== "/") return `/${href}`;
    return href;
  }

  if (/^\/templates\/[^/]+$/.test(pathname)) {
    return null;
  }

  return (
    <header ref={headerRef} className={cx(styles.header, open && styles.open)}>
      <button
        type="button"
        className={styles.backdrop}
        tabIndex={-1}
        aria-hidden="true"
        onClick={close}
      />
      <div className={styles.contain}>
        <div className={styles.island}>
          <div className={styles.blur} aria-hidden="true">
            <span className={styles.blurStrong} />
            <span className={styles.blurSoft} />
          </div>
          <div className={styles.bar}>
            <button
              ref={menuBtnRef}
              type="button"
              className={styles.menuBtn}
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={toggle}
            >
              <span className={styles.menuLabel} aria-hidden="true">
                {open ? "Close" : "Menu"}
              </span>
              <span className={styles.menuIcon} aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
            <Link href="/" className={styles.logo} onClick={close}>
              {site.shortName}
            </Link>
            <Link href="/contact" className={styles.cta} onClick={close} aria-label="Start a project">
              <span className={styles.ctaFull}>Start a project</span>
              <span className={styles.ctaShort}>Start</span>
            </Link>
          </div>
          <div className={styles.body}>
            <nav
              id={menuId}
              className={styles.panel}
              aria-label="Primary"
              aria-hidden={!open}
            >
              <ul className={styles.list}>
                {nav.map((item) => {
                  const href = itemHref(item.href);
                  const external = href.startsWith("http");
                  const className = styles.link;
                  const props = {
                    className,
                    onClick: close,
                    tabIndex: open ? 0 : -1,
                    ...(external
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {}),
                  } as const;
                  return (
                    <li key={item.href}>
                      {external ? (
                        <a href={href} {...props}>
                          {item.label}
                        </a>
                      ) : (
                        <Link href={href} {...props}>
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
