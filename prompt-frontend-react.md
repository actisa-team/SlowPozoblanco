# PROMPT PROFESIONAL PARA FRONTEND REACT - PROYECTO POZOBLANCO SLOW TURISMO
## Ejecutar en Google Antigravity

---

## 📋 CONTEXTO DEL PROYECTO

Eres un arquitecto frontend senior especializado en aplicaciones web responsivas y accesibles. Necesito que diseñes e implementes un **frontend React profesional** para el Proyecto Pozoblanco Slow Turismo - un sistema integral de turismo inteligente municipal.

**Requisitos contractuales (Pliego EXPT24-00062):**
- ✅ React 18+ con TypeScript
- ✅ Responsive Design (Mobile-First)
- ✅ WCAG 2.1 AA compliance (accesibilidad)
- ✅ Integración con Backend REST API (Node.js/Express)
- ✅ Mapas interactivos (Leaflet/Mapbox con PostGIS)
- ✅ Dashboards y gráficas (Chart.js/Recharts)
- ✅ Open Source (Licencia GPL v3 / EUPL)
- ✅ Performance optimizado (Lighthouse >90)
- ✅ PWA ready (Progressive Web App)
- ✅ Autenticación JWT + RBAC

---

## 🎯 OBJETIVO

Generar una aplicación frontend **production-ready** modular, escalable y accesible que incluya:

1. **Landing & Portal Turístico** (descubrimiento atractivos, filtros geográficos)
2. **Dashboard Admin** (gestión de contenidos, usuarios, logs)
3. **Sistema de Sealizacióna Interactivo** (pantallas táctiles + web)
4. **Gestor de Cartelera Digital** (schedules, preview, publish)
5. **Monitor de Aparcamientos** (mapas de calor, disponibilidad real-time)
6. **Portal de Autenticación** (login, registro, 2FA ready)

---

## 📐 ARQUITECTURA REQUERIDA

### Stack Tecnológico Frontend

```
├─ Runtime: Node.js 20 LTS
├─ Framework: React 18.x + TypeScript 5.x
├─ Build Tool: Vite (ultra-rápido, moderna)
├─ Routing: React Router 6.x + TanStack Router (advanced)
├─ State Management: TanStack Query + Zustand
├─ Styling: TailwindCSS 3.x + Headless UI
├─ Forms: React Hook Form + Zod validation
├─ Maps: Leaflet + React-Leaflet + PostGIS queries
├─ Charts: Recharts + Chart.js (dashboards)
├─ Auth: JWT en localStorage/sessionStorage
├─ HTTP Client: Axios + interceptors
├─ Testing: Vitest + React Testing Library
├─ E2E Testing: Cypress / Playwright
├─ UI Components: Storybook para documentación
├─ Accessibility: ESLint + Axe DevTools + WAVE
├─ Performance: Lighthouse CI + Bundle analyzer
└─ Deployment: Docker + Nginx para servir
```

### Estructura de Carpetas

```
frontend/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── logo.svg
│   │   │   ├── icons/
│   │   │   └── illustrations/
│   │   ├── fonts/
│   │   └── styles/
│   │       └── globals.css (Tailwind imports)
│   ├── components/
│   │   ├── common/                      # Componentes reutilizables
│   │   │   ├── Header.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Loader.tsx
│   │   │   ├── Alert.tsx
│   │   │   ├── Breadcrumb.tsx
│   │   │   └── Pagination.tsx
│   │   ├── auth/                        # Autenticación
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── PrivateLayout.tsx
│   │   │   └── LogoutButton.tsx
│   │   ├── attractions/                 # Sistema turístico
│   │   │   ├── AttractionList.tsx
│   │   │   ├── AttractionCard.tsx
│   │   │   ├── AttractionDetail.tsx
│   │   │   ├── AttractionFilters.tsx
│   │   │   ├── AttractionForm.tsx
│   │   │   └── AttractionGallery.tsx
│   │   ├── signage/                     # Sealizacióna inteligente
│   │   │   ├── SignageList.tsx
│   │   │   ├── SignageCard.tsx
│   │   │   ├── SignageDetail.tsx
│   │   │   ├── SignageForm.tsx
│   │   │   ├── SignageMonitor.tsx
│   │   │   └── SignagePreview.tsx
│   │   ├── digital-signs/               # Cartelera digital
│   │   │   ├── DigitalSignList.tsx
│   │   │   ├── DigitalSignCard.tsx
│   │   │   ├── DigitalSignEditor.tsx
│   │   │   ├── DigitalSignScheduler.tsx
│   │   │   ├── DigitalSignPublish.tsx
│   │   │   └── DigitalSignPreview.tsx
│   │   ├── parking/                     # Monitor aparcamientos
│   │   │   ├── ParkingMap.tsx
│   │   │   ├── ParkingStats.tsx
│   │   │   ├── ParkingHeatmap.tsx
│   │   │   ├── ParkingAvailability.tsx
│   │   │   ├── ParkingZoneDetail.tsx
│   │   │   └── ParkingForm.tsx
│   │   ├── maps/                        # Componentes mapas comunes
│   │   │   ├── LeafletMap.tsx
│   │   │   ├── MapMarker.tsx
│   │   │   ├── MapCluster.tsx
│   │   │   ├── GeolocationControl.tsx
│   │   │   └── MapLegend.tsx
│   │   ├── dashboard/                   # Dashboards admin
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── StatCard.tsx
│   │   │   ├── ChartWidget.tsx
│   │   │   ├── DataTable.tsx
│   │   │   └── UserManagement.tsx
│   │   ├── admin/                       # Páginas admin
│   │   │   ├── Users/
│   │   │   ├── Logs/
│   │   │   ├── Settings/
│   │   │   └── Analytics/
│   │   └── layouts/                     # Layouts
│   │       ├── PublicLayout.tsx
│   │       ├── AdminLayout.tsx
│   │       └── AppLayout.tsx
│   ├── pages/                           # Páginas/rutas principales
│   │   ├── Home.tsx
│   │   ├── Attractions.tsx
│   │   ├── AttractionDetail.tsx
│   │   ├── Signage.tsx
│   │   ├── DigitalSigns.tsx
│   │   ├── Parking.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Admin/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Users.tsx
│   │   │   ├── Content.tsx
│   │   │   ├── Logs.tsx
│   │   │   └── Settings.tsx
│   │   ├── NotFound.tsx
│   │   └── Error.tsx
│   ├── hooks/                           # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useApi.ts
│   │   ├── usePagination.ts
│   │   ├── useGeolocation.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useFetch.ts
│   │   ├── useMap.ts
│   │   └── useDebounce.ts
│   ├── services/                        # API calls
│   │   ├── api.ts                       # Axios instance
│   │   ├── auth.service.ts
│   │   ├── attractions.service.ts
│   │   ├── signage.service.ts
│   │   ├── digital-signs.service.ts
│   │   ├── parking.service.ts
│   │   └── admin.service.ts
│   ├── stores/                          # Zustand stores (state management)
│   │   ├── authStore.ts
│   │   ├── attractionsStore.ts
│   │   ├── mapStore.ts
│   │   ├── uiStore.ts
│   │   └── notificationStore.ts
│   ├── context/                         # React Context (si es necesario)
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── NotificationContext.tsx
│   ├── types/                           # TypeScript types
│   │   ├── index.ts
│   │   ├── auth.types.ts
│   │   ├── attractions.types.ts
│   │   ├── signage.types.ts
│   │   ├── parking.types.ts
│   │   └── api.types.ts
│   ├── utils/                           # Utilidades
│   │   ├── api-client.ts
│   │   ├── auth.utils.ts
│   │   ├── geolocation.utils.ts
│   │   ├── date-format.ts
│   │   ├── validators.ts
│   │   ├── constants.ts
│   │   ├── localStorage.ts
│   │   └── helpers.ts
│   ├── constants/
│   │   ├── api.constants.ts
│   │   ├── roles.constants.ts
│   │   ├── categories.constants.ts
│   │   └── messages.constants.ts
│   ├── middleware/                      # Request/Response interceptors
│   │   └── authInterceptor.ts
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── fixtures/
│   ├── App.tsx                          # Root component
│   ├── main.tsx                         # Entry point
│   ├── vite-env.d.ts
│   └── index.css
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json (PWA)
│   └── robots.txt
├── .env.example
├── .env.local (git-ignored)
├── vite.config.ts
├── tsconfig.json
├── vitest.config.ts
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.json
├── .prettierrc
├── cypress.config.ts (E2E)
├── package.json
├── docker/
│   ├── Dockerfile
│   └── nginx.conf
└── README.md
```

---

## 🎨 DISEÑO & UX SPECIFICATIONS

### Paleta de Colores (Turismo Slow - Natural)

```css
/* Colores primarios */
--color-primary: #218084 (Teal - Naturaleza)
--color-primary-light: #32B8C6
--color-primary-dark: #1A6A73

/* Colores secundarios */
--color-secondary: #A85230 (Marrón - Tierra)
--color-secondary-light: #D6956A
--color-secondary-dark: #5E5240

/* Colores neutros */
--color-background: #FCFCF9 (Crema claro)
--color-surface: #FFFFF5
--color-text: #134252 (Azul oscuro)
--color-text-secondary: #626C7C

/* Estados */
--color-success: #218084
--color-warning: #E6814A
--color-error: #C0152F
--color-info: #626C7C

/* Transparencias */
--color-overlay: rgba(19, 66, 82, 0.15)
```

### Tipografía

```css
/* Font Stack */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
  Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;

/* Tamaños */
--font-xs: 11px (auxiliar)
--font-sm: 12px (labels, hints)
--font-base: 14px (body text)
--font-md: 14px (regular)
--font-lg: 16px (subheadings)
--font-xl: 18px (headings)
--font-2xl: 20px (large titles)
--font-3xl: 24px (page titles)
--font-4xl: 30px (hero section)

/* Weights */
--font-normal: 400
--font-medium: 500
--font-semibold: 550
--font-bold: 600
```

### Componentes UI Base (TailwindCSS + Headless UI)

```
✓ Button (primary, secondary, outline, danger)
✓ Input (text, email, password, number, tel)
✓ Select (dropdown)
✓ Checkbox
✓ Radio
✓ Toggle
✓ TextArea
✓ Card
✓ Modal / Dialog
✓ Toast / Alert
✓ Spinner / Loader
✓ Skeleton
✓ Breadcrumb
✓ Pagination
✓ Tabs
✓ Accordion
✓ Badge
✓ Tooltip
✓ Popover
✓ Dropdown Menu
✓ Sidebar / Navigation
✓ Table
✓ Form Group
✓ Error Messages
✓ Success Messages
```

---

## 🔐 AUTENTICACIÓN & SEGURIDAD

### Flujo de Autenticación

```
1. REGISTRO (Register)
   - Validación email
   - Password strength check (min 8 chars, números, símbolos)
   - Confirmación email (future)
   - Redirect a login

2. LOGIN (Login)
   - Email + Password
   - Respuesta: JWT token + Refresh token
   - Almacenar en localStorage (con httpOnly future)
   - Redirigir a dashboard/home según rol

3. RENOVAR TOKEN (Refresh)
   - Usar refresh token antes de expirar (15 min JWT)
   - Obtener nuevo JWT
   - Automático en interceptores

4. LOGOUT (Logout)
   - Limpiar tokens
   - Redirigir a login
   - Invalidar sesión en backend

5. PROTECCIÓN
   - ProtectedRoute component
   - Verificar roles (RBAC)
   - Redirect si no autenticado
```

### Almacenamiento Seguro

```typescript
// JWT Storage
localStorage.setItem('accessToken', jwt)
localStorage.setItem('refreshToken', refreshToken)

// Usuario actual
localStorage.setItem('user', JSON.stringify(user))

// Permisos
localStorage.setItem('permissions', JSON.stringify(roles))

// No guardar en localStorage:
✗ Passwords
✗ Datos sensibles (SSN, CC)
✗ Secrets

// Future improvements:
✓ httpOnly cookies (backend)
✓ Secure flag (HTTPS only)
✓ SameSite attribute
```

### RBAC (Role-Based Access Control)

```typescript
Roles:
- ROLE_ADMIN: Acceso total
  ├─ Gestión usuarios
  ├─ Crear/editar/eliminar contenido
  ├─ Acceso logs auditoría
  └─ Configuración sistema

- ROLE_MANAGER: Gestión turismo/cartelera
  ├─ Crear/editar atractivos
  ├─ Gestionar cartelera
  ├─ Ver estadísticas
  └─ NO acceso a usuarios

- ROLE_USER: Solo lectura
  ├─ Ver atractivos
  ├─ Consultar aparcamientos
  ├─ Ver cartelera
  └─ NO crear/editar contenido
```

---

## 📱 RESPONSIVE DESIGN BREAKPOINTS

```css
Mobile-First approach:

xs: 0px      (mobile phones)
sm: 640px    (tablets small)
md: 768px    (tablets medium)
lg: 1024px   (laptops)
xl: 1280px   (desktop)
2xl: 1536px  (large screens)

Ejemplo:
<div className="flex flex-col md:flex-row lg:grid lg:grid-cols-3">
  {/* Mobile: column, Tablet: row, Desktop: grid 3 cols */}
</div>
```

---

## 📊 PÁGINAS & FUNCIONALIDADES PRINCIPALES

### 1. PUBLIC PAGES

#### Home (Landing)
```
✓ Hero section con CTAs
✓ Destacados de atractivos
✓ Búsqueda rápida
✓ Mapa interactivo miniatura
✓ Testimonios/reseñas
✓ Próximos eventos
✓ Newsletter signup
✓ Footer con enlaces
```

#### Attractions Listing
```
✓ Grid/List toggle view
✓ Filtros: categoría, rating, precio
✓ Búsqueda por nombre
✓ Orden: relevancia, rating, distancia
✓ Geolocalización: "nearby"
✓ Pagination / infinite scroll
✓ Card con imagen, nombre, categoría, rating
✓ Click → detalle
```

#### Attraction Detail
```
✓ Galería de imágenes
✓ Descripción completa
✓ Ubicación en mapa (Leaflet)
✓ Información: teléfono, website, horarios
✓ Rating y reviews
✓ Atracciones cercanas
✓ Compartir en redes
✓ Favoritos (localStorage)
```

#### Parking Map
```
✓ Mapa interactivo (Leaflet)
✓ Plazas de aparcamiento geolocalizadas
✓ Color: verde (libre), rojo (ocupado), gris (desconocido)
✓ Heatmap de ocupación
✓ Estadísticas por zona
✓ Filtro por zona
✓ Disponibilidad real-time (WebSocket future)
✓ Directions (integración Maps API)
```

#### Login/Register
```
Login:
✓ Email + Password
✓ Recordar sesión
✓ "Olvidé contraseña" link
✓ Registro link
✓ Social login buttons (future: Google, Facebook)
✓ Validación in-real-time
✓ Error messages

Register:
✓ Nombre, Email, Password, Confirmar password
✓ Términos & Condiciones checkbox
✓ Validación: email único, password strength
✓ Email confirmation (future)
✓ Redirect a login
```

---

### 2. ADMIN PAGES (ProtectedRoute + RBAC)

#### Admin Dashboard
```
✓ Welcome message personalizado
✓ KPIs: visitantes hoy, eventos próximos, plazas libres
✓ Gráficos: visitas por día, atractivos más visitados
✓ Tabla de últimas actividades
✓ Quick actions (crear atractivo, publicar cartelera)
✓ Alertas (mantenimiento, errores)
```

#### Gestión Atractivos
```
✓ Tabla: nombre, categoría, visitas, estado
✓ Crear atractivo (form: nombre, desc, category, geoloc, imágenes)
✓ Editar atractivo
✓ Eliminar atractivo (confirmación)
✓ Subir imágenes (drag & drop)
✓ Preview antes de guardar
✓ Bulk actions (activar/desactivar)
```

#### Gestión Cartelera Digital
```
✓ Timeline de carteleras
✓ Crear nueva cartelera: contenido, schedule, ubicación
✓ Editor WYSIWYG para contenido
✓ Selector de ubicación (mapa)
✓ Schedule: horarios específicos o cron
✓ Preview en tiempo real
✓ Publicar a dispositivos
✓ Analytics: views, interacciones
```

#### Gestión Sealizacióna
```
✓ Tabla de dispositivos
✓ Estado: online/offline
✓ Último heartbeat
✓ Configuración por dispositivo
✓ Asignar atractivo
✓ Ver interacciones
✓ Troubleshooting
```

#### Gestión Usuarios
```
✓ Tabla de usuarios
✓ Crear usuario (email, nombre, rol)
✓ Editar usuario (cambiar rol, estado)
✓ Eliminar usuario (soft delete)
✓ Activar/desactivar
✓ Resetear password
✓ Ver últimos accesos
```

#### Logs & Auditoría
```
✓ Tabla: usuario, acción, entidad, fecha, cambios
✓ Filtros: usuario, tipo, fecha, entidad
✓ Búsqueda
✓ Ver detalles de cambio (before/after)
✓ Exportar CSV
```

---

## 🗺️ COMPONENTES DE MAPAS (Leaflet)

### LeafletMap Component
```typescript
Props:
- center: [lat, lng]
- zoom: number
- markers: MarkerData[]
- onMarkerClick: (marker) => void
- heatmapData?: HeatmapPoint[]
- clustering?: boolean
- style?: string

Features:
✓ Capa de tiles (OpenStreetMap)
✓ Zoom controls
✓ Geolocation button
✓ Fullscreen toggle
✓ Legend
✓ Exportar como imagen
```

### MapCluster
```typescript
Props:
- markers: MarkerData[]
- maxClusterRadius: number
- zoom: number

Features:
✓ Agrupa markers cercanos
✓ Números de cluster
✓ Click para expandir
```

### Heatmap
```typescript
Props:
- data: Point[] (lat, lng, intensity)
- maxIntensity: number
- colorScale: string[]

Features:
✓ Gradient de colores
✓ Muestra densidad de datos
✓ Útil para parking, tráfico
```

---

## 📊 GRÁFICOS & DASHBOARDS (Recharts)

### Chart Components

```typescript
Tipos soportados:
✓ LineChart: tendencias (visitas, ocupación)
✓ BarChart: comparativas (atractivos populares)
✓ PieChart: distribución (categorías, zonas)
✓ AreaChart: evolución temporal
✓ ComposedChart: múltiples métricas
✓ ScatterChart: correlaciones

Ejemplo:
<LineChart data={visitsData}>
  <CartesianGrid />
  <XAxis dataKey="date" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Line type="monotone" dataKey="visits" stroke="#218084" />
</LineChart>
```

---

## 🧪 TESTING REQUERIDO

### Unit Tests (Vitest + React Testing Library)

```typescript
Cobertura: >80%

✓ Components (render, props, interactions)
✓ Hooks (useAuth, usePagination, useGeolocation)
✓ Services (API calls, data parsing)
✓ Utils (validators, formatters, helpers)
✓ Stores (Zustand state management)
✓ Interceptors (auth, error handling)
```

### Integration Tests

```
✓ Auth flow (login → dashboard → logout)
✓ Attraction CRUD (create, read, update, delete)
✓ Mapa interactivo + markers
✓ Form validation y submission
✓ Filter + search + pagination
✓ Error handling y fallbacks
```

### E2E Tests (Cypress)

```
✓ User journey: landing → login → búsqueda → detalle
✓ Admin: crear/editar/eliminar contenido
✓ Mapa: búsqueda geográfica
✓ Responsive: mobile, tablet, desktop
✓ Accessibility: WCAG checks
✓ Performance: load time, Lighthouse
```

---

## ♿ ACCESIBILIDAD (WCAG 2.1 AA)

### Requisitos Implementados

```
✓ Contraste de color: 4.5:1 para texto normal, 3:1 para texto grande
✓ Focus indicators: visible y accesible
✓ Semantic HTML: <main>, <nav>, <article>, <section>
✓ ARIA labels: aria-label, aria-describedby
✓ Alt text: todas las imágenes tienen alt descriptivo
✓ Keyboard navigation: tab, enter, escape
✓ Screen reader support: roles, aria-live
✓ Form labels: asociadas a inputs
✓ Error messages: claros, visibles, asociados a campo
✓ Skip links: saltar a contenido principal
✓ Language attribute: <html lang="es">
✓ Color no es único indicador: también íconos, texto
```

### Testing Accessibility

```
✓ ESLint eslint-plugin-jsx-a11y
✓ Axe DevTools browser extension
✓ WAVE browser extension
✓ Lighthouse report
✓ Screen reader testing (NVDA, VoiceOver)
✓ Keyboard-only navigation testing
```

---

## 🚀 PERFORMANCE OPTIMIZATION

### Estrategias

```
✓ Code splitting: React.lazy + Suspense
✓ Image optimization: WebP, lazy loading
✓ Bundle analysis: webpack-bundle-analyzer
✓ Caching: React Query cache, localStorage
✓ Infinite scroll: vs pagination
✓ Virtual scrolling: largo lists
✓ Memoization: React.memo, useMemo, useCallback
✓ Lighthouse score: >90 en desktop, >85 en mobile
```

### Métricas

```
✓ First Contentful Paint (FCP): <1.8s
✓ Largest Contentful Paint (LCP): <2.5s
✓ Cumulative Layout Shift (CLS): <0.1
✓ Time to Interactive (TTI): <3.8s
✓ Total Blocking Time (TBT): <200ms
```

---

## 📦 VARIABLES DE ENTORNO (.env.local)

```env
# Frontend
VITE_API_URL=http://localhost:3000
VITE_API_VERSION=v1
VITE_ENVIRONMENT=development
VITE_LOG_LEVEL=debug

# Maps
VITE_MAP_TILE_PROVIDER=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
VITE_MAP_ATTRIBUTION=© OpenStreetMap contributors

# Auth
VITE_JWT_STORAGE_KEY=accessToken
VITE_REFRESH_TOKEN_KEY=refreshToken

# Feature flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_PWA=true

# Theme
VITE_THEME_MODE=light
```

---

## 🐳 DOCKER & DEPLOYMENT

### Dockerfile (Production)

```dockerfile
# Multi-stage build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime
FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

### Nginx Config

```nginx
server {
  listen 80;
  server_name _;
  
  root /usr/share/nginx/html;
  index index.html index.htm;
  
  # Cache busting para archivos con hash
  location ~* \.[a-z0-9]+\.js$|\.css$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
  
  # SPA: redirect 404 a index.html
  location / {
    try_files $uri $uri/ /index.html;
  }
  
  # Security headers
  add_header X-Content-Type-Options "nosniff" always;
  add_header X-Frame-Options "SAMEORIGIN" always;
  add_header X-XSS-Protection "1; mode=block" always;
}
```

---

## 📝 HOOKS PERSONALIZADOS (Custom Hooks)

```typescript
useAuth()
├─ login(email, password)
├─ register(data)
├─ logout()
├─ isAuthenticated
├─ user (datos usuario actual)
├─ role (rol actual)
└─ loading

useApi(url, options)
├─ data
├─ loading
├─ error
├─ refetch()
└─ mutate()

usePagination(items, pageSize)
├─ currentPage
├─ pageItems
├─ totalPages
├─ goToPage()
├─ nextPage()
└─ previousPage()

useGeolocation()
├─ coordinates [lat, lng]
├─ accuracy
├─ loading
└─ error

useLocalStorage(key, initialValue)
├─ value
├─ setValue()
└─ removeValue()

useMap()
├─ mapRef
├─ center
├─ zoom
├─ setCenter()
└─ setZoom()

useDebounce(value, delay)
└─ debouncedValue (para búsqueda)
```

---

## 🎯 COMPONENTES PRINCIPALES DETALLADOS

### Button Component

```typescript
Props:
- variant: 'primary' | 'secondary' | 'outline' | 'danger'
- size: 'sm' | 'md' | 'lg'
- disabled: boolean
- loading: boolean
- onClick: () => void
- children: React.ReactNode
- icon?: React.ReactNode
- fullWidth: boolean

Ejemplo:
<Button 
  variant="primary" 
  size="lg" 
  onClick={handleSubmit}
  loading={isLoading}
>
  Guardar
</Button>
```

### Card Component

```typescript
Props:
- title: string
- description?: string
- children: React.ReactNode
- footer?: React.ReactNode
- hoverable: boolean
- onClick?: () => void

Ejemplo:
<Card title="Atractivo">
  <img src={image} alt="Atractivo" />
  <p>{description}</p>
</Card>
```

### Modal Component

```typescript
Props:
- isOpen: boolean
- onClose: () => void
- title: string
- size: 'sm' | 'md' | 'lg' | 'xl'
- children: React.ReactNode
- actions?: { label, onClick, variant }[]

Ejemplo:
<Modal isOpen={open} onClose={close} title="Confirmar">
  ¿Estás seguro?
  <Modal.Actions>
    <Button onClick={close}>Cancelar</Button>
    <Button variant="primary" onClick={confirm}>Confirmar</Button>
  </Modal.Actions>
</Modal>
```

---

## ✅ CHECKLIST DE VALIDACIÓN

- [ ] Estructura de carpetas completa
- [ ] Componentes base (Button, Card, Modal, etc)
- [ ] Páginas públicas (Home, Attractions, Parking)
- [ ] Páginas admin (Dashboard, Users, Content)
- [ ] Autenticación funcionando (login/register/logout)
- [ ] Protección de rutas (ProtectedRoute + RBAC)
- [ ] Mapas Leaflet funcionando
- [ ] Gráficos Recharts renderizando
- [ ] Validación de formularios
- [ ] HTTP interceptors para auth
- [ ] Manejo de errores global
- [ ] Notificaciones (toast/alert)
- [ ] Responsive design probado
- [ ] Accesibilidad WCAG 2.1 AA
- [ ] Tests unitarios (>80% coverage)
- [ ] Tests integración pasando
- [ ] E2E tests funcionales
- [ ] PWA manifest.json configurado
- [ ] Lighthouse score >90
- [ ] Dockerfile y nginx.conf
- [ ] .env.example con todas las variables
- [ ] README con instrucciones setup
- [ ] Git ignore correcto
- [ ] Storybook funcionando
- [ ] ESLint + Prettier configurados

---

## 📝 NOTAS IMPORTANTES

1. **User-Centric Design**: Pensar en UX, no solo en código
2. **Performance First**: Optimizar carga, imágenes, bundle
3. **Accessibility First**: WCAG 2.1 AA no es opcional
4. **Mobile First**: Diseñar para mobile, escalar a desktop
5. **Error Handling**: Mostrar errores claros al usuario
6. **Loading States**: Indicar al usuario que algo está pasando
7. **Confirmations**: Pedir confirmación antes de acciones destructivas
8. **Logging**: Logs en consola para debugging (con DEBUG flag)
9. **Documentación**: Componentes en Storybook
10. **Git**: Commits descriptivos, .gitignore correcto

---

## 🎯 OUTPUT ESPERADO

Al terminar, entregar:

1. **Carpeta frontend/** completa con todo el código
2. **Componentes reutilizables** documentados en Storybook
3. **Todas las páginas** funcionales e integradas
4. **Mapas interactivos** con Leaflet funcionando
5. **Dashboards** con gráficos Recharts
6. **Autenticación** JWT integrada
7. **Tests unitarios** >80% coverage
8. **Tests E2E** con Cypress
9. **Accessibility report** WCAG 2.1 AA
10. **Lighthouse report** >90 score
11. **Docker** imagen lista
12. **README.md** con setup completo
13. **.env.example** configurado
14. **PWA manifest** listo

---

## 💡 INTEGRACIONES FUTURAS (PHASE 2)

- WebSocket para notificaciones real-time
- Video streaming (HLS/DASH)
- Offline support (Service Workers)
- Social media sharing (Facebook, Twitter, WhatsApp)
- Analytics integración (Google Analytics, Mixpanel)
- Newsletter signup (Mailchimp)
- A/B testing
- Dark mode theme
- Multilanguage (i18n)
- Social login (Google, Facebook)

---

**¡Adelante! Comenzamos la generación del frontend React en Antigravity.**
