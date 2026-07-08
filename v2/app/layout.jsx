import './globals.css';
// Fonts, matching v1 exactly (the stylesheet references these family names).
import '@fontsource-variable/sora';
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Chrome from '@/components/Chrome';

// No-flash theme: set data-theme before first paint (verbatim from v1 <head>).
const THEME_SCRIPT =
  '(function(){try{var t=localStorage.getItem("flx-theme");if(t!=="light"&&t!=="dark")t="dark";document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="dark";}})();';

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='18' fill='%230A0B0D'/%3E%3Cpath d='M28 26 L60 62 M60 26 L28 62' stroke='%23F4F5F3' stroke-width='9'/%3E%3Crect x='28' y='70' width='44' height='9' fill='%23FCB813'/%3E%3C/svg%3E";

export const metadata = {
  title: 'FlowX — Be in the 5%',
  description:
    'FlowX.AI — deploy banking, insurance, and logistics AI agents in weeks, proven in production. 220+ enterprise-ready agents for regulated industries, or build your own.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <link rel="icon" href={FAVICON} />
      </head>
      <body>
        <canvas id="grain" className="grain" aria-hidden="true" />
        <Nav />
        {children}
        <Footer />
        <Chrome />
      </body>
    </html>
  );
}
