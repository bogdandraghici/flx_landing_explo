/* FlowX.AI open models — published at https://huggingface.co/flowxai.
   Summaries + benchmark numbers are transcribed from the public model cards
   (Sep 2026). `bench.bars` values are the exact figures reported on each card;
   `kind` drives the bar colour: flowx (amber) · frontier (neutral) · baseline
   (faint). Metrics are 0–1 scores (F1 / accuracy) unless noted. */
export const MODELS = [
  {
    slug: 'scam-guard-qwen17b',
    name: 'ScamGuard 1.7B',
    repo: 'flowxai/scam-guard-qwen17b',
    params: '1.7B',
    type: 'Scam & fraud detection',
    base: 'Qwen3-1.7B (LoRA)',
    license: 'Apache-2.0',
    blurb: 'On-device scam and fraud detector for SMS, email and chat (English + Romanian). Explains why a message is risky and routes to trusted verification — no network calls.',
    bench: {
      metric: 'Scam verdict — macro-F1 · ScamGuardBench v0.2',
      note: '120-item in-distribution slice. The 1.7B on-device model beats a frontier API on verdict and tactic F1, with zero false positives on legitimate messages.',
      frontier: true,
      bars: [
        { label: 'ScamGuard 1.7B', value: 0.975, kind: 'flowx' },
        { label: 'Claude Haiku 4.5', value: 0.829, kind: 'frontier' },
        { label: 'Keyword baseline', value: 0.482, kind: 'baseline' },
      ],
    },
  },
  {
    slug: 'scam-guard-qwen06b',
    name: 'ScamGuard 0.6B',
    repo: 'flowxai/scam-guard-qwen06b',
    params: '0.6B',
    type: 'Scam & fraud detection',
    base: 'Qwen3-0.6B (LoRA)',
    license: 'Apache-2.0',
    blurb: 'The phone-sized sibling of ScamGuard: the same on-device scam triage in 0.6B parameters, for the tightest edge budgets.',
    bench: {
      metric: 'Scam verdict — macro-F1 · ScamGuardBench v0.2',
      note: 'Even at 0.6B it edges a frontier API on the in-distribution benchmark with zero false positives; on fresh out-of-distribution messages the frontier model leads.',
      frontier: true,
      bars: [
        { label: 'ScamGuard 0.6B', value: 0.926, kind: 'flowx' },
        { label: 'Claude Haiku 4.5', value: 0.829, kind: 'frontier' },
        { label: 'Keyword baseline', value: 0.482, kind: 'baseline' },
      ],
    },
  },
  {
    slug: 'cee-pii',
    name: 'CEE-PII',
    repo: 'flowxai/cee-pii',
    params: '~300M',
    type: 'PII / sensitive-entity detection',
    base: 'GLiNER multi-v2.1 (mDeBERTa-v3)',
    license: 'Apache-2.0',
    blurb: 'Small multilingual span-level PII detector weighted toward Central & Eastern European languages. Redacts before text leaves the perimeter or reaches an LLM — on consumer CPU.',
    bench: {
      metric: 'PII detection — micro-F1 (exact match)',
      note: 'Held-out multilingual set (EN/PL/RO/HU/UZ); 100-doc slice vs Claude. Fine-tuning lifts exact-F1 4.7× over the zero-shot base, reaching ~89% of a frontier API’s score while running fully offline.',
      frontier: true,
      bars: [
        { label: 'CEE-PII (300M)', value: 0.827, kind: 'flowx' },
        { label: 'Claude Opus 4.8', value: 0.936, kind: 'frontier' },
        { label: 'GLiNER zero-shot', value: 0.177, kind: 'baseline' },
      ],
    },
  },
  {
    slug: 'caveat',
    name: 'Caveat',
    repo: 'flowxai/caveat',
    params: '4B',
    type: 'Risky-clause detection',
    base: 'Qwen3-4B',
    license: 'Apache-2.0',
    blurb: 'On-device model that spots and explains risky clauses in consumer contracts across 34 clause types (EN/RO/PL/HU) — privately, with no external APIs. A triage aid, not legal advice.',
    bench: {
      metric: 'Risky-clause — overall F1 · RedFlag-Bench v0.1',
      note: '100-chunk slice vs Claude Opus. The 4B on-device model trails frontier overall, but leads on the most common clause types (lease 0.80 vs 0.30, English 0.63 vs 0.27) while running fully private.',
      frontier: true,
      bars: [
        { label: 'Caveat (4B)', value: 0.233, kind: 'flowx' },
        { label: 'Claude Opus', value: 0.385, kind: 'frontier' },
      ],
    },
  },
  {
    slug: 'sentinel-gate',
    name: 'Sentinel Gate',
    repo: 'flowxai/sentinel-gate',
    params: '4B',
    type: 'Escalation gate',
    base: 'Qwen3-4B',
    license: 'Apache-2.0',
    blurb: 'An escalation gate for regulated decisions: decides which cases are safe to automate and which must route to a human, with a structured rationale and audit trail.',
    bench: {
      metric: 'Escalation gate — held-out (n=71)',
      note: 'Self-reported on 71 realistic-synthetic regulated cases; no frontier baseline published. Every case needing escalation was flagged — zero missed escalations.',
      frontier: false,
      bars: [
        { label: 'Action accuracy', value: 1.0, kind: 'flowx' },
        { label: 'Escalation recall', value: 1.0, kind: 'flowx' },
        { label: 'JSON validity (raw)', value: 0.89, kind: 'flowx' },
      ],
    },
  },
  {
    slug: 'semantic-mapper',
    name: 'Semantic Mapper',
    repo: 'flowxai/semantic-mapper',
    params: '4B',
    type: 'Ontology extraction',
    base: 'Qwen3-4B (LoRA)',
    license: 'Apache-2.0',
    blurb: 'First-stage extraction for compliance pipelines: turns regulatory clauses into structured ontology JSON (structural, semantic and governance facets) for downstream policy and escalation models.',
    bench: {
      metric: 'Ontology extraction — held-out (112 multilingual docs)',
      note: 'Self-reported; no frontier baseline. Perfect structural validity; concept-F1 reflects agreement with FlowX’s annotation convention on unseen documents, not human-legal agreement.',
      frontier: false,
      bars: [
        { label: 'JSON validity', value: 1.0, kind: 'flowx' },
        { label: 'All facets present', value: 1.0, kind: 'flowx' },
        { label: 'Concepts F1', value: 0.54, kind: 'flowx' },
      ],
    },
  },
];

export const HF_ORG = 'https://huggingface.co/flowxai';

/* Industry model families — on-device NER + de-identification SLM families,
   one per regulated vertical. These ship as families of small encoder/document
   models (not single checkpoints), so they're presented as families rather than
   in the head-to-head benchmark grid above. Content transcribed from each
   family's model page. `slug` doubles as the /models#<slug> deep-link anchor. */
export const INDUSTRY_MODELS = [
  {
    slug: 'openledger',
    name: 'OpenLedger',
    industry: 'Banking',
    family: 'Open-source financial NER',
    count: '9 models',
    blurb: 'Small encoder models for banking: extract IBANs, PANs, counterparties and 30+ financial entity types, and de-identify PCI & PII — without a single byte leaving your network. IBAN/card checksums validated on-device.',
    entities: '30+ financial entities',
    latency: '~140 ms / doc',
    reg: 'PCI · GLBA · GDPR · AML',
    install: 'github.com/flowx-ai/openner',
  },
  {
    slug: 'opencover',
    name: 'OpenCover',
    industry: 'Insurance',
    family: 'Open-source insurance NER',
    count: '8 models',
    blurb: 'A family of encoder models that read dec pages, FNOL notices, ACORD forms, adjuster notes and medical reports — extracting 28+ entity types and stripping PII + all 18 HIPAA identifiers on-device.',
    entities: '28+ insurance entities',
    latency: '~150 ms / doc',
    reg: 'GLBA + HIPAA',
    install: 'github.com/flowx-ai/openner',
  },
  {
    slug: 'openfreight',
    name: 'OpenFreight',
    industry: 'Trade & shipping',
    family: 'Open-source logistics NER',
    count: '8 models',
    blurb: 'Encoder and document models that read B/Ls, air waybills, commercial invoices, packing lists and customs declarations — validating ISO 6346, IMO, HS and UN/LOCODE codes and de-identifying pricing & PII on-prem. ONNX/edge exports included.',
    entities: '30+ trade entities',
    latency: '~150 ms / doc',
    reg: 'On-prem · signed audit trail',
    install: 'github.com/flowx-ai/openner',
  },
  {
    slug: 'openvita',
    name: 'OpenVita',
    industry: 'Pharmacy & healthcare',
    family: 'On-device healthcare NER',
    count: '5 models',
    blurb: 'On-device NER and SLM models for pharmacy and healthcare ops: route the inbox, extract every expiry, lot and GTIN, and de-identify patient PII and health data — because patient data cannot go to a cloud LLM.',
    entities: 'Expiry · lot · GTIN · PHI',
    latency: '~126 ms / doc',
    reg: 'HIPAA + GDPR Art. 9',
    install: 'github.com/flowx-ai/openner',
  },
];
