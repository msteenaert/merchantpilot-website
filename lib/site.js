export const locales = ["en", "nl"];
export const defaultLocale = "en";

// English pages show US dollars, Dutch pages show euros.
export const currencyFor = (locale) => (locale === "nl" ? "EUR" : "USD");

// All prices exclude VAT. Set your own dollar prices here.
export const PRICES = {
  gmcSetup: { eur: 1500, usd: 1649 },
  gmcSetupShopify: { eur: 1795, usd: 1979 },
  suspension: { eur: 1795, usd: 1979 },
  complex: { eur: 2495, usd: 2749 },
  quickFix: { eur: 149, usd: 169 },
  audit: { eur: 149, usd: 169 },
  feedRepair: { eur: 349, usd: 389 },
  monitoring: { eur: 79, usd: 89 },
  management: { eur: 199, usd: 219 },
  advanced: { eur: 399, usd: 439 },
  feedOptimization: { eur: 795, usd: 879 },
  advancedFeedRepair: { eur: 1495, usd: 1649 },
};

export function money(locale, key) {
  const p = PRICES[key];
  if (!p) return "";
  if (locale === "nl") return "€" + new Intl.NumberFormat("nl-NL").format(p.eur);
  return "$" + new Intl.NumberFormat("en-US").format(p.usd);
}

// WhatsApp link. Falls back to the contact page until a number is set.
export function waLink(locale, text) {
  const n = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, "");
  if (!n) return `/${locale}/contact`;
  return `https://wa.me/${n}?text=${encodeURIComponent(text)}`;
}
export const waIsLive = () => !!(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, "");

// Trust row. Only use numbers that are true.
export const TRUST = {
  initials: ["J", "W", "H"],
  photos: ["/people/jeremy.jpg", "/people/william.jpg", "/people/hallow.jpg", "/people/anouar.jpg"],
  rating: 4.7,
};

// Stripe payment links per package. Fill these in once the links exist. Until then the buttons open WhatsApp.
export const STRIPE = {
  quickFix: { eur: "", usd: "" },
  audit: { eur: "", usd: "" },
};
export function payLink(locale, key, fallbackText) {
  const url = STRIPE[key]?.[locale === "nl" ? "eur" : "usd"];
  return url || waLink(locale, fallbackText);
}

// Owner photos for the footer "Feel free to reach out" circles and the About page.
// Put the photos in public/people and fill in the paths, for example "/people/milan.png".
export const OWNERS = { milan: "", me: "", nomi: "" };
