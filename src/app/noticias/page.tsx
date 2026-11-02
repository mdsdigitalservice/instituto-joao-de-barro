import type { Metadata } from "next";
import { CabecaPagina } from "@/components/CabecaPagina";
import { CartaoNoticia } from "@/components/CartaoNoticia";
import { listarNoticias } from "@/lib/noticias";

export const revalidate = 60;
export const metadata: Metadata = { title: "Notícias", description: "Ações, eventos e novidades do Instituto João de Barro." };

export default async function Noticias() {
  const noticias = await listarNoticias();
  return (
    <>
      <CabecaPagina eyebrow="Notícias" titulo={<>Últimas <em>ações</em></>} texto="Eventos, projetos e conquistas do Instituto João de Barro." foto="/img/karate.jpg" />
      <section className="sec">
        <div className="wrap">
          {noticias.length > 0 ? (
            <div className="grade g3">{noticias.map((n) => <CartaoNoticia key={n.id} n={n} />)}</div>
          ) : (
            <div className="vazio">As primeiras notícias serão publicadas em breve.</div>
          )}
        </div>
      </section>
    </>
  );
}
