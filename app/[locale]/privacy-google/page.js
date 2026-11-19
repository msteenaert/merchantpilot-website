import { privacyGoogle as p } from "@/lib/privacy";

export async function generateMetadata() {
  return { title: "Privacy Policy – Google Data | MerchantPilot" };
}

const LIMITED = (
  <p>
    MerchantPilot's use and transfer of information received from Google APIs will adhere to the{" "}
    <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener" style={{ textDecoration: "underline" }}>Google API Services User Data Policy</a>, including the Limited Use requirements.
  </p>
);

export default async function PrivacyGoogle() {
  return (
    <>
      <section className="hero"><div className="w">
        <h1 style={{ maxWidth: 820 }}>{p.title}</h1>
        <p style={{ color: "var(--on-navy)", fontSize: "1rem", maxWidth: 680, marginTop: 18 }}>{p.meta}</p>
      </div></section>
      <section><div className="w lg-doc">
        <div className="lg-s"><p>{p.intro}</p></div>
        {p.sections.map(([h, blocks]) => (
          <div className="lg-s" key={h}>
            <h2>{h}</h2>
            {blocks.map((b, i) =>
              b === "@LIMITED" ? <span key={i}>{LIMITED}</span>
              : Array.isArray(b) ? <ul className="lg-ul" key={i}>{b.map((x) => <li key={x}>{x}</li>)}</ul>
              : <p key={i}>{b}</p>
            )}
          </div>
        ))}
        <div className="lg-s">
          <h2>{p.contactTitle}</h2>
          <p>{p.contactText}</p>
          <ul className="lg-c">{p.contact.map(([k, v]) => <li key={k}><b>{k}</b> {v}</li>)}</ul>
        </div>
        <div className="lg-s"><p>{p.outro}</p></div>
      </div></section>
    </>
  );
}
