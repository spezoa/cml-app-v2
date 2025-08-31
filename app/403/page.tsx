import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
