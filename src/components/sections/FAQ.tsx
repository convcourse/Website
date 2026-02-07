'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: '¿Qué se guarda exactamente en blockchain?',
    answer: 'En blockchain solo se almacenan hashes criptográficos, metadatos técnicos (timestamps, versiones de algoritmo) e IDs de transacción. Nunca se guardan datos personales. El documento completo con los detalles se almacena en IPFS con acceso controlado.',
    category: 'blockchain',
  },
  {
    question: '¿Cómo se calcula exactamente el 80% de similitud?',
    answer: 'El score se calcula mediante embeddings semánticos de contenido (40%), resultados de aprendizaje (30%), competencias (20%) y estructura metodológica (10%). Cada componente tiene algoritmos específicos y el resultado se pondera según estos porcentajes para obtener el score final 0-100.',
    category: 'algoritmo',
  },
  {
    question: '¿Qué pasa si los ECTS no coinciden exactamente?',
    answer: 'Aplicamos umbrales flexibles: ±1 ECTS para asignaturas de 6 ECTS, ±2 para asignaturas >9 ECTS. Si la diferencia excede el umbral, se marca como "revisión manual requerida" pero el contenido puede seguir siendo válido. El sistema siempre explica la diferencia en ECTS.',
    category: 'proceso',
  },
  {
    question: '¿Quién firma digitalmente las convalidaciones?',
    answer: 'La plataforma genera el informe técnico con score y justificaciones. La firma institucional la realiza el personal autorizado de la secretaría académica usando su certificado eIDAS/FNMT. Certified facilita el proceso pero no sustituye la autoridad institucional.',
    category: 'legal',
  },
  {
    question: '¿El sistema funciona con asignaturas de sistemas no-ECTS?',
    answer: 'Sí, tenemos módulos de conversión para sistemas de créditos estadounidenses, asiáticos y otros. El sistema normaliza primero a ECTS equivalente antes del análisis de contenido. También manejamos sistemas de horas lectivas.',
    category: 'tecnico',
  },
  {
    question: '¿Cómo manejáis las asignaturas prácticas o de laboratorio?',
    answer: 'Las asignaturas prácticas se evalúan por metodología, equipamiento requerido, competencias técnicas y tiempo de laboratorio. El algoritmo tiene módulos específicos para prácticas clínicas, laboratorios de ingeniería, talleres, etc.',
    category: 'proceso',
  },
  {
    question: '¿Qué pasa si una universidad no está de acuerdo con el resultado?',
    answer: 'El sistema incluye workflow de apelación. La institución puede marcar discrepancia, proporcionar información adicional y solicitar revisión. Todo queda documentado en blockchain. El resultado final siempre lo decide la autoridad académica competente.',
    category: 'proceso',
  },
  {
    question: '¿Cómo garantizáis la seguridad de los datos académicos?',
    answer: 'Cifrado AES-256 en reposo, TLS 1.3 en transmisión, autenticación multifactor, segregación de redes y auditorías de seguridad regulares. Cumplimos ISO 27001 y GDPR. Los datos personales nunca salen del entorno controlado de la institución.',
    category: 'seguridad',
  },
  {
    question: '¿El sistema aprende y mejora con el tiempo?',
    answer: 'Sí, implementamos machine learning con feedback de las decisiones institucionales. Cuando una secretaría corrige o confirma un resultado, el sistema aprende para casos futuros similares. Siempre preservando privacidad y con controles de sesgo.',
    category: 'tecnico',
  },
  {
    question: '¿Cuánto tiempo tarda en implementarse en una universidad?',
    answer: 'Implementación típica: 4-8 semanas. Incluye integración con SIS, formación del equipo, configuración de reglas específicas y período de pruebas. Para implementaciones complejas multi-campus puede tomar 12-16 semanas.',
    category: 'implementacion',
  },
];

const categories = [
  { id: 'all', name: 'Todas', count: faqs.length },
  { id: 'proceso', name: 'Proceso', count: faqs.filter(f => f.category === 'proceso').length },
  { id: 'tecnico', name: 'Técnico', count: faqs.filter(f => f.category === 'tecnico').length },
  { id: 'legal', name: 'Legal', count: faqs.filter(f => f.category === 'legal').length },
  { id: 'seguridad', name: 'Seguridad', count: faqs.filter(f => f.category === 'seguridad').length },
  { id: 'blockchain', name: 'Blockchain', count: faqs.filter(f => f.category === 'blockchain').length },
];

export function FAQ() {
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
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            Preguntas Frecuentes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600"
          >
            Respuestas claras sobre cómo funciona Certified, qué se almacena en blockchain
            y cómo garantizamos la precisión y seguridad.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-gray-200 rounded-lg"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 rounded-lg"
              >
                <span className="font-medium text-gray-900 pr-4">
                  {faq.question}
                </span>
                {openItems.includes(index) ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Contact for More Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 bg-gray-50 rounded-lg"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            ¿No encuentras la respuesta que buscas?
          </h3>
          <p className="text-gray-600 mb-6">
            Nuestro equipo técnico está disponible para resolver cualquier duda específica
            sobre implementación, seguridad o funcionamiento.
          </p>
          <button
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-600"
          >
            Contactar Soporte Técnico
          </button>
        </motion.div>
      </div>
    </section>
  );
}