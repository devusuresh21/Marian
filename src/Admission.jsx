
import { useState } from "react";
import "./Admission.css";
import "./App.css";
import logo from "./assets/PNG.png";

const API_URL = import.meta.env.VITE_MLS_API_URL || "";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  location: "",
  course: "",
  modules: [],
  mode: "",
  joining: "",
  callback: "",
  consent: false,
};

const moduleOptions = ["Sprechen", "Schreiben", "Lesen", "Hören"];

function createRequestId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function Admission() {
  const params = new URLSearchParams(window.location.search);

  const courseFromUrl = params.get("course") || "";

  const allowedCourses = [
    "A1",
    "A2",
    "B1",
    "B2",
    "B2 Preparation",
    "Unsure",
  ];

  const [form, setForm] = useState({
    ...initialForm,
    course: allowedCourses.includes(courseFromUrl)
      ? courseFromUrl
      : "",
  });

  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [requestId, setRequestId] = useState(createRequestId);

  const emailValid =
    !form.email ||
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      form.email
    );

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setStatus("");
  };

  const updateModule = (event) => {
    const { value, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      modules: checked
        ? [...previous.modules, value]
        : previous.modules.filter((item) => item !== value),
    }));

    setStatus("");
  };

  const showStatus = (message, error = false) => {
    setStatus(message);
    setIsError(error);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) return;

    if (!form.name.trim() || !form.location.trim()) {
      showStatus("Please complete all required fields.", true);
      return;
    }

    if (
      form.course === "B2 Preparation" &&
      form.modules.length === 0
    ) {
      showStatus(
        "Please select at least one preparation module.",
        true
      );
      return;
    }

    let phone = form.phone.replace(/[\s()-]/g, "");

    if (/^\d{10}$/.test(phone)) {
      phone = `+91${phone}`;
    }

    if (!/^\+[1-9]\d{7,14}$/.test(phone)) {
      showStatus(
        "Enter a valid phone number with country code, for example +91 98765 43210.",
        true
      );
      return;
    }

    if (form.email && !emailValid) {
      showStatus("Please enter a valid email address.", true);
      return;
    }

    if (!form.consent) {
      showStatus(
        "Please accept the consent before submitting.",
        true
      );
      return;
    }

    if (!API_URL) {
      showStatus(
        "Online submission is not configured yet. Please call +91 95265 25310.",
        true
      );
      return;
    }

    // Read the hidden honeypot field to help detect spam.
    const website =
      event.currentTarget.elements.website?.value || "";

    const campaignData = {};

    [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
    ].forEach((key) => {
      campaignData[key] = (params.get(key) || "").slice(0, 150);
    });

    if (!campaignData.utm_source) {
      try {
        campaignData.utm_source = document.referrer
          ? new URL(document.referrer).origin === window.location.origin
            ? "website"
            : "referral"
          : "direct";
      } catch {
        campaignData.utm_source = "direct";
      }
    }

    const submissionData = {
      ...form,
      name: form.name.trim(),
      phone,
      email: form.email.trim(),
      location: form.location.trim(),
      consent: "on",
      website,
      requestId,
      ...campaignData,
    };

    setSubmitting(true);
    showStatus("Submitting your enquiry...");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=UTF-8",
        },
        body: JSON.stringify(submissionData),
        credentials: "omit",
        redirect: "follow",
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(
          result.message || "Submission failed"
        );
      }

      showStatus(
        `Thank you! Your enquiry has been received. Reference: ${result.id}. Our admissions team will contact you shortly.`
      );

      setForm(initialForm);
      setRequestId(createRequestId());

    } catch (error) {
      console.error("Admission submission error:", error);

      showStatus(
        "Could not confirm your submission. Please check with the admissions team before retrying, or call +91 95265 25310.",
        true
      );

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
   
<header className="admission-header">
  <div className="admission-container admission-nav">

    {/* Marian Logo */}
    <a
      className="admission-brand"
      href="/"
      aria-label="Marian Linguistic Studies Home"
    >
      <img
        src={logo}
        alt="Marian Linguistic Studies"
      />
    </a>

    {/* Right side */}
    <div className="admission-nav-right">
      <span className="admission-course-label">
        GERMAN A1 – B2
      </span>

      <a
        href="tel:+919526525310"
        className="admission-contact"
      >
        Need help? Contact us ↗
      </a>
    </div>

  </div>
</header>


      <main className="admission-shell">
        <div className="admission-container admission-grid">
          <aside className="admission-intro">
            <p className="admission-eyebrow">
              <span /> ADMISSIONS · GERMAN A1–B2
            </p>

            <h1>
              German that takes you <em>somewhere.</em>
            </h1>

            <p>
              Tell us about your goals. Our academic counsellor will help
              you choose the right course, batch and learning mode.
            </p>

            <div className="admission-level-track">
              <b>A1</b>
              <b>A2</b>
              <b>B1</b>
              <b>B2</b>
            </div>

            <p>
              Goethe &amp; TELC preparation
              <br />
              Online &amp; offline · Kattappana
            </p>

            <a href="tel:+919526525310">
              Questions? +91 95265 25310
            </a>
          </aside>

          <section className="admission-panel">
            <p className="admission-eyebrow dark">
              <span /> START HERE
            </p>

            <h2>Admission enquiry</h2>

            <p className="admission-muted">
              Fields marked * are required. This is an enquiry, not a
              confirmed admission.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="admission-fields">
                <label>
                  Full name *
                  <input
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    autoComplete="name"
                    maxLength="100"
                    required
                  />
                </label>

                <label>
                  WhatsApp number *
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={updateField}
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    maxLength="16"
                    required
                  />
                </label>

                <label>
                  Email (optional)
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={updateField}
                    autoComplete="email"
                    maxLength={150}
                    placeholder="example@gmail.com"
                  />

                  {!emailValid && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      Please enter a valid email address
                      (e.g. example@gmail.com).
                    </span>
                  )}
                </label>

                <label>
                  Current location *
                  <input
                    name="location"
                    value={form.location}
                    onChange={updateField}
                    placeholder="Town / district"
                    maxLength="100"
                    required
                  />
                </label>
              </div>

              <fieldset>
                <legend>Interested course *</legend>

                <div className="admission-choices">
                  {[
                    ["A1", "Beginner"],
                    ["A2", "Elementary"],
                    ["B1", "Intermediate"],
                    ["B2", "Upper intermediate"],
                    ["B2 Preparation", "Exam modules"],
                    ["Unsure", "Need guidance"],
                  ].map(([value, description]) => (
                    <label
                      className={`admission-choice ${
                        form.course === value ? "selected" : ""
                      }`}
                      key={value}
                    >
                      <input
                        type="radio"
                        name="course"
                        value={value}
                        checked={form.course === value}
                        onChange={updateField}
                        required
                      />

                      <span>
                        <strong>{value}</strong>
                        <small>{description}</small>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {form.course === "B2 Preparation" && (
                <fieldset>
                  <legend>Preferred modules *</legend>

                  <div className="admission-choices">
                    {moduleOptions.map((module) => (
                      <label
                        className={`admission-choice ${
                          form.modules.includes(module)
                            ? "selected"
                            : ""
                        }`}
                        key={module}
                      >
                        <input
                          type="checkbox"
                          value={module}
                          checked={form.modules.includes(module)}
                          onChange={updateModule}
                        />
                        {module}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              <fieldset>
                <legend>Learning mode *</legend>

                <div className="admission-choices">
                  {["Online", "Offline – Kattappana", "Either"].map(
                    (mode) => (
                      <label
                        className={`admission-choice ${
                          form.mode === mode ? "selected" : ""
                        }`}
                        key={mode}
                      >
                        <input
                          type="radio"
                          name="mode"
                          value={mode}
                          checked={form.mode === mode}
                          onChange={updateField}
                          required
                        />
                        {mode}
                      </label>
                    )
                  )}
                </div>
              </fieldset>

              <div className="admission-fields">
                <label>
                  When would you like to join? *
                  <select
                    name="joining"
                    value={form.joining}
                    onChange={updateField}
                    required
                  >
                    <option value="">Choose</option>
                    <option>Immediately</option>
                    <option>Within one month</option>
                    <option>Within 2–3 months</option>
                    <option>Just enquiring</option>
                  </select>
                </label>

                <label>
                  Preferred callback time (IST)
                  <select
                    name="callback"
                    value={form.callback}
                    onChange={updateField}
                  >
                    <option value="">Anytime</option>
                    <option>Morning</option>
                    <option>Afternoon</option>
                  </select>
                </label>
              </div>

              <label className="admission-consent">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={updateField}
                  required
                />

                <span>
                  I agree to be contacted about courses and admissions.
                  I have read the{" "}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noreferrer"
                  >
                    privacy notice
                  </a>
                  . *
                </span>
              </label>

              <div
                className="admission-trap"
                aria-hidden="true"
              >
                <label>
                  Leave blank
                  <input
                    name="website"
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="admission-submit"
                disabled={submitting}
              >
                {submitting
                  ? "Submitting..."
                  : "Request counselling →"}
              </button>

              <p
                className={`admission-status ${
                  isError ? "error" : ""
                }`}
                role="status"
                aria-live="polite"
              >
                {status}
              </p>
            </form>
          </section>
        </div>
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
    </>
  );
}
