'use client';

import { useState } from 'react';
import { Globe } from 'lucide-react';
import { usePathname, useRouter } from '@/navigation';
import { useLocale, useTranslations } from 'next-intl';

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const currentLang = useLocale();
  const t = useTranslations('LanguageSwitcher');

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
  ];

  const handleLanguageChange = (langCode: string) => {
    if (langCode === currentLang) {
      setIsOpen(false);
      return;
    }

    router.replace(pathname, { locale: langCode });
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menú de idiomas */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-2 bg-white/95 backdrop-blur-md border border-gray-200/30 shadow-2xl rounded-2xl overflow-hidden animate-in slide-in-from-bottom-2 duration-200">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-200 hover:bg-primary-50 ${currentLang === lang.code
                ? 'text-primary-600 bg-primary-50/50'
                : 'text-gray-700'
                }`}
              aria-label={t('changeLanguageTo', { language: lang.name })}
            >
              <span className="text-2xl">{lang.flag}</span>
              <span>{lang.name}</span>
              {currentLang === lang.code && (
                <span className="ml-auto">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
        aria-label={t('changeLanguage')}
        aria-expanded={isOpen}
      >
        <Globe className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />

        {/* Indicador de idioma actual */}
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-xs border-2 border-primary-600">
          {currentLang === 'es' ? '🇪🇸' : '🇬🇧'}
        </div>
      </button>
    </div>
  );
}

