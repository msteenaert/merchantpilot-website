import { content } from "@/lib/content";
import { waLink } from "@/lib/site";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { title: (locale === "nl" ? "Contact" : "Contact") + " | MerchantPilot" };
}

export default async function Contact({ params }) {
  const { locale } = await params;
  const c = content[locale].contact;
  const href = waLink(locale, content[locale].cta.waText);
  const external = href.startsWith("http");
  return (
    <>
      <section className="hero">
        <div className="w">
          <h1 style={{ maxWidth: 760 }}>{c.title}</h1>
          <p style={{ color: "var(--on-navy)", fontSize: "1.15rem", maxWidth: 640, marginTop: 18 }}>{c.text}</p>
          <div className="btns">
            {external
              ? <a className="btn btn-m" href={href} target="_blank" rel="noopener">{c.wa}</a>
              : null}
          </div>
        </div>
      </section>
      <section className="soft">
        <div className="w ct-g">
          <div className="head" style={{ margin: 0 }}>
            <h2>{c.formTitle}</h2>
            <p>{c.formText}</p>
          </div>
          <div className="card"><ContactForm locale={locale} t={{ ...c, ...c.fields }} /></div>
        </div>
      </section>
    </>
  );
}
