import { cx } from "@/lib/cx";
import styles from "./PillTag.module.css";

type PillTagProps = {
  children: React.ReactNode;
  tone?: "grey" | "lime" | "violet";
  size?: "s" | "m";
  className?: string;
};

export function PillTag({
  children,
  tone = "grey",
  size = "m",
  className,
}: PillTagProps) {
  return (
    <span className={cx(styles.pill, styles[tone], styles[size], className)}>
      {children}
    </span>
  );
}
