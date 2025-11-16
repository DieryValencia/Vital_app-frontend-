import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import type { UserRole } from '@/api/types'

interface RoleProtectedRouteProps {
  allowedRoles: UserRole[]
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  allowedRoles,
  children,
  fallback
}) => {
  const { user } = useAuthStore()
  const hasPermission = user?.roles.some(role => allowedRoles.includes(role))

  if (!hasPermission) {
    return fallback || <Navigate to="/dashboard" />
  }

  return <>{children}</>
}