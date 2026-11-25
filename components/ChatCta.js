import { home } from "@/lib/home";
import { waLink, waIsLive } from "@/lib/site";
import WhoBadge from "./WhoBadge";
import Cta from "./Cta";

export default function ChatCta({ locale }) {
  const c = home[locale].chat;
  return (
    <section className="ask" id="book">
      <div className="w">
        <div>
          <div className="ask-chat" role="img" aria-label="WhatsApp">
            <div className="ask-top">
              <span className="ask-av"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></svg></span>
              <b>{c.name}</b>
            </div>
            <div className="ask-body"><div className="ask-b me">{c.q}</div><div className="ask-b them">{c.a}</div></div>
            <div className="ask-in"><span>{c.input}</span><i aria-hidden="true">➤</i></div>
          </div>
        </div>
        <div className="ask-t">
          <WhoBadge locale={locale} />
          <h2>{c.title}</h2>
          <p className="sub">{c.text}</p>
          <div className="ask-bt">
            {waIsLive() && <Cta className="btn btn-m" href={waLink(locale, c.wa)}>{c.btn}</Cta>}
            <Cta className="btn btn-o" href={`/${locale}/pricing#feed-quick-fix`}>{c.btn2}</Cta>
          </div>
        </div>
      </div>
    </section>
  );
}
