import { feedPage } from "@/lib/pages2";
import { feedExtra } from "@/lib/feedText";
import { pricing } from "@/lib/pages";
import { money, waLink, payLink } from "@/lib/site";
import Faq from "@/components/Faq";
import WhoBadge from "@/components/WhoBadge";
import Cta from "@/components/Cta";
import Tabs from "@/components/Tabs";
import Icon from "@/components/Icon";
import FeedVisual from "@/components/FeedVisual";
import Reveal from "@/components/Reveal";
import TrustRow from "@/components/TrustRow";
import { content } from "@/lib/content";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { title: (locale === "nl" ? "Feedbeheer" : "Feed management") + " | MerchantPilot" };
}

export default async function Feed({ params }) {
  const { locale } = await params;
  const p = feedPage[locale];
  const x = feedExtra[locale];
  const pr = pricing[locale];
  const c = content[locale];
  const all = pr.groups.flatMap((g) => g.items);
  const byId = (ids) => ids.map((id) => all.find((i) => i.id === id)).filter(Boolean);
  const ask = (title) => waLink(locale, locale === "nl" ? `Hoi, ik heb een vraag over: ${title}.` : `Hi, I have a question about: ${title}.`);
  const once = byId(p.once.filter((id) => id !== "feed-quick-fix"));
  const monthly = byId(p.monthly);

  const Pack = ({ it }) => (
    <article className="fp" id={it.id}>
      <h3>{it.title}</h3>
      <div className="fp-pr">
        <span>{it.from ? x.from : ""}</span>{money(locale, it.price)}<small>{it.monthly ? x.month : x.excl}</small>
      </div>
      <p className="fp-d">{it.desc}</p>
      <ul className="fp-l">{it.includes.slice(0, 3).map((i) => <li key={i}>{i}</li>)}</ul>
      <span className="fp-t">{x.time}: <b>{it.time}</b></span>
      <Cta className="btn btn-d" href={ask(it.title)}>{x.more}</Cta>
    </article>
  );

  return (
    <>
      <section className="hf">
        <div className="w">
          <div>
            <span className="hf-k"><i></i>{x.kicker}</span>
            <h1>{p.hero.title}</h1>
            <p style={{ color: "var(--on-navy)", fontSize: "1.15rem", margin: "20px 0 0", maxWidth: 520 }}>{p.hero.text}</p>
            <div className="hf-b">
              <a className="btn btn-m" href="#start">{x.startTitle}</a>
              <a className="btn btn-o" href="#packages">{p.hero.btn}</a>
            </div>
            <TrustRow line={c.hero.trustLine} sub={c.hero.trustSub} />
          </div>
          <FeedVisual locale={locale} />
        </div>
      </section>

      <section id="start">
        <div className="w">
          <div className="head c"><h2>{x.startTitle}</h2><p>{x.startText}</p></div>
          <div className="fs-g">
            {[x.quick, x.audit].map((s, i) => (
              <article className={"fs" + (i === 0 ? " hl" : "")} key={s.id}>
                <span className="fs-tag">{s.tag}</span>
                <h3>{s.title}</h3>
                <div className="fs-pr">{money(locale, s.key)}<small>{x.excl}</small></div>
                <p>{s.scope}</p>
                <Cta className={"btn " + (i === 0 ? "btn-m" : "btn-d")} href={payLink(locale, s.key, ask(s.title))}>{x.pay}</Cta>
                <Cta className="fs-ask" href={ask(s.title)}>{x.wa}</Cta>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="soft">
        <div className="w">
          <div className="head c"><h2>{x.benefitsTitle}</h2></div>
          <div className="tg-g">
            {x.benefits.map(([ic, t, d]) => (
              <div className="tg-c" key={t}>
                <div className="ico"><Icon name={ic} /></div>
                <h3>{t}</h3><p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="packages">
        <div className="w">
          <div className="head c"><h2>{x.packagesTitle}</h2></div>
          <Tabs labels={x.tabs} ids={[once.map((i) => i.id).join(" "), monthly.map((i) => i.id).join(" ")]}>
            <div>
              <p className="pk-note">{x.onceNote}</p>
              <div className="fp-g">{once.map((it) => <Pack it={it} key={it.id} />)}</div>
            </div>
            <div>
              <p className="pk-note">{x.monthlyNote}</p>
              <div className="fp-g">{monthly.map((it) => <Pack it={it} key={it.id} />)}</div>
            </div>
          </Tabs>
          <p style={{ textAlign: "center", marginTop: 28 }}><Cta className="btn btn-l" href={`/${locale}/pricing`}>{x.packagesBtn}</Cta></p>
        </div>
      </section>

      <section className="soft">
        <div className="w">
          <div className="head c"><h2>{x.howTitle}</h2></div>
          <div className="fh-g">
            {x.how.map(([t, d], i) => (
              <Reveal key={t} delay={i * 90}>
                <div className="fh"><span className="fh-n">{i + 1}</span><b>{t}</b><p>{d}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="w">
          <div className="head c"><h2>{x.whoTitle}</h2></div>
          <div className="fw">{p.who.map((w) => <span key={w}>{w}</span>)}</div>
        </div>
      </section>

      <section className="soft"><div className="w">
        <div className="head c"><h2>{p.faqTitle}</h2></div>
        <Faq items={p.faq} />
      </div></section>

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
