# PROMPT PROFESIONAL PARA BACKEND - PROYECTO POZOBLANCO SLOW TURISMO
## Ejecutar en Google Antigravity

---

## 📋 CONTEXTO DEL PROYECTO

Eres un arquitecto backend senior especializado en sistemas Smart City. Necesito que diseñes e implementes un backend REST API profesional para el **Proyecto Pozoblanco Slow Turismo** - un sistema integral de turismo inteligente municipal.

**Requisitos contractuales (Pliego EXPT24-00062):**
- ✅ Open Source (Licencia GPL v3 / EUPL)
- ✅ Node.js + TypeScript + Express
- ✅ PostgreSQL + PostGIS (datos geográficos)
- ✅ Autenticación con JWT + OAuth2 ready
- ✅ Logging centralizado (Winston)
- ✅ APIs REST documentadas con Swagger/OpenAPI
- ✅ WCAG 2.1 AA compliance
- ✅ On-Premise (Docker-ready)

---

## 🎯 OBJETIVO

Generar una estructura **production-ready** de backend modular, escalable y mantenible que integre:

1. **Sistema de Turismo Inteligente** (Portal web + gestión contenidos)
2. **Red de Sealizacióna Turstica** (Pantallas interactivas georreferenciadas)
3. **Cartelera Digital** (Gestión remota de contenidos)
4. **Monitorizacióna de Aparcamientos** (Integración IoT)
5. **Gestión Centralizada** (Admin, usuarios, logs, auditoría)

---

## 📐 ARQUITECTURA REQUERIDA

### Stack Tecnológico

```
├─ Runtime: Node.js 20 LTS + TypeScript 5.x
├─ Framework: Express 4.x (lightweight + modular)
├─ BD Relacional: PostgreSQL 15+ con extensión PostGIS
├─ BD Caché: Redis 7+ (sesiones, rate-limit, WebSocket)
├─ Autenticación: JWT + bcrypt (passwords) + passport.js
├─ Validación: Zod + class-validator
├─ ORM: TypeORM con migrations
├─ Logging: Winston (centralizado)
├─ Documentación: Swagger/OpenAPI 3.0
├─ Testing: Jest + Supertest
├─ Containerización: Docker + docker-compose
└─ CI/CD: GitLab CI (ready)
```

### Estructura de Carpetas

```
backend/
├── src/
│   ├── config/                  # Configuración (BD, env, etc)
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   ├── logger.ts
│   │   └── environment.ts
│   ├── entities/                # Modelos ORM TypeORM
│   │   ├── User.entity.ts
│   │   ├── Attraction.entity.ts
│   │   ├── Signage.entity.ts
│   │   ├── DigitalSign.entity.ts
│   │   └── ParkingSpace.entity.ts
│   ├── services/                # Lógica de negocio
│   │   ├── AuthService.ts
│   │   ├── AttractionService.ts
│   │   ├── SignageService.ts
│   │   ├── DigitalSignService.ts
│   │   └── ParkingService.ts
│   ├── controllers/             # Endpoints HTTP
│   │   ├── AuthController.ts
│   │   ├── AttractionController.ts
│   │   ├── SignageController.ts
│   │   ├── DigitalSignController.ts
│   │   └── ParkingController.ts
│   ├── routes/                  # Definición de rutas
│   │   ├── auth.routes.ts
│   │   ├── attractions.routes.ts
│   │   ├── signage.routes.ts
│   │   ├── digital-signs.routes.ts
│   │   ├── parking.routes.ts
│   │   └── index.ts
│   ├── middlewares/             # Middlewares Express
│   │   ├── auth.middleware.ts
│   │   ├── errorHandler.ts
│   │   ├── validation.ts
│   │   ├── logging.ts
│   │   ├── corsPolicy.ts
│   │   └── rateLimiter.ts
│   ├── dtos/                    # Data Transfer Objects (validación)
│   │   ├── Auth.dto.ts
│   │   ├── Attraction.dto.ts
│   │   ├── Signage.dto.ts
│   │   ├── DigitalSign.dto.ts
│   │   └── Parking.dto.ts
│   ├── utils/                   # Funciones utilitarias
│   │   ├── encryption.ts
│   │   ├── jwt.ts
│   │   ├── geolocation.ts
│   │   ├── validators.ts
│   │   └── responses.ts
│   ├── decorators/              # Decoradores TypeScript
│   │   ├── Validate.ts
│   │   └── Auth.ts
│   ├── types/                   # Types e Interfaces
│   │   ├── index.ts
│   │   └── express.d.ts
│   ├── migrations/              # TypeORM migrations
│   │   └── .gitkeep
│   ├── tests/                   # Tests unitarios/integración
│   │   ├── unit/
│   │   ├── integration/
│   │   └── fixtures/
│   ├── app.ts                   # Configuración principal Express
│   └── server.ts                # Punto de entrada
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
├── .env.example
├── .env.local (git-ignored)
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

---

## 🔧 ESPECIFICACIONES TÉCNICAS DETALLADAS

### 1. AUTENTICACIÓN & SEGURIDAD

```typescript
Implementar:
✓ JWT con refresh tokens (15 min acceso, 7 días refresh)
✓ OAuth2 ready (Google, Facebook - future)
✓ RBAC (Role-Based Access Control)
  - ROLE_ADMIN: acceso total
  - ROLE_MANAGER: gestión turismo/cartelera
  - ROLE_USER: consultas públicas
✓ Password hashing con bcrypt (rounds: 12)
✓ CSRF protection
✓ Rate limiting (100 req/min por IP)
✓ Helmet.js para security headers
✓ CORS configurado solo para dominios permitidos
```

### 2. ENTIDADES PRINCIPALES (TypeORM)

```typescript
USER:
  - id (UUID primary key)
  - email (unique)
  - password (hashed)
  - firstName, lastName
  - role (admin, manager, user)
  - isActive (boolean)
  - lastLogin (timestamp)
  - createdAt, updatedAt

ATTRACTION:
  - id (UUID)
  - name (string)
  - description (text)
  - category (enum: cultura, naturaleza, gastronomía, comercio)
  - latitude, longitude (con índice PostGIS)
  - address (string)
  - phone, website, email
  - images (array JSON o relación)
  - rating (decimal)
  - visitorCount (integer)
  - isActive (boolean)
  - createdAt, updatedAt

SIGNAGE (Sealizacióna Inteligente):
  - id (UUID)
  - name (string)
  - location (geography PostGIS)
  - deviceId (unique identifier)
  - status (online, offline, maintenance)
  - lastHeartbeat (timestamp)
  - associatedAttraction (FK Attraction)
  - interactionCount (integer)
  - createdAt, updatedAt

DIGITAL_SIGN (Cartelera Digital):
  - id (UUID)
  - name (string)
  - location (geography PostGIS)
  - content (JSON: título, descripción, imagen)
  - schedule (cron expression)
  - isActive (boolean)
  - viewCount (integer)
  - lastUpdate (timestamp)
  - createdAt, updatedAt

PARKING_SPACE:
  - id (UUID)
  - zone (string)
  - spaceNumber (string)
  - location (geography PostGIS)
  - isOccupied (boolean)
  - occupiedSince (timestamp nullable)
  - sensorId (device identifier)
  - lastHeartbeat (timestamp)
  - createdAt, updatedAt

AUDIT_LOG:
  - id (UUID)
  - userId (FK User)
  - action (CREATE, UPDATE, DELETE, LOGIN)
  - entity (attraction, signage, etc)
  - entityId (UUID)
  - changes (JSON: before/after)
  - ipAddress (string)
  - createdAt (timestamp)
```

### 3. ENDPOINTS PRINCIPALES (OpenAPI 3.0)

#### Auth
```
POST   /api/v1/auth/register      - Registro usuario
POST   /api/v1/auth/login         - Login (returns JWT + refresh token)
POST   /api/v1/auth/refresh       - Renovar JWT
POST   /api/v1/auth/logout        - Logout (invalida token)
GET    /api/v1/auth/me            - Perfil usuario autenticado
POST   /api/v1/auth/change-password
```

#### Attractions (Atractivos Tursticos)
```
GET    /api/v1/attractions                    - Listar con filtros (categoría, radio geográfico)
GET    /api/v1/attractions/:id               - Detalle
GET    /api/v1/attractions/nearby?lat&lng&radius - Por geolocalización (PostGIS)
POST   /api/v1/attractions                    - Crear (ADMIN)
PUT    /api/v1/attractions/:id               - Actualizar (ADMIN)
DELETE /api/v1/attractions/:id               - Eliminar (ADMIN)
GET    /api/v1/attractions/:id/analytics     - Estadísticas de visitas
```

#### Signage (Sealizacióna)
```
GET    /api/v1/signage                   - Listar todos
GET    /api/v1/signage/:id              - Detalle
POST   /api/v1/signage                  - Crear (ADMIN)
PUT    /api/v1/signage/:id              - Actualizar
DELETE /api/v1/signage/:id              - Eliminar
POST   /api/v1/signage/:id/heartbeat    - Reportar estado (IoT devices)
GET    /api/v1/signage/:id/analytics    - Interacciones
```

#### Digital Signs
```
GET    /api/v1/digital-signs               - Listar
GET    /api/v1/digital-signs/:id          - Detalle
POST   /api/v1/digital-signs              - Crear (MANAGER)
PUT    /api/v1/digital-signs/:id          - Actualizar contenido
DELETE /api/v1/digital-signs/:id          - Eliminar
POST   /api/v1/digital-signs/:id/publish  - Publicar a displays
```

#### Parking
```
GET    /api/v1/parking/spaces                    - Listar plazas
GET    /api/v1/parking/spaces/:id               - Detalle plaza
GET    /api/v1/parking/availability             - Disponibilidad en tiempo real
GET    /api/v1/parking/zones/:zone/stats        - Estadísticas por zona
POST   /api/v1/parking/spaces/:id/sensor-update - Update estado ocupación (IoT)
GET    /api/v1/parking/heatmap?lat&lng&radius   - Mapa de calor (PostGIS)
```

#### Admin
```
GET    /api/v1/admin/users              - Listar usuarios
GET    /api/v1/admin/logs              - Logs de auditoría
GET    /api/v1/admin/health            - Health check
GET    /api/v1/admin/metrics           - Métricas del sistema
```

---

## 🔒 SEGURIDAD ESPECÍFICA

### Request/Response Format
```json
// Respuesta exitosa
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2025-12-16T11:58:00Z",
    "version": "1.0"
  }
}

// Error
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Email o contraseña incorrectos",
    "details": [...]
  }
}
```

### Headers Requeridos
```
- Authorization: Bearer <JWT_TOKEN>
- X-Request-ID: <UUID> (para trazabilidad)
- Content-Type: application/json
- User-Agent: <cliente>
```

### Error Codes HTTP
- 200 OK
- 201 CREATED
- 400 BAD_REQUEST (validación fallida)
- 401 UNAUTHORIZED (sin autenticación)
- 403 FORBIDDEN (sin permisos)
- 404 NOT_FOUND
- 409 CONFLICT (duplicado)
- 429 TOO_MANY_REQUESTS
- 500 INTERNAL_SERVER_ERROR
- 503 SERVICE_UNAVAILABLE

---

## 📊 LOGGING & MONITOREO

### Winston Logger
```
Niveles:
✓ error: fallos críticos
✓ warn: advertencias
✓ info: eventos importantes (login, create, delete)
✓ debug: datos de diagnóstico
✓ silly: información muy detallada

Formato:
[timestamp] [nivel] [servicio] [userId] [requestId]: mensaje { contexto }

Salida:
✓ Console (desarrollo)
✓ Archivo (producción)
✓ Servicio centralizado (elk, splunk - future)
```

### Auditoría
```
Registrar:
✓ Cambios en datos críticos (quién, qué, cuándo, antes/después)
✓ Accesos (login exitosos/fallidos)
✓ Cambios de permisos
✓ Eliminaciones de datos
✓ Cambios de configuración
```

---

## 🧪 TESTING REQUERIDO

```typescript
Cobertura mínima: 80%

Unit Tests (Jest):
✓ AuthService (login, token generation, validation)
✓ Services (CreatAttractions, update geolocation, etc)
✓ Validators (email, coordinates, etc)
✓ Encryption (bcrypt, JWT)

Integration Tests (Supertest):
✓ Full auth flow (register → login → refresh → logout)
✓ CRUD operations
✓ Permission checks (RBAC)
✓ Geolocation queries
✓ Rate limiting
✓ Error handling
```

---

## 📦 VARIABLES DE ENTORNO (.env.local)

```env
# Server
NODE_ENV=development
PORT=3000
API_VERSION=v1
API_URL=http://localhost:3000

# Database
DB_HOST=postgres
DB_PORT=5432
DB_USER=pozoblanco
DB_PASSWORD=SecurePassword123!
DB_NAME=pozoblanco_db
DB_SSL=false

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=RedisPass123

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRATION=15m
JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-chars
JWT_REFRESH_EXPIRATION=7d

# CORS
CORS_ORIGIN=http://localhost:3001,https://pozoblanco.es

# Logging
LOG_LEVEL=info
LOG_DIR=./logs

# Email (SendGrid/Mailgun - future)
MAIL_SERVICE=sendgrid
MAIL_FROM=noreply@pozoblanco.es

# Security
BCRYPT_ROUNDS=12
MAX_LOGIN_ATTEMPTS=5
LOCK_TIME_MS=900000

# Feature flags
ENABLE_OAUTH=false
ENABLE_SWAGGER=true
```

---

## 🚀 INSTRUCCIONES DE GENERACIÓN

### Paso 1: Crea la estructura base
- Genera archivo package.json con todas las dependencias
- Configura tsconfig.json
- Crea carpetas del proyecto

### Paso 2: Configura la conexión DB
- database.ts con TypeORM connection
- redis.ts para cache
- logger.ts con Winston

### Paso 3: Implementa Autenticación
- User entity con relaciones
- AuthService (register, login, JWT generation)
- AuthMiddleware para proteger rutas
- AuthController con endpoints

### Paso 4: CRUD de Entidades Principales
- Attraction Entity y Service
- Signage Entity y Service
- DigitalSign Entity y Service
- Parking Entity y Service

### Paso 5: Integración PostGIS
- Funciones de geolocalización
- Queries para "nearby"
- Índices geográficos

### Paso 6: Documentación & Tests
- Swagger/OpenAPI decorators en controllers
- Tests unitarios para services
- Tests integración para endpoints

### Paso 7: Docker & Deployment
- Dockerfile optimizado
- docker-compose.yml con postgres, redis
- .dockerignore

### Paso 8: Validación Final
- Revisar todos los endpoints
- Verificar logging
- Comprobar RBAC
- Testing de seguridad

---

## ✅ CHECKLIST DE VALIDACIÓN

- [ ] Package.json con todas las dependencias necesarias
- [ ] TypeORM connection configurada correctamente
- [ ] Todas las entidades creadas con relaciones
- [ ] Services implementados con lógica de negocio
- [ ] Controllers con endpoints funcionando
- [ ] Autenticación JWT funcionando (login/refresh/logout)
- [ ] RBAC verificado en endpoints protegidos
- [ ] Validación con Zod/class-validator en todos DTOs
- [ ] Error handling centralizado
- [ ] Logging completo con Winston
- [ ] CORS configurado
- [ ] Rate limiting activo
- [ ] Swagger/OpenAPI documentado
- [ ] Tests unitarios pasando (80%+ coverage)
- [ ] Tests integración pasando
- [ ] Docker compose funcionando
- [ ] Variables de entorno en .env.example
- [ ] README con instrucciones de setup
- [ ] PostGIS queries testeadas
- [ ] Auditoría logging implementada
- [ ] Health check endpoint funcionando

---

## 📝 NOTAS IMPORTANTES

1. **Código limpio**: Seguir principios SOLID, naming descriptivo, comentarios dónde sea necesario
2. **Performance**: Índices en BD, caching con Redis, lazy loading de relaciones
3. **Seguridad**: NO guardar secrets en código, validar TODA entrada de usuario, SQL injection prevention
4. **Mantenibilidad**: Código modular, reutilizable, fácil de testear
5. **Documentación**: Swagger completo, README claro, inline comments en lógica compleja
6. **Git**: Commits descriptivos, .gitignore correcto, rama main protegida

---

## 🎯 OUTPUT ESPERADO

Al terminar, entregar:
1. **Carpeta backend/** completa con todo el código
2. **docker-compose.yml** funcionando
3. **Swagger API documentation** accesible en /api-docs
4. **README.md** con setup instructions
5. **Test results** con >80% coverage
6. **Migration scripts** listos para ejecutar
7. **.env.example** configurado correctamente

---

## 💡 OPTIMIZACIONES RECOMENDADAS (PHASE 2)

- GraphQL endpoint adicional
- WebSocket para notificaciones real-time
- Caching layer (Redis) para queries frecuentes
- Message Queue (Bull/RabbitMQ) para jobs asíncronos
- S3 integration para imágenes/videos
- Stripe integration para futuras transacciones
- Analytics engine (Mixpanel/GA)

---

**¡Adelante! Comenzamos la generación del backend en Antigravity.**
