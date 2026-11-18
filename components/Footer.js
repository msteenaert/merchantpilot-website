import Link from "next/link";
import { content } from "@/lib/content";
import { OWNERS } from "@/lib/site";
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
              <li><Link href={`/${locale}/pricing`}>{f.pricing}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{f.company}</h4>
            <ul>
              <li><Link href={`/${locale}/feed-management`}>{locale === "nl" ? "Feedbeheer" : "Feed management"}</Link></li>
              <li><Link href={`/${locale}/reviews`}>Reviews</Link></li>
              <li><Link href={`/${locale}/about`}>{locale === "nl" ? "Over ons" : "About"}</Link></li>
              <li><Link href={`/${locale}/partners`}>{locale === "nl" ? "Partnerprogramma" : "Partner program"}</Link></li>
              <li><Link href={`/${locale}/ad-partners`}>{locale === "nl" ? "Advertentiepartners" : "Ad partners"}</Link></li>
              <li><Link href={`/${locale}/contact`}>{f.contact}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mid">
          <TrustRow line={c.hero.trustLine} sub={c.hero.trustSub} />
        </div>
        {(OWNERS.milan || OWNERS.me) && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end", margin: "16px 0" }}>
            <span style={{ color: "#8FA3B8", fontSize: ".85rem" }}>{locale === "nl" ? "Neem gerust contact op" : "Feel free to reach out"}</span>
            {[OWNERS.milan, OWNERS.me].filter(Boolean).map((src) => <img key={src} src={src} alt="" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />)}
          </div>
        )}
        <div className="bot">© {new Date().getFullYear()} MerchantPilot. {f.rights}</div>
      </div>
    </footer>
  );
}
