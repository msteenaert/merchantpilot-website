import { home } from "@/lib/home";

const icons = [
  <path key="a" d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  <g key="b"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></g>,
  <g key="c"><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></g>,
];

export default function HeroPlatforms({ locale }) {
  const p = home[locale].platforms;
  return (
    <div className="hf-pl" role="img" aria-label={p.map((x) => x.title).join(", ")}>
      {p.map((c, i) => (
        <div className={"hf-pc hf-pc" + (i + 1)} key={c.title}>
          <div className="hf-ph">
            <span className="hf-pi"><img src={c.logo} alt={c.title} /></span>
            <div><b>{c.title}</b><em>{c.sub}</em></div>
          </div>
          {c.steps.map((s, k) => (
            <div key={s}>
              {k > 0 && <i className="hf-ln" />}
              <div className="hf-st"><svg viewBox="0 0 24 24" aria-hidden="true">{icons[k]}</svg><span>{s}</span></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
