import { useAuthStore } from '@/store/authStore'
import { Card } from '@/components/ui/Card'
import { usePatients } from '@/hooks/usePatients'
import { useTriages } from '@/hooks/useTriages'
import { useAppointments } from '@/hooks/useAppointments'
import { Users, Activity, Calendar, TrendingUp, Heart, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Inicio() {
  const { user } = useAuthStore()
  const { patients } = usePatients()
  const { triages } = useTriages()
  const { appointments } = useAppointments()
  const navigate = useNavigate()

  const stats = [
    {
      label: 'Pacientes',
      value: patients?.length || 0,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      route: '/patients',
    },
    {
      label: 'Triajes',
      value: triages?.length || 0,
      icon: Activity,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      route: '/triages',
    },
    {
      label: 'Citas',
      value: appointments?.length || 0,
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      route: '/appointments',
    },
  ]

  const upcomingAppointments = appointments?.slice(0, 3) || []
  const recentTriages = triages?.slice(0, 3) || []

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 text-white shadow-xl">
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/10"></div>
        <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-white/10"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">¡Bienvenido, {user?.username}! 👋</h1>
          <p className="text-lg text-blue-100">Tu plataforma de gestión médica inteligente</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <button
              key={stat.label}
              onClick={() => navigate(stat.route)}
              className={`relative overflow-hidden rounded-xl p-6 text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl cursor-pointer bg-gradient-to-br ${stat.color}`}
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="text-left">
                  <p className="text-white/80 text-sm font-medium">{stat.label}</p>
                  <p className="text-4xl font-bold mt-2">{stat.value}</p>
                </div>
                <Icon className="h-16 w-16 text-white/30" />
              </div>
            </button>
          )
        })}
      </div>

      {/* User Profile & Quick Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1 bg-gradient-to-br from-cyan-50 to-blue-50 border-0 shadow-lg">
          <div className="flex flex-col items-center text-center p-6">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl mb-4">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <h3 className="text-xl font-bold text-gray-900">{user?.username}</h3>
            <p className="text-sm text-gray-600 mt-1">{user?.email}</p>
            <div className="mt-4 pt-4 border-t border-gray-200 w-full">
              <p className="text-xs text-gray-600 mb-2"><strong>Roles:</strong></p>
              <div className="flex flex-wrap gap-2 justify-center">
                {user?.roles.map((role, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold rounded-full"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-amber-50 to-orange-50 border-0 shadow-lg">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Acciones Rápidas
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: Users, label: 'Nuevo Paciente', color: 'from-blue-400 to-blue-500', action: () => navigate('/patients') },
                { icon: Activity, label: 'Registrar Triaje', color: 'from-green-400 to-green-500', action: () => navigate('/triages') },
                { icon: Calendar, label: 'Agendar Cita', color: 'from-purple-400 to-purple-500', action: () => navigate('/appointments') },
                { icon: TrendingUp, label: 'Ver Reportes', color: 'from-orange-400 to-orange-500', action: () => navigate('/triages') },
                { icon: CheckCircle, label: 'Historial', color: 'from-pink-400 to-pink-500', action: () => navigate('/appointments') },
                { icon: AlertCircle, label: 'Alertas', color: 'from-red-400 to-red-500', action: () => navigate('/notifications') },
              ].map((action, idx) => {
                const ActionIcon = action.icon
                return (
                  <button
                    key={idx}
                    onClick={action.action}
                    className={`p-4 rounded-lg bg-gradient-to-br ${action.color} text-white text-center cursor-pointer hover:shadow-lg transition-shadow hover:scale-105 transform duration-200`}
                  >
                    <ActionIcon className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-xs font-semibold">{action.label}</p>
                  </button>
                )
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximas Citas */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              Próximas Citas
            </h3>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-3">
                {upcomingAppointments.map((apt, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-lg border-l-4 border-purple-500">
                    <p className="font-semibold text-sm text-gray-900">
                      {apt.patient?.firstName} {apt.patient?.lastName}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{apt.specialty}</p>
                    <p className="text-xs text-gray-500 mt-1">{apt.appointmentDate}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No hay citas próximas</p>
            )}
          </div>
        </Card>

        {/* Triajes Recientes */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-500" />
              Triajes Recientes
            </h3>
            {recentTriages.length > 0 ? (
              <div className="space-y-3">
                {recentTriages.map((triage, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-lg border-l-4 border-green-500">
                    <p className="font-semibold text-sm text-gray-900">
                      {triage.patient?.firstName} {triage.patient?.lastName}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${
                        triage.priority === 'EMERGENCIA' ? 'bg-red-500' :
                        triage.priority === 'URGENTE' ? 'bg-orange-500' :
                        triage.priority === 'MENOS_URGENTE' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}>
                        {triage.priority}
                      </span>
                      <span className="text-xs text-gray-500">{triage.triageDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No hay triajes registrados</p>
            )}
          </div>
        </Card>
      </div>

      {/* Footer Stats */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div>
            <Clock className="h-6 w-6 mx-auto mb-2 text-indigo-200" />
            <p className="text-2xl font-bold">{upcomingAppointments.length}</p>
            <p className="text-sm text-indigo-200">Citas Próximas</p>
          </div>
          <div>
            <Heart className="h-6 w-6 mx-auto mb-2 text-indigo-200" />
            <p className="text-2xl font-bold">{recentTriages.length}</p>
            <p className="text-sm text-indigo-200">Triajes Activos</p>
          </div>
          <div>
            <Users className="h-6 w-6 mx-auto mb-2 text-indigo-200" />
            <p className="text-2xl font-bold">{patients?.length || 0}</p>
            <p className="text-sm text-indigo-200">Pacientes Totales</p>
          </div>
          <div>
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-indigo-200" />
            <p className="text-2xl font-bold">98%</p>
            <p className="text-sm text-indigo-200">Satisfacción</p>
          </div>
        </div>
      </Card>
    </div>
  )
}