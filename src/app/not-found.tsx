import Link from "next/link";

export default function NaoEncontrado() {
  return (
    <section className="sec">
      <div className="wrap">
        <p className="eyebrow">Erro 404</p>
        <h1 className="titulo" style={{ marginTop: 16 }}>Página não <em>encontrada</em></h1>
        <p className="lead" style={{ marginTop: 18 }}>O endereço pode ter mudado ou a página foi removida.</p>
        <Link href="/" className="btn" style={{ marginTop: 28 }}>Voltar ao início</Link>
      </div>
    </section>
  );
}
