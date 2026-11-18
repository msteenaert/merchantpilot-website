import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export const runtime = "nodejs";

const clip = (v, n) => String(v ?? "").trim().slice(0, n);

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "bad_json" }, { status: 400 }); }

  // Honeypot: bots fill this field, people do not.
  if (body.company) return NextResponse.json({ ok: true });

  const row = {
    name: clip(body.name, 120),
    email: clip(body.email, 200),
    website: clip(body.website, 300) || null,
    topic: clip(body.topic, 100) || null,
    message: clip(body.message, 4000) || null,
    locale: body.locale === "nl" ? "nl" : "en",
  };
  if (!row.name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(row.email)) {
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
