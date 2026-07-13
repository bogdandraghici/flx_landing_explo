import { absUrl, SITE_ORIGIN } from '@/components/lib/site';

export const dynamic = 'force-static';

/* robots.txt (emitted at build). Deliberate AI-crawler policy: this is a
   marketing/knowledge site that WANTS to be indexed and cited by answer
   engines, so we ALLOW the search/answer bots (and general crawlers). If FlowX
   later wants to opt out of model *training* while staying citable, flip the
   training-oriented bots (GPTBot, CCBot, Bytespider, Google-Extended) to
   disallow while keeping the answer bots (OAI-SearchBot, PerplexityBot,
   ClaudeBot, Applebot) allowed. Keep this an explicit, reviewed choice. */
const ANSWER_AND_SEARCH_BOTS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',   // OpenAI
  'PerplexityBot', 'Perplexity-User',          // Perplexity
  'ClaudeBot', 'Claude-Web', 'anthropic-ai',   // Anthropic
  'Google-Extended',                           // Google (Gemini / AI Overviews training+grounding)
  'Applebot', 'Applebot-Extended',             // Apple
  'Bingbot',                                   // Microsoft / Copilot
];

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // named answer/search bots — explicitly allowed (documented intent)
      { userAgent: ANSWER_AND_SEARCH_BOTS, allow: '/' },
    ],
    sitemap: absUrl('/sitemap.xml'),
    host: SITE_ORIGIN,
  };
}
