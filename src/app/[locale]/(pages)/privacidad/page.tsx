
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.privacidad' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function PrivacyPage() {
  const t = useTranslations('Privacidad');
  const tAddress = useTranslations('address');

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
              {t('sections.info.title')}
            </h2>
            <p className="text-gray-600 mb-4">
              {t('sections.info.content')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>{t('sections.info.items.0')}</li>
              <li>{t('sections.info.items.1')}</li>
              <li>{t('sections.info.items.2')}</li>
              <li>{t('sections.info.items.3')}</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('sections.usage.title')}
            </h2>
            <p className="text-gray-600 mb-4">
              {t('sections.usage.content')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>{t('sections.usage.items.0')}</li>
              <li>{t('sections.usage.items.1')}</li>
              <li>{t('sections.usage.items.2')}</li>
              <li>{t('sections.usage.items.3')}</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('sections.protection.title')}
            </h2>
            <p className="text-gray-600 mb-4">
              {t('sections.protection.content')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>{t('sections.protection.items.0')}</li>
              <li>{t('sections.protection.items.1')}</li>
              <li>{t('sections.protection.items.2')}</li>
              <li>{t('sections.protection.items.3')}</li>
              <li>{t('sections.protection.items.4')}</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('sections.gdpr.title')}
            </h2>
            <p className="text-gray-600 mb-4">
              {t('sections.gdpr.content')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>{t('sections.gdpr.items.0')}</li>
              <li>{t('sections.gdpr.items.1')}</li>
              <li>{t('sections.gdpr.items.2')}</li>
              <li>{t('sections.gdpr.items.3')}</li>
              <li>{t('sections.gdpr.items.4')}</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('sections.retention.title')}
            </h2>
            <p className="text-gray-600 mb-4">
              {t('sections.retention.content')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>{t('sections.retention.items.0')}</li>
              <li>{t('sections.retention.items.1')}</li>
              <li>{t('sections.retention.items.2')}</li>
              <li>{t('sections.retention.items.3')}</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('sections.rights.title')}
            </h2>
            <p className="text-gray-600 mb-4">
              {t('sections.rights.content')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
              <li>{t('sections.rights.items.0')}</li>
              <li>{t('sections.rights.items.1')}</li>
              <li>{t('sections.rights.items.2')}</li>
              <li>{t('sections.rights.items.3')}</li>
              <li>{t('sections.rights.items.4')}</li>
              <li>{t('sections.rights.items.5')}</li>
            </ul>
            <p className="text-gray-600">
              {t('sections.rights.contact')} <a href="mailto:privacy@certified.com" className="text-primary-600 hover:underline">privacy@certified.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('sections.contact.title')}
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-gray-600 mb-2">
                <strong>{t('sections.contact.dpo')}</strong> dpo@certified.com
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Email:</strong> privacy@certified.com
              </p>
              <p className="text-gray-600">
                <strong>{t('sections.contact.company')}</strong><br />
                {tAddress('street')}<br />
                {tAddress('city')}
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}