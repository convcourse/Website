'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toast, useToast } from '@/components/ui/toast';
import { Shield, Mail, Lock, Eye, EyeOff, CheckCircle, ArrowRight } from 'lucide-react';
import { Link, useRouter } from '@/navigation';
import { trackEvent } from '@/components/Analytics';
import { useTranslations } from 'next-intl';


export default function LoginPage() {
  const t = useTranslations('auth');
  const tErrors = useTranslations('errors');
  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/$/, '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const router = useRouter();
  const { toast, showToast, hideToast } = useToast();

  // Check if user is already logged in and redirect to dashboard
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      router.push('/dashboard');
    }
  }, [router]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return tErrors('invalidEmail'); // Simplified validation message for empty too
    if (!emailRegex.test(email)) return tErrors('invalidEmail');
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) return tErrors('passwordTooShort'); // Simplified
    if (password.length < 6) return tErrors('passwordTooShort');
    return '';
  };

  const normalizeUser = (apiUser: any, userEmail: string, userId: number) => {
    const rawUserType = apiUser?.userType ?? apiUser?.user_type;
    const userType: 'student' | 'university' = rawUserType === 'university' ? 'university' : 'student';

    return {
      name: apiUser?.name ?? apiUser?.nombre ?? userEmail.split('@')[0] ?? 'Usuario',
      email: apiUser?.email ?? userEmail,
      institution: apiUser?.institution ?? apiUser?.institucion ?? '',
      userType,
      registeredAt: apiUser?.registeredAt ?? apiUser?.registered_at ?? new Date().toISOString(),
      id: userId,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validación
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    setIsLoading(true);
    trackEvent('login_attempt', { method: 'email' });

    try {
      // 1) Comprobar que el email existe
      const existsRes = await fetch(`${apiBaseUrl}/usuarios/email/${encodeURIComponent(email)}`);
      if (!existsRes.ok) {
        showToast('Usuario no registrado. Por favor, regístrate primero.', 'error');
        setErrors({ general: 'Usuario no encontrado' });
        return;
      }

      let apiUser: any = null;
      try {
        apiUser = await existsRes.json();
      } catch {
        apiUser = null;
      }

      // 2) Login
      const loginRes = await fetch(`${apiBaseUrl}/login`, {  
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const rawText = await loginRes.text();
      let loginData: any = rawText;
      try {
        loginData = rawText ? JSON.parse(rawText) : rawText;
      } catch {
        loginData = rawText;
      }

      const numericId = typeof loginData === 'number'
        ? loginData
        : (typeof loginData === 'string' && loginData.trim() !== '' && !Number.isNaN(Number(loginData)))
          ? Number(loginData)
          : null;

      // 3) Guardar id y redirigir
      if (numericId !== null) {
        localStorage.setItem('currentUserId', String(numericId));
        localStorage.setItem('userId', String(numericId));
        const currentUser = normalizeUser(apiUser, email, numericId);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        showToast(`¡Bienvenido/a ${currentUser.name}! Has iniciado sesión correctamente.`, 'success');
        setIsRedirecting(true);
        router.push('/dashboard');
        return;
      }

      if (loginData && typeof loginData === 'object' && 'detail' in loginData && loginData.detail === 'Credenciales incorrectas') {
        showToast('El email o la contraseña está incorrecto. Prueba con otra.', 'error');
        setErrors({ general: 'Email o contraseña incorrectos' });
        return;
      }

      showToast('Error al iniciar sesión. Por favor, inténtalo de nuevo.', 'error');
      setErrors({ general: 'Error al iniciar sesión' });
    } catch (error) {
      showToast(`No se pudo conectar con el servidor. Revisa que el backend esté en ${apiBaseUrl}.`, 'error');
      setErrors({ general: 'Error de conexión' });
    } finally {
      setIsLoading(false);
    }
  };

  // Si no está logueado, mostrar formulario de login
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 py-24 px-4 sm:px-6 lg:px-8 pt-32">
      {isRedirecting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-xl">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
            <p className="text-sm font-medium text-gray-700">Accediendo al dashboard...</p>
          </div>
        </div>
      )}
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-md w-full space-y-8">
        {/* Login Card */}
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
              {t('login')}
            </h2>
            <p className="text-gray-600">
              {t('hasAccount')}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error General */}
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3"
                role="alert"
              >
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
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
                  <Mail className={`h-5 w-5 ${errors.email ? 'text-red-400' : 'text-gray-400'}`} aria-hidden="true" />
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
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="email-error"
                  className="mt-1 text-sm text-red-600 flex items-center space-x-1"
                  role="alert"
                >
                  <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{errors.email}</span>
                </motion.p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {t('password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock className={`h-5 w-5 ${errors.password ? 'text-red-400' : 'text-gray-400'}`} aria-hidden="true" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors({ ...errors, password: '' });
                    }
                  }}
                  onBlur={(e) => {
                    const error = validatePassword(e.target.value);
                    if (error) setErrors({ ...errors, password: error });
                  }}
                  className={`pl-10 pr-10 h-12 ${errors.password ? 'border-red-300 focus-visible:ring-red-600' : ''}`}
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors z-10"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="password-error"
                  className="mt-1 text-sm text-red-600 flex items-center space-x-1"
                  role="alert"
                >
                  <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{errors.password}</span>
                </motion.p>
              )}
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-600 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                  Recordarme
                </label>
              </div>

              <Link
                href="/recuperar-contrasena"
                className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                {t('forgotPassword')}
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Iniciando sesión...
                </>
              ) : (
                <>
                  {t('loginButton')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>

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

        {/* Sign Up Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-sm text-gray-600">
            {t('noAccount')}{' '}
            <Link
              href="/registro"
              className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              {t('register')}
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          variant={toast.variant}
          show={toast.show}
          onClose={hideToast}
        />
      )}
    </div>
  );
}
