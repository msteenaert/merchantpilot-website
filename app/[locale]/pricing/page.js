import { pricing } from "@/lib/pages";
import { money, waLink, payLink } from "@/lib/site";
import TrustRow from "@/components/TrustRow";
import Faq from "@/components/Faq";
import WhoBadge from "@/components/WhoBadge";
import Cta from "@/components/Cta";
import Tabs from "@/components/Tabs";
import FlowHero from "@/components/FlowHero";
import { content } from "@/lib/content";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { title: locale === "nl" ? "Diensten en prijzen | MerchantPilot" : "Services and pricing | MerchantPilot" };
}

export default async function Pricing({ params }) {
  const { locale } = await params;
  const p = pricing[locale];
  const c = content[locale];
  const ask = (it) => {
    const nl = locale === "nl";
    const price = it.custom ? "" : ` (${it.from ? (nl ? "vanaf " : "from ") : ""}${money(locale, it.price)}${it.monthly ? (nl ? " per maand" : " per month") : ""} ${nl ? "excl. btw" : "excl. VAT"})`;
    return waLink(locale, nl ? `Hoi, ik wil graag starten met ${it.title}${price}.` : `Hi, I'd like to get started with ${it.title}${price}.`);
  };

  return (
    <>
      <section className="hf">
        <div className="w">
          <div>
            <span className="hf-k"><i></i>{p.hero.kicker}</span>
            <h1>{p.hero.title}</h1>
            <p style={{ color: "var(--on-navy)", fontSize: "1.15rem", margin: "20px 0 0", maxWidth: 520 }}>{p.hero.text}</p>
            <div className="hf-b"><a className="btn btn-m" href="#packages">{p.hero.btn2}</a></div>
            <TrustRow line={c.hero.trustLine} sub={c.hero.trustSub} />
          </div>
          <FlowHero locale={locale} />
        </div>
      </section>

      <section id="packages">
        <div className="w">
          <div className="head"><h2>{p.packagesTitle}</h2></div>
          <Tabs labels={p.groups.map((g) => g.title)} ids={p.groups.map((g) => g.items.map((i) => i.id).join(" "))}>
            {p.groups.map((g, gi) => (
              <div key={gi}>
                <p className="pk-note">{g.text}</p>
                <div className="pk-g">
                  {g.items.map((it) => (
                    <article className="pk" id={it.id} key={it.id}>
                      <span className="pk-fee">{it.fee}</span>
                      <h3>{it.title}</h3>
                      <div className="pk-price">
                        {it.custom ? it.custom : <>{it.from ? <span style={{ fontSize: "1.1rem", fontWeight: 700 }}>{locale === "nl" ? "Vanaf " : "From "}</span> : null}{money(locale, it.price)}</>}
                        {!it.custom && <small>{it.monthly ? p.month : p.excl}</small>}
                      </div>
                      <div className="pk-tags">{it.tags.map((t) => <span key={t}>{t}</span>)}</div>
                      <p className="pk-desc">{it.desc}</p>
                      <div className="pk-time"><span>{p.time}</span><b>{it.time}</b></div>
                      <div className="pk-btns">
                        {it.cta === "pay" && <Cta className="btn btn-d" href={payLink(locale, it.price, ask(it))}>{p.pay}</Cta>}
                        {it.cta !== "pay" && <Cta className="btn btn-d" href={ask(it)}>{p.ask}</Cta>}
                      </div>
                      <div className="pk-inc"><b>{p.includes}</b><ul>{it.includes.map((x) => <li key={x}>{x}</li>)}</ul></div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </Tabs>
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
          <WhoBadge locale={locale} />
          <h2>{c.cta.title}</h2>
          <p>{c.cta.text}</p>
          <Cta className="btn btn-m" href={waLink(locale, c.cta.waText)}>{c.cta.button}</Cta>
        </div>
      </section>
    </>
  );
}
