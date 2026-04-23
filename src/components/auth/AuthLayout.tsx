'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  const [universityCount, setUniversityCount] = useState<number | null>(null);
  const [convalidationCount, setConvalidationCount] = useState<number | null>(null);
  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/$/, '');

  useEffect(() => {
    let cancelled = false;

    const readCount = (data: unknown): number | null => {
      if (typeof data === 'number') return data;
      if (Array.isArray(data)) return data.length;
      if (data && typeof data === 'object') {
        const obj = data as Record<string, unknown>;
        const val = obj.count ?? obj.total ?? obj.length;
        if (typeof val === 'number') return val;
      }
      return null;
    };

    const fetchFirstCount = async (paths: string[]): Promise<number | null> => {
      for (const path of paths) {
        try {
          const res = await fetch(`${apiBaseUrl}${path}`, { cache: 'no-store' });
          if (!res.ok) continue;
          const json = await res.json();
          const count = readCount(json);
          if (count !== null) return count;
        } catch {
          // ignore
        }
      }
      return null;
    };

    (async () => {
      const uni = await fetchFirstCount(['/universidades']);
      const conv = await fetchFirstCount([
        '/peticiondocumento',
        '/peticiondocumentos',
        '/peticion-documento',
        '/peticiones-documento'
      ]);

      if (!cancelled) {
        setUniversityCount(uni);
        setConvalidationCount(conv);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [apiBaseUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link href="/" className="inline-flex items-center justify-center space-x-3 mb-6 group">
            <div className="relative">
              <Shield className="h-12 w-12 text-primary-600 transition-transform group-hover:scale-110" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-3xl font-bold text-gray-900">Certified</span>
          </Link>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          <p className="text-gray-600">
            {subtitle}
          </p>
        </motion.div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl border border-gray-200/30 p-8"
        >
          {children}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-4 text-center"
        >
          <p className="text-xs text-gray-600 mb-2">
            Plataforma confiable por secretarías académicas
          </p>
          <div className="flex justify-center items-center space-x-6 text-gray-400">
            <div className="text-center">
              <div className="text-lg font-bold text-primary-600">{universityCount !== null ? universityCount.toLocaleString() : '—'}</div>
              <div className="text-xs">Universidades</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-accent-600">{convalidationCount !== null ? convalidationCount.toLocaleString() : '—'}</div>
              <div className="text-xs">Convalidaciones</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">99.9%</div>
              <div className="text-xs">Precisión</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
