import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export const runtime = "nodejs";

const clip = (v, n) => String(v ?? "").trim().slice(0, n);

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "bad_json" }, { status: 400 }); }

  // Honeypot: bots fill this field, people do not.
  if (body.company) return NextResponse.json({ ok: true });

  // "contact" is a phone number or an email address. The partner form still sends "email".
  const contact = clip(body.contact || body.email, 200);
  const isEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact);
  const isPhone = /^\+?[\d\s().-]{6,}$/.test(contact) && contact.replace(/\D/g, "").length >= 6;
  const row = {
    name: clip(body.name, 120),
    email: contact,
    website: clip(body.website, 300) || null,
    topic: clip(body.topic || body.business, 100) || null,
    message: clip(body.message, 4000) || null,
    locale: body.locale === "nl" ? "nl" : "en",
  };
  if (!row.name || !(isEmail || isPhone)) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const supabase = supabaseServer();
  if (!supabase) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const { error } = await supabase.from("contact_requests").insert(row);
  if (error) {
    console.error("contact insert failed", error.message);
    return NextResponse.json({ error: "db" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
