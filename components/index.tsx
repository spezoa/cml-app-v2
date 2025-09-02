// components/index.tsx

// layout
export { default as Shell } from './Shell';

// ui
export { default as Tile } from './ui/tile';
export type { TileProps } from './ui/tile';

export { Button } from './ui/button';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card';

// Field: default + piezas nombradas
// ⬇️ OJO: Field es default export en './ui/field', por eso usamos "default as Field"
export { default as Field, Input, Select, Textarea, Labeled } from './ui/field';

// (si existe)
export { Badge } from './ui/badge';

// features
export { default as TicketsList } from './tickets/TicketsList';

export { default as ThemeToggle } from './ThemeToggle';
