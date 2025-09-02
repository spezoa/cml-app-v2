'use client';
export default function GlobalError({
  error,
  reset,
}: { error: Error & { digest?: string }, reset: () => void }) {
  return (
    <html>
      <body style={{padding:20,fontFamily:"ui-sans-serif, system-ui"}}>
        <h1 style={{fontSize:22,fontWeight:600,marginBottom:8}}>Ocurrió un problema</h1>
        <p style={{color:"#555"}}>Ref: {error.digest ?? 'sin-digest'}</p>
        <button onClick={() => reset()} style={{marginTop:12,padding:"8px 14px",border:"1px solid #ddd",borderRadius:8}}>Reintentar</button>
      </body>
    </html>
  );
}
