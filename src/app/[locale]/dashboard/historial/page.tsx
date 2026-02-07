'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    ArrowLeft,
    Search,
    Filter,
    ChevronDown,
    ChevronUp,
    ChevronLeft,
    ChevronRight,
    FileText,
    CheckCircle,
    AlertTriangle,
    XCircle,
    Calendar,
    Building2,
    Eye,
    Download
} from 'lucide-react';

// Mock data for analysis history
const mockAnalyses = [
    {
        id: 'RPT-2025-001',
        date: '2025-12-01',
        originCourse: 'Ingeniería Informática',
        originUniversity: 'Universidad de Valencia',
        targetCourse: 'Grado en Informática',
        targetUniversity: 'Universidad Politécnica de Madrid',
        status: 'approved',
        score: 94,
        subjects: 25
    },
    {
        id: 'RPT-2025-002',
        date: '2025-11-28',
        originCourse: 'Administración de Empresas',
        originUniversity: 'Universidad de Barcelona',
        targetCourse: 'ADE',
        targetUniversity: 'Universidad Complutense',
        status: 'pending',
        score: 76,
        subjects: 18
    },
    {
        id: 'RPT-2025-003',
        date: '2025-11-25',
        originCourse: 'Derecho',
        originUniversity: 'Universidad de Salamanca',
        targetCourse: 'Grado en Derecho',
        targetUniversity: 'Universidad de Navarra',
        status: 'rejected',
        score: 45,
        subjects: 22
    },
    {
        id: 'RPT-2025-004',
        date: '2025-11-20',
        originCourse: 'Medicina',
        originUniversity: 'Universidad de Granada',
        targetCourse: 'Medicina',
        targetUniversity: 'Universidad Autónoma de Madrid',
        status: 'approved',
        score: 89,
        subjects: 35
    },
    {
        id: 'RPT-2025-005',
        date: '2025-11-15',
        originCourse: 'Arquitectura',
        originUniversity: 'Universidad de Sevilla',
        targetCourse: 'Grado en Arquitectura',
        targetUniversity: 'Universidad de Málaga',
        status: 'pending',
        score: 72,
        subjects: 28
    },
    {
        id: 'RPT-2025-006',
        date: '2025-11-10',
        originCourse: 'Psicología',
        originUniversity: 'Universidad de Murcia',
        targetCourse: 'Grado en Psicología',
        targetUniversity: 'Universidad de Oviedo',
        status: 'approved',
        score: 91,
        subjects: 20
    },
    {
        id: 'RPT-2025-007',
        date: '2025-11-05',
        originCourse: 'Economía',
        originUniversity: 'Universidad de Zaragoza',
        targetCourse: 'Grado en Economía',
        targetUniversity: 'Universidad Carlos III',
        status: 'rejected',
        score: 38,
        subjects: 15
    },
    {
        id: 'RPT-2025-008',
        date: '2025-10-30',
        originCourse: 'Ingeniería Civil',
        originUniversity: 'Universidad de Cantabria',
        targetCourse: 'Grado en Ingeniería Civil',
        targetUniversity: 'Universidad Politécnica de Valencia',
        status: 'approved',
        score: 88,
        subjects: 30
    }
];

type SortField = 'date' | 'score' | 'subjects';
type SortOrder = 'asc' | 'desc';
type StatusFilter = 'all' | 'approved' | 'pending' | 'rejected';

export default function HistorialPage() {
    const t = useTranslations('historial');

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
    const [sortField, setSortField] = useState<SortField>('date');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Filter and sort data
    const filteredData = useMemo(() => {
        let data = [...mockAnalyses];

        // Apply search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            data = data.filter(item =>
                item.originCourse.toLowerCase().includes(term) ||
                item.targetCourse.toLowerCase().includes(term) ||
                item.originUniversity.toLowerCase().includes(term) ||
                item.targetUniversity.toLowerCase().includes(term) ||
                item.id.toLowerCase().includes(term)
            );
        }

        // Apply status filter
        if (statusFilter !== 'all') {
            data = data.filter(item => item.status === statusFilter);
        }

        // Apply sorting
        data.sort((a, b) => {
            let comparison = 0;
            if (sortField === 'date') {
                comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
            } else if (sortField === 'score') {
                comparison = a.score - b.score;
            } else if (sortField === 'subjects') {
                comparison = a.subjects - b.subjects;
            }
            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return data;
    }, [searchTerm, statusFilter, sortField, sortOrder]);

    // Pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('desc');
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved':
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'pending':
                return <AlertTriangle className="w-4 h-4 text-amber-500" />;
            case 'rejected':
                return <XCircle className="w-4 h-4 text-red-500" />;
            default:
                return null;
        }
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            approved: 'bg-green-100 text-green-700 border-green-200',
            pending: 'bg-amber-100 text-amber-700 border-amber-200',
            rejected: 'bg-red-100 text-red-700 border-red-200'
        };
        const labels = {
            approved: t('status.approved'),
            pending: t('status.pending'),
            rejected: t('status.rejected')
        };
        return (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
                {getStatusIcon(status)}
                {labels[status as keyof typeof labels]}
            </span>
        );
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-600';
        if (score >= 70) return 'text-amber-600';
        return 'text-red-600';
    };

    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortField !== field) return <ChevronDown className="w-4 h-4 text-gray-400" />;
        return sortOrder === 'asc'
            ? <ChevronUp className="w-4 h-4 text-primary-600" />
            : <ChevronDown className="w-4 h-4 text-primary-600" />;
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
                    <Link href="/dashboard">
                        <Button variant="ghost" className="mb-4 gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            {t('backToDashboard')}
                        </Button>
                    </Link>

                    <div className="bg-white/95 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200/30 p-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {t('title')}
                                </h1>
                                <p className="text-gray-600">
                                    {t('subtitle')}
                                </p>
                            </div>
                            <Link href="/demo">
                                <Button variant="glow" className="gap-2">
                                    <FileText className="h-4 w-4" />
                                    {t('newAnalysis')}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-6"
                >
                    <Card className="bg-white/95 backdrop-blur-md border-gray-200/30">
                        <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Search */}
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder={t('searchPlaceholder')}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                        aria-label={t('searchPlaceholder')}
                                    />
                                </div>

                                {/* Status Filter */}
                                <div className="flex items-center gap-2">
                                    <Filter className="h-4 w-4 text-gray-400" />
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                                        className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                        aria-label={t('filterByStatus')}
                                    >
                                        <option value="all">{t('status.all')}</option>
                                        <option value="approved">{t('status.approved')}</option>
                                        <option value="pending">{t('status.pending')}</option>
                                        <option value="rejected">{t('status.rejected')}</option>
                                    </select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Results Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Card className="bg-white/95 backdrop-blur-md border-gray-200/30 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full" role="table" aria-label={t('tableAriaLabel')}>
                                <thead className="bg-gray-50/80 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <button
                                                onClick={() => handleSort('date')}
                                                className="flex items-center gap-1 hover:text-primary-600 transition-colors"
                                                aria-label={t('sortByDate')}
                                            >
                                                <Calendar className="w-4 h-4" />
                                                {t('columns.date')}
                                                <SortIcon field="date" />
                                            </button>
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            {t('columns.origin')}
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            {t('columns.target')}
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            {t('columns.status')}
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <button
                                                onClick={() => handleSort('score')}
                                                className="flex items-center gap-1 hover:text-primary-600 transition-colors"
                                                aria-label={t('sortByScore')}
                                            >
                                                {t('columns.score')}
                                                <SortIcon field="score" />
                                            </button>
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            {t('columns.actions')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {paginatedData.length > 0 ? (
                                        paginatedData.map((item, index) => (
                                            <motion.tr
                                                key={item.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                                className="hover:bg-gray-50/50 transition-colors"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {new Date(item.date).toLocaleDateString('es-ES', {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}
                                                    </div>
                                                    <div className="text-xs text-gray-500">{item.id}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900">{item.originCourse}</div>
                                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                                        <Building2 className="w-3 h-3" />
                                                        {item.originUniversity}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900">{item.targetCourse}</div>
                                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                                        <Building2 className="w-3 h-3" />
                                                        {item.targetUniversity}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getStatusBadge(item.status)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className={`text-lg font-bold ${getScoreColor(item.score)}`}>
                                                        {item.score}%
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {item.subjects} {t('subjects')}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link href={`/dashboard/resultados/${item.id}`}>
                                                            <Button variant="ghost" size="sm" className="gap-1">
                                                                <Eye className="w-4 h-4" />
                                                                {t('viewDetails')}
                                                            </Button>
                                                        </Link>
                                                        <Button variant="outline" size="sm" className="gap-1">
                                                            <Download className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center">
                                                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                                <p className="text-gray-500">{t('noResults')}</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="bg-gray-50/80 border-t border-gray-200 px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-600">
                                        {t('showing', {
                                            from: (currentPage - 1) * itemsPerPage + 1,
                                            to: Math.min(currentPage * itemsPerPage, filteredData.length),
                                            total: filteredData.length
                                        })}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            aria-label={t('previousPage')}
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </Button>
                                        <span className="text-sm text-gray-600">
                                            {currentPage} / {totalPages}
                                        </span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                            aria-label={t('nextPage')}
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
