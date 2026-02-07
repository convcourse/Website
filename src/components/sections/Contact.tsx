'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock } from 'lucide-react';
import { trackEvent } from '@/components/Analytics';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

interface FormData {
  name: string;
  email: string;
  role: string;
  university: string;
  message: string;
  consent: boolean;
}

export function Contact() {
  const tForm = useTranslations('Contacto.Form');
  const tPreCheck = useTranslations('Contacto.PreCheck');

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    role: '',
    university: '',
    message: '',
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track form submission
    trackEvent('form_submit', {
      role: formData.role,
      university: formData.university,
    });

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Announce success to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = tForm('success.description');
    document.body.appendChild(announcement);
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <section id="contacto" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">
              {tForm('success.title')}
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              {tForm('success.description')}
            </p>
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-8 shadow-sm">
              <h3 className="font-bold text-blue-900 mb-4 text-lg">{tForm('success.nextSteps.title')}</h3>
              <ul className="text-blue-800 space-y-3 text-left max-w-md mx-auto">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{tForm('success.nextSteps.steps.0')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{tForm('success.nextSteps.steps.1')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{tForm('success.nextSteps.steps.2')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{tForm('success.nextSteps.steps.3')}</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight"
          >
            {tForm('title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            {tForm('description')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-10">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8">
                  {tForm('info.title')}
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 group">
                    <div className="p-3 bg-primary-50 rounded-xl group-hover:bg-primary-100 transition-colors">
                      <Mail className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{tForm('info.email')}</div>
                      <div className="text-gray-600">info@certified.example.com</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 group">
                    <div className="p-3 bg-primary-50 rounded-xl group-hover:bg-primary-100 transition-colors">
                      <Phone className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{tForm('info.phone')}</div>
                      <div className="text-gray-600">+34 900 000 000</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 group">
                    <div className="p-3 bg-primary-50 rounded-xl group-hover:bg-primary-100 transition-colors">
                      <MapPin className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{tForm('info.office')}</div>
                      <div className="text-gray-600">Madrid, España</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 border border-primary-100">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">{tForm('info.whyChoose')}</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="font-medium">{tForm('info.reasons.0')}</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="font-medium">{tForm('info.reasons.1')}</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="font-medium">{tForm('info.reasons.2')}</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="font-medium">{tForm('info.reasons.3')}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="font-bold text-blue-900">{tForm('info.responseTime.title')}</span>
                </div>
                <p className="text-sm text-blue-800 leading-relaxed">
                  {tForm('info.responseTime.description')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card suppressHydrationWarning className="shadow-xl border-gray-100 overflow-hidden">
              <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-6">
                <CardTitle className="text-xl">{tForm('fields.title')}</CardTitle>
              </CardHeader>
              <CardContent className="pt-8">
                <form onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6" suppressHydrationWarning>
                    <div suppressHydrationWarning>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        {tForm('fields.name')}
                      </label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder={tForm('fields.namePlaceholder')}
                        className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                      />
                    </div>
                    <div suppressHydrationWarning>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        {tForm('fields.email')}
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder={tForm('fields.emailPlaceholder')}
                        className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6" suppressHydrationWarning>
                    <div suppressHydrationWarning>
                      <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                        {tForm('fields.role')}
                      </label>
                      <div className="relative">
                        <select
                          id="role"
                          required
                          value={formData.role}
                          onChange={(e) => handleInputChange('role', e.target.value)}
                          className="w-full h-12 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors appearance-none"
                        >
                          <option value="">{tForm('fields.rolePlaceholder')}</option>
                          <option value="secretario-academico">{tForm('fields.roles.secretary')}</option>
                          <option value="vicerrector">{tForm('fields.roles.vicerector')}</option>
                          <option value="coordinador">{tForm('fields.roles.coordinator')}</option>
                          <option value="director-centro">{tForm('fields.roles.director')}</option>
                          <option value="responsable-ti">{tForm('fields.roles.it')}</option>
                          <option value="otro">{tForm('fields.roles.other')}</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                          <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                      </div>
                    </div>
                    <div suppressHydrationWarning>
                      <label htmlFor="university" className="block text-sm font-semibold text-gray-700 mb-2">
                        {tForm('fields.university')}
                      </label>
                      <Input
                        id="university"
                        type="text"
                        required
                        value={formData.university}
                        onChange={(e) => handleInputChange('university', e.target.value)}
                        placeholder={tForm('fields.universityPlaceholder')}
                        className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div suppressHydrationWarning>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      {tForm('fields.message')}
                    </label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder={tForm('fields.messagePlaceholder')}
                      className="bg-gray-50 border-gray-200 focus:bg-white transition-colors resize-none"
                    />
                  </div>

                  <div className="flex items-start space-x-3" suppressHydrationWarning>
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      checked={formData.consent}
                      onChange={(e) => handleInputChange('consent', e.target.checked)}
                      className="mt-1 h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-600"
                    />
                    <label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed">
                      {tForm('fields.consent')}
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="glow"
                    className="w-full text-lg py-6 h-auto shadow-lg hover:shadow-xl transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="mr-2 h-5 w-5 animate-spin" />
                        {tForm('fields.sending')}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        {tForm('fields.submit')}
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100" suppressHydrationWarning>
                  <p className="text-xs text-gray-500 text-center leading-relaxed">
                    {tForm('fields.disclaimer')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Pre-check Section for Students */}
        <motion.div
          id="pre-check"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-accent-50 to-primary-50 rounded-3xl p-12 border border-primary-100"
        >
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {tPreCheck('title')}
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {tPreCheck('description')}
            </p>
            <Button
              size="lg"
              variant="outline"
              onClick={() => trackEvent('precheck_start', {})}
              className="text-lg px-10 py-6 h-auto border-2 border-primary-600 text-primary-700 hover:bg-primary-50"
            >
              {tPreCheck('cta')}
            </Button>
            <p className="text-sm text-gray-500 mt-6">
              {tPreCheck('disclaimer')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}