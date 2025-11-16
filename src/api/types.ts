// Auth Types
export type UserRole = 'ROLE_ADMIN' | 'ROLE_DOCTOR' | 'ROLE_PATIENT'

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  roles?: UserRole[]
}

export interface AuthResponse {
  token: string
  refreshToken: string
  type: string
  id: number
  username: string
  email: string
  roles: UserRole[]
}

// User Types
export interface User {
  id: number
  username: string
  email: string
  roles: UserRole[]
  patientId?: number // Solo si el usuario es paciente
}