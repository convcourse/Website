'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    ArrowLeft,
    Download,
    Share2,
    FileText,
    CheckCircle,
    AlertTriangle,
    XCircle,
    Building2,
    Calendar,
    Clock,
    Shield,
    BookOpen,
    Target,
    TrendingUp,
    Hand,
    ChevronRight,
    ExternalLink,
    Copy,
    Mail
} from 'lucide-react';

// Mock result data
const mockResults: Record<string, {
    id: string;
    date: string;
    originCourse: string;
    originUniversity: string;
    targetCourse: string;
    targetUniversity: string;
    status: 'approved' | 'pending' | 'rejected';
    overallScore: number;
    processTime: string;
    blockchain: {
        hash: string;
        block: string;
        verified: boolean;
    };
    scoreBreakdown: {
        content: number;
        learningOutcomes: number;
        credits: number;
        assessment: number;
    };
    subjects: Array<{
        id: string;
        origin: string;
        target: string;
        originCredits: number;
        targetCredits: number;
        score: number;
        status: 'approved' | 'pending' | 'rejected';
        matchedTopics: string[];
        gaps: string[];
    }>;
    recommendation: 'approve' | 'partial' | 'deny';
}> = {
    'RPT-2025-001': {
        id: 'RPT-2025-001',
        date: '2025-12-01',
        originCourse: 'Ingeniería Informática',
        originUniversity: 'Universidad de Valencia',
        targetCourse: 'Grado en Informática',
        targetUniversity: 'Universidad Politécnica de Madrid',
        status: 'approved',
        overallScore: 94,
        processTime: '1m 45s',
        blockchain: {
            hash: '0x7a8b...f9e2',
            block: '#2,847,592',
            verified: true
        },
        scoreBreakdown: {
            content: 92,
            learningOutcomes: 95,
            credits: 100,
            assessment: 88
        },
        subjects: [
            {
                id: '1',
                origin: 'Programación I',
                target: 'Fundamentos de Programación',
                originCredits: 6,
                targetCredits: 6,
                score: 96,
                status: 'approved',
                matchedTopics: ['Variables y tipos de datos', 'Estructuras de control', 'Funciones', 'Arrays'],
                gaps: []
            },
            {
                id: '2',
                origin: 'Álgebra Lineal',
                target: 'Matemáticas I',
                originCredits: 6,
                targetCredits: 6,
                score: 91,
                status: 'approved',
                matchedTopics: ['Matrices', 'Sistemas de ecuaciones', 'Espacios vectoriales'],
                gaps: ['Transformaciones lineales avanzadas']
            },
            {
                id: '3',
                origin: 'Bases de Datos',
                target: 'Gestión de Datos',
                originCredits: 6,
                targetCredits: 6,
                score: 74,
                status: 'pending',
                matchedTopics: ['SQL básico', 'Modelo relacional'],
                gaps: ['NoSQL', 'Big Data']
            },
            {
                id: '4',
                origin: 'Historia del Arte',
                target: '',
                originCredits: 3,
                targetCredits: 0,
                score: 0,
                status: 'rejected',
                matchedTopics: [],
                gaps: ['Sin equivalencia en plan destino']
            }
        ],
        recommendation: 'approve'
    },
    'RPT-2025-002': {
        id: 'RPT-2025-002',
        date: '2025-11-28',
        originCourse: 'Administración de Empresas',
        originUniversity: 'Universidad de Barcelona',
        targetCourse: 'ADE',
        targetUniversity: 'Universidad Complutense',
        status: 'pending',
        overallScore: 76,
        processTime: '2m 12s',
        blockchain: {
            hash: '0x3c4d...a1b2',
            block: '#2,847,590',
            verified: true
        },
        scoreBreakdown: {
            content: 78,
            learningOutcomes: 72,
            credits: 85,
            assessment: 70
        },
        subjects: [
            {
                id: '1',
                origin: 'Contabilidad I',
                target: 'Introducción a la Contabilidad',
                originCredits: 6,
                targetCredits: 6,
                score: 88,
                status: 'approved',
                matchedTopics: ['Plan General Contable', 'Asientos contables', 'Balance'],
                gaps: []
            },
            {
                id: '2',
                origin: 'Marketing',
                target: 'Fundamentos de Marketing',
                originCredits: 6,
                targetCredits: 4,
                score: 72,
                status: 'pending',
                matchedTopics: ['Análisis de mercado', 'Segmentación'],
                gaps: ['Marketing digital', 'Diferencia de créditos']
            }
        ],
        recommendation: 'partial'
    },
    'RPT-2025-003': {
        id: 'RPT-2025-003',
        date: '2025-11-25',
        originCourse: 'Derecho',
        originUniversity: 'Universidad de Salamanca',
        targetCourse: 'Grado en Derecho',
        targetUniversity: 'Universidad de Navarra',
        status: 'rejected',
        overallScore: 45,
        processTime: '1m 30s',
        blockchain: {
            hash: '0x9f8e...c3d4',
            block: '#2,847,588',
            verified: true
        },
        scoreBreakdown: {
            content: 42,
            learningOutcomes: 48,
            credits: 50,
            assessment: 40
        },
        subjects: [
            {
                id: '1',
                origin: 'Derecho Romano',
                target: 'Historia del Derecho',
                originCredits: 6,
                targetCredits: 6,
                score: 52,
                status: 'rejected',
                matchedTopics: ['Conceptos históricos básicos'],
                gaps: ['Enfoque metodológico diferente', 'Contenido no equivalente']
            }
        ],
        recommendation: 'deny'
    }
};

export default function ResultadosPage({ params }: { params: Promise<{ id: string }> }) {
    const t = useTranslations('resultados');
    const router = useRouter();
    const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
    const [result, setResult] = useState<typeof mockResults[string] | null>(null);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviewComment, setReviewComment] = useState('');
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        params.then(p => {
            setResolvedParams(p);
            const data = mockResults[p.id];
            if (data) {
                setResult(data);
            }
        });
    }, [params]);

    if (!resolvedParams || !result) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">{t('loading')}</p>
                </div>
            </div>
        );
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved': return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'pending': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
            case 'rejected': return <XCircle className="w-5 h-5 text-red-500" />;
            default: return null;
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-600 bg-green-100';
        if (score >= 70) return 'text-amber-600 bg-amber-100';
        return 'text-red-600 bg-red-100';
    };

    const getRecommendationBadge = () => {
        const badges = {
            approve: { label: t('recommendation.approve'), class: 'bg-green-100 text-green-700 border-green-200' },
            partial: { label: t('recommendation.partial'), class: 'bg-amber-100 text-amber-700 border-amber-200' },
            deny: { label: t('recommendation.deny'), class: 'bg-red-100 text-red-700 border-red-200' }
        };
        const badge = badges[result.recommendation];
        return (
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${badge.class}`}>
                {getStatusIcon(result.recommendation === 'approve' ? 'approved' : result.recommendation === 'deny' ? 'rejected' : 'pending')}
                {badge.label}
            </span>
        );
    };

    const handleDownloadPDF = () => {
        // Mock PDF download
        const link = document.createElement('a');
        link.href = '#';
        link.download = `${result.id}-reporte.pdf`;
        alert(t('downloadStarted'));
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmitReview = () => {
        if (reviewComment.trim()) {
            setReviewSubmitted(true);
            setTimeout(() => {
                setShowReviewModal(false);
                setReviewSubmitted(false);
                setReviewComment('');
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 pt-24 pb-16">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <Link href="/dashboard/historial">
                        <Button variant="ghost" className="mb-4 gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            {t('backToHistory')}
                        </Button>
                    </Link>

                    <Card className="bg-white/95 backdrop-blur-md border-gray-200/30">
                        <CardContent className="p-8">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-sm text-gray-500 font-mono bg-gray-100 px-3 py-1 rounded">
                                            {result.id}
                                        </span>
                                        {getRecommendationBadge()}
                                    </div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                        {result.originCourse} → {result.targetCourse}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <Building2 className="w-4 h-4" />
                                            {result.originUniversity}
                                        </span>
                                        <ChevronRight className="w-4 h-4" />
                                        <span className="flex items-center gap-1">
                                            <Building2 className="w-4 h-4" />
                                            {result.targetUniversity}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <Button variant="outline" onClick={handleDownloadPDF} className="gap-2">
                                        <Download className="w-4 h-4" />
                                        {t('downloadPDF')}
                                    </Button>
                                    <Button variant="outline" onClick={() => setShowShareModal(true)} className="gap-2">
                                        <Share2 className="w-4 h-4" />
                                        {t('share')}
                                    </Button>
                                    {result.overallScore < 70 && (
                                        <Button variant="glow" onClick={() => setShowReviewModal(true)} className="gap-2">
                                            <Hand className="w-4 h-4" />
                                            {t('requestReview')}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Score Overview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
                >
                    {/* Overall Score */}
                    <Card className="bg-white/95 backdrop-blur-md border-gray-200/30">
                        <CardContent className="p-6 text-center">
                            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
                                {t('overallScore')}
                            </h3>
                            <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreColor(result.overallScore)}`}>
                                <span className="text-4xl font-bold">{result.overallScore}%</span>
                            </div>
                            <p className="mt-4 text-sm text-gray-600">
                                {result.overallScore >= 80 ? t('scoreDescription.high') :
                                    result.overallScore >= 70 ? t('scoreDescription.medium') :
                                        t('scoreDescription.low')}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Score Breakdown */}
                    <Card className="bg-white/95 backdrop-blur-md border-gray-200/30">
                        <CardContent className="p-6">
                            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
                                {t('scoreBreakdown')}
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { label: t('breakdown.content'), value: result.scoreBreakdown.content, weight: '40%' },
                                    { label: t('breakdown.learningOutcomes'), value: result.scoreBreakdown.learningOutcomes, weight: '30%' },
                                    { label: t('breakdown.credits'), value: result.scoreBreakdown.credits, weight: '15%' },
                                    { label: t('breakdown.assessment'), value: result.scoreBreakdown.assessment, weight: '15%' }
                                ].map(item => (
                                    <div key={item.label}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-600">{item.label}</span>
                                            <span className="font-medium">{item.value}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${item.value >= 80 ? 'bg-green-500' : item.value >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                                                style={{ width: `${item.value}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-gray-400">{t('weight')}: {item.weight}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Blockchain & Meta */}
                    <Card className="bg-gradient-to-br from-primary-900 to-primary-800 text-white border-primary-700">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Shield className="w-5 h-5 text-accent-400" />
                                <h3 className="text-sm font-semibold uppercase tracking-wider">
                                    {t('blockchain.title')}
                                </h3>
                            </div>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between border-b border-white/10 pb-2">
                                    <span className="text-primary-200">Hash:</span>
                                    <span className="font-mono text-accent-300">{result.blockchain.hash}</span>
                                </div>
                                <div className="flex justify-between border-b border-white/10 pb-2">
                                    <span className="text-primary-200">{t('blockchain.block')}:</span>
                                    <span>{result.blockchain.block}</span>
                                </div>
                                <div className="flex justify-between border-b border-white/10 pb-2">
                                    <span className="text-primary-200">{t('blockchain.status')}:</span>
                                    <span className="flex items-center gap-1 text-green-400">
                                        <CheckCircle className="w-4 h-4" />
                                        {t('blockchain.verified')}
                                    </span>
                                </div>
                                <div className="flex justify-between pt-2">
                                    <span className="text-primary-200">{t('processTime')}:</span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {result.processTime}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Subject Details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2 className="text-xl font-bold text-gray-900 mb-4">{t('subjectDetails')}</h2>
                    <div className="space-y-4">
                        {result.subjects.map((subject, index) => (
                            <motion.div
                                key={subject.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                            >
                                <Card className={`bg-white/95 backdrop-blur-md border-l-4 ${subject.status === 'approved' ? 'border-l-green-500' :
                                    subject.status === 'pending' ? 'border-l-amber-500' : 'border-l-red-500'
                                    } border-gray-200/30`}>
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    {getStatusIcon(subject.status)}
                                                    <h3 className="font-bold text-gray-900">
                                                        {subject.origin} → {subject.target || t('noEquivalent')}
                                                    </h3>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                                    <span>{subject.originCredits} ECTS</span>
                                                    <ChevronRight className="w-4 h-4" />
                                                    <span>{subject.targetCredits} ECTS</span>
                                                </div>

                                                {subject.matchedTopics.length > 0 && (
                                                    <div className="mb-3">
                                                        <p className="text-sm font-medium text-gray-700 mb-2">{t('matchedTopics')}:</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {subject.matchedTopics.map((topic, i) => (
                                                                <span key={i} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                                                                    {topic}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {subject.gaps.length > 0 && (
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-700 mb-2">{t('gaps')}:</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {subject.gaps.map((gap, i) => (
                                                                <span key={i} className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">
                                                                    {gap}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className={`px-4 py-2 rounded-lg ${getScoreColor(subject.score)}`}>
                                                <span className="text-2xl font-bold">{subject.score}%</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
                    >
                        <h2 className="text-xl font-bold text-gray-900 mb-4">{t('shareModal.title')}</h2>
                        <div className="space-y-4">
                            <Button variant="outline" className="w-full gap-2" onClick={handleCopyLink}>
                                <Copy className="w-4 h-4" />
                                {copied ? t('shareModal.copied') : t('shareModal.copyLink')}
                            </Button>
                            <Button variant="outline" className="w-full gap-2" onClick={() => window.open(`mailto:?subject=${encodeURIComponent(t('shareModal.emailSubject', { id: result.id }))}&body=${encodeURIComponent(window.location.href)}`)}>
                                <Mail className="w-4 h-4" />
                                {t('shareModal.sendEmail')}
                            </Button>
                        </div>
                        <Button variant="ghost" className="w-full mt-4" onClick={() => setShowShareModal(false)}>
                            {t('close')}
                        </Button>
                    </motion.div>
                </div>
            )}

            {/* Manual Review Modal */}
            {showReviewModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl"
                    >
                        {!reviewSubmitted ? (
                            <>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">{t('reviewModal.title')}</h2>
                                <p className="text-gray-600 mb-6">{t('reviewModal.description')}</p>
                                <div className="mb-4">
                                    <label htmlFor="review-comment" className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('reviewModal.commentLabel')}
                                    </label>
                                    <textarea
                                        id="review-comment"
                                        value={reviewComment}
                                        onChange={(e) => setReviewComment(e.target.value)}
                                        placeholder={t('reviewModal.commentPlaceholder')}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all min-h-[120px]"
                                        aria-describedby="comment-help"
                                    />
                                    <p id="comment-help" className="text-xs text-gray-500 mt-1">
                                        {t('reviewModal.commentHelp')}
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="ghost" className="flex-1" onClick={() => setShowReviewModal(false)}>
                                        {t('cancel')}
                                    </Button>
                                    <Button variant="glow" className="flex-1" onClick={handleSubmitReview} disabled={!reviewComment.trim()}>
                                        {t('reviewModal.submit')}
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                <h2 className="text-xl font-bold text-gray-900 mb-2">{t('reviewModal.successTitle')}</h2>
                                <p className="text-gray-600">{t('reviewModal.successMessage')}</p>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </div>
    );
}
