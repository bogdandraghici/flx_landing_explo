/* Customers & partners — logos taken from the flowx.ai homepage "Customers and
   partners" strip (extracted from the rendered SVG sprite, normalized to
   currentColor, in public/customers/). Grouped by segment. Outcome metrics +
   attributions are the (anonymized) proof points published on flowx.ai.
   DRAFT — marketing review: per-customer descriptors and segment blurbs are
   plain public facts, but the wording is ours. */
export const SEGMENTS = [
  {
    id: 'banking',
    label: 'Banking',
    desc: 'Onboarding, lending and servicing journeys, modernized on the core systems these banks already run.',
    customers: [
      { name: 'BNP Paribas', logo: '/customers/bnp-paribas.svg', meta: 'Global banking group', region: 'FR' },
      /* unicredit's svg box has no internal padding, so it renders oversized
         at the shared 40px cap — pull its cap down to optically match */
      { name: 'UniCredit', logo: '/customers/unicredit.svg', meta: 'Pan-European banking group', region: 'IT', lh: 30 },
      { name: 'OTP Bank', logo: '/customers/otp-bank.svg', meta: 'CEE banking group', region: 'HU' },
      { name: 'Banca Transilvania', logo: '/customers/banca-transilvania.svg', meta: 'Largest bank in Romania', region: 'RO' },
      { name: 'State Street', logo: '/customers/state-street.svg', meta: 'Custody & asset servicing', region: 'US' },
    ],
  },
  {
    id: 'insurance',
    label: 'Insurance',
    desc: 'Claims, underwriting and policy journeys, built to hold up under real regulatory scrutiny.',
    customers: [
      { name: 'Legal & General', logo: '/customers/legal-and-general.svg', meta: 'Insurance & asset management', region: 'UK' },
      { name: 'Asirom · Vienna Insurance Group', logo: '/customers/asirom.svg', meta: 'Vienna Insurance Group member', region: 'RO' },
      { name: 'Signal Iduna', logo: '/customers/signal-iduna.svg', meta: 'Insurance & financial services', region: 'DE' },
      { name: 'Triglav', logo: '/customers/triglav.svg', meta: 'Adria-region insurance group', region: 'SI' },
    ],
  },
  {
    id: 'partners',
    label: 'Technology & delivery partners',
    desc: 'The technology and delivery partners who implement and scale FlowX programs.',
    customers: [
      { name: 'IBM', logo: '/customers/ibm.svg', meta: 'Technology partner', region: 'Global' },
      { name: 'Kyndryl', logo: '/customers/kyndryl.svg', meta: 'IT infrastructure services', region: 'Global' },
      { name: 'Stefanini Group', logo: '/customers/stefanini.svg', meta: 'Digital services & delivery', region: 'Global' },
    ],
  },
];

export const CUSTOMER_COUNT = SEGMENTS.reduce((n, s) => n + s.customers.length, 0);

/* Real, published outcome metrics (attributions anonymized on flowx.ai). */
export const OUTCOMES = [
  { metric: '80%', label: 'of manual handoffs automated', who: 'COO · Major Custodian Bank' },
  { metric: '65%', label: 'faster end-to-end process time', who: 'CTO · European Insurer' },
  { metric: '$1.8M', label: 'in annual operating savings', who: 'Deputy Director · CEE Bank Group' },
];
