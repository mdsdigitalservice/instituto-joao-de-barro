"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site, whatsappLink } from "@/content/site";

export function Rodape() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  const zap = whatsappLink();

  return (
    <footer className="rodape">
      <div className="wrap">
        <div className="cols">
          <div>
            <img src="/img/logo-claro.png" alt={site.nome} width={194} height={60} style={{ height: 60, width: "auto" }} />
            <p style={{ marginTop: 18 }}>{site.slogan}</p>
          </div>
          <div>
            <h4>Navegação</h4>
            <ul>
              <li><Link href="/">Início</Link></li>
              {nav.map((n) => (
                <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contato</h4>
            <ul>
              <li>{site.cidade}</li>
              {site.endereco && <li>{site.endereco}</li>}
              {site.telefone && <li><a href={`tel:+55${site.whatsapp}`}>{site.telefone}</a></li>}
              {zap && <li><a href={zap} target="_blank" rel="noopener">WhatsApp</a></li>}
              {site.email && <li><a href={`mailto:${site.email}`}>{site.email}</a></li>}
              <li><a href={site.instagram} target="_blank" rel="noopener">Instagram</a></li>
              <li><a href={site.facebook} target="_blank" rel="noopener">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="base">
          <span>© {new Date().getFullYear()} {site.nome}{site.cnpj && ` · CNPJ ${site.cnpj}`}</span>
          <span>Desenvolvido por <a href="https://mdsdigital.com.br" target="_blank" rel="noopener">MDS Digital</a></span>
        </div>
      </div>
    </footer>
  );
}
