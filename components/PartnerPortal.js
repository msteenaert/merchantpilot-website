"use client";
import { useState } from "react";

const T = {
  en: { title: "Partner dashboard", text: "See the clients you referred and your commission. Use the code and access key we sent you.", code: "Partner code", key: "Access key", btn: "View my referrals", busy: "Loading...", bad: "Code or access key is not correct.", err: "Something went wrong. Try again.", link: "Your referral link", contacts: "Referred requests", orders: "Paid orders", none: "Nothing yet.", date: "Date", name: "Name", topic: "Topic", net: "Order (excl. VAT)", comm: "Your commission", status: "Status", total: "Commission earned", pct: "Commission", partner: "Partner" },
  nl: { title: "Partner dashboard", text: "Bekijk de klanten die je hebt doorgestuurd en je commissie. Gebruik de code en toegangssleutel die je van ons kreeg.", code: "Partnercode", key: "Toegangssleutel", btn: "Mijn doorverwijzingen bekijken", busy: "Laden...", bad: "Code of toegangssleutel klopt niet.", err: "Er ging iets mis. Probeer het opnieuw.", link: "Jouw partnerlink", contacts: "Doorverwezen aanvragen", orders: "Betaalde orders", none: "Nog niets.", date: "Datum", name: "Naam", topic: "Onderwerp", net: "Order (excl. btw)", comm: "Jouw commissie", status: "Status", total: "Verdiende commissie", pct: "Commissie", partner: "Partner" },
};
const cur = { EUR: "€", USD: "$" };
const fmt = (c, cents, locale) => `${cur[c] || c + " "}${(cents / 100).toLocaleString(locale === "nl" ? "nl-NL" : "en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const day = (d, locale) => new Date(d).toLocaleDateString(locale === "nl" ? "nl-NL" : "en-GB");

function Totals({ totals, t, locale }) {
  const k = Object.keys(totals);
  if (!k.length) return <b>{fmt("EUR", 0, locale)}</b>;
  return <b>{k.map((c) => fmt(c, totals[c].commission, locale)).join(" + ")}</b>;
}

function Detail({ p, t, locale }) {
  return (
    <div className="pp-d">
      <div className="pp-top">
        <div><span>{t.partner}</span><b>{p.name}</b></div>
        <div><span>{t.pct}</span><b>{p.pct}%</b></div>
        <div><span>{t.contacts}</span><b>{p.contactCount}</b></div>
        <div><span>{t.orders}</span><b>{p.orderCount}</b></div>
        <div className="pp-em"><span>{t.total}</span><Totals totals={p.totals} t={t} locale={locale} /></div>
      </div>
      <h4>{t.orders}</h4>
      {p.orders.length ? (
        <table className="pp-t"><thead><tr><th>{t.date}</th><th>{t.net}</th><th>{t.comm}</th><th>{t.status}</th></tr></thead>
          <tbody>{p.orders.map((o, i) => <tr key={i}><td>{day(o.date, locale)}</td><td>{fmt(o.currency, o.net, locale)}</td><td>{fmt(o.currency, o.commission, locale)}</td><td>{o.status}</td></tr>)}</tbody></table>
      ) : <p className="pp-n">{t.none}</p>}
      <h4>{t.contacts}</h4>
      {p.contacts.length ? (
        <table className="pp-t"><thead><tr><th>{t.date}</th><th>{t.name}</th><th>{t.topic}</th></tr></thead>
          <tbody>{p.contacts.map((c, i) => <tr key={i}><td>{day(c.date, locale)}</td><td>{c.name}</td><td>{c.topic || "-"}</td></tr>)}</tbody></table>
      ) : <p className="pp-n">{t.none}</p>}
    </div>
  );
}

export default function PartnerPortal({ locale }) {
  const t = T[locale] || T.en;
  const [state, setState] = useState("idle");
  const [data, setData] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setState("busy");
    const f = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/partner-stats", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: f.code, key: f.key }) });
      if (res.status === 401) { setState("bad"); return; }
      if (!res.ok) throw new Error("bad");
      setData(await res.json());
      setState("ok");
    } catch { setState("err"); }
  }

  return (
    <div className="pp">
      {state !== "ok" && (
        <form className="pp-f" onSubmit={onSubmit}>
          <label>{t.code}<input name="code" required maxLength={40} autoComplete="username" /></label>
          <label>{t.key}<input name="key" type="password" required maxLength={100} autoComplete="current-password" /></label>
          <button className="btn btn-d" type="submit" disabled={state === "busy"}>{state === "busy" ? t.busy : t.btn}</button>
          {state === "bad" && <div className="msg err" role="alert">{t.bad}</div>}
          {state === "err" && <div className="msg err" role="alert">{t.err}</div>}
        </form>
      )}
      {state === "ok" && data && !data.admin && (
        <>
          <p className="pp-l">{t.link}: <b>{`https://www.merchantpilot.nl/${locale}?ref=${data.partner.code}`}</b></p>
          <Detail p={data.partner} t={t} locale={locale} />
        </>
      )}
      {state === "ok" && data && data.admin && data.partners.map((p) => (
        <div key={p.code} className="pp-a"><h3>{p.name} <small>({p.code})</small></h3><Detail p={p} t={t} locale={locale} /></div>
      ))}
    </div>
  );
}
