"use client"

import { signIn } from "next-auth/react"
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function LoginContent() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/perfil'

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-10 shadow">
        <div className="text-center">
          <h2 className="text-3xl font-bold">ConvCourse</h2>
          <p className="mt-2 text-gray-600">Inicia sesión con tu cuenta</p>
        </div>
        
        <button
          onClick={() => signIn('keycloak', { callbackUrl })}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 transition-colors"
        >
          Iniciar Sesión con Keycloak
        </button>
        
        <p className="text-center text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Cargando...</div>}>
      <LoginContent />
    </Suspense>
  )
}
