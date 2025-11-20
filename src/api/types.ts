// Auth Types
export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
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
export type UserRole = "USER"

export interface User {
  id: number
  username: string
  email: string
  roles: UserRole[]
}