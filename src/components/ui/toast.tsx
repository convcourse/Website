'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
    message: string;
    variant?: ToastVariant;
    duration?: number;
    onClose?: () => void;
    show?: boolean;
}

const variantConfig = {
    success: {
        icon: CheckCircle,
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        iconColor: 'text-green-600',
        textColor: 'text-green-800',
    },
    error: {
        icon: XCircle,
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        iconColor: 'text-red-600',
        textColor: 'text-red-800',
    },
    info: {
        icon: Info,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        iconColor: 'text-blue-600',
        textColor: 'text-blue-800',
    },
    warning: {
        icon: AlertTriangle,
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        iconColor: 'text-yellow-600',
        textColor: 'text-yellow-800',
    },
};

export function Toast({
    message,
    variant = 'info',
    duration = 4000,
    onClose,
    show = true,
}: ToastProps) {
    const [isVisible, setIsVisible] = useState(show);
    const config = variantConfig[variant];
    const Icon = config.icon;

    useEffect(() => {
        setIsVisible(show);
    }, [show]);

    useEffect(() => {
        if (isVisible && duration > 0) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                if (onClose) {
                    setTimeout(onClose, 300); // Wait for animation to complete
                }
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    const handleClose = () => {
        setIsVisible(false);
        if (onClose) {
            setTimeout(onClose, 300);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="fixed top-4 right-4 z-50 max-w-md w-full"
                    role={variant === 'error' || variant === 'warning' ? 'alert' : 'status'}
                    aria-live={variant === 'error' || variant === 'warning' ? 'assertive' : 'polite'}
                >
                    <div
                        className={`${config.bgColor} ${config.borderColor} border rounded-lg shadow-lg p-4 flex items-start space-x-3`}
                    >
                        <Icon className={`h-5 w-5 ${config.iconColor} flex-shrink-0 mt-0.5`} aria-hidden="true" />
                        <div className="flex-1">
                            <p className={`text-sm font-medium ${config.textColor}`}>{message}</p>
                        </div>
                        <button
                            onClick={handleClose}
                            className={`${config.iconColor} hover:opacity-70 transition-opacity flex-shrink-0`}
                            aria-label="Cerrar notificación"
                        >
                            <X className="h-4 w-4" aria-hidden="true" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Hook para usar el toast fácilmente
export function useToast() {
    const [toast, setToast] = useState<{
        message: string;
        variant: ToastVariant;
        show: boolean;
    } | null>(null);

    const showToast = (message: string, variant: ToastVariant = 'info') => {
        setToast({ message, variant, show: true });
    };

    const hideToast = () => {
        setToast(null);
    };

    return {
        toast,
        showToast,
        hideToast,
    };
}
