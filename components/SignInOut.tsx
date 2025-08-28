"use client";
import { signIn, signOut } from "next-auth/react";

export default function SignInOut({ session }: { session: any }) {
  return session ? (
    <div className="flex items-center gap-3 text-sm">
      <span className="hidden md:inline">Hola, {session.user?.email || "usuario"}</span>
      <button className="btn" onClick={()=>signOut({ callbackUrl: "/" })}>Salir</button>
    </div>
  ) : (
    <button className="btn btn-primary" onClick={()=>signIn("azure-ad", { callbackUrl: "/" })}>
      Ingresar con Office 365
    </button>
  );
}
