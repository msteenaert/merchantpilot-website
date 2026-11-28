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
    let vid = "";
    try {
      vid = sessionStorage.getItem("mp_vid") || "";
      if (!vid) {
        const abc = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        vid = "MP-" + Array.from(crypto.getRandomValues(new Uint8Array(5)), (n) => abc[n % abc.length]).join("");
        sessionStorage.setItem("mp_vid", vid);
      }
    } catch { vid = ""; }
    const tag = () => {
      document.querySelectorAll('a[href^="https://wa.me/"]').forEach((a) => {
        const u = new URL(a.href);
        let t = u.searchParams.get("text") || "";
        if (ref && !t.includes(`(via ${ref})`)) t = `${t} (via ${ref})`.trim();
        if (vid && !t.includes(`(ref: ${vid})`)) t = `${t} (ref: ${vid})`.trim();
        if (t !== (u.searchParams.get("text") || "")) { u.searchParams.set("text", t); a.href = u.toString(); }
      });
      if (!ref) return;
      document.querySelectorAll('a[href^="https://buy.stripe.com/"]').forEach((a) => {
        const u = new URL(a.href);
        if (u.searchParams.get("client_reference_id") !== ref) {
          u.searchParams.set("client_reference_id", ref);
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
