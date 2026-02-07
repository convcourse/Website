'use client';

import { motion } from 'framer-motion';
import { Link } from '@/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Shield, Clock, ArrowRight, CheckCircle, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function FeaturesOverview() {
  const t = useTranslations('Features');

  const features = [
    {
      icon: Brain,
      title: t('ai.title'),
      description: t('ai.desc'),
      href: '/solucion',
      highlights: ['Embeddings semánticos', 'LLM re-ranker', 'Filtros inteligentes'], // Should be translated ideally
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Shield,
      title: t('security.title'),
      description: t('security.desc'),
      href: '/solucion#blockchain',
      highlights: ['Hash criptográfico', 'Metadatos en cadena', 'IPFS storage'],
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Clock,
      title: t('speed.title'),
      description: t('speed.desc'),
      href: '/casos-uso',
      highlights: ['< 5 min proceso', '90% reducción tiempo', '95% precisión'],
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const stats = [
    { number: '95%', label: 'Precisión en convalidaciones', sublabel: 'Validado en pilotos' },
    { number: '< 3 días', label: 'Tiempo de procesamiento', sublabel: 'vs 4-8 semanas manual' },
    { number: '80%+', label: 'Umbral de similitud', sublabel: 'Con margen ±10% explicado' },
    { number: '100%', label: 'Trazabilidad blockchain', sublabel: 'Auditable y verificable' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" suppressHydrationWarning>
        <div className="text-center mb-16" suppressHydrationWarning>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20" suppressHydrationWarning>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 group border-gray-100 bg-white/50 backdrop-blur-sm" suppressHydrationWarning>
                <CardHeader suppressHydrationWarning>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`} suppressHydrationWarning>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </CardTitle>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardHeader>
                <CardContent suppressHydrationWarning>
                  <ul className="space-y-3 mb-8">
                    {feature.highlights.map((highlight, hIndex) => (
                      <li key={hIndex} className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-sm text-gray-600 font-medium">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={feature.href} className="block mt-auto">
                    <Button variant="outline" className="w-full group-hover:bg-primary-50 group-hover:border-primary-200 group-hover:text-primary-700 transition-all">
                      Saber Más
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Resultados Verificables
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-500">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA to detailed pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg text-white p-8">
            <h3 className="text-2xl font-bold mb-4">¿Quieres Ver el Sistema en Acción?</h3>
            <p className="text-lg opacity-90 mb-6">
              Explora nuestro pipeline técnico detallado y casos de uso reales
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/solucion">
                <Button size="lg" variant="secondary" className="text-lg">
                  <Zap className="mr-2 h-5 w-5" />
                  Ver Pipeline Técnico
                </Button>
              </Link>
              <Link href="/casos-uso">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg border-white text-white hover:bg-white hover:text-primary-600"
                >
                  Casos de Uso Reales
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}