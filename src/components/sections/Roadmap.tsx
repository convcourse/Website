'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Rocket, Building, Users, Shield } from 'lucide-react';

const roadmapWeeks = [
  {
    week: 'Semana 1-2',
    title: 'Fundación y Arquitectura',
    status: 'completed',
    tasks: [
      'Diseño arquitectura del sistema',
      'Setup infraestructura base',
      'Definición APIs principales',
      'Prototipo pipeline básico',
    ],
    deliverables: [
      'Arquitectura técnica documentada',
      'Entorno de desarrollo configurado',
    ],
  },
  {
    week: 'Semana 3-4',
    title: 'Core IA y Blockchain',
    status: 'completed',
    tasks: [
      'Implementación embeddings',
      'Desarrollo LLM re-ranker',
      'Integración blockchain',
      'Módulo de contrastabilidad',
    ],
    deliverables: [
      'Pipeline IA funcional',
      'Registro blockchain operativo',
    ],
  },
  {
    week: 'Semana 5-6',
    title: 'Frontend y UX',
    status: 'in-progress',
    tasks: [
      'Interfaz de administración',
      'Dashboard de métricas',
      'Portal para estudiantes',
      'Testing y optimización',
    ],
    deliverables: [
      'Landing page completa',
      'Demo funcional disponible',
    ],
  },
  {
    week: 'Próximas Fases',
    title: 'Escalado y Producción',
    status: 'planned',
    tasks: [
      'Programa piloto universidades',
      'Optimización rendimiento',
      'Certificaciones seguridad',
      'Expansión internacional',
    ],
    deliverables: [
      'Primera universidad piloto',
      'Certificación ISO 27001',
    ],
  },
];

const milestones = [
  {
    icon: Rocket,
    title: 'MVP Técnico',
    description: 'Pipeline IA + Blockchain funcional',
    date: 'Semana 4',
    status: 'completed',
  },
  {
    icon: Building,
    title: 'Demo Interactivo',
    description: 'Interfaz completa para demos',
    date: 'Semana 6',
    status: 'in-progress',
  },
  {
    icon: Users,
    title: 'Programa Piloto',
    description: 'Primera universidad activa',
    date: 'Q1 2025',
    status: 'planned',
  },
  {
    icon: Shield,
    title: 'Certificación',
    description: 'ISO 27001 y auditorías',
    date: 'Q2 2025',
    status: 'planned',
  },
];

const statusConfig = {
  completed: {
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    icon: CheckCircle,
  },
  'in-progress': {
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    icon: Clock,
  },
  planned: {
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    icon: Clock,
  },
};

export function Roadmap() {
  return (
    <section id="roadmap" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            Roadmap 0→1: Primeras 6 Semanas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Transparencia total en nuestro desarrollo. Desde MVP técnico hasta
            demo funcional con universidad piloto.
          </motion.p>
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Progreso General</h3>
              <span className="text-sm text-gray-600">Semana 5 de 6</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '83%' }}
                transition={{ duration: 1.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-primary-500 to-accent-500 h-3 rounded-full relative"
              >
                <div className="absolute right-0 top-0 h-3 w-3 bg-white rounded-full shadow-sm border-2 border-primary-500"></div>
              </motion.div>
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-2">
              <span>Inicio</span>
              <span className="font-medium text-primary-600">83% Completado</span>
              <span>Demo Listo</span>
            </div>
          </div>
        </motion.div>

        {/* Roadmap Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {roadmapWeeks.map((week, index) => {
            const config = statusConfig[week.status as keyof typeof statusConfig];
            const StatusIcon = config.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`h-full ${config.borderColor} border-2`}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-500">{week.week}</span>
                      <StatusIcon className={`h-5 w-5 ${config.color}`} />
                    </div>
                    <CardTitle className="text-lg text-gray-900">
                      {week.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Tareas</h4>
                        <ul className="space-y-1">
                          {week.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="flex items-start space-x-2">
                              <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                                week.status === 'completed' ? 'bg-green-500' :
                                week.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-400'
                              }`}></div>
                              <span className="text-xs text-gray-600">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Entregables</h4>
                        <ul className="space-y-1">
                          {week.deliverables.map((deliverable, delIndex) => (
                            <li key={delIndex} className={`text-xs p-2 rounded ${config.bgColor} ${config.color} font-medium`}>
                              {deliverable}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Key Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center text-gray-900">
                Hitos Clave del Proyecto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {milestones.map((milestone, index) => {
                  const config = statusConfig[milestone.status as keyof typeof statusConfig];
                  
                  return (
                    <div key={index} className="text-center">
                      <div className={`w-16 h-16 rounded-full ${config.bgColor} flex items-center justify-center mx-auto mb-4`}>
                        <milestone.icon className={`h-8 w-8 ${config.color}`} />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{milestone.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.color}`}>
                        {milestone.date}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Next Steps CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg text-white p-8">
            <h3 className="text-2xl font-bold mb-4">¿Quieres ser la Primera Universidad?</h3>
            <p className="text-lg opacity-90 mb-6">
              Únete a nuestro programa piloto y ayúdanos a perfeccionar Certified
              mientras obtienes acceso temprano a la tecnología.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-white text-primary-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
              >
                Programa Piloto
              </button>
              <button
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 border border-white text-white font-medium rounded-md hover:bg-white hover:text-primary-600 transition-colors"
              >
                Solicitar Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}