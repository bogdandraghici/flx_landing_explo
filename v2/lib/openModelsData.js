/* Content for the four open industry-model one-pagers, transcribed verbatim
   from each model's source page. One object per model; the shared
   <OpenModelPage> template (components/OpenModelPage.jsx) renders them in the
   v2 design line. `slug` doubles as the /models/<slug> route + deep-link. */

/* All four families live in one open-source repo (weights on Hugging Face). */
export const OPENNER_REPO = 'https://github.com/flowx-ai/openner';

export const OPEN_MODELS = [
  {
    slug: 'openledger',
    name: 'OpenLedger',
    industry: 'Banking',
    seo: {
      title: 'OpenLedger — On-device NER & de-identification for banking',
      description:
        'Open-source small encoder models for banking: extract IBANs, PANs, counterparties and 30+ financial entity types, and de-identify PCI & PII entirely on your hardware. Apache-2.0.',
    },
    eyebrow: 'Open-source financial NER',
    tagline: 'Your Data. Your Model. Your Hardware.',
    h1: { lead: 'Detect ', em: '30+ financial entity types', tail: ' and redact PCI & PII — 100% on your hardware.' },
    sub: 'Small encoder models built for banking: extract IBANs, PANs, counterparties and financial facts, and de-identify regulated data without a single byte leaving your network. Apache-2.0, hosted on Hugging Face.',
    stats: [
      { value: '9', label: 'models', sub: 'banking family, all trained' },
      { value: '9', label: 'languages', sub: 'multilingual PII' },
      { value: '~140 ms', label: 'per document', sub: 'on-device latency' },
      { value: '$0 · 0', label: 'cost · bytes egress', sub: 'no API fees, no data movement' },
    ],
    quickstart: {
      no: '01', label: 'Quickstart',
      title: 'Four lines to production-grade financial NER.',
      points: [
        'Models download once from Hugging Face, then run fully offline.',
        'Pick a redaction profile — pci-glba, gdpr, or aml — and get consistent entity policies out of the box.',
        'Entities come back with spans, confidence, and checksum validation for IBANs and card numbers.',
        'De-identification runs in the same pass. Nothing is queued, batched, or sent anywhere.',
      ],
      pip: 'pip install git+https://github.com/flowx-ai/openner',
      code: {
        file: 'quickstart.py',
        body: `from openner import analyze

result = analyze(text, profile="pci-glba")
print(result.entities)      # IBAN, PAN, COUNTERPARTY, AMOUNT …
safe = result.deidentify()  # redacts cardholder data & PII on-device`,
      },
    },
    runtime: {
      no: '02', label: 'Runtime',
      title: 'Runs everywhere your data is allowed to be.',
      sub: 'The same weights, from an air-gapped mainframe adjacency to a browser tab. If Python or ONNX runs there, OpenLedger runs there.',
      cards: [
        { title: 'On-prem CPU / GPU', body: 'Millisecond inference on commodity servers — no accelerators required, GPU optional for bulk jobs.' },
        { title: 'Air-gapped', body: 'Install from a wheel, load weights from disk. Zero network dependencies after setup.' },
        { title: 'Browser (ONNX / WASM)', body: 'Quantized builds run client-side in the browser — redact before data ever reaches a server.' },
        { title: 'REST / gRPC microservice', body: 'A single container exposes analyze-and-redact endpoints for every team behind your firewall.' },
      ],
    },
    privacy: {
      no: '03', label: 'Privacy & de-identification',
      title: 'Keep regulated data inside your walls.',
      sub: "De-identification isn't a feature bolted onto NER — it is the point. Every model ships with a redaction pipeline tuned for the data regimes banks actually answer to.",
      items: [
        { strong: 'PCI-DSS cardholder data', span: "Detects and redacts PANs, CVVs, expiry dates and magnetic-stripe track data before it lands anywhere it shouldn't." },
        { strong: 'GLBA NPI protection', span: 'Covers nonpublic personal information — account numbers, balances, credit history references — in one pass.' },
        { strong: 'Checksum validation', span: 'IBAN mod-97 and card Luhn checks separate real identifiers from lookalike noise, cutting false positives.' },
        { strong: 'Context-aware boosting', span: 'Surrounding language — "wire to", "beneficiary", "card ending" — raises or lowers entity confidence.' },
        { strong: 'Configurable redaction profiles', span: 'Ship-ready policies for pci-glba, gdpr and aml — or compose your own entity-by-entity.' },
        { strong: 'Signed audit reports', span: 'Every redaction run emits a cryptographically signed report: what was found, what was masked, under which policy.' },
        { strong: 'Zero data movement', span: 'No API keys, no callbacks, no usage pings. The library has no network code in the inference path.' },
        { strong: 'No telemetry, ever', span: 'Auditable in an afternoon: the source is small enough for your security team to actually read.' },
      ],
    },
    models: {
      no: '04', label: 'Model library',
      title: 'Small models for banking.',
      sub: "Nine encoder models, each trained for one job in the financial document stack. Small enough for a laptop, precise enough for production. The cross-industry DocFormNER model (LayoutLMv3 — text + 2D layout + page image) now reads scanned and photographed mortgage packets on-prem; it is a preview trained on synthetic rendered forms, so fine-tune it on your own OCR'd scans before production.",
      cards: [
        { name: 'IbanDetect', desc: 'Extracts and validates IBAN, account, routing and SWIFT-BIC identifiers.', pills: ['IBAN', 'SWIFT/BIC', 'ACCOUNT'] },
        { name: 'PanRedact', desc: 'PCI-DSS cardholder-data detection and redaction.', pills: ['PAN', 'CVV', 'EXPIRY', 'TRACK'] },
        { name: 'KycExtract', desc: 'Identity fields from onboarding documents.', pills: ['NAME', 'DOB', 'TAX_ID', 'ADDRESS'] },
        { name: 'SanctionScreen', desc: 'Party, counterparty and UBO detection with watchlist flags.', pills: ['PARTY', 'UBO', 'SANCTIONED'] },
        { name: 'TxnClassify', desc: 'Parses transaction narratives into structured fields.', pills: ['MERCHANT', 'AMOUNT', 'CURRENCY', 'TXN_TYPE'] },
        { name: 'FilingTag', desc: 'XBRL-style numeric financial facts using FiNER-139 labels.', pills: ['REVENUE', 'EBITDA', 'RATE'] },
        { name: 'CounterpartyLink', desc: 'Counterparty and issuer NER with LEI, ISIN and ticker linking.', pills: ['LEI', 'ISIN', 'TICKER'] },
        { name: 'AmlNarrate', desc: 'Entity and event extraction from SAR / STR narratives.', pills: ['ENTITY', 'EVENT', 'JURISDICTION'] },
        { name: 'MortgageDocNER', desc: 'Extracts mortgage-specific fields from applications and offers: borrower, lender, property, loan amount, LTV, rate, term, income.', pills: ['BORROWER', 'LENDER', 'PROPERTY_ADDR', 'LOAN_AMOUNT', 'LTV', 'INTEREST_RATE'] },
      ],
    },
    products: {
      no: '05', label: 'Built with OpenLedger',
      title: 'From library to product.',
      sub: 'The toolkit is the foundation. These are the products teams assemble on top of it — each one runs entirely inside your perimeter.',
      cards: [
        { tag: 'Data protection', title: 'De-ID Gateway', body: 'An on-prem redaction proxy that strips PCI and PII from every document, log line and prompt before it reaches your analytics stack or an LLM — with signed audit logs for each pass.' },
        { tag: 'Financial crime', title: 'KYC / AML Copilot', body: 'Assembles KYC packets from onboarding documents and pre-drafts SAR narratives by cross-referencing parties, transactions and jurisdictions your analysts would otherwise chase by hand.' },
        { tag: 'Capital markets', title: 'Filing & Contract Intelligence', body: 'Turns filings, credit agreements and term sheets into structured financial facts and counterparty graphs — LEI-linked, queryable, and current the moment a document lands.' },
      ],
    },
    compliance: {
      no: '06', label: 'Compliance coverage',
      title: 'Built for the regimes banks answer to.',
      sub: 'Entity coverage and redaction profiles map to the frameworks your compliance team already speaks.',
      chips: [
        { b: 'PCI-DSS', span: 'cardholder data' },
        { b: 'GLBA', span: 'customer NPI' },
        { b: 'BSA/AML', span: 'SAR narratives' },
        { b: 'KYC/CIP/CDD', span: 'onboarding' },
        { b: 'OFAC', span: 'sanctions' },
        { b: 'GDPR', span: 'data residency' },
        { b: 'MiFID II', span: 'comms records' },
        { b: 'SOX', span: 'reporting' },
        { b: 'PSD2', span: 'payments' },
      ],
    },
    benchmarks: {
      no: '07', label: 'Benchmarks',
      title: 'Measured against frontier LLMs.',
      sub: 'We benchmarked our small on-device models head-to-head against the latest cost-effective frontier LLMs. Same held-out documents, same entity types.',
      table: {
        head: ['Task', 'OpenLedger', 'Cost-effective frontier LLMs', 'Why the gap'],
        rows: [
          [
            { main: 'SEC-filing extraction', sub: 'FilingTag · real FiNER-139 · 139 XBRL fact types' },
            { score: 'F1 0.667', win: true, sub: 'pipeline-usable metric' },
            { score: '≤ 0.02', sub: 'every model tested' },
            { main: "Frontier models identify the facts but don't match the token convention a pipeline consumes." },
          ],
          [
            { main: 'Common extraction', sub: 'IBANs · PANs · invoices · multilingual PII' },
            { score: 'F1 1.000', win: true },
            { score: '≤ 1.000' },
            { main: 'Matches or beats every cheap frontier model — at a fraction of the latency and none of the cost.' },
          ],
          [
            { main: 'Mortgage-doc extraction', sub: 'MortgageDocNER · borrower · lender · LTV · rate · term' },
            { score: 'F1 1.000', win: true, sub: '~120 ms/doc · $0' },
            { score: '≤ 0.995', sub: 'gemini-3.5-flash best' },
            { main: 'Perfect strict entity-F1 ahead of every cost-effective frontier model — gemini-3.5-flash 0.995, gpt-5.4-mini 0.967, claude-haiku-4-5 0.954, gemini-3.1-flash-lite 0.940, gpt-5.4-nano 0.919.' },
          ],
        ],
      },
      callouts: [
        { value: '6–36×', label: 'faster' },
        { value: '$0 vs $5.57', label: 'per 1k docs, worst case' },
        { value: '0', label: 'bytes leave your network' },
      ],
      note: 'N=30 held-out documents per task. Frontier tier: Claude Haiku 4.5, GPT-5.4-mini, GPT-5.4-nano, Gemini 3.5-flash, Gemini 3.1-flash-lite (OpenAI models via the Responses API). Frontier LLMs remain better at open-ended reasoning — not what these models are for. Small fine-tuned encoders win on structured, convention-bound, on-device extraction.',
    },
    faq: {
      no: '08', label: 'FAQ',
      title: 'Questions banks ask first.',
      items: [
        { q: 'What is OpenLedger?', a: 'An open-source toolkit of small encoder-based NER models for banking and financial services, plus a de-identification pipeline. It detects 30+ financial entity types — IBANs, PANs, counterparties, financial facts — and redacts regulated data, all on your own hardware.' },
        { q: 'Why encoder models instead of a generative LLM?', a: "Extraction is a labeling problem, not a generation problem. Encoder NER models are two to three orders of magnitude smaller, run in milliseconds on CPUs, produce deterministic character-level spans, and never hallucinate an account number that wasn't in the text. For classification and extraction over regulated data, small and exact beats large and creative." },
        { q: 'Does my data ever leave my network?', a: 'No. Models are downloaded once (or side-loaded in air-gapped environments) and inference runs entirely locally. There are no API calls, no telemetry, and no network code in the inference path — a claim your security team can verify by reading the source.' },
        { q: 'How does this help with PCI-DSS or GLBA scope?', a: 'Systems that store or process cardholder data are in PCI scope. Redacting PANs, CVVs and track data at the boundary — before data reaches logs, analytics warehouses or LLM prompts — keeps those downstream systems out of scope. The same pattern applies to GLBA NPI: de-identify at ingestion, and everything after it handles only masked data. Signed audit reports document each redaction pass for your assessor.' },
        { q: 'Can I fine-tune on my own data?', a: 'Yes. Every model ships with training scripts and a documented label schema. Fine-tune on your own annotated corpus — internal transaction narratives, proprietary document formats — and the resulting weights stay yours, on your infrastructure.' },
        { q: 'How does it handle scanned or photographed documents?', a: "The text NER models expect extracted text, so pair them with your OCR of choice for scans. For layout-heavy paperwork we also ship DocFormNER, a cross-industry model built on LayoutLMv3 — it reads text, 2D layout and the page image together, so it can pull fields from scanned and photographed mortgage packets entirely on-prem. It is a preview trained on synthetic rendered forms and should be fine-tuned on your own OCR'd scans before production use." },
        { q: 'Is it really open-source?', a: 'Apache-2.0, for both code and model weights. Use it commercially, modify it, embed it in proprietary products. No dual licensing, no open-core upsell, no usage caps.' },
      ],
    },
    colophon: 'Trained and shipped: 9 open banking models, ONNX/edge exports, checksum validation (IBAN mod-97, card Luhn, ISIN/LEI), and de-identification with signed audit reports. Apache-2.0.',
  },
  {
    slug: 'opencover',
    name: 'OpenCover',
    industry: 'Insurance',
    seo: {
      title: 'OpenCover — On-device NER & de-identification for insurance',
      description:
        'Open-source small encoder models for insurance: read dec pages, FNOL notices, ACORD forms, adjuster notes and medical reports, extract 28+ entity types, and de-identify PII and PHI entirely on your hardware. Apache-2.0.',
    },
    eyebrow: 'Open-source insurance NER',
    tagline: 'Your Data. Your Model. Your Hardware.',
    h1: {
      lead: 'Extract every policy, claim & party entity — and strip ',
      em: 'GLBA + HIPAA',
      tail: ' data — 100% on your hardware.',
    },
    sub: 'OpenCover is a family of eight trained encoder models built for insurance. They read dec pages, FNOL notices, ACORD forms, adjuster notes and medical reports, extract 28+ entity types, and de-identify PII and PHI without a single record leaving your network. Apache-2.0, hosted on Hugging Face.',
    stats: [
      { value: '8', label: 'insurance models', sub: 'all trained' },
      { value: 'GLBA + HIPAA', label: 'dual-regulation', sub: 'de-identification' },
      { value: '~150 ms', label: 'per document', sub: 'on-device' },
      { value: '$0 · 0', label: 'API cost · records leave your network', sub: '' },
    ],
    quickstart: {
      no: '01',
      label: 'Quickstart',
      title: 'Four lines from raw document to safe, structured data.',
      points: [
        'One import, one call. Pick a compliance profile and OpenCover extracts, labels and redacts in a single pass — entirely in your process.',
      ],
      pip: 'pip install git+https://github.com/flowx-ai/openner',
      code: {
        file: 'quickstart.py',
        body: `from openner import analyze

result = analyze(document, profile="glba-hipaa")
print(result.entities)      # POLICY_NUMBER, CLAIM_NUMBER, PERIL, VIN …
safe = result.deidentify()  # strips PII + all 18 HIPAA identifiers on-device`,
      },
    },
    runtime: {
      no: '02',
      label: 'Runtime',
      title: 'Runs everywhere your documents already live.',
      sub: 'Small encoders mean no GPU cluster, no vendor API, no data-processing addendum. Deploy at the point of intake.',
      cards: [
        { title: 'On-prem CPU / GPU', body: 'Full throughput on commodity servers — encoder models run in milliseconds on CPU, faster still with a single GPU.' },
        { title: 'Air-gapped', body: 'Ship the weights on physical media and run with zero outbound connectivity — built for regulated core networks.' },
        { title: 'Inside your claims / policy admin system', body: 'Embed as a library in Guidewire-, Duck Creek- or homegrown-core pipelines, right where FNOLs and dec pages arrive.' },
        { title: 'Browser (ONNX / WASM)', body: 'Quantized ONNX builds run in-browser via WASM — redact a document before it ever reaches your server.' },
        { title: 'REST / gRPC', body: 'A one-command self-hosted service exposes every model behind REST and gRPC for your internal platform teams.' },
      ],
    },
    privacy: {
      no: '03',
      label: 'Privacy & de-identification',
      title: 'Dual-regulated data never leaves your premises.',
      sub: 'Insurance is the rare industry that handles financial NPI and health PHI in the same claim file. OpenCover treats both as first-class.',
      items: [
        { strong: 'One model, both regimes', span: 'InsurRedact covers GLBA financial PII and all 18 HIPAA Safe Harbor identifiers in a single pass — no chaining two redaction vendors.' },
        { strong: 'Insurance-shaped identifiers', span: "Strips SSNs, driver's license numbers, VINs, bank and payment details, plus diagnoses and ICD/CPT codes buried in medical-claims narratives." },
        { strong: 'Configurable policy profiles', span: 'Ship-with profiles for glba-npi, hipaa-safe-harbor and gdpr-art9 — or compose your own per line of business.' },
        { strong: 'Proven clinical lineage', span: 'The medical-claims branch reuses battle-tested clinical de-identification weights, adapted to bodily-injury and health-claim language.' },
        { strong: 'Signed audit reports', span: 'Every de-identification run emits a signed, replayable report — evidence for Fair Claims Practices reviews and DOI market-conduct exams.' },
        { strong: 'Zero data movement', span: 'No cloud calls, no telemetry, no usage phone-home. The only network traffic is the one-time model download — and even that is optional.' },
      ],
    },
    models: {
      no: '04',
      label: 'Model library',
      title: 'Small models for insurance, one job each.',
      sub: 'All eight models are trained and shipping — compact encoders with ONNX/edge exports and built-in VIN check-digit and ICD/CPT validation. Download from Hugging Face once, fine-tune freely, compose as needed. For scanned or photographed forms, the cross-industry FlowX DocFormNER model is an early preview (see the FAQ).',
      cards: [
        { name: 'PolicyDetect', desc: 'Policy numbers, coverages, limits, deductibles, premiums and effective dates from declarations pages.', pills: ['POLICY_NO', 'LIMIT', 'DEDUCTIBLE', 'PREMIUM'] },
        { name: 'ClaimExtract', desc: 'Claim number, loss date, cause, reserve and status from FNOL notices and running claim files.', pills: ['CLAIM_NO', 'LOSS_DATE', 'RESERVE'] },
        { name: 'PerilClassify', desc: 'Tags perils and cause-of-loss — fire, flood, wind, theft, collision — from free-text loss descriptions.', pills: ['PERIL', 'CAUSE_OF_LOSS'] },
        { name: 'PartyResolve', desc: 'Roles every party in the file: policyholder, claimant, adjuster, broker, beneficiary, carrier.', pills: ['POLICYHOLDER', 'CLAIMANT', 'ADJUSTER'] },
        { name: 'AssetDetect', desc: 'Insured objects and their identifiers: VIN, make/model/year, property addresses, equipment serials.', pills: ['VIN', 'PROPERTY_ADDR', 'SERIAL'] },
        { name: 'CodeMap', desc: 'Reference codes wherever they hide: NAIC, NCCI class, ICD/CPT, CAT event, NAICS/SIC.', pills: ['NAIC', 'ICD', 'CPT', 'CAT_CODE'] },
        { name: 'InsurRedact', desc: 'The dual-regulation de-identifier: GLBA financial PII plus all 18 HIPAA Safe Harbor identifiers.', pills: ['SSN', 'VIN', 'DL', 'ICD', 'PHI'] },
        { name: 'MedClaimNER', desc: 'Clinical branch for bodily-injury and health claims — reuses proven clinical NER weights.', pills: ['DIAGNOSIS', 'ICD', 'PROVIDER', 'INJURY'] },
      ],
    },
    products: {
      no: '05',
      label: 'Built with OpenCover',
      title: 'From toolkit to product in one sprint.',
      sub: 'Teams compose the models into working products. Three we ship as reference implementations:',
      cards: [
        { tag: 'Claims intake', title: 'FNOL Intake Copilot', body: 'Turns a phone transcript, email or photo FNOL into a structured, ACORD-mapped claim in seconds — every PII field flagged before it hits the queue. Runs on-prem.' },
        { tag: 'Claims handling', title: 'Claims-Triage Agent', body: 'Reads adjuster notes and medical reports, scores severity, and routes fast-track versus SIU/fraud review — with a full audit trail for Fair Claims Practices.' },
        { tag: 'Underwriting', title: 'Underwriting Submission Reader', body: 'Ingests broker slips, loss runs and SOVs; extracts risk entities and codes into a clean submission summary — no data ever leaving the carrier.' },
      ],
    },
    compliance: {
      no: '06',
      label: 'Compliance',
      title: 'Designed for the rules insurance actually answers to.',
      sub: "On-device processing doesn't exempt you from regulation — it just makes compliance tractable. OpenCover maps to the frameworks your legal team will ask about.",
      chips: [
        { b: 'HIPAA', span: 'Safe Harbor de-identification of health-claim PHI' },
        { b: 'GLBA + NAIC #672', span: 'protection of nonpublic personal financial information' },
        { b: 'NAIC Model Laws', span: '#668 Insurance Data Security Model Law alignment' },
        { b: 'State DOI rules', span: 'data-handling requirements across state insurance departments' },
        { b: 'Fair Claims Practices', span: 'auditable, replayable claim-handling decisions' },
        { b: 'GDPR', span: 'Article 9 special-category health data, processed locally' },
        { b: 'EU AI Act', span: 'transparency for high-risk underwriting and claims AI' },
        { b: 'Solvency II & IFRS 17', span: 'auditable data lineage from document to ledger' },
        { b: 'ACORD', span: 'extraction targets map to the ACORD data model' },
      ],
    },
    benchmarks: {
      no: '07',
      label: 'Benchmarks',
      title: 'Measured against frontier LLMs.',
      sub: 'We benchmarked our small on-device models head-to-head against the latest cost-effective frontier LLMs — same documents, same entity types.',
      callouts: [
        { value: '6–24×', label: 'faster than frontier APIs' },
        { value: '$0 vs $0.03–5.57', label: 'per 1k documents' },
        { value: '0', label: 'records leave your network' },
      ],
      note: 'Frontier LLMs win at open-ended reasoning — not structured, convention-bound extraction. Small fine-tuned encoders win there, and keep dual-regulated data on-prem.',
    },
    faq: {
      no: '08',
      label: 'FAQ',
      title: 'Questions carriers ask first.',
      items: [
        { q: 'What is OpenCover?', a: 'An open-source, privacy-first family of eight trained encoder NER models for insurance — PolicyDetect, ClaimExtract, AssetDetect, PerilClassify, PartyResolve, CodeMap, InsurRedact and MedClaimNER — covering P&C, life, claims and underwriting. They extract 28+ entity types with VIN check-digit and ICD/CPT validation, and de-identify GLBA + HIPAA data with signed audit reports, all on your own hardware. ONNX/edge exports included. Apache-2.0 licensed, models hosted on Hugging Face.' },
        { q: 'Why encoder models instead of a large LLM?', a: 'Extraction and redaction are token-classification problems, and small encoders are excellent at them: deterministic spans, millisecond CPU inference, no hallucinated fields, and models small enough to run inside a claims system or even a browser. Use an LLM downstream if you want; OpenCover keeps the sensitive first pass local and cheap.' },
        { q: 'Why dual GLBA + HIPAA de-identification?', a: "Insurance sits at the intersection of two regulatory regimes: policy and payment data is financial NPI under GLBA, while bodily-injury and health claims carry PHI under HIPAA. A single claim file often contains both. InsurRedact handles them in one pass so you don't have to stitch a banking redactor onto a healthcare one." },
        { q: 'Does any record ever leave my network?', a: 'No. Inference runs entirely in your process on your hardware. There are no cloud APIs, no telemetry and no phone-home. The only network activity is the one-time model download from Hugging Face — and in air-gapped mode you skip even that by importing the weights on physical media.' },
        { q: 'Can I fine-tune on my own claims data?', a: "Yes — that's the point of shipping small models under Apache-2.0. Fine-tune on your carrier-specific forms, endorsements and note-taking conventions with standard Hugging Face tooling, entirely inside your network. Your data never leaves; your improved weights are yours." },
        { q: 'Can it read scanned or photographed documents?', a: "As an early preview, the cross-industry FlowX DocFormNER model (a LayoutLMv3 encoder that reads text, 2D layout and the page image together, published at huggingface.co/flowxai/docformner) now reads scanned and photographed insurance documents such as ACORD forms and FNOL/claims packets, entirely on-prem — though it is trained on synthetically rendered forms and still needs evaluation on your real OCR'd scans before production use." },
        { q: 'How are the models trained, and is it really open source?', a: 'Everything — code, weights, training recipes — is Apache-2.0. An honest caveat: public insurance-text NER corpora are scarce, so training relies heavily on synthetic generation of ACORD forms, FNOL notices and dec pages, plus reuse of clinical de-identification corpora (i2b2/n2c2) for the medical-claims branch. We publish the generation pipelines so you can inspect and extend them.' },
      ],
    },
    colophon: 'Apache-2.0 · An open-source model family — not affiliated with any carrier or regulator.',
  },
  {
    slug: 'openfreight',
    name: 'OpenFreight',
    industry: 'Trade & shipping',
    seo: {
      title: 'OpenFreight — On-device NER for trade & shipping documents',
      description:
        'Eight trained encoder and document models that read bills of lading, air waybills, commercial invoices, packing lists and customs declarations, validate ISO 6346, IMO, HS and UN/LOCODE, and de-identify pricing & PII on-prem — no document ever leaves your network. Apache-2.0.',
    },
    eyebrow: 'Open-source Logistics NER',
    tagline: 'Your Data. Your Model. Your Hardware.',
    h1: { lead: 'Extract ', em: '30+ trade-document entities', tail: ' from bills of lading, invoices & customs forms — 100% on your hardware.' },
    sub: 'Eight trained encoder and document models that read B/Ls, air waybills, commercial invoices, packing lists and customs declarations, validate the codes that matter (ISO 6346, IMO, HS, UN/LOCODE), and de-identify pricing & PII on-prem with a signed audit trail — no document ever leaves your network. ONNX/edge exports included. Apache-2.0, hosted on Hugging Face.',
    stats: [
      { value: '8', label: 'models trained', sub: '' },
      { value: '9', label: 'languages', sub: '' },
      { value: '~150 ms/doc', label: 'on-device', sub: '' },
      { value: '$0 · 0 bytes', label: 'cost · egress', sub: '' },
    ],
    quickstart: {
      no: '01', label: 'Quickstart',
      title: 'Four lines to structured trade data',
      points: [
        'Profiles, not pipelines. customs, ocean, air, redact — each bundles the right models and code lists.',
        'Validated, not just extracted. Container check digits, HS chapter structure and UN/LOCODEs are verified before anything is returned.',
        'Structured output. Entities, spans, confidences — plus EDIFACT/X12 export for downstream systems.',
      ],
      pip: 'pip install git+https://github.com/flowx-ai/openner',
      code: {
        file: 'quickstart.py',
        body: `from openner import analyze

result = analyze(document, profile="customs")
print(result.entities)      # CONTAINER_NO, HS_CODE, PORT, INCOTERM …
edi = result.to_edifact()   # structured output, validated on-device`,
      },
    },
    runtime: {
      no: '02', label: 'Runtime',
      title: 'Runs everywhere your documents live',
      sub: 'The largest model is under 400 MB. No GPU, no cloud account, no callbacks.',
      cards: [
        { title: "Broker's laptop", body: "Full extraction pipeline on a standard CPU — batch a day's B/Ls over lunch." },
        { title: 'Port & warehouse edge', body: 'Gate-in OCR and container validation on an edge gateway, air-gapped if you like.' },
        { title: 'Inside your TMS / ERP', body: 'Embed as a Python or Java library — extraction becomes just another function call.' },
        { title: 'Browser (ONNX / WASM)', body: 'Quantized ONNX builds run client-side — nothing uploads, even in a web app.' },
        { title: 'REST / gRPC service', body: 'One container image serves your whole team behind your own firewall.' },
      ],
    },
    privacy: {
      no: '03', label: 'Privacy & de-identification',
      title: 'Data sovereignty for trade data',
      sub: 'Rates, supplier lists and routings are your competitive edge. Customs data is regulated. OpenFreight is built so neither has to leave the building — even when you want an LLM downstream.',
      items: [
        { strong: 'TradeRedact before any LLM', span: 'Strips negotiated prices, supplier identities, banking details and personal data before a document ever reaches a cloud or LLM call.' },
        { strong: 'Check-digit validation', span: 'ISO 6346 container numbers, IMO vessel numbers and GTIN/SSCC identifiers are verified mathematically, not just pattern-matched.' },
        { strong: 'Code-list gazetteers', span: 'Ships with the HS nomenclature, UN/LOCODE directory and SCAC registry baked in — entities resolve to canonical codes, offline.' },
        { strong: 'Layout-aware extraction', span: 'Understands the geometry of scanned and faxed documents — a value in the "Consignee" box is a consignee, wherever the box sits.' },
        { strong: 'Export-control & DG flags', span: 'UN numbers, IMDG/IATA classes and dual-use keywords raise flags early — before a shipment becomes a compliance incident.' },
        { strong: 'Zero data movement', span: 'No telemetry, no phone-home, no usage analytics. The only network call OpenFreight ever makes is the one-time model download.' },
      ],
    },
    models: {
      no: '04', label: 'Model library',
      title: 'Small models for trade documents',
      sub: 'Each model does one job well, stays small enough for a CPU, and is published on Hugging Face under Apache-2.0. Compose them through profiles or call them individually.',
      cards: [
        { name: 'ContainerDetect', desc: 'Extracts and ISO-6346-validates container numbers, seals and size/type codes.', pills: ['CONTAINER_NO', 'SEAL', 'SIZE_TYPE'] },
        { name: 'HSCodeClassify', desc: 'Classifies a goods description into its HS chapter (~20 chapters) for chapter-level customs routing — trained on a synthetic factory; retrain on real CBP CROSS rulings before it drives binding tariff determinations.', pills: ['HS_CHAPTER', 'COMMODITY'] },
        { name: 'IncotermExtract', desc: 'Detects Incoterms 2020 rules and the named place that goes with them.', pills: ['INCOTERM', 'PLACE'] },
        { name: 'BoLParse', desc: 'Full bill-of-lading field extraction, from shipper block to cargo description.', pills: ['SHIPPER', 'CONSIGNEE', 'PORT', 'CARGO'] },
        { name: 'PortRoute', desc: 'Resolves UN/LOCODEs, vessel and IMO numbers, voyage references, ETA/ETD.', pills: ['UNLOCODE', 'IMO', 'ETA'] },
        { name: 'HazmatGuard', desc: 'Flags UN numbers, IMDG/IATA hazard classes and packing groups.', pills: ['UN_NO', 'IMDG_CLASS', 'PACKING_GRP'] },
        { name: 'PartyLink', desc: 'Disambiguates shipper, consignee, notify party and carrier — with SCAC lookup.', pills: ['SHIPPER', 'CONSIGNEE', 'SCAC'] },
        { name: 'TradeRedact', desc: 'PII and commercial de-identification: names, contacts, banking, unit prices.', pills: ['NAME', 'PRICE', 'BANK', 'CONTACT'] },
      ],
    },
    products: {
      no: '05', label: 'Built with OpenFreight',
      title: 'From toolkit to product',
      sub: 'The models are the foundation. These are the applications teams build on top — all of them running on-prem, all of them open.',
      cards: [
        { tag: 'Compliance', title: 'Customs-Clearance Copilot', body: 'Reads the B/L, commercial invoice and packing list together, drafts the customs declaration, proposes HS codes with a written rationale, and flags export-control and dangerous-goods risk — entirely on-prem.' },
        { tag: 'Automation', title: 'Doc-to-EDI Digitizer', body: 'Turns scanned and emailed shipping documents into structured EDIFACT and X12 messages, with every code validated against the official lists before it hits your message queue.' },
        { tag: 'Search', title: 'Shipment Data Vault', body: 'Locally indexes your whole document archive and answers questions like "where is PO 44821, what\'s the ETA, any hazmat on board?" — de-identifying with TradeRedact before any LLM call.' },
      ],
    },
    compliance: {
      no: '06', label: 'Standards',
      title: 'Speaks the language of trade',
      sub: 'Extraction is only useful if it lands in the frameworks your compliance team already works in.',
      chips: [
        { b: 'WCO / AEO', span: 'trusted-trader programmes' },
        { b: 'C-TPAT', span: 'supply-chain security' },
        { b: 'IMDG / IATA DGR', span: 'dangerous goods' },
        { b: 'GDPR', span: 'personal data in documents' },
        { b: 'ITAR / EAR', span: 'export-controlled goods' },
        { b: 'GS1', span: 'GTIN / SSCC identifiers' },
        { b: 'UN/EDIFACT', span: 'customs message syntax' },
        { b: 'UN/LOCODE', span: 'ports & locations' },
        { b: 'HS Convention', span: 'tariff classification' },
      ],
    },
    benchmarks: {
      no: '07', label: 'Benchmarks',
      title: 'Measured against frontier LLMs',
      sub: 'We benchmarked our small on-device models head-to-head against the latest cost-effective frontier LLMs — same documents, same entity types. N=30 per task, against Claude Haiku 4.5, GPT-5.4-mini, GPT-5.4-nano, Gemini 3.5-flash and Gemini 3.1-flash-lite (OpenAI models via the Responses API).',
      table: {
        head: ['Extraction — invoices · PII · trade fields', 'F1', 'Latency / doc', 'Cost / 1k docs', 'Egress'],
        rows: [
          [
            { main: 'OpenFreight', sub: '(8 models, on-device)' },
            { score: '1.000', win: true },
            { score: '~150 ms', win: true },
            { score: '$0', win: true },
            { score: '0 bytes', win: true },
          ],
          [
            { main: 'Frontier tier', sub: '(Haiku 4.5 · GPT-5.4-mini/nano · Gemini 3.5-flash / 3.1-flash-lite)' },
            { score: '≤ 1.000' },
            { score: '850–3,700 ms' },
            { score: '$0.03–0.84' },
            { score: 'full document' },
          ],
        ],
      },
      callouts: [
        { value: '6–24× faster', label: '~150 ms per document on a CPU, versus 850–3,700 ms round-trips to frontier APIs.' },
        { value: '$0 vs $0.03–0.84', label: 'Per 1,000 documents. Once the weights are downloaded, marginal inference cost is zero.' },
        { value: '0 bytes', label: 'Leave your network. No API calls, no telemetry — rates, parties and PII stay in the building.' },
      ],
      note: "Honest footnote: frontier LLMs win at open-ended reasoning — not structured, convention-bound extraction. That's where small on-device encoders win.",
    },
    faq: {
      no: '08', label: 'FAQ',
      title: 'Questions, answered plainly',
      items: [
        { q: 'What is OpenFreight?', a: 'An open-source toolkit of small, task-specific NER and document-understanding models for logistics and trade paperwork — bills of lading, air waybills, commercial invoices, packing lists and customs declarations. It extracts and validates the entities those documents carry, and de-identifies the sensitive ones, entirely on your own hardware.' },
        { q: 'Why small encoder and document models instead of a big LLM?', a: "Encoder models (BERT-family) are excellent at token classification, run in milliseconds on a CPU, produce deterministic spans with confidences, and don't hallucinate container numbers. For a well-defined extraction task on regulated documents, a 100–400 MB model you can audit beats a remote multi-billion-parameter one you can't. LLMs still have a place — downstream, after TradeRedact." },
        { q: 'Does my trade data ever leave my network?', a: 'No. Inference is fully local, there is no telemetry, and the library makes no network calls at runtime. The only download is the model weights themselves, once, from Hugging Face — and you can mirror those internally for air-gapped sites.' },
        { q: 'How does it handle scanned and faxed documents?', a: "Two paths: layout-aware models in the LayoutLMv3 family that combine OCR text with page geometry, and OCR-free Donut-style models that read the page image directly. Profiles pick the right path automatically based on whether the input is digital text or an image/PDF scan. Our DocFormNER model (LayoutLMv3: text + 2D layout + page image, published on Hugging Face) now reads scanned and photographed bills of lading and arrival notices on-prem — it's a preview trained on synthetic rendered forms, so validate it on your own OCR'd scans before production." },
        { q: 'Can I fine-tune on my own documents?', a: "Yes — that's the intended workflow for house formats. Every model ships with its training configuration, and the openfreight.finetune module wraps Hugging Face Transformers so a few hundred annotated examples of your own B/L layout are usually enough to specialize a model. Your fine-tuned weights stay yours." },
        { q: 'Is it really open source? And what is it trained on?', a: 'Apache-2.0 across code, weights and training recipes — commercial use included. On data, an honest note: there is no large public logistics-NER corpus. Training combines public document-KIE datasets (DocILE, SROIE, CORD, FUNSD), official trade code lists (CBP CROSS rulings, the HS nomenclature, UN/LOCODE, the BIC container register) and large-scale synthetic document generation. Dataset cards document the mix per model.' },
      ],
    },
    colophon: 'openfreight.life — an open-source concept. Code, weights and recipes under Apache-2.0. Modeled on the OpenMed approach (openmed.life).',
  },
  {
    slug: 'openvita',
    name: 'OpenVita',
    industry: 'Pharmacy & healthcare',
    seo: {
      title: 'OpenVita — On-device NER & de-identification for pharmacy & healthcare',
      description:
        'A family of FlowX on-device NER and SLM models for pharmacy and healthcare operations that classify inbound messages, extract expiry dates, lot numbers, GTINs and return terms, and de-identify patient PII — without a single record leaving your network. Apache-2.0.',
    },
    eyebrow: 'On-device pharmacy & healthcare NER',
    tagline: 'Your Data. Your Model. Your Hardware.',
    h1: { lead: 'Route the inbox, extract every expiry & lot, and strip ', em: 'patient PII', tail: ' — 100% on your hardware.' },
    sub: 'OpenVita is a family of FlowX on-device NER and SLM models built for pharmacy and healthcare operations. They classify inbound messages, extract expiry dates, lot numbers, GTINs and return terms from supplier and recall paperwork, and de-identify patient PII and health data — without a single record leaving your network. Patient health data cannot go to a cloud LLM. Apache-2.0, hosted on Hugging Face.',
    stats: [
      { value: '2 + 3', label: 'healthcare models', sub: 'shared family models' },
      { value: 'HIPAA +', label: 'GDPR', sub: 'Art. 9 health-data de-identification' },
      { value: '~126 ms', label: 'per document', sub: 'on-device' },
      { value: '$0 · 0', label: 'API cost', sub: 'bytes leave your network' },
    ],
    quickstart: {
      no: '01', label: 'Quickstart',
      title: 'Four lines from raw message to safe, structured data.',
      points: [
        'One import, one call. Pick a compliance profile and OpenVita classifies, extracts and redacts in a single pass — entirely in your process.',
        'models pull once from Hugging Face, then run fully offline.',
      ],
      pip: 'pip install git+https://github.com/flowx-ai/openner',
      code: {
        file: 'quickstart.py',
        body: `from openner import analyze

result = analyze(message, profile="hipaa-safe-harbor")
print(result.queue)         # REFILL_REQUEST · CLINICAL_URGENT · STOCK_ORDER …
print(result.entities)      # EXPIRY_DATE, LOT_NO, GTIN, RETURN_WINDOW …
safe = result.deidentify()  # strips patient PII + HIPAA identifiers on-device`,
      },
    },
    runtime: {
      no: '02', label: 'Runtime',
      title: 'Runs everywhere your patient data already lives.',
      sub: 'Small encoders mean no GPU cluster, no vendor API, no data-processing addendum. Deploy at the point of intake — because patient health data cannot go to a cloud LLM.',
      cards: [
        { title: 'On-prem CPU / GPU', body: 'Full throughput on commodity servers — encoder models run in milliseconds on CPU, faster still with a single GPU.' },
        { title: 'Air-gapped', body: 'Ship the weights on physical media and run with zero outbound connectivity — built for regulated hospital and pharmacy networks.' },
        { title: 'Inside your pharmacy / dispensing system', body: 'Embed as a library in your PMR, dispensing or ops-inbox pipeline, right where refill requests and supplier notes arrive.' },
        { title: 'Browser (ONNX / WASM)', body: 'Quantized ONNX builds run in-browser via WASM — redact a message before it ever reaches your server.' },
        { title: 'REST / gRPC', body: 'A one-command self-hosted service exposes every model behind REST and gRPC for your internal platform teams.' },
      ],
    },
    privacy: {
      no: '03', label: 'Privacy & de-identification',
      title: 'Patient health data never leaves your premises.',
      sub: 'Healthcare handles special-category health data under GDPR Article 9 and PHI under HIPAA in the same message file. OpenVita treats both as first-class — and keeps them off any cloud LLM.',
      items: [
        { strong: 'Sensitivity guard on the inbox', span: 'PrivacyFilter classifies every inbound message as NONE, PERSONAL, FINANCIAL or HEALTH — sitting above IntentRouter so health-sensitive messages are handled locally.' },
        { strong: 'Multilingual patient-PII detection', span: 'PiiGuard detects patient PII across 9 languages, with national-ID checksums — names, addresses, dates of birth and identifiers buried in free-text patient messages.' },
        { strong: 'Six configurable policy profiles', span: 'The de-identification engine ships six policy profiles including hipaa-safe-harbor — or compose your own per workflow and jurisdiction.' },
        { strong: 'GS1 / GTIN integrity', span: 'ExpiryNER extracts GTINs and validates their check digit mathematically — supporting FMD and DSCSA supply-chain security, not just pattern-matching identifiers.' },
        { strong: 'Signed audit reports', span: 'Every de-identification run emits a signed, replayable report — evidence for HIPAA and GDPR accountability, and for FMD / DSCSA returns and recall handling.' },
        { strong: 'Zero data movement', span: 'No cloud calls, no telemetry, no usage phone-home. The only network traffic is the one-time model download — and even that is optional.' },
      ],
    },
    models: {
      no: '04', label: 'Model library',
      title: 'Small models for pharmacy & healthcare, one job each.',
      sub: "Two models are purpose-built for healthcare operations, backed by three cross-industry models already in the family — all trained, all published under Apache-2.0 at huggingface.co/flowxai. Download once, fine-tune freely, compose as needed. For scanned or photographed forms, the DocFormNER model is an early preview (see the FAQ).",
      cards: [
        { name: 'IntentRouter', desc: 'Text classifier that routes an inbound pharmacy/ops inbox message to one of 8 work queues. Sits above the PrivacyFilter sensitivity guard on the same inbox.', pills: ['REFILL_REQUEST', 'NEW_PRESCRIPTION', 'STOCK_ORDER', 'RETURNS_REBATE', 'DELIVERY_ISSUE', 'BILLING_QUERY', 'CLINICAL_URGENT', 'GENERAL_ADMIN'] },
        { name: 'ExpiryNER', desc: 'Token NER for supplier notes, recall notices and returns paperwork. Extracts product, expiry, lot, check-digit-valid GTIN, quantity and return/rebate terms. De-id profile hipaa-safe-harbor.', pills: ['PRODUCT', 'EXPIRY_DATE', 'LOT_NO', 'GTIN', 'QUANTITY', 'RETURN_WINDOW', 'REBATE_TERM'] },
        { name: 'PiiGuard', desc: 'Multilingual patient-PII detection across 9 languages, with national-ID checksums. A shared family model, available to healthcare workflows.', pills: ['NAME', 'DOB', 'ADDRESS', 'NATIONAL_ID'] },
        { name: 'PrivacyFilter', desc: 'Sensitivity guard that classifies each message NONE / PERSONAL / FINANCIAL / HEALTH. A shared family model, sitting above IntentRouter on the inbox.', pills: ['NONE', 'PERSONAL', 'FINANCIAL', 'HEALTH'] },
        { name: 'DocFormNER', desc: "Document-AI model (LayoutLMv3: text + 2D layout + page image) that reads scanned and photographed forms — returns forms, recall notices, faxed scripts. Early preview trained on synthetic rendered forms; validate on real OCR'd scans before production.", pills: ['FIELD', 'VALUE', 'LAYOUT', 'preview'] },
      ],
    },
    products: {
      no: '05', label: 'Built with OpenVita',
      title: 'From toolkit to product in one sprint.',
      sub: 'Teams compose the models into working products. Three we ship as reference implementations:',
      cards: [
        { tag: 'Operations', title: 'Pharmacy Ops Inbox Copilot', body: 'Reads the inbox, classifies sensitivity with PrivacyFilter, routes to the right queue with IntentRouter, redacts patient PII with PiiGuard, and drafts a reply or ticket — all on-prem, so health-sensitive messages never touch a cloud LLM.' },
        { tag: 'Returns & rebates', title: 'Expiry & Returns Automation', body: 'Pulls expiry dates, lot and GTIN, quantities and return/rebate windows from supplier and recall paperwork with ExpiryNER — plus DocFormNER for scans — and builds the return/credit claim automatically.' },
        { tag: 'Safety', title: 'Recall Triage', body: 'Matches recall notices on GTIN and lot against on-hand stock and quarantines the affected batches — turning an FMD / DSCSA recall notice into an actioned, audited quarantine list.' },
      ],
    },
    compliance: {
      no: '06', label: 'Compliance',
      title: 'Designed for the rules healthcare actually answers to.',
      sub: "On-device processing doesn't exempt you from regulation — it just makes compliance tractable. OpenVita maps to the frameworks your legal and quality teams will ask about.",
      chips: [
        { b: 'HIPAA', span: 'Safe Harbor de-identification of patient PHI' },
        { b: 'GDPR Article 9', span: 'special-category health data, processed locally' },
        { b: 'FMD', span: 'Falsified Medicines Directive — lot & pack verification' },
        { b: 'DSCSA', span: 'Drug Supply Chain Security Act — traceability' },
        { b: 'GS1 / GTIN', span: 'check-digit-valid product identifiers' },
        { b: 'EU AI Act', span: 'transparency for AI in a healthcare setting' },
        { b: 'Signed audit reports', span: 'replayable evidence for every de-id run' },
        { b: 'Zero data egress', span: 'patient data cannot go to a cloud LLM' },
        { b: 'Six policy profiles', span: 'hipaa-safe-harbor and five more' },
      ],
    },
    benchmarks: {
      no: '07', label: 'Benchmarks',
      title: 'Measured against frontier LLMs.',
      sub: 'We benchmarked ExpiryNER head-to-head against the latest cost-effective frontier LLMs — same documents, same entity types, strict entity-F1.',
      table: {
        head: ['ExpiryNER — supplier · recall · returns paperwork', 'F1', 'Latency / doc', 'Cost / 1k docs', 'Egress'],
        rows: [
          [
            { main: 'OpenVita ExpiryNER', sub: '(on-device)' },
            { score: '1.000', win: true },
            { score: '~126 ms', win: true },
            { score: '$0', win: true },
            { score: '0 bytes', win: true },
          ],
          [
            { main: 'Frontier tier', sub: '(Haiku 4.5 · GPT-5.4-mini/nano · Gemini 3.5-flash / 3.1-flash-lite)' },
            { score: '0.973–0.742' },
            { score: '891–2,663 ms' },
            { score: '$0.04–0.85' },
            { score: 'full document' },
          ],
        ],
      },
      callouts: [
        { value: '~7–21×', label: 'faster than frontier APIs' },
        { value: '$0 vs $0.04–0.85', label: 'per 1k documents' },
        { value: '0', label: 'bytes leave your network' },
      ],
      note: "Scope note: this is a NER benchmark, so it covers ExpiryNER only. IntentRouter is a text classifier and DocFormNER is multimodal — both sit outside this task, and we don't quote fabricated numbers for them. ExpiryNER's F1 1.000 is in-distribution on synthetic paperwork; real supplier and recall scans still warrant your own evaluation.",
    },
    faq: {
      no: '08', label: 'FAQ',
      title: 'Questions pharmacy and healthcare teams ask first.',
      items: [
        { q: 'What is OpenVita?', a: 'An open-source, privacy-first family of FlowX on-device NER and SLM models for pharmacy and healthcare operations. Two models are purpose-built — IntentRouter (routes inbox messages to 8 work queues) and ExpiryNER (extracts product, expiry, lot, GTIN, quantity and return/rebate terms) — backed by shared family models PiiGuard, PrivacyFilter and DocFormNER. They classify, extract and de-identify patient PII and health data with signed audit reports, all on your own hardware. Apache-2.0 licensed, hosted on Hugging Face.' },
        { q: 'Why on-device instead of a cloud LLM?', a: 'Patient health data cannot go to a cloud LLM. Classification and extraction are token-level problems, and small encoders are excellent at them: deterministic spans, millisecond CPU inference, no hallucinated fields, and models small enough to run inside a dispensing system or even a browser. Use an LLM downstream if you want — OpenVita keeps the sensitive first pass local, cheap and auditable.' },
        { q: 'How does the inbox routing work?', a: 'Two models cooperate on the same inbox. PrivacyFilter is the sensitivity guard, tagging each message NONE / PERSONAL / FINANCIAL / HEALTH; IntentRouter then routes it to one of 8 work queues — REFILL_REQUEST, NEW_PRESCRIPTION, STOCK_ORDER, RETURNS_REBATE, DELIVERY_ISSUE, BILLING_QUERY, CLINICAL_URGENT or GENERAL_ADMIN. PrivacyFilter sits above IntentRouter so health-sensitive messages are handled locally with PII redaction before anything downstream.' },
        { q: 'Does any record ever leave my network?', a: 'No. Inference runs entirely in your process on your hardware. There are no cloud APIs, no telemetry and no phone-home. The only network activity is the one-time model download from Hugging Face — and in air-gapped mode you skip even that by importing the weights on physical media. The de-identification engine applies six policy profiles, including hipaa-safe-harbor, and emits a signed audit report for every run.' },
        { q: 'How honest are the benchmark numbers?', a: "The benchmark measures ExpiryNER only, on strict entity-F1 over N=30 documents against the latest cost-effective frontier LLMs. ExpiryNER scores F1 1.000 at ~126 ms/doc and $0 with zero egress; the frontier tier ranges from 0.973 (Haiku 4.5) and 0.969 (Gemini 3.1-flash-lite) down to 0.742 (GPT-5.4-nano), at 891–2,663 ms and $0.04–0.85 per 1k with full-document egress. That F1 1.000 is in-distribution on synthetic paperwork — evaluate on your own real scans before production. IntentRouter is a classifier and DocFormNER is multimodal, so both are outside this NER benchmark and we quote no numbers for them." },
        { q: 'Can it read scanned or photographed documents?', a: "As an early preview, the FlowX DocFormNER model (a LayoutLMv3 encoder that reads text, 2D layout and the page image together, published at huggingface.co/flowxai/docformner) reads scanned and photographed forms such as returns forms, recall notices and faxed scripts, entirely on-prem — though it is trained on synthetically rendered forms and still needs evaluation on your real OCR'd scans before production use." },
        { q: 'How are the models trained, and is it really open source?', a: "Everything — code, weights, training recipes — is Apache-2.0, published at huggingface.co/flowxai. An honest caveat: public pharmacy and returns-paperwork NER corpora are scarce, so training relies heavily on synthetic generation of supplier notes, recall notices and returns forms. ExpiryNER's F1 1.000 is measured in-distribution on that synthetic data — we publish the generation pipelines so you can inspect, extend and re-evaluate them on your own OCR'd scans." },
      ],
    },
    colophon: 'Apache-2.0 · A FlowX open-source model family — not affiliated with any pharmacy, health system or regulator. Modeled on the OpenMed approach (openmed.life).',
  },
];

export function getOpenModel(slug) {
  return OPEN_MODELS.find((m) => m.slug === slug);
}
