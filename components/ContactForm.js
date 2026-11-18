"use client";
import { useState } from "react";

export default function ContactForm({ locale, t }) {
  const [state, setState] = useState("idle");

  async function onSubmit(e) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error("bad");
      setState("ok");
      e.currentTarget.reset();
    } catch {
      setState("err");
    }
  }

  return (
    <form className="cform" onSubmit={onSubmit}>
      <label>{t.name}<input name="name" required maxLength={120} autoComplete="name" /></label>
      <label>{t.email}<input name="email" type="email" required maxLength={200} autoComplete="email" /></label>
      <label>{t.website}<input name="website" placeholder="https://" maxLength={300} /></label>
      <label>{t.topic}
        <select name="topic" defaultValue="">
          {t.topics.map((x, i) => <option key={i} value={i === 0 ? "" : x}>{x}</option>)}
        </select>
      </label>
      <label>{t.message}<textarea name="message" maxLength={4000} /></label>
      <input className="hp" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="btn btn-d" type="submit" disabled={state === "sending"}>
        {state === "sending" ? t.sending : t.send}
      </button>
      {state === "ok" && <div className="msg ok" role="status">{t.ok}</div>}
      {state === "err" && <div className="msg err" role="alert">{t.err}</div>}
    </form>
  );
}
