import { TRUST } from "@/lib/site";

export default function TrustRow({ line, sub }) {
  return (
    <div className="trust">
      <div className="av">
        {TRUST.initials.map((x, i) => (
          <span key={i}>{TRUST.photos[i] ? <img src={TRUST.photos[i]} alt="" /> : x}</span>
        ))}
      </div>
      <div>
        <div className="tr-rt"><span className="stars" aria-hidden="true">★★★★★</span><b>{line}/5</b></div>
        <em>{sub}</em>
      </div>
    </div>
  );
}
