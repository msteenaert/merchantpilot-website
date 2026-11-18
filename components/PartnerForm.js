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
      e.currentTarget.reset();
    } catch { setState("err"); }
  }
  return (
    <form className="cform" onSubmit={onSubmit}>
      <label>{t.name}<input name="name" required maxLength={120} /></label>
      <label>{t.company}<input name="agency" required maxLength={160} /></label>
      <label>{t.email}<input name="email" type="email" required maxLength={200} /></label>
      <label>{t.website}<input name="website" placeholder="https://" maxLength={300} /></label>
      <label>{t.country}<input name="country" required maxLength={80} /></label>
      <label>{t.type}<select name="type">{t.types.map((x) => <option key={x}>{x}</option>)}</select></label>
      <label>{t.refs}<select name="refs" defaultValue="">{[t.refsPh, ...t.refsOpts].map((x, i) => <option key={x} value={i === 0 ? "" : x}>{x}</option>)}</select></label>
      <label>{t.info} ({t.optional})<textarea name="info" maxLength={2000} /></label>
      <input className="hp" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="btn btn-d" type="submit" disabled={state === "sending"}>{state === "sending" ? t.sending : t.button}</button>
      <p className="note" style={{ margin: 0 }}>{t.fine}</p>
      {state === "ok" && <div className="msg ok" role="status"><b>{t.okTitle}</b> {t.ok}</div>}
      {state === "err" && <div className="msg err" role="alert">{t.err}</div>}
    </form>
  );
}
