import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Analytics } from '@/components/Analytics';
import { CookieBanner } from '@/components/CookieBanner';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.home' });

  return {
    title: {
      default: t('title'),
      template: t('titleTemplate')
    },
    description: t('description'),
    keywords: [
      'convalidaciones',
      'universidad',
      'IA',
      'blockchain',
      'ECTS',
      'Erasmus',
      'créditos académicos',
      'automatización'
    ],
    authors: [{ name: 'Certified' }],
    creator: 'Certified',
    publisher: 'Certified',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'layout' });

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={`${inter.className} min-h-screen`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {/* Skip links for keyboard navigation */}
          <div className="sr-only focus-within:not-sr-only" suppressHydrationWarning>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600"
            >
              {t('skipToContent')}
            </a>
            <a
              href="#navigation"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-40 bg-primary-600 text-white px-4 py-2 rounded-md z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600"
            >
              {t('skipToNav')}
            </a>
          </div>

          <Header />

          <main id="main-content" role="main" tabIndex={-1}>
            {children}
          </main>

          <Footer />
          <CookieBanner />
          <LanguageSwitcher />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}