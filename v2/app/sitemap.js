import { absUrl } from '@/components/lib/site';
import { POSTS } from '@/lib/blogData';
import { PAPERS } from '@/lib/researchData';
import { OPEN_MODELS } from '@/lib/openModelsData';

export const dynamic = 'force-static';

/* Static sitemap.xml (emitted at build). URLs are absolute, including the Pages
   base path (via absUrl). lastModified is only set from real content dates so
   the build stays deterministic (no new Date() churn under the pinned build ID). */
export default function sitemap() {
  const staticRoutes = [
    ['/', 1.0],
    ['/ai-agents', 0.9],
    ['/roi-calculator', 0.9],
    ['/models', 0.8],
    ['/research', 0.8],
    ['/blog', 0.8],
    ['/customers', 0.7],
    ['/platform', 0.7],
    ['/platform/integrations', 0.6],
    ['/platform/ontology', 0.6],
    ['/platform/roi-hub', 0.6],
    ['/platform/security', 0.6],
    ['/platform/status', 0.4],
    ['/agent-builder', 0.7],
    ['/flowx-code', 0.7],
    ['/observatory', 0.7],
    ['/banking', 0.7],
    ['/insurance', 0.7],
    ['/logistics', 0.7],
    ['/about', 0.6],
    ['/resources', 0.5],
    ['/blog-flowx-6', 0.4],
    ['/onboarding-stopped-being-a-loop', 0.4],
    ['/privacy-policy', 0.3],
    ['/cookie-policy', 0.3],
    ['/terms-and-conditions', 0.3],
  ].map(([path, priority]) => ({ url: absUrl(path), changeFrequency: 'monthly', priority }));

  const papers = PAPERS.map((p) => ({ url: absUrl(`/research/${p.slug}`), changeFrequency: 'yearly', priority: 0.6 }));

  const openModels = OPEN_MODELS.map((m) => ({ url: absUrl(`/models/${m.slug}`), changeFrequency: 'monthly', priority: 0.6 }));

  const posts = POSTS.map((p) => ({
    url: absUrl(`/blog/${p.slug}`),
    lastModified: p.dateModified || p.date || undefined,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...openModels, ...papers, ...posts];
}
