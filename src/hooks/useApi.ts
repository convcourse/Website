"use client"

import { useSession } from 'next-auth/react'
import { useCallback } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export function useApi() {
  const { data: session } = useSession()

  const fetchApi = useCallback(async (endpoint: string, options: RequestInit = {}) => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

    if (session?.accessToken) {
      headers['Authorization'] = `Bearer ${session.accessToken}`
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    })

    if (response.status === 428) {
      window.location.href = '/complete-profile'
      throw new Error('Perfil incompleto')
    }

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return response.json()
  }, [session])

  return { fetchApi }
}
