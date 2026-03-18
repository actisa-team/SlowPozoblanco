# Runbook (Procedimientos Operativos)

## Gestión de Incidencias Comunes

### 1. Base de Datos Caída ("Database Connection Error")
**Síntomas:** La API devuelve 500 y logs indican error de conexión.
**Acciones:**
1. Verificar estado del servicio Postgres: `systemctl status postgresql` o `docker ps`.
2. Verificar credenciales en `.env`.
3. Reiniciar servicio: `sudo systemctl restart postgresql`.

### 2. Errores CORS en Frontend
**Síntomas:** El navegador bloquea peticiones XHR/Fetch.
**Acciones:**
1. Verificar variable `CORS_ORIGIN` en `backend/.env`. Debe coincidir con la URL del frontend (ej: `http://localhost:5173` o `https://midominio.com`).
2. Reiniciar backend tras cambios en `.env`.

### 3. Tokens Expirados
**Síntomas:** Usuarios deslogueados o errores 401.
**Acciones:**
1. El usuario debe hacer login nuevamente.
2. Si es masivo, verificar sincronización de hora en el servidor (NTP).

## Health Checks

- **API Status**: `GET /api/health` (debe devolver 200 OK).
- **DB Check**: Verificar logs de arranque del backend ("Database connected").

## Procedimiento de Rollback

Si un despliegue falla:
1. **Backend**: Revertir al commit anterior en git y ejecutar `npm run build` + `pm2 restart slow-backend`.
   - Si hubo migraciones de DB irreversibles, restaurar backup reciente.
2. **Frontend**: Revertir commit en git, `npm run build` y copiar `dist/` nuevamente al servidor web.
