import { reviewsPage } from "@/lib/pages2";
import { content } from "@/lib/content";
import { waLink, TRUST } from "@/lib/site";
import Cta from "@/components/Cta";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { title: (locale === "nl" ? "Reviews" : "Reviews") + " | MerchantPilot" };
}

export default async function Reviews({ params }) {
  const { locale } = await params;
  const p = reviewsPage[locale];
  const c = content[locale];
  return (
    <>
      <section className="hero"><div className="w">
        <h1 style={{ maxWidth: 820 }}>{p.hero.title}</h1>
        <p style={{ color: "var(--on-navy)", fontSize: "1.15rem", maxWidth: 680, marginTop: 18 }}>{p.hero.text}</p>
      </div></section>
      <section><div className="w">
        <div className="head"><h2>{p.standardsTitle}</h2><p>{p.standardsText}</p></div>
        <div className="g3">{p.standards.map(([t, d]) => <div className="card" key={t}><h3>{t}</h3><p style={{ color: "var(--mute)", marginTop: 8 }}>{d}</p></div>)}</div>
      </div></section>
      <section className="soft"><div className="w">
        <div className="head"><h2>{c.reviews.title}</h2></div>
        <div className="g3">
          {c.reviews.items.map(([name, store, quote], i) => (
            <figure className="card rv" key={i}>
              <div className="rvh">
                {TRUST.photos[i] ? <img className="rva" src={TRUST.photos[i]} alt={name} style={{ objectFit: "cover" }} /> : <span className="rva">{name.slice(0, 1).toUpperCase()}</span>}
                <div><b className="rvn">{name}</b><span className="rvs" aria-label="5 / 5">★★★★★</span></div>
              </div>
              <blockquote className="rvt" style={{ margin: 0 }}>{quote}</blockquote>
              <span className="rvm">{store}</span>
            </figure>
          ))}
        </div>
      </div></section>
      <section><div className="w">
        <div className="head"><h2>{p.resultsTitle}</h2><p>{p.resultsEmpty}</p></div>
      </div></section>
      <section className="cta"><div className="w">
        <h2>{p.ctaTitle}</h2><p>{p.ctaText}</p>
        <Cta className="btn btn-m" href={waLink(locale, p.wa)}>{p.ctaBtn}</Cta>
      </div></section>
    </>
  );
}
