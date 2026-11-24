export const locales = ["en", "nl"];
export const defaultLocale = "en";

// English pages show US dollars, Dutch pages show euros.
export const currencyFor = (locale) => (locale === "nl" ? "EUR" : "USD");

// All prices exclude VAT. Set your own dollar prices here.
export const PRICES = {
  gmcSetup: { eur: 1033, usd: 1139 },
  gmcSetupShopify: { eur: 1240, usd: 1369 },
  suspension: { eur: 1033, usd: 1139 },
  complex: { eur: 1446, usd: 1599 },
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

// Partner commission (10%) in the page currency.
export function commission(locale, key, rate = 0.1) {
  const p = PRICES[key];
  if (!p) return "";
  if (locale === "nl") return "€" + new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 0 }).format(Math.round(p.eur * rate));
  return "$" + new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(p.usd * rate));
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
  quickFix: { eur: "https://buy.stripe.com/9B614f4d7g7R5XR5Y4fQI02", usd: "https://buy.stripe.com/14AdR1fVP7Blcmf2LSfQI03" },
  audit: { eur: "https://buy.stripe.com/aFa3cn24ZbRB4TNgCIfQI01", usd: "https://buy.stripe.com/4gM00b5hbdZJ71VfyEfQI00" },
};
export function payLink(locale, key, fallbackText) {
  const url = STRIPE[key]?.[locale === "nl" ? "eur" : "usd"];
  return url || waLink(locale, fallbackText);
}

// Owner photos for the footer "Feel free to reach out" circles and the About page.
// Put the photos in public/people and fill in the paths, for example "/people/milan.png".
export const OWNERS = { milan: "", me: "", nomi: "" };
