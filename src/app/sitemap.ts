import type { MetadataRoute } from "next";
import { listarNoticias } from "@/lib/noticias";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://institutojoaodebarro.org.br";
  const fixas = ["", "/quem-somos", "/projetos", "/transparencia", "/noticias", "/contato"].map((p) => ({ url: `${base}${p}` }));
  const noticias = (await listarNoticias()).map((n) => ({ url: `${base}/noticias/${n.slug}`, lastModified: n.publicado_em }));
  return [...fixas, ...noticias];
}
