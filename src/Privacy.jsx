
import "./Privacy.css";

export default function Privacy() {
  return (
    <>
      <header className="privacy-header">
        <div className="privacy-container">
          <a href="/" className="privacy-brand">
            Marian <span>Linguistic Studies</span>
          </a>

          <a href="/admission" className="privacy-apply">
            Apply now →
          </a>
        </div>
      </header>

      <main className="privacy-main">
        <article className="privacy-container privacy-card">
          <p className="privacy-eyebrow">MARIAN LINGUISTIC STUDIES</p>

          <h1>Admission enquiry privacy notice</h1>

          <p>
            Marian Linguistic Studies, a division of Lernora International
            Pvt Ltd, collects your name, contact details, location, course
            preferences, consent and campaign information to respond to
            enquiries and arrange counselling.
          </p>

          <p>
            Enquiries are stored using Google Sheets and processed by
            authorised admissions staff. Google services support storage
            and notifications. Do not submit identity documents or
            payment details through this form.
          </p>

          <p>
            To request access, correction, deletion or withdrawal of
            contact consent, contact the admissions team at{" "}
            <a href="tel:+919526525310">+91 95265 25310</a>.
            Withdrawal does not affect prior lawful processing.
          </p>

          <a href="/admission" className="privacy-back">
            ← Return to admission enquiry
          </a>
        </article>
      </main>

      <footer className="privacy-footer">
        © {new Date().getFullYear()} Marian Linguistic Studies
        <span>A division of Lernora International Pvt Ltd</span>
      </footer>
    </>
  );
}
