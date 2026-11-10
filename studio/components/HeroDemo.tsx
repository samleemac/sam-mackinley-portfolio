"use client";

import Image from "next/image";
import { audiences, hero } from "@/content";
import { Stage } from "./stageshow/stage";
import { Window, Bar } from "./stageshow/window";
import { Roll } from "./stageshow/motion/Roll";
import { Follow } from "./stageshow/motion/Follow";
import { Tabs } from "./stageshow/controls/Tabs";
import type { Act } from "./stageshow/act";
import "./HeroDemo.css";

// The studio hero: a brief card answers "I run a…" and the browser shows the
// real site Sam built for that kind of business. The cursor walks every
// audience in turn; where an audience has two sites, it taps the second site's
// name in the card. Salons, the opening frame, is also the last beat, so the
// loop closes on a tap.
//
// Real strings: the eyebrow, the sentence, the audience picks, the site names,
// the address. The page under each hero shot is filler and fades out.

const host = (href: string) =>
  href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/(index\.html)?$/, "");

const groups = audiences.map((audience) => ({
  id: audience.id,
  label: audience.label,
  phrase: hero.demo.phrases[audience.id] ?? "an independent business",
  sites: audience.examples.map((example) => ({ ...example, host: host(example.href) })),
}));

type S = { aud: number; site: number };

// Every site after the opening one, then back to the opening one
const STEPS: S[] = [
  ...groups.flatMap((g, aud) => g.sites.map((_, site) => ({ aud, site }))).slice(1),
  { aud: 0, site: 0 },
];

async function script(a: Act<S>) {
  let at: S = { aud: 0, site: 0 };
  await a.wait(900);
  for (const [i, step] of STEPS.entries()) {
    const newAudience = step.aud !== at.aud;
    await a.move({ at: newAudience ? `pick-${step.aud}` : `site-${step.aud}-${step.site}`, x: 0.8, y: 0.62 });
    await a.wait(140);
    await a.click();
    await a.set(newAudience ? { aud: step.aud, site: 0 } : { site: step.site });
    at = step;
    await a.wait(420);
    await a.move("rest");
    await a.wait(i === STEPS.length - 1 ? 900 : 1500);
  }
}

const REST = { wide: { x: 648, y: 372 }, compact: { x: 340, y: 404 } };

export function HeroDemo() {
  return (
    <div
      className="hero-demo"
      role="img"
      aria-label={`A project brief stepping through ${groups.map((g) => g.label.toLowerCase()).join(", ")}, showing a site built for each: ${groups.flatMap((g) => g.sites.map((s) => s.title)).join(", ")}.`}
    >
      <Stage<S>
        width={720}
        height={420}
        compact={{ below: 560, width: 358, height: 440 }}
        initial={{ aud: 0, site: 0 }}
        poster={{ aud: 0, site: 0 }}
        script={script}
        cursor={{ at: REST }}
        className="hd"
      >
        {(s, rect, layout) => {
          const group = groups[s.aud]!;
          const shown = group.sites[s.site]!;
          const pick = rect(`pick-${s.aud}`);
          return (
            <>
              <Window className="hd-browser" urlShape="pill" url={<Roll>{shown.host}</Roll>}>
                <div className="hd-page">
                  <div className="hd-shot">
                    {groups.flatMap((g, aud) =>
                      g.sites.map((site, i) => (
                        <Image
                          key={site.title}
                          src={site.image}
                          alt=""
                          fill
                          sizes="(max-width: 560px) 90vw, 600px"
                          className="hd-img"
                          data-on={(aud === s.aud && i === s.site) || undefined}
                          priority={aud === 0 && i === 0}
                        />
                      )),
                    )}
                  </div>
                  <div className="hd-next">
                    <Bar w={120} h={8} tone={3} />
                    <div className="hd-next-cards">
                      {[62, 48, 70].map((w, i) => (
                        <div key={i} className="hd-next-card">
                          <Bar w={w} h={6} tone={3} />
                          <Bar w={w - 14} h={5} tone={2} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Window>

              <div className="hd-brief">
                <div className="hd-eyebrow">{hero.demo.eyebrow}</div>
                <div className="hd-letter">
                  <div>
                    {hero.demo.lead} <Roll>{group.phrase}</Roll>
                  </div>
                  <div>{hero.demo.need}</div>
                </div>
                <div className="hd-picks">
                  {groups.map((g, i) => (
                    <span key={g.id} className="hd-pick" data-target={`pick-${i}`} data-cursor="hand" data-on={i === s.aud || undefined}>
                      {g.label}
                    </span>
                  ))}
                </div>
                <div className="hd-sites">
                  {groups.map((g, aud) => (
                    <Tabs
                      key={g.id}
                      className="hd-site-row"
                      data-on={aud === s.aud || undefined}
                      items={g.sites.map((site) => site.title)}
                      value={aud === s.aud ? s.site : 0}
                      targets={g.sites.map((_, i) => `site-${aud}-${i}`)}
                    />
                  ))}
                </div>
              </div>

              <Follow key={layout} className="hd-pick-on" to={pick.width ? pick : null} />
              <span data-target="rest" className="hd-rest" />
            </>
          );
        }}
      </Stage>
    </div>
  );
}
