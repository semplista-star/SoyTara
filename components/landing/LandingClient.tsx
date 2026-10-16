"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "@/lib/i18n";
import type { LandingContent } from "@/lib/content";
import BridgeMotif from "./BridgeMotif";
import SphereOrb from "./SphereOrb";
import "./landing.css";

gsap.registerPlugin(ScrollTrigger);

const LOCALES: { code: Locale; label: string; url: string }[] = [
  { code: "es", label: "ES", url: "https://soytara.com" },
  { code: "ca", label: "CA", url: "https://soctara.com" },
  { code: "en", label: "EN", url: "https://iamtara.io" }
];

export default function LandingClient({ locale, content: c }: { locale: Locale; content: LandingContent }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const confessionRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const railFillRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openTopic, setOpenTopic] = useState<number | null>(null);
  const stepCount = c.product.steps.length;

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      // --- Nav background on scroll ---
      ScrollTrigger.create({
        start: 80,
        end: 99999,
        onUpdate: (self) => {
          navRef.current?.classList.toggle("scrolled", self.scroll() > 40);
        }
      });

      if (reduceMotion) {
        gsap.set(
          [
            "[data-reveal]",
            ".step",
            ".never-item",
            ".team-card",
            ".community-card",
            ".sphere-card",
            ".level-item",
            ".hero-title .line span"
          ],
          { opacity: 1, y: 0, x: 0 }
        );
        return;
      }

      // --- Hero entrance ---
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .from(".hero-eyebrow", { opacity: 0, y: 12, duration: 0.6 })
        .from(".hero-title .line span", { opacity: 0, y: "100%", duration: 0.9, stagger: 0.12 }, "-=0.3")
        .from(".hero-sub", { opacity: 0, y: 16, duration: 0.7 }, "-=0.4")
        .from(".hero-actions", { opacity: 0, y: 16, duration: 0.7 }, "-=0.5")
        .from(".hero-scroll", { opacity: 0, duration: 0.6 }, "-=0.3");

      // --- Generic reveal-on-scroll for grouped elements ---
      const revealGroups = [".step", ".never-item", ".team-card", ".community-card", ".sphere-card", ".level-item"];
      revealGroups.forEach((sel) => {
        const items = gsap.utils.toArray<HTMLElement>(sel);
        items.forEach((el, i) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: (i % 4) * 0.06,
            scrollTrigger: { trigger: el, start: "top 88%", once: true }
          });
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true }
        });
      });
    }, rootRef);

    // Trigger start positions are computed from layout at mount time. Even
    // with next/font avoiding most font-swap shift, refresh once more after
    // fonts finish loading so reveal animations never fire against stale
    // (pre-layout) scroll offsets — that mismatch is what reads as "jumpy"
    // scrolling rather than smooth.
    document.fonts?.ready?.then(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduceMotion || !fine) return;

    const buttons = gsap.utils.toArray<HTMLElement>(".btn-gold");
    const cleanups = buttons.map((btn) => {
      const strength = 0.35;
      const onMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * strength;
        const y = (e.clientY - rect.top - rect.height / 2) * strength;
        gsap.to(btn, { x, y, duration: 0.4, ease: "power2.out" });
      };
      const onLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
      };
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
      return () => {
        btn.removeEventListener("mousemove", onMove);
        btn.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  useEffect(() => {
    const steps = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!steps.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveStep(stepCount - 1);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.stepIndex);
            setActiveStep(idx);
          }
        });
      },
      { threshold: 0, rootMargin: "-45% 0px -50% 0px" }
    );
    steps.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [stepCount]);

  useEffect(() => {
    if (railFillRef.current) {
      railFillRef.current.style.height = `${((activeStep + 1) / stepCount) * 100}%`;
    }
  }, [activeStep, stepCount]);

  useEffect(() => {
    const lines = confessionRefs.current.filter(Boolean) as HTMLParagraphElement[];
    if (!lines.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lines.forEach((el) => el.classList.add("visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4, rootMargin: "0px 0px -10% 0px" }
    );
    lines.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div className="landing" ref={rootRef}>
      <nav className="nav" ref={navRef}>
        <a href="/" className="nav-mark">
          soy<span>tara</span>
        </a>
        <div className="nav-menu">
          <a href="#como-funciona">{c.nav.menu.how}</a>
          <a href="#niveles">{c.nav.menu.levels}</a>
          <a href="#privacy">{c.nav.menu.privacy}</a>
          <a href="#community">{c.nav.menu.community}</a>
          <a href="#team">{c.nav.menu.team}</a>
        </div>
        <div className="nav-right">
          <div className="nav-locales">
            {LOCALES.map((l) => (
              <a key={l.code} href={l.url} className={`nav-locale${l.code === locale ? " active" : ""}`}>
                {l.label}
              </a>
            ))}
          </div>
          <a href="/chat" className="nav-cta nav-cta-full">
            {c.nav.chat}
          </a>
          <a href="/chat" className="nav-cta nav-cta-short">
            {c.nav.chatShort}
          </a>
          <button
            className="nav-burger"
            aria-label={c.nav.menu.how}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`nav-overlay${menuOpen ? " open" : ""}`}>
        <div className="nav-overlay-top">
          <a href="/" className="nav-mark" onClick={() => setMenuOpen(false)}>
            soy<span>tara</span>
          </a>
          <button className="nav-close" aria-label="Close" onClick={() => setMenuOpen(false)}>
            ×
          </button>
        </div>
        <a href="#como-funciona" onClick={() => setMenuOpen(false)}>
          {c.nav.menu.how}
        </a>
        <a href="#niveles" onClick={() => setMenuOpen(false)}>
          {c.nav.menu.levels}
        </a>
        <a href="#privacy" onClick={() => setMenuOpen(false)}>
          {c.nav.menu.privacy}
        </a>
        <a href="#community" onClick={() => setMenuOpen(false)}>
          {c.nav.menu.community}
        </a>
        <a href="#team" onClick={() => setMenuOpen(false)}>
          {c.nav.menu.team}
        </a>
        <div className="nav-overlay-lang">
          <span className="nav-overlay-lang-label">{c.nav.language}</span>
          <div className="nav-overlay-lang-pills">
            {LOCALES.map((l) => (
              <a key={l.code} href={l.url} className={`lang-pill${l.code === locale ? " active" : ""}`}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <a href="/chat" className="btn-gold nav-overlay-cta">
          {c.nav.chat}
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </a>
        <p className="nav-overlay-urgency">{c.nav.urgency}</p>
      </div>

      <section className="hero">
        <div className="hero-inner">
          <span className="hero-eyebrow">
            <span className="hero-dot" />
            {c.hero.eyebrow}
          </span>
          <h1 className="hero-title">
            <span className="line">
              <span>{c.hero.line1}</span>
            </span>
            <span className="line">
              <span className="gold">{c.hero.sub}</span>
            </span>
            <span className="line">
              <span>{c.hero.line2}</span>
            </span>
          </h1>
          <p className="hero-sub">{c.hero.text}</p>
          <div className="hero-actions">
            <a href="#esfera-a" className="btn-gold">
              {c.hero.ctaKnow}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a href="#esfera-b" className="btn-outline">
              {c.hero.ctaTry}
            </a>
          </div>
        </div>
        <BridgeMotif className="hero-motif" variant="open" />
        <div className="hero-scroll">
          <span>{c.hero.scroll}</span>
          <span className="hero-scroll-line" aria-hidden="true" />
        </div>
      </section>

      <section className="spheres wrap" id="esferas">
        <span className="section-kicker" data-reveal>
          {c.spheres.kicker}
        </span>
        <h2 className="section-title" data-reveal>
          {c.spheres.title}
        </h2>
        <div className="spheres-grid">
          <div className="sphere-card sphere-a" id="esfera-a">
            <SphereOrb variant="active" />
            <span className="sphere-name">{c.spheres.sphereA.name}</span>
            <p className="sphere-tagline">{c.spheres.sphereA.tagline}</p>
            <p className="sphere-welcome">{c.spheres.sphereA.welcome}</p>
            <div className="sphere-topics">
              {c.spheres.sphereA.topics.map((topic, i) => (
                <div className="sphere-topic" key={topic.question}>
                  <button
                    className="sphere-topic-q"
                    aria-expanded={openTopic === i}
                    onClick={() => setOpenTopic(openTopic === i ? null : i)}
                  >
                    {topic.question}
                    <span className="sphere-topic-toggle" aria-hidden="true">
                      {openTopic === i ? "−" : "+"}
                    </span>
                  </button>
                  {openTopic === i && <p className="sphere-topic-a">{topic.answer}</p>}
                </div>
              ))}
            </div>
          </div>
          <div className="sphere-card sphere-b" id="esfera-b">
            <SphereOrb variant="dormant" />
            <span className="sphere-name">{c.spheres.sphereB.name}</span>
            <p className="sphere-tagline">{c.spheres.sphereB.tagline}</p>
            <p className="sphere-welcome muted">{c.spheres.sphereB.welcome}</p>
            <p className="sphere-duration">{c.spheres.sphereB.duration}</p>
            <span className="sphere-status">{c.spheres.sphereB.status}</span>
            <p className="sphere-note">{c.spheres.sphereB.note}</p>
          </div>
        </div>
      </section>

      <section className="context wrap">
        <span className="context-kicker">{c.context.kicker}</span>
        <p className="context-lead" data-reveal>
          {c.context.lead}
        </p>
        <div className="confessions">
          {c.context.phrases.map((phrase, i) => (
            <p
              key={phrase}
              className="confession-line"
              ref={(el) => {
                confessionRefs.current[i] = el;
              }}
            >
              {phrase}
            </p>
          ))}
        </div>
        <div className="context-closing">
          <p data-reveal>{c.context.closing}</p>
        </div>
      </section>

      <section className="product wrap" id="como-funciona">
        <span className="section-kicker" data-reveal>
          {c.product.kicker}
        </span>
        <h2 className="section-title" data-reveal>
          {c.product.title}
        </h2>
        <p className="product-intro" data-reveal>
          {c.product.intro}
        </p>
        <div className="steps">
          <div className="steps-rail" aria-hidden="true" />
          <div className="steps-rail-fill" ref={railFillRef} aria-hidden="true" />
          {c.product.steps.map((step, i) => (
            <div
              className={`step${i <= activeStep ? " active" : ""}`}
              key={step.n}
              data-step-index={i}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
            >
              <span className="step-num">{step.n}</span>
              <div className="step-body">
                <span className="step-word">{step.word}</span>
                <p className="step-desc">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="never-compact" data-reveal>
          <h3 className="never-compact-title">{c.differentiation.kicker}</h3>
          <div className="never-compact-grid">
            {c.differentiation.never.map((item) => (
              <p className="never-compact-item" key={item.title}>
                <b>{item.title}.</b> {item.body}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="diff wrap">
        <div className="bridge" data-reveal>
          <h3 className="bridge-title">{c.differentiation.bridge.title}</h3>
          <p className="bridge-body">{c.differentiation.bridge.body}</p>
          <p className="bridge-helplines">{c.differentiation.bridge.helplines}</p>
        </div>
      </section>

      <section className="community wrap" id="community">
        <span className="section-kicker" data-reveal>
          {c.community.kicker}
        </span>
        <h2 className="section-title" data-reveal>
          {c.community.title}
        </h2>
        <p className="community-intro" data-reveal>
          {c.community.intro}
        </p>
        <div className="community-grid">
          {c.community.cards.map((card) => (
            <div className="community-card" key={card.title}>
              <span className="community-card-eyebrow">{card.title}</span>
              <h3 className="community-card-title">{card.subtitle}</h3>
              <p className="community-card-body">{card.body}</p>
              {card.href && card.linkLabel && (
                <a href={card.href} className="community-card-link">
                  {card.linkLabel}
                </a>
              )}
            </div>
          ))}
        </div>
        <p className="community-extra">{c.community.extra}</p>
      </section>

      <section className="levels wrap" id="niveles">
        <span className="section-kicker" data-reveal>
          {c.levels.kicker}
        </span>
        <h2 className="section-title" data-reveal>
          {c.levels.title}
        </h2>
        <p className="levels-intro" data-reveal>
          {c.levels.intro}
        </p>
        <div className="levels-list">
          {c.levels.items.map((item) => (
            <div className="level-item" key={item.n}>
              <span className="level-num">{item.n}</span>
              <div className="level-body">
                <h3 className="level-title">{item.title}</h3>
                <p className="level-desc">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bridge" data-reveal>
          <p className="bridge-body">{c.levels.rule}</p>
          <p className="bridge-body levels-note">{c.levels.note}</p>
        </div>
      </section>

      <section className="privacy wrap" id="privacy">
        <span className="section-kicker" data-reveal>
          {c.privacy.kicker}
        </span>
        <h2 className="section-title" data-reveal>
          {c.privacy.title}
        </h2>
        <p className="privacy-intro" data-reveal>
          {c.privacy.intro}
          {" "}
          <a href="#privacy" className="privacy-policy-link">
            {c.privacy.policyLink}
          </a>
        </p>
        <div className="privacy-layout">
          <div className="privacy-featured" data-reveal>
            <h3 className="privacy-featured-title">{c.privacy.points[0].title}</h3>
            <p className="privacy-featured-body">{c.privacy.points[0].body}</p>
          </div>
          <div className="never-grid privacy-grid">
            {c.privacy.points.slice(1).map((item) => (
              <div className="never-item" key={item.title}>
                <h3 className="never-title privacy-point-title">{item.title}</h3>
                <p className="never-body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bridge" data-reveal>
          <h3 className="bridge-title">{c.privacy.note.title}</h3>
          <p className="bridge-body">{c.privacy.note.body}</p>
        </div>
      </section>

      <section className="project wrap" id="project">
        <span className="section-kicker" data-reveal>
          {c.project.kicker}
        </span>
        <h2 className="section-title" data-reveal>
          {c.project.title}
        </h2>
        <p className="project-intro" data-reveal>
          {c.project.intro}
        </p>
        <div className="never-grid project-grid">
          {c.project.indicators.map((item) => (
            <div className="never-item" key={item.title}>
              <h3 className="never-title">{item.title}</h3>
              <p className="never-body">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="project-note" data-reveal>
          {c.project.note}
        </p>
      </section>

      <section className="team wrap" id="team">
        <span className="section-kicker" data-reveal>
          {c.team.kicker}
        </span>
        <h2 className="section-title" data-reveal>
          {c.team.title}
        </h2>
        <p className="team-subtitle" data-reveal>
          {c.team.subtitle}
        </p>
        <div className="team-grid">
          {c.team.members.map((member) => (
            <div className="team-card" key={member.name}>
              {member.photo ? (
                <img className="team-photo" src={member.photo} alt={member.name} />
              ) : (
                <span className="team-avatar" aria-hidden="true">
                  {member.initials}
                </span>
              )}
              <h3 className="team-name">{member.name}</h3>
              <span className="team-role">{member.role}</span>
              {member.bio.map((p, i) => (
                <p className="team-bio" key={i}>
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <BridgeMotif className="cta-motif" variant="resolved" />
        <h2 className="cta-title">
          {c.cta.line1}
          <br />
          <span className="accent">{c.cta.line2}</span>
        </h2>
        <a href="/chat" className="btn-gold">
          {c.cta.button}
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </a>
        <p className="cta-note">{c.cta.note}</p>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <a href="/" className="nav-mark">
              soy<span>tara</span>
            </a>
            <span className="footer-tagline">{c.footer.rights}</span>
          </div>
          <div className="footer-col">
            <span className="footer-col-heading">{c.footer.columns.product.heading}</span>
            <a href="#como-funciona">{c.footer.columns.product.how}</a>
            <a href="/escoles">{c.footer.columns.product.schools}</a>
            <a href="#team">{c.footer.columns.product.team}</a>
          </div>
          <div className="footer-col">
            <span className="footer-col-heading">{c.footer.columns.legal.heading}</span>
            <span className="footer-col-pending">{c.footer.columns.legal.notice}</span>
            <a href="#privacy">{c.footer.columns.legal.privacy}</a>
            <span className="footer-col-pending">{c.footer.columns.legal.rights}</span>
          </div>
          <div className="footer-col">
            <span className="footer-col-heading">{c.footer.columns.language.heading}</span>
            {LOCALES.map((l) => (
              <a key={l.code} href={l.url} className={l.code === locale ? "active" : ""}>
                {l.code === "es" ? "Castellano" : l.code === "ca" ? "Català" : "English"}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
