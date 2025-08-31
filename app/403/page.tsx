import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';

export default function Page403() {
  return (
    <Card title="Acceso denegado" description="No tienes permisos para ver esta página" ctaLabel=" ">
      <div className="text-sm text-slate-400">Contacta a un administrador para obtener acceso.</div>
    </Card>
  );
}
