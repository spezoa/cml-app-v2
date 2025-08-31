import Link from "next/link";
import { Tile, Button, Card, CardHeader, CardTitle, CardContent, Badge, Field, Input, Select, Textarea, Labeled } from "@/components/ui";


export default function Page403() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Acceso denegado</CardTitle>
          <CardDescription>No tienes permisos para ver esta página</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Contacta a un administrador para obtener acceso.
          </p>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Link href="/">
            <Button variant="secondary">Ir al inicio</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
