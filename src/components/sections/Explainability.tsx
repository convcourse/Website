'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, FileText, Award, Calculator, Quote, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Explainability() {
  const t = useTranslations('Solucion.Explainability');
  const tExamples = useTranslations('ExplainabilityExamples');

  const scoreComponents = [
    { name: t('score.content'), weight: 40, score: 85, icon: FileText },
    { name: t('score.outcomes'), weight: 30, score: 92, icon: Brain },
    { name: t('score.skills'), weight: 20, score: 78, icon: Award },
    { name: t('score.structure'), weight: 10, score: 88, icon: Calculator },
  ];

  const exampleCitations = {
    origin: tExamples.raw('origin') as string[],
    dest: tExamples.raw('destination') as string[]
  };

  const totalScore = scoreComponents.reduce((sum, comp) => sum + (comp.score * comp.weight / 100), 0);

  return (
    <section id="contrastabilidad" className="py-24 bg-white">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Score Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="h-full shadow-soft border-gray-100 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="p-2 bg-primary-50 rounded-lg">
                    <Calculator className="h-6 w-6 text-primary-600" />
                  </div>
                  <span>{t('score.title')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {scoreComponents.map((component, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <component.icon className="h-5 w-5 text-gray-500" />
                          <span className="text-sm font-semibold text-gray-700">{component.name}</span>
                          <span className="text-xs text-gray-400 font-medium">({component.weight}%)</span>
                        </div>
                        <span className="font-bold text-gray-900">{component.score}/100</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${component.score}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-gradient-to-r from-primary-500 to-accent-500 h-3 rounded-full shadow-sm"
                        />
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-gray-100 pt-6 mt-8">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold text-xl text-gray-900">{t('score.finalScore')}</span>
                      <span className={`text-2xl font-bold ${totalScore >= 80 ? 'text-green-600' : totalScore >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {Math.round(totalScore)}/100
                      </span>
                    </div>
                    <div className={`flex items-center space-x-3 p-4 rounded-xl ${totalScore >= 80 ? 'bg-green-50 border border-green-100' :
                      totalScore >= 70 ? 'bg-yellow-50 border border-yellow-100' :
                        'bg-red-50 border border-red-100'
                      }`}>
                      {totalScore >= 80 ? (
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      ) : totalScore >= 70 ? (
                        <AlertTriangle className="h-6 w-6 text-yellow-600" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-600" />
                      )}
                      <span className={`font-medium ${totalScore >= 80 ? 'text-green-800' :
                        totalScore >= 70 ? 'text-yellow-800' :
                          'text-red-800'
                        }`}>
                        {totalScore >= 80 ? t('score.autoAccept') : totalScore >= 70 ? t('score.manualReview') : t('score.autoReject')}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Match Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="h-full shadow-soft border-gray-100 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="p-2 bg-accent-50 rounded-lg">
                    <Quote className="h-6 w-6 text-accent-600" />
                  </div>
                  <span>{t('citations.title')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-primary-500 mr-2"></span>
                      {t('citations.origin')}
                    </h4>
                    <div className="space-y-2">
                      {exampleCitations.origin.map((citation, index) => (
                        <div key={index} className="text-sm text-gray-600 border-l-4 border-primary-200 pl-4 py-1 italic bg-primary-50/30 rounded-r-lg">
                          &quot;{citation}&quot;
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-accent-500 mr-2"></span>
                      {t('citations.destination')}
                    </h4>
                    <div className="space-y-2">
                      {exampleCitations.dest.map((citation, index) => (
                        <div key={index} className="text-sm text-gray-600 border-l-4 border-accent-200 pl-4 py-1 italic bg-accent-50/30 rounded-r-lg">
                          &quot;{citation}&quot;
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-surface-50 p-5 rounded-xl border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-3">{t('citations.validations')}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-3 bg-white p-2 rounded-lg shadow-sm">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="font-medium">{tExamples('validations.ects')}: <span className="text-gray-600 font-normal">6 ↔ 6 (Δ=0)</span></span>
                      </div>
                      <div className="flex items-center space-x-3 bg-white p-2 rounded-lg shadow-sm">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="font-medium">{tExamples('validations.type')}: <span className="text-gray-600 font-normal">OB ↔ OB</span></span>
                      </div>
                      <div className="flex items-center space-x-3 bg-white p-2 rounded-lg shadow-sm">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="font-medium">{tExamples('validations.grade')}: <span className="text-gray-600 font-normal">7.5 ≥ 5.0</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}