export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-xl p-5 border border-[#1f2937] bg-[#111827]">
        <h2 className="text-xl font-semibold mb-1">Bienvenido (Nueva UI)</h2>
        <p className="text-slate-400 text-sm">Prueba esta UI sin afectar tu app actual.</p>
      </div>
      <div className="rounded-xl p-5 border border-[#1f2937] bg-[#111827]">
        <h3 className="font-medium mb-2">Atajos</h3>
        <ul className="space-y-2 text-sm">
          <li>• Crear ticket: <code>/newui/tickets/new</code></li>
          <li>• Listado: <code>/newui/tickets</code></li>
          <li>• Admin (usa la actual): <code>/admin</code></li>
        </ul>
      </div>
    </div>
  );
}
