"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";

export function Cabecalho() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);

  useEffect(() => setAberto(false), [pathname]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="topo">
      <div className="wrap">
        <Link href="/" className="logo" aria-label={`${site.nome}, página inicial`}>
          <img src="/img/logo-claro.png" alt={site.nome} width={149} height={46} />
        </Link>
        <nav aria-label="Principal">
          <button
            className="btn-menu"
            aria-expanded={aberto}
            aria-controls="menu-principal"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            onClick={() => setAberto((v) => !v)}
          >
            <span /><span /><span />
          </button>
          <ul id="menu-principal" className={`menu${aberto ? " aberto" : ""}`}>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={pathname.startsWith(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
