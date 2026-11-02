import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { CabecaPagina } from "@/components/CabecaPagina";
import { documentos, parcerias } from "@/content/transparencia";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Transparência",
  description:
    "Documentos oficiais do Instituto João de Barro (CNPJ, estatuto, atas e diretoria) e parcerias firmadas com o poder público.",
};

export const revalidate = 3600;

const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const data = (d: string) => (d ? d.split("-").reverse().join("/") : "—");

function tamanho(arquivo: string) {
  try {
    const bytes = fs.statSync(path.join(process.cwd(), "public", arquivo)).size;
    return bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1).replace(".", ",")} MB` : `${Math.round(bytes / 1024)} KB`;
  } catch {
    return "";
  }
}

export default function Transparencia() {
  const hoje = new Date().toISOString().slice(0, 10);
  const lista = [...parcerias].sort((a, b) => b.inicio.localeCompare(a.inicio));
  const docs = documentos;

  return (
    <>
      <CabecaPagina
        eyebrow="Transparência"
        titulo={<>Documentos <em>oficiais</em></>}
        texto="O Instituto João de Barro torna públicos seus documentos de constituição, a composição da diretoria e as parcerias firmadas com o poder público, para que qualquer pessoa possa consultar como a entidade está organizada e como presta contas."
      />

      <section className="sec">
        <div className="wrap">
          <div className="ficha">
            <div><dt>Razão social</dt><dd>{site.razaoSocial}</dd></div>
            <div><dt>CNPJ</dt><dd>{site.cnpj}</dd></div>
            <div><dt>Natureza jurídica</dt><dd>Associação privada sem fins lucrativos</dd></div>
            <div><dt>Fundação</dt><dd>10/04/2013</dd></div>
          </div>

          <h2 className="titulo sub-titulo">Documentos institucionais</h2>
          <ul className="docs">
            {docs.map((d) => {
              const kb = tamanho(d.arquivo);
              return (
                <li className="doc" key={d.arquivo}>
                  <span className="doc-ico" aria-hidden="true">PDF</span>
                  <div className="doc-txt">
                    <p className="doc-meta">
                      {d.categoria} · {data(d.data)} · {d.paginas} {d.paginas === 1 ? "página" : "páginas"}
                      {kb && ` · ${kb}`}
                    </p>
                    <h3>{d.titulo}</h3>
                    <p>{d.descricao}</p>
                  </div>
                  <div className="doc-acoes">
                    <a href={d.arquivo} target="_blank" rel="noopener" className="btn">Visualizar</a>
                    <a href={d.arquivo} download className="btn contorno">Baixar</a>
                  </div>
                </li>
              );
            })}
          </ul>

          <h2 className="titulo sub-titulo">Parcerias com o poder público</h2>
          <p className="lead" style={{ maxWidth: 760 }}>
            Termos de fomento e convênios, publicados conforme o art. 11 da Lei 13.019/2014 (Marco Regulatório das Organizações da Sociedade Civil).
          </p>
          <div style={{ display: "grid", gap: 20, marginTop: 28 }}>
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
                    <h3 style={{ fontFamily: "var(--f-titulo)", fontSize: 22, fontWeight: 700 }}>{p.projeto}</h3>
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
        </div>
      </section>
    </>
  );
}
