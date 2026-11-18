import { ads } from "@/lib/pages";
import { waLink } from "@/lib/site";
import { content } from "@/lib/content";
import TrustRow from "@/components/TrustRow";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { title: locale === "nl" ? "Advertentiepartners | MerchantPilot" : "Ad partners | MerchantPilot" };
}

const logo = (id) => `/logos/${id === "google" ? "google-ads" : id}.png`;

export default async function AdPartners({ params }) {
  const { locale } = await params;
  const a = ads[locale];
  const c = content[locale];

  return (
    <>
      <section className="hero">
        <div className="w g">
          <div>
            <span className="kick">{a.hero.kicker}</span>
            <h1>{a.hero.title}</h1>
            <p style={{ color: "var(--on-navy)", fontSize: "1.15rem", margin: "20px 0 0", maxWidth: 560 }}>{a.hero.text}</p>
            <div className="btns">
              <Cta className="btn btn-m" href={waLink(locale, a.hero.waText)}>{a.hero.btn1}</Cta>
              <a className="btn btn-o" href="#partners">{a.hero.btn2}</a>
            </div>
            <TrustRow line={c.hero.trustLine} sub={c.hero.trustSub} />
            <p style={{ color: "#8FA3B8", fontSize: ".82rem", marginTop: 18, maxWidth: 520 }}>{a.hero.note}</p>
          </div>
          <div className="chan">
            <div className="hub"><b>{a.hero.hubTitle}</b><small>{a.hero.hubSub}</small></div>
            {a.channels.map(([id, name, tag]) => (
              <div className={"tile t-" + id} key={id}>
                <img src={logo(id)} alt={name} />
                <span>{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="soft" id="partners">
        <div className="w">
          <div className="head"><h2>{a.partnersTitle}</h2><p>{a.partnersText}</p></div>
          <div className="g3">
            {a.partners.map((x) => (
              <div className="card tier" key={x.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <img src={logo(x.id)} alt={x.name} style={{ height: 40, maxWidth: 150, objectFit: "contain" }} />
                  <span className="pill">{x.tag}</span>
                </div>
                <h3>{x.role}</h3>
                <p style={{ marginTop: 8 }}>{x.text}</p>
                <ul className="chk">{x.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                <div className="pl" style={{ marginTop: 18 }}><span style={{ color: "var(--mute)" }}>{a.priceLabel}</span><b>{a.priceFallback}</b></div>
                <div style={{ background: "#E7F8F4", border: "1px solid #BFEBE0", borderRadius: 12, padding: "12px 14px", margin: "16px 0 20px" }}>
                  <div style={{ fontSize: ".72rem", fontWeight: 800, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--mint-d)" }}>{a.discountLabel}</div>
                  <div style={{ fontSize: ".92rem" }}>{a.discount}</div>
                </div>
                <Cta className="btn btn-d" href={waLink(locale, a.waIntro(x.name))}>{a.button}</Cta>
              </div>
            ))}
          </div>
          <p className="note" style={{ textAlign: "center", marginTop: 20 }}>{a.partnerNote}</p>
        </div>
      </section>

      <section>
        <div className="w">
          <div className="head"><h2>{a.stepsTitle}</h2></div>
          <div className="steps">
            {a.steps.map(([t, d], i) => (
              <div className="step" key={i}><div className="num">{i + 1}</div><b>{t}</b><p style={{ color: "var(--mute)", margin: "6px 0 0" }}>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="soft">
        <div className="w">
          <div className="head c"><h2>{a.faqTitle}</h2></div>
          <Faq items={a.faq} />
        </div>
      </section>

      <section className="cta">
        <div className="w">
          <h2>{a.cta.title}</h2>
          <p>{a.cta.text}</p>
          <Cta className="btn btn-m" href={waLink(locale, a.hero.waText)}>{a.cta.button}</Cta>
        </div>
      </section>
    </>
  );
}
