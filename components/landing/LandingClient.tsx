"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import type { Locale } from "@/lib/i18n";
import type { LandingContent } from "@/lib/content";
import "./landing.css";

gsap.registerPlugin(ScrollTrigger);

export default function LandingClient({ locale, content: c }: { locale: Locale; content: LandingContent }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const contextPinRef = useRef<HTMLDivElement>(null);
  const phraseRefs = useRef<(HTMLParagraphElement | null)[]>([]);

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
          ["[data-reveal]", ".step", ".never-item", ".cred-item", ".hero-title .line span"],
          { opacity: 1, y: 0, x: 0 }
        );
        phraseRefs.current.forEach((el) => el && gsap.set(el, { opacity: 1, position: "static" }));
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

      // --- Context: pinned phrase cycler ---
      const phrases = phraseRefs.current.filter(Boolean) as HTMLParagraphElement[];
      if (contextPinRef.current && phrases.length) {
        gsap.set(phrases, { opacity: 0, y: 16 });
        gsap.set(phrases[0], { opacity: 1, y: 0 });

        const segment = 1;
        const total = phrases.length * segment;
        const phraseTl = gsap.timeline({
          scrollTrigger: {
            trigger: contextPinRef.current,
            start: "top top",
            end: `+=${total * 100}%`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1
          }
        });

        phrases.forEach((el, i) => {
          if (i > 0) {
            phraseTl.to(phrases[i - 1], { opacity: 0, y: -16, duration: 0.22, ease: "power1.in" }, i - 0.3);
            phraseTl.to(el, { opacity: 1, y: 0, duration: 0.22, ease: "power1.out" }, i - 0.06);
          }
          phraseTl.to({}, { duration: 0.55 });
        });
      }

      // --- Generic reveal-on-scroll for grouped elements ---
      const revealGroups = [".step", ".never-item", ".cred-item"];
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

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="landing" ref={rootRef}>
      <nav className="nav" ref={navRef}>
        <a href="/" className="nav-mark">
          soy<span>tara</span>
        </a>
        <div className="nav-right">
          <span className="nav-locale">{locale.toUpperCase()}</span>
          <a href="/escoles" className="nav-schools">
            {c.nav.schools}
          </a>
          <a href="/chat" className="nav-cta">
            {c.nav.chat}
          </a>
        </div>
      </nav>

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
              <span className="gold">
                {c.hero.line2}
                <i className="hero-cursor" aria-hidden="true" />
              </span>
            </span>
          </h1>
          <p className="hero-sub">{c.hero.sub}</p>
          <div className="hero-actions">
            <a href="/chat" className="btn-gold">
              {c.hero.cta}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>
        <div className="hero-scroll">
          <span>{c.hero.scroll}</span>
          <span className="hero-scroll-line" aria-hidden="true" />
        </div>
      </section>

      <section className="context">
        <div className="context-pin" ref={contextPinRef}>
          <span className="context-kicker">{c.context.kicker}</span>
          <div className="context-phrase-stage">
            {c.context.phrases.map((phrase, i) => (
              <p
                key={phrase}
                className="context-phrase"
                ref={(el) => {
                  phraseRefs.current[i] = el;
                }}
              >
                {phrase}
              </p>
            ))}
          </div>
        </div>
        <div className="context-closing">
          <p data-reveal>{c.context.closing}</p>
        </div>
      </section>

      <section className="product wrap">
        <span className="section-kicker" data-reveal>
          {c.product.kicker}
        </span>
        <h2 className="section-title" data-reveal>
          {c.product.title}
        </h2>
        <div className="steps">
          {c.product.steps.map((step) => (
            <div className="step" key={step.n}>
              <span className="step-num">{step.n}</span>
              <div className="step-body">
                <span className="step-word">{step.word}</span>
                <p className="step-desc">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="diff wrap">
        <span className="section-kicker" data-reveal>
          {c.differentiation.kicker}
        </span>
        <h2 className="section-title" data-reveal>
          {c.differentiation.title}
        </h2>
        <div className="never-grid">
          {c.differentiation.never.map((item) => (
            <div className="never-item" key={item.title}>
              <span className="never-x" aria-hidden="true">
                ✕
              </span>
              <h3 className="never-title">{item.title}</h3>
              <p className="never-body">{item.body}</p>
            </div>
          ))}
        </div>
        <div className="bridge" data-reveal>
          <h3 className="bridge-title">{c.differentiation.bridge.title}</h3>
          <p className="bridge-body">{c.differentiation.bridge.body}</p>
          <p className="bridge-helplines">{c.differentiation.bridge.helplines}</p>
        </div>
      </section>

      <section className="credibility wrap">
        <span className="section-kicker" data-reveal>
          {c.credibility.kicker}
        </span>
        <div className="cred-grid">
          {c.credibility.items.map((item) => (
            <div className="cred-item" key={item.title}>
              <span className="cred-num">{item.n}</span>
              <h3 className="cred-title">{item.title}</h3>
              <p className="cred-body">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
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
          <span className="footer-tagline">{c.footer.rights}</span>
          <div className="footer-links">
            <a href="/escoles">{c.footer.schools}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
