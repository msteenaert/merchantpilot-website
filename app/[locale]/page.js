import Link from "next/link";
import { content } from "@/lib/content";
import { money, waLink, waIsLive, TRUST } from "@/lib/site";
import HeroPlatforms from "@/components/HeroPlatforms";
import ChatCta from "@/components/ChatCta";
import Icon from "@/components/Icon";
import TrustRow from "@/components/TrustRow";
import Faq from "@/components/Faq";

function Cta({ href, className, children }) {
  const external = href.startsWith("http");
  return external
    ? <a className={className} href={href} target="_blank" rel="noopener">{children}</a>
    : <Link className={className} href={href}>{children}</Link>;
}

export default async function Home({ params }) {
  const { locale } = await params;
  const c = content[locale];
  const wa = (text) => waLink(locale, text);

  return (
    <>
      <section className="hf">
        <div className="w">
          <div>
            <span className="hf-k"><i></i>{c.hero.kicker}</span>
            <h1>{c.hero.title}</h1>
            <div className="hf-b">
              <Cta className="btn btn-m" href={`/${locale}/pricing`}>{c.hero.btn1}</Cta>
              <a className="btn btn-o" href="#problems">{c.hero.btn2}</a>
            </div>
            <div className="hf-tr">
              <div className="hf-av">{TRUST.initials.map((x, i) => <span key={i}>{TRUST.photos[i] ? <img src={TRUST.photos[i]} alt="" /> : x}</span>)}</div>
              <div className="hf-tt"><div className="hf-rt"><span className="hf-sr" aria-hidden="true">★★★★★</span><b>{c.hero.trustLine}/5</b></div><em>{c.hero.trustSub}</em></div>
            </div>
          </div>
          <HeroPlatforms locale={locale} />
        </div>
      </section>

      <section id="problems">
        <div className="w pb-wrap">
          <div className="head"><h2>{c.problems.title}</h2><p>{c.problems.text}</p></div>
          <div className="grid3">
            {c.problems.items.map(([title, text, link, kind], i) => (
              <Cta className={"card pb" + (i === 0 ? " hl" : "")} key={i} href={kind === "wa" ? `/${locale}/${i === 0 ? "pricing" : "feed-management"}` : `/${locale}/pricing`}>
                <div className="ico"><Icon name={["shield", "refresh", "search", "feed", "pulse", "alert"][i]} /></div>
                <div className="pb-t"><h3>{title}</h3><p>{text}</p></div>
                <span className="go">{link} →</span>
              </Cta>
            ))}
          </div>
        </div>
      </section>

      <section className="ss" id="setup">
        <div className="w">
          <div>
            <span className="ss-k">{c.setup.kicker}</span>
            <h2>{c.setup.title}</h2>
            <p style={{ color: "var(--mute)", fontSize: "1.05rem", marginTop: 14 }}>{c.setup.text}</p>
            <ul className="ss-li">{c.setup.bullets.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <div className="ss-card">
            <div className="ss-tl">
              {c.setup.cards.map(([a, b], i) => (
                <div className={"ss-nd" + (i === 2 ? " last" : "")} key={i}>
                  <div className="ss-ic"><Icon name={["store", "feed", "shield"][i]} /></div>
                  <div className="ss-tx"><b>{a}</b><em>{b}</em></div>
                </div>
              ))}
            </div>
            <ul className="ss-p">
              {c.setup.lines.map(([label, key]) => <li key={key}><span>{label}</span><b>{money(locale, key)}</b></li>)}
            </ul>
            <Cta className="btn btn-d ss-btn" href={`/${locale}/pricing`}>{c.setup.button}</Cta>
          </div>
        </div>
      </section>

      <section>
        <div className="w">
          <div className="head c"><h2>{c.trust.title}</h2></div>
          <div className="tg-g" style={{ "--tg": 3 }}>
            {c.trust.items.map(([t, d], i) => (
              <div className="tg-c" key={i}>
                <span className="tg-i"><Icon name={["people", "global", "price", "process", "shield", "price"][i]} /></span>
                <h3>{t}</h3><p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="soft" id="pricing">
        <div className="w">
          <div className="head"><h2>{c.tiers.title}</h2><p>{c.tiers.text}</p></div>
          <div className="st-g">
            {c.tiers.items.map((tier, i) => (
              <article className={"st-c" + (tier.dark ? " hl" : "")} key={i}>
                <span className="st-l">{tier.tag}</span>
                <h3>{tier.title}</h3>
                <p className="st-t">{tier.text}</p>
                <ul className="st-ls">
                  {tier.lines.map(([label, key, prefix, suffix]) => (
                    <li key={key}><span>{label}</span><b>{prefix}{money(locale, key)}{suffix || ""}</b></li>
                  ))}
                </ul>
                <div className="st-b"><Cta className={"btn " + (tier.dark ? "btn-m" : "btn-d")} href={tier.wa ? `/${locale}/feed-management` : `/${locale}/pricing`}>{tier.button}</Cta></div>
              </article>
            ))}
          </div>
          <p className="st-all"><Cta className="btn btn-l" href={`/${locale}/pricing`}>{c.tiers.link}</Cta></p>
        </div>
      </section>

      <section className="soft">
        <div className="w">
          <div className="head"><h2>{c.reviews.title}</h2></div>
          <div className="g3">
            {c.reviews.items.map(([name, store, quote], i) => (
              <figure className="card rv" key={i}>
                <div className="rvh">
                  {TRUST.photos[i] ? <img className="rva" src={TRUST.photos[i]} alt={name} /> : <span className="rva">{name.slice(0, 1).toUpperCase()}</span>}
                  <div><b className="rvn">{name}</b><span className="rvs" aria-label="5 / 5">★★★★★</span></div>
                </div>
                <blockquote className="rvt" style={{ margin: 0 }}>{quote}</blockquote>
                <span className="rvm">{store}</span>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="w">
          <div className="head c"><h2>{c.faq.title}</h2></div>
          <Faq items={c.faq.items} />
        </div>
      </section>

      <ChatCta locale={locale} />
    </>
  );
}
