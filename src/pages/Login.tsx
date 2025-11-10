import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'

/**
 * Esquema de validación con zod
 */
const loginSchema = z.object({
  username: z.string().min(3, 'El usuario debe tener al menos 3 caracteres'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function Login() {
  const navigate = useNavigate()
  const { login, isLoggingIn } = useAuth() // asumimos que login devuelve una Promise y isLoggingIn es booleano
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  // Estado para mostrar errores en UI (mensaje textual en alerta roja)
  const [serverError, setServerError] = useState<string | null>(null)

  // Estado local para "simular error" en la vista (DEV only)
  const [simulateError, setSimulateError] = useState(false)

  const onSubmit = async (data: LoginForm) => {
    // limpiar errores previos
    setServerError(null)

    // comportamiento de simulación de error (solo para ver la UI)
    if (simulateError) {
      setServerError('Error simulado: credenciales inválidas (modo demo)')
      return
    }

    try {
      // Llamar a login que ahora es una función que inicia la mutación
      await login(data)
      // La redirección se maneja en useAuth onSuccess
    } catch (err: any) {
      // Mostrar el mensaje devuelto por el backend (si existe) o un mensaje genérico
      const message = err?.response?.data?.message || err?.message || 'No se pudo conectar con el servidor. Verifica backend.'
      setServerError(message)
      console.error('Login error:', err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg p-8">
        {/* Encabezado con ícono */}
        <div className="flex items-center gap-4 mb-6">
          {/* Ícono a la izquierda: puedes reemplazar por una imagen si prefieres */}
          <div className="flex-shrink-0 rounded-full bg-sky-100 p-2">
            <svg
              className="h-10 w-10 text-sky-600"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              {/* símbolo tipo cruz médica estilizada */}
              <path
                d="M12 2a1 1 0 0 1 1 1v8h8a1 1 0 0 1 0 2h-8v8a1 1 0 0 1-2 0v-8H3a1 1 0 0 1 0-2h8V3a1 1 0 0 1 1-1z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-sky-600">VitalApp</h1>
            <p className="text-sm text-gray-600">Sistema de Triaje Médico</p>
          </div>
        </div>

        {/* -- Alerta de error (UI, en lugar de toast) -- */}
        {serverError && (
          <div
            role="alert"
            aria-live="assertive"
            className="mb-4 rounded-md bg-red-50 border border-red-100 p-3 text-sm text-red-700"
          >
            <strong className="font-medium">Error: </strong>
            <span className="ml-1">{serverError}</span>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Input
            label="Usuario"
            placeholder="Ingrese su usuario"
            error={errors.username?.message}
            aria-invalid={!!errors.username}
            autoComplete="username"
            {...register('username')}
            // si tu Input no soporta aria-invalid directamente, considera modificarlo para forwardear props
          />

          <Input
            label="Contraseña"
            type="password"
            placeholder="Ingrese su contraseña"
            error={errors.password?.message}
            aria-invalid={!!errors.password}
            autoComplete="current-password"
            {...register('password')}
          />

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoggingIn}
            aria-disabled={isLoggingIn}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? 'Iniciando...' : 'Iniciar Sesión'}
          </Button>

          {/* Opcional: control para simular error en desarrollo */}
          <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={simulateError}
                onChange={(e) => setSimulateError(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                aria-checked={simulateError}
              />
              <span>Simular error (dev)</span>
            </label>

            <Link
              to="/register"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              ¿No tienes cuenta? Regístrate
            </Link>
          </div>
        </form>

        {/* Pie de card */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} VitalApp — Sistema de Triaje Médico</p>
        </div>
      </Card>
    </div>
  )
}
