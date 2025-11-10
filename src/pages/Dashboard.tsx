import { useAuthStore } from '@/store/authStore'
import { Card } from '@/components/ui/Card'

export default function Dashboard() {
  const { user } = useAuthStore()

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Bienvenido, {user?.username}!</h2>
        <p className="text-gray-600">
          Esta es la página principal del sistema VitalApp.
        </p>
        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-500">
            <strong>Email:</strong> {user?.email}
          </p>
          <p className="text-sm text-gray-500">
            <strong>Roles:</strong> {user?.roles.join(', ')}
          </p>
        </div>
      </Card>
    </div>
  )
}