import { NextResponse } from "next/server";

// Send visitors to /en or /nl. Dutch browsers get Dutch, everyone else English.
export function middleware(req) {
  const { pathname } = req.nextUrl;
  if (/^\/(en|nl)(\/|$)/.test(pathname)) return NextResponse.next();
  const al = (req.headers.get("accept-language") || "").toLowerCase();
  const loc = al.startsWith("nl") ? "nl" : "en";
  const url = req.nextUrl.clone();
  url.pathname = `/${loc}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/((?!api|_next|.*\\..*).*)"] };
