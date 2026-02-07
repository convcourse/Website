'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Mail, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from '@/navigation';
import { trackEvent } from '@/components/Analytics';
import { useTranslations } from 'next-intl';

export default function RecuperarContrasenaPage() {
  const t = useTranslations('auth');
  const tErrors = useTranslations('errors');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; general?: string }>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return tErrors('invalidEmail');
    if (!emailRegex.test(email)) return tErrors('invalidEmail');
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validación
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    setIsLoading(true);
    trackEvent('password_recovery_attempt', { email });

    // Simulación de envío de email
    setTimeout(() => {
      const sendSuccess = Math.random() > 0.2; // 80% éxito

      if (!sendSuccess) {
        setErrors({
          general: 'No se encontró una cuenta con este correo electrónico.', // Add to translations if needed
        });
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setEmailSent(true);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 py-24 px-4 sm:px-6 lg:px-8 pt-32">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-md w-full space-y-8">
        {/* Recovery Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl border border-gray-200/30 p-8 space-y-6"
        >
          {/* Logo and Header */}
          <div className="text-center">
            <Link href="/" className="inline-flex items-center justify-center space-x-3 mb-6 group">
              <div className="relative">
                <Shield className="h-12 w-12 text-primary-600 transition-transform group-hover:scale-110" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <span className="text-3xl font-bold text-gray-900">Certified</span>
            </Link>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {t('resetPassword')}
            </h2>
            <p className="text-gray-600">
              {emailSent
                ? t('resetEmailSent')
                : t('checkYourEmail')
              }
            </p>
          </div>

          {!emailSent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error General */}
              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3"
                >
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-800">{errors.general}</p>
                  </div>
                </motion.div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('email')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Mail className={`h-5 w-5 ${errors.email ? 'text-red-400' : 'text-gray-400'}`} />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) {
                        setErrors({ ...errors, email: '' });
                      }
                    }}
                    onBlur={(e) => {
                      const error = validateEmail(e.target.value);
                      if (error) setErrors({ ...errors, email: error });
                    }}
                    className={`pl-10 h-12 ${errors.email ? 'border-red-300 focus-visible:ring-red-600' : ''}`}
                    placeholder="tu@universidad.edu"
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-600 flex items-center space-x-1"
                  >
                    <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{errors.email}</span>
                  </motion.p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    {t('sendResetLink')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <div className="text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('backToLogin')}
                </Link>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('resetEmailSent')}
                </h3>
                <p className="text-sm text-gray-600">
                  Hemos enviado las instrucciones para restablecer tu contraseña a{' '}
                  <span className="font-medium text-gray-900">{email}</span>
                </p>
              </div>

              <div className="pt-4 space-y-3">
                <p className="text-xs text-gray-500">
                  ¿No has recibido el email? Revisa tu carpeta de spam o{' '}
                  <button
                    onClick={() => setEmailSent(false)}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    intenta de nuevo
                  </button>
                </p>

                <Link
                  href="/login"
                  className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('backToLogin')}
                </Link>
              </div>
            </div>
          )}

          {/* Trust Badges */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Conexión segura</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4 text-primary-600" />
                <span>GDPR compliant</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-sm text-gray-600">
            ¿Necesitas ayuda?{' '}
            <Link
              href="/contacto"
              className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              Contacta con soporte
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
