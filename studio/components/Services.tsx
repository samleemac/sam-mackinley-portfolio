"use client";

import Image from "next/image";
import { useState } from "react";
import { PillTag } from "@/components/PillTag";
import { services, work } from "@/content";
import { cx } from "@/lib/cx";
import styles from "./Services.module.css";

const proofFor = (title: string) => work.find((item) => item.title === title);

function Browser({
  id,
  className,
  priority,
}: {
  id: string;
  className?: string;
  priority?: boolean;
}) {
  const service = services.find((item) => item.id === id) ?? services[0];
  const site = proofFor(service.work);
  if (!site) return null;
  const host = site.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

  return (
    <figure className={cx(styles.browser, className)}>
      <div className={styles.chrome} aria-hidden="true">
        <span className={styles.lights}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.url}>{host}</span>
      </div>
      <div className={styles.shot}>
        <Image
          src={site.image}
          alt={`${site.title} website, designed and built by Sam`}
          fill
          sizes="(max-width: 1024px) 92vw, 48vw"
          className={styles.img}
          priority={priority}
        />
      </div>
      <figcaption className={styles.caption}>
        <span>
          <strong>{site.title}</strong> · {site.meta}
        </span>
        <a href={site.href} target="_blank" rel="noreferrer noopener" className={styles.visit}>
          Visit site <span aria-hidden="true">↗</span>
        </a>
      </figcaption>
    </figure>
  );
}

export function Services() {
  const [active, setActive] = useState(services[0].id);

  return (
    <section id="services" className="global-section" aria-labelledby="services-heading">
      <div className="container">
        <header className={styles.header}>
          <div className={styles.tag}>
            <PillTag>Services</PillTag>
          </div>
          <h2 id="services-heading" className={`display-lg ${styles.heading}`}>
            A site with a job to do
          </h2>
          <p className={`body-lg ${styles.lede}`}>
            Four things your site should do for your business — and the real
            sites where it already does.
          </p>
        </header>

        <div className={styles.layout}>
          <ol className={styles.list}>
            {services.map((service, index) => {
              const open = service.id === active;
              const site = proofFor(service.work);
              return (
                <li
                  key={service.id}
                  className={cx(styles.row, open && styles.rowOpen)}
                >
                  <h3 className={styles.rowHead}>
                    <button
                      type="button"
                      className={styles.trigger}
                      aria-expanded={open}
                      aria-controls={`service-${service.id}`}
                      onClick={() => setActive(service.id)}
                    >
                      <span className={styles.num}>0{index + 1}</span>
                      <span className={styles.title}>{service.title}</span>
                      <span className={styles.plus} aria-hidden="true" />
                    </button>
                  </h3>
                  <div
                    id={`service-${service.id}`}
                    className={styles.panel}
                    hidden={!open}
                  >
                    <p className={styles.promise}>{service.promise}</p>
                    <ul className={styles.includes}>
                      {service.includes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <p className={styles.proof}>
                      <span className={styles.proofLabel}>
                        Proof: {site?.title}
                      </span>
                      {service.proof}
                    </p>
                    <p className={styles.plans}>
                      In
                      {service.plans.map((plan) => (
                        <a key={plan} href="#plans" className={styles.plan}>
                          {plan}
                        </a>
                      ))}
                    </p>
                    <Browser id={service.id} className={styles.inlineShot} />
                  </div>
                </li>
              );
            })}
          </ol>

          <div className={styles.stage}>
            {services.map((service, index) => (
              <div
                key={service.id}
                className={cx(styles.slide, service.id === active && styles.slideOn)}
                inert={service.id !== active}
                aria-hidden={service.id !== active}
              >
                <Browser id={service.id} priority={index === 0} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
