"use client";
import { useState } from "react";

export default function PartnerForm({ locale, t }) {
  const [state, setState] = useState("idle");
  async function onSubmit(e) {
    e.preventDefault();
    setState("sending");
    const f = Object.fromEntries(new FormData(e.currentTarget).entries());
    const message = `${t.company}: ${f.agency}`;
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: f.name, contact: f.contact, topic: "Partner application", message, company: f.company, locale }) });
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
          <div className="pf-f full"><label htmlFor="pf-ct">{t.contact}</label><input id="pf-ct" name="contact" required maxLength={200} autoComplete="email" inputMode="email" /></div>
        </div>
        <input className="hp" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <div className="pf-b"><button className="btn btn-m" type="submit" disabled={state === "sending"}>{state === "sending" ? t.sending : t.button}</button></div>
      </form>
    </div>
  );
}
