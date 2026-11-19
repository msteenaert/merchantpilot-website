import { terms } from "@/lib/legal";

export async function generateMetadata() {
  return { title: "Terms and Conditions | MerchantPilot" };
}

export default async function Terms() {
  return (
    <>
      <section className="hero"><div className="w">
        <h1 style={{ maxWidth: 820 }}>{terms.title}</h1>
        <p style={{ color: "var(--on-navy)", fontSize: "1rem", maxWidth: 680, marginTop: 18 }}>{terms.meta}</p>
      </div></section>
      <section><div className="w lg-doc">
        {terms.sections.map(([h, paras]) => (
          <div className="lg-s" key={h}>
            <h2>{h}</h2>
            {paras.map((t, i) => <p key={i} className={/^[a-e]\) /.test(t) ? "lg-i" : ""}>{t}</p>)}
          </div>
        ))}
        <div className="lg-s">
          <h2>{terms.contactTitle}</h2>
          <ul className="lg-c">{terms.contact.map(([k, v]) => <li key={k}><b>{k}</b> {v}</li>)}</ul>
        </div>
      </div></section>
    </>
  );
}
