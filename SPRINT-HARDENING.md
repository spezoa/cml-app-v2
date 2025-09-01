# Sprint de endurecimiento (tema/Nav/Auth)

Aplicado: 2025-09-01T21:56:42

Incluye:
- Anti-FOUC de tema (script SSR en layout).
- Tokens de color (CSS variables) + estilos globales con alto contraste (AA).
- Navbar responsive (desktop/mobile) con activo por prefijo y ThemeToggle.
- Botón Azure visible en header (contraste y focus).
- Restricción por tenant/dominio en NextAuth (usar `.env`).
- Páginas 403/404/error/loading unificadas al tema.
- ESLint/Prettier básicos.

## Variables nuevas
- `ALLOWED_EMAIL_DOMAINS`: Ej. `miempresa.com,otraempresa.cl` (opcional)
- `AZURE_ALLOWED_TENANT`: ID del tenant de Azure (GUID). Si se define, bloquea inicio de sesión de otros tenants.

> Si no defines ninguna, el login funciona como ahora (sin restricciones extra).