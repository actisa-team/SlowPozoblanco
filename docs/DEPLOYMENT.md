# Guía de Despliegue

## Entorno Local (Docker)

Para levantar todo el stack localmente usando Docker Compose (recomendado para pruebas de integración):

```yaml
# docker-compose.yml (ejemplo)
version: '3.8'
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
  redis:
    image: redis:alpine
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    depends_on:
      - db
      - redis
  frontend:
    build: ./frontend
    ports:
      - "5173:80"
```

## Despliegue en Producción (On-Premise / VPS)

### Backend
1. **Build**: `npm run build` genera la carpeta `dist/`.
2. **Process Manager**: Usar **PM2** para mantener el proceso vivo.
   ```bash
   pm2 start dist/server.js --name "slow-backend"
   ```
3. **Reverse Proxy**: Configurar Nginx para servir el backend bajo `/api` y manejar SSL.

### Frontend
1. **Build**: `npm run build` genera la carpeta `dist/`.
2. **Servir Estáticos**: Usar Nginx o Apache para servir la carpeta `dist/`. Configurar la regla "fallback" para SPA (redirigir 404 a `index.html`).

## Backups

### Base de Datos
Configurar un cron job diario para volcar la base de datos:
```bash
pg_dump -U usuario -h localhost slow_db > backup_$(date +%Y%m%d).sql
```
Guardar los backups en almacenamiento externo (S3, disco secundario).

## Rotación de Logs
El backend utiliza `winston-daily-rotate-file`. Los logs antiguos se comprimen y se eliminan después de 14 días automáticamente.
