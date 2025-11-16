import { NavLink } from 'react-router-dom'
import { Home, Users, Activity, Calendar, Bell, Sparkles } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useRole } from '@/hooks/useRole'
import { useAuthStore } from '@/store/authStore'

const navigation = [
  { name: 'Dashboard', to: '/dashboard', icon: Home, roles: ['all'] },
  { name: 'Pacientes', to: '/patients', icon: Users, roles: ['ROLE_DOCTOR', 'ROLE_ADMIN'] },
  { name: 'Triajes', to: '/triages', icon: Activity, roles: ['ROLE_DOCTOR', 'ROLE_ADMIN'] },
  { name: 'Mis Triajes', to: '/my-triages', icon: Activity, roles: ['ROLE_PATIENT'] },
  { name: 'Citas', to: '/appointments', icon: Calendar, roles: ['ROLE_DOCTOR', 'ROLE_ADMIN'] },
  { name: 'Mis Citas', to: '/my-appointments', icon: Calendar, roles: ['ROLE_PATIENT'] },
  { name: 'Notificaciones', to: '/notifications', icon: Bell, roles: ['all'] },
  { name: 'Asistente IA', to: '/ai-assistant', icon: Sparkles, roles: ['all'] },
]

export const Sidebar = () => {
  const { user } = useAuthStore()

  // Filtrar navegación según rol
  const filteredNav = navigation.filter(item =>
    item.roles.includes('all') ||
    user?.roles.some(role => item.roles.includes(role))
  )

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4 space-y-2">
        {filteredNav.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}