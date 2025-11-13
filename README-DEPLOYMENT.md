# 🚀 VitalApp Frontend - Guía de Deployment en Vercel

## 📋 Tabla de Contenidos
1. [Requisitos Previos](#requisitos-previos)
2. [Configuración Local](#configuración-local)
3. [Deploy en Vercel](#deploy-en-vercel)
4. [Configuración del Backend](#configuración-del-backend)
5. [Variables de Entorno](#variables-de-entorno)
6. [Troubleshooting](#troubleshooting)

---

## 📦 Requisitos Previos

### Herramientas Necesarias
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 o **pnpm**
- **Git** configurado y conectado a GitHub
- **Cuenta de Vercel** (https://vercel.com)
- **Backend** desplegado en Railway o similar

### Verificar Instalación
```bash
node --version   # v18.x.x
npm --version    # 9.x.x
git --version    # 2.x.x
```

---

## 🔧 Configuración Local

### 1. Preparar el Proyecto
```bash
# Clonar o navegar al proyecto
cd vitalapp_frontend

# Instalar dependencias
npm install

# Verificar que todo está bien
npm run build
```

### 2. Archivo .env.development
Ya incluido en el repo. Verifica que existe:
```
VITE_API_URL=http://localhost:8080
VITE_DEBUG=true
```

### 3. Archivo .env.production
Crear basado en `.env.production.example`:
```bash
cp .env.production.example .env.production
```

Editar `.env.production` con tus valores reales:
```
VITE_API_URL=https://tu-backend-railway-app.railway.app
VITE_DEBUG=false
```

⚠️ **IMPORTANTE:** `.env.production` está en `.gitignore`, nunca lo subas a Git.

### 4. Verificar Configuración Local
```bash
# En desarrollo con backend local
npm run dev
# Acceder a http://localhost:5173

# En modo producción (simular deploy)
npm run build
npm run preview
# Acceder a http://localhost:4173
```

---

## 🚀 Deploy en Vercel

### Opción 1: Desde GitHub (Recomendado)

#### Paso 1: Preparar Repositorio
```bash
# Asegurarse de estar en main y actualizado
git status
git add .
git commit -m "Preparar para deploy en Vercel"
git push origin main
```

#### Paso 2: Conectar Vercel
1. Ir a https://vercel.com/dashboard
2. Click en "New Project"
3. Seleccionar repositorio "Vital_app-frontend-"
4. Click "Import"

#### Paso 3: Configurar Proyecto
En la pantalla de configuración:

**Build and Output Settings:**
- Framework Preset: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Environment Variables:**
Agregar todas las variables necesarias:
```
VITE_API_URL = https://tu-backend-railway-app.railway.app
VITE_DEBUG = false
```

Ejemplo si el backend está en Railway:
```
VITE_API_URL = https://vitalapp-backend-production.railway.app
```

#### Paso 4: Deploy
Click en "Deploy"

Esperar hasta que vea ✅ "Congratulations, your site is live at..."

### Opción 2: Desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd vitalapp_frontend
vercel

# Para producción
vercel --prod
```

---

## 🔌 Configuración del Backend

### 1. Obtener URL del Backend
Si está en Railway:
1. Ir a Railway dashboard
2. Seleccionar proyecto VitalApp Backend
3. Ir a "Settings" → "Public Networking"
4. Copiar la URL pública

Ejemplo: `https://vitalapp-backend-production.railway.app`

### 2. Actualizar CORS en Backend

Agregar la URL de Vercel al CORS del backend (Spring Boot):

**application-prod.properties:**
```properties
# CORS Configuration
cors.allowed-origins=https://tuapp.vercel.app,https://tu-dominio-personalizado.com
cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS,PATCH
cors.allowed-headers=*
cors.allow-credentials=true
```

**Si usas Java/Spring:**
```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins(
                "https://tuapp.vercel.app",
                "https://tu-dominio-personalizado.com",
                "http://localhost:3000"
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);
    }
}
```

### 3. Redeploy Backend
Después de actualizar CORS, redeploy el backend en Railway.

---

## 🔐 Variables de Entorno

### Variables Necesarias

| Variable | Desarrollo | Producción | Descripción |
|----------|-----------|-----------|-------------|
| `VITE_API_URL` | `http://localhost:8080` | `https://...railway.app` | URL del backend |
| `VITE_DEBUG` | `true` | `false` | Mostrar logs de debug |
| `VITE_GOOGLE_MAPS_API_KEY` | `` | `tu-key` | (Opcional) Google Maps |

### Cómo Agregar en Vercel

1. Ir a proyecto en Vercel
2. Settings → Environment Variables
3. Agregar cada variable:
   - **Key:** `VITE_API_URL`
   - **Value:** URL del backend
   - **Environments:** Production, Preview, Development
4. Click "Save"
5. Redeploy

### Redeployar después de cambiar variables

```bash
vercel --prod
```

O desde dashboard Vercel → Deployments → Click "Redeploy"

---

## 🧪 Testing Post-Deploy

### 1. Verificar la App
```bash
# Abrir en navegador
https://tuapp.vercel.app

# O click en "Visit" en Vercel dashboard
```

### 2. Verificar Conectividad API
En navegador console (F12):
```javascript
// Debería mostrar la URL del backend
console.log(import.meta.env.VITE_API_URL)
```

### 3. Probar Funcionalidades
- [ ] Cargar página de login
- [ ] Iniciar sesión
- [ ] Ver página de inicio
- [ ] Cargar lista de pacientes
- [ ] Crear nuevo paciente
- [ ] Crear triaje
- [ ] Crear cita
- [ ] Usar análisis de IA

### 4. Ver Logs
```bash
# En Vercel Dashboard
Deployments → Seleccionar último deploy → Logs

# O desde CLI
vercel logs <project-name>
```

---

## 🐛 Troubleshooting

### Error: "Failed to fetch" o "Network Error"

**Causa:** Backend no disponible o CORS no configurado

**Solución:**
1. Verificar URL de backend en variables de entorno
2. Verificar backend está ejecutándose
3. Verificar CORS en backend permite la URL de Vercel
4. Ir a browser console (F12) y revisar Network tab

### Error: "401 Unauthorized"

**Causa:** Token expirado o autenticación fallida

**Solución:**
1. Limpiar localStorage: `localStorage.clear()`
2. Recargar página y hacer login de nuevo
3. Verificar backend maneja tokens correctamente

### Error: "CORS policy blocked"

**Causa:** Backend no tiene CORS configurado para Vercel

**Solución:**
1. Agregar URL de Vercel a CORS del backend
2. Redeploy backend
3. Limpiar caché del navegador (Ctrl+Shift+Delete)
4. Esperar 5 minutos para que cambios se propaguen

### La App se queda en pantalla de carga

**Causa:** Backend muy lento o timeout

**Solución:**
1. Aumentar timeout: `timeout: 30000` en axios.config.ts (ya está configurado)
2. Verificar backend no está durmiendo en Railway
3. Revisar logs de Railway para errores

### Cambios en el código no aparecen

**Causa:** Caché de navegador

**Solución:**
1. Hard refresh: `Ctrl+Shift+R` (Windows) o `Cmd+Shift+R` (Mac)
2. Limpiar caché: DevTools → Application → Storage → Clear site data
3. Vercel redeploy automático cuando haces push a main

### Variables de entorno no se cargan

**Causa:** Variables no están publicadas en Vercel

**Solución:**
1. Ir a Vercel → Project Settings → Environment Variables
2. Verificar variable existe
3. Redeploy: `vercel --prod`
4. Esperar 2-3 minutos

---

## 📊 Monitoreo Post-Deploy

### Configurar Monitoreo
1. En Vercel Dashboard → Project → Settings → Analytics
2. Habilitar "Web Vitals"
3. Revisar regularmente Performance tab

### Revisar Errores
1. Vercel → Monitoring → Errors
2. Railway Backend → Logs

### Alertas
1. Vercel → Settings → Integrations
2. Conectar Slack/Discord para alertas de deploy

---

## 🔄 Actualizar Después de Deploy

### Workflow de Updates

```bash
# 1. Cambios locales
git add .
git commit -m "Descripción del cambio"

# 2. Push a GitHub
git push origin main

# 3. Vercel automáticamente:
# - Detecta cambios
# - Ejecuta build
# - Deploya nueva versión
# - Te envía confirmación

# 4. Verificar en https://tuapp.vercel.app
```

### Rollback a versión anterior

Si algo sale mal:

1. En Vercel Dashboard → Deployments
2. Click en deployment anterior con ✅
3. Click "Redeploy"
4. Seleccionar "Redeploy"

---

## 📝 Checklist Final

Antes de considerar el deploy completado:

- [ ] App funciona en https://tuapp.vercel.app
- [ ] Login funciona correctamente
- [ ] Puedes ver lista de pacientes
- [ ] Puedes crear/editar/eliminar pacientes
- [ ] Puedes crear triajes
- [ ] Puedes crear citas
- [ ] Análisis de IA funciona
- [ ] Backend en Railway está actualizado
- [ ] CORS configurado correctamente
- [ ] Variables de entorno están en Vercel
- [ ] Dominio personalizado (opcional) está configurado

---

## 🎯 Próximos Pasos

### Dominio Personalizado (Opcional)
1. Comprar dominio (Namecheap, GoDaddy, etc.)
2. En Vercel → Project Settings → Domains
3. Agregar dominio
4. Seguir instrucciones de DNS

### CI/CD Avanzado
1. Agregar tests: `npm run test` en build command
2. Agregar linting: `npm run lint`
3. Pre-deploy checks automáticos

### Optimizaciones
- [ ] Agregar Sentry para error tracking
- [ ] Configurar Google Analytics
- [ ] Habilitar caching agresivo
- [ ] Comprimir imágenes

---

## 📞 Soporte

Si tienes problemas:

1. **Revisar Vercel Docs:** https://vercel.com/docs
2. **Revisar Railway Docs:** https://railway.app/docs
3. **Revisar Vite Docs:** https://vitejs.dev/guide/
4. **Revisar React Docs:** https://react.dev/

---

**Última actualización:** 13 de noviembre de 2025
**Versión:** 1.0.0
**Estado:** ✅ Listo para Production
