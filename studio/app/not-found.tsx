import type { Metadata } from "next";
import { NotFoundScreen } from "@/components/NotFoundScreen";
import { site } from "@/content";

export const metadata: Metadata = {
  title: `Page not found - ${site.name}`,
  description: "This URL took a wrong turn. The studio did not.",
};

export default function NotFound() {
  return (
    <main id="main">
      <NotFoundScreen />
    </main>
  );
}
