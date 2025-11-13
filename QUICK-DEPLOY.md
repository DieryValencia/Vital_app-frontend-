# 🎯 VERCEL DEPLOYMENT - GUÍA RÁPIDA

## 📋 Resumen de Archivos Creados

```
✅ .env.development              - Variables de desarrollo
✅ .env.production.example       - Template de producción  
✅ vercel.json                   - Configuración Vercel
✅ DEPLOYMENT-CHECKLIST.md       - Checklist 9 fases
✅ README-DEPLOYMENT.md          - Guía completa 15 secciones
✅ VERCEL-SETUP-SUMMARY.md       - Resumen visual
✅ deploy.sh                     - Script automático
✅ .gitignore (actualizado)      - Agregados .env, .vercel
```

---

## ⚡ DEPLOYMENT EN 5 MINUTOS

### 1. Preparar Código
```bash
cd vitalapp_frontend
git add .
git commit -m "Setup Vercel deployment"
git push origin main
```

### 2. Vercel Dashboard
- Ir a https://vercel.com
- Click "New Project"
- Importar repositorio "Vital_app-frontend-"

### 3. Configurar
**Build Settings:**
- Framework: `Vite`
- Build Command: `npm run build`
- Output: `dist`

**Environment Variables:**
```
VITE_API_URL = https://tu-backend.railway.app
VITE_DEBUG = false
```

### 4. Deploy
Click "Deploy" → Esperar 2-3 min → ✅ LIVE

### 5. Verificar
- Abrir URL de Vercel
- Login y probar funcionalidades

---

## 🔌 BACKEND CORS (Muy Importante)

Agregar a `application-prod.properties`:
```properties
cors.allowed-origins=https://tu-app.vercel.app
cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS,PATCH
cors.allow-credentials=true
```

Luego redeploy del backend.

---

## 📊 VARIABLES DE ENTORNO

### Desarrollo (`.env.development`)
```
VITE_API_URL=http://localhost:8080
VITE_DEBUG=true
```

### Producción (`.env.production` - NO subir a Git)
```
VITE_API_URL=https://vitalapp-backend.railway.app
VITE_DEBUG=false
```

---

## 🧪 TESTING POST-DEPLOY

Hacer en navegador:
```javascript
// F12 → Console
console.log(import.meta.env.VITE_API_URL)
// Debe mostrar URL del backend
```

Checklist:
- [ ] App carga
- [ ] Login funciona
- [ ] Ver pacientes
- [ ] Crear paciente
- [ ] IA analysis funciona

---

## 🐛 PROBLEMAS COMUNES

| Error | Causa | Fix |
|---|---|---|
| "API no conecta" | CORS no config | Actualizar backend + redeploy |
| "401 Unauthorized" | Token expirado | Logout + login de nuevo |
| "Cannot GET /" | SPA routing falla | Verificar vercel.json rewrites |
| "Timeout" | Backend lento | Revisar Railway logs |

---

## 📚 DOCUMENTACIÓN COMPLETA

- **README-DEPLOYMENT.md** - 15 secciones detalladas
- **DEPLOYMENT-CHECKLIST.md** - 9 fases paso a paso
- **VERCEL-SETUP-SUMMARY.md** - Resumen visual completo

---

## ✅ STATUS

```
✅ Axios configurado con env vars
✅ Vercel optimizado
✅ CORS documentado
✅ Deploy automatizado
✅ Testing checklist listo

Estado: 🟢 PRODUCTION READY
```

---

**Última actualización:** 13 de noviembre de 2025

¡Listo para deployar! 🚀
