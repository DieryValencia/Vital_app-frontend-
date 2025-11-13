# ✅ VitalApp - Deployment Checklist

## 🔍 Fase 1: Pre-Deployment (Local)

### Código
- [ ] Todos los cambios están commiteados
- [ ] No hay archivos sin rastrear importantes
- [ ] `git status` está limpio
- [ ] Branch es `main`

### Build Local
```bash
npm run build
npm run preview
```
- [ ] Build se completa sin errores
- [ ] Preview funciona correctamente en `http://localhost:4173`

### Archivos Configuración
- [ ] `.env.development` existe y tiene `VITE_API_URL=http://localhost:8080`
- [ ] `.env.production.example` existe
- [ ] `vercel.json` existe
- [ ] `.gitignore` tiene `.env.production` (pero no `.env.production.example`)

### Git
```bash
git add .
git commit -m "Preparar para deployment en Vercel"
git push origin main
```
- [ ] Push completado sin errores
- [ ] GitHub muestra los cambios en `main`

---

## 🚀 Fase 2: Vercel Setup

### Crear Proyecto
- [ ] Ir a https://vercel.com/dashboard
- [ ] Click "New Project"
- [ ] Seleccionar repositorio "Vital_app-frontend-"
- [ ] Importar proyecto

### Configurar Build
Pantalla de configuración:
- [ ] Framework: **Vite**
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Install Command: `npm install`

### Environment Variables
Agregar en Vercel:
- [ ] `VITE_API_URL` = URL del backend (ej: `https://vitalapp-backend.railway.app`)
- [ ] `VITE_DEBUG` = `false`

### Deploy
- [ ] Click "Deploy"
- [ ] Esperar a que termine
- [ ] Ver mensaje "Congratulations, your site is live!"
- [ ] Anotar URL: `https://your-project.vercel.app`

---

## 🔌 Fase 3: Backend - CORS Configuration

### Backend URL
- [ ] Anotar URL pública del backend (Railway/Heroku/etc)
  ```
  Ejemplo: https://vitalapp-backend-prod.railway.app
  ```

### Actualizar CORS
En el backend (Spring Boot):

**application-prod.properties:**
```properties
cors.allowed-origins=https://your-project.vercel.app,http://localhost:3000
cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS,PATCH
cors.allowed-headers=*
cors.allow-credentials=true
```

- [ ] CORS configurado con URL de Vercel
- [ ] Backend redeployado

### Verificar Backend Conectividad
```bash
# Desde terminal
curl -i https://vitalapp-backend-prod.railway.app/api/health

# Debería retornar 200 OK
```
- [ ] Backend accesible desde web pública

---

## 🧪 Fase 4: Testing Post-Deploy

### Acceder a la App
- [ ] Abrir `https://your-project.vercel.app`
- [ ] Página carga correctamente
- [ ] No hay errores en browser console (F12)

### Login
- [ ] Página de login aparece
- [ ] Ingresar credenciales
- [ ] Login exitoso
- [ ] Redirección a Dashboard/Inicio

### Funcionalidades Básicas
- [ ] Dashboard/Inicio carga datos
- [ ] Puede navegar a Pacientes
- [ ] Puede navegar a Triajes
- [ ] Puede navegar a Citas
- [ ] Puede navegar a Notificaciones

### CRUD Operations
- [ ] Crear paciente: ✅
- [ ] Editar paciente: ✅
- [ ] Ver paciente: ✅
- [ ] Eliminar paciente: ✅
- [ ] Crear triaje: ✅
- [ ] Crear cita: ✅

### Características Avanzadas
- [ ] Análisis de IA funciona
- [ ] Filtros funcionan
- [ ] Búsqueda funciona
- [ ] Notificaciones funciona

### Browser Console Check
```javascript
// Abrir F12 → Console y ejecutar:
console.log(import.meta.env.VITE_API_URL)
// Debería mostrar la URL del backend
```

---

## 🔐 Fase 5: Seguridad

### Variables de Entorno
- [ ] `VITE_API_URL` está en Vercel (no en .env.production)
- [ ] `.env.production` está en `.gitignore`
- [ ] Ningún secret está en el repositorio público

### CORS
- [ ] CORS solo permite orígenes esperados
- [ ] credenciales están configuradas correctamente

### Backend
- [ ] Backend valida tokens JWT
- [ ] Backend rechaza requests sin token
- [ ] Backend valida datos de entrada

---

## 📊 Fase 6: Monitoreo

### Vercel Dashboard
- [ ] Ir a Project Settings
- [ ] Verificar últimos deploys
- [ ] Revisar Analytics → Web Vitals
- [ ] Logs accesibles

### Railway/Backend
- [ ] Acceder a dashboard
- [ ] Revisar logs
- [ ] Verificar no hay errores recientes

### Performance
- [ ] Cargar app: < 3 segundos
- [ ] Operaciones CRUD: < 1 segundo
- [ ] Sin timeouts en console

---

## 🎯 Fase 7: Opcional - Dominio Personalizado

### Comprar Dominio
- [ ] Dominio comprado (Namecheap, GoDaddy, etc.)
- [ ] DNS accesible

### Configurar en Vercel
- [ ] Ir a Project Settings → Domains
- [ ] Agregar dominio
- [ ] Seguir instrucciones de DNS
- [ ] Esperar propagación (5-48 horas)
- [ ] Verificar `https://your-domain.com` funciona

### SSL/TLS
- [ ] Certificado SSL automático (Vercel genera)
- [ ] HTTPS accesible

---

## 📝 Fase 8: Documentación

- [ ] README-DEPLOYMENT.md completado
- [ ] Backend tiene documentación actualizada
- [ ] Team sabe cómo hacer deploy futuro

---

## ✨ Fase 9: Go Live

- [ ] Todas las fases completadas ✅
- [ ] No hay errores reportados
- [ ] Performance es aceptable
- [ ] Backend estable

### Comunicación
- [ ] Equipo notificado que app está live
- [ ] URL compartida con interesados
- [ ] Documentación lista para usuarios

---

## 🆘 Rollback Plan

Si algo sale mal después de deploy:

1. En Vercel Dashboard → Deployments
2. Buscar último deployment que funcionaba
3. Click en el deployment
4. Click "Redeploy"

Esto revierte a la versión anterior en < 30 segundos.

---

## 📞 Contactos/Recursos

### Documentación
- Vercel: https://vercel.com/docs
- Vite: https://vitejs.dev/guide/
- React: https://react.dev/
- Railway: https://railway.app/docs

### Problemas Comunes
- **App no carga:** Revisar Network tab (F12) → ver qué request falla
- **API no conecta:** Verificar VITE_API_URL y CORS
- **Auth falla:** Limpiar localStorage → relogin
- **Timeout:** Aumentar timeout en axios.config.ts

---

## 📋 Notas Post-Deployment

```
Proyecto: VitalApp
Fecha Deploy: _______________
URL: https://_______________
Backend URL: _______________
Responsable: _______________

Observaciones:
_________________________________
_________________________________
_________________________________
```

---

**Status:** 🟢 Ready for Deployment
**Last Updated:** 13 de noviembre de 2025
**Version:** 1.0.0
