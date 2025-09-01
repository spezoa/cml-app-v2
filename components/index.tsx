// components/index.ts
export { Shell } from './layout/Shell';

// Si te sirve, re-exporta también componentes de features
export { default as TicketsList } from './tickets/TicketsList';

// Y si quieres, vuelve a exportar las primitivas para tener “un solo sitio”:
export * from './ui';
