import { partners } from "@/lib/partners";
import { money, waLink } from "@/lib/site";
import PartnerForm from "@/components/PartnerForm";
import ChatCta from "@/components/ChatCta";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { title: (locale === "nl" ? "Partnerprogramma" : "Partner program") + " | MerchantPilot" };
}

export default async function Partners({ params }) {
  const { locale } = await params;
  const p = partners[locale];
  return (
    <>
      <section className="hf">
        <div className="w">
          <div>
            <span className="hf-k"><i></i>{p.hero.kicker}</span>
            <h1>{p.hero.title}</h1>
            <p style={{ color: "var(--on-navy)", fontSize: "1.15rem", margin: "20px 0 0", maxWidth: 560 }}>{p.hero.text}</p>
            <div className="hf-b">
              <a className="btn btn-m" href="#apply">{p.hero.btn1}</a>
              <a className="btn btn-o" href="#how">{p.hero.btn2}</a>
            </div>
          </div>
          <div className="hf-fx" id="how">
            <div className="hf-c" style={{ background: "var(--navy2)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 20, padding: 20 }}>
              {p.hero.steps.map(([a, b], i) => (
                <div key={a}>
                  {i > 0 && <i className="hf-ln" />}
                  <div className="hf-st"><svg viewBox="0 0 24 24" aria-hidden="true">{i === 0 ? <path d="M13 2L4 14h7l-1 8 9-12h-7z" /> : i === 1 ? <g><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" /><path d="M9 12l2 2 4-4" /></g> : <g><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></g>}</svg><span><b style={{ display: "block" }}>{a}</b><small style={{ color: "var(--on-navy)" }}>{b}</small></span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section><div className="w">
        <div className="head c"><h2>{p.whoTitle}</h2><p>{p.whoText}</p></div>
        <div className="g3">{p.who.map(([t, d]) => <div className="card" key={t}><h3>{t}</h3><p style={{ color: "var(--mute)", marginTop: 8 }}>{d}</p></div>)}</div>
      </div></section>
      <section className="soft" id="commission"><div className="w">
        <div className="head"><h2>{p.commTitle}</h2><p>{p.commText}</p></div>
        <div className="g3">
          {p.services.map(([name, key, from]) => {
            const amount = money(locale, key);
            return (
              <div className="card" key={name}>
                <h3>{name}</h3>
                <div style={{ fontSize: "1.7rem", fontWeight: 800 }}>{from ? (locale === "nl" ? "Vanaf " : "From ") : ""}{amount}</div>
                <span className="pill">{p.earn} 10%</span>
              </div>
            );
          })}
        </div>
        <p className="note" style={{ marginTop: 20 }}>{p.commFine}</p>
      </div></section>
      <section id="options"><div className="w">
        <div className="head"><h2>{p.optTitle}</h2><p>{p.optText}</p></div>
        <div className="g2">
          {p.options.map(([label, title, text, feat]) => (
            <div className={"card tier" + (feat ? " feat" : "")} key={title} style={feat ? { borderColor: "var(--mint-d)" } : undefined}>
              <span className="pill">{label}</span>
              <h3>{title}</h3>
              <p style={{ color: "var(--mute)" }}>{text}</p>
              <a className="btn btn-d" href="#apply">{p.optBtn}</a>
            </div>
          ))}
        </div>
      </div></section>
      <section className="soft"><div className="w">
        <div className="head"><h2>{p.whyTitle}</h2></div>
        <div className="g3">{p.why.map(([t, d]) => <div className="card" key={t}><h3>{t}</h3><p style={{ color: "var(--mute)", marginTop: 8 }}>{d}</p></div>)}</div>
      </div></section>
      <section id="apply"><div className="w g2">
        <div><h2>{p.form.title}</h2><p style={{ color: "var(--mute)", margin: "14px 0" }}>{p.form.text}</p><ul className="chk">{p.form.points.map((x) => <li key={x}>{x}</li>)}</ul></div>
        <PartnerForm locale={locale} t={p.form} />
      </div></section>
      <ChatCta locale={locale} />
    </>
  );
}
