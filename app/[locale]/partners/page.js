import { partners } from "@/lib/partners";
import { money, commission } from "@/lib/site";
import PartnerForm from "@/components/PartnerForm";
import LogoStrip from "@/components/LogoStrip";
import Icon from "@/components/Icon";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { title: (locale === "nl" ? "Partnerprogramma" : "Partner program") + " | MerchantPilot" };
}

export default async function Partners({ params }) {
  const { locale } = await params;
  const p = partners[locale];
  const whoIcons = ["chart", "code", "megaphone", "briefcase", "user"];
  const whyIcons = ["shield", "people", "chart", "process", "support", "global"];
  const stepIcons = ["people", "shield", "euro"];
  return (
    <>
      <section className="prh">
        <div className="w">
          <div>
            <span className="prh-k"><i></i>{p.hero.kicker}</span>
            <h1>{p.hero.title}</h1>
            <p className="lead">{p.hero.text}</p>
            <div className="prh-b">
              <a className="btn btn-m" href="#apply">{p.hero.btn1}</a>
              <a className="btn btn-o" href="#commission">{p.hero.btn2}</a>
            </div>
          </div>
          <div className="prh-c" id="how">
            <div className="prh-tl">
              {p.hero.steps.map(([a, b], i) => (
                <div className={"prh-nd" + (i === 2 ? " last" : "")} key={a}>
                  <div className="prh-ic"><Icon name={stepIcons[i]} /></div>
                  <div className="prh-tx"><strong>{a}</strong><span>{b}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LogoStrip label={locale === "nl" ? "Onze agencypartners" : "Our agency partners"} logos={[["/agencies/ps.png", "Agency partner"], ["/agencies/mediagrow.png", "MediaGrow"], ["/agencies/bolt.png", "Agency partner"]]} />

      <section>
        <div className="w">
          <div className="head c"><h2>{p.whoTitle}</h2><p>{p.whoText}</p></div>
          <div className="tg-g ctr">
            {p.who.map(([t, d], i) => (
              <div className="tg-c" key={t}><span className="tg-i"><Icon name={whoIcons[i]} /></span><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="soft" id="commission">
        <div className="w">
          <div className="head"><h2>{p.commTitle}</h2><p>{p.commText}</p></div>
          <div className="cm-g">
            {p.services.map(([name, key, from]) => (
              <article className="cm-c" key={name}>
                <h3>{name}</h3>
                <p className="cm-p">{from ? (locale === "nl" ? "Vanaf " : "From ") : ""}{money(locale, key)}</p>
                <div className="cm-e"><span>{p.earn}</span><b>{commission(locale, key)}</b></div>
              </article>
            ))}
          </div>
          <p className="cm-n">{p.commFine}</p>
        </div>
      </section>

      <section id="options">
        <div className="w">
          <div className="head"><h2>{p.optTitle}</h2><p>{p.optText}</p></div>
          <div className="pm-g">
            {p.options.map(([label, title, text, feat]) => (
              <article className={"pm-c" + (feat ? " hl" : "")} key={title}>
                <span className="pm-l">{label}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <div className="pm-b"><a className={"btn " + (feat ? "btn-m" : "btn-d")} href="#apply">{p.optBtn}</a></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="w">
          <div className="head c"><h2>{p.whyTitle}</h2></div>
          <div className="tg-g" style={{ "--tg": 3 }}>
            {p.why.map(([t, d], i) => (
              <div className="tg-c" key={t}><span className="tg-i"><Icon name={whyIcons[i]} /></span><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="soft" id="apply">
        <div className="w pf-w">
          <div>
            <h2>{p.form.title}</h2>
            <p style={{ marginTop: 14, color: "var(--mute)" }}>{p.form.text}</p>
            <ul className="pf-in">{p.form.points.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <PartnerForm locale={locale} t={p.form} />
        </div>
      </section>
    </>
  );
}
