import "../globals.css";
import { notFound } from "next/navigation";
import { locales } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RefTracker from "@/components/RefTracker";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const nl = locale === "nl";
  return {
    title: nl ? "MerchantPilot | Google Merchant Center-specialisten" : "MerchantPilot | Google Merchant Center specialists",
    description: nl
      ? "Zet je Google Merchant Center goed op of herstel het. Duidelijke prijzen, direct te bestellen."
      : "Set up or fix your Google Merchant Center. Clear prices, easy to order.",
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();
  return (
    <html lang={locale}>
      <body>
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
        <WhatsAppFloat locale={locale} />
        <RefTracker />
      </body>
    </html>
  );
}
