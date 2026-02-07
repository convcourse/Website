'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Users, Building, Zap, Crown, ArrowRight } from 'lucide-react';
import { trackEvent } from '@/components/Analytics';
import { useTranslations } from 'next-intl';

export function Plans() {
  const t = useTranslations('Planes.Plans');

  const handleCTAClick = (plan: string) => {
    trackEvent('cta_plan_click', { plan_type: plan });
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  const institutionPlans = [
    {
      id: 'pilot',
      name: t('items.pilot.name'),
      description: t('items.pilot.description'),
      price: t('items.pilot.price'),
      features: [
        t('items.pilot.features.0'),
        t('items.pilot.features.1'),
        t('items.pilot.features.2'),
        t('items.pilot.features.3'),
        t('items.pilot.features.4'),
      ],
      limitations: [
        t('items.pilot.limitations.0'),
        t('items.pilot.limitations.1'),
      ],
      cta: t('cta.pilot'),
      popular: false,
    },
    {
      id: 'pro',
      name: t('items.pro.name'),
      description: t('items.pro.description'),
      price: t('items.pro.price'),
      features: [
        t('items.pro.features.0'),
        t('items.pro.features.1'),
        t('items.pro.features.2'),
        t('items.pro.features.3'),
        t('items.pro.features.4'),
        t('items.pro.features.5'),
        t('items.pro.features.6'),
      ],
      limitations: [],
      cta: t('cta.pro'),
      popular: true,
    },
    {
      id: 'enterprise',
      name: t('items.enterprise.name'),
      description: t('items.enterprise.description'),
      price: t('items.enterprise.price'),
      features: [
        t('items.enterprise.features.0'),
        t('items.enterprise.features.1'),
        t('items.enterprise.features.2'),
        t('items.enterprise.features.3'),
        t('items.enterprise.features.4'),
        t('items.enterprise.features.5'),
        t('items.enterprise.features.6'),
        t('items.enterprise.features.7'),
      ],
      limitations: [],
      cta: t('cta.enterprise'),
      popular: false,
    },
  ];

  return (
    <section id="planes" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
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

        {/* Institution Plans */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {institutionPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className={`h-full ${plan.popular ? 'ring-2 ring-primary-600 shadow-lg' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Más Popular
                      </span>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      {plan.name === 'Enterprise' ? (
                        <Crown className="h-8 w-8 text-yellow-600" />
                      ) : plan.name === 'Pro' ? (
                        <Zap className="h-8 w-8 text-primary-600" />
                      ) : (
                        <Building className="h-8 w-8 text-gray-600" />
                      )}
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      {plan.name}
                    </CardTitle>
                    <p className="text-gray-600 mt-2">{plan.description}</p>
                    <div className="mt-4">
                      <div className="text-3xl font-bold text-gray-900">{plan.price}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-2">
                          <Check className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                      {plan.limitations.map((limitation, limitIndex) => (
                        <li key={limitIndex} className="flex items-start space-x-2">
                          <div className="w-4 h-4 mt-1 flex-shrink-0 flex items-center justify-center">
                            <div className="w-2 h-0.5 bg-gray-400"></div>
                          </div>
                          <span className="text-sm text-gray-400">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant={plan.popular ? 'default' : 'outline'}
                      onClick={() => handleCTAClick(plan.id)}
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-lg p-8 shadow-md border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('custom.title')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('custom.description')}
            </p>
            <Button
              size="lg"
              onClick={() => handleCTAClick('custom')}
            >
              {t('cta.custom')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}