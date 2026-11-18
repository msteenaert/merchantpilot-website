import Link from "next/link";

// Internal links use Next Link, external links (WhatsApp, Stripe) open in a new tab.
export default function Cta({ href, className, children }) {
  return href.startsWith("http")
    ? <a className={className} href={href} target="_blank" rel="noopener">{children}</a>
    : <Link className={className} href={href}>{children}</Link>;
}
