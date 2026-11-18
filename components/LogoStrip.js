export default function LogoStrip({ label, logos }) {
  return (
    <section className="lgs">
      <div className="w">
        <p className="lgs-l">{label}</p>
        <div className="lgs-row">
          {logos.map(([src, alt]) => <div className="lgs-i" key={src}><img src={src} alt={alt} loading="lazy" /></div>)}
        </div>
      </div>
    </section>
  );
}
