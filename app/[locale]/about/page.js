import { aboutPage } from "@/lib/pages2";
import { waLink, OWNERS } from "@/lib/site";
import ChatCta from "@/components/ChatCta";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { title: (locale === "nl" ? "Over ons" : "About") + " | MerchantPilot" };
}

export default async function About({ params }) {
  const { locale } = await params;
  const p = aboutPage[locale];
  return (
    <>
      <section className="hero"><div className="w">
        <h1 style={{ maxWidth: 820 }}>{p.hero.title}</h1>
        <p style={{ color: "var(--on-navy)", fontSize: "1.15rem", maxWidth: 680, marginTop: 18 }}>{p.hero.text}</p>
      </div></section>
      <section><div className="w g2">
        <div><h2>{p.whoTitle}</h2>{p.who.map((t) => <p key={t} style={{ color: "var(--mute)", marginTop: 14 }}>{t}</p>)}</div>
        <div className="card"><h3>{p.approachTitle}</h3><p style={{ color: "var(--mute)", margin: "8px 0" }}>{p.approachText}</p><ul className="chk">{p.approach.map((x) => <li key={x}>{x}</li>)}</ul></div>
      </div></section>
      <section className="soft"><div className="w">
        <div className="head"><h2>{p.teamTitle}</h2><p>{p.teamText}</p></div>
        <div className="card" style={{ maxWidth: 560 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
            {OWNERS.nomi ? <img src={OWNERS.nomi} alt={p.person.name} className="rva" style={{ objectFit: "cover" }} /> : <span className="rva">{p.person.name[0]}</span>}
            <div><b>{p.person.name}</b><div style={{ color: "var(--mute)", fontSize: ".9rem" }}>{p.person.role}</div></div>
          </div>
          <p>{p.person.text}</p>
        </div>
      </div></section>
      <section><div className="w">
        <div className="head"><h2>{p.valuesTitle}</h2></div>
        <div className="g3">{p.values.map(([t, d]) => <div className="card" key={t}><h3>{t}</h3><p style={{ color: "var(--mute)", marginTop: 8 }}>{d}</p></div>)}</div>
      </div></section>
      <ChatCta locale={locale} />
    </>
  );
}
