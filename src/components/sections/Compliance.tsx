'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, FileCheck, Users, Eye, Gavel, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Compliance() {
  const t = useTranslations('Solucion.Compliance');

  const complianceItems = [
    {
      title: t('items.gdpr.title'),
      icon: Shield,
      description: t('items.gdpr.description'),
      details: [
        t('items.gdpr.details.0'),
        t('items.gdpr.details.1'),
        t('items.gdpr.details.2'),
        t('items.gdpr.details.3'),
      ],
      status: t('items.gdpr.status'),
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: t('items.eidas.title'),
      icon: FileCheck,
      description: t('items.eidas.description'),
      details: [
        t('items.eidas.details.0'),
        t('items.eidas.details.1'),
        t('items.eidas.details.2'),
        t('items.eidas.details.3'),
      ],
      status: t('items.eidas.status'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: t('items.transparency.title'),
      icon: Eye,
      description: t('items.transparency.description'),
      details: [
        t('items.transparency.details.0'),
        t('items.transparency.details.1'),
        t('items.transparency.details.2'),
        t('items.transparency.details.3'),
      ],
      status: t('items.transparency.status'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: t('items.security.title'),
      icon: Lock,
      description: t('items.security.description'),
      details: [
        t('items.security.details.0'),
        t('items.security.details.1'),
        t('items.security.details.2'),
        t('items.security.details.3'),
      ],
      status: t('items.security.status'),
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  const legalFramework = [
    {
      title: t('legal.university'),
      items: [
        'Real Decreto 822/2021 (organización enseñanzas)',
        'Decreto 967/2014 (convalidaciones y reconocimientos)',
        'LOMLOU (Ley Orgánica de Modificación LOU)',
      ],
    },
    {
      title: t('legal.european'),
      items: [
        'Convenio de Lisboa (reconocimiento cualificaciones)',
        'Directiva 2005/36/CE (reconocimiento profesional)',
        'ECTS Users\' Guide (transferencia créditos)',
      ],
    },
    {
      title: t('legal.privacy'),
      items: [
        'RGPD/GDPR (UE) 2016/679',
        'LOPDGDD 3/2018 (España)',
        'eIDAS (UE) 910/2014',
      ],
    },
  ];

  return (
    <section id="cumplimiento" className="py-24 bg-surface-50">
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

        {/* Compliance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {complianceItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full shadow-soft border-gray-100 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl ${item.bgColor}`}>
                        <item.icon className={`h-8 w-8 ${item.color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${item.bgColor} ${item.color} mt-2`}>
                          <CheckCircle className="h-3 w-3 mr-1.5" />
                          {item.status}
                        </div>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
                  <ul className="space-y-3">
                    {item.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600 font-medium">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Legal Framework */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Card className="shadow-soft border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-xl">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Gavel className="h-6 w-6 text-gray-700" />
                </div>
                <span>{t('legal.title')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {legalFramework.map((framework, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-4">{framework.title}</h4>
                    <ul className="space-y-3">
                      {framework.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-gray-600 flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Blockchain Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 rounded-2xl text-white p-10 shadow-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 text-center">
            <h3 className="text-3xl font-bold mb-4 tracking-tight">{t('blockchain.title')}</h3>
            <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto font-light">
              {t('blockchain.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-4xl font-bold mb-2 text-accent-400">100%</div>
                <div className="text-sm font-medium opacity-90 uppercase tracking-wide">{t('blockchain.immutable')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-4xl font-bold mb-2 text-accent-400">24/7</div>
                <div className="text-sm font-medium opacity-90 uppercase tracking-wide">{t('blockchain.verifiable')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-4xl font-bold mb-2 text-accent-400">∞</div>
                <div className="text-sm font-medium opacity-90 uppercase tracking-wide">{t('blockchain.permanent')}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Data Privacy Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-8 bg-blue-50/50 border border-blue-100 rounded-xl p-6"
        >
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-blue-900 mb-2 text-lg">{t('privacy.title')}</h4>
              <p className="text-blue-800 text-sm leading-relaxed">
                {t('privacy.description')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}