import { Metadata } from 'next';
import { UseCases } from '@/components/sections/UseCases';
import { useTranslations } from 'next-intl';

// Metadata needs to be handled separately for i18n
// export const metadata: Metadata = { ... };

export default function CasosUsoPage() {
  const t = useTranslations('CasosUso.Hero');

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-surface-50">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-accent-50/50 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
            {t('title')} <span className="text-accent-600">{t('highlight')}</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            {t('description')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-soft border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl font-bold text-accent-600 mb-2">{t('stats.universities.value')}</div>
              <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">{t('stats.universities.label')}</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-soft border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl font-bold text-accent-600 mb-2">{t('stats.students.value')}</div>
              <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">{t('stats.students.label')}</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-soft border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl font-bold text-accent-600 mb-2">{t('stats.validations.value')}</div>
              <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">{t('stats.validations.label')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Casos de uso principales */}
      <UseCases />
    </main>
  );
}