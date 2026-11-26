export const REF_RE = /^[a-z0-9_-]{2,40}$/i;
export const cleanRef = (v) => {
  const s = String(v ?? "").trim().toLowerCase();
  return REF_RE.test(s) ? s : null;
};
export function getRefCookie() {
  try {
    const m = document.cookie.match(/(?:^|; )mp_ref=([^;]+)/);
    return m ? cleanRef(decodeURIComponent(m[1])) : null;
  } catch { return null; }
}
