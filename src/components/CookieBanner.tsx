'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/navigation';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const t = useTranslations('CookieBanner');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, [isClient]);

  const acceptCookies = () => {
    if (!isClient) return;

    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);

    // Enable Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
      });
    }
  };

  const rejectCookies = () => {
    if (!isClient) return;
    localStorage.setItem('cookie-consent', 'rejected');
    setShowBanner(false);

    // Disable Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      });
    }
  };

  // Solo renderizar en el cliente para evitar problemas de hidratación
  if (!isClient || !showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-700">
            {t('message')}{' '}
            <Link href="/privacidad" className="text-primary-600 hover:underline">
              {t('privacyLink')}
            </Link>.
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <Button variant="outline" size="sm" onClick={rejectCookies}>
            {t('reject')}
          </Button>
          <Button size="sm" onClick={acceptCookies}>
            {t('accept')}
          </Button>
          <button
            onClick={() => setShowBanner(false)}
            className="text-gray-400 hover:text-gray-600 ml-2"
            aria-label={t('close')}
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}