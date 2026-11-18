import Link from "next/link";
import { content } from "@/lib/content";
import TrustRow from "./TrustRow";

export default function Footer({ locale }) {
  const c = content[locale];
  const f = c.footer;
  return (
    <footer className="ftr">
      <div className="w">
        <div className="cols">
          <div>
            <h4>{f.services}</h4>
            <ul>
              <li><Link href={`/${locale}`}>{f.home}</Link></li>
              <li><Link href={`/${locale}#pricing`}>{f.pricing}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{f.company}</h4>
            <ul>
              <li><Link href={`/${locale}/contact`}>{f.contact}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mid">
          <TrustRow line={c.hero.trustLine} sub={c.hero.trustSub} />
        </div>
        <div className="bot">© {new Date().getFullYear()} MerchantPilot. {f.rights}</div>
      </div>
    </footer>
  );
}
