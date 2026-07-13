/* Renders a JSON-LD <script>. Server component — the structured data is baked
   into the static HTML so answer engines read it without executing JS. */
export default function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
