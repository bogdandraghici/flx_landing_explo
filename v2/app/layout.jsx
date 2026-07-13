import './globals.css';
// Fonts, matching v1 exactly (the stylesheet references these family names).
import '@fontsource-variable/sora';
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Chrome from '@/components/Chrome';
import JsonLd from '@/components/JsonLd';
import CookieConsent from '@/components/CookieConsent';
import DemoModal from '@/components/DemoModal';
import { SITE_ORIGIN, SITE_NAME, OG_IMAGE, absUrl } from '@/components/lib/site';

// No-flash theme: set data-theme before first paint (verbatim from v1 <head>).
const THEME_SCRIPT =
  '(function(){try{var t=localStorage.getItem("flx-theme");if(t!=="light"&&t!=="dark")t="dark";document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="dark";}})();';

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='18' fill='%230A0B0D'/%3E%3Cpath d='M28 26 L60 62 M60 26 L28 62' stroke='%23F4F5F3' stroke-width='9'/%3E%3Crect x='28' y='70' width='44' height='9' fill='%23FCB813'/%3E%3C/svg%3E";

const DESCRIPTION =
  'FlowX.AI — deploy banking, insurance, and logistics AI agents in weeks, proven in production. 220+ enterprise-ready agents for regulated industries, or build your own.';

export const metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: 'FlowX — Be in the 5%',
    template: '%s · FlowX.AI',
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: 'FlowX.AI — enterprise AI agents for regulated industries',
    description: DESCRIPTION,
    url: absUrl('/'),
    images: [{ url: OG_IMAGE, width: 512, height: 512, alt: 'FlowX.AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlowX.AI — enterprise AI agents for regulated industries',
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({ children }) {
  // suppressHydrationWarning: the no-flash THEME_SCRIPT sets data-theme on
  // <html> before React hydrates, so the client attribute intentionally differs
  // from the server HTML. Scoped to this element's own attributes.
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <link rel="icon" href={FAVICON} />
      </head>
      <body>
        <JsonLd data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Organization',
              '@id': `${absUrl('/')}#org`,
              name: SITE_NAME,
              url: 'https://www.flowx.ai',
              logo: OG_IMAGE,
              description: DESCRIPTION,
              sameAs: [
                'https://huggingface.co/flowxai',
                'https://www.linkedin.com/company/flowxai',
                'https://x.com/FlowX_ai',
                'https://docs.flowx.ai',
              ],
            },
            {
              '@type': 'WebSite',
              '@id': `${absUrl('/')}#website`,
              url: absUrl('/'),
              name: SITE_NAME,
              publisher: { '@id': `${absUrl('/')}#org` },
            },
          ],
        }} />
        <canvas id="grain" className="grain" aria-hidden="true" />
        <Nav />
        {children}
        <Footer />
        <DemoModal />
        <CookieConsent />
        <Chrome />
      </body>
    </html>
  );
}
