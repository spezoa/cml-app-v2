
# Dark theme & Global Navbar patch (2025-09-01T21:17:41)

- Enforce dark mode site-wide via `<html className="dark">` y Tailwind `darkMode: 'class'`.
- Base colors: fondo `bg-gray-950`, texto `text-gray-100` para contraste.
- Nueva barra de navegación global `components/Navbar.tsx` con acceso a:
  Inicio, Tickets, Nuevo Ticket, Admin, RBAC.
- Botón de inicio/cierre de sesión (Microsoft Azure) visible en Navbar (`components/SignInOut.tsx`).
- `app/layout.tsx` ahora incluye `Navbar` y el wrapper `<main>` para todas las páginas.
- `components/Shell.tsx` reducido a contenedor de contenido (evita navbar duplicado).
- `app/globals.css` con ajustes de contraste para enlaces e inputs.
- `tailwind.config.js` actualizado a `darkMode: 'class'`.

Para añadir nuevas secciones al Nav, edita `lib/site.ts` y agrega `{ name, href }`.
