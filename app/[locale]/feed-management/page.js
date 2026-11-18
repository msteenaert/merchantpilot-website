import { feedPage } from "@/lib/pages2";
import { pricing } from "@/lib/pages";
import { money, waLink, payLink } from "@/lib/site";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { title: (locale === "nl" ? "Feedbeheer" : "Feed management") + " | MerchantPilot" };
}

export default async function Feed({ params }) {
  const { locale } = await params;
  const p = feedPage[locale];
  const pr = pricing[locale];
  const all = pr.groups.flatMap((g) => g.items);
  const byId = (ids) => ids.map((id) => all.find((i) => i.id === id)).filter(Boolean);
  const ask = (title) => waLink(locale, locale === "nl" ? `Hoi, ik heb een vraag over: ${title}.` : `Hi, I have a question about: ${title}.`);
  const Grid = ({ items }) => (
    <div className="g3">
      {items.map((it) => (
        <div className="card tier" key={it.id}>
          <h3>{it.title}</h3>
          <div style={{ margin: "10px 0", fontSize: "1.8rem", fontWeight: 800 }}>
            {it.from ? <span style={{ fontSize: "1rem" }}>{locale === "nl" ? "Vanaf " : "From "}</span> : null}{money(locale, it.price)}
            <small style={{ fontSize: ".8rem", color: "var(--mute)", fontWeight: 500, marginLeft: 6 }}>{it.monthly ? pr.month : pr.excl}</small>
          </div>
          <ul className="chk">{it.includes.map((x) => <li key={x}>{x}</li>)}</ul>
          <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
            {it.cta === "pay" && <Cta className="btn btn-d" href={payLink(locale, it.price, ask(it.title))}>{pr.pay}</Cta>}
            <Cta className={"btn " + (it.cta === "pay" ? "btn-l" : "btn-d")} href={ask(it.title)}>{pr.ask}</Cta>
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <>
      <section className="hero"><div className="w">
        <h1 style={{ maxWidth: 860 }}>{p.hero.title}</h1>
        <p style={{ color: "var(--on-navy)", fontSize: "1.15rem", maxWidth: 680, marginTop: 18 }}>{p.hero.text}</p>
        <div className="btns"><a className="btn btn-m" href="#feed-pricing">{p.hero.btn}</a></div>
        <p style={{ color: "#8FA3B8", fontSize: ".85rem", marginTop: 16 }}>{p.hero.note}</p>
      </div></section>
      <section><div className="w">
        <div className="head"><h2>{p.benefitsTitle}</h2><p>{p.benefitsText}</p></div>
        <div className="g3">{p.benefits.map(([t, d]) => <div className="card" key={t}><h3>{t}</h3><p style={{ color: "var(--mute)", marginTop: 8 }}>{d}</p></div>)}</div>
      </div></section>
      <section className="soft" id="feed-pricing"><div className="w">
        <div className="head"><h2>{p.onceTitle}</h2></div>
        <Grid items={byId(p.once)} />
        <div className="head" style={{ marginTop: 56 }}><h2>{p.monthlyTitle}</h2></div>
        <Grid items={byId(p.monthly)} />
        <p className="note" style={{ textAlign: "center", marginTop: 24 }}>{pr.vat}</p>
        <div style={{ textAlign: "center", marginTop: 12 }}><Cta className="btn btn-d" href={`/${locale}/pricing`}>{p.packagesBtn}</Cta></div>
      </div></section>
      <section><div className="w g2">
        <div><h2>{p.whoTitle}</h2><p style={{ color: "var(--mute)", marginTop: 12 }}>{p.whoText}</p></div>
        <div className="card"><ul className="chk">{p.who.map((x) => <li key={x}>{x}</li>)}</ul></div>
      </div></section>
      <section className="soft"><div className="w">
        <div className="head c"><h2>{p.faqTitle}</h2></div>
        <Faq items={p.faq} />
      </div></section>
      <section className="cta"><div className="w">
        <h2>{p.hero.title}</h2>
        <Cta className="btn btn-m" href={waLink(locale, p.wa)}>{locale === "nl" ? "Stuur ons een bericht op WhatsApp" : "Message us on WhatsApp"}</Cta>
      </div></section>
    </>
  );
}
