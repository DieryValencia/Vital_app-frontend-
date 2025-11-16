# 📋 PROMPT PARA BACKEND - Endpoints de Etiquetas y Colores

**Proyecto:** VitalApp Backend (Spring Boot)  
**Objetivo:** Crear endpoints para devolver etiquetas y colores dinámicos desde BD  
**Para:** Kilo Code (Backend Developer)  
**Fecha:** 15 de noviembre de 2025

---

## 📌 CONTEXTO

El frontend (React/Vite) eliminó todas las constantes hardcodeadas de etiquetas y colores. Ahora el backend debe proporcionar estos valores dinámicamente mediante endpoints REST.

**Ubicación Frontend:**
- Fue eliminado de: `src/api/appointments.types.ts`, `src/api/notifications.types.ts`, `src/api/triages.types.ts`

---

## 🎯 REQUISITOS

### 1. CREAR TABLA DE CONFIGURACIÓN (Enums/Config)

```sql
-- Tabla para almacenar mapeos de etiquetas y colores
CREATE TABLE IF NOT EXISTS app_config_labels (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  entity_type VARCHAR(50) NOT NULL,    -- 'APPOINTMENT_STATUS', 'NOTIFICATION_TYPE', 'TRIAGE_PRIORITY'
  code VARCHAR(50) NOT NULL,           -- 'PENDIENTE', 'INFO', 'EMERGENCIA'
  label VARCHAR(100) NOT NULL,         -- 'Pendiente', 'Información', 'Emergencia'
  color_class VARCHAR(100) NOT NULL,   -- Clases Tailwind: 'bg-yellow-100 text-yellow-800 border-yellow-300'
  icon_color VARCHAR(50) NOT NULL,     -- 'text-yellow-600'
  UNIQUE(entity_type, code)
);

-- Datos iniciales
INSERT INTO app_config_labels (entity_type, code, label, color_class, icon_color) VALUES
-- Appointment Status
('APPOINTMENT_STATUS', 'PENDIENTE', 'Pendiente', 'bg-yellow-100 text-yellow-800 border-yellow-300', 'text-yellow-600'),
('APPOINTMENT_STATUS', 'CONFIRMADA', 'Confirmada', 'bg-blue-100 text-blue-800 border-blue-300', 'text-blue-600'),
('APPOINTMENT_STATUS', 'COMPLETADA', 'Completada', 'bg-green-100 text-green-800 border-green-300', 'text-green-600'),
('APPOINTMENT_STATUS', 'CANCELADA', 'Cancelada', 'bg-red-100 text-red-800 border-red-300', 'text-red-600'),

-- Notification Type
('NOTIFICATION_TYPE', 'INFO', 'Información', 'bg-blue-100 text-blue-800 border-blue-300', 'text-blue-600'),
('NOTIFICATION_TYPE', 'WARNING', 'Advertencia', 'bg-yellow-100 text-yellow-800 border-yellow-300', 'text-yellow-600'),
('NOTIFICATION_TYPE', 'ERROR', 'Error', 'bg-red-100 text-red-800 border-red-300', 'text-red-600'),
('NOTIFICATION_TYPE', 'SUCCESS', 'Éxito', 'bg-green-100 text-green-800 border-green-300', 'text-green-600'),

-- Triage Priority
('TRIAGE_PRIORITY', 'EMERGENCIA', 'Emergencia', 'bg-red-100 text-red-800 border-red-300', 'text-red-600'),
('TRIAGE_PRIORITY', 'URGENTE', 'Urgente', 'bg-orange-100 text-orange-800 border-orange-300', 'text-orange-600'),
('TRIAGE_PRIORITY', 'MENOS_URGENTE', 'Menos Urgente', 'bg-yellow-100 text-yellow-800 border-yellow-300', 'text-yellow-600'),
('TRIAGE_PRIORITY', 'NO_URGENTE', 'No Urgente', 'bg-green-100 text-green-800 border-green-300', 'text-green-600');
```

---

### 2. CREAR ENTITY JPA

```java
package com.vitalapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "app_config_labels", 
       uniqueConstraints = @UniqueConstraint(columnNames = {"entity_type", "code"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppConfigLabel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 50)
    private String entityType;    // 'APPOINTMENT_STATUS', 'NOTIFICATION_TYPE', 'TRIAGE_PRIORITY'
    
    @Column(nullable = false, length = 50)
    private String code;          // 'PENDIENTE', 'INFO', 'EMERGENCIA'
    
    @Column(nullable = false, length = 100)
    private String label;         // 'Pendiente', 'Información', 'Emergencia'
    
    @Column(nullable = false, length = 100)
    private String colorClass;    // Clases Tailwind
    
    @Column(nullable = false, length = 50)
    private String iconColor;     // Color del ícono
}
```

---

### 3. CREAR DTO

```java
package com.vitalapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ConfigLabelDTO {
    private String code;
    private String label;
    private String colorClass;
    private String iconColor;
}
```

---

### 4. CREAR REPOSITORY

```java
package com.vitalapp.repository;

import com.vitalapp.entity.AppConfigLabel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppConfigLabelRepository extends JpaRepository<AppConfigLabel, Long> {
    List<AppConfigLabel> findByEntityType(String entityType);
    Optional<AppConfigLabel> findByEntityTypeAndCode(String entityType, String code);
}
```

---

### 5. CREAR SERVICE

```java
package com.vitalapp.service;

import com.vitalapp.dto.ConfigLabelDTO;
import com.vitalapp.entity.AppConfigLabel;
import com.vitalapp.repository.AppConfigLabelRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AppConfigService {
    
    private final AppConfigLabelRepository configRepository;
    
    public AppConfigService(AppConfigLabelRepository configRepository) {
        this.configRepository = configRepository;
    }
    
    // Obtener todas las etiquetas de un tipo como Map
    public Map<String, ConfigLabelDTO> getConfigsByType(String entityType) {
        return configRepository.findByEntityType(entityType)
            .stream()
            .collect(Collectors.toMap(
                AppConfigLabel::getCode,
                this::toDTO
            ));
    }
    
    // Obtener una etiqueta específica
    public ConfigLabelDTO getConfigByTypeAndCode(String entityType, String code) {
        return configRepository.findByEntityTypeAndCode(entityType, code)
            .map(this::toDTO)
            .orElse(null);
    }
    
    private ConfigLabelDTO toDTO(AppConfigLabel entity) {
        return new ConfigLabelDTO(
            entity.getCode(),
            entity.getLabel(),
            entity.getColorClass(),
            entity.getIconColor()
        );
    }
}
```

---

### 6. CREAR CONTROLLER

```java
package com.vitalapp.controller;

import com.vitalapp.dto.ConfigLabelDTO;
import com.vitalapp.service.AppConfigService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/config")
@CrossOrigin(origins = {"https://vitalapp-frontend-gamma.vercel.app", "http://localhost:5173"})
public class AppConfigController {
    
    private final AppConfigService configService;
    
    public AppConfigController(AppConfigService configService) {
        this.configService = configService;
    }
    
    // Obtener todas las etiquetas y colores de un tipo
    // GET /api/config/labels/APPOINTMENT_STATUS
    @GetMapping("/labels/{entityType}")
    public ResponseEntity<Map<String, ConfigLabelDTO>> getConfigsByType(
            @PathVariable String entityType) {
        Map<String, ConfigLabelDTO> configs = configService.getConfigsByType(entityType);
        return ResponseEntity.ok(configs);
    }
    
    // Obtener etiqueta y color específicos
    // GET /api/config/labels/APPOINTMENT_STATUS/PENDIENTE
    @GetMapping("/labels/{entityType}/{code}")
    public ResponseEntity<ConfigLabelDTO> getConfigByTypeAndCode(
            @PathVariable String entityType,
            @PathVariable String code) {
        ConfigLabelDTO config = configService.getConfigByTypeAndCode(entityType, code);
        if (config == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(config);
    }
}
```

---

## 📡 ENDPOINTS DISPONIBLES

### 1. Obtener todas las etiquetas de un tipo
```
GET /api/config/labels/APPOINTMENT_STATUS
GET /api/config/labels/NOTIFICATION_TYPE
GET /api/config/labels/TRIAGE_PRIORITY
```

**Response:**
```json
{
  "PENDIENTE": {
    "code": "PENDIENTE",
    "label": "Pendiente",
    "colorClass": "bg-yellow-100 text-yellow-800 border-yellow-300",
    "iconColor": "text-yellow-600"
  },
  "CONFIRMADA": {
    "code": "CONFIRMADA",
    "label": "Confirmada",
    "colorClass": "bg-blue-100 text-blue-800 border-blue-300",
    "iconColor": "text-blue-600"
  },
  ...
}
```

### 2. Obtener etiqueta específica
```
GET /api/config/labels/APPOINTMENT_STATUS/PENDIENTE
```

**Response:**
```json
{
  "code": "PENDIENTE",
  "label": "Pendiente",
  "colorClass": "bg-yellow-100 text-yellow-800 border-yellow-300",
  "iconColor": "text-yellow-600"
}
```

---

## 🔑 TIPOS DE ENTIDADES

Usar estos valores en las rutas:

| Tipo | Valores |
|------|---------|
| `APPOINTMENT_STATUS` | PENDIENTE, CONFIRMADA, COMPLETADA, CANCELADA |
| `NOTIFICATION_TYPE` | INFO, WARNING, ERROR, SUCCESS |
| `TRIAGE_PRIORITY` | EMERGENCIA, URGENTE, MENOS_URGENTE, NO_URGENTE |

---

## 🛡️ SEGURIDAD

- ✅ Endpoints públicos (no requieren auth)
- ✅ CORS configurado para Vercel
- ✅ Sin validación de entrada requerida (son mapeos estáticos)

---

## 📝 CHECKLIST IMPLEMENTACIÓN

- [ ] Crear tabla `app_config_labels`
- [ ] Insertar datos iniciales (SQL arriba)
- [ ] Crear Entity `AppConfigLabel`
- [ ] Crear DTO `ConfigLabelDTO`
- [ ] Crear Repository `AppConfigLabelRepository`
- [ ] Crear Service `AppConfigService`
- [ ] Crear Controller `AppConfigController`
- [ ] Probar endpoints con Postman/curl
- [ ] Verificar CORS está habilitado
- [ ] Deploy a Railway
- [ ] Notificar a Diery cuando esté listo

---

## 🔗 INTEGRACIÓN CON FRONTEND

Una vez implementados los endpoints, el frontend actualizará:

```typescript
// src/hooks/useConfig.ts (nuevo)
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/axios.config'

export function useConfigLabels(entityType: string) {
  return useQuery({
    queryKey: ['config-labels', entityType],
    queryFn: async () => {
      const { data } = await api.get(`/config/labels/${entityType}`)
      return data
    }
  })
}
```

Luego los componentes harán:
```typescript
const { data: appointmentLabels } = useConfigLabels('APPOINTMENT_STATUS')
const label = appointmentLabels?.[status]?.label
const color = appointmentLabels?.[status]?.colorClass
```

---

## ⏱️ TIEMPO ESTIMADO

- Crear tabla y datos: 5 minutos
- Crear Entity + DTO: 5 minutos
- Crear Repository + Service: 5 minutos
- Crear Controller: 5 minutos
- Testing: 5 minutos
- **Total: 25 minutos**

---

## 💬 PREGUNTAS FRECUENTES

**P: ¿Por qué no está esto en Enums de Java?**
R: Porque los colores necesitan ser dinámicos y editables desde BD sin cambiar código.

**P: ¿Puedo hacer esto sin tabla?**
R: Sí, puedes usar un archivo properties o enum, pero esto es más flexible.

**P: ¿Qué pasa si falta un código?**
R: Devuelve null/notFound - el frontend debe tener valores por defecto.

---

## 📞 CONTACTO

**Frontend Developer:** Diery Valencia  
**Backend Developer:** Kilo Code  
**Vercel URL:** https://vitalapp-frontend-gamma.vercel.app  
**Railway Backend:** https://web-production-9485.up.railway.app

---

**Status:** ✅ LISTO PARA IMPLEMENTAR

Pasa este prompt a Kilo Code para que implemente en el backend.
