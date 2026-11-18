import Link from "next/link";
import { content } from "@/lib/content";
import { OWNERS } from "@/lib/site";
import TrustRow from "./TrustRow";

export default function Footer({ locale }) {
  const c = content[locale];
  const f = c.footer;
  const nl = locale === "nl";
  const p = `/${locale}/pricing`;
  const cols = [
    [f.services, [
      [nl ? "GMC-opzet" : "GMC Setup", `${p}#gmc-setup`],
      [nl ? "Herstel na schorsing" : "Suspension Recovery", `${p}#suspension-recovery`],
      [nl ? "Snelle oplossingen" : "Quick Fixes", `${p}#feed-quick-fix`],
      [nl ? "Feedbeheer" : "Feed Management", `/${locale}/feed-management`],
      [nl ? "Maandabonnementen" : "Monthly Plans", `${p}#feed-monitoring`],
      [f.pricing, p],
    ]],
    [f.company, [
      [nl ? "Over ons" : "About", `/${locale}/about`],
      ["Reviews", `/${locale}/reviews`],
      [nl ? "Partnerprogramma" : "Partner program", `/${locale}/partners`],
      [f.contact, `/${locale}/contact`],
    ]],
  ];
  return (
    <footer className="ftr">
      <div className="w">
        <div className="ft-top">
          {cols.map(([title, links]) => (
            <div className="ft-col" key={title}>
              <h3>{title}</h3>
              <ul>{links.map(([t, h]) => <li key={t}><Link href={h}>{t}</Link></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="ft-mid">
          <TrustRow line={c.hero.trustLine} sub={c.hero.trustSub} />
          {(OWNERS.milan || OWNERS.me) && (
            <Link className="ft-own" href={`/${locale}/contact`}>
              <span className="ft-oa">{[OWNERS.milan, OWNERS.me].filter(Boolean).map((src) => <span className="ft-oc" key={src}><img src={src} alt="" /></span>)}</span>
              <span className="ft-ot"><b>{nl ? "Neem gerust contact op" : "Feel free to reach out"}</b><em>{nl ? "Eigenaren van MerchantPilot" : "Owners of MerchantPilot"}</em></span>
            </Link>
          )}
        </div>
        <div className="ft-bot"><p>© {new Date().getFullYear()} MerchantPilot. {f.rights}</p></div>
      </div>
    </footer>
  );
}
