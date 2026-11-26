import { partners } from "@/lib/partners";
import { money, commission } from "@/lib/site";
import PartnerForm from "@/components/PartnerForm";
import PartnerPortal from "@/components/PartnerPortal";
import Faq from "@/components/Faq";
import Reveal from "@/components/Reveal";
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
  const stepIcons = ["people", "shield", "cash"];
  return (
    <>
      <section className="prh prh-t">
        <div className="w">
          <span className="prh-k"><i></i>{p.hero.kicker} · {locale === "nl" ? "10% commissie" : "earn 10% commission"}</span>
          <h1>{p.hero.title}</h1>
          <p className="lead">{p.hero.text}</p>
          <div className="prh-b">
            <a className="btn btn-m" href="#apply">{p.hero.btn1}</a>
            <a className="btn btn-o" href="#how">{p.hero.btn2}</a>
          </div>
          <p className="prh-l"><a href="#portal">{locale === "nl" ? "Al partner? Bekijk je dashboard" : "Already a partner? View your dashboard"}</a></p>
        </div>
      </section>

      <section id="how">
        <div className="w hw">
          <div className="hw-h"><h2>{p.howTitle}</h2><p>{p.howText}</p></div>
          <div className="hw-s">
            {p.how.map(([k, t, d], i) => (
              <Reveal className="hw-c" key={k}>
                <span className="hw-k">{k}</span>
                <h3><Icon name={stepIcons[i]} />{t}</h3>
                <p>{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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

      <section className="soft">
        <div className="w">
          <div className="head c"><h2>{p.faqTitle}</h2></div>
          <Faq items={p.faq} />
        </div>
      </section>

      <section id="portal">
        <div className="w pp-w">
          <div className="head"><h2>{locale === "nl" ? "Partner dashboard" : "Partner dashboard"}</h2><p>{locale === "nl" ? "Bekijk de klanten die je hebt doorgestuurd en je commissie. Gebruik de code en toegangssleutel die je van ons kreeg." : "See the clients you referred and your commission. Use the code and access key we sent you."}</p></div>
          <PartnerPortal locale={locale} />
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
