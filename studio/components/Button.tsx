import type { MouseEventHandler, ReactNode } from "react";
import Link from "next/link";
import { cx } from "@/lib/cx";
import styles from "./Button.module.css";

type Variant = "violet" | "black" | "white" | "grey" | "lime";
type Size = "md" | "lg" | "icon";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  compact?: boolean;
  className?: string;
  external?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  ariaLabel?: string;
  ariaExpanded?: boolean;
};

export function Button({
  href,
  children,
  variant = "violet",
  size = "md",
  compact,
  className,
  external,
  onClick,
  ariaLabel,
  ariaExpanded,
}: ButtonProps) {
  const classNames = cx(
    styles.button,
    styles[variant],
    styles[size],
    compact && styles.compact,
    className,
  );

  const inner = <span className={styles.inner}>{children}</span>;

  if (href) {
    const internal = !external && (href.startsWith("/") || href.startsWith("#"));
    if (internal) {
      return (
        <Link
          href={href}
          className={classNames}
          onClick={onClick}
          aria-label={ariaLabel}
        >
          {inner}
        </Link>
      );
    }

    return (
      <a
        href={href}
        className={classNames}
        onClick={onClick}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classNames}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
    >
      {inner}
    </button>
  );
}
