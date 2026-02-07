'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import {
    Shield,
    User,
    Building2,
    LogOut,
    ArrowRight,
    FileCheck,
    BookOpen,
    HeadphonesIcon,
    CreditCard,
    TrendingUp,
    Clock,
    CheckCircle,
    Activity,
    History,
    Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';

interface UserData {
    name: string;
    email: string;
    institution: string;
    userType: 'student' | 'university';
    registeredAt: string;
}

export default function DashboardPage() {
    const t = useTranslations('dashboard');
    const router = useRouter();
    const [user, setUser] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            router.push('/login');
            return;
        }

        try {
            const userData = JSON.parse(currentUser);
            setUser(userData);
        } catch (e) {
            router.push('/login');
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        router.push('/login');
    };

    if (isLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    const quickAccessCards = [
        {
            icon: Plus,
            title: t('cards.newAnalysis.title'),
            description: t('cards.newAnalysis.description'),
            action: t('cards.newAnalysis.action'),
            href: '/demo',
            gradient: 'from-green-500 to-green-600',
            bgGradient: 'from-green-50 to-green-100'
        },
        {
            icon: History,
            title: t('cards.history.title'),
            description: t('cards.history.description'),
            action: t('cards.history.action'),
            href: '/dashboard/historial',
            gradient: 'from-primary-500 to-primary-600',
            bgGradient: 'from-primary-50 to-primary-100'
        },
        {
            icon: BookOpen,
            title: t('cards.documentation.title'),
            description: t('cards.documentation.description'),
            action: t('cards.documentation.action'),
            href: '/solucion',
            gradient: 'from-accent-500 to-accent-600',
            bgGradient: 'from-accent-50 to-accent-100'
        },
        {
            icon: HeadphonesIcon,
            title: t('cards.support.title'),
            description: t('cards.support.description'),
            action: t('cards.support.action'),
            href: '/contacto',
            gradient: 'from-purple-500 to-purple-600',
            bgGradient: 'from-purple-50 to-purple-100'
        }
    ];

    const stats = [
        {
            icon: FileCheck,
            label: t('stats.validations'),
            value: '0',
            trend: '+0%',
            color: 'text-primary-600',
            bgColor: 'bg-primary-50'
        },
        {
            icon: Clock,
            label: t('stats.pending'),
            value: '0',
            trend: '0',
            color: 'text-accent-600',
            bgColor: 'bg-accent-50'
        },
        {
            icon: CheckCircle,
            label: t('stats.approved'),
            value: '0',
            trend: '+0%',
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        },
        {
            icon: TrendingUp,
            label: t('stats.successRate'),
            value: '0%',
            trend: '+0%',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 pt-24 pb-16">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Welcome Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <div className="bg-white/95 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200/30 p-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-lg">
                                        {user.userType === 'student' ? (
                                            <User className="h-10 w-10 text-white" />
                                        ) : (
                                            <Building2 className="h-10 w-10 text-white" />
                                        )}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                                </div>

                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                        {t('welcome')}, {user.name}! 👋
                                    </h1>
                                    <p className="text-lg text-gray-600 flex items-center gap-2">
                                        <Building2 className="h-5 w-5" />
                                        {user.institution}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Link href="/">
                                    <Button variant="outline" className="gap-2">
                                        <Shield className="h-4 w-4" />
                                        Inicio
                                    </Button>
                                </Link>
                                <Button onClick={handleLogout} variant="outline" className="gap-2">
                                    <LogOut className="h-4 w-4" />
                                    {t('actions.logout')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Access Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-8"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('quickAccess')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {quickAccessCards.map((card, index) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            >
                                <Link href={card.href}>
                                    <div className={`bg-gradient-to-br ${card.bgGradient} border border-gray-200/30 rounded-xl p-6 h-full cursor-pointer group transition-all duration-300 hover:shadow-xl`}>
                                        <div className={`w-14 h-14 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <card.icon className="h-7 w-7 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                                        <p className="text-gray-600 mb-4 text-sm">{card.description}</p>
                                        <div className="flex items-center text-primary-600 font-medium text-sm group-hover:gap-2 transition-all duration-300">
                                            {card.action}
                                            <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Statistics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-8"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('statistics')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                className="bg-white/95 backdrop-blur-md shadow-lg rounded-xl border border-gray-200/30 p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                    </div>
                                    <span className="text-sm font-medium text-green-600">{stat.trend}</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('recentActivity')}</h2>
                    <div className="bg-white/95 backdrop-blur-md shadow-lg rounded-xl border border-gray-200/30 p-8">
                        <div className="text-center py-12">
                            <Activity className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">{t('activity.noActivity')}</p>
                            <p className="text-gray-400 text-sm mt-2">
                                Las convalidaciones que proceses aparecerán aquí
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
