# Guía de Uso de la API

## Autenticación

La API utiliza tokens **JWT (Bearer Token)**. Debes obtener un token a través del endpoint `/auth/login` y enviarlo en el header `Authorization` de cada petición protegida.

**Header:**
```
Authorization: Bearer <tu_token_jwt>
```

## Convención de Respuestas

Todas las respuestas siguen un formato JSON estandarizado.

**Éxito (200/201):**
```json
{
  "status": "success",
  "data": { ... } // Objeto o Array
}
```

**Error (4xx/5xx):**
```json
{
  "status": "error",
  "message": "Descripción del error",
  "code": "ErrorCode" // Opcional
}
```

## Ejemplos con CURL

### Iniciar Sesión
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "password123"}'
```

### Obtener Usuarios (Requiere Token)
```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer <TOKEN>"
```

### Consultar Carteles Digitales
```bash
curl -X GET http://localhost:3000/api/digital-signs \
  -H "Authorization: Bearer <TOKEN>"
```
