import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.terminos' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function TermsPage() {
  const t = useTranslations('Terminos');

  return (
    <main className="pt-16 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-gray-600">
            {t('lastUpdated', { date: '15/03/2024' })}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('sections.acceptance.title')}
            </h2>
            <p className="text-gray-600">
              {t('sections.acceptance.content')}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('sections.description.title')}
            </h2>
            <p className="text-gray-600 mb-4">
              {t('sections.description.content')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>{t('sections.description.items.0')}</li>
              <li>{t('sections.description.items.1')}</li>
              <li>{t('sections.description.items.2')}</li>
              <li>{t('sections.description.items.3')}</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('sections.acceptableUse.title')}
            </h2>
            <p className="text-gray-600 mb-4">
              {t('sections.acceptableUse.content')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>{t('sections.acceptableUse.items.0')}</li>
              <li>{t('sections.acceptableUse.items.1')}</li>
              <li>{t('sections.acceptableUse.items.2')}</li>
              <li>{t('sections.acceptableUse.items.3')}</li>
              <li>{t('sections.acceptableUse.items.4')}</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('sections.limitations.title')}
            </h2>
            <p className="text-gray-600 mb-4">
              {t('sections.limitations.content')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>{t('sections.limitations.items.0')}</li>
              <li>{t('sections.limitations.items.1')}</li>
              <li>{t('sections.limitations.items.2')}</li>
              <li>{t('sections.limitations.items.3')}</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('sections.responsibilities.title')}
            </h2>
            <p className="text-gray-600 mb-4">
              {t('sections.responsibilities.content')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>{t('sections.responsibilities.items.0')}</li>
              <li>{t('sections.responsibilities.items.1')}</li>
              <li>{t('sections.responsibilities.items.2')}</li>
              <li>{t('sections.responsibilities.items.3')}</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('sections.ip.title')}
            </h2>
            <p className="text-gray-600">
              {t('sections.ip.content')}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('sections.liability.title')}
            </h2>
            <p className="text-gray-600">
              {t('sections.liability.content')}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('sections.modifications.title')}
            </h2>
            <p className="text-gray-600">
              {t('sections.modifications.content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('sections.contact.title')}
            </h2>
            <p className="text-gray-600">
              {t('sections.contact.content')} <a href="mailto:legal@certified.com" className="text-primary-600 hover:underline">legal@certified.com</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}