export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="card">
        <h2 className="text-xl font-semibold mb-1">Bienvenido</h2>
        <p className="text-slate-400 text-sm">Usa el menú para crear tickets, revisar el tablero y administrar la configuración.</p>
      </div>
      <div className="card">
        <h3 className="font-medium mb-2">Atajos</h3>
        <ul className="space-y-2 text-sm">
          <li>• Crear ticket: <code>/tickets/new</code></li>
          <li>• Listado de tickets: <code>/tickets</code></li>
          <li>• Panel de administración: <code>/admin</code></li>
        </ul>
      </div>
    </div>
  );
}
