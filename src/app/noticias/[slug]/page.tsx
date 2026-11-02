import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarNoticia, dataBR } from "@/lib/noticias";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const n = await buscarNoticia(slug);
  if (!n) return { title: "Notícia não encontrada" };
  return {
    title: n.titulo,
    description: n.resumo,
    openGraph: { title: n.titulo, description: n.resumo, images: n.capa_url ? [n.capa_url] : undefined, type: "article" },
  };
}

export default async function NoticiaPage({ params }: Props) {
  const { slug } = await params;
  const n = await buscarNoticia(slug);
  if (!n) notFound();

  return (
    <article className="sec">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <Link href="/noticias" className="eyebrow" style={{ textDecoration: "none" }}>← Notícias</Link>
        <p className="tag entra" style={{ marginTop: 28 }}>{dataBR(n.publicado_em)}</p>
        <h1 className="titulo entra" style={{ marginTop: 14, fontSize: "clamp(30px, 4.4vw, 54px)", textTransform: "none", letterSpacing: "-0.02em" }}>{n.titulo}</h1>
        {n.resumo && <p className="lead entra" style={{ marginTop: 18, ["--d" as string]: ".1s" }}>{n.resumo}</p>}
        {n.capa_url && (
          <div className="noticia-capa entra" style={{ ["--d" as string]: ".2s" }}>
            <img src={n.capa_url} alt="" />
          </div>
        )}
        <div className="prosa" style={{ marginTop: n.capa_url ? 0 : 36 }}>
          {n.conteudo.split(/\n\s*\n/).filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
        </div>
        {n.galeria?.length > 0 && (
          <div className="galeria">
            {n.galeria.map((src) => <img key={src} src={src} alt="" loading="lazy" />)}
          </div>
        )}
      </div>
    </article>
  );
}
