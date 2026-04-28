'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Toast, useToast } from '@/components/ui/toast';
import {
  Upload,
  FileText,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Play,
  Clock,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Trash2,
  Loader2,
  ChevronRight,
  Search
} from 'lucide-react';

export default function ConvalidacionPage() {
  const [showDemo, setShowDemo] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(0);
  const createdPreviewUrls = useRef<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: { name: string, size: string, uploaded: boolean, previewUrl?: string } }>({});
  const [currentStep, setCurrentStep] = useState('upload'); // 'upload', 'loading', 'results'
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [uploadNotification, setUploadNotification] = useState<{ show: boolean, fileName: string }>({ show: false, fileName: '' });
  const [dragActive, setDragActive] = useState<string | null>(null);
  const { toast, showToast, hideToast } = useToast();

  const loadingMessages = [
    'Analizando documentos con IA...',
    'Extrayendo información académica...',
    'Comparando con base de datos de currículos...',
    'Calculando similitudes entre materias...',
    'Aplicando algoritmos de convalidación...',
    'Generando reporte final...'
  ];

  const handleStartDemo = () => {
    setShowDemo(true);
  };

  useEffect(() => {
    return () => {
      createdPreviewUrls.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  // Validate file format
  const validateFileFormat = (file: File, docId: string): boolean => {
    const fileName = file.name.toLowerCase();
    const allowedExtensions = docId === 'boletin-calificaciones'
      ? ['.pdf', '.doc', '.docx']
      : ['.pdf', '.zip', '.7z'];

    const isValid = allowedExtensions.some(ext => fileName.endsWith(ext));

    if (!isValid) {
      const allowedFormats = allowedExtensions.join(', ').toUpperCase();
      showToast(
        `Formato no válido. Solo se permiten archivos: ${allowedFormats}`,
        'error'
      );
    }

    return isValid;
  };

  const handleFileUpload = (docId: string, file: File) => {
    if (file) {
      // Validate format first
      if (!validateFileFormat(file, docId)) {
        return;
      }

      // Format file size
      const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
      };

      const isPdf = file.name.toLowerCase().endsWith('.pdf');
      const previewUrl = isPdf ? URL.createObjectURL(file) : undefined;
      if (previewUrl) createdPreviewUrls.current.push(previewUrl);

      setUploadedFiles(prev => ({
        ...prev,
        [docId]: {
          name: file.name,
          size: formatFileSize(file.size),
          uploaded: true,
          previewUrl
        }
      }));

      setUploadedCount(prev => prev + 1);

      // Show upload notification
      setUploadNotification({ show: true, fileName: file.name });

      // Auto-hide notification after 3 seconds
      setTimeout(() => {
        setUploadNotification({ show: false, fileName: '' });
      }, 3000);
    }
  };

  const handleRemoveFile = (docId: string) => {
    if (uploadedFiles[docId]?.uploaded) {
      setUploadedFiles(prev => {
        const prevUrl = prev[docId]?.previewUrl;
        if (prevUrl) {
          URL.revokeObjectURL(prevUrl);
          createdPreviewUrls.current = createdPreviewUrls.current.filter((url) => url !== prevUrl);
        }

        return {
          ...prev,
          [docId]: { ...prev[docId], uploaded: false, previewUrl: undefined }
        };
      });
      setUploadedCount(prev => prev - 1);

      // Reset the file input
      const fileInput = document.getElementById(`file-input-${docId}`) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent, docId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(docId);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(null);
  };

  const handleDrop = (e: React.DragEvent, docId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(null);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (!uploadedFiles[docId]?.uploaded) {
        handleFileUpload(docId, file);
      }
    }
  };

  const handleStartConvalidation = () => {
    setCurrentStep('loading');
    setLoadingProgress(0);

    // Simulate loading process
    let messageIndex = 0;
    const interval = setInterval(() => {
      if (messageIndex < loadingMessages.length) {
        setLoadingMessage(loadingMessages[messageIndex]);
        setLoadingProgress(((messageIndex + 1) / loadingMessages.length) * 100);
        messageIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentStep('results');
        }, 1000);
      }
    }, 2000);
  };

  const handleRestartDemo = () => {
    createdPreviewUrls.current.forEach((url) => URL.revokeObjectURL(url));
    createdPreviewUrls.current = [];

    setCurrentStep('upload');
    setUploadedCount(0);
    setUploadedFiles({});
    setLoadingProgress(0);
    setLoadingMessage('');
  };

  return (
    <main className="min-h-screen bg-surface-50 pt-16">
      {/* Upload Success Notification */}
      <AnimatePresence>
        {uploadNotification.show && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 right-4 z-50"
            role="alert"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center space-x-3 max-w-md border border-green-500">
              <div className="flex-shrink-0">
                <CheckCircle className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">¡Archivo subido correctamente!</p>
                <p className="text-xs text-green-100 truncate" title={uploadNotification.fileName}>
                  {uploadNotification.fileName}
                </p>
              </div>
              <button
                onClick={() => setUploadNotification({ show: false, fileName: '' })}
                className="flex-shrink-0 text-green-100 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600 rounded p-1"
                aria-label="Cerrar notificación"
              >
                <XCircle className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      {!showDemo && (
        <section className="relative py-24 overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-primary-900">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-950"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.05]"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center space-x-2 bg-primary-800/50 border border-primary-700/50 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
                  <Sparkles className="h-4 w-4 text-accent-400" />
                  <span className="text-sm font-medium text-primary-100">Demo Interactiva v2.0</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                  Prueba Nuestro <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-200">Sistema IA</span>
                </h1>

                <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto mb-12 leading-relaxed">
                  Experimenta en tiempo real cómo nuestra tecnología de convalidación automática analiza, compara y valida expedientes académicos en segundos.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 max-w-4xl mx-auto border border-white/10 shadow-2xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                  <div className="text-center p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-3xl font-bold text-accent-400 mb-1">~2 min</div>
                    <div className="text-sm text-primary-200">Tiempo de análisis</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-3xl font-bold text-accent-400 mb-1">3 docs</div>
                    <div className="text-sm text-primary-200">Documentos requeridos</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-3xl font-bold text-accent-400 mb-1">95%</div>
                    <div className="text-sm text-primary-200">Precisión del sistema</div>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-8 text-left flex items-start">
                  <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-amber-200">Demo Educativa</p>
                    <p className="text-sm text-amber-200/80">Los resultados mostrados son simulados para demostrar las capacidades del sistema sin requerir datos reales.</p>
                  </div>
                </div>

                <Button
                  onClick={handleStartDemo}
                  size="lg"
                  variant="glow"
                  className="text-lg px-10 py-8 h-auto w-full sm:w-auto"
                >
                  <Play className="w-5 h-5 mr-3 fill-current" />
                  Comenzar Demo Interactiva
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {!showDemo && (
        <section className="py-24 bg-surface-50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
                Características de Nuestra IA
              </h2>
              <p className="text-xl text-primary-600 max-w-3xl mx-auto">
                Tecnología avanzada para garantizar precisión y confiabilidad en cada convalidación
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-primary-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8 text-center pt-12">
                  <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <ShieldCheck className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-900 mb-3">IA Contrastada</h3>
                  <p className="text-primary-600 leading-relaxed">
                    Cada decisión incluye explicaciones detalladas y porcentajes de similitud basados en análisis semántico profundo.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8 text-center pt-12">
                  <div className="w-14 h-14 bg-accent-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <Clock className="w-7 h-7 text-accent-600" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-900 mb-3">Procesamiento Rápido</h3>
                  <p className="text-primary-600 leading-relaxed">
                    Análisis completo de expedientes complejos en menos de 2 minutos, reduciendo el tiempo administrativo en un 90%.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8 text-center pt-12">
                  <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-900 mb-3">Alta Precisión</h3>
                  <p className="text-primary-600 leading-relaxed">
                    95% de precisión validada en más de 50,000 convalidaciones reales entre instituciones internacionales.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Demo Container */}
      <AnimatePresence mode="wait">
        {showDemo && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen py-20 relative overflow-hidden"
          >
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-10 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
              <div className="absolute bottom-40 right-20 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              {/* Upload Documents Step */}
              {currentStep === 'upload' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-soft border border-white/20 p-8 md:p-12"
                >
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl mb-6 shadow-sm">
                      <Upload className="w-8 h-8 text-primary-600" />
                    </div>

                    <h2 className="text-3xl font-bold text-primary-900 mb-4">
                      Paso 1: Subir Documentos
                    </h2>

                    <p className="text-lg text-primary-600 mb-6">
                      Arrastra tus documentos a cada recuadro o haz clic para seleccionar archivos
                    </p>

                    <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 max-w-2xl mx-auto flex items-center justify-center text-blue-700">
                      <Sparkles className="w-5 h-5 mr-2" aria-hidden="true" />
                      <span className="text-sm font-medium">Guías: PDF, ZIP o 7Z | Boletín: PDF, DOC o DOCX</span>
                    </div>
                  </div>

                  {/* Progress indicator */}
                  <div className="mb-10 max-w-3xl mx-auto">
                    <div className="flex items-center justify-between text-sm font-medium text-primary-500 mb-3">
                      <span>Progreso de subida</span>
                      <span aria-live="polite" aria-atomic="true">{uploadedCount}/3 documentos</span>
                    </div>
                    <div
                      className="w-full bg-primary-100 rounded-full h-2.5 overflow-hidden"
                      role="progressbar"
                      aria-valuenow={uploadedCount}
                      aria-valuemin={0}
                      aria-valuemax={3}
                      aria-label="Progreso de subida de documentos"
                    >
                      <motion.div
                        className="bg-gradient-to-r from-primary-500 to-accent-500 h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(uploadedCount / 3) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Upload zones */}
                    {[
                      {
                        id: 'guias-origen',
                        title: 'Guías Docentes Origen',
                        desc: 'Programas de Asignaturas y Plan de Estudios.',
                        icon: FileText
                      },
                      {
                        id: 'guias-destino',
                        title: 'Guías Docentes Destino',
                        desc: 'Plan Universidad Destino y programas detallados.',
                        icon: FileCheck
                      },
                      {
                        id: 'boletin-calificaciones',
                        title: 'Boletín de Calificaciones',
                        desc: 'Certificado de Notas oficial del alumno.',
                        icon: ShieldCheck
                      }
                    ].map((doc) => {
                      const isUploaded = uploadedFiles[doc.id]?.uploaded;
                      const fileInfo = uploadedFiles[doc.id];
                      const Icon = doc.icon;

                      return (
                        <div
                          key={doc.id}
                          onClick={() => {
                            if (!isUploaded) {
                              const fileInput = document.getElementById(`file-input-${doc.id}`) as HTMLInputElement;
                              fileInput?.click();
                            }
                          }}
                          onKeyDown={(e) => {
                            if (!isUploaded && (e.key === 'Enter' || e.key === ' ')) {
                              e.preventDefault();
                              const fileInput = document.getElementById(`file-input-${doc.id}`) as HTMLInputElement;
                              fileInput?.click();
                            }
                          }}
                          onDragOver={(e) => !isUploaded && handleDragOver(e, doc.id)}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => !isUploaded && handleDrop(e, doc.id)}
                          role="button"
                          tabIndex={isUploaded ? -1 : 0}
                          aria-label={`${doc.title}. ${isUploaded ? 'Archivo subido: ' + fileInfo?.name : 'Haz clic o arrastra para subir archivo'}`}
                          aria-describedby={`desc-${doc.id}`}
                          className={`
                            relative group cursor-pointer rounded-xl p-6 text-center transition-all duration-300 border-2 border-dashed
                            ${isUploaded
                              ? 'border-green-500/50 bg-green-50/50'
                              : dragActive === doc.id
                                ? 'border-accent-500 bg-accent-100/50 scale-105 shadow-lg'
                                : 'border-primary-200 hover:border-accent-400 hover:bg-accent-50/30 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2'
                            }
                          `}
                        >
                          {/* Hidden file input */}
                          <input
                            id={`file-input-${doc.id}`}
                            type="file"
                            accept={doc.id === 'boletin-calificaciones' ? '.pdf,.doc,.docx' : '.pdf,.zip,.7z'}
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file && !isUploaded) {
                                handleFileUpload(doc.id, file);
                              }
                            }}
                            aria-label={`Seleccionar archivo para ${doc.title}`}
                          />

                          {!isUploaded ? (
                            <>
                              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                                <Icon className="mx-auto h-10 w-10 text-primary-300 group-hover:text-accent-500" />
                              </div>
                              <h3 className="text-sm font-bold text-primary-900 mb-2">{doc.title}</h3>
                              <p id={`desc-${doc.id}`} className="text-xs text-primary-500 mb-4 min-h-[2.5rem]">{doc.desc}</p>
                              <span className="text-xs font-semibold text-accent-600 bg-accent-50 px-3 py-1 rounded-full">
                                + Subir archivo
                              </span>
                            </>
                          ) : (
                            <>
                              <div className="absolute top-3 right-3">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveFile(doc.id);
                                  }}
                                  className="text-red-400 hover:text-red-600 transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
                                  aria-label={`Eliminar archivo ${fileInfo?.name}`}
                                >
                                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                                </button>
                              </div>
                              <div className="mb-4" aria-hidden="true">
                                <CheckCircle className="mx-auto h-10 w-10 text-green-500" />
                              </div>
                              <h3 className="text-sm font-bold text-green-900 mb-2">{doc.title}</h3>
                              <div className="bg-white/80 rounded-lg p-3 border border-green-100 text-left">
                                <div className="flex items-center space-x-2">
                                  <div className="bg-red-100 p-1.5 rounded">
                                    <FileText className="h-4 w-4 text-red-500" aria-hidden="true" />
                                  </div>
                                  <div className="overflow-hidden">
                                    <p className="text-xs font-medium text-primary-900 truncate" title={fileInfo?.name}>{fileInfo?.name}</p>
                                    <p className="text--[10px] text-primary-500">{fileInfo?.size}</p>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-center">
                    <Button
                      onClick={handleStartConvalidation}
                      disabled={uploadedCount < 3}
                      size="lg"
                      variant={uploadedCount >= 3 ? "glow" : "outline"}
                      className={`
                        px-12 py-6 text-lg h-auto transition-all duration-300
                        ${uploadedCount >= 3 ? 'transform hover:scale-105' : 'opacity-50 cursor-not-allowed'}
                      `}
                    >
                      {uploadedCount >= 3 ? (
                        <>
                          <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                          Iniciar Análisis de Convalidación
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      ) : (
                        'Sube los 3 documentos para continuar'
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Loading Step */}
              {currentStep === 'loading' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-soft border border-white/20 p-16 text-center max-w-3xl mx-auto"
                >
                  <div className="mb-8 relative inline-block">
                    <div className="absolute inset-0 bg-accent-400/20 blur-xl rounded-full animate-pulse"></div>
                    <Loader2 className="w-20 h-20 text-accent-500 animate-spin relative z-10" />
                  </div>

                  <h2 className="text-3xl font-bold text-primary-900 mb-6">
                    Procesando con IA
                  </h2>

                  <div className="max-w-lg mx-auto">
                    <div className="h-16 flex items-center justify-center mb-8">
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={loadingMessage}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-xl text-primary-600 font-medium"
                        >
                          {loadingMessage}
                        </motion.p>
                      </AnimatePresence>
                    </div>

                    <div className="w-full bg-primary-100 rounded-full h-3 mb-4 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-primary-500 to-accent-500 h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${loadingProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <p className="text-sm text-primary-400 font-mono">{Math.round(loadingProgress)}%</p>
                  </div>
                </motion.div>
              )}

              {/* Results Step */}
              {currentStep === 'results' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  {/* Header */}
                  <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-soft border border-white/20 p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-6 shadow-sm">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>

                    <h2 className="text-3xl font-bold text-primary-900 mb-4">
                      Reporte de Convalidación Generado
                    </h2>

                    <p className="text-lg text-primary-600 mb-8">
                      Análisis completo de equivalencias académicas con IA contrastada
                    </p>

                    {/* Enhanced Summary Stats */}
                    <div className="bg-gradient-to-br from-surface-50 to-primary-50/50 rounded-xl p-8 border border-primary-100">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center relative">
                          <div className="text-4xl font-bold text-green-600 mb-2">18</div>
                          <div className="text-sm font-bold text-primary-900 uppercase tracking-wide mb-1">Convalidables</div>
                          <div className="text-xs text-primary-500">72% del total</div>
                          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-primary-200"></div>
                        </div>

                        <div className="text-center relative">
                          <div className="text-4xl font-bold text-amber-500 mb-2">4</div>
                          <div className="text-sm font-bold text-primary-900 uppercase tracking-wide mb-1">Por Revisar</div>
                          <div className="text-xs text-primary-500">16% del total</div>
                          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-primary-200"></div>
                        </div>

                        <div className="text-center">
                          <div className="text-4xl font-bold text-red-500 mb-2">3</div>
                          <div className="text-sm font-bold text-primary-900 uppercase tracking-wide mb-1">No Convalidables</div>
                          <div className="text-xs text-primary-500">12% del total</div>
                        </div>
                      </div>

                      <div className="border-t border-primary-100 mt-8 pt-6">
                        <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-medium">
                          <Sparkles className="w-4 h-4 mr-2" />
                          72 créditos convalidados automáticamente
                        </div>
                      </div>
                    </div>
                  </div>

                  {uploadedFiles['guias-origen']?.previewUrl && uploadedFiles['guias-destino']?.previewUrl && (
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-soft border border-white/20 p-6 w-[90vw] max-w-none relative left-1/2 -translate-x-1/2">
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <h3 className="text-lg font-bold text-primary-900">Documentos PDF</h3>
                        <div className="text-sm text-primary-600">
                          Porcentaje de parecido: <span className="font-semibold">94%</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="rounded-xl overflow-hidden border border-gray-200 bg-white">
                          <div className="px-4 py-2 text-xs font-medium text-gray-600 border-b">
                            {uploadedFiles['guias-origen']?.name}
                          </div>
                          <iframe
                            title="PDF origen"
                            src={uploadedFiles['guias-origen']?.previewUrl}
                            className="w-full h-[70vh]"
                          />
                        </div>
                        <div className="rounded-xl overflow-hidden border border-gray-200 bg-white">
                          <div className="px-4 py-2 text-xs font-medium text-gray-600 border-b">
                            {uploadedFiles['guias-destino']?.name}
                          </div>
                          <iframe
                            title="PDF destino"
                            src={uploadedFiles['guias-destino']?.previewUrl}
                            className="w-full h-[70vh]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Detailed Results & Blockchain */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Results List */}
                    <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl shadow-soft border border-white/20 p-8">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-primary-900">Análisis Detallado</h3>
                        <div className="flex space-x-2">
                          <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                            25 materias
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        {/* Example Result Item - Green */}
                        <Card className="border-l-4 border-l-green-500 border-y-primary-100 border-r-primary-100 shadow-none">
                          <CardContent className="p-5">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="font-bold text-primary-900">Matemáticas I → Cálculo Diferencial</h4>
                                <p className="text-sm text-primary-500">4 créditos | Semestre 1</p>
                              </div>
                              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">94% Similitud</span>
                            </div>
                            <p className="text-sm text-primary-600 mb-3">
                              <span className="font-semibold text-primary-800">Análisis IA:</span> Coincidencia alta en límites, derivadas y optimización.
                            </p>
                            <div className="flex items-center text-xs text-green-600">
                              <CheckCircle className="w-3 h-3 mr-1" aria-hidden="true" />
                              <span className="sr-only">Estado: </span>Convalidación Directa Recomendada
                            </div>
                          </CardContent>
                        </Card>

                        {/* Example Result Item - Yellow */}
                        <Card className="border-l-4 border-l-amber-500 border-y-primary-100 border-r-primary-100 shadow-none">
                          <CardContent className="p-5">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="font-bold text-primary-900">Estadística Aplicada → Probabilidad</h4>
                                <p className="text-sm text-primary-500">4 créditos | Semestre 3</p>
                              </div>
                              <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded">76% Similitud</span>
                            </div>
                            <p className="text-sm text-primary-600 mb-3">
                              <span className="font-semibold text-primary-800">Análisis IA:</span> Diferencias en enfoque práctico vs teórico. Requiere revisión.
                            </p>
                            <div className="flex items-center text-xs text-amber-600">
                              <AlertTriangle className="w-3 h-3 mr-1" aria-hidden="true" />
                              <span className="sr-only">Estado: </span>Revisión Académica Necesaria
                            </div>
                          </CardContent>
                        </Card>

                        {/* Example Result Item - Red */}
                        <Card className="border-l-4 border-l-red-500 border-y-primary-100 border-r-primary-100 shadow-none">
                          <CardContent className="p-5">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="font-bold text-primary-900">Historia del Arte</h4>
                                <p className="text-sm text-primary-500">3 créditos | Electiva</p>
                              </div>
                              <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">23% Similitud</span>
                            </div>
                            <p className="text-sm text-primary-600 mb-3">
                              <span className="font-semibold text-primary-800">Análisis IA:</span> Sin materia equivalente en el plan de destino.
                            </p>
                            <div className="flex items-center text-xs text-red-600">
                              <XCircle className="w-3 h-3 mr-1" aria-hidden="true" />
                              <span className="sr-only">Estado: </span>No Convalidable
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                      {/* Blockchain Card */}
                      <Card className="bg-gradient-to-br from-primary-900 to-primary-800 border-primary-700 text-white">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-6">
                            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3 backdrop-blur-sm">
                              <ShieldCheck className="w-6 h-6 text-accent-400" />
                            </div>
                            <div>
                              <h4 className="font-bold text-lg">Blockchain</h4>
                              <p className="text-xs text-primary-200">Verificación Inmutable</p>
                            </div>
                          </div>

                          <div className="space-y-4 text-sm">
                            <div className="flex justify-between border-b border-white/10 pb-2">
                              <span className="text-primary-300">Hash:</span>
                              <span className="font-mono text-accent-300 text-xs">0xa1b...89xyz</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-2">
                              <span className="text-primary-300">Bloque:</span>
                              <span className="text-white">#2,847,592</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-primary-300">Estado:</span>
                              <span className="flex items-center text-green-400 text-xs font-bold">
                                <CheckCircle className="w-3 h-3 mr-1" /> Verificado
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Report Info */}
                      <Card className="border-primary-100 shadow-sm">
                        <CardContent className="p-6">
                          <h4 className="font-bold text-primary-900 mb-4 flex items-center">
                            <FileText className="w-5 h-5 mr-2 text-primary-500" />
                            Detalles del Reporte
                          </h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-primary-500">ID:</span>
                              <span className="font-mono text-primary-900">RPT-2025-100142</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-primary-500">Origen:</span>
                              <span className="text-primary-900 text-right">Universidad Europea</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-primary-500">Destino:</span>
                              <span className="text-primary-900 text-right">Politécnica de Madrid</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-primary-500">Vigencia:</span>
                              <span className="text-primary-900">Oct 2027</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                    <Button
                      onClick={handleRestartDemo}
                      variant="outline"
                      size="lg"
                      className="border-primary-200 text-primary-700 hover:bg-primary-50"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Nueva Consulta
                    </Button>
                    <Button
                      variant="glow"
                      size="lg"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Descargar Reporte PDF
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Toast Notifications for Errors */}
      {toast && (
        <Toast
          message={toast.message}
          variant={toast.variant}
          show={toast.show}
          onClose={hideToast}
        />
      )}
    </main>
  );
}