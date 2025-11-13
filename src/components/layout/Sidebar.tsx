import { NavLink } from 'react-router-dom'
import { Home, Users, Activity, Calendar, Bell, Sparkles } from 'lucide-react'
import { cn } from '@/utils/cn'

const navigation = [
  { name: 'Dashboard', to: '/dashboard', icon: Home },
  { name: 'Pacientes', to: '/patients', icon: Users },
  { name: 'Triajes', to: '/triages', icon: Activity },
  { name: 'Citas', to: '/appointments', icon: Calendar },
  { name: 'Notificaciones', to: '/notifications', icon: Bell },
  { name: 'Asistente IA', to: '/ai-assistant', icon: Sparkles },
]

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => (
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