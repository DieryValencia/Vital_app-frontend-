import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { ProtectedRoute } from './ProtectedRoute'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Inicio from '@/pages/Dashboard'
import PatientsPage from '@/pages/Patients'
import TriagesPage from '@/pages/Triages'
import AppointmentsPage from '@/pages/Appointments'
import NotificationsPage from '@/pages/Notifications'
import AIAssistantPage from '@/pages/AIAssistant'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas protegidas */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/inicio" replace />} />
        <Route path="inicio" element={<Inicio />} />
        <Route path="patients" element={<PatientsPage />} />
        <Route path="triages" element={<TriagesPage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="ai-assistant" element={<AIAssistantPage />} />
      </Route>

      {/* Ruta 404 */}
      <Route path="*" element={<Navigate to="/inicio" replace />} />
    </Routes>
  )
}