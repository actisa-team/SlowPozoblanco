# Slow Pozoblanco

Bienvenido al repositorio de **Slow Pozoblanco**. Este proyecto es una plataforma integral para la gestión turística y de señalización digital inteligente en Pozoblanco, diseñada para mejorar la experiencia del visitante y la gestión municipal.

## 🏗 Arquitectura

El sistema sigue una arquitectura moderna de cliente-servidor:

- **Frontend**: Aplicación web SPA (Single Page Application) construida con **React**, **TypeScript** y **Vite**. Enfocada en la velocidad y una experiencia de usuario rica.
- **Backend**: API RESTful construida con **Node.js**, **Express** y **TypeScript**. Gestiona la lógica de negocio, autenticación y acceso a datos.
- **Base de Datos**: **PostgreSQL** (según configuración típica, verificar `backend/.env`) con **PostGIS** para funcionalidades geoespaciales (turismo).
- **Cache/Mensajería**: **Redis** para gestión de sesiones o caché de datos frecuentes.

## 🚀 Requisitos Previos

Asegúrate de tener instalado:

- **Node.js**: v18 o superior.
- **npm**: v9 o superior.
- **Docker** (opcional, para levantar servicios auxiliares como DB y Redis).

## 🛠 Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd slow-pozoblanco
```

### 2. Configurar Variables de Entorno

**Backend:**
```bash
cd backend
cp .env.example .env
# Edita .env con tus credenciales de base de datos y secretos
```

**Frontend:**
```bash
cd frontend
cp .env.example .env
# Edita .env con la URL del backend (VITE_API_URL)
```

### 3. Ejecutar en Desarrollo

**Backend:**
```bash
cd backend
npm install
npm run dev
# El servidor iniciará en http://localhost:3000 (por defecto)
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
# La aplicación iniciará en http://localhost:5173 (por defecto)
```

## 📚 Comandos Disponibles

Desde la raíz (si se configura el package.json raíz) o en cada carpeta:

- `npm run lint`: Analiza el código en busca de errores.
- `npm run build`: Compila el proyecto para producción.
- `npm run docs`: Genera y sirve toda la documentación del proyecto.

## 🔗 Enlaces Importantes

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend Health**: [http://localhost:3000/api/health](http://localhost:3000/api/health) (si existe endpoint)
- **Swagger UI**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## 📖 Documentación Adicional

Explora la carpeta `docs/` para información detallada:

- [Arquitectura](docs/ARCHITECTURE.md)
- [Despliegue](docs/DEPLOYMENT.md)
- [Runbook (Operaciones)](docs/RUNBOOK.md)
- [Contribuir](docs/CONTRIBUTING.md)
