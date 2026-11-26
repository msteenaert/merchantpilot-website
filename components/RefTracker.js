"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { cleanRef, getRefCookie } from "@/lib/ref";

// Remembers ?ref=partner for 60 days and attaches it to Stripe and WhatsApp links.
export default function RefTracker() {
  const path = usePathname();
  useEffect(() => {
    try {
      const q = cleanRef(new URLSearchParams(location.search).get("ref"));
      if (q) document.cookie = `mp_ref=${q};max-age=${60 * 86400};path=/;SameSite=Lax`;
    } catch {}
    const ref = getRefCookie();
    if (!ref) return;
    const tag = () => {
      document.querySelectorAll('a[href^="https://buy.stripe.com/"]').forEach((a) => {
        const u = new URL(a.href);
        if (u.searchParams.get("client_reference_id") !== ref) {
          u.searchParams.set("client_reference_id", ref);
          a.href = u.toString();
        }
      });
      document.querySelectorAll('a[href^="https://wa.me/"]').forEach((a) => {
        const u = new URL(a.href);
        const t = u.searchParams.get("text") || "";
        if (!t.includes(`(ref: ${ref})`)) {
          u.searchParams.set("text", `${t} (ref: ${ref})`.trim());
          a.href = u.toString();
        }
      });
    };
    tag();
    const mo = new MutationObserver(tag);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [path]);
  return null;
}
