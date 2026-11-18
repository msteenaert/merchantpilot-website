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
        <span className="stars" aria-hidden="true">★★★★★</span>
        <b>{line}</b>
        <em>{sub}</em>
      </div>
    </div>
  );
}
