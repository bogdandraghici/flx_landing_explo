import BlogList from '@/components/BlogList';

export const metadata = {
  title: 'FlowX — Blog',
  description:
    'The FlowX.AI blog: field guides, buyer’s guides and playbooks on wrapping legacy banking cores with AI agents — modernization without rip-and-replace, in weeks.',
};

export default function BlogPage() {
  return (
    <main id="top">
      <section className="section roi-hero">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">Resources · Blog</span>
            <div className="section__headline">
              <h1 className="h2 rv">The FlowX.AI blog<span className="amber">.</span></h1>
              <p className="section__lede rv" style={{ '--i': 1 }}>
                Field guides, buyer’s guides and rollout playbooks for modernizing banking operations —
                wrapping legacy cores with AI agents instead of replacing them. Filter by topic.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section blog-section">
        <div className="shell">
          <BlogList />
        </div>
      </section>
    </main>
  );
}
