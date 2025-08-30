export default function Forbidden() {
  return (
    <div style={{maxWidth:560,margin:"60px auto",textAlign:"center",fontFamily:"ui-sans-serif, system-ui"}}>
      <h1 style={{fontSize:24,fontWeight:600,marginBottom:8}}>403 — Sin permisos</h1>
      <p style={{color:"#555"}}>No tienes permisos para ver esta página. Pide a un administrador que te asigne el rol adecuado.</p>
    </div>
  );
}
