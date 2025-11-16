import { useAuthStore } from '@/store/authStore'
import type { UserRole } from '@/api/types'

export const useRole = () => {
  const { user } = useAuthStore()

  return {
    isAdmin: user?.roles.includes('ROLE_ADMIN'),
    isDoctor: user?.roles.includes('ROLE_DOCTOR'),
    isPatient: user?.roles.includes('ROLE_PATIENT'),
    hasRole: (role: UserRole) => user?.roles.includes(role),
  }
}