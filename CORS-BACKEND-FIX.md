# 🔧 SOLUCIÓN: Error CORS en Backend

## Problema
```
Access to XMLHttpRequest at 'https://web-production-9485.up.railway.app/api/auth/login' 
from origin 'https://vitalapp-frontend-gamma.vercel.app' 
has been blocked by CORS policy
```

## Causa
El backend Spring Boot NO tiene CORS configurado para aceptar requests desde Vercel.

---

## SOLUCIÓN: Actualizar Backend en Railway

### Opción 1: Via application.properties (Recomendado)

**Archivo:** `src/main/resources/application-prod.properties`

Agrega estas líneas:

```properties
# CORS Configuration
cors.allowed-origins=https://vitalapp-frontend-gamma.vercel.app,https://vitalapp-frontend.vercel.app,http://localhost:3000,http://localhost:5173
cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS,PATCH
cors.allowed-headers=Content-Type,Authorization,Accept
cors.allow-credentials=true
cors.max-age=3600
```

**O en application.yml:**

```yaml
cors:
  allowed-origins: 
    - https://vitalapp-frontend-gamma.vercel.app
    - https://vitalapp-frontend.vercel.app
    - http://localhost:3000
    - http://localhost:5173
  allowed-methods: GET,POST,PUT,DELETE,OPTIONS,PATCH
  allowed-headers: Content-Type,Authorization,Accept
  allow-credentials: true
  max-age: 3600
```

### Opción 2: Via Clase WebConfig.java

Si prefieres código:

```java
package com.vitalapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                    "https://vitalapp-frontend-gamma.vercel.app",
                    "https://vitalapp-frontend.vercel.app",
                    "http://localhost:3000",
                    "http://localhost:5173"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

---

## Pasos para Actualizar

### 1. En tu Backend (Local)

```bash
# 1. Agrega las líneas CORS a application-prod.properties
# 2. Haz commit y push
git add src/main/resources/application-prod.properties
git commit -m "Configure CORS for Vercel frontend"
git push origin main
```

### 2. En Railway

Railway redeploy automáticamente cuando hace push.

**Verificar deployment:**
1. Ve a https://railway.app/dashboard
2. Selecciona tu backend
3. Ve a "Deployments"
4. Espera que termine el deploy (estado: "Success")

**Tomar nota de la URL:**
```
https://web-production-9485.up.railway.app
```

---

## Verificar que Funciona

### Test 1: Opción Curl en terminal

```bash
curl -X OPTIONS https://web-production-9485.up.railway.app/api/auth/login \
  -H "Origin: https://vitalapp-frontend-gamma.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

Debes ver en la respuesta:
```
< Access-Control-Allow-Origin: https://vitalapp-frontend-gamma.vercel.app
```

### Test 2: En la App

1. Ve a https://vitalapp-frontend-gamma.vercel.app
2. Intenta hacer login
3. Abre F12 → Console
4. Debes ver que el request funciona (sin error CORS)

---

## URLs que Necesitan CORS

| Origen | Ambiente |
|--------|----------|
| https://vitalapp-frontend-gamma.vercel.app | Preview/Staging |
| https://vitalapp-frontend.vercel.app | Producción (cuando deploys) |
| http://localhost:5173 | Desarrollo local |
| http://localhost:3000 | Alternativo desarrollo |

---

## Checklist

- [ ] Actualicé `application-prod.properties` con CORS config
- [ ] Hice git push del backend
- [ ] Railway terminó el deploy (Status: Success)
- [ ] Probé el curl y veo `Access-Control-Allow-Origin`
- [ ] Intento login en Vercel y funciona
- [ ] Console F12 no muestra errores CORS

---

## Troubleshooting

### ❌ Sigo viendo error CORS

**Solución:**
1. Verifica que el deploy en Railway esté completo
2. Limpia cache del navegador: Ctrl+Shift+Del
3. Espera 1-2 minutos y recarga

### ❌ Aparece "Unknown origin" error

**Solución:**
- Verifica que la URL de Vercel esté exacta en `allowed-origins`
- Nota: Vercel puede cambiar el dominio (ej: `vitalapp-frontend-gamma.vercel.app`)

### ❌ 404 No encontrado

**Verificar:**
- Backend está corriendo: `curl https://web-production-9485.up.railway.app/api/auth/login`
- Endpoint existe: `/api/auth/login`

---

## Tiempo Estimado

- Actualizar properties: 2 minutos
- Git push: 1 minuto
- Deploy en Railway: 3-5 minutos
- **Total: 6-8 minutos**

---

**Última actualización:** 13 de noviembre de 2025

⚠️ **CRÍTICO:** Sin esta configuración, el frontend NO se puede conectar al backend.
