'use client';
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  return (
    <html suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <div className="mx-auto max-w-md text-center py-24">
          <h1 className="text-3xl font-semibold mb-2">Algo salió mal</h1>
          <p className="text-gray-500 mb-6">{error?.message || 'Error inesperado'}</p>
          <button onClick={reset} className="btn btn-primary">Reintentar</button>
        </div>
      </body>
    </html>
  );
}