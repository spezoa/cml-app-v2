export type ApiError = { ok?: false; error?: string } | string;

export async function api<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    cache: 'no-store',
  });

  if (!res.ok) {
    let err: ApiError;
    try { err = await res.json(); } catch { err = await res.text(); }
    const msg = typeof err === 'string' ? err : err?.error || 'Error API';
    throw new Error(msg);
  }
  return (await res.json()) as T;
}
