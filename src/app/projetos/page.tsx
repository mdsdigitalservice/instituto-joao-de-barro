import type { Metadata } from "next";
import { CabecaPagina } from "@/components/CabecaPagina";
import { projetos } from "@/content/projetos";

export const metadata: Metadata = { title: "Projetos", description: "Projetos de esporte, cultura e desenvolvimento social do Instituto João de Barro." };

export default function Projetos() {
  return (
    <>
      <CabecaPagina
        eyebrow="Projetos"
        titulo={<>Ações que <em>constroem</em></>}
        texto="Esporte, cultura e inclusão para crianças, jovens e famílias de Mato Grosso."
        foto="/img/futebol.jpg"
      />
      <section className="sec">
        <div className="wrap" style={{ display: "grid", gap: "clamp(56px, 8vw, 96px)" }}>
          {projetos.map((p, i) => (
            <article id={p.slug} key={p.slug} className="grade g2" style={{ scrollMarginTop: 110 }}>
              <div className="foto-quente" style={{ order: i % 2 ? 2 : 0, aspectRatio: "4 / 3" }}>
                <img src={p.imagem || "/img/joao-de-barro.jpg"} alt={p.imagem ? p.nome : ""} loading="lazy" />
              </div>
              <div>
                <p className="eyebrow">{p.area}</p>
                <h2 className="titulo" style={{ marginTop: 14, fontSize: "clamp(28px, 3.6vw, 46px)" }}>{p.nome}</h2>
                <p className="lead" style={{ marginTop: 18 }}>{p.resumo}</p>
                {p.publico && <p style={{ marginTop: 16 }}><b>Público:</b> {p.publico}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
