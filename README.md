# VitalApp Frontend

Sistema de triaje médico - Interfaz web

## 🚀 Instalación
```bash
# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env

# Iniciar en desarrollo
npm run dev
```

## 🛠️ Scripts

- `npm run dev` - Modo desarrollo (puerto 3000)
- `npm run build` - Build para producción
- `npm run preview` - Preview del build

## 🔑 Configuración

Editar `.env`:
```
VITE_API_URL=http://localhost:8080
```

## 📦 Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Query
- Axios
- Zustand
- React Router DOM

## 🏗️ Estructura
```
src/
├── api/          # Configuración Axios y endpoints
├── components/   # Componentes reutilizables
├── pages/        # Páginas
├── hooks/        # Custom hooks
├── store/        # Zustand stores
├── routes/       # Configuración de rutas
└── utils/        # Utilidades
```

## 🔐 Autenticación

El sistema usa JWT tokens almacenados en localStorage.
El token se agrega automáticamente a todas las peticiones.
El refresh token se usa para renovar automáticamente el acceso.