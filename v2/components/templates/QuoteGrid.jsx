// Grid of testimonial cards. Reuses the testimonials styling.
// quotes: [{ quote, role, org }]
export default function QuoteGrid({ quotes = [] }) {
  return (
    <div className="quotes__grid">
      {quotes.map((q, i) => (
        <figure className="quotes__card rv" style={{ '--i': i }} key={q.org}>
          <blockquote>{q.quote}</blockquote>
          <figcaption>
            <span className="quotes__role">{q.role}</span>
            <span className="quotes__org mono">{q.org}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
