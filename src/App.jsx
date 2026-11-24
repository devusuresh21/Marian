
import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/PNG.png";
import Admission from "./Admission";
import Privacy from "./Privacy";

function CountUp({ target = 200, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById("result-counter");

    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!start) return;

    let animationFrame;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      setCount(Math.floor(progress * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [start, target, duration]);

  return (
    <span id="result-counter">
      {count}<sup>+</sup>
    </span>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Mobile navigation and body scrolling
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Original reveal animation
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  // React page navigation
  const currentPath = window.location.pathname.replace(/\/+$/, "");

  if (currentPath.endsWith("/admission")) {
    return <Admission />;
  }

  if (currentPath.endsWith("/privacy")) {
    return <Privacy />;
  }

  const closeMenu = () => setMenuOpen(false);

  // Preserve campaign tracking when opening the admission form
  const campaignParams = new URLSearchParams(window.location.search);

  const admissionLink = (course = "") => {
    const params = new URLSearchParams();

    if (course) {
      params.set("course", course);
    }

    [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
    ].forEach((key) => {
      if (campaignParams.has(key)) {
        params.set(key, campaignParams.get(key));
      }
    });

    if (!params.has("utm_source")) {
      params.set("utm_source", "website");
    }

    return `/admission?${params.toString()}`;
  };

  const applyLink = admissionLink();

  const whatsappLink =
    "https://wa.me/918330051190?text=Hello%20Marian%20Linguistic%20Studies%2C%20I%20would%20like%20to%20know%20more%20about%20German%20classes.";

  // KEEP YOUR EXISTING HOMEPAGE JSX BELOW


  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* HEADER */}
      <header className="site-header" id="top">
        <div className="container nav-wrap">
         
<a
  className="brand"
  href="#top"
  aria-label="Marian Linguistic Studies home"
  onClick={closeMenu}
>
<img src={logo} alt="Marian Linguistic Studies" className="brand-logo" />
</a>


         
<button
  className="menu-toggle"
  aria-expanded={menuOpen}
  aria-controls="site-nav"
  aria-label={menuOpen ? "Close menu" : "Open menu"}
  onClick={() => setMenuOpen((previous) => !previous)}
>
  <span></span>
  <span></span>
  <span></span>
</button>

<nav
  id="site-nav"
  aria-label="Primary navigation"
  className={menuOpen ? "open" : ""}
>
  <a href="#" onClick={closeMenu}>Home</a>
  <a href="#courses" onClick={closeMenu}>Explore Courses</a>
  <a href="#method" onClick={closeMenu}>Why Marian</a>
  <a href="#results" onClick={closeMenu}>Achievements</a>
  <a href="#about" onClick={closeMenu}>Our Story</a>
  <a href="#footer" onClick={closeMenu}>Get in Touch</a>

  <a
    className="nav-cta"
    href={applyLink}
    target="_blank"
    rel="noopener noreferrer"
    onClick={closeMenu}
  >
    Apply now <span>→</span>
  </a>
</nav>

        </div>
      </header>

      <main id="main">

        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero-noise" aria-hidden="true"></div>

          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <p className="eyebrow">
                <span></span>
                German language academy · Kattappana
              </p>

              <h1>
                German that takes you <em>somewhere.</em>
              </h1>

              <p className="hero-lead">
                Build real language ability from A1 to B2 with structured
                training, regular assessment and focused Goethe &amp; TELC
                preparation.
              </p>

              <div className="hero-actions">
                <a
                  className="button primary"
                  href={applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start your admission <span>→</span>
                </a>

                <a className="button text-button" href="#courses">
                  Explore courses <span>↓</span>
                </a>
              </div>

              <div className="hero-trust">
                <div>
                  <strong>200+</strong>
                  <span>B2 full-module<br />winners</span>
                </div>

                <div>
                  <strong>A1–B2</strong>
                  <span>Complete German<br />learning path</span>
                </div>

                <div>
                  <strong>2 modes</strong>
                  <span>Online &amp; offline<br />classes</span>
                </div>
              </div>
            </div>

            <div
              className="hero-visual reveal delay-1"
              aria-label="German learning journey illustration"
            >
              <div className="orbit orbit-one"></div>
              <div className="orbit orbit-two"></div>

              <div className="visual-card card-word">
                <small>Wort des Tages</small>
                <strong>Fortschritt</strong>
                <span>/ˈfɔʁtˌʃʁɪt/ · progress</span>
              </div>

              <div className="visual-card card-route">
                <span>IND</span>
                <i></i>
                <span>DE</span>
              </div>

              <div className="visual-card card-level">
                <small>Your learning path</small>

                <div>
                  <b>A1</b>
                  <b>A2</b>
                  <b>B1</b>
                  <b>B2</b>
                </div>

                <span className="progress-line">
                  <i></i>
                </span>
              </div>

              <div className="de-ring">
                <span>DE</span>
              </div>

              <div className="scribble">
                sprechen<br />
                · hören<br />
                · lesen<br />
                · schreiben
              </div>
            </div>
          </div>

          <div className="hero-bottom" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="proof-strip" aria-label="Key benefits">
          <div className="container proof-grid">
            <span>Exam-focused training</span>
            <span>Certified trainers</span>
            <span>Regular assessments</span>
            <span>Personal guidance</span>
          </div>
        </section>

        {/* COURSES */}
        <section className="section courses" id="courses">
          <div className="container">
            <div className="section-intro reveal">
              <div>
                <p className="eyebrow dark">
                  <span></span> Choose your level
                </p>

                <h2>
                  One clear path.<br />
                  <em>Four milestones.</em>
                </h2>
              </div>

              <p>
                Start at your current level and move forward with a structured
                plan. Every course develops reading, writing, listening and
                speaking together.
              </p>
            </div>

            <div className="course-grid">
              <article className="course-card reveal">
                <div className="course-top">
                  <span>01</span>
                  <b>A1</b>
                </div>

                <h3>Start speaking</h3>

                <p>
                  Build your first German sentences, introduce yourself and
                  handle familiar everyday situations.
                </p>

                <ul>
                  <li>Essential vocabulary</li>
                  <li>Basic grammar</li>
                  <li>Everyday conversations</li>
                </ul>

                <a href={admissionLink("A1")} target="_blank" rel="noopener noreferrer"
                   aria-label="Apply for German A1">
                  Apply for A1 <span>→</span>
                </a>
              </article>

              <article className="course-card reveal delay-1">
                <div className="course-top">
                  <span>02</span>
                  <b>A2</b>
                </div>

                <h3>Grow confidence</h3>

                <p>
                  Communicate more independently about work, family, travel
                  and daily routines.
                </p>

                <ul>
                  <li>Connected sentences</li>
                  <li>Stronger grammar</li>
                  <li>Practical communication</li>
                </ul>

                <a href={admissionLink("A2")} target="_blank" rel="noopener noreferrer"
                   aria-label="Apply for German A2">
                  Apply for A2 <span>→</span>
                </a>
              </article>

              <article className="course-card reveal delay-2">
                <div className="course-top">
                  <span>03</span>
                  <b>B1</b>
                </div>

                <h3>Become independent</h3>

                <p>
                  Express opinions, understand key ideas and manage most
                  situations in German.
                </p>

                <ul>
                  <li>Fluent daily exchanges</li>
                  <li>Structured writing</li>
                  <li>Exam techniques</li>
                </ul>

                <a href={admissionLink("B1")} target="_blank" rel="noopener noreferrer"
                   aria-label="Apply for German B1">
                  Apply for B1 <span>→</span>
                </a>
              </article>

              <article className="course-card featured reveal delay-3">
                <div className="course-top">
                  <span>04</span>
                  <b>B2</b>
                </div>

                <h3>Think in German</h3>

                <p>
                  Discuss complex topics clearly and prepare for academic and
                  professional communication.
                </p>

                <ul>
                  <li>Advanced expression</li>
                  <li>Goethe &amp; TELC focus</li>
                  <li>Module preparation</li>
                </ul>

                <a href={admissionLink("B2")} target="_blank" rel="noopener noreferrer"
                   aria-label="Apply for German B2">
                  Apply for B2 <span>→</span>
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* METHOD */}
        <section className="section method" id="method">
          <div className="container method-grid">
            <div className="method-copy reveal">
              <p className="eyebrow light">
                <span></span> The MLS method
              </p>

              <h2>
                Learn. Practise.<br />
                <em>Prove your progress.</em>
              </h2>

              <p>
                Language grows through consistency. Our training combines
                guided lessons, active practice and regular evaluation so
                every student knows what to improve next.
              </p>

              <a
                className="button outline"
                href="https://wa.me/919946951190?text=Hello%20Marian%20Linguistic%20Studies%2C%20I%20would%20like%20to%20know%20more%20about%20German%20classes."
                target="_blank"
                rel="noopener noreferrer"
              >
                Talk to a counsellor <span>→</span>
              </a>
            </div>

            <div className="method-steps">
              <article className="reveal">
                <span>01</span>
                <div>
                  <h3>Understand</h3>
                  <p>
                    Clear explanations make grammar and language patterns
                    easier to use.
                  </p>
                </div>
              </article>

              <article className="reveal delay-1">
                <span>02</span>
                <div>
                  <h3>Use the language</h3>
                  <p>
                    Speaking, writing, listening and reading are practised
                    throughout the course.
                  </p>
                </div>
              </article>

              <article className="reveal delay-2">
                <span>03</span>
                <div>
                  <h3>Measure progress</h3>
                  <p>
                    Regular assessments identify strengths, gaps and the next
                    area of focus.
                  </p>
                </div>
              </article>

              <article className="reveal delay-3">
                <span>04</span>
                <div>
                  <h3>Prepare for the exam</h3>
                  <p>
                    Exam formats, module strategies and timed practice build
                    confidence.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* LEARNING MODES */}
        <section className="section modes">
          <div className="container">
            <div className="section-intro compact reveal">
              <div>
                <p className="eyebrow dark">
                  <span></span> Learn your way
                </p>

                <h2>
                  Same standard.<br />
                  <em>Your choice of classroom.</em>
                </h2>
              </div>
            </div>

            <div className="mode-grid">
              <article className="mode-card offline reveal">
                <div className="mode-art" aria-hidden="true">
                  <span className="desk d1"></span>
                  <span className="desk d2"></span>
                  <span className="desk d3"></span>
                  <span className="board">Guten Tag!</span>
                </div>

                <div className="mode-copy">
                  <small>Kattappana campus</small>
                  <h3>Offline classes</h3>

                  <p>
                    Learn face to face in a focused classroom with direct tutor
                    interaction and peer practice.
                  </p>

                  <a
                    href="https://wa.me/918330051190?text=Hello%2C%20I%20am%20interested%20in%20offline%20German%20classes."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ask about offline batches <span>→</span>
                  </a>
                </div>
              </article>

              <article className="mode-card online reveal delay-1">
                <div className="mode-art laptop" aria-hidden="true">
                  <div>
                    <span>Hallo!</span>
                    <i></i>
                    <i></i>
                    <i></i>
                  </div>
                </div>

                <div className="mode-copy">
                  <small>Learn from anywhere</small>
                  <h3>Online classes</h3>

                  <p>
                    Join live, structured training from home with the same
                    level plan and regular guidance.
                  </p>

                  <a
                    href="https://wa.me/918330051190?text=Hello%2C%20I%20am%20interested%20in%20online%20German%20classes."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ask about online batches <span>→</span>
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* RESULTS */}
        <section className="section results" id="results">
          <div className="container results-grid">
          <div className="result-number reveal">
  <CountUp target={200} duration={1500} />
   <p>B2 full-module winners</p>
</div>

            <div className="results-copy reveal delay-1">
              <p className="eyebrow light">
                <span></span> Results that matter
              </p>

              <h2>
                Success is built<br />
                <em>one module at a time.</em>
              </h2>

              <p>
                Our Instagram documents the students, milestones and
                full-module achievements behind this number.
              </p>

              <a
                className="button white"
                href="https://www.instagram.com/marianlinguisticstudies/"
                target="_blank"
                rel="noopener noreferrer"
              >
                View success stories <span>→</span>
              </a>
            </div>
          </div>

          <div className="result-ticker" aria-hidden="true">
            <span>SPRECHEN · SCHREIBEN · LESEN · HÖREN · </span>
            <span>SPRECHEN · SCHREIBEN · LESEN · HÖREN · </span>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section about" id="about">
          <div className="container about-grid">
            <div className="about-statement reveal">
              <p className="eyebrow dark">
                <span></span> About Marian
              </p>

              <h2>
                Language is the first step toward a bigger plan.
              </h2>
            </div>

            <div className="about-copy reveal delay-1">
              <p>
                Marian Linguistic Studies is the German-language division of
                Lernora International Pvt Ltd, based in Kattappana, Kerala.
              </p>

              <p>
                We help learners build practical German ability, prepare for
                Goethe and TELC examinations and move toward their academic
                and professional goals with clarity.
              </p>

              <div className="about-facts">
                <span>
                  <b>German</b>
                  A1 to B2
                </span>

                <span>
                  <b>Preparation</b>
                  Goethe &amp; TELC
                </span>

                <span>
                  <b>Location</b>
                  Kattappana, Idukki
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section faq" id="faq">
          <div className="container faq-grid">
            <div className="faq-intro reveal">
              <p className="eyebrow dark">
                <span></span> Common questions
              </p>

              <h2>
                Before you<br />
                <em>begin.</em>
              </h2>
            </div>

            <div className="accordion">
              <details className="reveal">
                <summary>
                  Which German level should I join?
                  <span></span>
                </summary>

                <p>
                  New learners normally begin with A1. If you have already
                  studied German, contact our team so we can guide you to the
                  appropriate level.
                </p>
              </details>

              <details className="reveal">
                <summary>
                  Are online and offline classes available?
                  <span></span>
                </summary>

                <p>
                  Yes. Marian Linguistic Studies offers online and offline
                  learning options. Batch availability and timings can vary,
                  so check the current schedule with admissions.
                </p>
              </details>

              <details className="reveal">
                <summary>
                  Do you provide Goethe and TELC preparation?
                  <span></span>
                </summary>

                <p>
                  Yes. Training includes exam-focused preparation, and
                  dedicated B2 module preparation is available based on the
                  current batch plan.
                </p>
              </details>

              <details className="reveal">
                <summary>
                  How do I apply?
                  <span></span>
                </summary>

                <p>
                  Use the Apply Now button to submit the admission form. Our
                  team will contact you with current batch, timing and fee
                  details.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="final-cta">
          <div className="container cta-box reveal">
            <div>
              <p className="eyebrow light">
                <span></span> Admissions
              </p>

              <h2>
                Ready to begin<br />
                your German journey?
              </h2>
            </div>

            <div>
              <p>
                Tell us your preferred level and class mode. Our admissions
                team will help you with the next step.
              </p>

              <a
                className="button white"
                href={applyLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply for admission <span>→</span>
              </a>
            </div>

            <span className="cta-de" aria-hidden="true">
              DE
            </span>
          </div>
        </section>
      </main>

      {/* FOOTER */}
     

<footer className="site-footer" id="footer">

  <div className="footer-glow"></div>

  <div className="container footer-container">

    {/* Brand and description */}
    
<div className="footer-top">

  <div className="footer-brand-area">
    <a className="brand footer-brand" href="#top">
      <img
        src={logo}
        alt="Marian Linguistic Studies"
        className="footer-logo"
      />
    </a>

    <p>
      Learn German. Prepare with purpose.
      <br />
      Your journey towards a world of opportunities starts here.
    </p>
  </div>

  <div className="footer-cta-area">
    <span>READY TO BEGIN?</span>
    <h3>Start your German journey today.</h3>

    <a
      href="https://wa.me/918330051190?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20German%20courses."
      target="_blank"
      rel="noopener noreferrer"
      className="footer-cta"
    >
      Enquire Now <span>↗</span>
    </a>
  </div>

</div>


    <div className="footer-divider"></div>

    {/* Horizontal information section */}
    <div className="footer-middle">

      <div className="footer-middle-item">
        <h5>EXPLORE</h5>

        <div className="footer-horizontal-links">
          <div className="footer-horizontal-links">
  <a href="#courses">Explore Courses</a>
  <a href="#method">The Marian Way</a>
  <a href="#results">Achievements</a>
  <a href="#about">Our Story</a>
  <a href="/admission">Apply Now</a>
  <a href="/privacy">Privacy Notice</a>
</div>
        </div>
      </div>

      <div className="footer-middle-item">
        <h5>CONTACT</h5>

        <div className="footer-horizontal-links">
          <a href="tel:+919526525310">+91 95265 25310</a>
          <a href="tel:+917558094118">+91 75580 94118</a>
          <span>Kattappana, Idukki, Kerala</span>
        </div>
      </div>

      <div className="footer-middle-item">
        <h5>FOLLOW US</h5>

        <div className="footer-horizontal-links">
          <a
            href="https://www.instagram.com/marianlinguisticstudies/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram ↗
          </a>

          <a
            href="https://wa.me/918330051190"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp ↗
          </a>
        </div>
      </div>

    </div>

    {/* Copyright */}
    <div className="footer-bottom">
      <span>
        © {new Date().getFullYear()} Marian Linguistic Studies. All rights reserved.
      </span>

      <span>
        A division of Lernora International Pvt Ltd
      </span>
    </div>

  </div>
</footer>



      {/* FLOATING WHATSAPP */}
      <a
        className="whatsapp"
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Marian Linguistic Studies on WhatsApp"
      >
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M27.3 4.7A15.1 15.1 0 0 0 3.5 22.9L1.4 30.6l7.9-2.1a15.1 15.1 0 0 0 7.2 1.8h.1A15.1 15.1 0 0 0 27.3 4.7Zm-10.8 23a12.5 12.5 0 0 1-6.4-1.8l-.5-.3-4.7 1.2 1.3-4.6-.3-.5A12.5 12.5 0 1 1 16.5 27.7Zm6.9-9.4c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.6-.2-.8.2-.2.4-1 1.2-1.2 1.5-.2.3-.4.3-.8.1-2.2-1.1-3.6-1.9-5.1-4.3-.4-.7.4-.7 1.1-2.2.1-.3.1-.6 0-.8-.1-.2-.8-2-1.1-2.7-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.2s1.4 3.7 1.6 4c.2.3 2.7 4.1 6.5 5.8 2.4 1 3.3 1.1 4.5.9.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.8-.1-.2-.4-.3-.8-.5Z" />
        </svg>
      </a>
    </>
  );
}
