"use client"

import { useSession, signOut } from 'next-auth/react'
import { useApi } from '@/hooks/useApi'
import { useEffect, useState } from 'react'

interface UserProfile {
  id: number
  keycloak_id: string
  name: string
  email: string
  apellido1: string
  apellido2: string | null
  uni_id: number
  universidad: {
    id: number
    number: string
    logo: string
    url: string
  }
}

export default function DashboardPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = '/login'
    },
  })
  const { fetchApi } = useApi()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'authenticated') {
      fetchApi('/auth/me')
        .then(data => {
          setProfile(data)
          setLoading(false)
        })
        .catch(err => {
          console.error('Error loading profile:', err)
          setError(err.message)
          setLoading(false)
        })
    }
  }, [status, fetchApi])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="max-w-md p-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Bienvenido, {profile?.name}
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Dashboard de ConvCourse
                </p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>

            {profile && (
              <div className="mt-6 border-t border-gray-200 pt-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Nombre completo</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {profile.name} {profile.apellido1} {profile.apellido2}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{profile.email}</dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Universidad</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {profile.universidad.number}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">ID de usuario</dt>
                    <dd className="mt-1 text-sm text-gray-900 font-mono">
                      {profile.id}
                    </dd>
                  </div>
                </dl>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            ✅ Autenticación con Keycloak funcionando correctamente
          </p>
        </div>
      </div>
    </div>
  )
}
