import type { Metadata } from "next";
import { CabecaPagina } from "@/components/CabecaPagina";
import { quemSomos, missao, valores } from "@/content/institucional";

export const metadata: Metadata = { title: "Quem Somos", description: "Missão, valores e história do Instituto João de Barro." };

export default function QuemSomos() {
  return (
    <>
      <CabecaPagina
        eyebrow="Quem somos"
        titulo={<>Toda ação <em>constrói</em></>}
        texto="Como o joão-de-barro, construímos com paciência, colaboração e propósito."
        foto="/img/joao-de-barro-close.jpg"
      />

      <section className="sec">
        <div className="wrap grade g2" style={{ alignItems: "start" }}>
          <div className="prosa">
            {quemSomos.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className="foto-quente">
            <img src="/img/ninho.jpg" alt="Ninho de joão-de-barro em um galho" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="sec escuro">
        <div className="wrap grade g2" style={{ alignItems: "start" }}>
          <div>
            <p className="eyebrow">Nossa construção</p>
            <h2 className="titulo" style={{ marginTop: 16 }}>Missão</h2>
          </div>
          <div className="prosa" style={{ color: "#d7cebc" }}>
            {missao.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <p className="eyebrow">Construção de valores</p>
          <h2 className="titulo" style={{ marginTop: 16 }}>Nossos <em>valores</em></h2>
          <div className="grade g5" style={{ marginTop: 48 }}>
            {valores.map((v) => (
              <div className="valor" key={v.nome}>
                <h3>{v.nome}</h3>
                <p>{v.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
