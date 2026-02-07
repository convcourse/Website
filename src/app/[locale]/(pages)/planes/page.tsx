import { Metadata } from 'next';
import { Plans } from '@/components/sections/Plans';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.planes' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: 'https://certified.com/planes',
      type: 'website',
    },
  };
}

export default function PlanesPage() {
  const t = useTranslations('Planes');

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('Hero.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('Hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Planes principales */}
      <Plans />

      {/* CTA final */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('CTA.title')}
          </h2>
          <p className="text-xl opacity-90 mb-8">
            {t('CTA.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link
              href="/contacto?tipo=trial"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              {t('CTA.trialButton')}
            </Link>
            <Link
              href="/contacto?tipo=demo"
              className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors font-semibold"
            >
              {t('CTA.demoButton')}
            </Link>
          </div>

          <div className="mt-8 text-sm opacity-75">
            {t('CTA.faqText')}{' '}
            <Link href="/contacto#faq" className="underline hover:no-underline ml-1">
              {t('CTA.faqLink')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}