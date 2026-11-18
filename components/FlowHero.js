import { content } from "@/lib/content";

const icons = [
  <path key="a" d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  <g key="b"><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" /><path d="M9 12l2 2 4-4" /></g>,
  <g key="c"><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></g>,
];

export default function FlowHero({ locale }) {
  const h = content[locale].hero;
  const roas = locale === "nl"
    ? ["ROAS 3+", "Richting ROAS 3 en hoger zodra Google goedkeurt."]
    : ["ROAS 3+", "Scale toward ROAS 3 and up once Google approves."];
  return (
    <div className="hf-fx" role="img" aria-label={h.flowTitle}>
      <div className="hf-c">
        <div className="hf-fh"><span className="hf-fi"><img src="/logos/google-ads.png" alt="" /></span><b>{h.flowTitle}</b></div>
        {h.flow.map(([a, b], k) => (
          <div key={a}>
            {k > 0 && <i className="hf-ln" />}
            <div className="hf-st"><svg viewBox="0 0 24 24" aria-hidden="true">{icons[k]}</svg><span><b>{a}</b><small>{b}</small></span></div>
          </div>
        ))}
      </div>
      <div className="hf-c hf-rc">
        <p className="hf-rt">{roas[0]}</p><p className="hf-rs">{roas[1]}</p>
        <svg viewBox="0 0 300 80" aria-hidden="true"><path className="hf-up" pathLength="1" d="M4 70 C60 66 90 52 130 44 S200 24 296 10" /></svg>
      </div>
    </div>
  );
}
