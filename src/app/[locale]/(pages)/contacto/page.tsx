import { Metadata } from 'next';
import { Contact } from '@/components/sections/Contact';
import { ContactFAQ } from '@/components/sections/ContactFAQ';
import { useTranslations } from 'next-intl';

// Metadata needs to be handled separately for i18n
// export const metadata: Metadata = { ... };

export default function ContactoPage() {
  const t = useTranslations('Contacto.Hero');

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-surface-50">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-primary-50/50 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
            {t('title')} <span className="text-primary-600">{t('highlight')}</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            {t('description')}
          </p>
          <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-soft border border-gray-100">
            <span className="text-lg mr-3">⚡</span>
            <span className="text-sm text-gray-600">
              <strong className="text-gray-900">{t('badge')}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Formulario principal */}
      <Contact />

      {/* Preguntas Frecuentes */}
      <ContactFAQ />
    </main>
  );
}