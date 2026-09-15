import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { site } from "@/content";

export const metadata: Metadata = {
  title: `Start a project - ${site.name}`,
  description:
    "Tell me what you are trying to ship. If it is a fit, I will send a simple next step.",
};

export default function ContactPage() {
  return (
    <>
      <main id="main">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
