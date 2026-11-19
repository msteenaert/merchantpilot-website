export default function WhoBadge({ locale }) {
  const nl = locale === "nl";
  return (
    <div className="ask-who">
      <img src="/people/milan.jpg" alt="Milan" />
      <span><b>{nl ? "Hier om te helpen" : "Here to help"}</b><em>{nl ? "Milan, medeoprichter" : "Milan, co-founder"}</em></span>
    </div>
  );
}
