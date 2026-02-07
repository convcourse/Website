'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Clock, FileX, Users, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Problem() {
  const t = useTranslations('Solucion.Problem');

  const problems = [
    {
      icon: Clock,
      title: t('items.slow.title'),
      description: t('items.slow.description'),
      impact: t('items.slow.impact'),
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      icon: FileX,
      title: t('items.inconsistent.title'),
      description: t('items.inconsistent.description'),
      impact: t('items.inconsistent.impact'),
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Users,
      title: t('items.opaque.title'),
      description: t('items.opaque.description'),
      impact: t('items.opaque.impact'),
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: AlertTriangle,
      title: t('items.untraceable.title'),
      description: t('items.untraceable.description'),
      impact: t('items.untraceable.impact'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  const solutions = [
    {
      title: t('solutions.pipeline.title'),
      description: t('solutions.pipeline.description'),
      benefit: t('solutions.pipeline.benefit'),
    },
    {
      title: t('solutions.contrasted.title'),
      description: t('solutions.contrasted.description'),
      benefit: t('solutions.contrasted.benefit'),
    },
    {
      title: t('solutions.blockchain.title'),
      description: t('solutions.blockchain.description'),
      benefit: t('solutions.blockchain.benefit'),
    },
  ];

  return (
    <section id="problema" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Problem Section */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl ${problem.bgColor} border border-transparent hover:border-gray-200 transition-all duration-300 hover:shadow-lg`}
            >
              <problem.icon className={`h-10 w-10 ${problem.color} mb-6`} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {problem.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {problem.description}
              </p>
              <div className={`text-sm font-bold ${problem.color} bg-white/50 inline-block px-3 py-1 rounded-full`}>
                {problem.impact}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Arrow Transition */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-8 py-4 rounded-full shadow-glow hover:shadow-lg transition-all duration-300"
          >
            <span className="font-semibold text-lg">{t('transition')}</span>
            <ArrowRight className="h-5 w-5" />
          </motion.div>
        </div>

        {/* Solution Section */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight"
          >
            {t('solutionTitle')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            {t('solutionDescription')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-gradient-to-br from-surface-50 to-white rounded-2xl border border-gray-100 shadow-soft hover:shadow-lg transition-all duration-300"
            >
              <div className="bg-primary-600 text-white rounded-2xl w-14 h-14 flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-md">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {solution.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {solution.description}
              </p>
              <div className="text-primary-700 font-semibold bg-primary-50 px-4 py-2 rounded-full inline-block">
                {solution.benefit}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}