import BlogList from '@/components/BlogList';
import BlogPostHeroBg from '@/components/BlogPostHeroBg';

export const metadata = {
  title: 'FlowX — Knowledge Hub',
  description:
    'The FlowX.AI Knowledge Hub: expert guides, product deep-dives, and answers to your questions — wrapping legacy banking cores with AI agents, modernization without rip-and-replace.',
};

export default function BlogPage() {
  return (
    <main id="top">
      <section className="section roi-hero blog-post-hero">
        {/* same typeset-manuscript background as the article headers */}
        <BlogPostHeroBg className="blog-post-hero__bg" />
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">Resources · Knowledge Hub</span>
            <div className="section__headline">
              <h1 className="h2 rv-load" style={{ '--d': 1 }}>Knowledge Hub<span className="amber">.</span></h1>
              <p className="section__lede rv-load" style={{ '--d': 2 }}>
                Expert guides, product deep-dives, and answers to your questions.
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
