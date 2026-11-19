import { content } from "@/lib/content";

const icons = [
  <path key="a" d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  <g key="b"><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" /><path d="M9 12l2 2 4-4" /></g>,
  <g key="c"><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></g>,
];

export default function FlowHero({ locale }) {
  const h = content[locale].hero;
  const nl = locale === "nl";
  const roas = nl
    ? ["Richting een stabiele ROAS", "Eerst herstellen, dan stap voor stap opschalen. Resultaten verschillen."]
    : ["Toward a stable ROAS", "Fix first, then scale step by step. Results vary."];
  const phases = nl ? ["Herstel", "Goedgekeurd", "Stabiel", "Opschalen"] : ["Fix", "Approved", "Stable", "Scale"];
  return (
    <div className="hf-fx" role="img" aria-label={h.flowTitle}>
      <div className="hf-c">
        <div className="hf-fh"><span className="hf-fi"><img src="/logos/merchant-center.png" alt="" /></span><b>{h.flowTitle}</b></div>
        {h.flow.map(([a, b], k) => (
          <div key={a}>
            {k > 0 && <i className="hf-ln" />}
            <div className="hf-st"><svg viewBox="0 0 24 24" aria-hidden="true">{icons[k]}</svg><span><b>{a}</b><small>{b}</small></span></div>
          </div>
        ))}
      </div>
      <div className="hf-c hf-rc">
        <p className="hf-rt">{roas[0]}</p><p className="hf-rs">{roas[1]}</p>
        <svg viewBox="0 0 300 100" aria-hidden="true">
          <path className="hf-gl" d="M4 92H296" />
          <path className="hf-up" pathLength="1" d="M4 90H34C50 90 58 70 76 66C90 63 96 73 108 69C128 62 140 47 158 45C171 44 177 52 190 47C216 37 240 22 296 12" />
          {[[22, 90], [76, 66], [158, 45], [290, 13]].map(([cx, cy], k) => <circle key={k} className="hf-dt" cx={cx} cy={cy} r="4.5" style={{ animationDelay: `${0.5 + k * 0.45}s` }} />)}
        </svg>
        <div className="hf-phs">{phases.map((x) => <span key={x}>{x}</span>)}</div>
      </div>
    </div>
  );
}
