"use client"

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const errorMessages: Record<string, string> = {
    'Configuration': 'Hay un problema con la configuración del servidor',
    'AccessDenied': 'Acceso denegado',
    'Verification': 'El token de verificación ha expirado o ya fue usado',
    'Default': 'Ha ocurrido un error durante la autenticación',
  }

  const message = error ? (errorMessages[error] || errorMessages.Default) : errorMessages.Default

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-10 shadow">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-xl font-bold text-gray-900">Error de autenticación</h2>
          <p className="mt-2 text-gray-600">{message}</p>
        </div>

        <div className="mt-6">
          <a
            href="/login"
            className="block w-full rounded-lg bg-blue-600 px-4 py-3 text-center text-white hover:bg-blue-700 transition-colors"
          >
            Volver al login
          </a>
        </div>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Cargando...</div>}>
      <ErrorContent />
    </Suspense>
  )
}
