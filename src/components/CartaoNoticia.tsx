import Link from "next/link";
import { dataBR, type Noticia } from "@/lib/noticias";

export function CartaoNoticia({ n }: { n: Noticia }) {
  return (
    <Link href={`/noticias/${n.slug}`} className="cartao">
      <div className={`img${n.capa_url ? "" : " vazia"}`}>
        <img src={n.capa_url || "/img/logo-escuro.png"} alt="" loading="lazy" />
      </div>
      <div className="corpo">
        <span className="tag">{dataBR(n.publicado_em)}</span>
        <h3>{n.titulo}</h3>
        {n.resumo && <p>{n.resumo}</p>}
      </div>
    </Link>
  );
}
