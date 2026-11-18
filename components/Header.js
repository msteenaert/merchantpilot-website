import Link from "next/link";
import LangSwitch from "./LangSwitch";
import { home } from "@/lib/home";
import { waLink } from "@/lib/site";
import Cta from "./Cta";

export default function Header({ locale }) {
  const h = home[locale];
  const links = [`/${locale}`, `/${locale}/ad-partners`, `/${locale}/feed-management`, `/${locale}/pricing`, `/${locale}/partners`];
  return (
    <header className="hdr">
      <div className="w">
        <Link href={`/${locale}`} className="logo"><img src="/brand/logo.png" alt="MerchantPilot" /></Link>
        <nav className="nav" aria-label="Main">
          {h.nav.map((l, i) => <Link key={l} href={links[i]}>{l}</Link>)}
        </nav>
        <details className="mnav">
          <summary aria-label="Menu"><span className="bars" aria-hidden="true" /></summary>
          <ul>
            {h.nav.map((l, i) => <li key={l}><Link href={links[i]}>{l}</Link></li>)}
            <li><Cta href={waLink(locale, h.chat.wa)} className="btn btn-m">{h.cta}</Cta></li>
          </ul>
        </details>
        <div className="hr">
          <LangSwitch locale={locale} />
          <Cta href={waLink(locale, h.chat.wa)} className="btn btn-m" >{h.cta}</Cta>
        </div>
      </div>
    </header>
  );
}
