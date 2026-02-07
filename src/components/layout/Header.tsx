'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/navigation';
import { usePathname } from '@/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, Shield } from 'lucide-react';
import { trackEvent } from '@/components/Analytics';
import { useTranslations } from 'next-intl';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('Header');

  // Navigation items
  const navigation = [
    { name: t('nav.solution'), href: '/solucion' },
    { name: t('nav.useCases'), href: '/casos-uso' },
    { name: t('nav.contact'), href: '/contacto' },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 w-full z-50 pointer-events-none">
      <div className="flex justify-center pt-4 px-4" suppressHydrationWarning>
        <nav className="pointer-events-auto bg-white/80 backdrop-blur-xl border border-white/20 shadow-soft rounded-full transition-all duration-300 w-full max-w-5xl" aria-label="Main navigation">
          <div className="flex justify-between items-center h-16 px-6" suppressHydrationWarning>
            {/* Logo (left) */}
            <div className="flex items-center" suppressHydrationWarning>
              <Link
                href="/"
                className="flex items-center space-x-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded-full px-2 py-1 transition-transform duration-200 hover:scale-105"
                aria-label="Certified - Go to homepage"
              >
                <div className="relative" suppressHydrationWarning>
                  <Shield className="h-8 w-8 text-primary-600" aria-hidden="true" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full border-2 border-white shadow-sm" suppressHydrationWarning></div>
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">
                  Certified
                </span>
              </Link>
            </div>

            {/* Desktop Navigation (center) */}
            <div className="hidden lg:flex items-center space-x-1" role="navigation" aria-label="Main navigation" suppressHydrationWarning>
              {navigation.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 ${isActive
                      ? 'text-primary-700 bg-primary-50 shadow-sm'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50/50'
                      }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {/* Login Button */}
              <Link href="/login">
                <Button
                  size="sm"
                  className="ml-4 rounded-full px-6 shadow-glow hover:shadow-lg transition-all duration-300"
                >
                  {t('login')}
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden" suppressHydrationWarning>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 ${isOpen
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                <span className="sr-only">{isOpen ? "Close" : "Open"} main menu</span>
                {isOpen ?
                  <X className="h-6 w-6" aria-hidden="true" /> :
                  <Menu className="h-6 w-6" aria-hidden="true" />
                }
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen
            ? 'max-h-96 opacity-100'
            : 'max-h-0 opacity-0'
            }`} suppressHydrationWarning>
            <div className="px-4 pt-2 pb-6 space-y-2 border-t border-gray-100/50" id="mobile-menu" role="navigation" aria-label="Mobile navigation" suppressHydrationWarning>
              {navigation.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 ${isActive
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                      }`}
                    onClick={() => setIsOpen(false)}
                    tabIndex={isOpen ? 0 : -1}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {/* Mobile Login Button */}
              <div className="pt-4 px-2">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button
                    className="w-full rounded-xl shadow-md"
                    tabIndex={isOpen ? 0 : -1}
                  >
                    {t('login')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}