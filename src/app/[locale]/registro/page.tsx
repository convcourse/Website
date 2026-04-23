'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toast, useToast } from '@/components/ui/toast';
import { Shield, Mail, Lock, Eye, EyeOff, CheckCircle, ArrowRight, User, Building2 } from 'lucide-react';
import { Link, useRouter } from '@/navigation';
import { trackEvent } from '@/components/Analytics';
import { useTranslations } from 'next-intl';

export default function RegisterPage() {
  const t = useTranslations('auth');
  const tErrors = useTranslations('errors');
  const tPassword = useTranslations('passwordStrength');
  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/$/, '');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<'student' | 'university'>('student');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    institution?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
    general?: string;
  }>({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const router = useRouter();
  const { toast, showToast, hideToast } = useToast();

  interface Universidad {
    id: number;
    number: string;
    logo: string;
    url: string;
  }

  const [universidades, setUniversidades] = useState<Universidad[]>([]);
  const [isLoadingUniversidades, setIsLoadingUniversidades] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const loadUniversidades = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/universidades`);
        if (!res.ok) throw new Error('Error al cargar universidades');
        const data = await res.json();
        setUniversidades(Array.isArray(data) ? data : []);
      } catch (e) {
        showToast('No se pudieron cargar las universidades. Revisa la conexión con el backend.', 'error');
      } finally {
        setIsLoadingUniversidades(false);
      }
    };

    loadUniversidades();
  }, [showToast]);

  const validateName = (name: string) => {
    if (!name) return tErrors('nameRequired');
    if (name.length < 3) return tErrors('nameRequired'); // Simplified
    return '';
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return tErrors('invalidEmail');
    if (!emailRegex.test(email)) return tErrors('invalidEmail');
    return '';
  };

  const validateInstitution = (institution: string) => {
    if (!institution) return tErrors('institutionRequired');
    return '';
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  };

  const validatePassword = (password: string) => {
    if (!password) return tErrors('passwordTooShort');
    if (password.length < 8) return tErrors('passwordTooShort');
    if (!/[A-Z]/.test(password)) return 'Incluye al menos una letra mayúscula';
    if (!/[0-9]/.test(password)) return 'Incluye al menos un número';
    return '';
  };

  const validateConfirmPassword = (confirmPassword: string, password: string) => {
    if (!confirmPassword) return tErrors('passwordMismatch');
    if (confirmPassword !== password) return tErrors('passwordMismatch');
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Verificar checkbox de términos
    const termsCheckbox = document.getElementById('terms') as HTMLInputElement;
    const termsAccepted = termsCheckbox?.checked;

    // Validación
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const institutionError = validateInstitution(formData.institution);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password);
    const termsError = !termsAccepted ? tErrors('termsRequired') : '';

    if (nameError || emailError || institutionError || passwordError || confirmPasswordError || termsError) {
      setErrors({
        name: nameError,
        email: emailError,
        institution: institutionError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
        terms: termsError,
      });
      return;
    }

    setIsLoading(true);
    trackEvent('register_attempt', { method: 'email', userType });

    try {
      // Comprobar si ya existe una cuenta con ese email
      const existsRes = await fetch(`${apiBaseUrl}/usuarios/email/${encodeURIComponent(formData.email)}`);
      if (existsRes.ok) {
        showToast('Ya existe una cuenta con este correo. Inicia sesión.', 'error');
        setErrors({ general: 'Ya existe una cuenta con este correo. Inicia sesión.' });
        return;
      }
      if (existsRes.status !== 404) {
        showToast('No se pudo comprobar el email. Inténtalo de nuevo.', 'error');
        setErrors({ general: 'No se pudo comprobar el email' });
        return;
      }

      const tipoId = userType === 'university' ? 4 : 3;

      const registerRes = await fetch(`${apiBaseUrl}/register`, {  
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          nombrecompleto: formData.name,
          universidadId: formData.institution,
          tipoId,
          password: formData.password,
        }),
      });

      const rawText = await registerRes.text();
      let registerData: any = rawText;
      try {
        registerData = rawText ? JSON.parse(rawText) : rawText;
      } catch {
        registerData = rawText;
      }

      const numericId = typeof registerData === 'number'
        ? registerData
        : (typeof registerData === 'string' && registerData.trim() !== '' && !Number.isNaN(Number(registerData)))
          ? Number(registerData)
          : null;

      if (!registerRes.ok || numericId === null) {
        const detail = registerData && typeof registerData === 'object' && 'detail' in registerData ? String(registerData.detail) : '';
        showToast(detail || 'Error al crear la cuenta. Por favor, inténtalo de nuevo.', 'error');
        setErrors({ general: detail || tErrors('registerError') });
        return;
      }

      const selectedUni = universidades.find((u) => String(u.id) === String(formData.institution));
      const institutionName = selectedUni?.number ?? '';

      localStorage.setItem('currentUserId', String(numericId));
      localStorage.setItem('userId', String(numericId));
      localStorage.setItem('currentUser', JSON.stringify({
        id: numericId,
        name: formData.name,
        email: formData.email,
        institution: institutionName,
        tipoId: userType === 'university' ? 4 : 3,
        userType,
        registeredAt: new Date().toISOString(),
      }));

      showToast('¡Cuenta creada! Accediendo al dashboard...', 'success');
      setIsRedirecting(true);
      router.push('/dashboard');
    } catch (error) {
      showToast(`No se pudo conectar con el servidor. Revisa que el backend esté en ${apiBaseUrl}.`, 'error');
      setErrors({ general: 'Error de conexión' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Limpiar error del campo
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: '' });
    }

    // Calcular fuerza de contraseña
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

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
        {/* Register Card */}
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
              {t('register')}
            </h2>
            <p className="text-gray-600">
              Únete a la revolución de las convalidaciones
            </p>
          </div>

          {/* User Type Selector */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setUserType('student')}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${userType === 'student'
                ? 'border-primary-600 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              <User className={`h-6 w-6 mx-auto mb-2 ${userType === 'student' ? 'text-primary-600' : 'text-gray-400'}`} />
              <span className={`text-sm font-medium ${userType === 'student' ? 'text-primary-600' : 'text-gray-600'}`}>
                {t('iAmStudent')}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setUserType('university')}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${userType === 'university'
                ? 'border-primary-600 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              <Building2 className={`h-6 w-6 mx-auto mb-2 ${userType === 'university' ? 'text-primary-600' : 'text-gray-400'}`} />
              <span className={`text-sm font-medium ${userType === 'university' ? 'text-primary-600' : 'text-gray-600'}`}>
                {t('iAmUniversity')}
              </span>
            </button>
          </div>

          {/* Register Form */}
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                {t('fullName')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <User className={`h-5 w-5 ${errors.name ? 'text-red-400' : 'text-gray-400'}`} aria-hidden="true" />
                </div>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={(e) => {
                    const error = validateName(e.target.value);
                    if (error) setErrors({ ...errors, name: error });
                  }}
                  className={`pl-10 h-12 ${errors.name ? 'border-red-300 focus-visible:ring-red-600' : ''}`}
                  placeholder="Tu nombre completo"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
              </div>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="name-error"
                  className="mt-1 text-sm text-red-600 flex items-center space-x-1"
                  role="alert"
                >
                  <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{errors.name}</span>
                </motion.p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('email')} {userType === 'university' && 'institucional'}
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
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={(e) => {
                    const error = validateEmail(e.target.value);
                    if (error) setErrors({ ...errors, email: error });
                  }}
                  className={`pl-10 h-12 ${errors.email ? 'border-red-300 focus-visible:ring-red-600' : ''}`}
                  placeholder={userType === 'university' ? 'secretaria@universidad.com' : 'tu@email.com'}
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
              <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-2">
                {t('institution')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Building2 className={`h-5 w-5 ${errors.institution ? 'text-red-400' : 'text-gray-400'}`} aria-hidden="true" />
                </div>
                <select
                  id="institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  onBlur={(e) => {
                    const error = validateInstitution(e.target.value);
                    if (error) setErrors({ ...errors, institution: error });
                  }}
                  disabled={isLoadingUniversidades}
                  className={`w-full h-12 rounded-md border border-input bg-background px-3 py-2 text-sm pl-10 ${errors.institution ? 'border-red-300 focus-visible:ring-red-600' : ''}`}
                  aria-invalid={!!errors.institution}
                  aria-describedby={errors.institution ? "institution-error" : undefined}
                >
                  <option value="" disabled>
                    {isLoadingUniversidades ? 'Cargando universidades...' : 'Selecciona tu universidad'}
                  </option>
                  {universidades.map((u) => (
                    <option key={u.id} value={String(u.id)}>
                      {u.number}
                    </option>
                  ))}
                </select>
              </div>
              {errors.institution && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="institution-error"
                  className="mt-1 text-sm text-red-600 flex items-center space-x-1"
                  role="alert"
                >
                  <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{errors.institution}</span>
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
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={(e) => {
                    const error = validatePassword(e.target.value);
                    if (error) setErrors({ ...errors, password: error });
                  }}
                  className={`pl-10 pr-10 h-12 ${errors.password ? 'border-red-300 focus-visible:ring-red-600' : ''}`}
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : "password-strength"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors z-10"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
                </button>
              </div>
              {/* Password Strength Meter */}
              {formData.password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2"
                  id="password-strength"
                  role="progressbar"
                  aria-valuenow={passwordStrength}
                  aria-valuemin={0}
                  aria-valuemax={5}
                  aria-label="Fortaleza de la contraseña"
                >
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-colors ${level <= passwordStrength
                          ? passwordStrength <= 2
                            ? 'bg-red-500'
                            : passwordStrength <= 3
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                          : 'bg-gray-200'
                          }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs mt-1 ${passwordStrength <= 2
                    ? 'text-red-600'
                    : passwordStrength <= 3
                      ? 'text-yellow-600'
                      : 'text-green-600'
                    }`}>
                    {passwordStrength <= 2 && tPassword('weak')}
                    {passwordStrength === 3 && tPassword('good')}
                    {passwordStrength >= 4 && tPassword('strong')}
                  </p>
                </motion.div>
              )}
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="password-error"
                  className="mt-1 text-sm text-red-600 flex items-center space-x-1"
                  role="alert"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{errors.password}</span>
                </motion.p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                {t('confirmPassword')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock className={`h-5 w-5 ${errors.confirmPassword ? 'text-red-400' : formData.confirmPassword && formData.confirmPassword === formData.password ? 'text-green-400' : 'text-gray-400'}`} aria-hidden="true" />
                </div>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={(e) => {
                    const error = validateConfirmPassword(e.target.value, formData.password);
                    if (error) setErrors({ ...errors, confirmPassword: error });
                  }}
                  className={`pl-10 pr-10 h-12 ${errors.confirmPassword
                    ? 'border-red-300 focus-visible:ring-red-600'
                    : formData.confirmPassword && formData.confirmPassword === formData.password
                      ? 'border-green-300 focus-visible:ring-green-600'
                      : ''
                    }`}
                  placeholder="••••••••"
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors z-10"
                  aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
                </button>
              </div>
              {formData.confirmPassword && formData.confirmPassword === formData.password && !errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-green-600 flex items-center space-x-1"
                  role="status"
                >
                  <CheckCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Las contraseñas coinciden</span>
                </motion.p>
              )}
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="confirm-password-error"
                  className="mt-1 text-sm text-red-600 flex items-center space-x-1"
                  role="alert"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{errors.confirmPassword}</span>
                </motion.p>
              )}
            </div>

            {/* Terms acceptance */}
            <div>
              <div className="flex items-start">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  onChange={() => {
                    if (errors.terms) {
                      setErrors({ ...errors, terms: '' });
                    }
                  }}
                  className={`h-4 w-4 mt-1 text-primary-600 focus:ring-primary-600 border-gray-300 rounded cursor-pointer ${errors.terms ? 'border-red-300' : ''
                    }`}
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                  {t('acceptTerms')}{' '}
                  <Link href="/terminos" className="text-primary-600 hover:text-primary-700 font-medium">
                    {t('termsOfService')}
                  </Link>
                  {' '}{t('and')}{' '}
                  <Link href="/privacidad" className="text-primary-600 hover:text-primary-700 font-medium">
                    {t('privacyPolicy')}
                  </Link>
                </label>
              </div>
              {errors.terms && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-600 flex items-center space-x-1"
                >
                  <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{errors.terms}</span>
                </motion.p>
              )}
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
                  Creando cuenta...
                </>
              ) : (
                <>
                  {t('createAccount')}
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

        {/* Login Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-sm text-gray-600">
            {t('hasAccount')}{' '}
            <Link
              href="/login"
              className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              {t('loginButton')}
            </Link>
          </p>
          <p className="mt-4 text-xs text-gray-500">
            Al continuar, aceptas nuestros{' '}
            <Link href="/terminos" className="text-primary-600 hover:text-primary-700">
              {t('termsOfService')}
            </Link>
            {' '}{t('and')}{' '}
            <Link href="/privacidad" className="text-primary-600 hover:text-primary-700">
              {t('privacyPolicy')}
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
