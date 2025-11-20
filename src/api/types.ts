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
}

// User Types
export interface User {
  id: number
  username: string
  email: string
}