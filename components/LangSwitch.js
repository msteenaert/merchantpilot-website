"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LangSwitch({ locale }) {
  const path = usePathname() || `/${locale}`;
  const rest = path.replace(/^\/(en|nl)/, "") || "";
  return (
    <div className="lang" aria-label="Language">
      <Link href={`/en${rest}`} className={locale === "en" ? "on" : ""}>EN</Link>
      <Link href={`/nl${rest}`} className={locale === "nl" ? "on" : ""}>NL</Link>
    </div>
  );
}
