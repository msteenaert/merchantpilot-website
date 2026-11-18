import { home } from "@/lib/home";
import { waLink, waIsLive } from "@/lib/site";
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
          <h2>{c.title}</h2>
          <p className="sub">{c.text}</p>
          {waIsLive() && (
            <>
              <div className="ask-bt"><Cta className="btn btn-m" href={waLink(locale, c.wa)}>{c.btn}</Cta></div>
              <p className="ask-or">{c.or}</p>
            </>
          )}
          <form className="ask-form" action={`/${locale}/contact`}>
            <input name="contact" placeholder={c.ph} aria-label={c.ph} />
            <button className="btn btn-m" type="submit">{c.send}</button>
          </form>
          <p className="ask-fine">{c.fine}</p>
        </div>
      </div>
    </section>
  );
}
