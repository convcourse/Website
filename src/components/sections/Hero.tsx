'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle, Clock } from 'lucide-react';
import { trackEvent } from '@/components/Analytics';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/navigation';

export function Hero() {
  const t = useTranslations('Hero');
  const router = useRouter();

  const badges = [
    { icon: CheckCircle, text: '≥80% similitud', color: 'text-accent-600' }, // Could be translated if needed, but maybe technical terms are fine or add to json
    { icon: Shield, text: '±10% margen justificado', color: 'text-primary-600' },
    { icon: Clock, text: 'Registro en blockchain', color: 'text-purple-600' },
  ];

  const handleCTAClick = () => {
    trackEvent('cta_hero_click', { cta_type: 'demo' });
    router.push('/demo');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-50 via-white to-accent-50 pt-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[url('/grid.svg')] opacity-[0.02]"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative" suppressHydrationWarning>
        <div className="text-center max-w-5xl mx-auto" suppressHydrationWarning>
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 tracking-tight"
          >
            <span className="block mb-2">{t('title')}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
              {t('highlight')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed font-light"
          >
            {t('description')}
          </motion.p>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {badges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-sm border border-gray-200/50 hover:border-primary-200 transition-colors"
                suppressHydrationWarning
              >
                <badge.icon className={`h-5 w-5 ${badge.color}`} />
                <span className="text-sm font-medium text-gray-700">{badge.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16"
            suppressHydrationWarning
          >
            <Button
              size="lg"
              variant="glow"
              onClick={() => handleCTAClick()}
              className="text-lg px-10 py-6 h-auto rounded-full"
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              {t('cta')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-6 h-auto rounded-full border-2 hover:bg-gray-50"
              onClick={() => router.push('/solucion')} // Assuming documentation/use cases link
            >
              {t('secondaryCta')}
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
            suppressHydrationWarning
          >
            <p className="text-sm text-gray-500 mb-4">
              Confiado por secretarías académicas y estudiantes
            </p>
            <div className="flex justify-center items-center space-x-8 text-gray-400" suppressHydrationWarning>
              <div className="text-center" suppressHydrationWarning>
                <div className="text-2xl font-bold text-primary-600" suppressHydrationWarning>[UNIVERSIDADES]</div>
                <div className="text-sm" suppressHydrationWarning>{t('stats.universities')}</div>
              </div>
              <div className="text-center" suppressHydrationWarning>
                <div className="text-2xl font-bold text-accent-600" suppressHydrationWarning>[CONVALIDACIONES]</div>
                <div className="text-sm" suppressHydrationWarning>{t('stats.validations')}</div>
              </div>
              <div className="text-center" suppressHydrationWarning>
                <div className="text-2xl font-bold text-purple-600" suppressHydrationWarning>99.9%</div>
                <div className="text-sm" suppressHydrationWarning>{t('stats.accuracy')}</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden" suppressHydrationWarning>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow" suppressHydrationWarning></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow" style={{ animationDelay: '2s' }} suppressHydrationWarning></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow" style={{ animationDelay: '4s' }} suppressHydrationWarning></div>
        </div>
      </div>
    </section>
  );
}