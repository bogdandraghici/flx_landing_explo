/* FlowX technical-paper series — summaries extracted from the source papers
   in orna_paper/*_paper.html. PDFs + covers in public/research/. FlowX Code
   excluded (it has /flowx-code). */
export const PAPERS = [
  {
    "slug": "vera",
    "code": "VERA",
    "kicker": "VERIFIABLE, EVIDENCE-GRADED RETURN ON AGENTS (VERA)",
    "headline": "Evidence-Graded ROI for Production Agents",
    "tagline": "Bringing counterfactual measurement, causal validation, and confidence-graded accounting to the business case for enterprise AI agents.",
    "thesis": "The agent-ROI crisis is not a value crisis. It is a measurement-credibility crisis, and credibility is an engineering property of the measurement system, not a rhetorical one.",
    "keywords": [
      "agent ROI",
      "counterfactual estimation",
      "causal validation",
      "confidence grading",
      "productivity measurement",
      "value outcome units",
      "AI governance",
      "FinOps for AI"
    ],
    "sections": [
      "1 Introduction",
      "2 Background and the Measurement Gap",
      "3 The VERA Framework",
      "4 Trustworthy by Construction",
      "5 Illustrative Application",
      "6 Discussion",
      "7 Limitations",
      "8 Conclusion"
    ],
    "abstract": "Enterprises are deploying AI agents faster than they can prove the agents pay for themselves. Industry research reports that 95% of generative-AI pilots produce no measurable profit-and-loss impact, and analysts project that more than 40% of agentic-AI projects will be cancelled by 2027, primarily for unclear business value. We argue that this is not a value crisis but a measurement-credibility crisis: prevailing ROI practice rests on flat productivity assumptions and self-reported time savings that finance functions correctly decline to capitalize. We present VERA (Verifiable, Evidence-Graded Return on Agents), a measurement framework that embeds the causal-inference gold standard (counterfactual estimation and randomized holdout validation) directly into the agent observability layer, and grades every reported dollar by the strength of its evidence. VERA computes return across three reconciled dimensions: a deterministic per-agent baseline, a per-execution counterfactual estimator calibrated against an organization s own labelled history, and a realized-outcome ledger validated by causal experiments. Each figure is then classified as Verified, Modeled, or Assumed (an evidentiary grade analogous to revenue-recognition tiers in financial accounting), with verified value credited conservatively at the lower bound of its confidence interval. We describe the architecture, the estimator and calibration mechanics, the confidence-grading and causal-validation protocols, and the governance surface that turns graded ROI into portfolio decisions. We illustrate the framework on a regulated-insurance deployment and discuss how evidence-graded accounting changes the conversation between AI teams and the CFO.",
    "pdf": "/research/vera.pdf",
    "cover": "/research/vera-cover.png"
  },
  {
    "slug": "orna-autotune",
    "code": "ORNA",
    "kicker": "OBSERVABILITY-DRIVEN RECURSIVE NODE ADAPTATION (ORNA)",
    "headline": "Agent Self-Adaptation in Production",
    "tagline": "Closing the loop between observability, validation, and node-level refinement for LLM agents in regulated industries.",
    "thesis": "An agent that is 95% accurate but unauditable is operationally unusable. An agent that is 87% accurate but fully auditable, with a validated path to 90%, is deployable.",
    "keywords": [
      "agent self-improvement",
      "LLM orchestration",
      "production AI systems",
      "observability",
      "compliance",
      "BFSI",
      "governed AI",
      "multi-tier validation"
    ],
    "sections": [
      "1 Introduction",
      "2 Background and Related Work",
      "3 Framework: Observability-Driven Recursive Node Adaptation",
      "4 Case Study: Cross-Border Loan Classification",
      "5 Generalization to Other BFSI Use Cases",
      "6 Safety, Governance, and Limitations",
      "7 Discussion",
      "8 Conclusion"
    ],
    "abstract": "Large language model (LLM) based agents deployed in regulated industries face a persistent tension: they operate in dynamic environments with evolving compliance constraints, yet manual agent tuning is slow, expensive, and fragile. Existing self-improvement frameworks assume benign operating conditions and largely ignore the governance requirements of production-grade systems. We present a framework for autonomous agent self-adaptation that closes the loop between structured observability, multi-tier validation, and node-level workflow refinement, without retraining or model weight updates. Our approach monitors production trace patterns through an observability layer (Observatory), identifies failure signatures at the node level, and applies targeted adaptations (prompt updates, recognizer extensions, threshold adjustments) subject to a three-tier validation protocol before safe rollout. We evaluate the framework on a cross-border loan classification use case with real regulatory compliance constraints, demonstrating measurable accuracy improvement (87% to 90%+ confidence) while reducing compliance violations from 15 to 0 in a single adaptation cycle. We discuss how the framework generalizes to KYC screening, fraud detection, and insurance claims processing, and we address the governance mechanisms (audit trails, rollback, human escalation thresholds) required for production deployment in regulated environments.",
    "pdf": "/research/orna-autotune.pdf",
    "cover": "/research/orna-autotune-cover.png"
  },
  {
    "slug": "halo",
    "code": "HALO",
    "kicker": "HALLUCINATION-AWARE LAYERED OVERSIGHT (HALO)",
    "headline": "Zero Hallucination, by Construction",
    "tagline": "Why trustworthy enterprise AI is a property of the harness around the model, not of the model itself: grounding, multi-signal verification, calibrated abstention, and continuous oversight in the FlowX.AI Platform.",
    "thesis": "Zero hallucination is not a property a model possesses. It is a property a system enforces. The model is allowed to be fallible; the harness is not allowed to let that fallibility through unseen.",
    "keywords": [
      "hallucination containment",
      "grounding",
      "retrieval-augmented generation",
      "evidence-based confidence",
      "calibrated abstention",
      "LLM-as-judge",
      "drift detection",
      "AI assurance"
    ],
    "sections": [
      "1 Introduction",
      "2 Why a Single Detector Is Not Enough",
      "3 The HALO Architecture",
      "4 Evidence-Based Confidence",
      "5 Continuous Oversight and Self-Correction",
      "6 Illustrative Application",
      "7 Discussion",
      "8 Limitations",
      "9 Conclusion"
    ],
    "abstract": "Enterprises will not deploy AI agents they cannot trust, and the most-cited reason for distrust is hallucination: confident, fluent output that is simply not true. The common response is to wait for a model that does not hallucinate. We argue that this is the wrong target. Large language models are, by construction, capable of generating unsupported text, and no amount of scale removes the possibility; a faithfulness judge bolted onto a raw model catches some errors but still ships others, and even well-curated retrieval pipelines have been shown to fabricate citations. We reframe the goal: zero hallucination is not a property a model possesses but a property a system enforces. We present HALO (Hallucination-Aware Layered Oversight), the assurance architecture of the FlowX.AI Platform, which treats hallucination as a containable failure mode rather than an eliminable one. HALO composes six layers of defense: grounded generation over retrieved, approved content; constrained, deterministic execution that bounds where the model can err; multi-signal verification that scores every output for groundedness and hallucination using both an LLM judge and evidence-based checks against the source text; calibrated abstention, so the system declines rather than guesses when grounding is insufficient; total traceability of every retrieval, tool call, and generation; and continuous Observatory oversight that detects drift, alerts on threshold breaches, and closes the loop by regenerating and statistically validating improved agents. We detail each layer, give particular attention to evidence-based confidence (which verifies extractions against the source document rather than trusting the model s self-reported certainty), and illustrate the architecture on a regulated claims-extraction workload.",
    "pdf": "/research/halo.pdf",
    "cover": "/research/halo-cover.png"
  },
  {
    "slug": "gavel",
    "code": "GAVEL",
    "kicker": "GOVERNED AUTONOMY, VERIFIED BY AN EVIDENCE LAYER (GAVEL)",
    "headline": "Governance That Runs Where the Agent Runs",
    "tagline": "Why governing autonomous AI agents means enforcing policy and producing audit evidence at runtime, over the agent s own telemetry, rather than asserting compliance on paper.",
    "thesis": "A policy that lives in a document cannot govern an agent that chains a dozen tool calls in a second. Governance has to run where the agent runs, check what the agent actually did, and leave behind the evidence that it did.",
    "keywords": [
      "AI agent governance",
      "runtime policy enforcement",
      "compliance evidence",
      "EU AI Act",
      "audit trail",
      "bounded autonomy",
      "human oversight",
      "observability"
    ],
    "sections": [
      "1 Introduction",
      "2 The Governance Gap",
      "3 The GAVEL Architecture",
      "4 From Regulation to Runtime",
      "5 Illustrative Application",
      "6 Discussion",
      "7 Limitations",
      "8 Conclusion"
    ],
    "abstract": "Enterprises are granting AI agents more autonomy than they can currently govern. In a 2026 survey, 71% of organizations deploying agents had no formal governance framework even as a majority planned to widen agent autonomy, and 80% reported risky agent behaviors such as unauthorized data access. The dominant failure mode in production is not the model hallucinating but the agent exceeding its authority, chaining actions across systems faster than any human review cycle can follow. Regulation is closing in: the EU AI Act reaches full effect in August 2026 with binding requirements for human oversight and multi-year record-keeping, and standards bodies have opened tracks for agent identity, action logging, and containment. Yet the tooling on offer splits into two halves that do not meet: governance-risk-and-compliance suites that document policy in prose disconnected from what agents do, and runtime control planes that enforce limits but generate no compliance evidence. We argue that AI agent governance only works when it is enforced and evidenced at runtime, in the same place the agent runs and over the same telemetry the agent produces. We present GAVEL (Governed Autonomy, Verified by an Evidence Layer), the governance architecture of the FlowX.AI Platform s Observatory plane. GAVEL compiles organizational and regulatory requirements into machine-checkable policies, evaluates them against live execution telemetry rather than against a questionnaire, harvests compliance evidence automatically from traces, binds each regulatory requirement to the policies and evidence that satisfy it, and records every enforcement action and human review in an immutable audit trail. An EU AI Act audit is then answered not by assembling a binder but by walking evidence back through policy to requirement, every link grounded in what the agent actually did. We detail the architecture, the regulation-to-runtime evidence chain, and an illustrative human-oversight case, and we discuss how governance grounded in observability scales autonomy with risk rather than trading one against the other.",
    "pdf": "/research/gavel.pdf",
    "cover": "/research/gavel-cover.png"
  },
  {
    "slug": "sift",
    "code": "SIFT",
    "kicker": "SELF-IMPROVING, FROZEN-GATE TRAINING (SIFT)",
    "headline": "A Classifier That Teaches Itself",
    "tagline": "A cost-tiered document classifier whose corpus grows from production traffic and whose autonomous retraining is made safe by a frozen evaluation gate.",
    "thesis": "The bottleneck in production classification is not the model. It is the labeling project that must come before it and the fear of the retraining that must come after. Remove the first and tame the second.",
    "keywords": [
      "document classification",
      "continuous learning",
      "LLM-as-judge",
      "weak supervision",
      "model cascade",
      "active learning",
      "eval-gated promotion",
      "drift detection"
    ],
    "sections": [
      "1 Introduction",
      "2 Two Unsolved Problems",
      "3 The SIFT Architecture",
      "4 Safe Autonomous Retraining",
      "5 Illustrative Application",
      "6 Discussion",
      "7 Limitations",
      "8 Conclusion"
    ],
    "abstract": "Document classification is a solved problem in the laboratory and an unsolved one in the enterprise. The blocker is rarely model architecture; it is the labeling project that must precede a model and the institutional fear of letting a model retrain itself once one exists. We present SIFT (Self-Improving, Frozen-gate Training), the FlowX.AI Platform s dynamic classifier service, which attacks both. SIFT serves classification from a deliberately cheap, CPU-bound pipeline, a SPLADE sparse encoder feeding a LightGBM head, and escalates only the low-confidence minority of pages to an LLM judge. The judge s verdicts are written back into a labeled corpus, so the expensive model continuously teaches the cheap one: the escalation rate falls, the corpus grows from production traffic rather than from an up-front annotation effort, and accuracy compounds with use. Onboarding a new document family requires only a declarative bundle, label space, anchor phrases, and a judge glossary, not a labeling project. The harder problem is safety: an autonomously retraining classifier can silently regress. SIFT resolves this with a two-part promote gate, a critical-label F1 regression check plus a frozen golden regression set the model is never trained on, either of which vetoes promotion. This turns retrain monthly without a human from reckless into routine. We describe the architecture, the self-feeding corpus loop, the frozen-gate promotion mechanism, and an illustrative multi-domain deployment, and we discuss the economics of a classifier whose marginal labeling cost trends toward zero.",
    "pdf": "/research/sift.pdf",
    "cover": "/research/sift-cover.png"
  },
  {
    "slug": "rails",
    "code": "RAILS",
    "kicker": "RELIABLE AGENT EXECUTION VIA LAYERED STATE-MACHINES (RAILS)",
    "headline": "The Graph Is Deterministic, Even When the Nodes Are Not",
    "tagline": "How Agent Builder makes enterprise AI agents reliable by compiling visual workflows into deterministic state machines, in which the stochastic model is one bounded, typed node among many.",
    "thesis": "A workflow can be deterministic even when its nodes are not. You do not get reliable agents by making the model predictable; you get them by building a harness whose control flow, contracts, and side effects are predictable, and placing the model inside it as one bounded node.",
    "keywords": [
      "agent orchestration",
      "determinism",
      "state machines",
      "LangGraph",
      "workflow compilation",
      "node catalog",
      "containment middleware",
      "resumable execution"
    ],
    "sections": [
      "1 Introduction",
      "2 Why Orchestration, Not the Model, Decides Reliability",
      "3 The RAILS Architecture",
      "4 Placing the Stochastic Core: a Determinism Gradient",
      "5 The Node Catalog",
      "6 The Specialist Services Behind the Nodes",
      "7 Containment Middleware",
      "8 Composing Determinism with Agency",
      "9 Observability and Testing",
      "10 Illustrative Application",
      "11 Discussion",
      "12 Limitations",
      "13 Conclusion"
    ],
    "abstract": "The reliability problem with enterprise AI agents is usually misdiagnosed. The instinct is to blame the model: it is stochastic, so the agent is unpredictable. But the unpredictability that blocks production is rarely the model picking a slightly different word; it is the agent taking a different path, calling a tool it should not have, looping without end, or producing an output a downstream system cannot consume. That is a property of how the agent is orchestrated, not of the model s sampling. We describe RAILS (Reliable Agent Execution via Layered State-machines), the execution architecture of FlowX.AI s Agent Builder, and argue a thesis in the spirit of containment engineering: a workflow can be deterministic even when its nodes are not. Agent Builder defines an agent as an explicit graph of typed nodes and edges, compiles it by topological sort into a LangGraph state machine of parallel execution phases, and runs it phase by phase with checkpointed, resumable state. Control flow is deterministic by construction: a Condition node branches on a Python expression, an Orchestrator routes via structured output into a fixed set of branches, an Aggregator merges parallel results by declared rules. The stochastic model is confined to specific node types, wrapped by middleware that caps calls, retries, falls back, and times out, and bracketed by guardrail and privacy nodes. The result is that the parts of the system that must be predictable, the control flow, the I/O contracts, the side effects, are predictable, while generation is placed deliberately and observed. We present the compilation pipeline, a determinism gradient over the full catalog of thirty-eight node types across eight categories, the containment middleware, the multi-agent patterns, and an illustrative regulated claims workflow, and we show why determinism is an architectural property to be engineered, not a model property to be hoped for.",
    "pdf": "/research/rails.pdf",
    "cover": "/research/rails-cover.png"
  },
  {
    "slug": "mneme",
    "code": "MNEMĒ",
    "kicker": "MNEME · ACTIVE, GOVERNED MEMORY FOR AI AGENTS",
    "headline": "A Knowledge Graph Agents Can Write To, Safely",
    "tagline": "MNEME, the FlowX.AI Ontology Layer: a provenance-tracked structured-memory graph that agents read, validate against, and contribute to, without corrupting the institutional source of truth.",
    "thesis": "Everyone makes the ontology a read-only oracle the agent consults. The agent that just learned something the graph lacks is the agent best placed to extend it, and the one whose contribution we are most afraid to trust. Make the ontology active memory, and make the write safe.",
    "keywords": [
      "ontology",
      "knowledge graph",
      "active memory",
      "provenance",
      "GraphRAG",
      "entity resolution",
      "conflict detection",
      "structured memory"
    ],
    "sections": [
      "1 Introduction",
      "2 Read-Only Knowledge, and Its Limits",
      "3 The MNEME Architecture",
      "4 Active Memory: the Safe Write-Back Loop",
      "5 The Nine-Node Toolkit",
      "6 The Document-to-Ontology Bridge",
      "7 Illustrative Application",
      "8 Discussion",
      "9 Limitations",
      "10 Conclusion"
    ],
    "abstract": "The 2026 consensus in enterprise AI is that retrieval is not enough: agents need structured, relational, persistent knowledge, and the knowledge graph has become the beyond-RAG layer of choice, with graph retrieval reported at 86% multi-hop accuracy against 32% for vector search alone. Yet across the field one assumption is nearly universal: the ontology is read-only context the agent consults, and keeping it correct is a separate human discipline. We present MNEME, the FlowX.AI Ontology Layer, which makes the opposite choice: the ontology is active, governed memory the agent helps build. Agents read, validate against, and write back to the same project-scoped knowledge graph, and every contribution is safe by construction. Each Concept and Relation carries provenance (pdm_import, agent_write, or manual) and confidence as first-class fields; agent writes are staged below a confidence bar, screened by conflict detection of three kinds, and quarantined out of canonical retrieval until promoted by reinforcement across runs or by human review. The institutional source of truth, imported one-way from the platform data model, is authoritative and read-only to agents, so a hallucination can never become a regulatory taxonomy entry, while genuinely new structure is captured rather than lost. MNEME runs on two pluggable backends behind one contract, Postgres with pgvector for semantic-heavy ontologies and Neo4j for graph-heavy multi-hop, retrieves by a hybrid of vector similarity and graph expansion in a single call, and exposes a nine-node toolkit on the Agent Builder canvas. We describe the architecture, the safe write-back loop, the toolkit and its agent patterns, an illustrative regulated taxonomy, and how active memory differs from the read-only knowledge graphs the rest of the market ships.",
    "pdf": "/research/mneme.pdf",
    "cover": "/research/mneme-cover.png"
  }
];

/* Abstracts are stored as one verbatim string (used for SEO metadata + JSON-LD).
   For on-page reading we break each into paragraphs at its rhetorical seams
   (problem → approach → mechanics → proof) so it doesn't read as a wall of text.
   Splitting is derived from the source string, so the prose is never re-typed. */
const ABSTRACT_BREAKS = {
  vera: ["We present VERA", "VERA computes return", "We describe the architecture"],
  "orna-autotune": ["We present a framework", "Our approach monitors", "We evaluate the framework"],
  halo: ["We reframe the goal", "HALO composes six layers", "We detail each layer"],
  gavel: ["Regulation is closing in", "We argue that AI agent governance", "GAVEL compiles organizational", "We detail the architecture"],
  sift: ["We present SIFT", "The harder problem is safety", "We describe the architecture"],
  rails: ["We describe RAILS", "Agent Builder defines an agent", "We present the compilation pipeline"],
  mneme: ["We present MNEME", "Each Concept and Relation", "We describe the architecture"],
};

function splitAbstract(text, breakBefore = []) {
  const cuts = breakBefore
    .map((s) => text.indexOf(s))
    .filter((i) => i > 0)
    .sort((a, b) => a - b);
  const paras = [];
  let start = 0;
  for (const i of cuts) {
    paras.push(text.slice(start, i).trim());
    start = i;
  }
  paras.push(text.slice(start).trim());
  return paras;
}

for (const p of PAPERS) {
  p.abstractParas = p.abstract
    ? splitAbstract(p.abstract, ABSTRACT_BREAKS[p.slug])
    : [];
}
