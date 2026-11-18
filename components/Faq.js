export default function Faq({ items }) {
  return (
    <div className="faq">
      {items.map(([q, a], i) => (
        <details key={i}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
