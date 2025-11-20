import { BrowserRouter } from 'react-router-dom'
import { useEffect } from 'react'
import AppRoutes from '@/routes/AppRoutes'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import { useAuthStore } from '@/store/authStore'

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth)

  useEffect(() => {
    // Inicializar autenticación al cargar la aplicación
    initializeAuth()
  }, [initializeAuth])

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App