// Section header: "NN / Name" eyebrow + display h2 (amber period) + optional lede.
export default function SectionHead({ no, title, lede }) {
  return (
    <div className="section__head">
      {no && <span className="section__no mono">{no}</span>}
      <div className="section__headline">
        <h2 className="h2 rv">{title}<span className="amber">.</span></h2>
        {lede && <p className="section__lede rv" style={{ '--i': 1 }}>{lede}</p>}
      </div>
    </div>
  );
}
