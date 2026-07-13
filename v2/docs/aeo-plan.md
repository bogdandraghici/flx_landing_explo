# AEO plan — making the FlowX v2 site answer-engine ready

**Goal:** be the source AI answer engines (ChatGPT, Gemini, Perplexity, Google AI Overviews, Claude) *quote and cite* when someone asks about enterprise AI agents for banking/insurance/logistics — not just rank in blue links.

AEO is mostly classic technical SEO + explicit machine-readable structure + content that answers a question in the first sentence. Below is what we already have, then a phased, file-level plan for this Next.js (static-export) site.

---

## Where we are already (good foundations)
- **Static, fast, server-rendered HTML** — every page prerenders; no JS needed to read content (crawlers get the full text). This is the single biggest AEO advantage and it's already true.
- **Clean semantic HTML** — real `<h1>/<h2>/<h3>`, lists, tables (esp. blog + research + models).
- **Metadata**: titles + descriptions site-wide; **OG/Twitter + canonical + BlogPosting JSON-LD** now on blog articles (this change).
- **Question-shaped content**: the scraped blog posts are literally FAQ-structured (H2s are questions) — ideal raw material for `FAQPage` schema.
- **Quantified, comparative content**: model benchmarks vs frontier, ROI math, comparison tables — the "direct answer with a number" AI engines prefer.

---

## The plan

### Phase 1 — Technical foundations (quick wins, ~½ day)
1. **`app/sitemap.js`** — dynamic sitemap listing every route (home, platform pages, industries, `/ai-agents`, `/roi-calculator`, `/models`, `/research` + each paper, `/blog` + each post, `/about`). Next generates `sitemap.xml` at build.
2. **`app/robots.js`** → `robots.txt`: allow all, link the sitemap, and **explicitly decide on AI crawlers** — `GPTBot`, `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, `Claude-Web`, `Google-Extended`, `Bytespider`, `CCBot`. For AEO you generally want to **allow** the search/answer bots (GPTBot, PerplexityBot, OAI-SearchBot, Google-Extended) and can choose to disallow training-only ones. Make this an explicit, reviewed choice.
3. **`public/llms.txt`** (+ optional `llms-full.txt`) — the emerging convention: a curated, plain-markdown map of the site for LLMs (what FlowX is, key pages with one-line descriptions, links to the papers/models). Cheap, increasingly read by AI tools.
4. **Canonical URLs** on every page (`alternates.canonical`) — done on blog; extend site-wide via a small metadata helper. Prevents the github.io subpath / trailing-slash ambiguity from splitting authority.
5. **1200×630 OG image** — replace the 512×512 placeholder with a proper branded social card (per-page ideally; a good default at minimum).

### Phase 2 — Structured data (JSON-LD) — the core of AEO (~1–2 days)
Add a small set of reusable JSON-LD components (`components/schema/*`) and drop them per page type:
- **Site-wide** (in `layout.jsx`): `Organization` (name FlowX.AI, logo, `sameAs`: Hugging Face, LinkedIn, X, GitHub, docs) + `WebSite` (with `SearchAction` if we add search).
- **`BlogPosting`** — done. Add **`FAQPage`** to blog posts: extract the question-H2s + first answer paragraph into `Question`/`Answer` pairs (the hub JSON-LD already carried a `FAQPage` — reuse it). FAQ rich results are among the most-cited by AI Overviews.
- **`BreadcrumbList`** on nested pages (blog post, research paper, model) — helps engines place the page in a hierarchy.
- **Research papers** (`/research/[slug]`): `ScholarlyArticle`/`Article` with author, abstract, `datePublished`, `keywords`, and a `DownloadAction`/`encoding` for the PDF.
- **Open models** (`/models`): `ItemList` of `SoftwareApplication` (or `Dataset`) entries — name, description, `applicationCategory`, `license` (Apache-2.0), `downloadUrl` (Hugging Face); optionally `Dataset`/claims for the benchmark numbers.
- **AI agents catalog** (`/ai-agents`): `ItemList` / `CollectionPage`; per-agent `Product`-like or `DefinedTerm` entries. (Large — could be a curated subset.)
- **Platform**: `SoftwareApplication`/`Product` for the FlowX.AI platform with `aggregateRating`/`offers` only if we have real data (don't fabricate).

### Phase 3 — Content structure for extractability (ongoing)
- **Answer-first**: every page and H2 section leads with a 1–2 sentence direct answer, *then* elaborates. AI engines lift the first concise, self-contained statement.
- **TL;DR / Key takeaways** block near the top of long pages (blog, papers) — a 3–5 bullet summary. Add a `.key-takeaways` prose component.
- **Definitions**: "What is X?" sections with a crisp one-line definition (great for "define/what is" queries).
- **Comparison tables** with clear headers (have on blog/models) — keep them HTML `<table>`, not images.
- **Stats + citations**: when we state a number (95% of pilots fail, 65% time reduction), link the primary source. AI engines weight cited claims higher.
- **Freshness**: show `datePublished`/`dateModified` (have on blog); add "Last updated" to evergreen pages.

### Phase 4 — Entity & authority (E-E-A-T)
- **Consistent naming**: always "FlowX.AI" (the wordmark + `.AI`), same across pages, schema, and `sameAs`.
- **Author/org entities**: papers → real author; blog → org (or named authors if we have them). Link to the `/about` page as the org's expertise anchor.
- **`sameAs` graph**: connect the Organization to Hugging Face (`/flowxai`), LinkedIn, X, GitHub, docs.flowx.ai — this is how engines resolve "FlowX.AI" to one entity.
- **Primary-source content**: the research papers and open models are strong originality signals — surface them prominently and cross-link.

### Phase 5 — Crawlability, links, performance
- **Internal linking / topic clusters**: blog "Further reading" (done) + link industry/use-case pages ↔ relevant agents ↔ relevant papers. Dense, relevant internal links help engines map topical authority.
- **Image alt text** everywhere (diagrams, covers).
- **Performance**: already static + light; keep Lighthouse/CWV green.
- **Fix dead nav links** (ROI Hub, methodology, safety, several `/solutions` and `/platform` routes 404) — 404s in the nav hurt crawl trust. Build them or remove them.

### Phase 6 — Measurement
- **Server/analytics**: log AI crawler user-agents (GPTBot, PerplexityBot, ClaudeBot, OAI-SearchBot, Google-Extended) to see who's indexing.
- **Referral tracking**: watch for referrals from chat.openai.com, perplexity.ai, gemini, copilot in analytics.
- **Citation spot-checks**: periodically ask the target questions in ChatGPT/Perplexity/AI Overviews and record whether FlowX is cited, and with what snippet — iterate on the pages that should have answered.

---

## Priority (what to do first)
| Effort | Impact | Action |
|---|---|---|
| **Low** | **High** | `sitemap.js`, `robots.js` (+ AI bots), `llms.txt`, site-wide `Organization`/`WebSite` JSON-LD, canonicals |
| **Low** | **High** | `FAQPage` schema on blog (reuse the hub's FAQ data) |
| Med | High | `Article`/`Dataset`/`ItemList` schema for research, models, agents |
| Med | Med | Answer-first rewrites + TL;DR blocks on key pages; cite stats |
| Med | Med | Fix/remove the 404 nav links; tighten internal linking |
| Med | Low-Med | Proper 1200×630 per-page OG cards |

## Per-page-type schema cheat-sheet
- **Home / platform** → `Organization`, `WebSite`, `SoftwareApplication`
- **Blog post** → `BlogPosting` + `FAQPage` + `BreadcrumbList`
- **Research paper** → `ScholarlyArticle` + `BreadcrumbList`
- **Models** → `ItemList`/`SoftwareApplication` (+ Apache-2.0 `license`, HF `downloadUrl`)
- **AI agents** → `CollectionPage`/`ItemList`
- **ROI calculator** → `WebApplication` + a short FAQ on the methodology

## Guardrails
- **Never fabricate** ratings, review counts, or numbers in schema — only mark up what's on the page and true. Answer engines (and Google) penalize schema/content mismatch.
- Keep the AI-bot allow/deny list a **deliberate, documented decision** (train vs. answer bots differ).
- Schema must **match visible content** — if it's in JSON-LD, it should be on the page.

> This turn shipped Phase-1 metadata (OG/Twitter/canonical) and Phase-2 `BlogPosting` on articles. The rest is scoped above; recommend doing the Phase-1 quick wins + blog `FAQPage` next as one small PR.
