/* Customers & partners — logos taken from the flowx.ai homepage "Customers and
   partners" strip (extracted from the rendered SVG sprite, normalized to
   currentColor, in public/customers/). Grouped by segment. Outcome metrics +
   attributions are the (anonymized) proof points published on flowx.ai. */
export const SEGMENTS = [
  {
    id: 'banking',
    label: 'Banking',
    customers: [
      { name: 'BNP Paribas', logo: '/customers/bnp-paribas.svg' },
      { name: 'UniCredit', logo: '/customers/unicredit.svg' },
      { name: 'OTP Bank', logo: '/customers/otp-bank.svg' },
      { name: 'Banca Transilvania', logo: '/customers/banca-transilvania.svg' },
      { name: 'State Street', logo: '/customers/state-street.svg' },
    ],
  },
  {
    id: 'insurance',
    label: 'Insurance',
    customers: [
      { name: 'Legal & General', logo: '/customers/legal-and-general.svg' },
      { name: 'Asirom · Vienna Insurance Group', logo: '/customers/asirom.svg' },
      { name: 'Signal Iduna', logo: '/customers/signal-iduna.svg' },
      { name: 'Triglav', logo: '/customers/triglav.svg' },
    ],
  },
  {
    id: 'partners',
    label: 'Technology & delivery partners',
    customers: [
      { name: 'IBM', logo: '/customers/ibm.svg' },
      { name: 'Kyndryl', logo: '/customers/kyndryl.svg' },
      { name: 'Stefanini Group', logo: '/customers/stefanini.svg' },
    ],
  },
];

export const CUSTOMER_COUNT = SEGMENTS.reduce((n, s) => n + s.customers.length, 0);

/* Real, published outcome metrics (attributions anonymized on flowx.ai). */
export const OUTCOMES = [
  { metric: '80%', label: 'of manual handoffs automated', who: 'COO, Major Custodian Bank' },
  { metric: '65%', label: 'faster end-to-end process time', who: 'CTO, European Insurer' },
  { metric: '$1.8M', label: 'annual operating savings', who: 'Deputy Director, CEE Bank Group' },
];
