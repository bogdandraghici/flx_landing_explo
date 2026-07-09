// Grid of stat cards (amber value + label). Reuses the outcomes card styling.
// stats: [{ value: string, label: string }]
export default function StatGrid({ stats = [] }) {
  return (
    <dl className="outcomes__grid">
      {stats.map((s, i) => (
        <div className="outcomes__card rv" style={{ '--i': i }} key={s.label}>
          <dt className="mono">{s.value}</dt>
          <dd>{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}
