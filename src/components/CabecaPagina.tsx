export function CabecaPagina({ eyebrow, titulo, texto, foto }: { eyebrow: string; titulo: React.ReactNode; texto?: string; foto?: string }) {
  return (
    <section className="cabeca">
      {foto && (
        <div className="foto" aria-hidden="true">
          <img src={foto} alt="" />
        </div>
      )}
      <div className="wrap">
        <p className="eyebrow entra">{eyebrow}</p>
        <h1 className="titulo entra" style={{ marginTop: 18, ["--d" as string]: ".1s" }}>{titulo}</h1>
        {texto && <p className="lead entra" style={{ marginTop: 20, ["--d" as string]: ".2s" }}>{texto}</p>}
      </div>
    </section>
  );
}
