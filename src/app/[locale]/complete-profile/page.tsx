"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

interface University {
  id: number
  number: string
  logo: string
  url: string
}

export default function CompleteProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [universities, setUniversities] = useState<University[]>([])
  const [selectedUni, setSelectedUni] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    fetch(`${apiUrl}/auth/universities`)
      .then(res => res.json())
      .then(data => {
        if (data.universities) {
          setUniversities(data.universities)
        } else if (Array.isArray(data)) {
          setUniversities(data)
        }
      })
      .catch(err => {
        console.error('Error cargando universidades:', err)
        setError('Error al cargar universidades')
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/auth/complete-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify({ uni_id: parseInt(selectedUni) })
      })

      if (response.ok) {
        router.push('/perfil')
      } else {
        const data = await response.json()
        setError(data.detail?.message || data.detail || 'Error al completar perfil')
      }
    } catch (err) {
      console.error('Error:', err)
      setError('Error de conexión con el servidor')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <h2 className="mb-6 text-2xl font-bold text-center">Completa tu Perfil</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Selecciona tu Universidad
            </label>
            <select
              value={selectedUni}
              onChange={(e) => setSelectedUni(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">-- Selecciona una universidad --</option>
              {universities.map((uni) => (
                <option key={uni.id} value={uni.id}>
                  {uni.number}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="p-3 text-red-600 bg-red-50 border border-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !selectedUni}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Guardando...' : 'Completar Perfil'}
          </button>
        </form>
      </div>
    </div>
  )
}
