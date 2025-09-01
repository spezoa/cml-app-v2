import { Tile, Button, Card, CardHeader, CardTitle, CardContent, Badge, Field, Input, Select, Textarea, Labeled } from "@/components";


export default function NotFound() {
  return (
    <Card title="Página no encontrada" description="La ruta solicitada no existe" ctaLabel=" ">
      <div className="text-sm text-slate-400">Revisa la URL o vuelve al inicio.</div>
    </Card>
  );
}
