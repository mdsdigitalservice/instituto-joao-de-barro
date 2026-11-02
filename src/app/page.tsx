import Link from "next/link";
import { site } from "@/content/site";
import { quemSomos, valores, numeros } from "@/content/institucional";
import { projetos } from "@/content/projetos";
import { listarNoticias } from "@/lib/noticias";
import { CartaoNoticia } from "@/components/CartaoNoticia";

export const revalidate = 60;

export default async function Inicio() {
  const noticias = await listarNoticias(3);

  return (
    <>
      <section className="hero">
        <div className="foto" aria-hidden="true">
          <img src="/img/joao-de-barro.jpg" alt="" />
        </div>
        <div className="wrap">
          <div className="paineis">
            <div className="painel-marrom entra" style={{ ["--d" as string]: ".15s" }}>
              <p className="eyebrow" style={{ color: "var(--areia)", opacity: 0.85 }}>{site.cidade}</p>
              <h1 style={{ marginTop: 18 }}>Toda ação<br />constrói!</h1>
            </div>
            <div className="painel-escuro entra" style={{ ["--d" as string]: ".35s" }}>
              <p style={{ fontSize: 18, color: "#d7cebc" }}>
                Promovemos o <b style={{ color: "var(--areia)" }}>bem-estar</b>, a <b style={{ color: "var(--areia)" }}>educação</b> e o{" "}
                <b style={{ color: "var(--areia)" }}>desenvolvimento social</b> com projetos de esporte, cultura e inclusão.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <Link href="/projetos" className="btn">Conheça os projetos</Link>
                <Link href="/quem-somos" className="btn contorno">Quem somos</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap grade g2">
          <div>
            <p className="eyebrow">Quem somos</p>
            <h2 className="titulo" style={{ marginTop: 16 }}>Construir, qualificar e <em>conectar.</em></h2>
            <div className="prosa" style={{ marginTop: 24, color: "var(--texto-suave)" }}>
              <p>{quemSomos[0]}</p>
              <p>{quemSomos[2]}</p>
            </div>
            <Link href="/quem-somos" className="btn contorno" style={{ marginTop: 32 }}>Nossa história</Link>
          </div>
          <div className="foto-quente">
            <img src="/img/ninho.jpg" alt="Ninho de joão-de-barro em um galho" loading="lazy" />
          </div>
        </div>
      </section>

      {numeros.length > 0 && (
        <section className="sec escuro" style={{ paddingBlock: 64 }}>
          <div className="wrap grade g5">
            {numeros.map((n) => (
              <div key={n.rotulo}>
                <p className="titulo" style={{ color: "var(--caramelo)" }}>{n.valor}</p>
                <p style={{ marginTop: 6 }}>{n.rotulo}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="sec escuro">
        <div className="wrap">
          <p className="eyebrow">Construção de valores</p>
          <h2 className="titulo" style={{ marginTop: 16 }}>O que nos <em>move</em></h2>
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

      <section className="sec">
        <div className="wrap">
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 20 }}>
            <div>
              <p className="eyebrow">Projetos</p>
              <h2 className="titulo" style={{ marginTop: 16 }}>Ações que <em>constroem</em></h2>
            </div>
            <Link href="/projetos" className="btn contorno">Ver todos</Link>
          </div>
          <div className="grade g3" style={{ marginTop: 44 }}>
            {projetos.slice(0, 3).map((p) => (
              <Link href={`/projetos#${p.slug}`} className="cartao" key={p.slug}>
                <div className={`img${p.imagem ? "" : " vazia"}`}>
                  <img src={p.imagem || "/img/logo-escuro.png"} alt="" loading="lazy" />
                </div>
                <div className="corpo">
                  <span className="tag">{p.area}</span>
                  <h3>{p.nome}</h3>
                  <p>{p.resumo}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec noite">
        <div className="wrap">
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 20 }}>
            <div>
              <p className="eyebrow">Notícias</p>
              <h2 className="titulo" style={{ marginTop: 16 }}>Últimas <em>ações</em></h2>
            </div>
            <Link href="/noticias" className="btn contorno">Todas as notícias</Link>
          </div>
          {noticias.length > 0 ? (
            <div className="grade g3" style={{ marginTop: 44 }}>
              {noticias.map((n) => <CartaoNoticia key={n.id} n={n} />)}
            </div>
          ) : (
            <p className="lead" style={{ marginTop: 32 }}>As primeiras notícias serão publicadas em breve.</p>
          )}
        </div>
      </section>

      <section className="sec">
        <div className="wrap grade g2">
          <div>
            <p className="eyebrow">Transparência</p>
            <h2 className="titulo" style={{ marginTop: 16 }}>Parcerias com <em>prestação de contas</em></h2>
          </div>
          <div>
            <p className="lead">
              Publicamos os termos de fomento e convênios firmados com o poder público, com valores, números dos processos e vigência, conforme o art. 11 da Lei 13.019/2014.
            </p>
            <Link href="/transparencia" className="btn" style={{ marginTop: 28 }}>Acessar a Transparência</Link>
          </div>
        </div>
      </section>
    </>
  );
}
