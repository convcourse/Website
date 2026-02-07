'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function ContactFAQ() {
  const t = useTranslations('Contacto.FAQ');

  const faqs = [
    {
      question: t('items.trial.q'),
      answer: t('items.trial.a'),
      category: 'precios',
    },
    {
      question: t('items.calculation.q'),
      answer: t('items.calculation.a'),
      category: 'precios',
    },
    {
      question: t('items.changePlan.q'),
      answer: t('items.changePlan.a'),
      category: 'precios',
    },
    {
      question: t('items.discounts.q'),
      answer: t('items.discounts.a'),
      category: 'precios',
    },
    {
      question: t('items.limit.q'),
      answer: t('items.limit.a'),
      category: 'precios',
    },
    {
      question: t('items.implementation.q'),
      answer: t('items.implementation.a'),
      category: 'precios',
    },
    {
      question: t('items.blockchain.q'),
      answer: t('items.blockchain.a'),
      category: 'blockchain',
    },
    {
      question: t('items.algorithm.q'),
      answer: t('items.algorithm.a'),
      category: 'algoritmo',
    },
    {
      question: t('items.ects.q'),
      answer: t('items.ects.a'),
      category: 'proceso',
    },
    {
      question: t('items.signature.q'),
      answer: t('items.signature.a'),
      category: 'legal',
    },
    {
      question: t('items.nonEcts.q'),
      answer: t('items.nonEcts.a'),
      category: 'tecnico',
    },
    {
      question: t('items.labs.q'),
      answer: t('items.labs.a'),
      category: 'proceso',
    },
    {
      question: t('items.disagreement.q'),
      answer: t('items.disagreement.a'),
      category: 'proceso',
    },
    {
      question: t('items.security.q'),
      answer: t('items.security.a'),
      category: 'seguridad',
    },
    {
      question: t('items.learning.q'),
      answer: t('items.learning.a'),
      category: 'tecnico',
    },
    {
      question: t('items.time.q'),
      answer: t('items.time.a'),
      category: 'implementacion',
    },
    {
      question: t('items.support.q'),
      answer: t('items.support.a'),
      category: 'soporte',
    },
    {
      question: t('items.customization.q'),
      answer: t('items.customization.a'),
      category: 'personalizacion',
    },
  ];

  const categories = [
    { id: 'all', name: t('categories.all'), count: faqs.length },
    { id: 'precios', name: t('categories.pricing'), count: faqs.filter(f => f.category === 'precios').length },
    { id: 'proceso', name: t('categories.process'), count: faqs.filter(f => f.category === 'proceso').length },
    { id: 'tecnico', name: t('categories.technical'), count: faqs.filter(f => f.category === 'tecnico').length },
    { id: 'legal', name: t('categories.legal'), count: faqs.filter(f => f.category === 'legal').length },
    { id: 'seguridad', name: t('categories.security'), count: faqs.filter(f => f.category === 'seguridad').length },
    { id: 'soporte', name: t('categories.support'), count: faqs.filter(f => f.category === 'soporte').length },
  ];

  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFaqs = selectedCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <section id="faq" className="py-24 bg-surface-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-4 mb-6"
          >
            <div className="p-4 bg-primary-100 rounded-2xl">
              <MessageCircle className="h-8 w-8 text-primary-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              {t('title')}
            </h2>
          </motion.div>
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

        {/* Filtros por categoría */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category.id
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20 transform scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-primary-200'
                }`}
            >
              {category.name} <span className="opacity-70 ml-1">({category.count})</span>
            </button>
          ))}
        </motion.div>

        {/* Lista de preguntas */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full text-left p-6 hover:bg-gray-50/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-gray-900 pr-8">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 mt-1">
                    {openItems.includes(index) ? (
                      <ChevronUp className="h-5 w-5 text-primary-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </button>

              {openItems.includes(index) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-100"
                >
                  <div className="p-6 pt-4 bg-gray-50/30">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA para más preguntas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-white rounded-2xl p-10 shadow-soft border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {t('notFound.title')}
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {t('notFound.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 shadow-glow hover:shadow-lg transition-all duration-200"
              >
                {t('notFound.ask')}
              </a>
              <a
                href="mailto:soporte@certified.com"
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-200 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                {t('notFound.email')}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}