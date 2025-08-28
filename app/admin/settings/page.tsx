export default function SettingsPage() {
  return (
    <div className="card">
      <h1 className="text-xl font-semibold mb-4">Ajustes Generales</h1>
      <form className="grid gap-4 max-w-lg">
        <div>
          <label>Nombre del taller</label>
          <input placeholder="Ej. Taller Compañía 8" />
        </div>
        <div>
          <label>Zona horaria</label>
          <select defaultValue="America/Santiago"><option>America/Santiago</option></select>
        </div>
        <div className="flex gap-2">
          <button className="btn-primary" type="button">Guardar</button>
          <button className="btn" type="button">Cancelar</button>
        </div>
      </form>
    </div>
  );
}
