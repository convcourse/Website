'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, Building2, Globe, Target, TrendingUp, Clock, Shield, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function UseCases() {
  const t = useTranslations('CasosUso.UseCases');

  const useCases = [
    {
      title: t('cases.erasmus.title'),
      description: t('cases.erasmus.description'),
      icon: Plane,
      color: 'from-blue-500 to-blue-600',
      benefits: [
        t('cases.erasmus.benefits.0'),
        t('cases.erasmus.benefits.1'),
        t('cases.erasmus.benefits.2'),
        t('cases.erasmus.benefits.3'),
      ],
      stats: { metric: t('cases.erasmus.metric'), label: t('cases.erasmus.metricLabel') },
    },
    {
      title: t('cases.interfaculty.title'),
      description: t('cases.interfaculty.description'),
      icon: Building2,
      color: 'from-green-500 to-green-600',
      benefits: [
        t('cases.interfaculty.benefits.0'),
        t('cases.interfaculty.benefits.1'),
        t('cases.interfaculty.benefits.2'),
        t('cases.interfaculty.benefits.3'),
      ],
      stats: { metric: t('cases.interfaculty.metric'), label: t('cases.interfaculty.metricLabel') },
    },
    {
      title: t('cases.international.title'),
      description: t('cases.international.description'),
      icon: Globe,
      color: 'from-purple-500 to-purple-600',
      benefits: [
        t('cases.international.benefits.0'),
        t('cases.international.benefits.1'),
        t('cases.international.benefits.2'),
        t('cases.international.benefits.3'),
      ],
      stats: { metric: t('cases.international.metric'), label: t('cases.international.metricLabel') },
    },
  ];

  const kpis = [
    {
      metric: t('kpis.items.resolutionTime.label'),
      current: t('kpis.items.resolutionTime.current'),
      withCertified: t('kpis.items.resolutionTime.certified'),
      improvement: t('kpis.items.resolutionTime.improvement'),
      icon: Clock,
      color: 'text-blue-600',
    },
    {
      metric: t('kpis.items.accuracy.label'),
      current: t('kpis.items.accuracy.current'),
      withCertified: t('kpis.items.accuracy.certified'),
      improvement: t('kpis.items.accuracy.improvement'),
      icon: Target,
      color: 'text-green-600',
    },
    {
      metric: t('kpis.items.coverage.label'),
      current: t('kpis.items.coverage.current'),
      withCertified: t('kpis.items.coverage.certified'),
      improvement: t('kpis.items.coverage.improvement'),
      icon: TrendingUp,
      color: 'text-purple-600',
    },
    {
      metric: t('kpis.items.falsePositives.label'),
      current: t('kpis.items.falsePositives.current'),
      withCertified: t('kpis.items.falsePositives.certified'),
      improvement: t('kpis.items.falsePositives.improvement'),
      icon: Shield,
      color: 'text-red-600',
    },
    {
      metric: t('kpis.items.traceability.label'),
      current: t('kpis.items.traceability.current'),
      withCertified: t('kpis.items.traceability.certified'),
      improvement: t('kpis.items.traceability.improvement'),
      icon: Shield,
      color: 'text-orange-600',
    },
  ];

  return (
    <section id="casos-uso" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            {t('description')}
          </motion.p>
        </div>

        {/* Use Cases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-gray-100 hover:-translate-y-1">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${useCase.color} flex items-center justify-center text-white mb-6 shadow-md`}>
                    <useCase.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
                    {useCase.title}
                  </CardTitle>
                  <p className="text-gray-600 leading-relaxed">{useCase.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {useCase.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start space-x-3">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600 font-medium">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={`bg-gradient-to-br ${useCase.color} text-white p-6 rounded-xl text-center shadow-lg`}>
                    <div className="text-3xl font-bold mb-1">{useCase.stats.metric}</div>
                    <div className="text-sm font-medium opacity-90">{useCase.stats.label}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* KPIs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-surface-50 rounded-3xl p-10 border border-gray-100"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {t('kpis.title')}
            </h3>
            <p className="text-lg text-gray-600">
              {t('kpis.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {kpis.map((kpi, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 text-center shadow-soft border border-gray-100 hover:shadow-md transition-all"
              >
                <kpi.icon className={`h-10 w-10 ${kpi.color} mx-auto mb-4`} />
                <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">
                  {kpi.metric}
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <span className="text-gray-500 text-xs block mb-1">{t('kpis.items.resolutionTime.current')}</span>
                    <div className="font-semibold text-gray-700">{kpi.current}</div>
                  </div>
                  <div className="bg-primary-50 rounded-lg p-2">
                    <span className="text-primary-600 text-xs block mb-1">Con Certified</span>
                    <div className="font-bold text-primary-700 text-lg">{kpi.withCertified}</div>
                  </div>
                  <div className={`font-bold ${kpi.color} text-xs mt-2`}>
                    {kpi.improvement}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 rounded-3xl text-white p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="inline-block bg-accent-500/20 text-accent-300 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-accent-500/30">
                {t('successStory.badge')}
              </div>
              <h3 className="text-3xl font-bold mb-6">{t('successStory.university')}</h3>
              <p className="text-xl opacity-90 mb-8 font-light leading-relaxed">
                {t('successStory.description')}
              </p>
              <div className="space-y-4 bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="opacity-80">{t('successStory.metrics.time.label')}</span>
                  <span className="font-bold text-accent-400 text-lg">{t('successStory.metrics.time.value')}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="opacity-80">{t('successStory.metrics.satisfaction.label')}</span>
                  <span className="font-bold text-accent-400 text-lg">{t('successStory.metrics.satisfaction.value')}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="opacity-80">{t('successStory.metrics.adminLoad.label')}</span>
                  <span className="font-bold text-accent-400 text-lg">{t('successStory.metrics.adminLoad.value')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-80">{t('successStory.metrics.appeals.label')}</span>
                  <span className="font-bold text-accent-400 text-lg">{t('successStory.metrics.appeals.value')}</span>
                </div>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <div className="inline-block bg-white/10 rounded-full p-8 mb-6 backdrop-blur-md border border-white/20">
                <Users className="h-24 w-24 text-white" />
              </div>
              <div className="text-6xl font-bold mb-2 tracking-tight">{t('successStory.totalProcessed')}</div>
              <div className="text-xl opacity-90 font-medium">{t('successStory.totalLabel')}</div>
              <div className="text-sm opacity-60 mt-4 font-mono">
                [{t('successStory.university')}]
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}