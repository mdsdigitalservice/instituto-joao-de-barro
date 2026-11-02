import type { Metadata } from "next";
import { CabecaPagina } from "@/components/CabecaPagina";
import { parcerias } from "@/content/transparencia";

export const metadata: Metadata = {
  title: "Transparência",
  description: "Termos de fomento e convênios do Instituto João de Barro com o poder público.",
};

export const revalidate = 3600;

const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const data = (d: string) => (d ? d.split("-").reverse().join("/") : "—");

export default function Transparencia() {
  const hoje = new Date().toISOString().slice(0, 10);
  const lista = [...parcerias].sort((a, b) => b.inicio.localeCompare(a.inicio));

  return (
    <>
      <CabecaPagina
        eyebrow="Prestação de contas"
        titulo={<>Portal da <em>Transparência</em></>}
        texto="Publicidade das parcerias firmadas com o poder público, conforme o art. 11 da Lei 13.019/2014 (Marco Regulatório das Organizações da Sociedade Civil)."
      />
      <section className="sec">
        <div className="wrap" style={{ display: "grid", gap: 20 }}>
          {lista.length === 0 && (
            <div className="vazio">
              <p style={{ fontWeight: 600, color: "var(--texto)" }}>Nenhuma parceria publicada no momento.</p>
              <p style={{ marginTop: 6 }}>Os termos de fomento e convênios aparecerão aqui assim que forem firmados.</p>
            </div>
          )}
          {lista.map((p) => {
            const vigente = p.fim >= hoje;
            return (
              <article className="parceria" key={p.convenio + p.projeto}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
                  <h2 style={{ fontFamily: "var(--f-titulo)", fontSize: 22, fontWeight: 700 }}>{p.projeto}</h2>
                  <span className={`status${vigente ? "" : " fim"}`}>{vigente ? "Vigente" : "Concluída"}</span>
                </div>
                <dl>
                  <div><dt>Valor</dt><dd>{brl(p.valor)}</dd></div>
                  <div><dt>Vigência</dt><dd>{data(p.inicio)} a {data(p.fim)}</dd></div>
                  {p.programa && <div><dt>Programa</dt><dd>{p.programa}</dd></div>}
                  {p.fonte && <div><dt>Fonte do recurso</dt><dd>{p.fonte}</dd></div>}
                  <div><dt>Nº do convênio</dt><dd>{p.convenio}</dd></div>
                  <div><dt>Nº do processo</dt><dd>{p.processo}</dd></div>
                  <div><dt>Assinatura</dt><dd>{data(p.assinatura)}</dd></div>
                  <div><dt>Publicação</dt><dd>{data(p.publicacao)}</dd></div>
                </dl>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
