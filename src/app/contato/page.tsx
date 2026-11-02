import type { Metadata } from "next";
import { CabecaPagina } from "@/components/CabecaPagina";
import { site, whatsappLink } from "@/content/site";

export const metadata: Metadata = { title: "Contato", description: "Fale com o Instituto João de Barro em Cuiabá–MT." };

export default function Contato() {
  const zap = whatsappLink();
  const itens = [
    { rotulo: "Cidade", valor: site.cidade },
    site.endereco && { rotulo: "Endereço", valor: site.endereco },
    site.telefone && { rotulo: "Telefone e WhatsApp", valor: site.telefone, href: `tel:+55${site.whatsapp}` },
    site.email && { rotulo: "E-mail", valor: site.email, href: `mailto:${site.email}` },
    { rotulo: "CNPJ", valor: site.cnpj },
    { rotulo: "Instagram", valor: site.instagramUser, href: site.instagram },
    { rotulo: "Facebook", valor: "/institutojoaodebarromt", href: site.facebook },
  ].filter(Boolean) as { rotulo: string; valor: string; href?: string }[];

  return (
    <>
      <CabecaPagina eyebrow="Contato" titulo={<>Vamos construir <em>juntos?</em></>} texto="Parcerias, voluntariado ou dúvidas sobre os projetos: fale com a gente." foto="/img/ninho.jpg" />
      <section className="sec">
        <div className="wrap grade g2" style={{ alignItems: "start" }}>
          <dl style={{ display: "grid", gap: 24 }}>
            {itens.map((i) => (
              <div className="valor" key={i.rotulo}>
                <dt className="eyebrow">{i.rotulo}</dt>
                <dd style={{ fontSize: 20, marginTop: 6 }}>
                  {i.href ? <a href={i.href} target="_blank" rel="noopener">{i.valor}</a> : i.valor}
                </dd>
              </div>
            ))}
          </dl>
          <div className="parceria" style={{ background: "var(--oliva)", color: "var(--areia)", border: 0 }}>
            <p className="eyebrow" style={{ color: "var(--caramelo)" }}>Atendimento</p>
            <h2 className="titulo" style={{ fontSize: "clamp(26px, 3vw, 38px)", marginTop: 14 }}>Fale pelo WhatsApp</h2>
            <p style={{ marginTop: 14, color: "#cfc6b4" }}>A forma mais rápida de falar com a equipe do Instituto.</p>
            {zap ? (
              <a href={zap} className="btn" target="_blank" rel="noopener" style={{ marginTop: 24 }}>Abrir conversa</a>
            ) : (
              <a href={site.instagram} className="btn" target="_blank" rel="noopener" style={{ marginTop: 24 }}>Mensagem no Instagram</a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
