export type NavItem = { name: string; href: string };
export const NAV_ITEMS: NavItem[] = [ { name: 'Inicio', href: '/' }, { name: 'Tickets', href: '/tickets' }, { name: 'Nuevo Ticket', href: '/tickets/new' }, { name: 'Admin', href: '/admin' }, { name: 'RBAC', href: '/admin/rbac' } ];

// Agrega más items aquí; el Navbar los renderiza automáticamente.
