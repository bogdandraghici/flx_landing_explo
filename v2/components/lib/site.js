// Absolute-URL helpers for metadata (Open Graph / Twitter / JSON-LD / sitemap).
// Origin is the deployed Pages host in a Pages build, localhost in dev; bp()
// adds the /flx_landing_explo/v2 base path so links resolve on the live subpath.
import { bp } from './base';

export const SITE_ORIGIN =
  process.env.GITHUB_PAGES === 'true' ? 'https://bogdandraghici.github.io' : 'http://localhost:3200';

// full absolute URL for a root-relative app path (e.g. "/blog/foo" → origin+base+path)
export const absUrl = (path = '/') => SITE_ORIGIN + bp(path);

export const SITE_NAME = 'FlowX.AI';
export const OG_IMAGE = absUrl('/og-default.png');
