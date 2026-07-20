import { notFound } from 'next/navigation';
import { absUrl, OG_IMAGE, SITE_NAME } from '@/components/lib/site';
import { HF_ORG } from '@/lib/modelsData';
import { OPEN_MODELS, getOpenModel } from '@/lib/openModelsData';
import JsonLd from '@/components/JsonLd';
import OpenModelPage from '@/components/OpenModelPage';

export function generateStaticParams() {
  return OPEN_MODELS.map((m) => ({ model: m.slug }));
}

export async function generateMetadata({ params }) {
  const { model } = await params;
  const m = getOpenModel(model);
  if (!m) return {};
  return {
    title: m.seo.title,
    description: m.seo.description,
    openGraph: {
      title: m.seo.title,
      description: m.seo.description,
      url: absUrl(`/models/${m.slug}`),
      images: [{ url: OG_IMAGE, width: 512, height: 512, alt: SITE_NAME }],
    },
  };
}

export default async function OpenModelRoute({ params }) {
  const { model } = await params;
  const m = getOpenModel(model);
  if (!m) notFound();
  const url = absUrl(`/models/${m.slug}`);

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'SoftwareApplication',
            name: m.name,
            applicationCategory: 'Machine learning model',
            description: m.seo.description,
            operatingSystem: 'Cross-platform',
            license: 'https://www.apache.org/licenses/LICENSE-2.0',
            downloadUrl: HF_ORG,
            author: { '@type': 'Organization', name: SITE_NAME, url: 'https://www.flowx.ai' },
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            url,
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: absUrl('/') },
              { '@type': 'ListItem', position: 2, name: 'Open models', item: absUrl('/models') },
              { '@type': 'ListItem', position: 3, name: m.name, item: url },
            ],
          },
        ],
      }} />
      <OpenModelPage model={m} />
    </>
  );
}
