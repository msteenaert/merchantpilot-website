export default function LogoStrip({ label, logos }) {
  return (
    <section className="lgs">
      <div className="w"><p className="lgs-l">{label}</p></div>
      <div className="lgs-m"><div className="lgs-t">
        {Array.from({ length: 8 }).map((_, n) => (
          <div className="lgs-g" key={n} aria-hidden={n > 0 ? "true" : undefined}>
            {logos.map(([src, alt]) => <div className="lgs-i" key={src}><img src={src} alt={n === 0 ? alt : ""} loading="lazy" /></div>)}
          </div>
        ))}
      </div></div>
    </section>
  );
}
