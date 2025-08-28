export default function HomePage() {
  return (
    <div className="card">
      <h1 className="text-2xl font-semibold mb-2">Panel</h1>
      <p>Starter v100.2 — Gestión de Taller de Bomberos (sin ARFF).</p>
      <ul className="list-disc pl-6 mt-4 space-y-1 text-sm">
        <li>SSO Office 365 (Microsoft Entra ID)</li>
        <li>Tickets con prioridades/SLA (base)</li>
        <li>RBAC con permisos por prefijo</li>
        <li>Management Console (/admin)</li>
      </ul>
    </div>
  );
}
