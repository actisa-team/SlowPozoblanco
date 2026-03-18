# Guía de Contribución

¡Gracias por contribuir a Slow Pozoblanco!

## Flujo de Trabajo (Git Flow)

1. **Main (`main`)**: Código estable en producción. No hacer commit directo.
2. **Develop (`develop`)**: Rama de integración principal. PRs van aquí.
3. **Feature (`feature/nombre-feature`)**: Para nuevas funcionalidades.
4. **Fix (`fix/nombre-bug`)**: Para corrección de errores.

## Checklist para Pull Requests

- [ ] El código compila sin errores (`npm run build`).
- [ ] No hay errores de linter (`npm run lint`).
- [ ] Se han añadido pruebas si aplica.
- [ ] Se ha actualizado la documentación si aplica.

## Convenciones de Código

- **Estilo**: Usamos Prettier y ESLint. Configura tu editor para formatear al guardar.
- **Commits**: Usar Conventional Commits.
  - `feat: añadir autenticación`
  - `fix: corregir error en login`
  - `docs: actualizar readme`
