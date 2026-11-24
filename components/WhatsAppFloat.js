import { waLink } from "@/lib/site";

export default function WhatsAppFloat({ locale }) {
  const nl = locale === "nl";
  const label = nl ? "Vragen?" : "Got questions?";
  const text = nl ? "Hoi, ik heb een vraag over mijn Merchant Center." : "Hi, I have a question about my Merchant Center.";
  return (
    <a className="wf" href={waLink(locale, text)} target="_blank" rel="noopener noreferrer" aria-label={nl ? "Stuur ons een bericht op WhatsApp" : "Message us on WhatsApp"}>
      <span className="wf-t">{label}</span>
      <span className="wf-i" aria-hidden="true">
        <svg viewBox="0 0 32 32" width="30" height="30" fill="#fff">
          <path d="M16.04 3C9.4 3 4 8.38 4 15.02c0 2.12.55 4.19 1.6 6.01L4 29l8.14-1.56a12.03 12.03 0 0 0 5.9 1.5h.01C24.7 28.94 30 23.56 30 16.9 30 10.3 24.68 3 16.04 3Zm0 23.4h-.01a10 10 0 0 1-5.1-1.4l-.37-.22-4.83.93.98-4.7-.24-.38a9.9 9.9 0 0 1-1.52-5.3c0-5.5 4.5-9.97 10.03-9.97 5.4 0 9.93 4.2 9.93 10.6 0 5.5-4.5 10.44-8.87 10.44Zm5.5-7.45c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.17.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.68-1.63-.93-2.24-.24-.58-.5-.5-.68-.5h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.1 3.2 5.1 4.5.7.3 1.26.5 1.7.63.72.23 1.37.2 1.88.12.58-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z" />
        </svg>
      </span>
    </a>
  );
}
