# Arquitectura del Sistema

## Diagrama de Contexto

El sistema Slow Pozoblanco interactúa con varios actores: Visitantes (App móvil/Web), Administradores (Panel Web), y Dispositivos IoT (Pantallas digitales).

```mermaid
graph TD
    User[Visitante] -->|HTTPS| WebApp[Frontend Web]
    Admin[Administrador] -->|HTTPS| WebApp
    IoT[Pantalla Digital] -->|HTTPS/WSS| Backend[Backend API]
    WebApp -->|REST API| Backend
    Backend -->|SQL| DB[(PostgreSQL)]
    Backend -->|Cache| Redis[(Redis)]
```

## Diagrama de Contenedores

Detalle de los componentes principales del software.

```mermaid
C4Container
    title Diagrama de Contenedores - Slow Pozoblanco

    Container(Web, "Web App", "React, Vite, TS", "Interfaz para usuarios y administradores")
    Container(API, "API Server", "Node.js, Express, TS", "Lógica de negocio y controladores")
    ContainerDb(DB, "Database", "PostgreSQL", "Almacena usuarios, recursos turísticos, logs")
    ContainerDb(Redis, "Cache", "Redis", "Sesiones y datos volátiles")

    Rel(Web, API, "Usa", "JSON/HTTPS")
    Rel(API, DB, "Lee/Escribe", "TypeORM")
    Rel(API, Redis, "Cachea", "Redis Client")
```

## Seguridad y Autenticación

- **JWT (JSON Web Tokens)**: Se utilizan para autenticar las peticiones de la API.
- **RBAC (Role-Based Access Control)**:
  - `ADMIN`: Acceso total.
  - `USER`: Acceso limitado a gestión propia.
  - `ROBOT`: Rol para dispositivos automatizados.

## Logging

Se utiliza **Winston** para el registro de logs estructurados en el backend. Los logs se rotan diariamente y se almacenan localmente en `backend/logs/`.
