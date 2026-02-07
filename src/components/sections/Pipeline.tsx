'use client';

import { motion } from 'framer-motion';
import { Upload, Settings, Brain, CheckCircle, Link } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Pipeline() {
  const t = useTranslations('Solucion.Pipeline');

  const steps = [
    {
      id: 1,
      title: t('steps.ingest.title'),
      description: t('steps.ingest.description'),
      icon: Upload,
      details: [
        t('steps.ingest.details.0'),
        t('steps.ingest.details.1'),
        t('steps.ingest.details.2'),
      ],
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 2,
      title: t('steps.normalization.title'),
      description: t('steps.normalization.description'),
      icon: Settings,
      details: [
        t('steps.normalization.details.0'),
        t('steps.normalization.details.1'),
        t('steps.normalization.details.2'),
      ],
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 3,
      title: t('steps.matching.title'),
      description: t('steps.matching.description'),
      icon: Brain,
      details: [
        t('steps.matching.details.0'),
        t('steps.matching.details.1'),
        t('steps.matching.details.2'),
      ],
      color: 'from-green-500 to-green-600',
    },
    {
      id: 4,
      title: t('steps.policy.title'),
      description: t('steps.policy.description'),
      icon: CheckCircle,
      details: [
        t('steps.policy.details.0'),
        t('steps.policy.details.1'),
        t('steps.policy.details.2'),
      ],
      color: 'from-orange-500 to-orange-600',
    },
    {
      id: 5,
      title: t('steps.output.title'),
      description: t('steps.output.description'),
      icon: Link,
      details: [
        t('steps.output.details.0'),
        t('steps.output.details.1'),
        t('steps.output.details.2'),
        t('steps.output.details.3'),
      ],
      color: 'from-red-500 to-red-600',
    },
  ];

  return (
    <section id="pipeline" className="py-24 bg-surface-50">
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

        {/* Desktop Pipeline */}
        <div className="hidden lg:block relative mb-20">
          {/* Connection Lines */}
          <div className="absolute top-[3.5rem] left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-green-500 via-orange-500 to-red-500 opacity-20"></div>

          <div className="grid grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Step Circle */}
                <div className={`w-28 h-28 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg mx-auto mb-8 relative z-10 transform group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="h-12 w-12" />
                  <div className="absolute -bottom-3 bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm border border-gray-100">
                    PASO {step.id}
                  </div>
                </div>

                {/* Step Content */}
                <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 h-full hover:shadow-lg transition-all duration-300">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>

                  <div className="space-y-2 bg-gray-50 p-3 rounded-xl">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span className="text-xs text-gray-600 font-medium">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Pipeline */}
        <div className="lg:hidden space-y-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start space-x-4"
            >
              {/* Step Circle */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                <step.icon className="h-6 w-6" />
              </div>

              {/* Step Content */}
              <div className="flex-1 bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
                <div className="mb-4">
                  <div className="text-xs font-bold text-primary-600 mb-1 uppercase tracking-wide">
                    PASO {step.id}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="space-y-2 bg-gray-50 p-3 rounded-xl">
                  {step.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span className="text-xs text-gray-600">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-10 shadow-soft border border-gray-100"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-10">
            {t('metrics.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-4 rounded-2xl bg-blue-50/50">
              <div className="text-4xl font-bold text-primary-600 mb-2">≥80%</div>
              <div className="text-sm font-medium text-gray-600">{t('metrics.similarity')}</div>
            </div>
            <div className="p-4 rounded-2xl bg-accent-50/50">
              <div className="text-4xl font-bold text-accent-600 mb-2">±10%</div>
              <div className="text-sm font-medium text-gray-600">{t('metrics.margin')}</div>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50/50">
              <div className="text-4xl font-bold text-purple-600 mb-2">99.9%</div>
              <div className="text-sm font-medium text-gray-600">{t('metrics.availability')}</div>
            </div>
            <div className="p-4 rounded-2xl bg-orange-50/50">
              <div className="text-4xl font-bold text-orange-600 mb-2">&lt;5min</div>
              <div className="text-sm font-medium text-gray-600">{t('metrics.processTime')}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}