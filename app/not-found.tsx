import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';


export default function NotFound() {
  return (
    <Card title="Página no encontrada" description="La ruta solicitada no existe" ctaLabel=" ">
      <div className="text-sm text-slate-400">Revisa la URL o vuelve al inicio.</div>
    </Card>
  );
}
