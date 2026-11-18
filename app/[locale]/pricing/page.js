import { pricing } from "@/lib/pages";
import { money, waLink, payLink } from "@/lib/site";
import TrustRow from "@/components/TrustRow";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import { content } from "@/lib/content";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { title: locale === "nl" ? "Diensten en prijzen | MerchantPilot" : "Services and pricing | MerchantPilot" };
}

export default async function Pricing({ params }) {
  const { locale } = await params;
  const p = pricing[locale];
  const c = content[locale];
  const ask = (title) => waLink(locale, locale === "nl" ? `Hoi, ik heb een vraag over: ${title}.` : `Hi, I have a question about: ${title}.`);

  return (
    <>
      <section className="hero">
        <div className="w">
          <span className="kick">{p.hero.kicker}</span>
          <h1 style={{ maxWidth: 820 }}>{p.hero.title}</h1>
          <p style={{ color: "var(--on-navy)", fontSize: "1.15rem", maxWidth: 640, marginTop: 18 }}>{p.hero.text}</p>
          <div className="btns">
            <Cta className="btn btn-m" href={waLink(locale, p.hero.waHelp)}>{p.hero.btn1}</Cta>
            <a className="btn btn-o" href="#packages">{p.hero.btn2}</a>
          </div>
          <TrustRow line={c.hero.trustLine} sub={c.hero.trustSub} />
        </div>
      </section>

      <section id="packages">
        <div className="w">
          <div className="head"><h2>{p.packagesTitle}</h2></div>
          {p.groups.map((g, gi) => (
            <div key={gi} style={{ marginBottom: 48 }}>
              <h3 style={{ fontSize: "1.4rem" }}>{g.title}</h3>
              <p style={{ color: "var(--mute)", margin: "8px 0 20px", maxWidth: 680 }}>{g.text}</p>
              <div className="g3">
                {g.items.map((it) => (
                  <div className="card tier" id={it.id} key={it.id}>
                    <span className="pill">{it.fee}</span>
                    <h3 style={{ marginTop: 14 }}>{it.title}</h3>
                    <div style={{ margin: "10px 0 4px", fontSize: "2rem", fontWeight: 800, letterSpacing: "-.02em" }}>
                      {it.custom ? it.custom : <>{it.from ? <span style={{ fontSize: "1.1rem", fontWeight: 700 }}>{locale === "nl" ? "Vanaf " : "From "}</span> : null}{money(locale, it.price)}</>}
                      {!it.custom && <small style={{ fontSize: ".8rem", color: "var(--mute)", fontWeight: 500, marginLeft: 6 }}>{it.monthly ? p.month : p.excl}</small>}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "8px 0 12px" }}>
                      {it.tags.map((t) => <span key={t} className="pill" style={{ background: "var(--soft)", color: "var(--mute)", textTransform: "none", letterSpacing: 0 }}>{t}</span>)}
                    </div>
                    <p>{it.desc}</p>
                    <div style={{ fontSize: ".8rem", color: "var(--mute)", fontWeight: 700, margin: "18px 0 6px", textTransform: "uppercase", letterSpacing: ".06em" }}>{p.includes}</div>
                    <ul className="chk" style={{ marginTop: 6 }}>{it.includes.map((x) => <li key={x}>{x}</li>)}</ul>
                    <div className="pl" style={{ marginTop: 18 }}><span style={{ color: "var(--mute)" }}>{p.time}</span><b>{it.time}</b></div>
                    <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
                      {it.cta === "pay" && <Cta className="btn btn-d" href={payLink(locale, it.price, ask(it.title))}>{p.pay}</Cta>}
                      <Cta className={"btn " + (it.cta === "pay" ? "btn-l" : "btn-d")} href={ask(it.title)}>{p.ask}</Cta>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <p className="note" style={{ textAlign: "center" }}>{p.vat}</p>
        </div>
      </section>

      <section className="soft">
        <div className="w">
          <div className="head"><h2>{p.compareTitle}</h2><p>{p.compareText}</p></div>
          <div className="card" style={{ padding: 0, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
              <thead>
                <tr><th style={{ textAlign: "left", padding: 16 }}></th>{p.plans.map((x) => <th key={x} style={{ padding: 16, textAlign: "center" }}>{x}</th>)}</tr>
              </thead>
              <tbody>
                {p.features.map(([label, marks]) => (
                  <tr key={label} style={{ borderTop: "1px solid var(--line)" }}>
                    <td style={{ padding: 14 }}>{label}</td>
                    {marks.map((m, i) => <td key={i} style={{ padding: 14, textAlign: "center", color: m ? "var(--mint-d)" : "#B7C2CE", fontWeight: 800 }}>{m ? "✓" : "–"}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="note">{p.fine}</p>
        </div>
      </section>

      <section>
        <div className="w">
          <div className="head c"><h2>{p.faqTitle}</h2></div>
          <Faq items={p.faq} />
        </div>
      </section>

      <section className="cta">
        <div className="w">
          <h2>{c.cta.title}</h2>
          <p>{c.cta.text}</p>
          <Cta className="btn btn-m" href={waLink(locale, c.cta.waText)}>{c.cta.button}</Cta>
        </div>
      </section>
    </>
  );
}
