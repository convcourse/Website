'use client';

import { motion } from 'framer-motion';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function CTASection() {
  const t = useTranslations('Hero'); // Reusing Hero CTA keys or generic ones

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-primary-900">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-950"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.05]"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 bg-primary-800/50 border border-primary-700/50 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-accent-400" />
            <span className="text-sm font-medium text-primary-100">Únete a la revolución académica</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            ¿Listo para automatizar tus convalidaciones?
          </h2>

          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Reduce la carga administrativa en un 90% y ofrece una experiencia instantánea a tus estudiantes con nuestra tecnología verificada.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contacto">
              <Button size="lg" variant="default" className="text-lg px-8 py-6 h-auto rounded-full bg-white text-primary-900 hover:bg-primary-50 hover:text-primary-900 shadow-glow border-0">
                {t('cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/solucion">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto rounded-full border-primary-700 text-primary-100 hover:bg-primary-800 hover:text-white hover:border-primary-600">
                Ver Cómo Funciona
              </Button>
            </Link>
          </div>

          <p className="mt-8 text-sm text-primary-300">
            Sin compromiso • Implementación en 2 semanas • Soporte dedicado
          </p>
        </motion.div>
      </div>
    </section>
  );
}