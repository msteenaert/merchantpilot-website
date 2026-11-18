"use client";
import { useState } from "react";

export default function PartnerForm({ locale, t }) {
  const [state, setState] = useState("idle");
  async function onSubmit(e) {
    e.preventDefault();
    setState("sending");
    const f = Object.fromEntries(new FormData(e.currentTarget).entries());
    const message = [`${t.company}: ${f.agency}`, `${t.country}: ${f.country}`, `${t.type}: ${f.type}`, `${t.refs}: ${f.refs}`, f.info ? `${t.info}: ${f.info}` : ""].filter(Boolean).join("\n");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: f.name, email: f.email, website: f.website, topic: "Partner application", message, company: f.company, locale }) });
      if (!res.ok) throw new Error("bad");
      setState("ok");
    } catch { setState("err"); }
  }
  if (state === "ok") return <div className="pf-card"><div className="pf-ok" role="status"><b>{t.okTitle}</b><p>{t.ok}</p></div></div>;
  return (
    <div className="pf-card">
      <form onSubmit={onSubmit}>
        {state === "err" && <div className="pf-err" role="alert">{t.err}</div>}
        <div className="pf-g">
          <div className="pf-f"><label htmlFor="pf-name">{t.name}</label><input id="pf-name" name="name" required maxLength={120} autoComplete="name" /></div>
          <div className="pf-f"><label htmlFor="pf-co">{t.company}</label><input id="pf-co" name="agency" required maxLength={160} autoComplete="organization" /></div>
          <div className="pf-f"><label htmlFor="pf-em">{t.email}</label><input id="pf-em" name="email" type="email" required maxLength={200} autoComplete="email" /></div>
          <div className="pf-f"><label htmlFor="pf-web">{t.website}</label><input id="pf-web" name="website" type="url" placeholder="https://" maxLength={300} autoComplete="url" /></div>
          <div className="pf-f"><label htmlFor="pf-ct">{t.country}</label><input id="pf-ct" name="country" required maxLength={80} autoComplete="country-name" /></div>
          <div className="pf-f"><label htmlFor="pf-ty">{t.type}</label><select id="pf-ty" name="type" required>{t.types.map((x) => <option key={x}>{x}</option>)}</select></div>
          <div className="pf-f full"><label htmlFor="pf-mr">{t.refs}</label><select id="pf-mr" name="refs" defaultValue="">{[t.refsPh, ...t.refsOpts].map((x, i) => <option key={x} value={i === 0 ? "" : x}>{x}</option>)}</select></div>
          <div className="pf-f full"><label htmlFor="pf-ms">{t.info} <i>({t.optional})</i></label><textarea id="pf-ms" name="info" maxLength={2000} /></div>
        </div>
        <input className="hp" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <div className="pf-b"><button className="btn btn-m" type="submit" disabled={state === "sending"}>{state === "sending" ? t.sending : t.button}</button></div>
        <p className="pf-fine">{t.fine}</p>
      </form>
    </div>
  );
}
