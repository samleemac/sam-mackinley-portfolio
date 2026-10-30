import dynamic from "next/dynamic";
import { Audiences } from "@/components/Audiences";
import { Collaborate } from "@/components/Collaborate";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Plans } from "@/components/Plans";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";

const Quote = dynamic(
  () => import("@/components/Quote").then((mod) => mod.Quote),
  { ssr: true },
);

// Ordered as a buyer's questions, in the order they ask them:
// what is it → can he do it → is it for me → what do I get → how is it to
// work with him → do people like him → what does it cost → when would I
// have it → what's the catch → start (footer).
export default function HomePage() {
  return (
    <>
      <main id="main">
        <div className="container">
          <Hero />
        </div>
        <Work />
        <Audiences />
        <Services />
        <Collaborate />
        <Quote />
        <Plans />
        <Process />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
