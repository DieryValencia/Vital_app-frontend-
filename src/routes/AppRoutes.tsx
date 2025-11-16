import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { ProtectedRoute } from './ProtectedRoute'
import { RoleProtectedRoute } from './RoleProtectedRoute'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Dashboard from '@/pages/Dashboard'
import PatientsPage from '@/pages/Patients'
import TriagesPage from '@/pages/Triages'
import AppointmentsPage from '@/pages/Appointments'
import NotificationsPage from '@/pages/Notifications'
import AIAssistantPage from '@/pages/AIAssistant'
import MyTriagesPage from '@/pages/MyTriages'
import MyAppointmentsPage from '@/pages/MyAppointments'

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
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="patients" element={
          <RoleProtectedRoute allowedRoles={['ROLE_DOCTOR', 'ROLE_ADMIN']}>
            <PatientsPage />
          </RoleProtectedRoute>
        } />
        <Route path="triages" element={
          <RoleProtectedRoute allowedRoles={['ROLE_DOCTOR', 'ROLE_ADMIN']}>
            <TriagesPage />
          </RoleProtectedRoute>
        } />
        <Route path="appointments" element={
          <RoleProtectedRoute allowedRoles={['ROLE_DOCTOR', 'ROLE_ADMIN']}>
            <AppointmentsPage />
          </RoleProtectedRoute>
        } />
        <Route path="my-triages" element={
          <RoleProtectedRoute allowedRoles={['ROLE_PATIENT']}>
            <MyTriagesPage />
          </RoleProtectedRoute>
        } />
        <Route path="my-appointments" element={
          <RoleProtectedRoute allowedRoles={['ROLE_PATIENT']}>
            <MyAppointmentsPage />
          </RoleProtectedRoute>
        } />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="ai-assistant" element={<AIAssistantPage />} />
      </Route>

      {/* Ruta 404 */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}