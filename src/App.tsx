import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Dashboard from '@/pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal redirige a login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Ruta de login */}
        <Route path="/login" element={<Login />} />

        {/* Ruta de registro */}
        <Route path="/register" element={<Register />} />

        {/* Ruta de dashboard (protegida) */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Ruta 404 - redirige a login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App