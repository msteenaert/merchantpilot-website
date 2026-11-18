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

const agency = { google: "/agencies/bolt.png", meta: "/agencies/mediagrow.png", pinterest: "/agencies/ps.png" };
const logo = (id) => `/logos/${id === "google" ? "google-ads" : id}.png`;

export default async function AdPartners({ params }) {
  const { locale } = await params;
  const a = ads[locale];
  const c = content[locale];

  return (
    <>
      <section className="ah">
        <div className="w ah-g">
          <div className="ah-l">
            <p className="ah-k">{a.hero.kicker}</p>
            <h1>{a.hero.title}</h1>
            <p className="ah-p">{a.hero.text}</p>
            <div className="ah-b">
              <Cta className="btn btn-m" href={waLink(locale, a.hero.waText)}>{a.hero.btn1}</Cta>
              <a className="btn btn-o" href="#partners">{a.hero.btn2}</a>
            </div>
            <TrustRow line={c.hero.trustLine} sub={c.hero.trustSub} />
            <p className="ah-n">{a.hero.note}</p>
          </div>
          <div className="ah-v">
            <svg className="ah-ln" viewBox="0 0 100 92" preserveAspectRatio="none" aria-hidden="true"><line x1="18" y1="13" x2="50" y2="43" /><line x1="82" y1="13" x2="50" y2="43" /><line x1="50" y1="80" x2="50" y2="43" /></svg>
            {a.channels.slice(0, 3).map(([id, name, tag], i) => (
              <div className={"ah-t ah-t" + (i + 1)} key={id}>
                <div className="ah-lg"><img src={logo(id)} alt={name} /></div>
                <div className="ah-tg">{tag}</div>
              </div>
            ))}
            <div className="ah-hub"><b>{a.hero.hubTitle}</b><small>{a.hero.hubSub}</small></div>
          </div>
        </div>
      </section>

      <section className="soft" id="partners">
        <div className="w">
          <div className="head"><h2>{a.partnersTitle}</h2><p>{a.partnersText}</p></div>
          <div className="ap-g">
            {a.partners.map((x) => (
              <article className="ap-c" key={x.id}>
                <div className="ap-top">
                  <div className="ap-lg"><img src={agency[x.id]} alt={x.name + " partner"} /></div>
                  <span className="ap-r">{x.tag}</span>
                </div>
                <h3>{x.role}</h3>
                <p className="ap-d">{x.text}</p>
                <ul>{x.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                <dl className="ap-pr"><dt>{a.priceLabel}</dt><dd>{a.priceFallback}</dd></dl>
                <div className="ap-ds"><b>{a.discountLabel}</b>{a.discount}</div>
                <Cta className="btn btn-d" href={waLink(locale, a.waIntro(x.name))}>{a.button}</Cta>
              </article>
            ))}
          </div>
          <p className="ap-note">{a.partnerNote}</p>
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
