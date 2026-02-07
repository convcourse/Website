'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Shield, Award, Users, Globe, Lock, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

export function TrustIndicators() {
  const t = useTranslations('TrustIndicators');

  const certifications = [
    {
      icon: Shield,
      key: 'gdpr',
      color: 'text-green-600',
    },
    {
      icon: Award,
      key: 'eidas',
      color: 'text-blue-600',
    },
    {
      icon: Lock,
      key: 'iso',
      color: 'text-yellow-600',
    },
    {
      icon: Globe,
      key: 'bologna',
      color: 'text-purple-600',
    },
  ];

  const partnerKeys = ['upm', 'crue', 'enqa', 'naric'];

  const securityFeatures = t.raw('security.features') as string[];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" suppressHydrationWarning>
        {/* Header */}
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

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20" suppressHydrationWarning>
          {certifications.map((cert, index) => {
            const badge = t(`certifications.${cert.key}.badge`);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center p-6 hover:shadow-lg transition-all duration-300 border-gray-100 hover:border-primary-100 bg-white" suppressHydrationWarning>
                  <CardContent className="p-0" suppressHydrationWarning>
                    <div className={`w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`} suppressHydrationWarning>
                      <cert.icon className={`h-8 w-8 ${cert.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {t(`certifications.${cert.key}.title`)}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {t(`certifications.${cert.key}.description`)}
                    </p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${badge === 'Certificado' || badge === 'Certified' ? 'bg-green-50 text-green-700 border-green-200' :
                      badge === 'Validado' || badge === 'Validated' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        badge === 'En proceso' || badge === 'In progress' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                          'bg-purple-50 text-purple-700 border-purple-200'
                      }`}>
                      {badge}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            {t('partners.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerKeys.map((key, index) => (
              <div key={index} className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-gray-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{t(`partners.items.${key}.name`)}</h4>
                <p className="text-sm text-primary-600 font-medium mb-1">{t(`partners.items.${key}.role`)}</p>
                <p className="text-xs text-gray-500">{t(`partners.items.${key}.description`)}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-lg p-8"
        >
          <div className="text-center mb-8">
            <Shield className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('security.title')}
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('security.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3"
              >
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t('transparency.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">{t('transparency.traceability.value')}</div>
                <div className="text-sm font-medium text-gray-700">{t('transparency.traceability.label')}</div>
                <div className="text-xs text-gray-500">{t('transparency.traceability.description')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">{t('transparency.monitoring.value')}</div>
                <div className="text-sm font-medium text-gray-700">{t('transparency.monitoring.label')}</div>
                <div className="text-xs text-gray-500">{t('transparency.monitoring.description')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">{t('transparency.availability.value')}</div>
                <div className="text-sm font-medium text-gray-700">{t('transparency.availability.label')}</div>
                <div className="text-xs text-gray-500">{t('transparency.availability.description')}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}