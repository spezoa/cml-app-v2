import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from "@/components";

export default function ForbiddenPage() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Acceso denegado</CardTitle>
          <CardDescription>No tienes permisos para ver esta página</CardDescription>
        </CardHeader>

        <CardContent>
          <p>Si crees que esto es un error, contacta a un administrador.</p>
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
