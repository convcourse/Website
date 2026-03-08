"use client"

import { signIn } from "next-auth/react"
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

function LoginContent() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/perfil'

  useEffect(() => {
    signIn('keycloak', { callbackUrl })
  }, [callbackUrl])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-4 text-gray-600">Redirigiendo a Keycloak...</p>
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
