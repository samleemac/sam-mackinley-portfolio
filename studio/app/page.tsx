import dynamic from "next/dynamic";
import { Audiences } from "@/components/Audiences";
import { Collaborate } from "@/components/Collaborate";
import { CtaPair } from "@/components/CtaPair";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Plans } from "@/components/Plans";
import { Process } from "@/components/Process";
import { ProofStrip } from "@/components/ProofStrip";
import { Services } from "@/components/Services";
import { Templates } from "@/components/Templates";
import { Work } from "@/components/Work";
import { getTemplates, toTemplateCard } from "@/lib/templates";

const Quote = dynamic(
  () => import("@/components/Quote").then((mod) => mod.Quote),
  { ssr: true },
);

export default function HomePage() {
  const templates = getTemplates().map(toTemplateCard);

  return (
    <>
      <main id="main">
        <div className="container">
          <Hero />
        </div>
        <ProofStrip />
        <Work />
        <Templates templates={templates} />
        <Audiences />
        <Services />
        <Process />
        <Plans />
        <Quote />
        <Collaborate />
        <FAQ />
        <CtaPair />
      </main>
      <Footer />
    </>
  );
}
