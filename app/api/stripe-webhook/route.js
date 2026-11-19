import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export const runtime = "nodejs";

// Verifies Stripe's signature header (t=...,v1=...) against the raw body.
function verify(raw, header, secret) {
  if (!header || !secret) return false;
  const parts = Object.fromEntries(header.split(",").map((p) => p.split("=")));
  const t = parts.t, v1 = parts.v1;
  if (!t || !v1) return false;
  if (Math.abs(Date.now() / 1000 - Number(t)) > 300) return false;
  const expected = crypto.createHmac("sha256", secret).update(`${t}.${raw}`).digest("hex");
  const a = Buffer.from(expected), b = Buffer.from(v1);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(req) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const raw = await req.text();
  if (!verify(raw, req.headers.get("stripe-signature"), secret)) {
    return NextResponse.json({ error: "bad_signature" }, { status: 400 });
  }

  let event;
  try { event = JSON.parse(raw); } catch { return NextResponse.json({ error: "bad_json" }, { status: 400 }); }
  if (event.type !== "checkout.session.completed") return NextResponse.json({ ok: true });

  const s = event.data.object;
  const field = (s.custom_fields || []).find((f) => /web|url/i.test(f.key + (f.label?.custom || "")));
  const row = {
    stripe_session_id: s.id,
    payment_link: s.payment_link || null,
    name: s.customer_details?.name || null,
    email: s.customer_details?.email || null,
    website: field?.text?.value || null,
    amount_total: s.amount_total ?? null,
    amount_tax: s.total_details?.amount_tax ?? null,
    currency: s.currency || null,
    payment_status: s.payment_status || null,
    country: s.customer_details?.address?.country || null,
  };

  const supabase = supabaseServer();
  if (!supabase) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const { error } = await supabase.from("orders").upsert(row, { onConflict: "stripe_session_id" });
  if (error) {
    console.error("order upsert failed", error.message);
    return NextResponse.json({ error: "db" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
