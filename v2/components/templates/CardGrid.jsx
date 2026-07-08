// Grid of cards (icon + category + title + description). Reuses the agents card styling.
// cards: [{ icon?: <path d>, cat?: string, title: string, desc: string }]
export default function CardGrid({ cards = [] }) {
  return (
    <div className="agents__grid">
      {cards.map((c, i) => (
        <article className="agents__card rv" style={{ '--i': i }} key={c.title}>
          {c.icon && (
            <svg className="agents__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d={c.icon} /></svg>
          )}
          {c.cat && <span className="agents__cat mono">{c.cat}</span>}
          <h3>{c.title}</h3>
          <p>{c.desc}</p>
        </article>
      ))}
    </div>
  );
}
