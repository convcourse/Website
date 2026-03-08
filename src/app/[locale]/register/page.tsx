"use client"

import { useEffect } from 'react'

export default function RegisterPage() {
  useEffect(() => {
    const keycloakIssuer = process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER || 'http://localhost:8080/realms/convalid'
    const clientId = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || 'frontend-client'
    const redirectUri = encodeURIComponent(window.location.origin + '/complete-profile')
    
    const keycloakRegisterUrl = `${keycloakIssuer}/protocol/openid-connect/registrations?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`
    
    window.location.href = keycloakRegisterUrl
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-4 text-gray-600">Redirigiendo al registro...</p>
      </div>
    </div>
  )
}
