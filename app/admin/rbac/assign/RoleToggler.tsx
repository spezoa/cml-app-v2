'use client';

export default function RoleToggler({
  userId,
  roleId,
  assigned,
  onDone,
}: {
  userId: string;
  roleId: string;
  assigned: boolean;
  onDone?: () => void;
}) {
  async function assign() {
    await fetch(`/api/admin/users/${userId}/roles`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ roleId }),
    });
    onDone?.();
  }
  async function remove() {
    await fetch(`/api/admin/users/${userId}/roles`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ roleId }),
    });
    onDone?.();
  }

  return assigned ? (
    <button
      className="h-9 px-3 rounded-md border"
      onClick={(e) => {
        e.preventDefault();
        remove().then(() => location.reload());
      }}
    >
      Quitar
    </button>
  ) : (
    <button
      className="h-9 px-3 rounded-md bg-gray-900 text-white"
      onClick={(e) => {
        e.preventDefault();
        assign().then(() => location.reload());
      }}
    >
      Asignar
    </button>
  );
}