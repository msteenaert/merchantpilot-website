import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { cleanRef } from "@/lib/ref";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const sha = (v) => crypto.createHash("sha256").update(String(v ?? "")).digest();
const same = (a, b) => crypto.timingSafeEqual(sha(a), sha(b));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const first = (n) => String(n || "").trim().split(/\s+/)[0] || "-";

function summarize(partner, contacts, orders) {
  const pct = partner.commission_pct ?? 10;
  const paid = orders.filter((o) => o.payment_status === "paid");
  const list = paid.map((o) => {
    const net = Math.max(0, (o.amount_total || 0) - (o.amount_tax || 0));
    return { date: o.created_at, currency: (o.currency || "eur").toUpperCase(), net, commission: Math.round((net * pct) / 100), status: o.status };
  });
  const totals = {};
  for (const o of list) {
    totals[o.currency] ||= { net: 0, commission: 0 };
    totals[o.currency].net += o.net;
    totals[o.currency].commission += o.commission;
  }
  return {
    code: partner.code, name: partner.name, pct,
    contactCount: contacts.length,
    contacts: contacts.slice(0, 50).map((c) => ({ date: c.created_at, name: first(c.name), topic: c.topic })),
    orderCount: list.length, orders: list.slice(0, 100), totals,
  };
}

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "bad_json" }, { status: 400 }); }
  const code = cleanRef(body.code);
  const key = String(body.key ?? "");
  const fail = async () => { await wait(600); return NextResponse.json({ error: "invalid" }, { status: 401 }); };
  if (!code || !key) return fail();

  const supabase = supabaseServer();
  if (!supabase) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const adminKey = process.env.PARTNER_ADMIN_KEY;
  const isAdmin = code === "admin" && adminKey && same(key, adminKey);

  if (isAdmin) {
    const [{ data: partners }, { data: contacts }, { data: orders }] = await Promise.all([
      supabase.from("partners").select("*").order("created_at"),
      supabase.from("contact_requests").select("created_at,name,topic,ref").not("ref", "is", null),
      supabase.from("orders").select("created_at,amount_total,amount_tax,currency,payment_status,status,ref").not("ref", "is", null),
    ]);
    const rows = (partners || []).map((p) => summarize(p,
      (contacts || []).filter((c) => c.ref === p.code),
      (orders || []).filter((o) => o.ref === p.code)));
    return NextResponse.json({ admin: true, partners: rows });
  }

  const { data: partner } = await supabase.from("partners").select("*").eq("code", code).eq("active", true).maybeSingle();
  if (!partner || !same(key, partner.access_key)) return fail();

  const [{ data: contacts }, { data: orders }] = await Promise.all([
    supabase.from("contact_requests").select("created_at,name,topic").eq("ref", code).order("created_at", { ascending: false }),
    supabase.from("orders").select("created_at,amount_total,amount_tax,currency,payment_status,status").eq("ref", code).order("created_at", { ascending: false }),
  ]);
  return NextResponse.json({ admin: false, partner: summarize(partner, contacts || [], orders || []) });
}
