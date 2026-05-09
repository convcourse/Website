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
  const [convalidacionResult, setConvalidacionResult] = useState<any | null>(null);
  const documentTextsRef = useRef<{
    guia_origen_texto: string | null;
    guia_destino_texto: string | null;
    boletin_calificaciones_texto: string | null;
  } | null>(null);
  const convalidacionResultRef = useRef<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: { name: string, size: string, uploaded: boolean, previewUrl?: string } }>({});
  const [currentStep, setCurrentStep] = useState('upload'); // 'upload', 'loading', 'results'
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [loadingLogs, setLoadingLogs] = useState<string[]>([]);
  const [loadingElapsed, setLoadingElapsed] = useState(0);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [uploadNotification, setUploadNotification] = useState<{ show: boolean, fileName: string }>({ show: false, fileName: '' });
  const [dragActive, setDragActive] = useState<string | null>(null);
  const { toast, showToast, hideToast } = useToast();
  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/$/, '');

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
      ? ['.pdf']
      : ['.pdf', '.zip'];

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

  const handleFileUpload = async (docId: string, file: File) => {
    if (!file) {
      return;
    }

    // Validate format first
    if (!validateFileFormat(file, docId)) {
      return;
    }

    const tipoGuiaOrigen = Number(process.env.NEXT_PUBLIC_TIPO_GUIA_ORIGEN || '');
    const tipoGuiaDestino = Number(process.env.NEXT_PUBLIC_TIPO_GUIA_DESTINO || '');
    const tipoBoletin = Number(process.env.NEXT_PUBLIC_TIPO_BOLETIN || '');
    const tipoId = docId === 'guias-origen'
      ? tipoGuiaOrigen
      : docId === 'guias-destino'
        ? tipoGuiaDestino
        : tipoBoletin;

    if (!Number.isFinite(tipoId)) {
      showToast('Configura los IDs de tipo de documento en el frontend.', 'error');
      return;
    }

    const storedUserId = localStorage.getItem('currentUserId') || localStorage.getItem('userId');
    const userId = storedUserId ? Number(storedUserId) : null;
    let universidadId: number | null = null;

    try {
      const rawUser = localStorage.getItem('currentUser');
      if (rawUser) {
        const parsedUser = JSON.parse(rawUser);
        const candidateId =
          parsedUser?.universidadId ??
          parsedUser?.universidad?.id ??
          parsedUser?.institutionId ??
          parsedUser?.uni_id;
        if (Number.isFinite(Number(candidateId))) {
          universidadId = Number(candidateId);
        }
      }
    } catch {
      universidadId = null;
    }

    if (!Number.isFinite(universidadId) && Number.isFinite(userId)) {
      try {
        const res = await fetch(`${apiBaseUrl}/usuarios/id/${userId}`);
        if (res.ok) {
          const userData = await res.json();
          const resolvedUni = userData?.universidad?.id;
          if (Number.isFinite(Number(resolvedUni))) {
            universidadId = Number(resolvedUni);
          }
        }
      } catch {
        universidadId = null;
      }
    }

    if (!Number.isFinite(universidadId)) {
      showToast('No se pudo obtener la universidad del usuario.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('id_uni', String(universidadId));
    formData.append('tipo_id', String(tipoId));
    formData.append('titulo', file.name.replace(/\.[^/.]+$/, ''));
    if (Number.isFinite(userId)) {
      formData.append('user_id', String(userId));
    }

    try {
      const res = await fetch(`${apiBaseUrl}/documentos/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        const errorDetail = errorBody?.detail || 'No se pudo subir el documento.';
        throw new Error(errorDetail);
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
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al subir.';
      showToast(message, 'error');
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

  const handleStartConvalidation = async () => {
    setCurrentStep('loading');
    setLoadingProgress(0);
    setConvalidacionResult(null);
    setLoadingLogs([]);
    setLoadingElapsed(0);
    setLoadingMessage('Iniciando proceso de convalidacion...');
    setLoadingError(null);

    const startedAt = Date.now();
    const elapsedInterval = setInterval(() => {
      setLoadingElapsed(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);

    const addLog = (message: string) => {
      setLoadingLogs((prev) => [...prev.slice(-5), message]);
    };

    setLoadingMessage('Guardando tus documentos en el servidor...');
    setLoadingProgress(10);
    addLog('Validando tipos de documento y usuario...');
    const tipoGuiaOrigen = Number(process.env.NEXT_PUBLIC_TIPO_GUIA_ORIGEN || '');
    const tipoGuiaDestino = Number(process.env.NEXT_PUBLIC_TIPO_GUIA_DESTINO || '');
    const tipoBoletin = Number(process.env.NEXT_PUBLIC_TIPO_BOLETIN || '');

    if (!Number.isFinite(tipoGuiaOrigen) || !Number.isFinite(tipoGuiaDestino) || !Number.isFinite(tipoBoletin)) {
      showToast('Configura NEXT_PUBLIC_TIPO_GUIA_ORIGEN, NEXT_PUBLIC_TIPO_GUIA_DESTINO y NEXT_PUBLIC_TIPO_BOLETIN.', 'error');
      setLoadingError('Faltan tipos de documento en el frontend.');
      addLog('Error: tipos de documento no configurados.');
      clearInterval(elapsedInterval);
      return;
    }

    const storedUserId = localStorage.getItem('currentUserId') || localStorage.getItem('userId');
    const userId = storedUserId ? Number(storedUserId) : null;

    const params = new URLSearchParams({
      tipo_origen: String(tipoGuiaOrigen),
      tipo_destino: String(tipoGuiaDestino),
      tipo_boletin: String(tipoBoletin)
    });
    if (Number.isFinite(userId)) {
      params.append('user_id', String(userId));
    }

    try {
      setLoadingMessage('Extrayendo texto de tus documentos PDF...');
      setLoadingProgress(20);
      addLog('Extrayendo texto de documentos...');
      const res = await fetch(`${apiBaseUrl}/documentos/ultimos/texto?${params.toString()}`);
      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        const errorDetail = errorBody?.detail || 'No se pudo extraer el texto de los documentos.';
        throw new Error(errorDetail);
      }
      documentTextsRef.current = await res.json();
      const textoLen = (documentTextsRef.current?.guia_origen_texto?.length || 0) + (documentTextsRef.current?.guia_destino_texto?.length || 0);
      setLoadingProgress(30);
      addLog(`Texto extraido: ${textoLen} caracteres`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al extraer texto.';
      showToast(message, 'error');
      setLoadingError(message);
      addLog(`Error: ${message}`);
      clearInterval(elapsedInterval);
      return;
    }

    try {
      setLoadingMessage('Enviando documentos a la IA para analizar...');
      setLoadingProgress(40);
      addLog('Enviando a analisis de IA...');
      const textos = documentTextsRef.current;
      const requestBody = {
        guia_origen: textos?.guia_origen_texto || '',
        guia_destino: textos?.guia_destino_texto || '',
        boletin: textos?.boletin_calificaciones_texto || '',
      };
      console.log('=== CONVALIDACION REQUEST ===');
      console.log(JSON.stringify(requestBody, null, 2));
      console.log('=== END CONVALIDACION REQUEST ===');
      
      setLoadingMessage('IA leyendo tu guia de origen...');
      setLoadingProgress(50);
      addLog(`Guia origen: ${requestBody.guia_origen.length} caracteres`);

      const analysisRes = await fetch(`${apiBaseUrl}/convalidaciones/analizar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!analysisRes.ok) {
        const errorBody = await analysisRes.json().catch(() => ({}));
        const errorDetail = errorBody?.detail || 'No se pudo analizar la convalidacion.';
        throw new Error(errorDetail);
      }

      setLoadingMessage('IA procesando y comparando asignaturas...');
      setLoadingProgress(70);
      addLog('IA analizando similitud de contenidos...');

      convalidacionResultRef.current = await analysisRes.json();
      console.log('=== CONVALIDACION RESPONSE ===');
      console.log(JSON.stringify(convalidacionResultRef.current, null, 2));
      console.log('=== END CONVALIDACION RESPONSE ===');
      
      setLoadingMessage('IA verificando resultado en blockchain...');
      setLoadingProgress(85);
      addLog(`Analisis completado. Estado: ${convalidacionResultRef.current?.resumen?.convalidables || 0} convalidados`);
      
      setLoadingProgress(95);
      if (convalidacionResultRef.current?.blockchain) {
        addLog(`Transaccion blockchain: ${convalidacionResultRef.current.blockchain.tx_hash.slice(0, 16)}...`);
      }
      
      setConvalidacionResult(convalidacionResultRef.current);
      setLoadingProgress(100);
      addLog('Reporte generado correctamente.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al analizar.';
      showToast(message, 'error');
      setLoadingError(message);
      addLog(`Error: ${message}`);
      clearInterval(elapsedInterval);
      return;
    }

    clearInterval(elapsedInterval);
    setTimeout(() => setCurrentStep('results'), 500);
  };

  const handleRestartDemo = () => {
    createdPreviewUrls.current.forEach((url) => URL.revokeObjectURL(url));
    createdPreviewUrls.current = [];

    setCurrentStep('upload');
    setUploadedCount(0);
    setUploadedFiles({});
    setLoadingProgress(0);
    setLoadingMessage('');
    setLoadingLogs([]);
    setLoadingElapsed(0);
    setLoadingError(null);
    setConvalidacionResult(null);
  };

  const handleRetryConvalidation = () => {
    setLoadingError(null);
    handleStartConvalidation();
  };

  const resumen = convalidacionResult?.resumen;
  const materias = Array.isArray(convalidacionResult?.materias) ? convalidacionResult.materias : [];
  const totalMaterias = Number(resumen?.total_materias || (materias.length > 0 ? materias.length : 1));
  const convalidables = Number(resumen?.convalidables || (materias.filter((m: any) => m?.estado === 'convalidable').length));
  const porRevisar = Number(resumen?.por_revisar || (materias.filter((m: any) => m?.estado === 'revision').length));
  const noConvalidables = Number(resumen?.no_convalidables || (materias.filter((m: any) => m?.estado === 'no_convalidable').length));
  const creditosConvalidados = Number(resumen?.creditos_convalidados || (materias.filter((m: any) => m?.estado === 'convalidable').reduce((sum: number, m: any) => sum + (Number(m?.ects_destino ?? m?.creditos_destino) || 0), 0)));
  const creditosRevision = Number(resumen?.creditos_en_revision || (materias.filter((m: any) => m?.estado === 'revision').reduce((sum: number, m: any) => sum + (Number(m?.ects_destino ?? m?.creditos_destino) || 0), 0)));
  const porcentaje = (value: number) => totalMaterias > 0 ? Math.round((value / totalMaterias) * 100) : 0;
  const formatearNumero = (value: number | null | undefined) =>
    typeof value === 'number' && Number.isFinite(value) ? value : 0;
  const getEstadoStyles = (estado: string) => {
    if (estado === 'convalidable') {
      return {
        badge: 'bg-green-100 text-green-700',
        border: 'border-l-green-500',
        icon: CheckCircle,
        iconClass: 'text-green-600',
        label: 'Convalidable'
      };
    }
    if (estado === 'revision') {
      return {
        badge: 'bg-amber-100 text-amber-700',
        border: 'border-l-amber-500',
        icon: AlertTriangle,
        iconClass: 'text-amber-600',
        label: 'Revision'
      };
    }
    return {
      badge: 'bg-red-100 text-red-700',
      border: 'border-l-red-500',
      icon: XCircle,
      iconClass: 'text-red-600',
      label: 'No convalidable'
    };
  };

  const formatValor = (val: number | null | undefined, suffix = '') => {
    const n = typeof val === 'number' && Number.isFinite(val) ? val : 0;
    return `${n}${suffix}`;
  };

  const formatNumeroText = (val: number | null | undefined) => {
    const n = typeof val === 'number' && Number.isFinite(val) ? val : 0;
    return n === 0 ? 'N/A' : String(n);
  };

  const formatNota = (val: number | null | undefined) => {
    const n = typeof val === 'number' && Number.isFinite(val) ? val : 0;
    return n === 0 ? '-' : `${n}/10`;
  };

  const formatBoolean = (val: boolean | null | undefined) => {
    return val ? 'Si' : 'No';
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const renderScoreBar = (score: number, label: string) => {
    const color = getScoreColor(score);
    return (
      <div className="flex items-center gap-2 text-xs">
        <span className="w-12 text-primary-600">{label}</span>
        <div className="flex-1 h-2 bg-primary-100 rounded-full overflow-hidden">
          <div className={`h-full ${color} rounded-full`} style={{ width: `${Math.min(score, 100)}%` }} />
        </div>
        <span className="w-8 text-right font-semibold text-primary-900">{score}%</span>
      </div>
    );
  };

  const advertenciasGlobales = Array.isArray(convalidacionResult?.advertencias) ? convalidacionResult.advertencias : [];
  const modelVersion = convalidacionResult?.version || process.env.NEXT_PUBLIC_OPENROUTER_MODEL || 'certified_ai_v1';
  const matchId = convalidacionResult?.match_id || convalidacionResult?.id || crypto.randomUUID();
  const analysisTimestamp = convalidacionResult?.timestamp ? new Date(convalidacionResult.timestamp).toLocaleString('es-ES') : new Date().toLocaleString('es-ES');

  const materiasEnRevision = materias.filter((m: any) => m?.estado === 'revision').length;
  const materiasCriticas = materias.filter((m: any) => m?.estado === 'no_convalidable').length;
  const creditosPendientes = materias.reduce((sum: number, m: any) => sum + (Number(m?.ects_destino) || Number(m?.ects_origen) || 0), 0);

  const scores = materias.map((m: any) => Number(m?.score_final) || 0).filter((s: number) => s > 0);
  const scorePromedio = scores.length > 0 ? Math.round(scores.reduce((a: number, b: number) => a + b, 0) / scores.length) : 0;
  const scoreMax = scores.length > 0 ? Math.max(...scores) : 0;
  const scoreMin = scores.length > 0 ? Math.min(...scores) : 0;

  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const opcionesFiltro = [
    { key: 'todos', label: 'Todos', count: totalMaterias },
    { key: 'convalidable', label: 'Convalidados', count: convalidables },
    { key: 'revision', label: 'Revision', count: porRevisar },
    { key: 'no_convalidable', label: 'No validados', count: noConvalidables }
  ];
  const materiasFiltradas = filtroEstado === 'todos' ? materias : materias.filter((m: any) => m?.estado === filtroEstado);

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
                      <span className="text-sm font-medium">Guías: PDF o ZIP | Boletín: PDF</span>
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
                            accept={doc.id === 'boletin-calificaciones' ? '.pdf' : '.pdf,.zip'}
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
                    <p className="text-sm text-primary-400 font-mono">{Math.round(loadingProgress)}% · {loadingElapsed}s</p>
                    {loadingLogs.length > 0 && (
                      <div className="mt-6 text-left text-xs text-primary-500 bg-white/70 border border-primary-100 rounded-lg p-4">
                        <div className="font-semibold text-primary-700 mb-2">Actividad reciente</div>
                        <div className="space-y-1">
                          {loadingLogs.map((log, index) => (
                            <div key={`${log}-${index}`}>• {log}</div>
                          ))}
                        </div>
                      </div>
                    )}
                    {loadingError && (
                      <div className="mt-6 border border-red-200 bg-red-50 text-red-700 rounded-lg p-4 text-sm">
                        <div className="font-semibold mb-2">Se produjo un error</div>
                        <div className="mb-4 break-words">{loadingError}</div>
                        <div className="flex flex-wrap gap-3">
                          <Button onClick={handleRetryConvalidation} size="sm" variant="glow">
                            Reintentar
                          </Button>
                          <Button
                            onClick={() => {
                              setLoadingError(null);
                              setCurrentStep('upload');
                            }}
                            size="sm"
                            variant="outline"
                          >
                            Volver a subir
                          </Button>
                        </div>
                      </div>
                    )}
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

                    {/* Global Warnings Alert */}
                    {advertenciasGlobales.length > 0 && (
                      <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-left">
                        <div className="flex items-start">
                          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-semibold text-amber-800 mb-2">Avisos Importantes</p>
                            <ul className="text-sm text-amber-700 space-y-1">
                              {advertenciasGlobales.map((adv: string, idx: number) => (
                                <li key={idx}>• {adv}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Enhanced Summary Stats */}
                    <div className="bg-gradient-to-br from-surface-50 to-primary-50/50 rounded-xl p-8 border border-primary-100">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center relative">
                          <div className="text-4xl font-bold text-green-600 mb-2">{convalidables}</div>
                          <div className="text-sm font-bold text-primary-900 uppercase tracking-wide mb-1">Convalidables</div>
                          <div className="text-xs text-primary-500">{porcentaje(convalidables)}% del total</div>
                          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-primary-200"></div>
                        </div>

                        <div className="text-center relative">
                          <div className="text-4xl font-bold text-amber-500 mb-2">{porRevisar}</div>
                          <div className="text-sm font-bold text-primary-900 uppercase tracking-wide mb-1">Por Revisar</div>
                          <div className="text-xs text-primary-500">{porcentaje(porRevisar)}% del total</div>
                          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-primary-200"></div>
                        </div>

                        <div className="text-center">
                          <div className="text-4xl font-bold text-red-500 mb-2">{noConvalidables}</div>
                          <div className="text-sm font-bold text-primary-900 uppercase tracking-wide mb-1">No Convalidables</div>
                          <div className="text-xs text-primary-500">{porcentaje(noConvalidables)}% del total</div>
                        </div>
                      </div>

                      <div className="border-t border-primary-100 mt-8 pt-6">
                        <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-medium">
                          <Sparkles className="w-4 h-4 mr-2" />
                          {creditosConvalidados} créditos convalidados automáticamente
                        </div>
                        <div className="mt-3 text-sm text-primary-600">
                          Créditos en revisión: <span className="font-semibold">{creditosRevision}</span>
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
<div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-primary-900">Analisis Detallado</h3>
                        <div className="flex items-center gap-2">
                          {opcionesFiltro.map(op => (
                            <button
                              key={op.key}
                              onClick={() => setFiltroEstado(op.key)}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                filtroEstado === op.key
                                  ? 'bg-primary-600 text-white'
                                  : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                              }`}
                            >
                              {op.label} ({op.count})
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        {materiasFiltradas.length === 0 ? (
                          <div className="text-sm text-primary-500">
                            No hay resultados para el filtro seleccionado.
                          </div>
                        ) : (
                          materiasFiltradas.map((materia: any, index: number) => {
                            const estado = materia?.estado || 'no_convalidable';
                            const styles = getEstadoStyles(estado);
                            const EstadoIcon = styles.icon;
                            const asignaturaOrigen = materia?.asignatura_origen || materia?.asignatura_evaluada || 'Asignatura sin nombre';
                            const asignaturaDestino = materia?.asignatura_destino ? `→ ${materia.asignatura_destino}` : '';
                            const ectsOrigen = materia?.ects_origen ?? materia?.creditos_origen ?? 0;
                            const ectsDestino = materia?.ects_destino ?? materia?.creditos_destino ?? 0;
                            const semestre = materia?.semestre_origen;
                            const scoreFinal = formatearNumero(materia?.score_final) || 0;
                            const analisis = materia?.analisis || 'Sin analisis disponible.';
                            const citaOrigen = materia?.citas?.origen;
                            const citaDestino = materia?.citas?.destino;
                            const advertencias = Array.isArray(materia?.advertencias) ? materia.advertencias : [];

                            const scoreComponents = materia?.score_components || materia?.score || {};
                            const contenidosScore = formatearNumero(scoreComponents?.contenidos || scoreComponents?.content);
                            const resultadosScore = formatearNumero(scoreComponents?.resultados || scoreComponents?.learning_outcomes);
                            const competenciasScore = formatearNumero(scoreComponents?.competencias || scoreComponents?.competencies);
                            const estructuraScore = formatearNumero(scoreComponents?.estructura || scoreComponents?.structure);

                            const validations = materia?.validations || {};
                            const ectsOk = validations?.ects_delta?.status === 'PASS';
                            const tipoOk = validations?.type_compatibility?.compatible;
                            const notaOk = validations?.grade_requirement?.status === 'PASS';

                            return (
                              <Card
                                key={`${asignaturaOrigen}-${index}`}
                                className={`border-l-4 ${styles.border} border-y-primary-100 border-r-primary-100 shadow-none`}
                              >
                                <CardContent className="p-5">
                                  <div className="flex justify-between items-start mb-3">
                                    <div>
                                      <h4 className="font-bold text-primary-900">{asignaturaOrigen} {asignaturaDestino}</h4>
                                      <p className="text-sm text-primary-500">
                                        {ectsOrigen} creditos{Number.isFinite(semestre) ? ` | Semestre ${semestre}` : ''}
                                      </p>
                                    </div>
                                    <span className={`${styles.badge} text-xs font-bold px-2 py-1 rounded`}>
                                      {scoreFinal > 0 ? `${scoreFinal}% Similitud` : '—'}
                                    </span>
                                  </div>

                                  {(contenidosScore > 0 || resultadosScore > 0 || competenciasScore > 0) && (
                                    <div className="mb-3 space-y-1">
                                      {contenidosScore > 0 && renderScoreBar(contenidosScore, 'Cont')}
                                      {resultadosScore > 0 && renderScoreBar(resultadosScore, 'Res')}
                                      {competenciasScore > 0 && renderScoreBar(competenciasScore, 'Comp')}
                                    </div>
                                  )}

                                  <div className="flex flex-wrap gap-2 mb-3">
                                    {ectsOk !== null && (
                                      <span className={`text-xs px-2 py-0.5 rounded ${ectsOk ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        ECTS {ectsOk ? '✓' : '✗'}
                                      </span>
                                    )}
                                    {tipoOk !== null && (
                                      <span className={`text-xs px-2 py-0.5 rounded ${tipoOk ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        Tipo {tipoOk ? '✓' : '✗'}
                                      </span>
                                    )}
                                    {notaOk !== null && (
                                      <span className={`text-xs px-2 py-0.5 rounded ${notaOk ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        Nota {notaOk ? '✓' : '✗'}
                                      </span>
                                    )}
                                  </div>

<p className="text-sm text-primary-600 mb-3">
                                    <span className="font-semibold text-primary-800">Analisis IA:</span> {analisis}
                                  </p>
                                  {(citaOrigen || citaDestino) && (
                                    <div className="text-xs text-primary-500 mb-3 space-y-1">
                                      {citaOrigen && (
                                        <div>
                                          <span className="font-semibold text-primary-700">Origen:</span> “{citaOrigen}”
                                        </div>
                                      )}
                                      {citaDestino && (
                                        <div>
                                          <span className="font-semibold text-primary-700">Destino:</span> “{citaDestino}”
                                        </div>
                                      )}
                                    </div>
                                  )}
                                  {advertencias.length > 0 && (
                                    <div className="mb-3">
                                      <div className="text-xs text-amber-600 font-semibold">Advertencias</div>
                                      <ul className="text-xs text-amber-700">
                                        {advertencias.map((adv: string, advIndex: number) => (
                                          <li key={`${adv}-${advIndex}`}>• {adv}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  <div className={`flex items-center text-xs ${styles.iconClass}`}>
                                    <EstadoIcon className="w-3 h-3 mr-1" aria-hidden="true" />
                                    <span className="sr-only">Estado: </span>{styles.label}
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })
                        )}
                      </div>
                    </div>

{/* Sidebar Info */}
                    <div className="space-y-6">
                      {/* AI Analysis Info Card */}
                      <Card className="bg-gradient-to-br from-primary-900 to-primary-800 border-primary-700 text-white">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-6">
                            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3 backdrop-blur-sm">
                              <ShieldCheck className="w-6 h-6 text-accent-400" />
                            </div>
                            <div>
                              <h4 className="font-bold text-lg">Analisis IA</h4>
                              <p className="text-xs text-primary-200">Reporte de Convalidacion</p>
                            </div>
                          </div>

                          <div className="space-y-4 text-sm">
                            <div className="flex justify-between border-b border-white/10 pb-2">
                              <span className="text-primary-300">Match ID:</span>
                              <span className="font-mono text-accent-300 text-xs truncate max-w-[120px]" title={matchId}>{matchId.slice(0, 12)}...</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-2">
                              <span className="text-primary-300">Modelo:</span>
                              <span className="text-white text-xs">{modelVersion}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-2">
                              <span className="text-primary-300">Fecha:</span>
                              <span className="text-white text-xs">{analysisTimestamp}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-primary-300">Estado:</span>
                              <span className="flex items-center text-green-400 text-xs font-bold">
                                <CheckCircle className="w-3 h-3 mr-1" /> Completado
                              </span>
                            </div>
                            {convalidacionResult?.blockchain && (
                              <div className="pt-2 border-t border-white/10">
                                <span className="text-primary-300 text-xs">Blockchain:</span>
                                <a
                                  href={convalidacionResult.blockchain.explorer_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center text-accent-400 hover:text-accent-300 text-xs mt-1 truncate"
                                  title={convalidacionResult.blockchain.tx_hash}
                                >
                                  <span className="mr-1">↗</span>
                                  {convalidacionResult.blockchain.tx_hash.slice(0, 10)}...
                                </a>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Risk Indicator Card */}
                      <Card className="border-primary-100 shadow-sm">
                        <CardContent className="p-6">
                          <h4 className="font-bold text-primary-900 mb-4 flex items-center">
                            <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
                            Estado del Proceso
                          </h4>
                          <div className="space-y-3 text-sm">
                            {materiasCriticas > 0 && (
                              <div className="flex justify-between items-center p-2 bg-red-50 rounded-lg border border-red-100">
                                <span className="text-red-700">Criticas</span>
                                <span className="font-bold text-red-600">{materiasCriticas}</span>
                              </div>
                            )}
                            {materiasEnRevision > 0 && (
                              <div className="flex justify-between items-center p-2 bg-amber-50 rounded-lg border border-amber-100">
                                <span className="text-amber-700">En Revision</span>
                                <span className="font-bold text-amber-600">{materiasEnRevision}</span>
                              </div>
                            )}
                            {creditosPendientes > 0 && (
                              <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg border border-blue-100">
                                <span className="text-blue-700">Creditos Pendientes</span>
                                <span className="font-bold text-blue-600">{creditosPendientes}</span>
                              </div>
                            )}
                            {scorePromedio > 0 && (
                              <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg border border-green-100">
                                <span className="text-green-700">Score Promedio</span>
                                <span className={`font-bold ${getScoreColor(scorePromedio).replace('bg-', 'text-').replace('-500', '-600')}`}>{scorePromedio}%</span>
                              </div>
                            )}
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