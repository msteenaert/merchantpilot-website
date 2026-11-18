import Link from "next/link";
import LangSwitch from "./LangSwitch";
import { content } from "@/lib/content";

export default function Header({ locale }) {
  const t = content[locale].nav;
  return (
    <header className="hdr">
      <div className="w">
        <Link href={`/${locale}`} className="logo"><i>✓</i>MerchantPilot</Link>
        <nav className="nav" aria-label="Main">
          <Link href={`/${locale}`}>{t.home}</Link>
          <Link href={`/${locale}/contact`}>{t.contact}</Link>
        </nav>
        <div className="hr">
          <LangSwitch locale={locale} />
          <Link href={`/${locale}/contact`} className="btn btn-m" style={{ minHeight: 42 }}>{t.cta}</Link>
        </div>
      </div>
    </header>
  );
}
