import { feedExtra } from "@/lib/feedText";

export default function FeedVisual({ locale }) {
  const t = feedExtra[locale];
  return (
    <div className="fv" role="img" aria-label={t.visualTitle}>
      <div className="fv-c">
        <div className="fv-h"><span className="fv-i"><img src="/logos/merchant-center.png" alt="" /></span><span><b>{t.visualTitle}</b><em>{t.visualSub}</em></span></div>
        {t.rows.map(([a, b], k) => (
          <div className="fv-r" key={a} style={{ animationDelay: `${0.25 + k * 0.35}s` }}>
            <span className="fv-bad"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8v5M12 16.5v.5" /><circle cx="12" cy="12" r="9" /></svg></span>
            <span className="fv-t">{a}</span>
            <span className="fv-ok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>{b}</span>
          </div>
        ))}
      </div>
      <div className="fv-c fv-rd">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
        <b>{t.ready}</b>
      </div>
    </div>
  );
}
