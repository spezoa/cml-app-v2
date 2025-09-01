'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function SignInOut() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <span className="text-sm text-gray-500 dark:text-gray-400">Comprobando sesión…</span>;
  }

  return session ? (
    <div className="flex items-center gap-3 text-sm">
      <span className="hidden md:inline text-gray-700 dark:text-gray-200">
        {session.user?.email || 'usuario'}
      </span>
      <button
        className="inline-flex items-center rounded-xl px-3 py-1.5 text-sm bg-gray-800 text-gray-100 hover:bg-gray-700"
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        Salir
      </button>
    </div>
  ) : (
    <button
      className="inline-flex items-center rounded-xl px-3 py-1.5 text-sm bg-indigo-600 text-white hover:bg-indigo-500"
      onClick={() => signIn('azure-ad', { callbackUrl: '/' })}
    >
      Ingresar con Office 365
    </button>
  );
}