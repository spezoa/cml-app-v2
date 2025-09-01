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

// OJO con el case: si tu archivo es `components/ui/Field.tsx` (mayúscula),
// usa './ui/Field' EXACTO. Si es `field.tsx` en minúscula, usa './ui/field'.
export { Field, Input, Select, Textarea, Labeled } from './ui/field';

// si tienes Badge:
export { Badge } from './ui/badge';

// features
export { default as TicketsList } from './tickets/TicketsList';
