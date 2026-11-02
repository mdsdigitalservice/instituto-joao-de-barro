import { getSupabase } from "./supabase";

export type Noticia = {
  id: string;
  slug: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  capa_url: string | null;
  galeria: string[];
  publicado: boolean;
  publicado_em: string;
};

// Usado só enquanto o Supabase não estiver configurado, para visualizar o layout.
// Baseado em posts reais do Instagram; revisar antes de publicar.
const rascunhos: Noticia[] = [
  {
    id: "r2",
    slug: "canta-rondonopolis-inscricoes",
    titulo: "Seu talento pode te levar ao palco do Canta Rondonópolis",
    resumo: "O concurso de canto do Instituto vai levar novos talentos da cidade ao palco.",
    conteudo:
      "O Canta Rondonópolis está chegando para revelar as vozes da nossa cidade.\n\nAcompanhe as novidades no Instagram do Instituto.",
    capa_url: "/img/joao-de-barro.jpg",
    galeria: [],
    publicado: true,
    publicado_em: "2026-10-19T12:00:00Z",
  },
  {
    id: "r1",
    slug: "copa-delta-de-karate-2026",
    titulo: "Copa Delta de Karatê 2026: esporte, inclusão e impacto social",
    resumo: "O Ginásio Marechal Rondon recebeu atletas de várias academias na Copa Delta de Karatê, em 22 de agosto.",
    conteudo:
      "No dia 22 de agosto, o Ginásio Marechal Rondon, no Centro de Rondonópolis, recebeu a Copa Delta de Karatê 2026, realizada com a Associação Delta de Karatê.\n\nA competição reuniu crianças e jovens de diferentes academias da região.",
    capa_url: "/img/karate.jpg",
    galeria: [],
    publicado: true,
    publicado_em: "2026-08-24T12:00:00Z",
  },
];

export async function listarNoticias(limite?: number): Promise<Noticia[]> {
  const sb = getSupabase();
  if (!sb) return limite ? rascunhos.slice(0, limite) : rascunhos;
  let q = sb
    .from("noticias")
    .select("*")
    .eq("publicado", true)
    .lte("publicado_em", new Date().toISOString())
    .order("publicado_em", { ascending: false });
  if (limite) q = q.limit(limite);
  const { data, error } = await q;
  if (error) {
    console.error("Erro ao carregar notícias:", error.message);
    return [];
  }
  return (data ?? []) as Noticia[];
}

export async function buscarNoticia(slug: string): Promise<Noticia | null> {
  const sb = getSupabase();
  if (!sb) return rascunhos.find((n) => n.slug === slug) ?? null;
  const { data } = await sb
    .from("noticias")
    .select("*")
    .eq("slug", slug)
    .eq("publicado", true)
    .lte("publicado_em", new Date().toISOString())
    .maybeSingle();
  return (data as Noticia) ?? null;
}

export function dataBR(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric", timeZone: "America/Cuiaba" });
}

export function slugify(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
