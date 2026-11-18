import Link from "next/link";
import { content } from "@/lib/content";
import { money, waLink, waIsLive, TRUST } from "@/lib/site";
import HeroPlatforms from "@/components/HeroPlatforms";
import ChatCta from "@/components/ChatCta";
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
              <Cta className="btn btn-m" href={wa(c.hero.waSetup)}>{c.hero.btn1}</Cta>
              <a className="btn btn-o" href="#problems">{c.hero.btn2}</a>
            </div>
            <div className="hf-tr">
              <div className="hf-av">{TRUST.initials.map((x, i) => <span key={i}>{TRUST.photos[i] ? <img src={TRUST.photos[i]} alt="" /> : x}</span>)}</div>
              <div className="hf-tt"><span className="hf-sr" aria-hidden="true">★★★★★</span><b>{c.hero.trustLine}</b><em>{c.hero.trustSub}</em></div>
            </div>
          </div>
          <HeroPlatforms locale={locale} />
        </div>
      </section>

      <section id="problems">
        <div className="w">
          <div className="head"><h2>{c.problems.title}</h2><p>{c.problems.text}</p></div>
          <div className="g3">
            {c.problems.items.map(([title, text, link, kind], i) => (
              <div className={"card" + (i === 0 ? " sel" : "")} key={i}>
                <div className="ico">{i + 1}</div>
                <h3>{title}</h3>
                <p>{text}</p>
                <Cta className="lnk" href={kind === "wa" ? wa(i === 0 ? c.hero.waSetup : c.problems.waSuspended) : `/${locale}/pricing`}>{link} →</Cta>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="soft" id="setup">
        <div className="w spot">
          <div>
            <span className="kk">{c.setup.kicker}</span>
            <h2 style={{ fontSize: "clamp(1.8rem,3.4vw,2.5rem)" }}>{c.setup.title}</h2>
            <p style={{ color: "var(--mute)", fontSize: "1.1rem", marginTop: 14 }}>{c.setup.text}</p>
            <ul className="chk">{c.setup.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
          </div>
          <div className="card">
            <div className="stack">
              {c.setup.cards.map(([a, b], i) => (
                <div className={"row" + (i === 2 ? " m" : "")} key={i}>
                  <span className="ico" style={{ margin: 0, width: 34, height: 34 }}>✓</span>
                  <div><b>{a}</b><small>{b}</small></div>
                </div>
              ))}
            </div>
            {c.setup.lines.map(([label, key]) => (
              <div className="pl" key={key}><span>{label}</span><b>{money(locale, key)}</b></div>
            ))}
            <Cta className="btn btn-d" href={wa(c.hero.waSetup)}>{c.setup.button}</Cta>
            <p className="note">{c.setup.note}</p>
          </div>
        </div>
      </section>

      <section>
        <div className="w">
          <div className="head c"><h2>{c.trust.title}</h2></div>
          <div className="g3">
            {c.trust.items.map(([t, d], i) => (
              <div className="card" key={i}><div className="ico">✓</div><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="soft">
        <div className="w">
          <div className="head"><h2>{c.process.title}</h2><p>{c.process.text}</p></div>
          <div className="steps">
            {c.process.steps.map((s, i) => (
              <div className="step" key={i}><div className="num">{i + 1}</div><b>{s}</b></div>
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
                <div className="st-b"><Cta className={"btn " + (tier.dark ? "btn-m" : "btn-d")} href={tier.wa ? wa(c.problems.waSuspended) : `/${locale}/pricing`}>{tier.button}</Cta></div>
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
